/**
 * Blog configuration.
 *
 * Two things to fill in once, from BLOG-SETUP.md:
 * 1. Giscus (comments): repoId + categoryId from https://giscus.app
 * 2. Newsletter (optional "follow by email"): your Buttondown / Mailchimp form URL
 *
 * Until they are set the site simply omits those blocks. Nothing breaks.
 */
export const blog = {
  title: 'Writing',
  headline: 'Notes from building things.',
  description:
    'Short write-ups on machine learning, research, and the systems behind the projects on this site.',
  author: 'Nur Hossain Nazim',
  /**
   * Giscus comments. Both ids come from https://giscus.app after you install the
   * giscus app on the repo and enable Discussions.
   */
  giscus: {
    repo: 'NurNazim21/NurHossainNazim',
    repoId: 'R_kgDOVxoPVg',
    category: 'Announcements',
    categoryId: 'DIC_kwDOVxoPVs4DLXLQ',
  },
  /** Optional email signup (e.g. https://buttondown.com/your-name form URL). */
  newsletterUrl: '',
  /** Only posts with published: true show up. */
  basePath: '/blog',
} as const;

export const isCommentsReady = () =>
  Boolean(blog.giscus.repoId && blog.giscus.categoryId);
