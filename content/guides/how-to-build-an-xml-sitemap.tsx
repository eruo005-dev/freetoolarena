import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      An XML sitemap is a machine-readable index of the URLs you want
      search engines to crawl, wrapped in a spec the major engines
      have agreed on since 2005 (<code>sitemaps.org</code>). It will
      not magically boost rankings, but on large or deep sites it
      meaningfully improves discovery &mdash; especially for pages
      that sit more than three clicks from the homepage or have few
      inbound links. The format itself is simple, but the size
      limits, freshness signals, and submission workflow all have
      sharp edges. This guide covers the required XML structure, the
      <code> &lt;lastmod&gt;</code>,
      <code> &lt;changefreq&gt;</code>, and
      <code> &lt;priority&gt;</code> elements (and which ones Google
      still reads in 2026), the 50 MB / 50,000 URL limits, sitemap
      indexes for bigger sites, gzipping, and how to submit and
      monitor in Google Search Console and Bing Webmaster Tools.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a sitemap does and does not do</h2>
    <p>
      A sitemap tells search engines &ldquo;these are URLs that
      exist, here is when they changed.&rdquo; It helps crawlers
      find pages faster and prioritize freshly updated ones.
    </p>
    <p>
      It does <strong>not</strong> force indexing. Google still
      decides whether each URL is worth including. It does not
      replace internal linking &mdash; a page reachable only via the
      sitemap is a weak signal of importance.
    </p>

    <h2>The minimum valid sitemap</h2>
    <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2026-04-22</lastmod>
  </url>
  <url>
    <loc>https://example.com/pricing</loc>
    <lastmod>2026-04-18</lastmod>
  </url>
