'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { profile, type ProjectItem } from '@/data/profile';
import { ProjectConceptPreview } from '@/components/project-previews';
import { RevealSection } from '@/components/motion-primitives';

type FilterType = 'All' | 'AI & ML' | 'Full-Stack';

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, hovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - py) * 4,
      rotateY: (px - 0.5) * 4,
      glowX: px * 100,
      glowY: py * 100,
      hovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, hovered: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        shouldReduceMotion
          ? undefined
          : {
              transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
            }
      }
      className="group relative flex flex-col justify-between rounded-lg border border-border bg-surface p-6 md:p-7 overflow-hidden hover:border-border-strong transition-colors"
    >
      {/* Pointer-tracked accent border highlight */}
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: tilt.hovered ? 1 : 0,
            background: `radial-gradient(360px circle at ${tilt.glowX}% ${tilt.glowY}%, var(--accent-soft), transparent 65%)`,
          }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full justify-between gap-6">
        <div>
          {/* Clean unboxed metadata (Zero-Pill Discipline) */}
          <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground mb-4">
            <span className="tabular-nums">
              0{index + 1} · {project.category}
            </span>
            <span className="tabular-nums">{project.year}</span>
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors">
            <Link href={`/projects/${project.slug}`} className="focus:outline-none">
              {project.title}
            </Link>
          </h3>

          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </div>

        {/* Code-Built Interface Preview */}
        <div className="min-h-[172px]">
          <ProjectConceptPreview kind={project.previewKind} />
        </div>

        <div className="space-y-4 pt-2 border-t border-border">
          {/* Unboxed stack readout separated by middots */}
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            {project.stack.join(' · ')}
          </p>

          <div className="flex items-center justify-between gap-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:text-accent transition-colors whitespace-nowrap shrink-0"
            >
              <span>Architecture &amp; Details</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap shrink-0"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="h-3.5 w-3.5" />
              <span>Source</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterType>('All');

  const visibleProjects =
    filter === 'All'
      ? profile.projects
      : profile.projects.filter((p) => p.category === filter);

  const filters: FilterType[] = ['All', 'AI & ML', 'Full-Stack'];

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="mx-auto max-w-[1200px] px-6 py-20 md:px-10 md:py-28"
    >
      <RevealSection>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-3">
              01. Selected Work
            </p>
            <h2
              id="work-heading"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance"
            >
              Things I&apos;ve <span className="font-editorial-italic text-accent">built</span>.
            </h2>
          </div>

          {/* Interactive segmented filter control */}
          <div
            role="group"
            aria-label="Filter projects by discipline"
            className="inline-flex items-center gap-1 p-1 rounded-lg border border-border bg-surface self-start md:self-auto"
          >
            {filters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </RevealSection>
    </section>
  );
}
