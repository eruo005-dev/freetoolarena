# International (i18n) Rollout Playbook — Free Tool Arena

**Goal:** open new organic + AdSense traffic surface in Spanish, Portuguese, and French without jeopardizing the 551-page English site's existing Google rankings.

**Status on 2026-04-22:**

- Infrastructure live. Spanish sample shipped: 3 tools + 1 guide + hub, tools index, guides index.
- Shippable now: any additional Spanish tool/guide becomes a new translated page by dropping one file into `lib/translations/es/{tools,guides}/<slug>.ts` and registering it in `lib/translations/index.ts`.
- Portuguese (pt-BR) and French wait until Spanish conversion + RPM data is in.

---

## 1. Rule review — what I accepted, what I changed, what I added

I reviewed the incoming i18n plan against this codebase before building anything. Below is what I kept, what I rejected, and what I added. The rationale exists so future-Jay can revisit these choices without re-deriving them.

### Accepted as-is

- **Subfolder URLs** (`/es/`, `/pt/`, `/fr/`) over subdomains or ccTLDs. Pure Google-SEO argument: subfolders inherit domain authority, subdomains don't. At our traffic tier, we cannot afford to start from zero.
- **Hreflang with `x-default` → English**. Every translated page self-references + lists its alternates. English canonical is only emitted as `x-default` (not as a sibling hreflang) to match Google's documented pattern.
- **Server-rendered pages only** for translated content. No client-side locale switching. Good for SEO, good for LCP, zero locale-flicker risk.
- **One translation file per (locale × slug)**, explicitly imported in a central registry. Tree-shakes cleanly, keeps the bundle graph visible.

### Changed

- **Slug strategy**: the incoming plan proposed translating slugs (`/es/tools/calculadora-hipoteca`). I rejected this for V1 and kept English slugs (`/es/tools/mortgage-calculator`). Reasons:
  1. **Hreflang mapping stays 1:1.** Translated slugs make cross-locale redirects and alternate emission much harder. Every mismatch is a deindexing risk.
  2. **Internal-link graph stays intact.** Our 551-page site links everything by English slug. Translated slugs would force either a rewrite table or dead cross-locale links.
  3. **Native keyword is carried by title/H1/body/description**, not the URL. Google weights content signals far above URL tokens. The RPM argument for slug translation does not survive contact with the data.
  4. **Defer, don't block.** We can translate slugs later per-locale via a slug alias table if analytics shows we need it.

- **Scope of V1 translation**: the incoming plan implied full-page translation including interactive tool UIs (form labels, button copy, result strings). I narrowed V1 to **shell-only translation** — H1, eyebrow, explainer, how-to, how-it-works, when-to-use, use cases, FAQ, CTA, breadcrumbs, trust, nav, footer. The interactive tool itself (calculator form labels, units dropdown, result output) stays English for now. Reasons:
  1. **The math is universal.** Users care about native copy around the tool, not inside it.
  2. **Tool component count is 350+.** Translating every form label multiplies translation surface by 10× for single-digit RPM uplift.
  3. **Ships 10× faster**, so we get Spanish in front of Google faster and learn from real data instead of guessing.
  4. **V2 can do it in waves** per tool — driven by which translated URLs actually earn traffic.

- **Dialect choice**: the plan defaulted to Iberian Spanish (`es-ES`) and European Portuguese (`pt-PT`). I flipped both:
  - `es` → **neutral Latin American Spanish** (Mexico-first defaults for currency and cultural refs). LA audience is ~5× larger, RPM is competitive, and Spain readers parse LA Spanish fine. Reverse is less reliable.
  - `pt` → **Brazilian Portuguese (`pt-BR`)**. ~6× Portugal search volume, better AdSense RPM. Portuguese readers understand `pt-BR`.
  
- **Priority routes**: instead of translating the whole taxonomy, I locked V1 to top revenue pages only (listed in §4). Lists, hubs, comparisons, glossary, `/about` are English-only until V2. This keeps Google focused on a coherent translated cluster instead of a sprawl of thin pages.

### Added (missing from the incoming plan)

- **`generateStaticParams` + `dynamicParams=false`** on the localized routes so unknown or unpublished translated slugs return 404 instead of rendering an empty shell. Google will otherwise index broken pages the moment they're linked.
- **Localized `Metadata.alternates.canonical`** pointing to the locale URL (never back to English). Canonicalizing a translation to English deindexes the translation — common mistake, common penalty.
- **`LanguageSwitcher` shows only locales that have a translation for the current slug** (read from `localesFor(slug, type)`). Otherwise we'd offer a user a link to a 404.
- **Fallback behavior**: unpublished English slug or missing translation ⇒ 404 on the localized route. Separately, the CTA link on a translated guide points to the translated tool only if that translation exists, else to the English tool — prevents broken "Open the tool" buttons.
- **Sitemap extension**: translated URLs added to `/sitemap.xml` at priority 0.6 (tools) and 0.5 (guides), one notch below English. English stays the authoritative hub.
- **Locale-aware `toLocaleDateString` in the "Updated ..." line** — previously hardcoded `en-US`, now reads from `LOCALE_META[locale].bcp47`. Tiny detail; the kind Google's Search Quality Rater guidelines actually notice.

