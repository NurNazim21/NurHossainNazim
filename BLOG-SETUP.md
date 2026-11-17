# Blog setup

The blog is part of the same static Next.js site. Posts are Markdown files, the
site is rebuilt by Vercel on every push, and the editor at `/admin` commits
those files to GitHub for you. No database, no server, nothing to keep running.

---

## 1. What you get

| Piece | Where | Cost |
| --- | --- | --- |
| Writing desk (write, upload images, publish) | `/admin` | free, uses a GitHub token |
| Blog index + post pages | `/blog`, `/blog/<slug>` | static HTML |
| Comments | Giscus on each post | free, GitHub Discussions |
| "Likes" | Giscus reactions (👍 ❤️ etc.) | free |
| Follow | RSS feed `/rss.xml` + optional email | free |
| Search engines | sitemap + Article structured data | automatic |

The home page grows a **Writing** strip automatically once you have posts.

---

## 2. One-time setup (about 10 minutes)

### 2a. Turn on comments

1. Open `https://github.com/NurNazim21/NurHossainNazim/settings` and tick
   **Discussions** under Features.
2. Create a discussion category named **Comments** (Announcements format is
   fine: only maintainers start threads, which is what we want).
3. Install the giscus app on the repo: `https://github.com/apps/giscus`.
4. Go to `https://giscus.app`, enter `NurNazim21/NurHossainNazim`, choose
   mapping **Specific term**, category **Comments**, theme **dark_dimmed**.
5. Copy the two ids from the generated snippet and paste them into
   `data/blog.ts`:

```ts
giscus: {
  repo: 'NurNazim21/NurHossainNazim',
  repoId: 'R_kgDO…',        // data-repo-id
  category: 'Comments',
  categoryId: 'DIC_kwDO…',  // data-category-id
},
```

Until both ids are filled in, the comment block simply does not render. Nothing
breaks and visitors never see an empty box.

### 2b. Optional: "follow by email"

Make a free Buttondown (or Mailchimp) form, then set its URL:

```ts
newsletterUrl: 'https://buttondown.com/your-name',
```

That link appears on the blog index and what follows is an email list you own.
RSS works with no setup at all.

### 2c. Sign in to the writing desk

1. Visit `https://nur-hossain-nazim.vercel.app/admin`.
2. Click **Sign In Using Access Token**.
3. Create a fine-grained token for the repo with **Contents: Read and write**
   (add **Pull requests: Read and write** only if you later switch on the
   editorial workflow).
4. Paste the token. It stays in that browser only, so do this once per device.

---

## 3. Writing a post

1. `/admin` → **Writing** → **New Post**.
2. Fill in:
   - **Title** and **Date** (required)
   - **Summary** (one or two sentences; used on the list, in search results and
     in link previews)
   - **Cover image** (upload right from the field; landscape 16:9 or 2:1 is best)
   - **Cover description** (alt text, so screen readers describe the image)
   - **Tags** (two or three)
   - **Publish** (off = draft, invisible on the site)
   - **Feature at top** (pins it to the top of `/blog`)
3. Write the body in the Markdown editor. Images pasted or uploaded get stored
   in `public/blog/` and served from `/blog/<file>`.
4. Press **Publish**. Vercel rebuilds in about a minute and the post is live.

The **file name is the URL**: `echocardiography-first-look` becomes
`/blog/echocardiography-first-look`. Keep it lowercase with dashes. Changing it
later changes the link, so rename before you share.

---

## 4. Local commands

```bash
npm run dev      # preview at localhost:3000, /blog included
npm run rss      # regenerate public/rss.xml by hand
npm run build    # prebuild writes rss.xml, then the static export in out/
npm run lint     # type check
```

---

## 5. Honest limits, and the upgrade path

Because the site is static, there is no server to count a click. That means:

- **Comments** work, but readers need a GitHub account. That is the anti-spam
  price, and for a technical audience it is usually fine.
- **Likes** are Giscus reactions on the post's discussion, not a number printed
  on the page.
- **Follow** is RSS plus an optional email list. There are no reader accounts.

If you later want real like counters, followers with accounts, or a
"most-read" list, that needs a small backend. The least-effort route is
Supabase (free tier: Postgres + storage + auth) with the site switched off
`output: 'export'` and hosted on Vercel's Next.js runtime. Everything else on
the site would stay exactly as it is.

---

## 6. Troubleshooting

**Post published, but not on the site.** Check the Vercel deployment list. A
push that changes only `content/` still triggers a rebuild; if the build failed,
the frontmatter is usually the cause (an unquoted colon in a value). The build
log names the file.

**Editor will not save.** The token probably expired or lost access. Sign out
at `/admin` and paste a fresh token.

**Comment box missing.** `repoId` or `categoryId` is still empty in
`data/blog.ts`, or the giscus app is not installed on the repo.

**Image does not appear.** The upload must land in `public/blog/`. If it went to
another folder, move it there and keep the path `/blog/<file>`.
