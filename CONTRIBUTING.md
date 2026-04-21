# Contributing new pages

The site is manifest-driven. Every tool and guide has a single entry in
`lib/pages.ts` and a single entry in the matching registry. If a page isn't
in the manifest, it doesn't exist — there are no orphan routes.

## Adding a tool

1. **Manifest entry** — add an object to `PAGES` in `lib/pages.ts`:
   - `slug` (kebab-case, unique, will be the URL)
   - `type: "tool"`
   - `category` (one of the `Category` values)
   - `title` — the `<title>` tag, keyword-first, under ~60 chars
   - `h1` — the visible page heading
   - `description` — meta description, 140–160 chars, first sentence scannable
   - `keyword` — primary search query this page is aimed at
   - `related` — 3 slugs of related pages (other tools or guides)
   - Leave `published` unset until the component is live
2. **Component** — create `components/tools/MyTool.tsx`:
   - Keep it self-contained. No side effects outside the component.
   - Run entirely in the browser. Don't call external paid APIs.
   - Handle edge cases (empty input, negative numbers, NaN) gracefully.
3. **Registry** — add an import and entry to `components/tools/registry.tsx`:
   - `render` — function returning the JSX
   - `explainer` — 150–300 words on *what* and *why* (ReactNode)
   - `howToUse` — 4 concrete steps as an array of strings
4. **Publish** — flip `published: true` in the manifest entry.

## Adding a guide

1. **Manifest entry** — same shape as a tool, but `type: "article"`.
2. **Content file** — create `content/guides/my-guide.tsx` with two exports:
   - `intro` — one or two opening paragraphs (short, direct, no filler)
   - `body` — the article body: 8–12 H2 sections, 800–1,500 words total
3. **Registry** — add an import and entry to `content/guides/registry.tsx`
   with `intro`, `body`, and an optional `cta` pointing at a related tool.
4. **Publish** — flip `published: true`.

## Editorial quality bar

- Specific over generic. Numbers, not adjectives. "$500/month" not "a lot".
- Lead with the payoff, not the warm-up.
- Cut every sentence that starts with "In today's fast-paced world".
- Every guide should internally link to 2–3 related tools or guides in body
  copy — contextually relevant, not tacked-on.
- Typographic quotes in JSX: `&rsquo;`, `&ldquo;`, `&rdquo;`.
- No unverified statistics, no made-up names, no fake testimonials.

## Publishing checklist

Before flipping `published: true`:

- [ ] Title, H1, and slug all use the primary keyword
- [ ] Description is 140–160 chars and reads as a promise, not a summary
- [ ] `related` has 3 slugs, at least one of which is already live
- [ ] Body has at least 2 internal links to other `/tools/` or `/guides/`
- [ ] `cta.targetSlug` (guides only) points at a published tool
- [ ] `npm run build` passes with zero warnings
- [ ] Page renders on mobile (DevTools responsive mode)

## Reusable UI primitives

Everything visual goes through `components/ui/*`:

- `Container` — horizontal width (narrow for reading, wide for grids)
- `Section` / `SectionHeading` — vertical rhythm for top-level blocks
- `PageHeader` — unified H1 treatment (eyebrow + title + lede + meta)
- `Card` / `CardEyebrow` / `CardTitle` / `CardBody` — surface for links
- `Button` / `ButtonLink` — primary/secondary/ghost variants
- `Badge` — small category/type chip
- `Breadcrumbs` — visible crumbs + BreadcrumbList JSON-LD
- `Prose` — wraps article body for the `.prose-body` CSS

Raw Tailwind classes on new pages are a code smell unless the new pattern
is genuinely one-off.

## SEO

`lib/seo.ts` owns canonical URLs, OG, Twitter, robots, and JSON-LD. Any new
static page should get its metadata from `buildStaticMetadata(...)`.
Content pages get it from `metadataFor(slug)`. Do not hand-write metadata
on page files.
