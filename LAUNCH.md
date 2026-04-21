# Launch Checklist — freetoolarena.com

Single-session, top-to-bottom. Assumes you own `freetoolarena.com` (primary) and `alltoolsbase.com` (secondary, 301s to primary). Both are registered at go54.com.

Estimated total time: **~30 min of your time**, plus DNS propagation wait (usually minutes, sometimes up to an hour).

---

## 1. Push to GitHub (5 min)

From the project root:

```bash
cd /path/to/freetoolarea.com
git init
git add .
git commit -m "Initial launch: 68 tools + 100 guides"
git branch -M main
```

Create a new empty repo at github.com/new — name it `freetoolarena` — then:

```bash
git remote add origin git@github.com:<your-user>/freetoolarena.git
git push -u origin main
```

(If you don't use SSH keys, swap in the HTTPS URL.)

## 2. Create the Vercel project (3 min)

1. Go to vercel.com → **Add New → Project → Import** your `freetoolarena` repo.
2. Vercel auto-detects Next.js — **do not override any settings**.
3. In **Environment Variables**, add one:
   - `NEXT_PUBLIC_CONTACT_EMAIL` = `hello@freetoolarena.com` (or whichever inbox you'll monitor)
4. Click **Deploy**. First build is ~2 minutes.
5. When done, click the preview URL (`freetoolarena-<hash>.vercel.app`) and smoke-test: home, `/tools`, `/tools/merge-pdf`, `/guides`, one guide page. If all render, you're ready to wire the domain.

## 3. Add domains in Vercel (2 min)

In **Project → Settings → Domains**, add all four:

- `freetoolarena.com`
- `www.freetoolarena.com`
- `alltoolsbase.com`
- `www.alltoolsbase.com`

Vercel will show required DNS records for each. Ignore the `www` and `alltoolsbase` ones for now — `vercel.json` already handles those redirects at the app level once the primary is live. You still need to add DNS records for all four so Vercel can issue SSL certs, but the redirect *behavior* is baked into the repo.

For each domain Vercel shows you either an **A record** (`@`, `76.76.21.21`) or a **CNAME** (`www`, `cname.vercel-dns.com`).

## 4. Point DNS at Vercel (go54.com) (10 min)

Log in at go54.com and manage DNS for each domain.

### For `freetoolarena.com`:

Delete any existing `A` or `CNAME` records for `@` and `www`. Then add:

| Type | Name / Host | Value / Target | TTL |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | 3600 (or auto) |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |

### For `alltoolsbase.com`:

Same two records. The redirect happens at Vercel's edge once the domain is attached:

| Type | Name / Host | Value / Target | TTL |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | 3600 |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 |

### go54 quirks to watch for:

- go54's UI may require you to type the root as `@`, or leave the host field blank — try blank first if `@` errors out.
- Some go54 plans default to 14400 TTL. Lower to 3600 (or their minimum) for faster propagation on launch.
- If go54 has a "parking" or "redirect" toggle on the domain, **turn it off** — it overrides DNS.
- Save each record individually; go54's UI sometimes silently drops a batch.

Back in Vercel → **Domains**, hit the refresh icon next to each domain. Within 1–60 minutes each should flip to **Valid Configuration** with a green Let's Encrypt cert.

## 5. Email forwarding (5 min, optional but recommended)

`/contact`, `/privacy`, `/terms` all display `hello@freetoolarena.com`. If no mailbox answers, the contact page is a dead end.

Cheapest path — **ImprovMX** (free tier, 1 alias):

1. Sign up at improvmx.com with your real destination (e.g. your Gmail).
2. Add domain `freetoolarena.com`, alias `hello` → your real address.
3. ImprovMX shows two MX records. Add them at go54 DNS for `freetoolarena.com`:

| Type | Name | Value | Priority | TTL |
| --- | --- | --- | --- | --- |
| MX | `@` | `mx1.improvmx.com` | 10 | 3600 |
| MX | `@` | `mx2.improvmx.com` | 20 | 3600 |

4. Send a test email from a different account → should land in your real inbox within a minute or two.

Skip this and wire real email later if you want to ship *now* — just know the contact page will be silent until you do.

## 6. Submit to search engines (5 min)

### Google Search Console
1. search.google.com/search-console → **Add property** → **Domain** → `freetoolarena.com`.
2. Verify via TXT record (Google gives you the exact string). Add at go54 as a TXT on `@`.
3. Once verified: **Sitemaps → Add new sitemap** → paste `https://freetoolarena.com/sitemap.xml`.

### Bing Webmaster Tools
bing.com/webmasters → import from Google Search Console (one click if you just did the step above).

### Vercel Analytics
Vercel → **Analytics → Enable**. No code changes needed, already wired in `app/layout.tsx`.

## 7. Launch-day smoke tests

After the primary cert is green:

- `https://freetoolarena.com/` — loads, no console errors
- `https://www.freetoolarena.com/` — 301s to apex
- `https://alltoolsbase.com/` — 301s to `https://freetoolarena.com/`
- `https://www.alltoolsbase.com/` — 301s to `https://freetoolarena.com/`
- `https://freetoolarena.com/tools/merge-pdf` — drop two PDFs, merge works
- `https://freetoolarena.com/tools/ip-lookup` — shows your real IP + geo
- `https://freetoolarena.com/tools/password-breach-checker` — try `password123`, should show breach count
- `https://freetoolarena.com/sitemap.xml` — valid XML, all URLs are `https://freetoolarena.com/...`
- `https://freetoolarena.com/robots.txt` — lists the sitemap
- `https://freetoolarena.com/og?slug=merge-pdf` — returns a 1200×630 PNG
- Paste any page URL into `https://cards-dev.twitter.com/validator` — OG card renders
- Lighthouse mobile on home: Performance 95+, SEO 100, Best Practices 100, Accessibility 95+

## 8. Rollback

If a deploy breaks production: Vercel → **Deployments** → find the last green deploy → **Promote to Production**. Back up in 30s. Nothing is stateful, so rollback is always safe.

---

## Post-launch reminders

- **Week 1–4**: Watch Google Search Console for the "Discovered — currently not indexed" phase. This is normal. Indexing accelerates once you get your first few backlinks.
- **Weekly**: Check Vercel Analytics to see which pages are drawing impressions.
- **Quarterly**: Bump dependencies (`next`, `pdfjs-dist` especially). Security patches land every few months.
- **A month before domain expiry**: Renew `freetoolarena.com` and `alltoolsbase.com` at go54.com. Put it on your calendar — don't trust registrar emails alone.

That's it. Push, deploy, DNS, done.
