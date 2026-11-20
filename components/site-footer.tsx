'use client';

import React from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { profile } from '@/data/profile';
import { useTheme } from '@/components/theme-provider';

export function SiteFooter() {
  const { theme, toggleTheme } = useTheme();

  return (
    <footer className="border-t border-border bg-background no-print">
      <div className="mx-auto max-w-[1200px] px-6 py-10 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">
            {profile.name} · {profile.location}
          </p>
          <p className="font-mono text-xs text-muted-foreground tabular-nums">
            {profile.coordinates} · Updated {profile.version} · Static Next.js Build
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Blog
          </Link>
          <Link href="/research" className="hover:text-foreground transition-colors">
            Research
          </Link>
          <Link href="/resume" className="hover:text-foreground transition-colors">
            Resume
          </Link>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-1.5 text-foreground hover:text-accent transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Moon className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span className="sr-only">Switch to {theme === 'dark' ? 'light' : 'dark'} theme</span>
            <span aria-hidden="true">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
