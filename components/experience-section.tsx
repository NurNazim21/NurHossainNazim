'use client';

import React from 'react';
import { profile } from '@/data/profile';
import { RevealSection } from '@/components/motion-primitives';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28"
    >
      <RevealSection>
        <div className="mb-12">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            03. Experience &amp; Leadership
          </p>
          <h2
            id="experience-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance"
          >
            Teaching &amp; <span className="font-editorial-italic text-accent">stewardship</span>.
          </h2>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {profile.experience.map((item) => (
            <article
              key={`${item.role}-${item.organization}`}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-7 md:py-8"
            >
              <div className="md:col-span-4 flex flex-col justify-between gap-1">
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {item.period} · {item.type}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.role}
                </h3>
                <p className="text-sm text-muted-foreground">{item.organization}</p>
              </div>

              <div className="md:col-span-8">
                <ul className="space-y-2.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-foreground/90"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-3 bg-border-strong shrink-0"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
