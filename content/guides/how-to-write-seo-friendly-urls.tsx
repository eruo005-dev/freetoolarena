import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      URLs are one of the highest-leverage, lowest-effort SEO factors.
      They appear in search results, get copied into social, live in
      backlinks forever, and tell both humans and crawlers what a page
      is about before anyone clicks. A good URL is short, readable,
      keyword-aware, and stable. A bad one is long, parameter-stuffed,
      fragile, and quietly costs rankings. This guide covers the rules
      that matter (and the myths that don&rsquo;t), how to choose
      slugs, the structural patterns for different page types, and
      how to handle changes without destroying SEO.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The anatomy of a good URL</h2>
    <p>
      A well-formed URL looks like:
    </p>
    <p>
      <code>https://example.com/guides/how-to-write-seo-friendly-urls</code>
    </p>
    <p>
      <strong>HTTPS:</strong> non-negotiable. Browsers flag HTTP sites
      as &ldquo;not secure&rdquo;, Google uses HTTPS as a ranking
      signal.
    </p>
    <p>
      <strong>Descriptive domain:</strong> tells visitors what kind of
      site they&rsquo;re on at a glance.
    </p>
    <p>
      <strong>Logical path:</strong> /guides/ or /blog/ signals
      content category; /tools/ signals a tool.
    </p>
    <p>
      <strong>Readable slug:</strong> lowercase, hyphens between
      words, contains the target keyword, no stop-word padding.
    </p>
    <p>
      <strong>No query parameters</strong> for canonical content.
      ?p=123 or ?page=product&id=abc is fine for filters but not for
      the primary URL of a page.
    </p>

    <h2>Slug rules — what to do</h2>
    <p>
      <strong>Use lowercase.</strong> URLs are case-sensitive. /Guide
      and /guide are different URLs that may both resolve, causing
      duplicate content. Always lowercase.
    </p>
    <p>
      <strong>Hyphens separate words.</strong> /how-to-write, not
      /how_to_write or /howToWrite. Google has stated hyphens are
      word separators; underscores are not.
    </p>
    <p>
      <strong>Include the target keyword.</strong> If the page
      targets &ldquo;nginx timeout config&rdquo;, the slug should
      reflect it. /nginx-timeout-config, not /article-1742.
    </p>
    <p>
      <strong>Drop stop words when they add no meaning.</strong>
      &ldquo;how-to-fix-a-leaky-faucet&rdquo; is better as
      &ldquo;how-to-fix-a-leaky-faucet&rdquo; (&ldquo;a&rdquo; can
      stay for readability) or &ldquo;fix-leaky-faucet&rdquo; if you
      want minimal. Avoid stripping so aggressively that the slug
      becomes cryptic.
    </p>
    <p>
      <strong>Keep it short.</strong> Aim for 3-5 meaningful words.
      Over ~60 characters, search engines truncate in results. Long
      URLs also get shared less.
    </p>
    <p>
      <strong>Be human-readable.</strong> Can you tell what the page
      is about from the URL alone? If not, fix the slug.
    </p>

    <h2>Slug rules — what NOT to do</h2>
    <p>
      <strong>Don&rsquo;t use dates for evergreen content.</strong>
      /2024/03/15/how-to-write-seo-urls ages poorly. When you update
      the content, the URL looks stale. Only use dates for
      genuinely dated content (news, changelogs).
    </p>
    <p>
      <strong>Don&rsquo;t stuff keywords.</strong> /best-cheap-
      affordable-budget-laptops-under-500 reads as spam to both users
      and modern search engines.
    </p>
    <p>
      <strong>Don&rsquo;t use session IDs or query parameters for
      canonical URLs.</strong> /product?sid=abc123&category=shoes —
      duplicate URL for every session, crawl budget waster.
    </p>
    <p>
      <strong>Don&rsquo;t use special characters.</strong> Spaces,
      accents, ampersands, and punctuation get URL-encoded to
      %20/%E9/%26 — ugly and fragile. Stick to a-z, 0-9, hyphens.
    </p>
    <p>
      <strong>Don&rsquo;t use auto-generated numbers.</strong>
      /post/8472 tells nothing. Sites that still do this (some
      WordPress defaults, some CMSes) lose SEO equity compared to
      readable-slug sites.
    </p>
    <p>
      <strong>Don&rsquo;t mirror deep folder structure.</strong>
      /category/subcategory/sub-subcategory/topic/page reads as
      bureaucratic. Two levels of hierarchy is usually enough.
    </p>

    <h2>Structural patterns by page type</h2>
    <p>
      <strong>Blog posts / guides:</strong> /guides/[slug] or
      /blog/[slug]. Keeps content grouped, allows hub pages at
      /guides/ and /blog/.
    </p>
    <p>
      <strong>Product pages:</strong> /products/[slug] or just
      /[slug] if the domain is product-focused.
    </p>
    <p>
      <strong>Categories:</strong> /categories/[category-slug] or
      /[category] if the site is category-heavy.
    </p>
    <p>
      <strong>Tools:</strong> /tools/[tool-slug]. Users recognize
      this pattern; clean to bookmark.
    </p>
    <p>
      <strong>Author pages:</strong> /author/[name-slug]. Good for
      E-E-A-T (Google&rsquo;s expertise/experience signals).
    </p>
    <p>
      <strong>Search and filter:</strong> /search?q=... and
      /category/shoes?color=red&size=10. Query params are fine here
      because these are generated pages, not canonical content.
    </p>

    <h2>Trailing slashes</h2>
    <p>
      /about and /about/ are technically different URLs. Pick one and
      redirect the other. Most modern frameworks (Next.js, Gatsby,
      Hugo) pick a convention and stick with it.
    </p>
    <p>
      <strong>Common choice:</strong> no trailing slash except on
      directory-like paths. /about, /tools, /tools/calculator.
    </p>
    <p>
      Ensure the redirect is 301 (permanent), not 302, so link equity
      consolidates on the canonical version.
    </p>

    <h2>Canonicalization — tell crawlers which URL is real</h2>
    <p>
      Even with good URL structure, duplicates happen: UTM
      parameters, www vs. non-www, filtered category pages, pagination.
    </p>
    <p>
      <strong>rel=&ldquo;canonical&rdquo; tag</strong> in the
      &lt;head&gt; declares the preferred URL for a piece of content.
      Every page should have one pointing at itself (self-canonical)
      or at a master version if it&rsquo;s a duplicate/variant.
    </p>
    <p>
      <strong>Pick www or non-www.</strong> Pick a primary, 301
      redirect the other. Set up in your hosting config or via
      Cloudflare Page Rules.
    </p>
    <p>
      <strong>Pick HTTPS.</strong> 301 all HTTP to HTTPS.
    </p>
    <p>
      <strong>Handle UTMs.</strong> ?utm_source=twitter... pages
      need canonical tags pointing back to the clean URL, otherwise
      each shared link becomes a &ldquo;new&rdquo; page for crawlers.
    </p>

    <h2>URL changes — the redirect playbook</h2>
    <p>
      If you must change a URL (rebranding, restructuring,
      consolidating content):
    </p>
    <p>
      <strong>1. 301 redirect old → new.</strong> Permanent redirects
      pass ~95% of link equity (from Google&rsquo;s statements over
      the years). 302 and 307 are temporary and less effective.
    </p>
    <p>
      <strong>2. Update internal links.</strong> Don&rsquo;t rely on
      redirects forever — each redirect hop adds latency and loses a
      tiny bit of equity. Fix site-internal links to the new URL.
    </p>
    <p>
      <strong>3. Update canonical tags.</strong> The new page should
      self-canonical to the new URL.
    </p>
    <p>
      <strong>4. Update sitemap.xml.</strong> Remove old URLs,
      submit new.
    </p>
    <p>
      <strong>5. Monitor Search Console.</strong> Watch for 404
      spikes, coverage issues, and lost rankings over the following
      weeks.
    </p>
    <p>
      Never delete a URL without a redirect unless the content is
      truly retired (then a 410 Gone can be cleaner than a 404).
    </p>

    <h2>International and language</h2>
    <p>
      <strong>Subdirectories:</strong> /en/, /fr/, /de/. Easy to
      manage from one domain, inherits domain authority.
    </p>
    <p>
      <strong>Subdomains:</strong> en.example.com, fr.example.com.
      Separate crawl budget, each is a different &ldquo;site&rdquo;
      from Google&rsquo;s view.
    </p>
    <p>
      <strong>Country domains (ccTLDs):</strong> example.fr,
      example.de. Strongest local signal; hardest to manage.
    </p>
    <p>
      Whichever you pick, use <code>hreflang</code> tags to map
      equivalent pages across languages.
    </p>

    <h2>Edge cases</h2>
    <p>
      <strong>Multiple URLs serving one page:</strong> canonical
      consolidates. Or redirect all but one. Don&rsquo;t leave
      duplicates crawlable and unmanaged.
    </p>
    <p>
      <strong>URL contains a phone number, email, or personal
      info:</strong> don&rsquo;t. URLs end up in logs, backlinks,
      referrers. Never put sensitive data in the path or query.
    </p>
    <p>
      <strong>URL decorators for analytics:</strong> UTM, gclid,
      fbclid. Accept them, canonicalize them away, don&rsquo;t
      include them in your own internal links.
    </p>
    <p>
      <strong>Auto-generated slugs from titles:</strong> acceptable
      for CMSes, but curate high-value pages manually. A blog post
      title &ldquo;10 Tips for Better X (That You Haven&rsquo;t Heard
      Before!)&rdquo; should not become a URL.
    </p>

    <h2>Tools to check URL health</h2>
    <p>
      <strong>Google Search Console:</strong> inspect any URL to see
      how Google crawls it, what canonical it assigns, what indexing
      status.
    </p>
    <p>
      <strong>Screaming Frog:</strong> crawl your own site, catch
      non-canonical URLs, redirect chains, 404s.
    </p>
    <p>
      <strong>Ahrefs / Semrush:</strong> see URLs getting the most
      backlinks — these are the URLs you must never break without a
      301.
    </p>
    <p>
      <strong>Browser devtools Network tab:</strong> confirm redirects
      are 301 (Permanent) vs 302 (Temporary).
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Building URLs around the CMS, not the content.</strong>
      /?p=42 or /node/185 is a CMS admin URL, not a user-facing one.
      Always customize.
    </p>
    <p>
      <strong>Keyword-stuffing slugs.</strong> /best-cheap-top-
      affordable-laptops-2024 looks like spam.
    </p>
    <p>
      <strong>Using URLs as breadcrumb hierarchy source of
      truth.</strong> Breadcrumbs and URL paths should generally align
      but don&rsquo;t need to mirror perfectly.
    </p>
    <p>
      <strong>Ignoring the mobile user.</strong> Long URLs on mobile
      are unreadable in share dialogs. Short wins.
    </p>
    <p>
      <strong>Not monitoring for soft 404s.</strong> A page that
      returns 200 but shows &ldquo;nothing found&rdquo; content
      wastes crawl budget and can drop rankings.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Turn any title into a clean SEO slug with the{" "}
      <a href="/tools/slug-generator">URL slug generator</a>. Pair
      with the{" "}
      <a href="/tools/case-converter">case converter</a> to standardize
      text before slugifying, and the{" "}
      <a href="/tools/url-encoder-decoder">URL encoder/decoder</a>
      {" "}when dealing with special characters or debugging
      percent-encoded links.
    </p>
  </>
);
