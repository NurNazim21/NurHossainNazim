#!/usr/bin/env node
/**
 * Builds public/rss.xml from content/blog so the feed is a real static file.
 * Runs automatically before `npm run build` (see the prebuild script).
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content', 'blog');
const outFile = path.join(root, 'public', 'rss.xml');

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://nur-hossain-nazim.vercel.app').replace(/\/$/, '');
const title = 'Nur Hossain Nazim — Writing';
const description =
  'Short write-ups on machine learning, research, and the systems behind the projects on this site.';

const escapeXml = (s = '') =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

function posts() {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(contentDir, file), 'utf8'));
      return {
        slug: file.replace(/\.mdx?$/, ''),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt ?? '',
        cover: data.cover ?? '',
        published: data.published !== false,
      };
    })
    .filter((p) => p.published && p.title && p.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

const items = posts();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteUrl}/blog</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <lastBuildDate>${new Date(items[0]?.date ?? Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${escapeXml(p.excerpt)}</description>
    </item>`
  )
  .join('\n')}
  </channel>
</rss>
`;

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, xml, 'utf8');
console.log(`rss.xml written · ${items.length} post(s)`);
