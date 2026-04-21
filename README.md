# freetoolarena.com

A scalable SEO site: 50 free interactive tools + 100 how-to guides, each targeting a specific keyword. Built to rank on Google and actually solve user problems.

## Stack
- **Next.js 14 App Router** — every page statically generated (SSG) for speed + SEO
- **Tailwind CSS** — aggressive component reuse, tiny bundle
- **TypeScript** — typed page manifest drives routing, sitemap, and internal linking
- **Zero DB** — all content in `lib/pages.ts` + React components

## Structure
```
app/
  layout.tsx          # root shell (header + footer)
  page.tsx            # homepage
  sitemap.ts          # dynamic sitemap.xml from manifest
  robots.ts           # robots.txt
  tools/
    page.tsx          # tools index
    [slug]/page.tsx   # dynamic tool routes
  guides/
    page.tsx          # guides index
    [slug]/page.tsx   # dynamic guide routes
components/
  SiteHeader, SiteFooter, ToolShell, ArticleShell, RelatedLinks
  tools/              # one file per interactive tool
content/
  guides/             # one .tsx per article body
lib/
  pages.ts            # 150-page manifest (source of truth)
  seo.ts              # per-page metadata helper
```

## Adding a new page
1. Flip `published: true` on the entry in `lib/pages.ts`.
2. **Tool?** Add a component at `components/tools/<Slug>.tsx` and register it in `components/tools/registry.ts`.
3. **Article?** Add `content/guides/<slug>.tsx` and register it in `content/guides/registry.ts`.
4. That's it — routing, sitemap, metadata, and internal linking all flow from the manifest.

## Commands
```bash
npm install
npm run dev       # local dev
npm run build     # production build (all pages SSG'd)
npm start         # serve the build
```

## Deployment
Vercel. `git push` → deploys. Every page ships as static HTML.

## Roadmap
See `PAGE_IDEAS.md` for the full 150-page plan. Cadence target: 5 pages/day.
