'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { profile } from '@/data/profile';
import { RevealSection } from '@/components/motion-primitives';
import { Button } from '@/components/ui/button';

export function ResearchSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="research"
      aria-labelledby="research-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28"
    >
      <RevealSection>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-3">
              02. Final Year Design Project
            </p>
            <h2
              id="research-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance"
            >
              Research in <span className="font-editorial-italic text-accent">progress</span>.
            </h2>
          </div>

          <div className="inline-flex items-center gap-2.5 border border-border bg-surface px-3.5 py-2 rounded-md font-mono text-xs text-foreground self-start md:self-auto">
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
            <span>{profile.research.status}</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-surface overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Echocardiography Signal Panel */}
            <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 flex flex-col justify-between bg-surface-subtle/40">
              <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
                <span>Echocardiography · Multiview</span>
                <span className="tabular-nums text-foreground">{profile.research.dataset}</span>
              </div>

              {/* Animated Cardiac & Wall-Motion Waveform Visualization */}
              <div className="my-8 relative rounded-md border border-border bg-background p-5">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground mb-4">
                  <span>APICAL 4-CH / 2-CH TRACE</span>
                  <span className="text-accent tabular-nums">1D-CNN / LSTM</span>
                </div>

                <svg
                  viewBox="0 0 360 96"
                  fill="none"
                  className="w-full h-24"
                  aria-label="Animated echocardiography signal trace"
                >
                  {/* Reference grid lines */}
                  <line x1="0" y1="24" x2="360" y2="24" stroke="var(--border)" strokeWidth="1" />
                  <line x1="0" y1="48" x2="360" y2="48" stroke="var(--border)" strokeWidth="1" />
                  <line x1="0" y1="72" x2="360" y2="72" stroke="var(--border)" strokeWidth="1" />

                  {/* Secondary harmonic trace */}
                  <path
                    d="M 0 64 Q 30 56 60 64 T 120 62 T 180 65 T 240 60 T 300 64 T 360 62"
                    stroke="var(--muted-foreground)"
                    strokeOpacity="0.4"
                    strokeWidth="1.25"
                  />

                  {/* Primary cardiac waveform */}
                  {shouldReduceMotion ? (
                    <path
                      d="M 0 48 L 40 48 L 52 40 L 62 48 L 72 56 L 80 12 L 90 84 L 100 42 L 112 48 L 160 48 L 172 40 L 182 48 L 192 56 L 200 12 L 210 84 L 220 42 L 232 48 L 280 48 L 292 40 L 302 48 L 312 56 L 320 12 L 330 84 L 340 42 L 360 48"
                      stroke="var(--accent)"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <motion.path
                      d="M 0 48 L 40 48 L 52 40 L 62 48 L 72 56 L 80 12 L 90 84 L 100 42 L 112 48 L 160 48 L 172 40 L 182 48 L 192 56 L 200 12 L 210 84 L 220 42 L 232 48 L 280 48 L 292 40 L 302 48 L 312 56 L 320 12 L 330 84 L 340 42 L 360 48"
                      stroke="var(--accent)"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0.15, opacity: 0.6 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                      className="animate-ecg-breathe"
                    />
                  )}
                </svg>

                <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-border font-mono text-[11px]">
                  <div>
                    <span className="block text-muted-foreground">Supervisor</span>
                    <span className="text-foreground">{profile.research.supervisor}</span>
                  </div>
                  <div>
                    <span className="block text-muted-foreground">Baseline</span>
                    <span className="text-foreground">{profile.research.baseline}</span>
                  </div>
                </div>
              </div>

              <p className="font-mono text-[11px] text-muted-foreground">
                Note: Active undergraduate FYDP investigation — manuscript in preparation, not yet published.
              </p>
            </div>

            {/* Research Breakdown */}
            <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                  {profile.research.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {profile.research.summary}
                </p>

                <ul className="mt-6 space-y-3 border-t border-border pt-6">
                  {profile.research.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-xs text-muted-foreground">
                  {profile.research.focusAreas.slice(0, 2).join(' · ')}
                </p>

                <Link href="/research">
                  <Button variant="outline" size="sm">
                    <span>Read Research Overview</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
