# Bing Webmaster Tools — Setup When You Wake Up

Three verification options, ranked fastest to slowest. Option A takes <2 minutes
because your Google Search Console site is already verified.

---

## Option A — Import from Google Search Console (FASTEST, ~2 min)

1. Open https://www.bing.com/webmasters
2. Sign in with any Microsoft account (or create one)
3. On the welcome screen, click **"Import from Google Search Console"**
4. Authorize Microsoft to read your GSC property list
5. Pick `freetoolarea.com` and click **Import**
6. Bing auto-verifies using GSC's existing verification
7. Sitemap is typically imported automatically; if not, go to
   **Sitemaps → Submit** and add: `https://freetoolarea.com/sitemap.xml`

Done. Verification is inherited from GSC.

---

## Option B — Drop an XML file (if you prefer no OAuth)

1. Open https://www.bing.com/webmasters
2. **Add a site →** enter `https://freetoolarea.com`
3. Pick the **XML File** verification option
4. Download the file they give you — it'll be named `BingSiteAuth.xml`
5. Save it to `C:\Users\eruo0\freetoolarea.com\public\BingSiteAuth.xml`
6. Commit + push:
   ```
   cd C:\Users\eruo0\freetoolarea.com
   git add public/BingSiteAuth.xml
   git commit -m "add Bing webmaster verification file"
   git push
   ```
7. Wait ~2 min for Vercel to deploy, then click **Verify** in Bing
8. Submit sitemap: `https://freetoolarea.com/sitemap.xml`

---

## Option C — DNS TXT record (cleanest but slowest)

1. Open https://www.bing.com/webmasters
2. Add site → pick **DNS (CNAME or TXT)** option
3. Copy the verification key (looks like `4F8A2B...`)
4. Log into go54.com DNS panel → add TXT record:
   - Host: `@` (or `freetoolarea.com`)
   - Value: the key Bing gave you
   - TTL: default
5. Wait 15-60 min for DNS propagation
6. Click **Verify** in Bing
7. Submit sitemap: `https://freetoolarea.com/sitemap.xml`

---

## After verification (any option)

- Confirm sitemap shows "Success" (Bing usually indexes within 24-72 hrs)
- Under **Configuration → IndexNow**, generate a key — we already wired
  IndexNow pinging in an earlier task (#135), so Bing will learn about new
  pages faster
- Check **Site Explorer** a week later for crawled/indexed page counts

---

## Recommendation

**Use Option A.** You're already verified with Google, so Bing imports that
verification in one click. Only fall back to B or C if the GSC import flow
breaks.
