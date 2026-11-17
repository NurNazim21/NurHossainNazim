'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDownRight, Command as CommandIcon, FileText, Github, Linkedin, Moon, Sun } from 'lucide-react';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';
import { DhakaClock } from '@/components/dhaka-clock';
import { HeroEcgTrace } from '@/components/ecg-motif';
import { MagneticWrapper, MaskedLineReveal } from '@/components/motion-primitives';
import { useTheme } from '@/components/theme-provider';

export function HeroSection() {
  const { theme, toggleTheme } = useTheme();

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative mx-auto max-w-[1200px] px-6 pt-12 pb-16 md:px-10 md:pt-20 md:pb-24"
    >
      {/* Utility telemetry row (outside header to preserve 3-zone header contract) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5 mb-12 md:mb-16">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <DhakaClock />
          <span aria-hidden="true" className="hidden sm:inline text-border-strong">
            /
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs text-foreground">
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              aria-hidden="true"
              className="text-accent animate-ecg-breathe shrink-0"
            >
              <path
                d="M1 6H4.2L5.5 2L7.8 10.5L9.8 4.5L11 6H15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{profile.availability}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <CommandIcon className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Open command palette</span>
            <span aria-hidden="true">Menu</span>
            <kbd className="text-[11px]" aria-hidden="true">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-border-strong transition-colors shrink-0 cursor-pointer"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main Hero Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-x-12 lg:gap-y-8 items-start">
        {/* Positioning line + name */}
        <div className="lg:col-span-7 lg:row-start-1">
          <p className="font-mono text-xs tracking-wide text-muted-foreground mb-5">
            Final-Year B.Sc. CSE · United International University, Dhaka
          </p>

          <h1
            id="hero-heading"
            className="text-[clamp(2.85rem,7vw,5.75rem)] font-bold leading-[0.98] tracking-tight text-foreground text-balance"
          >
            <MaskedLineReveal delay={0.04}>{profile.firstName}</MaskedLineReveal>
            <MaskedLineReveal delay={0.14}>
              <span>{profile.lastName}</span>
              <span className="text-accent">.</span>
            </MaskedLineReveal>
          </h1>

          <p className="mt-6 text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-foreground/90 text-balance">
            Finding{' '}
            <span className="font-editorial-italic text-accent">signal</span> from
            data, models &amp; systems.
          </p>
        </div>

        {/* Portrait, framed like a figure plate */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-start">
          <figure className="relative mx-auto w-full max-w-[340px] lg:max-w-none">
            <span aria-hidden="true" className="absolute -left-2 -top-2 h-5 w-5 border-l border-t border-accent/60" />
            <span aria-hidden="true" className="absolute -right-2 -top-2 h-5 w-5 border-r border-t border-accent/60" />
            <span aria-hidden="true" className="absolute -bottom-2 -left-2 h-5 w-5 border-b border-l border-accent/60" />
            <span aria-hidden="true" className="absolute -bottom-2 -right-2 h-5 w-5 border-b border-r border-accent/60" />

            <div className="overflow-hidden rounded-md border border-border bg-surface aspect-[4/5]">
              <img
                src={profile.portraitHero.src}
                srcSet={`${profile.portraitHero.srcSmall} 800w, ${profile.portraitHero.src} 1200w`}
                sizes="(max-width: 1024px) 340px, 40vw"
                alt={profile.portraitHero.alt}
                width={profile.portraitHero.width}
                height={profile.portraitHero.height}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-[center_12%] saturate-[0.97]"
              />
            </div>

            <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-[11px] text-muted-foreground">
              <span>FIG. 01 · Dhaka, Bangladesh</span>
              <span className="tabular-nums">B.Sc. CSE · 2026</span>
            </figcaption>
          </figure>
        </div>

        {/* Summary, actions, links */}
        <div className="lg:col-span-7 lg:row-start-2">
          <div className="max-w-[54ch] space-y-1.5">
            <p className="text-base sm:text-lg font-medium tracking-tight leading-snug text-foreground/95 text-balance">
              {profile.heroHook.line1}
            </p>
            <p className="text-sm sm:text-base leading-snug text-muted-foreground">
              {profile.heroHook.line2}
            </p>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <MagneticWrapper>
              <a href="#work">
                <Button variant="accent" size="lg">
                  <span>Selected Work</span>
                  <ArrowDownRight className="h-4 w-4" />
                </Button>
              </a>
            </MagneticWrapper>

            <Link href="/resume">
              <Button variant="outline" size="lg">
                <FileText className="h-4 w-4" />
                <span>Resume / CV</span>
              </Button>
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-5 text-xs font-mono text-muted-foreground">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>github.com/NurNazim21</span>
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {/* Signature ECG Waveform Motif */}
      <div className="mt-14 md:mt-16 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[11px] text-muted-foreground">
            Signal Trace · Echocardiography &amp; ML Research Motif
          </span>
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            HMC-QU · 1D-CNN/LSTM
          </span>
        </div>
        <HeroEcgTrace />
      </div>
    </section>
  );
}
