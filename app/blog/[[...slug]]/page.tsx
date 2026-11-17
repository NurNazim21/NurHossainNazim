import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Rss } from 'lucide-react';
import { profile } from '@/data/profile';
import { blog } from '@/data/blog';
import { getAllPosts, getAdjacentPosts, getFeaturedPost, getPostBySlug } from '@/lib/blog';
import { PostCard } from '@/components/blog/post-card';
import { PostShare } from '@/components/blog/post-share';
import { PostComments } from '@/components/blog/post-comments';
import { RevealSection } from '@/components/motion-primitives';

/**
 * One route serves both /blog and /blog/<slug>.
 *
 * The optional catch-all is deliberate. A plain [slug] route cannot be exported
 * with `output: 'export'` when there are zero posts (Next.js demands at least one
 * generated param), so deleting the last post broke the whole deploy. Returning
 * `{ slug: [] }` always gives the export something to build: the index.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: [] as string[] }, ...getAllPosts().map((post) => ({ slug: [post.slug] }))];
}

/**
 * Search engines truncate around 155 characters, so cut on a word boundary
 * instead of letting Google invent its own snippet mid-sentence.
 */
function clampDescription(text: string, max = 155) {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') || cut.length)}…`;
}

const indexMetadata: Metadata = {
  title: 'Writing on AI, ML and research',
  description: clampDescription(
    'Write-ups on machine learning, echocardiography research, retrieval systems and the engineering behind the projects on this site.',
  ),
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: {
    type: 'website',
    title: `${blog.title} — ${blog.author}`,
    description: blog.description,
    url: '/blog',
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: blog.title }],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug = [] } = await params;
  const postSlug = slug[0];
  if (!postSlug) return indexMetadata;

  const post = getPostBySlug(postSlug);
  if (!post) return { title: 'Post Not Found' };

  const rawDescription = post.excerpt ?? post.title;
  const description = clampDescription(rawDescription);
  const image = post.cover ? `${profile.siteUrl.replace(/\/$/, '')}${post.cover}` : '/og/home.png';

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${post.slug}`, types: { 'application/rss+xml': '/rss.xml' } },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.isoDate,
      authors: [profile.name],
      tags: post.tags,
      images: [
        post.cover
          ? { url: image, alt: post.coverAlt ?? post.title }
          : { url: image, width: 1200, height: 630, alt: post.title },
      ],
    },
    twitter: { card: 'summary_large_image', title: post.title, description, images: [image] },
  };
}

export default async function BlogRoute({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  const postSlug = slug[0];

  if (!postSlug) {
    const blogJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: blog.title,
      description: blog.description,
      url: `${profile.siteUrl}/blog`,
      inLanguage: 'en',
      author: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
      publisher: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
      blogPost: getAllPosts().map((item) => ({
        '@type': 'BlogPosting',
        headline: item.title,
        url: `${profile.siteUrl}/blog/${item.slug}`,
        datePublished: item.isoDate,
      })),
    };
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <BlogIndex />
      </>
    );
  }

  const post = getPostBySlug(postSlug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(post.slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt ?? post.title,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
    publisher: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${profile.siteUrl}/blog/${post.slug}` },
    ...(post.cover ? { image: `${profile.siteUrl.replace(/\/$/, '')}${post.cover}` } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
    inLanguage: 'en',
    isPartOf: { '@type': 'Blog', name: blog.title, url: `${profile.siteUrl}/blog` },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: profile.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: `${profile.siteUrl}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${profile.siteUrl}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <article className="mx-auto max-w-[1200px] px-6 pb-20 pt-12 md:px-10 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Link
        href="/blog"
        className="group mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>All writing</span>
      </Link>

      <header className="border-b border-border pb-8">
        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground tabular-nums">
          <time dateTime={post.isoDate}>{post.formattedDate}</time>
          <span aria-hidden="true" className="text-border-strong">
            /
          </span>
          <span>{post.readingMinutes} min read</span>
          {post.tags?.length ? (
            <>
              <span aria-hidden="true" className="text-border-strong">
                /
              </span>
              <span>{post.tags.join(' · ')}</span>
            </>
          ) : null}
        </div>

        <h1 className="max-w-[46ch] text-3xl font-bold leading-[1.08] tracking-tight text-foreground text-balance sm:text-4xl md:text-5xl">
          {post.title}
        </h1>

        {post.excerpt ? (
          <p className="mt-5 max-w-[68ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
            {post.excerpt}
          </p>
        ) : null}
      </header>

      {post.cover ? (
        <figure className="mt-10">
          <img
            src={post.cover}
            alt={post.coverAlt ?? ''}
            width={1600}
            height={1000}
            className="w-full rounded-lg border border-border bg-surface-subtle object-cover"
          />
          {post.coverAlt ? (
            <figcaption className="mt-3 font-mono text-[11px] text-muted-foreground">
              {post.coverAlt}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="mt-10 max-w-[72ch]">
        <div className="prose-post" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>

      <div className="mt-12 max-w-[72ch]">
        <PostShare slug={post.slug} title={post.title} />
      </div>

      <div className="mt-12 max-w-[72ch]">
        <RevealSection className="mt-16 border-t border-border pt-8">
        <h2 className="font-mono text-xs text-muted-foreground">Related</h2>
        <ul className="mt-4 grid gap-x-8 gap-y-1 sm:grid-cols-2">
          <li>
            <Link
              href="/research"
              className="group flex items-baseline justify-between gap-4 border-b border-border py-2.5 transition-colors hover:border-accent"
            >
              <span className="text-sm text-foreground">
                FYDP: myocardial infarction detection from echocardiography
              </span>
              <span className="shrink-0 font-mono text-[11px] text-muted-foreground">Research</span>
            </Link>
          </li>
          {profile.projects
            .filter((item) => item.category === 'AI & ML')
            .slice(0, 2)
            .map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="group flex items-baseline justify-between gap-4 border-b border-border py-2.5 transition-colors hover:border-accent"
                >
                  <span className="text-sm text-foreground">{item.title}</span>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                    Case study
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </RevealSection>

      <PostComments slug={post.slug} />
      </div>

      <nav
        aria-label="More posts"
        className="no-print mt-14 grid grid-cols-1 gap-6 border-t border-border pt-8 md:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="group rounded-lg border border-border bg-surface p-5 transition-colors hover:border-border-strong"
          >
            <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <ArrowLeft className="h-3 w-3" /> Previous
            </span>
            <span className="mt-2 block text-sm font-medium text-foreground transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}

        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="group rounded-lg border border-border bg-surface p-5 text-right transition-colors hover:border-border-strong"
          >
            <span className="flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
              Next <ArrowRight className="h-3 w-3" />
            </span>
            <span className="mt-2 block text-sm font-medium text-foreground transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        ) : null}
      </nav>

      <p className="mt-10 font-mono text-[11px] text-muted-foreground">
        Written by {blog.author} · {profile.location}
      </p>
    </article>
  );
}

function BlogIndex() {
  const posts = getAllPosts();
  const featured = getFeaturedPost(posts);
  const rest = featured ? posts.filter((p) => p.slug !== featured.slug) : posts;

  return (
    <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-12 md:px-10 md:pt-16">
      <Link
        href="/"
        className="group mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>Back to home</span>
      </Link>

      <header className="border-b border-border pb-10">
        <p className="mb-3 font-mono text-xs text-muted-foreground">
          Writing · {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground text-balance sm:text-5xl">
          Notes from building <span className="font-editorial-italic text-accent">things</span>.
        </h1>
        <p className="mt-5 max-w-[64ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
          {blog.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <Rss className="h-3.5 w-3.5" />
            <span>Subscribe by RSS</span>
          </a>
          {blog.newsletterUrl ? (
            <a
              href={blog.newsletterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              Get new posts by email
            </a>
          ) : null}
        </div>
      </header>

      {posts.length === 0 ? (
        <RevealSection className="mt-12">
          <div className="rounded-lg border border-border bg-surface p-8">
            <p className="font-mono text-xs text-muted-foreground">No posts yet</p>
            <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
              The first write-up is being drafted. Notes on machine learning, research and the
              systems behind the projects on this site will appear here. Subscribe by RSS to read
              them as they land.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-foreground transition-colors hover:text-accent"
            >
              <span>Back to the work</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </RevealSection>
      ) : (
        <>
          {featured ? (
            <RevealSection className="mt-4">
              <article className="grid grid-cols-1 items-start gap-8 border-b border-border py-10 lg:grid-cols-12">
                {featured.cover ? (
                  <Link
                    href={`/blog/${featured.slug}`}
                    className="group relative block overflow-hidden rounded-lg border border-border bg-surface-subtle lg:col-span-7"
                  >
                    <img
                      src={featured.cover}
                      alt={featured.coverAlt ?? ''}
                      width={1200}
                      height={750}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </Link>
                ) : null}

                <div className={featured.cover ? 'lg:col-span-5' : 'lg:col-span-12'}>
                  <div className="flex flex-wrap items-center gap-x-3 font-mono text-xs text-muted-foreground tabular-nums">
                    <span>Latest</span>
                    <span aria-hidden="true" className="text-border-strong">
                      /
                    </span>
                    <time dateTime={featured.isoDate}>{featured.formattedDate}</time>
                    <span aria-hidden="true" className="text-border-strong">
                      /
                    </span>
                    <span>{featured.readingMinutes} min read</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {featured.title}
                    </Link>
                  </h2>

                  {featured.excerpt ? (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {featured.excerpt}
                    </p>
                  ) : null}

                  <Link
                    href={`/blog/${featured.slug}`}
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs text-foreground transition-colors hover:text-accent"
                  >
                    Read the post →
                  </Link>
                </div>
              </article>
            </RevealSection>
          ) : null}

          {rest.length > 0 ? (
            <RevealSection className="mt-2">
              <div className="grid grid-cols-1 gap-x-10 md:grid-cols-2">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} compact />
                ))}
              </div>
            </RevealSection>
          ) : null}
        </>
      )}
    </div>
  );
}
