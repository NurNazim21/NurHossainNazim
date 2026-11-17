'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Download } from 'lucide-react';
import { profile } from '@/data/profile';
import { RevealSection } from '@/components/motion-primitives';
import { Button } from '@/components/ui/button';

export function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28"
    >
      <RevealSection>
        <div className="mb-12">
          <p className="font-mono text-xs text-muted-foreground mb-3">
            04. About &amp; Education
          </p>
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance"
          >
            Background &amp; <span className="font-editorial-italic text-accent">foundation</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left: Education & Credentials */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-8">
            <div className="space-y-6">
              {profile.education.map((edu, idx) => (
                <div
                  key={edu.institution}
                  className={`pb-6 ${idx < profile.education.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {edu.institution}
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/90">
                    {edu.degree} ·{' '}
                    <span className="font-mono text-xs text-accent tabular-nums">{edu.score}</span>
                  </p>
                  {edu.coursework && (
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                      Coursework: {edu.coursework.join(' · ')}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-surface p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block font-mono text-xs text-muted-foreground mb-1">
                    Spoken Languages
                  </span>
                  <p className="text-foreground">
                    {profile.spokenLanguages.map((l) => `${l.language} (${l.level})`).join(' · ')}
                  </p>
                </div>
                <div>
                  <span className="block font-mono text-xs text-muted-foreground mb-1">
                    Core Strengths
                  </span>
                  <p className="text-foreground">{profile.softSkills.join(' · ')}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex flex-wrap items-center gap-3">
                <a href={profile.cvPath} download="Nur_Hossain_Nazim_CV.pdf">
                  <Button variant="accent" size="sm">
                    <Download className="h-3.5 w-3.5" />
                    <span>Download CV (PDF)</span>
                  </Button>
                </a>
                <Link href="/resume">
                  <Button variant="outline" size="sm">
                    <span>View Printable Resume</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Portrait Photo (About section only, matching column height) */}
          <div className="lg:col-span-5 flex">
            <figure className="relative w-full min-h-[380px] lg:min-h-0 rounded-lg border border-border bg-surface overflow-hidden flex flex-col">
              {!imgError ? (
                <img
                  src={profile.portraitPath}
                  alt="Nur Hossain Nazim at United International University campus in Dhaka"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full flex-1 object-cover object-top"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 bg-surface-subtle text-center">
                  <div>
                    <p className="text-lg font-semibold text-foreground">{profile.name}</p>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      United International University · Dhaka
                    </p>
                  </div>
                </div>
              )}

              <figcaption className="border-t border-border bg-surface px-4 py-3 flex items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
                <span>UIU Permanent Campus, Dhaka</span>
                <span className="tabular-nums">{profile.coordinates}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}
