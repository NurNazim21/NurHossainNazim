import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  cover?: string;
  coverAlt?: string;
  tags?: string[];
  published?: boolean;
  featured?: boolean;
}

export interface Post extends PostFrontmatter {
  slug: string;
  html: string;
  readingMinutes: number;
  formattedDate: string;
  isoDate: string;
}

marked.setOptions({ gfm: true, breaks: false });

function readingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

function readPost(fileName: string): Post | null {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), 'utf8');

  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(raw);
  } catch (error) {
    console.warn(`[blog] skipping ${fileName}: frontmatter is not valid YAML`, error);
    return null;
  }

  const { data, content } = parsed;
  const fm = data as PostFrontmatter;

  if (!fm.title || !fm.date) return null;

  return {
    ...fm,
    slug: fileName.replace(/\.mdx?$/, ''),
    html: marked.parse(content, { async: false }) as string,
    readingMinutes: readingTime(content),
    formattedDate: formatDate(fm.date),
    isoDate: new Date(fm.date).toISOString(),
  };
}

/** Published posts, newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .filter((p): p is Post => Boolean(p && p.published !== false))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getAdjacentPosts(slug: string): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const i = posts.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: posts[i + 1] ?? null,
    next: posts[i - 1] ?? null,
  };
}

export function getFeaturedPost(posts: Post[]): Post | null {
  return posts.find((p) => p.featured) ?? posts[0] ?? null;
}

export function getAllTags(posts: Post[]): string[] {
  return Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort();
}
