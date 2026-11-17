import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Download } from 'lucide-react';
import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';
import { PrintResumeButton } from '@/components/print-button';

export const metadata: Metadata = {
  title: { absolute: 'Resume & CV — Nur Hossain Nazim' },
  description:
    'Curriculum Vitae of Nur Hossain Nazim — B.Sc. CSE student at UIU, Teaching Assistant, AI/ML and full-stack developer.',
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumePage() {
  return (
    <article className="mx-auto max-w-[920px] px-6 py-14 md:px-10 md:py-20">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 no-print">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <PrintResumeButton />
          <a href={profile.cvPath} download="Nur_Hossain_Nazim_CV.pdf">
            <Button variant="accent" size="sm">
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </Button>
          </a>
        </div>
      </div>

      {/* Resume Header */}
      <header className="border-b border-border pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {profile.name}
        </h1>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {profile.location} · {profile.email} · {profile.phone}
        </p>
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          GitHub: github.com/NurNazim21 · LinkedIn: linkedin.com/in/nur-hossain-nazim
        </p>
        <p className="mt-5 text-sm sm:text-base leading-relaxed text-foreground/90">
          {profile.summary}
        </p>
      </header>

      {/* Education */}
      <section className="py-8 border-b border-border">
        <h2 className="font-mono text-xs text-accent mb-5">EDUCATION</h2>
        <div className="space-y-5">
          {profile.education.map((edu) => (
            <div key={edu.institution} className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <div>
                <h3 className="text-base font-semibold text-foreground">{edu.institution}</h3>
                <p className="text-sm text-muted-foreground">
                  {edu.degree} · {edu.score}
                </p>
                {edu.coursework && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Coursework: {edu.coursework.join(', ')}
                  </p>
                )}
              </div>
              <span className="font-mono text-xs text-muted-foreground tabular-nums shrink-0">
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section className="py-8 border-b border-border">
        <h2 className="font-mono text-xs text-accent mb-5">RESEARCH &amp; FINAL YEAR PROJECT</h2>
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
          <h3 className="text-base font-semibold text-foreground">{profile.research.title}</h3>
          <span className="font-mono text-xs text-muted-foreground">{profile.research.status}</span>
        </div>
        <ul className="space-y-2 text-sm text-foreground/90 list-disc pl-5">
          {profile.research.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section className="py-8 border-b border-border">
        <h2 className="font-mono text-xs text-accent mb-5">PROJECTS</h2>
        <div className="space-y-5">
          {profile.projects.map((proj) => (
            <div key={proj.slug}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground">{proj.title}</h3>
                <span className="font-mono text-xs text-muted-foreground">
                  {proj.stack.join(' · ')}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-foreground/90">{proj.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="py-8 border-b border-border">
        <h2 className="font-mono text-xs text-accent mb-5">EXPERIENCE &amp; LEADERSHIP</h2>
        <div className="space-y-5">
          {profile.experience.map((exp) => (
            <div key={`${exp.role}-${exp.organization}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {exp.role}, {exp.organization}
                </h3>
                <span className="font-mono text-xs text-muted-foreground tabular-nums">
                  {exp.period}
                </span>
              </div>
              <ul className="mt-1.5 space-y-1 text-sm text-foreground/90 list-disc pl-5">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="pt-8">
        <h2 className="font-mono text-xs text-accent mb-5">TECHNICAL SKILLS &amp; LANGUAGES</h2>
        <div className="space-y-2.5 text-sm">
          {profile.skillGroups.map((group) => (
            <p key={group.label}>
              <span className="font-semibold text-foreground">{group.label}:</span>{' '}
              <span className="text-foreground/90">{group.items.join(', ')}</span>
            </p>
          ))}
          <p>
            <span className="font-semibold text-foreground">Spoken Languages:</span>{' '}
            <span className="text-foreground/90">
              {profile.spokenLanguages.map((l) => `${l.language} (${l.level})`).join(', ')}
            </span>
          </p>
        </div>
      </section>
    </article>
  );
}