</urlset>`}</pre>
    <p>
      The XML declaration and the <code>xmlns</code> are required.
      Each <code>&lt;url&gt;</code> needs a <code>&lt;loc&gt;</code>;
      everything else is optional. URLs must be absolute, use one
      canonical domain, and be URL-encoded (non-ASCII characters as
      percent-encoded UTF-8).
    </p>

    <h2>lastmod &mdash; the one optional element Google actually uses</h2>
    <p>
      John Mueller and Gary Illyes have confirmed repeatedly that
      Google uses <code>&lt;lastmod&gt;</code> as a recrawl signal,
      but only when it is consistent with the actual content change
      date. Systems that set <code>lastmod</code> to the current time
      on every regeneration get their sitemap&rsquo;s lastmod ignored
      entirely.
    </p>
    <p>
      Use W3C Datetime format: <code>2026-04-22</code> or the full
      <code> 2026-04-22T14:30:00+00:00</code>. Date-only is fine.
      Only update the value when the page&rsquo;s meaningful content
      changes &mdash; not on every template tweak.
    </p>

    <h2>changefreq and priority &mdash; ignored by Google</h2>
    <p>
      Google has publicly stated (2020, reconfirmed 2024) that it
      ignores <code>&lt;changefreq&gt;</code> and
      <code> &lt;priority&gt;</code>. Bing still uses them as weak
      hints. Keep them out of new sitemaps unless you specifically
      need them for Bing or internal tooling &mdash; they add noise
      and file size.
    </p>
    <p>
      If included: <code>changefreq</code> takes values
      <code> always</code>, <code>hourly</code>, <code>daily</code>,
      <code> weekly</code>, <code>monthly</code>,
      <code> yearly</code>, <code>never</code>.
      <code> priority</code> is a number from 0.0 to 1.0, default 0.5.
    </p>

    <h2>Size limits</h2>
    <p>
      A single sitemap may contain up to <strong>50,000 URLs</strong>
      {" "}and be no larger than <strong>50 MB uncompressed</strong>.
      Gzip-compressed sitemaps are allowed (file extension
      <code> .xml.gz</code>); the 50 MB limit still applies to the
      uncompressed size.
    </p>
    <p>
      Hit either limit and your sitemap is rejected in full, not
      truncated. Split into multiple sitemaps well before the limit
      &mdash; 40,000 URLs and 40 MB are sensible thresholds.
    </p>

    <h2>Sitemap index for larger sites</h2>
    <p>
      Sites over 50,000 URLs need a sitemap index: a sitemap of
      sitemaps.
    </p>
    <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-posts.xml.gz</loc>
    <lastmod>2026-04-22</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-products.xml.gz</loc>
    <lastmod>2026-04-21</lastmod>
  </sitemap>
</sitemapindex>`}</pre>
    <p>
      An index itself is capped at 50,000 child sitemaps. Index files
      cannot nest &mdash; only one level deep.
    </p>
    <p>
      Partition by content type (posts, products, categories) or by
      date (one sitemap per month/year). Partitioning by date makes
      the per-sitemap lastmod meaningful &mdash; old months rarely
      change, so Google quickly learns which files to skip.
    </p>

    <h2>What to include and exclude</h2>
    <p>
      Include only canonical, indexable URLs that return 200 and
      that you want Google to evaluate. Exclude:
    </p>
    <p>
      URLs that 301 or 302 &mdash; list the destination instead.
      404/410 URLs. URLs marked
      <code> &lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>.
      Non-canonical versions (if <code>?utm=</code> variants exist,
      list the clean URL). Pages blocked by robots.txt.
    </p>
    <p>
      Search Console will log a warning for each noindex or
      non-canonical URL in your sitemap &mdash; keeping it clean
      helps the report stay useful.
    </p>

    <h2>Submitting and discovering</h2>
    <p>
      Three ways to tell search engines about your sitemap:
    </p>
    <p>
      <strong>robots.txt:</strong> add
      <code> Sitemap: https://example.com/sitemap.xml</code>. Picked
      up automatically by every major engine.
    </p>
    <p>
      <strong>Google Search Console:</strong> Sitemaps report in the
      left nav. Paste the URL, submit, and GSC will show the last
      read time, URL count, discovered/indexed split, and any parse
      errors.
    </p>
    <p>
      <strong>Bing Webmaster Tools:</strong> similar submission
      flow. Also honors the robots.txt declaration.
    </p>
    <p>
      The legacy ping endpoint
      (<code>google.com/ping?sitemap=</code>) was deprecated in June
      2023 and now returns 404. Do not use it.
    </p>

    <h2>Image, video, and news extensions</h2>
    <p>
      The base sitemap spec handles URLs only. Three XML extensions
      add media metadata:
    </p>
    <p>
      <strong>Image sitemap extension</strong>
      (<code>xmlns:image</code>): lists images per URL. Useful for
      image-heavy sites &mdash; e-commerce, photography, recipes.
      Google Images discovery benefits.
    </p>
    <p>
      <strong>Video sitemap extension</strong>: duration, thumbnail,
      content URL. Required for surfacing in Google Video results
      when the player is complex.
    </p>
    <p>
      <strong>News sitemap</strong>: separate file at most 1,000
      URLs, only articles published in the last two days, for
      inclusion in Google News.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Including noindex or redirected URLs.</strong> Google
      flags these as conflicts and can start ignoring your sitemap
      signals. Scrub the list on every regeneration.
    </p>
    <p>
      <strong>Auto-updating lastmod on every build.</strong> Makes
      the field useless. Only bump lastmod when the actual content
      changes &mdash; tie it to post update timestamps, not deploy
      times.
    </p>
    <p>
      <strong>Mixing protocols or domains.</strong> A sitemap at
      <code> https://www.example.com/sitemap.xml</code> may only list
      URLs on that exact host. Moving between http/https or
      www/non-www requires the sitemap to live on the same variant.
    </p>
    <p>
      <strong>Gzipping without the .gz extension.</strong> Google
      detects compressed sitemaps by extension. A <code>.xml</code>
      {" "}file served with <code>Content-Encoding: gzip</code> but
      gzipped bytes inside confuses parsers.
    </p>
    <p>
      <strong>Listing redirect chains.</strong> Sitemap URLs that
      redirect through two or more hops often get dropped before
      indexing. Keep everything direct-200.
    </p>
    <p>
      <strong>Forgetting to update on content changes.</strong> A
      sitemap regenerated nightly from a database stays fresh. One
      hand-maintained in a text file stops matching reality within
      weeks.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Build a valid URL list and <code>&lt;lastmod&gt;</code>-tagged
      sitemap with the{" "}
      <a href="/tools/sitemap-url-generator">sitemap URL generator</a>.
      Pair with the{" "}
      <a href="/tools/robots-txt-generator">robots.txt generator</a>
      {" "}so the <code>Sitemap:</code> line is in place, and the{" "}
      <a href="/tools/url-cleaner">URL cleaner</a> to make sure the
      URLs you are listing are the canonical versions without
      tracking cruft.
    </p>
  </>
);
