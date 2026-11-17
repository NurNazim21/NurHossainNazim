import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Post } from '@/lib/blog';

/**
 * One entry in the writing list. Deliberately unboxed: the cover leads,
 * a hairline separates posts, no pills or badges.
 */
export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <article className="group relative flex flex-col gap-4 border-b border-border py-7 last:border-b-0">
      {post.cover ? (
        <Link
          href={`/blog/${post.slug}`}
          className="relative block overflow-hidden rounded-md border border-border bg-surface-subtle"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={post.cover}
            alt={post.coverAlt ?? ''}
            width={1200}
            height={750}
            loading="lazy"
            decoding="async"
            className={`w-full object-cover transition-transform duration-500 ease-out ${
              compact ? 'aspect-[16/9]' : 'aspect-[16/9] md:aspect-[2/1]'
            } group-hover:scale-[1.02]`}
          />
        </Link>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground tabular-nums">
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

      <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-balance">
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-start gap-2 text-foreground transition-colors hover:text-accent"
        >
          <span>{post.title}</span>
          <ArrowUpRight className="mt-1.5 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </h2>

      {post.excerpt ? (
        <p className="max-w-[68ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
          {post.excerpt}
        </p>
      ) : null}
    </article>
  );
}
