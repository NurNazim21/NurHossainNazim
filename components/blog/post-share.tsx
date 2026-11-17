'use client';

import { useState } from 'react';
import { Check, Copy, Linkedin, Rss, Share2 } from 'lucide-react';
import { blog } from '@/data/blog';

/** Copy link, LinkedIn and RSS, styled like the rest of the site's mono rows. */
export function PostShare({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const postUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="no-print flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-6 font-mono text-xs text-muted-foreground">
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground cursor-pointer"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
        <span>{copied ? 'Link copied' : 'Copy link'}</span>
      </button>

      <button
        type="button"
        onClick={() => {
          const url = encodeURIComponent(postUrl);
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            '_blank',
            'noopener,noreferrer,width=680,height=560'
          );
        }}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground cursor-pointer"
      >
        <Linkedin className="h-3.5 w-3.5" />
        <span>Share on LinkedIn</span>
      </button>

      <button
        type="button"
        onClick={() => {
          const url = encodeURIComponent(postUrl);
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${url}`,
            '_blank',
            'noopener,noreferrer,width=680,height=560'
          );
        }}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground cursor-pointer"
      >
        <Share2 className="h-3.5 w-3.5" />
        <span>Post on X</span>
      </button>

      <a
        href="/rss.xml"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
      >
        <Rss className="h-3.5 w-3.5" />
        <span>{blog.title} RSS</span>
      </a>
    </div>
  );
}
