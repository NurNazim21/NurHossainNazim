# Deploy — Nur Hossain Nazim portfolio

Static export (`output: 'export'`), so it hosts free anywhere: Vercel, Netlify, Cloudflare Pages or any static host. No server, no database.

## Animation audit (verified)
- Entrance, section reveal, ECG trace, magnetic CTA, card tilt, scroll progress, command
  palette and mobile menu all animate; no console errors on home or case-study pages.
- Fixed: motion primitives render their `initial` state inline (`opacity:0`), so a browser
  with JS blocked, or a page where hydration fails, showed blank sections. `layout.tsx` now
  tags `<html class="js">` on boot and arms a 5s failsafe that adds `motion-fallback` if the
  app never mounts; `globals.css` reveals that content in both cases, including
  `@media (scripting: none)`.

## What changed in this upgrade
- Hero now carries your portrait: a 4:5 figure plate on the right with accent corner ticks and a
  mono caption ("FIG. 01 · Dhaka, Bangladesh"). Assets: `public/images/portrait-800.webp` and
  `portrait-1200.webp` (131KB / 162KB). To swap the photo, replace those two files at the same
  names, keeping a 4:5 crop. The current one is cropped from the night balcony photo: headroom
  12%, face 22% of frame height, face centred at 43% across. Headline, summary and buttons reflow into the left column.
- The About photo dropped from a 1.4MB JPG to `public/images/portrait-campus.webp` (235KB),
  which fixes the slowest asset on the page.
- Real product screenshots on the cards and case-study pages: `public/projects/{plant,tank,eshop}.webp`
  (the two remaining projects keep their built-in interface concept panels).
- Fixed repo links, verified against the GitHub API:
  - Multimodal RAG → `github.com/NurNazim21/Rag_project`
  - Tank Arena → `github.com/NurNazim21/Tank-Arena`
  - E-Shop BD → `github.com/NurNazim21/ecommerce-dbms` (the old link 404'd)
  - Plant Disease and Campus Guide have no public repo, so they now read "Repo on request"
    instead of linking to your profile page.
- Verified metrics (97% accuracy, 87,867 images, 38 classes, 4-role RBAC) are shown on cards
  and case-study headers.
- Primary contact email is now `nurhossainnazim21@gmail.com` (your CV address, survives graduation);
  the UIU address is listed as University Email.
- Canonical / Open Graph / sitemap host corrected to `https://nur-hossain-nazim.vercel.app`.

## 1. Fix the deployed URL (this one is live right now)
The current deployment points its canonical, `og:url` and `sitemap.xml` at
`https://nurhossainnazim.vercel.app` (no hyphens), which is not your domain. That tells Google
the real page lives elsewhere.

In Vercel → your project → Settings → Environment Variables, set:

```
NEXT_PUBLIC_SITE_URL = https://nur-hossain-nazim.vercel.app
```

Use `https://` — a protocol-relative value like `//domain.com` throws `ERR_INVALID_URL` at build time.
`.env*` is gitignored, so the dashboard value is what production actually uses. Redeploy after saving.

## 2. Ship this version
Replace the files in your GitHub repo with this folder's contents, then push:
```bash
npm install
npm run build     # sanity check, writes out/
git add -A && git commit -m "Real screenshots, fixed repo links, SEO host" && git push
```
Vercel rebuilds on push. Or upload `out/` to Netlify Drop / Cloudflare Pages after `npm run build`.

GitHub Pages note: project sites are served from `/<repo>/`, which breaks root-absolute asset
paths. Use a custom domain or a `USERNAME.github.io` repo.

## 3. Local check
```bash
npm install && npm run dev     # http://localhost:3000
```

## Still worth adding
- Screenshots for Multimodal RAG and Campus Guide → drop into `public/projects/` at 2:1 and set
  `screenshot` in `data/profile.ts`.
- A repo URL for Plant Disease and Campus Guide if you publish them.
- A paper or repo link on the Research page once the FYDP manuscript is out.
- The phone number `+880 1954900122` is public on the site; remove it from `data/profile.ts` if
  you would rather keep the form only.
