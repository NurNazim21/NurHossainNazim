import type { MetadataRoute } from 'next';
import { profile } from '@/data/profile';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = profile.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = profile.projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
