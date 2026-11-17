import type { Metadata } from 'next';
import { profile } from '@/data/profile';
import { ProjectsIndex } from '@/components/projects-index';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'All five case studies by Nur Hossain Nazim: multimodal RAG pipeline, CNN plant disease classifier, real-time multiplayer backend, multi-vendor marketplace and campus guide platform.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects | Nur Hossain Nazim',
    description:
      'Research prototypes and shipped systems: retrieval pipelines, medical imaging, real-time backends and full-stack products.',
    url: '/projects',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'Nur Hossain Nazim — projects index',
      },
    ],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Projects — Nur Hossain Nazim',
    description:
      'Case studies covering machine learning research and full-stack engineering work.',
    url: `${profile.siteUrl.replace(/\/$/, '')}/projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: profile.projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: project.title,
        url: `${profile.siteUrl.replace(/\/$/, '')}/projects/${project.slug}`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectsIndex />
    </>
  );
}
