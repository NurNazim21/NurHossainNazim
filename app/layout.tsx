import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { profile } from '@/data/profile';
import { ThemeProvider } from '@/components/theme-provider';
import { MotionRoot } from '@/components/motion-primitives';
import { EcgScrollProgress } from '@/components/ecg-motif';
import { CustomCursor } from '@/components/custom-cursor';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { CommandPalette } from '@/components/command-palette';

/**
 * Fonts are self-hosted (app/fonts) instead of fetched from Google at build
 * time. `next/font/google` downloads the files during `next build`, so a blip
 * on fonts.googleapis.com fails the whole deploy with "An error occurred in
 * next/font". Serving the same woff2 files from the repo makes builds
 * deterministic and removes two third-party origins from the critical path.
 */
const plusJakartaSans = localFont({
  src: [
    { path: './fonts/plus-jakarta-sans-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/plus-jakarta-sans-500.woff2', weight: '500', style: 'normal' },
    { path: './fonts/plus-jakarta-sans-600.woff2', weight: '600', style: 'normal' },
    { path: './fonts/plus-jakarta-sans-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

const fraunces = localFont({
  src: [
    { path: './fonts/fraunces-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/fraunces-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

const jetbrainsMono = localFont({
  src: [
    { path: './fonts/jetbrains-mono-400.woff2', weight: '400', style: 'normal' },
    { path: './fonts/jetbrains-mono-500.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-mono',
  display: 'swap',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: profile.seo.title,
    template: `%s | ${profile.name}`,
  },
  description: profile.seo.description,
  keywords: profile.seo.keywords,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss.xml' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: profile.name,
    title: profile.seo.title,
    description: profile.seo.description,
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seo.title,
    description: profile.seo.description,
    images: ['/og/home.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Verified in Google Search Console / Bing Webmaster by setting
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION or NEXT_PUBLIC_BING_SITE_VERIFICATION
  // in Vercel. No code change needed once the code exists.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : {},
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${profile.name} — Portfolio`,
  alternateName: [profile.name, `${profile.name} Portfolio`, 'Nur Hossain Nazim AI/ML'],
  url: profile.siteUrl,
  inLanguage: 'en',
  description: profile.seo.description,
  publisher: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
  about: { '@type': 'Person', name: profile.name, url: profile.siteUrl },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: 'Final-Year B.Sc. CSE Student & AI/ML Engineer',
  description: profile.summary,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'United International University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dhaka',
      addressCountry: 'BD',
    },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dhaka',
    addressCountry: 'BD',
  },
  sameAs: [profile.links.linkedin, profile.links.github],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Science',
    'Convolutional Neural Networks',
    'Retrieval-Augmented Generation',
    'Echocardiography Deep Learning',
    'Spring Boot',
    'Next.js',
  ],
};

const bootScript = `
(function(){
  try {
    var t = localStorage.getItem('nazim-theme');
    if (t === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
  document.documentElement.classList.add('js');
  window.setTimeout(function(){
    if (!window.__siteReady) {
      document.documentElement.classList.add('motion-fallback');
    }
  }, 5000);
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakartaSans.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
        <ThemeProvider>
          <MotionRoot>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-accent-strong focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:text-accent-foreground"
            >
              Skip to content
            </a>
            <div className="grain-overlay" aria-hidden="true" />
            <EcgScrollProgress />
            <CustomCursor />
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
            <CommandPalette />
          </MotionRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
