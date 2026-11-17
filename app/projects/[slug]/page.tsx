import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Github } from 'lucide-react';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';
import { ProjectVisual } from '@/components/project-visual';

export function generateStaticParams() {
  return profile.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = profile.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const rawTitle = `${project.shortTitle} — Nur Hossain Nazim`;
  const title = rawTitle.length <= 59 ? rawTitle : project.shortTitle;
  const description =
    project.summary.length <= 158
      ? project.summary
      : `${project.summary.slice(0, 155)}...`;

  // Case studies with a real product screenshot share that shot; the rest fall back
  // to the site card. Static files live in public/og/.
  const withShot = new Set(['plant-disease-cnn', 'tank-arena', 'eshop-bd']);
  const ogImage = withShot.has(project.slug) ? `/og/${project.slug}.jpg` : '/og/home.png';

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/projects/${project.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${project.title} — ${profile.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = profile.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = profile.projects[index];
  const nextProject = profile.projects[(index + 1) % profile.projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    description: project.summary,
    codeRepository: project.githubUrl,
    programmingLanguage: project.stack,
    author: {
      '@type': 'Person',
      name: profile.name,
      url: profile.siteUrl,
    },
  };

  return (
    <article className="mx-auto max-w-[1000px] px-6 py-14 md:px-10 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href="/#work"
        className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors mb-10"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to Selected Work</span>
      </Link>

      <header className="border-b border-border pb-10">
        <p className="font-mono text-xs text-muted-foreground mb-3 tabular-nums">
          Project 0{index + 1} · {project.category} · {project.year}
        </p>

        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground text-balance">
          {project.title}
        </h1>

        <p className="mt-5 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-[68ch]">
          {project.summary}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-4">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="accent">
                <Github className="h-4 w-4" />
                <span>View on GitHub</span>
              </Button>
            </a>
          ) : (
            <p className="font-mono text-xs text-muted-foreground">
              Repository available on request
            </p>
          )}
          <p className="font-mono text-xs text-muted-foreground">
            {project.stack.join(' · ')}
          </p>
          {project.metrics && project.metrics.length > 0 && (
            <p className="font-mono text-[11px] tracking-tight text-accent">
              {project.metrics.join(' · ')}
            </p>
          )}
        </div>
      </header>

      {/* Real product screenshot when available, otherwise the interface concept */}
      <section aria-label="Project interface" className="py-10 border-b border-border">
        <p className="font-mono text-xs text-muted-foreground mb-4">
          {project.screenshot ? 'Product Interface' : 'System Concept Preview'}
        </p>
        {project.screenshot ? (
          <figure className="overflow-hidden rounded-lg border border-border bg-surface-subtle">
            <img
              src={project.screenshot.src}
              alt={project.screenshot.alt}
              width={project.screenshot.width}
              height={project.screenshot.height}
              loading="lazy"
              decoding="async"
              className="w-full h-auto"
            />
          </figure>
        ) : (
          <div className="min-h-[210px]">
            <ProjectVisual project={project} />
          </div>
        )}
      </section>

      {/* Architecture Flow & Implementation Notes */}
      <section className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-border">
        <div className="md:col-span-5">
          <h2 className="text-lg font-semibold text-foreground mb-2">Pipeline &amp; Architecture</h2>
          <p className="font-mono text-xs leading-relaxed text-muted-foreground bg-surface border border-border rounded-md p-4">
            {project.architectureNote}
          </p>
        </div>

        <div className="md:col-span-7">
          <h2 className="text-lg font-semibold text-foreground mb-4">Key Implementation Notes</h2>
          <ul className="space-y-3">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm sm:text-base leading-relaxed text-foreground/90"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Next Project Navigation */}
      <footer className="pt-10 flex items-center justify-between gap-4">
        <span className="font-mono text-xs text-muted-foreground">Next Case Study</span>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
        >
          <span>{nextProject.shortTitle}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </footer>
    </article>
  );
}
