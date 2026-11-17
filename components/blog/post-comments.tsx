'use client';

import { useEffect, useRef } from 'react';
import { blog, isCommentsReady } from '@/data/blog';
import { useTheme } from '@/components/theme-provider';

/**
 * Giscus comments (GitHub Discussions). Renders nothing until the repo and
 * category ids are set in data/blog.ts, so an unconfigured site never shows a
 * broken box to visitors.
 */
export function PostComments({ slug }: { slug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!isCommentsReady() || !containerRef.current) return;

    const container = containerRef.current;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-repo', blog.giscus.repo);
    script.setAttribute('data-repo-id', blog.giscus.repoId);
    script.setAttribute('data-category', blog.giscus.category);
    script.setAttribute('data-category-id', blog.giscus.categoryId);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', slug);
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', theme === 'light' ? 'light' : 'dark_dimmed');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    container.appendChild(script);
  }, [slug, theme]);

  if (!isCommentsReady()) return null;

  return (
    <section aria-labelledby="comments-heading" className="border-t border-border pt-10">
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="comments-heading" className="font-mono text-xs text-muted-foreground">
          Discussion
        </h2>
        <p className="font-mono text-[11px] text-muted-foreground">
          Comments use GitHub · sign in once to reply
        </p>
      </div>
      <div ref={containerRef} />
    </section>
  );
}
