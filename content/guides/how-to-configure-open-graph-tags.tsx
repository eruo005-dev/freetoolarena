import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Open Graph is the metadata protocol Facebook introduced in 2010 that controls how a URL
      previews when someone shares it. LinkedIn, Twitter (via Twitter Cards), Slack, Discord,
      iMessage, and most chat platforms all read Open Graph tags. Get them right and your link
      shares with a polished card&mdash;big image, punchy title, focused description&mdash;that
      pulls clicks. Get them wrong and your link shares as a plain URL or, worse, with a
      stretched thumbnail cropped from a random decorative element. The tags themselves are
      simple <code>&lt;meta&gt;</code> elements, but the image dimensions, caching behavior,
      fallback chains, and platform-specific quirks catch everyone the first time. This guide
      covers the core og:* properties, the 1200x630 image standard, Twitter Card variants,
      debugging workflows, and the tags that genuinely matter versus the ones that are just
      noise.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The four tags you always need</h2>
    <p>
      Four Open Graph tags cover 95 percent of link-sharing behavior:
      <code>og:title</code>, <code>og:description</code>, <code>og:image</code>, and
      <code>og:url</code>. Every indexable page should have all four. Many platforms fall back
      to the HTML <code>&lt;title&gt;</code> tag when <code>og:title</code> is missing, and to
      the meta description when <code>og:description</code> is missing, but relying on the
      fallback means you lose the ability to write shorter, punchier copy tuned for social
      sharing as opposed to search results.
    </p>
    <pre>{`<meta property="og:title" content="Free JSON Formatter" />
<meta property="og:description" content="Format, validate, and minify JSON instantly. No login." />
<meta property="og:image" content="https://example.com/og/json-formatter.png" />
<meta property="og:url" content="https://example.com/tools/json-formatter" />`}</pre>

    <h2>og:type and og:site_name</h2>
    <p>
      <code>og:type</code> tells the platform what kind of content the page represents:
      <code>website</code>, <code>article</code>, <code>video.movie</code>, <code>music.song</code>,
      <code>book</code>, or <code>profile</code>. Most pages use <code>website</code>;
      content-focused pages use <code>article</code>, which enables additional properties like
      <code>article:published_time</code> and <code>article:author</code>. <code>og:site_name</code>
      is the human-readable name of your site, shown above the preview card on some
      platforms. Both are secondary to the four core tags but add polish.
    </p>

    <h2>og:image dimensions and format</h2>
    <p>
      The recommended <code>og:image</code> is 1200 pixels by 630 pixels, aspect ratio 1.91:1.
      This is the size Facebook, LinkedIn, Slack, and Twitter (when using summary_large_image)
      all render comfortably. Minimum supported is 600 by 315 pixels. Images smaller than that
      show as thumbnails next to the title rather than as a hero card. Maximum file size is
      generally 8 MB, but keep it under 500 KB for fast rendering. PNG and JPEG are both
      supported. GIF works on some platforms. WebP works on most modern platforms but fails on
      some older scraper implementations.
    </p>
    <pre>{`Recommended:   1200 x 630 px (1.91:1)
Minimum:       600 x 315 px
Max file size: ~8 MB (platform limit)
Target size:   < 500 KB for fast render
Formats:       PNG, JPEG (safest); WebP (most modern)`}</pre>

    <h2>Specifying image dimensions explicitly</h2>
    <p>
      Add <code>og:image:width</code> and <code>og:image:height</code> to help platforms lay
      out the preview before the image downloads. This matters because many scrapers have a
      short timeout: if they cannot determine the dimensions quickly, they skip the image and
      fall back to a text-only card.
    </p>
    <pre>{`<meta property="og:image" content="https://example.com/og/home.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Dashboard showing JSON validation results" />`}</pre>

    <h2>Twitter Card tags</h2>
    <p>
      Twitter reads both Open Graph and Twitter-specific meta tags, preferring Twitter-specific
      ones when both are present. The two main card types are <code>summary</code> (small
      square image) and <code>summary_large_image</code> (full-width 1.91:1 card, similar to
      Facebook). Include <code>twitter:card</code>, optionally <code>twitter:site</code> (your
      site&rsquo;s Twitter handle), and <code>twitter:creator</code> (the article
      author&rsquo;s handle). If you already have og:image and og:description, Twitter uses
      those unless you override with twitter:image and twitter:description.
    </p>
    <pre>{`<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@yoursite" />
<meta name="twitter:creator" content="@author" />`}</pre>

    <h2>Absolute URLs are required</h2>
    <p>
      The <code>og:image</code> and <code>og:url</code> values must be absolute URLs, not
      relative paths. Scrapers fetch these URLs independently, usually without the context of
      the referring page, so a relative path like <code>/images/hero.png</code> resolves to
      the scraper&rsquo;s own domain and fails. Use <code>https://</code> not <code>http://</code>
      for all values, and do not use protocol-relative <code>//example.com/hero.png</code>
      because some older scrapers cannot parse it.
    </p>

    <h2>Caching and the Facebook debugger</h2>
    <p>
      Facebook, LinkedIn, and most platforms cache scraped metadata for days or weeks. If you
      update og tags and share the URL again, you will see the old preview until the cache
      expires. Facebook&rsquo;s Sharing Debugger at developers.facebook.com/tools/debug/ shows
      exactly what Facebook sees and lets you force a refresh with &ldquo;Scrape Again.&rdquo;
      LinkedIn has a similar Post Inspector tool. Twitter&rsquo;s Card Validator existed but has
      been deprecated; to force a Twitter refresh, append a dummy query parameter to the URL.
      Test every new page in at least one debugger before announcing a launch.
    </p>

    <h2>Localization with og:locale</h2>
    <p>
      <code>og:locale</code> specifies the language and region (like <code>en_US</code>,
      <code>fr_FR</code>, <code>pt_BR</code>). For multi-language sites,
      <code>og:locale:alternate</code> lists additional supported locales. Localized share
      previews are rare outside Facebook, but the tags signal correct language to downstream
      translation tools and accessibility software.
    </p>

    <h2>Article-specific properties</h2>
    <p>
      When <code>og:type</code> is <code>article</code>, add <code>article:published_time</code>
      (ISO 8601 datetime), <code>article:modified_time</code>, <code>article:author</code>
      (a URL or name), <code>article:section</code>, and <code>article:tag</code>. These
      surface in some rich shares on LinkedIn and Facebook and help downstream tools like
      Pocket and Instapaper categorize content.
    </p>

    <h2>Dynamic og:image generation</h2>
    <p>
      Many sites generate og images on demand using serverless functions or edge workers:
      Vercel OG, Cloudinary, or a homegrown Puppeteer job. The generator takes the page title
      and a template and produces a 1200x630 PNG with branded typography. This scales well for
      thousands of pages without designing each image manually. Cache the output aggressively
      because every social share will fetch it. A stale cache of a good image is better than a
      cache miss during a viral moment.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Relative image URLs.</strong> Scrapers cannot resolve relative paths. Always use
      absolute <code>https://</code> URLs for og:image and og:url.
    </p>
    <p>
      <strong>Wrong aspect ratio.</strong> Images that are not near 1.91:1 get cropped
      unpredictably&mdash;often cutting off the title text or your logo. Design for 1200x630
      and let platforms scale down.
    </p>
    <p>
      <strong>Forgetting og:url.</strong> Without og:url, some platforms use the URL the user
      pasted, which may include UTM parameters or tracking IDs that vary per share. Set og:url
      to the canonical URL.
    </p>
    <p>
      <strong>Not testing in the debugger.</strong> CMS previews do not match real scrapers.
      Always test with Facebook Sharing Debugger and a real share on at least two platforms
      before launch.
    </p>
    <p>
      <strong>Caching issues after updates.</strong> Platforms cache for days. Use the
      Facebook Debugger&rsquo;s force-refresh button to update the cache for a specific URL.
    </p>
    <p>
      <strong>Text too small on the og image.</strong> The image renders at small sizes on
      mobile. Headlines below 40 pixels tall in the source usually become unreadable on a
      phone. Design at actual render size.
    </p>
    <p>
      <strong>Mixing property and name attributes.</strong> <code>og:*</code> tags use
      <code>property=</code>; <code>twitter:*</code> tags use <code>name=</code>. Mix them up
      and some scrapers ignore the tags entirely.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Build a complete og tag set in seconds with the{" "}
      <a href="/tools/open-graph-generator">Open Graph generator</a>. Pair with the{" "}
      <a href="/tools/meta-tag-generator">meta tag generator</a> for the broader set of head
      tags (charset, viewport, canonical) and the{" "}
      <a href="/tools/schema-markup-generator">schema markup generator</a> to add JSON-LD that
      unlocks rich snippets in search as well as polished cards on social.
    </p>
  </>
);
