# SEO.md — Free Tool Arena 50-phase world-class SEO push

This is the **single source of truth** for the forced-SEO campaign.
Organic search is the only acquisition channel that scales without paid ads,
and with 334+ indexable pages it's our highest-leverage surface. Every
phase below is a specific, shippable action. Status legend: `[x]` = done,
`[~]` = partial, `[ ]` = pending.

Metric targets (90 days from live index):
- **Indexation:** ≥ 95 % of submitted URLs in Google index
- **Impressions:** ≥ 200,000 / month in Search Console
- **Clicks:** ≥ 10,000 / month
- **Top-20 keywords:** ≥ 300 queries
- **Rich-result eligibility:** all tool pages, guides, hubs

---

## Foundation — crawl, index, discoverability (Phases 1–10)

- [x] **Phase 1 — robots.txt is explicit and clean.** Currently generated at
      `app/robots.ts`. Allows all, disallows nothing sensitive, points at
      sitemap. Will expand with explicit `/api/*` disallow.
- [x] **Phase 2 — XML sitemap covers every public route.** `app/sitemap.ts`
      emits homepage, `/tools`, `/guides`, `/best`, hubs, guide categories,
      every published page, every trust page.
- [x] **Phase 3 — `/best` hub + curated lists.** Five pillar/hub pages
      indexable at `/best/{slug}` with ItemList + CollectionPage JSON-LD.
- [x] **Phase 4 — Programmatic variant pages (finance cluster).** Shipped
      19 loan/mortgage/retirement variants that target long-tail queries.
- [ ] **Phase 5 — Split sitemap into category sub-sitemaps.** For
      crawl-priority hints, split `/sitemap.xml` into a sitemap index
      (`/sitemap-tools.xml`, `/sitemap-guides.xml`, `/sitemap-hubs.xml`).
- [x] **Phase 6 — Self-canonical tags on every page.** `buildMetadata` and
      `buildStaticMetadata` both emit `<link rel="canonical">` to the
      absolute URL.
- [x] **Phase 7 — `dynamicParams = false`.** Prevents garbage query-string
      URLs from being indexed under both `/tools/[slug]` and
      `/guides/[slug]`.
- [x] **Phase 8 — BreadcrumbList JSON-LD on every page.** `Breadcrumbs`
      component emits structured data alongside visible crumbs.
- [x] **Phase 9 — Organization + WebSite JSON-LD at root layout.**
      Publisher identity + SearchAction hint for sitelinks search box.
- [ ] **Phase 10 — 404 page with useful suggestions.** Static
      `not-found.tsx` → add links to all 5 hubs + search box. Reduces
      bounce on broken inbound links from social.

---

## Title, meta, and on-page signals (Phases 11–20)

- [x] **Phase 11 — Unique `<title>` per page.** Every manifest entry has a
      distinct keyword-forward title.
- [x] **Phase 12 — Unique meta description per page.** 140–160 char band.
- [x] **Phase 13 — Unique H1 per page, keyword in H1.**
- [~] **Phase 14 — Keyword density audit.** 209 → 288 tools means volume
      is fine, but post-launch we'll run the keyword-density-checker on
      the top 50 pages and tune where density is < 0.3 % or > 2 %.
- [x] **Phase 15 — Open Graph + Twitter Card tags.** Emitted by
      `buildMetadata` / `buildStaticMetadata`. Dynamic 1200×630 OG images
      via `app/og/route.tsx`.
- [~] **Phase 16 — Internal linking density.** Every page has Related
      tools + Supporting guides + breadcrumbs. Hub cross-linking expands
      this further (Phase 3).
- [ ] **Phase 17 — Inline anchor text inside article bodies.** Top 30
      guides to get 3–5 contextual links into tools (naked slug → anchor).
- [ ] **Phase 18 — Last-updated stamp visible on every content page.**
      Done on tool shells and article shells via `SITE_UPDATED`. Hubs now
      also carry it.
- [x] **Phase 19 — Published + modified dates in Article JSON-LD.**
      `jsonLdFor` emits `datePublished` and `dateModified`.
- [ ] **Phase 20 — SERP snippet preview audit.** Run every top-50 tool
      through `serp-snippet-preview` and trim anything that truncates.

---

## Structured data and rich results (Phases 21–30)

- [x] **Phase 21 — SoftwareApplication schema on every tool.**
- [x] **Phase 22 — Article schema on every guide.**
- [x] **Phase 23 — FAQPage schema opt-in on tools + guides.** Wired via
      `faq` prop on ToolShell/ArticleShell. Already live on 23 tools
      + 6 guides.
- [ ] **Phase 24 — Expand FAQ schema to 40 more top tools.** In-flight.
- [ ] **Phase 25 — HowTo schema on calculators.** Every calculator has a
      How-to-use block; upgrade to HowTo JSON-LD with `@type: HowToStep`.
