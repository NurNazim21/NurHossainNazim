import type { Metadata } from 'next';
import { profile } from '@/data/profile';
import { HeroSection } from '@/components/hero-section';
import { EcgDivider } from '@/components/ecg-motif';
import { ProjectsSection } from '@/components/projects-section';
import { ResearchSection } from '@/components/research-section';
import { ExperienceSection } from '@/components/experience-section';
import { AboutSection } from '@/components/about-section';
import { ToolkitSection } from '@/components/toolkit-section';
import { WritingSection } from '@/components/writing-section';
import { ContactSection } from '@/components/contact-section';

export const metadata: Metadata = {
  title: profile.seo.title,
  description: profile.seo.description,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss.xml' },
  },
};

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <EcgDivider />
      </div>
      <ProjectsSection />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <EcgDivider />
      </div>
      <ResearchSection />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <EcgDivider />
      </div>
      <ExperienceSection />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <EcgDivider />
      </div>
      <AboutSection />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <EcgDivider />
      </div>
      <WritingSection />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <EcgDivider />
      </div>
      <ToolkitSection />
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <EcgDivider />
      </div>
      <ContactSection />
    </div>
  );
}
