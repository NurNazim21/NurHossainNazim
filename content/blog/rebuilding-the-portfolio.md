---
title: 'Rebuilding my portfolio as a working site, not a brochure'
date: '2026-11-18'
excerpt: >-
  Real screenshots instead of mockups, repo links that resolve, a portrait that
  actually belongs in the hero, and an accessibility pass that caught three
  contrast failures I never would have seen.
cover: /blog/portfolio-hero.jpg
coverAlt: 'Hero of the rebuilt portfolio, showing the name, portrait and two-line intro.'
tags:
  - engineering
  - accessibility
published: true
featured: true
---

For most of this year my portfolio was a static page that looked finished and
behaved like a brochure: concept diagrams where screenshots should be, links to
a GitHub profile rather than the repositories, and no portrait anywhere. It
passed a glance and failed a second look, which is exactly the wrong order for
something a recruiter opens for ninety seconds.

So I rebuilt it around evidence.

## Screenshots instead of illustrations

Every project card now carries a real capture of the running product: the plant
disease upload screen, the Tank Arena lobby, the E-Shop BD storefront. The two
projects without a demo keep their interface diagrams, and both say plainly that
the source is available on request rather than sending you to my profile page.

## Links that resolve

One project linked to a repository that had been renamed six months earlier and
returned a 404. Nobody told me. Dead links are worse than missing ones, because
they quietly tell a reader that the rest of the page was not checked either.

## The parts a visitor never notices

- The hero portrait is cropped to 4:5 with deliberate headroom, compressed to
  59 KB, and set as the largest paint on the page.
- Three colour-contrast failures were fixed for WCAG AA: white on the red
  button, the ⌘K hint, and the light-theme accent.
- Link previews now render a proper card per project instead of an
  extensionless file that social scrapers refuse to read.
- Animations respect `prefers-reduced-motion`, and the page stays readable with
  JavaScript disabled.

## What I would tell anyone doing the same

Check the boring things first: every link, every image weight, every meta tag.
The design decisions feel important while you make them and disappear the moment
someone is actually deciding whether to reply to you.

The site is a static Next.js build. This writing page is new, and posts are
committed straight from a small editor, so the next thing to test is whether I
keep writing once nobody is grading it.