- [x] **Phase 26 — ItemList JSON-LD on hubs.**
- [x] **Phase 27 — CollectionPage JSON-LD on hubs.**
- [ ] **Phase 28 — CreativeWorkSeries schema on guide hub.** Binds all
      125 guides as a structured series for better clustering.
- [ ] **Phase 29 — AggregateRating placeholder schema.** Non-fraudulent
      approach: only emit once a tool has ≥ N localStorage favorites.
- [ ] **Phase 30 — Speakable schema on guides.** Small win but gets us
      voice-search eligibility.

---

## Performance + Core Web Vitals (Phases 31–36)

- [x] **Phase 31 — SSG every page.** `generateStaticParams` + static
      `page.tsx` shells = zero-runtime for the critical path.
- [x] **Phase 32 — Code-split tool bundles.** `next/dynamic` per tool
      registry entry keeps `/tools/[slug]` first-load under 330 kB.
- [x] **Phase 33 — Vercel Analytics + Speed Insights wired.**
- [ ] **Phase 34 — Image optimization audit.** Enforce `next/image` on
      any raster image that ships inline; audit OG image cache-TTL.
- [ ] **Phase 35 — Font optimization.** Verify Inter (or equivalent) is
      loaded via `next/font` with `display: swap`.
- [ ] **Phase 36 — Preconnect hints.** Add `<link rel="preconnect">` for
      AdSense + Analytics origins to shave 100–200 ms on LCP.

---

## Content depth + topical authority (Phases 37–44)

- [x] **Phase 37 — 288 tools live.** Library size = category authority.
- [x] **Phase 38 — 125 long-form guides live.** All 800–1500 words with
      H2/H3 structure + inline CTA to the matching tool.
- [x] **Phase 39 — 5 hub/pillar pages live at `/best/*`.**
- [ ] **Phase 40 — 10 comparison pages.** `X vs Y` format for head-to-head
      calculator choices (30yr vs 15yr mortgage, Roth vs Traditional, etc).
- [ ] **Phase 41 — 10 use-case variant pages.** Same tool, different
      landing (e.g. `loan-calculator-for-car`, `loan-calculator-for-home-reno`).
- [ ] **Phase 42 — Glossary.** Short definition pages for 20 money +
      SEO terms, each cross-linked from the tools that use the term.
- [ ] **Phase 43 — Rich metadata (useCases, whenToUse, example, faq) on
      top 50 tools.** 17 done, 33 to go.
- [ ] **Phase 44 — "What changed" notes on updated pages.** Surface a
      small changelog so Google's freshness signal stays on.

---

## E-E-A-T, trust, legal (Phases 45–48)

- [x] **Phase 45 — About / Contact / Privacy / Terms pages live.**
- [x] **Phase 46 — Methodology + Editorial + AI Policy + Security pages
      live.** Linked in footer and from every content shell.
- [x] **Phase 47 — TrustBar on hub + homepage.**
- [ ] **Phase 48 — Author bylines on top 30 guides.** Byline + link to a
      small `/about#authors` anchor. Improves E-E-A-T.

---

## Distribution + off-page (Phases 49–50)

- [ ] **Phase 49 — Ship 5 viral-leaning tools on social + indie communities.**
      Candidates from GROWTH.md: `invisible-character-detector`,
      `password-strength-checker`, `caffeine-intake-calculator`,
      `smoking-cost-calculator`, `meme-text-formatter`. Thread on X /
      Show HN / Product Hunt / AlternativeTo / IndieHackers.
- [ ] **Phase 50 — Submit to Bing Webmaster Tools + IndexNow.** Currently
      only on Google Search Console. Bing accounts for ~7 % of US search
      and indexes faster for new sites. IndexNow pings Bing on publish.

---

## Post-launch monitoring loop (ongoing, not numbered)

- Weekly: Search Console impressions / clicks / query-level rank tracking.
- Weekly: Run the 3 best-performing queries through the
  `serp-snippet-preview` tool and tune titles if CTR < 2 %.
- Monthly: Add one more hub page if a keyword cluster has > 5 tools.
- Monthly: Refresh `SITE_UPDATED` in `lib/seo.ts` — pushes new
  `dateModified` into every Article/SoftwareApplication JSON-LD.

## Execution order in this session

Execution order is not the numbered phase order — it's the order that
maximizes impact-per-hour:

1. Write this master plan (Phase 1–50 scaffolded) ← done
2. Finish hub pages + wire in sitemap + footer (Phase 3/26/27) ← done
3. Phase 5: split sitemap, tighten robots
4. Phase 24 + Phase 43: seed FAQ/rich metadata on more tools
5. Phase 4 + Phase 10: homepage rewrite + 404 with hub links
6. Phase 35–36: font + preconnect
7. Build-verify + git push command
