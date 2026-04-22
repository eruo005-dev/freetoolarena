# Deploying freetoolarena.com

This is a one-shot launch checklist. Follow top to bottom on launch day; skim the "Post-launch" section later once indexing is rolling.

## Overview

- **Runtime:** Next.js 14 App Router, 100% statically generated.
- **Host:** Vercel (Hobby is fine to start; upgrade to Pro if traffic / bandwidth climbs).
- **Domain:** freetoolarena.com on the apex, `www.` 301s to apex (see `vercel.json`).
- **Build output:** ~180 static routes, first-load JS ~88 kB shared + ~39 kB for the heaviest tool page.
- **No database. No auth. No backend.** The only server code is the `/og` edge route.

## 1. Pre-flight in the repo

Run one clean build locally to make sure main is shippable.

```bash
npm install
npm run build
```

Expected output: `✓ Generating static pages (180/180)` and no compile errors. If you see a `canvas` or `fs` resolution error, the webpack stubs in `next.config.js` have been modified — restore them.

Sanity-check the pieces that break silently if misconfigured.

- `lib/pages.ts` — `SITE_URL` is `https://freetoolarena.com`. Every absolute link in sitemap + OG images + canonical tags derives from this. Change here, not elsewhere.
- `lib/pages.ts` — `SITE_EMAIL` defaults to `hello@freetoolarena.com` but honors `NEXT_PUBLIC_CONTACT_EMAIL` at build time.
- `app/robots.ts` and `app/sitemap.ts` — both read from `SITE_URL` and emit absolute URLs. No extra work needed.

## 2. Push the repo

Vercel deploys from Git. The simplest setup: a GitHub repo named `freetoolarena`.

```bash
cd /path/to/freetoolarena.com
git init
git add .
git commit -m "Initial launch: 65 tools + 100 guides"
git branch -M main
git remote add origin git@github.com:<your-user>/freetoolarena.git
git push -u origin main
```

If you'd rather not use GitHub, Vercel CLI works too (`npm i -g vercel && vercel --prod`). GitHub is easier long-term because push-to-deploy stays automatic.

## 3. Create the Vercel project

In the Vercel dashboard: **Add New → Project → Import the GitHub repo**. Vercel auto-detects the Next.js framework — do not override.

Settings that matter:

- **Framework preset:** Next.js (auto).
- **Root directory:** `./` (project lives at repo root).
- **Build command:** leave default (`next build`).
- **Output directory:** leave default.
- **Install command:** leave default (`npm install`).
- **Node.js version:** 20.x or newer.
- **Production branch:** `main`.

Hit **Deploy**. The first build takes ~2 minutes. You'll get a preview URL like `freetoolarena-<hash>.vercel.app` — click through and verify a few pages render: home, `/tools`, a Wave-3 tool like `/tools/merge-pdf`, and a guide.

## 4. Environment variables

Set these in **Project → Settings → Environment Variables**, scoped to **Production** (and **Preview** for parity).

| Name | Value | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@freetoolarena.com` | The inbox shown on /contact, /privacy, /terms. Swap to your real monitored address before launch. |

That is the entire env-var surface area for production. There is no API key, no DB URL, no auth secret. Redeploy once you've added it so the static build picks it up — envs only apply at build time for `NEXT_PUBLIC_*`.

## 5. Point DNS at Vercel

In **Project → Settings → Domains**, add both:

- `freetoolarena.com` (apex) — Vercel will show you an `A` record pointing at `76.76.21.21`.
- `www.freetoolarena.com` — Vercel will show you a `CNAME` pointing at `cname.vercel-dns.com`.

At your registrar (Namecheap, Cloudflare, Porkbun, etc.), set:

- **A record** `@` → `76.76.21.21`.
- **CNAME** `www` → `cname.vercel-dns.com`.
- Remove any conflicting A or CNAME records for `@` or `www`.

If the registrar is Cloudflare, set the proxy mode to **DNS only** (grey cloud) for both records during setup — Vercel handles SSL, and proxying through Cloudflare can collide with Vercel's edge caching. You can revisit orange cloud later if you explicitly want Cloudflare in front.

Vercel detects DNS in a minute or two, provisions a Let's Encrypt cert, and flips the status to **Valid Configuration**. The `vercel.json` redirect block will kick in: `www.freetoolarena.com` 301s to `freetoolarena.com`.

## 6. Email

`hello@freetoolarena.com` needs to reach a real inbox or the /contact page is a dead end. The cheapest path is a forwarder — ImprovMX is free for a single alias:

1. Sign up at improvmx.com with your real destination address.
2. Add `freetoolarena.com` and alias `hello@freetoolarena.com` → your real inbox.
3. ImprovMX shows two MX records; add them at your DNS registrar.
4. Send a test from a different account and confirm it lands.

If you want to send **from** `hello@freetoolarena.com` too, upgrade to something like Fastmail, Migadu, or Google Workspace. Not required for launch.

## 7. Analytics

Vercel Analytics is already wired in `app/layout.tsx` (`@vercel/analytics` + `@vercel/speed-insights`). Enable it per project in **Analytics → Enable** in the Vercel dashboard. Nothing else to configure.

Google Search Console is the more important one for an SEO site:

1. Go to search.google.com/search-console and add `freetoolarena.com` as a **Domain** property.
2. Verify ownership via a TXT record at your registrar.
3. Submit `https://freetoolarena.com/sitemap.xml`.
4. Check back in 2–3 days — Google will have started crawling.

