import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Meta tags are the instructions you give a browser, search engine, or crawler in the
      <code>&lt;head&gt;</code> of an HTML document. Most of them are small, but collectively
      they control how the page is indexed, how it renders on mobile, what character set the
      browser uses, which URL is canonical, which languages the page has alternates in, and
      how it appears when shared. Some meta tags that were once critical are now dead
      (<code>meta keywords</code> has been ignored by major search engines for over a decade).
      Others that are easy to forget (<code>viewport</code>, <code>charset</code>) break the
      page outright if missing. This guide covers the tags that actually matter in 2026, the
      ones that are dead weight, and how they interact with each other and with structured
      data.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Charset and viewport: the non-negotiables</h2>
    <p>
      The very first meta tag in <code>&lt;head&gt;</code> should be
      <code>&lt;meta charset=&quot;UTF-8&quot;&gt;</code>. It must appear within the first 1024
      bytes of the document or browsers may fall back to an incorrect default encoding.
      <code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width,
      initial-scale=1&quot;&gt;</code> tells mobile browsers to render at the device&rsquo;s
      actual width rather than a zoomed-out desktop simulation. Without it, your site looks
      tiny on phones and fails Google&rsquo;s mobile-friendly test, which directly affects
      mobile ranking.
    </p>
    <pre>{`<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">`}</pre>

    <h2>Title and description</h2>
    <p>
      The <code>&lt;title&gt;</code> tag and <code>&lt;meta name=&quot;description&quot;&gt;</code>
      are the two highest-impact head elements. Title is a ranking signal and the SERP
      headline; description influences click-through rate. Title target is 50-60 characters.
      Description target is 150-160 characters. Both need to be unique per page. Covered
      separately in dedicated guides but mentioned here because they belong in every
      meta-tag checklist.
    </p>

    <h2>Robots directives</h2>
    <p>
      <code>&lt;meta name=&quot;robots&quot; content=&quot;...&quot;&gt;</code> controls crawler
      behavior for the page. Common values: <code>index, follow</code> (default, can be
      omitted), <code>noindex</code> (do not include in search results),
      <code>nofollow</code> (do not pass link equity), <code>noindex, nofollow</code>
      (exclude entirely). More specific directives include <code>noarchive</code> (do not
      cache a copy), <code>nosnippet</code> (do not show a description), <code>max-snippet</code>,
      <code>max-image-preview</code>, and <code>max-video-preview</code> for fine-grained
      snippet control. A page with <code>noindex</code> still gets crawled but not listed; a
      page with <code>noindex, nofollow</code> gets crawled and neither listed nor passing any
      link equity.
    </p>

    <h2>Canonical link</h2>
    <p>
      Technically a <code>&lt;link&gt;</code> rather than a <code>&lt;meta&gt;</code>, the
      canonical tag belongs in any meta-tags checklist.
      <code>&lt;link rel=&quot;canonical&quot; href=&quot;https://example.com/page&quot;&gt;</code>
      tells search engines which URL is the primary version when multiple URLs serve the same
      content. Use absolute URLs, self-reference canonicals on primary pages, and make sure the
      canonical URL actually exists and returns 200 status. A canonical pointing to a
      non-existent or redirecting URL confuses crawlers.
    </p>

    <h2>Language and hreflang alternates</h2>
    <p>
      <code>&lt;html lang=&quot;en&quot;&gt;</code> on the root element declares the page&rsquo;s
      primary language for screen readers and search engines. For multilingual sites,
      <code>&lt;link rel=&quot;alternate&quot; hreflang=&quot;fr&quot;
      href=&quot;https://example.com/fr/page&quot;&gt;</code> lists alternate language
      versions. Hreflang is complex: every variant must reference every other variant and
      itself; <code>x-default</code> specifies the fallback; invalid combinations can deindex
      alternates. Google Search Console flags hreflang errors in the International Targeting
      report.
    </p>
    <pre>{`<link rel="alternate" hreflang="en" href="https://example.com/page" />
<link rel="alternate" hreflang="fr" href="https://example.com/fr/page" />
<link rel="alternate" hreflang="es" href="https://example.com/es/page" />
<link rel="alternate" hreflang="x-default" href="https://example.com/page" />`}</pre>

    <h2>Theme color and application metadata</h2>
    <p>
      <code>&lt;meta name=&quot;theme-color&quot; content=&quot;#0066cc&quot;&gt;</code>
      controls the color of the mobile browser chrome (URL bar) on Android Chrome and iOS
      Safari Technology Preview. <code>&lt;meta name=&quot;application-name&quot;&gt;</code>
      provides the short name when the site is saved to a device home screen without a proper
      PWA manifest. For full PWA support, link to a separate <code>manifest.json</code>
      instead&mdash;the manifest subsumes most of the old Apple-specific meta tags.
    </p>

    <h2>The dead keyword tag</h2>
    <p>
      <code>&lt;meta name=&quot;keywords&quot;&gt;</code> is dead. Google has ignored it since
      at least 2009, Bing stopped using it as a ranking signal around 2014, and most SEO tools
      now flag its presence as clutter. Including it does no direct harm, but if your content
      team is spending time curating keyword meta tags, that time is wasted. Remove it during
      the next template audit.
    </p>

    <h2>Open Graph and Twitter Cards</h2>
    <p>
      Open Graph tags (<code>og:title</code>, <code>og:description</code>, <code>og:image</code>,
      <code>og:url</code>, <code>og:type</code>) control how the page previews when shared on
      Facebook, LinkedIn, Slack, iMessage, and most chat apps. Twitter Card tags
      (<code>twitter:card</code>, <code>twitter:site</code>, <code>twitter:creator</code>)
      control Twitter/X shares. Covered in depth in a dedicated guide. Include the core four
      og tags on every indexable page.
    </p>

    <h2>Referrer policy and security headers</h2>
    <p>
      <code>&lt;meta name=&quot;referrer&quot; content=&quot;strict-origin-when-cross-origin&quot;&gt;</code>
      controls how much referrer information is sent when users click outbound links. Common
      values: <code>no-referrer</code>, <code>same-origin</code>,
      <code>strict-origin-when-cross-origin</code> (modern default),
      <code>unsafe-url</code>. For most sites, HTTP response headers are the right place for
      this policy, but meta tag fallbacks help when a CDN strips headers.
      Content-Security-Policy can also be set via meta, though HTTP headers are preferred.
    </p>

    <h2>Verification and ownership tags</h2>
    <p>
      Google Search Console, Bing Webmaster Tools, Pinterest, Facebook Domain Verification, and
      others offer meta-tag-based ownership verification:
      <code>&lt;meta name=&quot;google-site-verification&quot; content=&quot;...&quot;&gt;</code>.
      Many sites accumulate half a dozen of these over the years. They are harmless if current
      but clutter the head if stale. Periodically audit and remove verification tags for
      services you no longer use.
    </p>

    <h2>Legacy tags you can skip</h2>
    <p>
      <code>meta http-equiv=&quot;Content-Type&quot;</code> is redundant with
      <code>meta charset</code>. <code>meta name=&quot;author&quot;</code> is not used by
      search engines&mdash;use structured data if you need authorship. <code>meta
      name=&quot;generator&quot;</code> leaks your CMS version and has no user-facing value.
      Apple-specific meta tags (<code>apple-mobile-web-app-capable</code>,
      <code>apple-mobile-web-app-title</code>) are replaced by a PWA manifest.
      <code>meta name=&quot;revisit-after&quot;</code> was never supported by any major search
      engine. Remove all of these during template cleanup.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Missing viewport.</strong> Without the viewport meta, mobile renders at
      desktop width and zooms out. Fails Google&rsquo;s mobile-friendly check and tanks mobile
      rankings. Always present.
    </p>
    <p>
      <strong>Charset below byte 1024.</strong> Browsers parse the first kilobyte to detect
      encoding. If the charset tag sits below that boundary, the browser may guess wrong and
      render special characters as mojibake.
    </p>
    <p>
      <strong>Noindex left on production.</strong> Accidentally shipping a staging template
      with <code>noindex</code> is one of the most common SEO disasters. Always audit robots
      directives before launch.
    </p>
    <p>
      <strong>Canonical pointing to wrong URL.</strong> Self-referencing canonicals on primary
      pages; canonicals to the preferred version on duplicates. A canonical to a redirecting
      or non-existent URL confuses crawlers and can deindex the page.
    </p>
    <p>
      <strong>Keeping the keyword meta tag.</strong> Zero impact, ongoing waste of editorial
      time. Remove it from templates.
    </p>
    <p>
      <strong>Hreflang typos.</strong> Region codes are ISO 3166-1 (like <code>GB</code>, not
      <code>UK</code>). Language codes are ISO 639-1 (like <code>he</code> for Hebrew, not
      <code>iw</code>). Typos silently ignore the alternate.
    </p>
    <p>
      <strong>Accumulating verification tags.</strong> Old Pinterest, Bing, and Yandex
      verifications pile up over years. Audit and remove the ones no longer needed.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Build a complete, modern meta tag block in one shot with the{" "}
      <a href="/tools/meta-tag-generator">meta tag generator</a>. Pair with the{" "}
      <a href="/tools/open-graph-generator">Open Graph generator</a> for the social-sharing
      half of the head, and the{" "}
      <a href="/tools/schema-markup-generator">schema markup generator</a> for the JSON-LD
      structured data that unlocks rich snippet features in search results.
    </p>
  </>
);
