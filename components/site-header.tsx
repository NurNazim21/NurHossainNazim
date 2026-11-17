'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Work', href: '/#work' },
  { label: 'Research', href: '/#research' },
  { label: 'Experience', href: '/#experience' },
  { label: 'About', href: '/#about' },
  { label: 'Writing', href: '/blog' },
  { label: 'Resume', href: '/resume' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/88 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-8 px-6 md:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <Link
          href="/"
          className="text-base font-semibold tracking-tight text-foreground hover:text-accent transition-colors whitespace-nowrap shrink-0"
        >
          {profile.name}
        </Link>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground"
        >
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/#contact" className="hidden lg:inline-flex">
            <Button variant="accent" size="sm">
              Contact
            </Button>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex lg:hidden items-center justify-center h-10 w-10 rounded-md border border-border text-foreground hover:bg-surface transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="pt-2"
            >
              <Button variant="accent" className="w-full">
                Contact
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