---

## 2. Selected pages for V1

Pulled directly from **REVENUE.md top 20**, ranked by CPC × global-ex-US search volume. International RPM is highest on finance and this matches the English site's strengths. We translate these first, measure, then expand.

### Wave A — first Spanish ship (already live)

3 tools:
- `mortgage-calculator`
- `loan-calculator`
- `compound-interest-calculator`

1 guide:
- `how-to-save-money-fast`

### Wave B — next 5 Spanish

Complete the finance cluster. Finance over-indexes in LATAM and these are the slugs most likely to earn RPM fast:

- `savings-goal-calculator`
- `debt-payoff-calculator`
- `budget-calculator`
- `paycheck-calculator`
- `roi-calculator`

Guides:
- `how-to-pay-off-debt`
- `how-to-invest-for-beginners` (if slug exists — else use `how-to-start-investing`)

### Wave C — broaden categories

Add 4 converters + 4 productivity/AI tools that travel well internationally (the math/logic is universal):

- `currency-converter`
- `image-compressor`
- `json-formatter`
- `regex-tester`
- `password-generator`
- `pomodoro-timer`
- `qr-code-generator`
- `word-counter`

### Wave D — top 10 guides

Translate the guide cluster that internally links to the finance tools above so we have coherent on-site linking inside `/es/` too. Exact slugs picked from `content/guides/registry.tsx` highest-traffic articles at time of translation.

### Stopping at 20 + 10

That's it for V1. No attempt to translate 334 pages. After Wave D ships, we freeze new translations until 30 days of analytics data tells us which earn traffic. Then only those get expanded into a full keyword cluster; the losers stay single-page and don't drag down crawl budget.

---

## 3. URL strategy

```
https://freetoolarena.com/                                  ← English root
https://freetoolarena.com/tools/<slug>                      ← English tool
https://freetoolarena.com/guides/<slug>                     ← English guide

https://freetoolarena.com/es                                ← Spanish hub
https://freetoolarena.com/es/tools                          ← Spanish tools index
https://freetoolarena.com/es/guides                         ← Spanish guides index
https://freetoolarena.com/es/tools/<slug>                   ← Spanish tool
https://freetoolarena.com/es/guides/<slug>                  ← Spanish guide

https://freetoolarena.com/pt/...                            ← (not shipped yet)
https://freetoolarena.com/fr/...                            ← (not shipped yet)
```

Rules:

1. English paths never change. `/tools/mortgage-calculator` is canonical forever.
2. Translated paths mirror the English slug 1:1.
3. `/es/foo/bar` with no translation returns 404 (not auto-fallback to English). This keeps crawl budget clean and avoids duplicate-content signals.
4. Only published English pages get localized routes. Flipping `published: false` in `lib/pages.ts` kills the translated page too.

---

## 4. Hreflang implementation

Every translated page AND the English original of a translated slug emit the full alternate set:

```html
<link rel="alternate" hreflang="en" href="https://freetoolarena.com/tools/mortgage-calculator" />
<link rel="alternate" hreflang="es" href="https://freetoolarena.com/es/tools/mortgage-calculator" />
<link rel="alternate" hreflang="x-default" href="https://freetoolarena.com/tools/mortgage-calculator" />
```

Mechanics:

- Emitted via Next.js `Metadata.alternates.languages` (built by `hreflangFor(slug, type)` in `lib/seo.ts`).
- Only slugs with ≥1 non-English translation emit hreflang at all. English-only pages skip the block entirely — Google treats no-hreflang as unambiguous English, which is what we want.
- **`x-default` always points at the English URL.** This is Google's documented best practice: when we can't detect the user's language preference, serve English.
- Each translated page's `alternates.canonical` points at **its own locale URL**, never back to English. Canonicalizing to English is the #1 mistake for sites rolling out i18n — it deindexes the translation.

---

## 5. Translation production process

### For each new tool or guide

1. **Pick the English source.** Read `lib/pages.ts`, `components/tools/<Slug>.tsx` (for the interactive behavior), and `content/guides/<slug>.ts` (for body content). Translator needs to understand the tool, not just the blurb.
2. **Write the bundle file** at `lib/translations/<locale>/<tools|guides>/<slug>.ts`.
   - For tools: implement `ToolTranslation` from `lib/i18n.ts`. Required: `title`, `description`, `h1`, `explainer[]`, `howToUse[]`. Optional (strongly encouraged for top 20): `howItWorks[]`, `whenToUse[]`, `useCases[]`, `faq[]`.
   - For guides: implement `GuideTranslation`. Required: `title`, `description`, `h1`, `intro[]`, `sections[]`. Optional: `cta` (points at English `targetSlug`), `faq[]`.
