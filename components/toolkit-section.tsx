'use client';

import React from 'react';
import { profile } from '@/data/profile';
import { RevealSection } from '@/components/motion-primitives';

export function ToolkitSection() {
  return (
    <section
      id="toolkit"
      aria-labelledby="toolkit-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28"
    >
      <RevealSection>
        <div className="mb-12">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            05. Technical Toolkit
          </p>
          <h2
            id="toolkit-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance"
          >
            Stack &amp; <span className="font-editorial-italic text-accent">instruments</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {profile.skillGroups.map((group) => (
            <div
              key={group.label}
              className="rounded-lg border border-border bg-surface p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-mono text-xs text-accent mb-4 pb-3 border-b border-border">
                  {group.label}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-foreground/90 flex items-center justify-between gap-2"
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
