import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import { blog } from '@/data/blog';
import { RevealSection } from '@/components/motion-primitives';

/**
 * Home-page strip pointing at the writing. Renders nothing until there is at
 * least one published post, so the home page never shows an empty section.
 */
export function WritingSection() {
  const posts = getAllPosts().slice(0, 2);
  if (posts.length === 0) return null;

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="mx-auto max-w-[1200px] px-6 py-16 md:px-10 md:py-20"
    >
      <RevealSection>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="mb-2 font-mono text-xs text-muted-foreground">Blog</p>
            <h2
              id="writing-heading"
              className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
            >
              Notes from building{' '}
              <span className="font-editorial-italic text-accent">things</span>
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>All {blog.title.toLowerCase()}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div className="max-w-[62ch]">
                  <h3 className="text-base font-medium text-foreground transition-colors group-hover:text-accent sm:text-lg">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
                  {post.formattedDate} · {post.readingMinutes} min
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </RevealSection>
    </section>
  );
}
