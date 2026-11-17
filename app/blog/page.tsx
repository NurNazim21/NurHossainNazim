import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Rss } from 'lucide-react';
import { blog } from '@/data/blog';
import { getAllPosts, getFeaturedPost } from '@/lib/blog';
import { PostCard } from '@/components/blog/post-card';
import { RevealSection } from '@/components/motion-primitives';

export const metadata: Metadata = {
  title: blog.title,
  description: blog.description,
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/rss.xml' },
  },
  openGraph: {
    type: 'website',
    title: `${blog.title} — ${blog.author}`,
    description: blog.description,
    url: '/blog',
    images: [{ url: '/og/home.png', width: 1200, height: 630, alt: blog.title }],
  },
};

export default function BlogIndexPage() {
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
          Notes from building{' '}
          <span className="font-editorial-italic text-accent">things</span>.
        </h1>
        <p className="mt-5 max-w-[64ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
          {blog.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          <a href="/rss.xml" className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground">
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
            <p className="font-mono text-xs text-muted-foreground">First post in progress</p>
            <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-muted-foreground">
              The first write-up is being drafted. Post a note from the writing desk at{' '}
              <code className="font-mono text-xs text-foreground">/admin</code> and it appears here
              once the site rebuilds.
            </p>
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
                    <Link href={`/blog/${featured.slug}`} className="transition-colors hover:text-accent">
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
