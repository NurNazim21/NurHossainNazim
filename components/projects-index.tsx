'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { profile, type ProjectItem } from '@/data/profile';
import { ProjectVisual } from '@/components/project-visual';
import { RevealSection } from '@/components/motion-primitives';

type FilterType = 'All' | 'AI & ML' | 'Full-Stack';

const FILTERS: FilterType[] = ['All', 'AI & ML', 'Full-Stack'];

function ProjectRow({ project, index }: { project: ProjectItem; index: number }) {
  const href = `/projects/${project.slug}`;

  return (
    <article className="group relative grid grid-cols-1 gap-6 border-t border-border py-8 md:grid-cols-12 md:gap-10 md:py-10">
      <div className="md:col-span-7 md:pr-6">
        <div className="mb-4 flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
          <span aria-hidden="true" className="text-border-strong">/</span>
          <span>{project.category}</span>
          <span aria-hidden="true" className="text-border-strong">/</span>
          <span className="tabular-nums">{project.year}</span>
        </div>

        <h2 className="text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent md:text-2xl">
          <Link href={href} className="focus-visible:outline-none">
            {project.title}
          </Link>
        </h2>

        <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
          {project.stack.slice(0, 5).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-foreground transition-colors hover:text-accent"
          >
            Read case study
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Source
            </a>
          )}
        </div>
      </div>

      <div className="md:col-span-5">
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="block focus-visible:outline-none"
        >
          <ProjectVisual project={project} />
        </Link>
      </div>
    </article>
  );
}

export function ProjectsIndex() {
  const [filter, setFilter] = useState<FilterType>('All');
  const projects = profile.projects;
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section aria-labelledby="projects-index-heading" className="mx-auto max-w-[1200px] px-6 pb-20 pt-12 md:px-10 md:pt-16">
      <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Index · {projects.length} case studies
          </p>
          <h1
            id="projects-index-heading"
            className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            Every project,{' '}
            <span className="font-editorial-italic text-accent">in one place</span>.
          </h1>
          <p className="mt-4 max-w-[60ch] text-sm leading-relaxed text-muted-foreground md:text-base">
            Research prototypes and shipped systems: retrieval pipelines, medical imaging, real-time
            backends and full-stack products. Each entry opens a case study with architecture,
            decisions and results.
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by discipline"
          className="inline-flex items-center gap-1 self-start rounded-lg border border-border bg-surface p-1 md:self-auto"
        >
          {FILTERS.map((item) => {
            const active = filter === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                className={`cursor-pointer whitespace-nowrap rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  active
                    ? 'bg-foreground text-background'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <RevealSection>
        <div className="border-b border-border">
          {visible.map((project) => (
            <ProjectRow
              key={project.slug}
              project={project}
              index={projects.findIndex((p) => p.slug === project.slug)}
            />
          ))}
        </div>
      </RevealSection>

      <p className="mt-8 font-mono text-xs text-muted-foreground" aria-live="polite">
        Showing {visible.length} of {projects.length}
      </p>
    </section>
  );
}
