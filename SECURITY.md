# Security

A static site has a small attack surface, but not a zero one. This file records
what is enforced, what is deliberately not, and what only the site owner can do.

## What this site is (and is not)

The portfolio is a **static export** (`output: 'export'`): HTML, CSS and JS
served from Vercel's edge. There is no application server, no API of our own, no
database and no user sessions. That removes whole classes of risk outright:

- **No SQL injection surface.** No database is queried by this site, so there is
  no SQL to inject into, prepared statements or otherwise. If a backend with a
  database is ever added, the rule is parameterised queries only, never string
  concatenation.
- **No server-side injection.** Nothing accepts user input on the server.
- **No first-party cookies.** No session, no tracking cookie, no analytics cookie
  is set by this site. Reading theme preference uses `localStorage`, which is not
  sent to any server.

Third-party embeds do their own thing inside their own origins: giscus
(comments) runs in a sandboxed iframe from `giscus.app`, and the writing desk at
`/admin` loads Sveltia CMS. Neither can read this site's DOM.

## Enforced in `vercel.json`

Applied to every response. Verified live with `curl -I`.

| Header | Value | Why |
| --- | --- | --- |
| `Content-Security-Policy` | see file | Blocks script injection, foreign frames, form hijacking |
| `Strict-Transport-Security` | 2 years, subdomains, preload | HTTPS only, no downgrade |
| `X-Content-Type-Options` | `nosniff` | No MIME sniffing |
| `X-Frame-Options` | `SAMEORIGIN` | No clickjacking (belt and braces with `frame-ancestors`) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | No full URL leakage to third parties |
| `Permissions-Policy` | camera, mic, geo, payment, USB off | Nothing on this site needs them |
| `Cross-Origin-Opener-Policy` | `same-origin` | Isolates the browsing context |
| `X-Permitted-Cross-Domain-Policies` | `none` | No Flash-era cross-domain files |

The CSP allows exactly three things beyond `'self'`: `giscus.app` (comments
iframe and its stylesheet), `unpkg.com/@sveltia/cms/` (the CMS bundle and its
version check, path-scoped) and `cdn.jsdelivr.net/fontsource/` (the CMS's own
fonts). Inline scripts and styles are allowed because a static Next export
inlines its hydration payload; without a server there is no nonce to issue.
That is the one real weakness of a CSP on a static site, and it is why every
other directive is kept tight.

`connect-src` also allows `api.web3forms.com` only so the contact form can send
in place. If that ever feels too broad, remove the allow-list entry and the form
falls back to opening a pre-filled mail draft.

## Supply chain

- Sveltia CMS is pinned to an exact version with a **SHA-384 integrity hash** in
  `public/admin/index.html`, so a compromised or altered CDN file will not run.
- PostCSS is forced to a patched release through `overrides` in `package.json`
  (`npm audit` reports **0 vulnerabilities**).
- `.github/dependabot.yml` opens weekly grouped PRs for patch and minor updates,
  and holds back major Next/React jumps for a deliberate migration.
- No secret is committed. `.env.local` is gitignored and `.env.example` ships
  empty values. The Web3Forms access key is a **public** identifier by design
  (it is embedded in client JS), so treat it as public and lock it to your domain
  in the Web3Forms dashboard instead of trying to hide it.

## Reporting

`/.well-known/security.txt` points at the contact address for vulnerability
reports.

## Only the owner can do these

1. **Enable 2FA** on GitHub and Vercel. The writing desk commits through a
   GitHub token, so account security is site security.
2. **Scope the CMS token.** If you sign in to `/admin` with a personal access
   token, use a fine-grained token limited to this one repository with
   `Contents: read and write` only, and nothing else. Revoke it when not writing.
3. **Lock the Web3Forms key** to `nur-hossain-nazim.vercel.app` and any future
   custom domain in the Web3Forms dashboard, so nobody can post spam through it
   from elsewhere.
4. **Review Dependabot PRs** weekly. Merge the patch groups, read anything major.

## Known limitation

The writing desk shares an origin with the public site, which is why the CSP
allows `unpkg.com` and `jsdelivr` globally. Moving `/admin` to its own subdomain
would let the public site run an even stricter policy. Worth doing only if the
site ever accepts real user input.