### Bing Webmaster Tools

Bing indexes independently from Google and tends to rank new SEO sites faster in the first few weeks. Verify in 5 minutes:

1. Sign in at bing.com/webmasters with the Microsoft account you want to own the site.
2. **Add a site → Import from Google Search Console** is the fastest path once GSC is verified. Otherwise **Add manually** and enter `https://freetoolarena.com`.
3. Verify via one of:
   - **XML file** — Bing gives you a `BingSiteAuth.xml` file with your verification code inside. Drop it in `/public/BingSiteAuth.xml` (this folder is served at the site root), redeploy, then click "Verify" in Bing.
   - **Meta tag** — paste the meta tag into `app/layout.tsx` in the `<head>` via `export const metadata.other`, redeploy, then verify.
   - **DNS CNAME** — add the CNAME Bing provides at your registrar. Slowest but doesn't require a redeploy.
4. Once verified, go to **Sitemaps → Submit a sitemap** and submit `https://freetoolarena.com/sitemap.xml` (the index — it fans out to all five per-section sitemaps automatically).

### IndexNow (Bing + Yandex + Seznam + Naver)

IndexNow is a free ping protocol that tells Bing, Yandex, Seznam, and Naver "here are URLs that just changed, please recrawl them." Google does not honor it, so Google Search Console remains the primary channel for Google — IndexNow just accelerates the other four engines.

The key is already committed at `public/bfb35698ca8221cb0e08229834083d67.txt`. Do not rotate the filename or the contents — the file and the key inside must match, and IndexNow verifies by fetching `https://freetoolarea.com/<key>.txt` before accepting any submission.

To ping after a deploy:

```bash
# Pings every URL in every sitemap. Safe to run whenever; the endpoint dedupes.
node scripts/indexnow-ping.mjs

# Only pings the newest sections — /compare, /learn, /best. Fast (~100 URLs).
node scripts/indexnow-ping.mjs --recent

# Pings a specific URL list.
node scripts/indexnow-ping.mjs https://freetoolarea.com/tools/json-formatter https://freetoolarea.com/guides/how-to-use-json-formatter
```

Expected output: `Batch 1/N — X URLs — HTTP 200` (or `202 Accepted`). The script reads the key from `/public` automatically, so there's nothing to configure. A post-deploy cron or Vercel deploy hook can invoke it, but it is fine to run manually after each significant content push.

Docs: [indexnow.org/documentation](https://www.indexnow.org/documentation).

## 8. Launch-day smoke tests

After the production domain is live with a cert:

- `https://freetoolarena.com/` — loads, no console errors.
- `https://www.freetoolarena.com/` — 301s to apex.
- `https://freetoolarena.com/tools/merge-pdf` — the heaviest Wave-3 tool. Upload two small PDFs and confirm merge works entirely in the browser.
- `https://freetoolarena.com/sitemap.xml` — opens as XML with absolute `https://freetoolarena.com/...` URLs.
- `https://freetoolarena.com/robots.txt` — lists the sitemap.
- `https://freetoolarena.com/og?slug=tip-calculator` — returns a 1200×630 PNG.
- `https://freetoolarena.com/bfb35698ca8221cb0e08229834083d67.txt` — returns the IndexNow key as plain text. If this 404s, the key file didn't ship and IndexNow submissions will be rejected.
- Paste `https://freetoolarena.com/tools/tip-calculator` into the Twitter/LinkedIn share preview checker — OG image renders.
- Lighthouse on mobile → Performance 95+, SEO 100, Best Practices 100, Accessibility 95+.

If Lighthouse SEO drops below 100, the usual culprit is a missing meta description — check the specific page's `buildMetadata()` call.

## 9. Post-launch

The boring but necessary stuff:

- **Monitor Search Console weekly for the first month.** Watch the coverage report for indexing errors. Most new sites hit a "Discovered – currently not indexed" phase where Google sees the URL but hasn't crawled yet. This is normal for 2–4 weeks.
- **Track Vercel Analytics weekly.** You're looking for which pages are getting impressions and where users are dropping off.
- **Before adding new pages, update the manifest, then `npm run build` locally** to catch broken internal links (dangling `related` slugs are the most common mistake).
- **Renew the domain** a month before expiry — Vercel will email reminders but it's worth putting on your calendar.
- **Dependency updates quarterly.** Especially `next` (security patches land every few months) and `pdfjs-dist`.

## 10. Rollback

If a deploy breaks production, don't panic. In the Vercel dashboard: **Deployments → pick the last known-good one → Promote to Production**. Your site is back in 30 seconds. Then fix the issue on a branch, preview-deploy it, and re-promote.

There is nothing stateful on the server — no DB migrations, no caches to invalidate — so rollback is always safe.

## Architecture notes for future-you

- The `/og` route is the only server-rendered page. Everything else is static HTML served from Vercel's edge. This is the secret to sub-200ms TTFB and is deliberate.
- Heavy libraries (pdfjs-dist, pdf-lib, heic2any) are loaded via `next/dynamic` at the tool level. They only download when someone visits that specific tool's page — they do not bloat the rest of the site.
- The sitemap is generated at build time from `PAGES.filter(p => p.published)` in `lib/pages.ts`. Adding a new page is a one-line manifest change plus a component file.
- Internal linking is automatic: every leaf page gets a `Related` block derived from its `related: [...]` slug list (with fallbacks to same-category, then sitewide). This is the main SEO-positive surface area, so keep the `related` arrays populated when adding pages.
