import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { profile } from '@/data/profile';
import { blog } from '@/data/blog';
import { getAllPosts, getAdjacentPosts, getPostBySlug } from '@/lib/blog';
import { PostShare } from '@/components/blog/post-share';
import { PostComments } from '@/components/blog/post-comments';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const description = post.excerpt ?? post.title;
  const image = post.cover ? `${profile.siteUrl.replace(/\/$/, '')}${post.cover}` : undefined;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { 'application/rss+xml': '/rss.xml' },
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.isoDate,
      authors: [profile.name],
      tags: post.tags,
      images: image
        ? [{ url: image, alt: post.coverAlt ?? post.title }]
        : [{ url: '/og/home.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: image ? [image] : ['/og/home.png'],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
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
    ...(post.cover
      ? { image: `${profile.siteUrl.replace(/\/$/, '')}${post.cover}` }
      : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  };

  return (
    <article className="mx-auto max-w-[1200px] px-6 pb-20 pt-12 md:px-10 md:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
            className="group rounded-lg border border-border bg-surface p-5 text-right transition-colors hover:border-border-strong md:text-right"
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