3. **Native rewriting, not literal translation.** The Spanish `mortgage-calculator` bundle mentions INFONAVIT/FOVISSSTE and uses "enganche"/"cuota mensual" — things a literal MT pass would miss. Same principle for pt-BR (use "prestação" not "parcela mensal", localize to CDC/SFH references) and fr (use "mensualité"/"taux nominal", reference EUR defaults).
4. **Register in the central index.** Add the import + slot to `lib/translations/index.ts` BUNDLES record.
5. **Verify locally**: `npm run build` + visit `/<locale>/tools/<slug>`. Check: H1, meta description, FAQ rendered, LanguageSwitcher visible, Google's Rich Results test passes on the FAQ + HowTo JSON-LD.
6. **Ship.** The sitemap picks up the translated URL automatically on next build.

### Quality bar

- Title/H1 must contain the **primary native keyword** (e.g. "calculadora de hipoteca" in Spanish, not "mortgage calculator" with a Spanish subtitle).
- Description 140–160 chars, ends with a call to action ("Gratis, sin registro").
- FAQ minimum 4 questions for top-20 tools. Questions should mirror real native-language search queries, not translations of English FAQs.
- Cultural localization: currency symbols, regional examples (AFORE in MX, PREVI/CDC in BR), local financial vehicles (CETES, Tesouro Direto, Livret A).
- No Google-Translate output. Period. If this rule is broken, we'll be penalized on E-E-A-T long before Google's algorithm penalizes us on duplicate content.

---

## 6. What changed in the codebase

### New files

```
lib/i18n.ts                                        Locale types, LOCALE_META, path helpers
lib/translations/index.ts                          Central registry + accessor functions
lib/translations/en/common.ts                      Source-of-truth English strings
lib/translations/es/common.ts                      Native Spanish strings
lib/translations/es/tools/mortgage-calculator.ts   Full Spanish bundle
lib/translations/es/tools/loan-calculator.ts       Full Spanish bundle
lib/translations/es/tools/compound-interest-calculator.ts
lib/translations/es/guides/how-to-save-money-fast.ts
components/LanguageSwitcher.tsx                    Hreflang-aware locale switcher
components/LocalizedToolShell.tsx                  Spanish tool page chrome
components/LocalizedArticleShell.tsx               Spanish guide page chrome
app/es/page.tsx                                    Spanish hub
app/es/tools/page.tsx                              Spanish tools index
app/es/tools/[slug]/page.tsx                       Spanish tool detail route
app/es/guides/page.tsx                             Spanish guides index
app/es/guides/[slug]/page.tsx                      Spanish guide detail route
```

### Modified files

```
lib/seo.ts          Added buildLocalizedMetadata(), hreflangFor();
                    buildMetadata() now emits hreflang when a slug has any translation
app/sitemap.ts      Extended to emit localized URLs for any locale with ≥1 translation
```

### Design choices worth re-reading

- `translatedSlugs(locale, type)` is the ONE function that controls both `generateStaticParams` and the sitemap. If it returns the slug, the page renders and is listed. If it doesn't, nothing happens. Flip a flag in `BUNDLES` and the entire page disappears.
- `pageHref(page)` returns the English path; `LOCALE_META[locale].urlPrefix` prepends the locale. This means translated URLs are always derivable from English state — no duplicate slug storage.
- `getPageBySlug(slug)` still returns the English manifest entry on the translated route. We need it for schema.org JSON-LD, category lookups, and the sitemap — translation is a display overlay, not a separate page record.

---

## 7. Scaling to the remaining Spanish set, then pt-BR and fr

### Spanish remainder (Waves B–D)

Execute in order above. Expected effort per translation, given a native writer:

- Tool translation: 40–60 min (write + localize examples + QA FAQ for search intent).
- Guide translation: 90–120 min (longer body, CTA wiring, culturally-tuned examples).
- Total Wave B+C+D: ~20 tool + ~10 guide translations ≈ 30–40 hours of write time. A single writer can ship this in 2 weeks.

Build-and-deploy effort is zero per translation — the infrastructure is in place. Push the bundle file, update `BUNDLES`, commit.

### Portuguese (pt-BR) rollout

Clone the Spanish structure:

