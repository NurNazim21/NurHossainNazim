import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: { absolute: 'FYDP Research — Nur Hossain Nazim' },
  description:
    'Ongoing undergraduate research by Nur Hossain Nazim on myocardial infarction detection from echocardiography videos using the HMC-QU dataset at UIU.',
  alternates: {
    canonical: '/research',
    types: { 'application/rss+xml': '/rss.xml' },
  },
};

const researchJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: profile.research.title,
  description: profile.research.summary,
  author: {
    '@type': 'Person',
    name: profile.name,
  },
  contributor: {
    '@type': 'Person',
    name: profile.research.supervisor,
  },
  about: ['Echocardiography', 'Myocardial Infarction Detection', 'Deep Learning', 'HMC-QU'],
};

export default function ResearchPage() {
  return (
    <article className="mx-auto max-w-[1000px] px-6 py-14 md:px-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(researchJsonLd) }}
      />

      <Link
        href="/#research"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Portfolio</span>
      </Link>

      <header className="border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground mb-4">
          <span>Final Year Design Project (FYDP)</span>
          <span>·</span>
          <span className="text-accent">{profile.research.status}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
          {profile.research.title}
        </h1>

        <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-[68ch]">
          {profile.research.summary}
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-lg border border-border bg-surface p-5 font-mono text-xs">
          <div>
            <span className="block text-muted-foreground mb-1">Supervisor</span>
            <span className="text-foreground">{profile.research.supervisor}</span>
          </div>
          <div>
            <span className="block text-muted-foreground mb-1">Primary Dataset</span>
            <span className="text-foreground">{profile.research.dataset}</span>
          </div>
          <div>
            <span className="block text-muted-foreground mb-1">Reference Baseline</span>
            <span className="text-foreground">{profile.research.baseline}</span>
          </div>
        </div>
      </header>

      <section className="py-10 border-b border-border space-y-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Investigation Scope &amp; Objectives
        </h2>
        <ul className="space-y-4">
          {profile.research.points.map((point) => (
            <li
              key={point}
              className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-foreground/90"
            >
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0"
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-10 border-b border-border">
        <h2 className="text-xl font-semibold tracking-tight text-foreground mb-4">
          Active Technical Focus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.research.focusAreas.map((area, idx) => (
            <div
              key={area}
              className="rounded-md border border-border bg-surface p-4 font-mono text-xs text-foreground"
            >
              <span className="text-accent mr-2">0{idx + 1}.</span>
              <span>{area}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="pt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted-foreground">
          Status: Ongoing undergraduate research at UIU. Manuscript not yet published.
        </p>
        <Link href="/#contact">
          <Button variant="outline" size="sm">
            Discuss Research
          </Button>
        </Link>
      </footer>
    </article>
  );
}