1. Add `pt/common.ts` (mirror `es/common.ts`, translate to pt-BR).
2. Create `app/pt/page.tsx`, `app/pt/tools/[slug]/page.tsx`, `app/pt/guides/[slug]/page.tsx`, plus tools/guides index pages. Each is a copy of the `/es` versions with `LOCALE = "pt"`.
3. Translate the same 20 tools + 10 guides that were shipped in Spanish. Do NOT pick different top-20 — consistency gives us cleaner analytics ("Spanish users bought this finance tool, Portuguese users did too" is a real signal; mismatched sets look like random noise).
4. Flip `BUNDLES.pt.common` from `EN_COMMON` to `PT_COMMON` once common.ts is written.

**Don't ship pt-BR until Spanish has 30 days of AdSense + GSC data** so we can A/B our initial wave picks before multiplying the surface.

### French (fr) rollout

Same structure, but with a different tool selection lens:

- FR RPM is higher than LATAM RPM for finance, but volume is lower.
- FR audience skews less mobile; productivity/developer tools travel better than in MX/BR.
- So for FR we swap in: `regex-tester`, `password-generator`, `json-formatter`, `word-counter`, `qr-code-generator` into Wave A; finance still matters but drops to Wave B.

---

## 8. Validation checklist (before each wave ships)

Run this before flipping a new locale or a new translated slug to live:

- `node_modules/.bin/tsc --noEmit` — clean.
- `npm run build` — 0 prerender failures.
- Manually hit 2 URLs per locale and check:
  - H1 renders in the target language.
  - `<title>` + meta description are translated.
  - `<link rel="canonical">` points at the locale URL.
  - `<link rel="alternate" hreflang="en">` + `hreflang="<locale>">` + `hreflang="x-default">` all present.
  - `application/ld+json` blocks parse cleanly (Rich Results test).
  - LanguageSwitcher renders only locales that have a real translation.
- `/<locale>/tools/<unknown-slug>` → 404 (not a broken shell).
- `/sitemap.xml` contains the translated URLs at priority 0.6.
- `/<locale>/` hub renders the tools and guides we shipped, nothing missing.
- Google Search Console — submit `/sitemap.xml` re-fetch. Wait 3–7 days for indexing.
- Monitor GSC Coverage for "Alternate page with proper canonical tag" (expected) and NOT "Duplicate without user-selected canonical" (bug).

---

## 9. Monitoring (first 30 days after Spanish live)

Check weekly:

1. **GSC → Pages → `/es/*`** impressions + clicks. Zero impressions after 2 weeks = something's broken (likely hreflang or canonical misfire).
2. **GSC → Performance → filter to ES country.** Total clicks from `es-MX` + `es-ES` + `es-AR` + `es-CO`.
3. **AdSense → Sites → Country breakdown.** RPM per translated page vs English sibling.
4. **Analytics → Acquisition → Organic → filter `/es/`.** Session duration + bounce rate. Target: within 80% of English sibling's numbers. If translated pages bounce 2× harder, the translation quality is suspect — pull them down and re-translate.
5. **GSC → Enhancements → Breadcrumbs + FAQ.** Should show positive counts for `/es/` URLs within 14 days.

If after 30 days a translated tool has <10 impressions/week, DO NOT translate more variants of that slug into Spanish. Pick a different English page as the Wave B seed instead.

---

## 10. Open questions / deferred work

- **No `<LanguageSwitcher>` in site header yet.** The switcher is currently only on content pages. For V2: add a compact locale link to `SiteHeader.tsx` so users arriving from Google on any page can cross over. Risk: shows languages that may not have a translation for the current page, which is why I deferred it.
- **Guide body markdown has embedded `<Link>` tags to English slugs**. Translations use flat `sections[]` with string bodies only — no inline cross-linking. Acceptable for V1 because `cta + RelatedLinks` provides enough downstream paths. V2: support `{slug: "..."}` references in section bodies so translated articles link to other translated articles.
- **Ad RPM in translated pages** depends on AdSense's locale detection. We rely on `<html lang="en">` in the root layout — ideally translated routes should emit `<html lang="es">`. Next 14 app-router quirk: `lang` is set at the root layout. To fix properly we need either a per-locale route group with its own layout, or switch to a `[lang]` dynamic segment. For V1, AdSense's content-based locale detection is sufficient; measure and revisit in V2.
- **Slug-level translations** (e.g. `/es/tools/calculadora-hipoteca`) deferred. Revisit only if GSC impressions plateau on top Spanish tools.
- **No translated sitemap per locale** (single sitemap with all URLs). Google handles this fine; split if we ever exceed 50k URLs.
- **Translated OG images**: currently `/og?slug=<slug>&lang=<locale>` is emitted in metadata but the OG generator doesn't yet read `lang` from the query string. Low priority — social CTR matters less than organic rankings for this site, and the English OG image is still accurate.

---

_Last reviewed: 2026-04-22. Owner: Jay (fredoline005@gmail.com)._
