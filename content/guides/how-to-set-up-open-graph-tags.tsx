import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Open Graph tags control how your links look when shared — a
      single headline, a single image, a blurb. Good OG setup turns
      a URL paste into a little ad. Bad OG setup turns it into a
      bare link that nobody clicks. OG is the reason a well-set-up
      blog post shared to LinkedIn looks professional and a
      poorly-configured one looks broken. This guide covers the
      full OG spec (what each tag does, which are required), image
      specifications for every major platform, the type-specific
      variants (article, product, video), how to test your setup
      with each platform&rsquo;s debugger, and the quirks of
      LinkedIn, Discord, Slack, and iMessage parsing that trip
      everyone up.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What Open Graph is</h2>
    <p>
      Open Graph is a protocol Facebook introduced in 2010 to let
      web pages declare their own metadata for rich previews. Now
      used by every major social and messaging platform — Facebook,
      Instagram (via Facebook), LinkedIn, Slack, Discord, iMessage,
      WhatsApp, Telegram, Signal.
    </p>
    <p>
      OG tags live in <code>&lt;head&gt;</code> as meta tags with
      <code>property=&quot;og:*&quot;</code>:
    </p>
    <p>
      <code>&lt;meta property=&quot;og:title&quot; content=&quot;Page Title&quot;&gt;</code>
      <br />
      <code>&lt;meta property=&quot;og:description&quot; content=&quot;Description&quot;&gt;</code>
      <br />
      <code>&lt;meta property=&quot;og:image&quot; content=&quot;https://example.com/img.jpg&quot;&gt;</code>
      <br />
      <code>&lt;meta property=&quot;og:url&quot; content=&quot;https://example.com/page&quot;&gt;</code>
      <br />
      <code>&lt;meta property=&quot;og:type&quot; content=&quot;article&quot;&gt;</code>
    </p>
    <p>
      Note: OG uses <code>property=</code>, not <code>name=</code>.
      Required for Facebook&rsquo;s parser.
    </p>

    <h2>Required tags</h2>
    <p>
      <strong>og:title</strong> — headline for the preview card.
      Differs from <code>&lt;title&gt;</code> in that it&rsquo;s
      specifically for sharing (can be shorter/punchier). If
      missing, falls back to <code>&lt;title&gt;</code>.
    </p>
    <p>
      <strong>og:url</strong> — canonical URL for this resource.
      Shared preview links to this URL, not the current one.
      Useful when multiple URLs lead to the same content.
    </p>
    <p>
      <strong>og:image</strong> — preview image. Single most
      impactful OG tag for CTR.
    </p>
    <p>
      <strong>og:type</strong> — content category. Defaults to{" "}
      <code>website</code> if absent.
    </p>
    <p>
      <strong>og:description</strong> — blurb under the title.
      Optional but heavily used; skipping it leaves the preview
      sparse.
    </p>

    <h2>og:image specs</h2>
    <p>
      <strong>Recommended size:</strong> 1200&times;630 pixels (1.91:1
      aspect). Works for all platforms. Facebook displays as
      1200&times;630; Twitter crops to 2:1 (centered); LinkedIn
      crops to 1200&times;627; Slack keeps 1200&times;630.
    </p>
    <p>
      <strong>Minimum size:</strong> 600&times;315. Below that,
      Facebook and LinkedIn sometimes refuse to render it as a
      large card, fall back to a small thumbnail.
    </p>
    <p>
      <strong>File size:</strong> under 8MB for Facebook, under 5MB
      for most others. Practically, under 300KB is smart for load
      speed.
    </p>
    <p>
      <strong>Format:</strong> PNG, JPG, or WebP. Avoid SVG — most
      parsers don&rsquo;t render it.
    </p>
    <p>
      <strong>Text on image:</strong> include the title again as
      image text. Users scan faster visually, and if the title
      renders below, the reinforcement raises click-through.
    </p>
    <p>
      <strong>Safe zone:</strong> keep critical content in the
      center 1000&times;500 area. Different platforms crop
      differently around the edges.
    </p>

    <h2>Optional-but-useful tags</h2>
    <p>
      <strong>og:image:alt</strong> — alt text for the image.
      Accessibility + small SEO bump.
    </p>
    <p>
      <strong>og:image:width, og:image:height</strong> — explicit
      dimensions. Lets some parsers render faster, prevents
      fallback to small cards.
    </p>
    <p>
      <strong>og:image:type</strong> — MIME type. Rarely needed.
    </p>
    <p>
      <strong>og:locale</strong> — <code>en_US</code>,{" "}
      <code>fr_FR</code>, etc. Defaults to <code>en_US</code>.
    </p>
    <p>
      <strong>og:locale:alternate</strong> — list of other
      available locales. Useful for multilingual sites.
    </p>
    <p>
      <strong>og:site_name</strong> — your brand name. Rendered
      above or below the card depending on platform.
    </p>

    <h2>Article-specific tags</h2>
    <p>
      When <code>og:type=&quot;article&quot;</code>, add these for
      richer previews:
    </p>
    <p>
      <code>article:published_time</code> (ISO 8601)
      <br />
      <code>article:modified_time</code>
      <br />
      <code>article:author</code> (URL to author page)
      <br />
      <code>article:section</code> (topic category)
      <br />
      <code>article:tag</code> (one per tag; repeatable)
    </p>

    <h2>Product-specific tags</h2>
    <p>
      When <code>og:type=&quot;product&quot;</code>:
    </p>
    <p>
      <code>product:price:amount</code>, <code>product:price:currency</code>,{" "}
      <code>product:availability</code> (<code>in stock</code>,{" "}
      <code>out of stock</code>, <code>preorder</code>),{" "}
      <code>product:condition</code> (<code>new</code>,{" "}
      <code>used</code>, <code>refurbished</code>).
    </p>
    <p>
      These feed into Facebook Shop integrations and commerce
      previews.
    </p>

    <h2>Video-specific tags</h2>
    <p>
      For video embeds in OG previews:
    </p>
    <p>
      <code>og:video</code> (URL to player)
      <br />
      <code>og:video:type</code> (<code>video/mp4</code>,{" "}
      <code>text/html</code> for embeds)
      <br />
      <code>og:video:width</code>, <code>og:video:height</code>
    </p>
    <p>
      Only Facebook fully plays OG videos in the feed. Twitter
      uses its own video tags. Most platforms fall back to the
      image.
    </p>

    <h2>Twitter Card compatibility</h2>
    <p>
      X reads <code>twitter:*</code> tags, falling back to OG.
      Minimal Twitter tag set:
    </p>
    <p>
      <code>&lt;meta name=&quot;twitter:card&quot; content=&quot;summary_large_image&quot;&gt;</code>
      <br />
      <code>&lt;meta name=&quot;twitter:site&quot; content=&quot;@yourbrand&quot;&gt;</code>
    </p>
    <p>
      <code>summary_large_image</code> uses the big 2:1 preview.{" "}
      <code>summary</code> uses a small square thumbnail.
    </p>
    <p>
      If your OG is complete, this is all you need on the Twitter
      side.
    </p>

    <h2>Platform quirks</h2>
    <p>
      <strong>LinkedIn:</strong> caches aggressively. Once LinkedIn
      has your card, changes don&rsquo;t appear for days. Use the
      Post Inspector tool to force a refresh.
    </p>
    <p>
      <strong>Slack:</strong> renders quickly but strict about
      dimensions. Include explicit <code>og:image:width</code> and
      <code>og:image:height</code>.
    </p>
    <p>
      <strong>Discord:</strong> aggressive caching by channel.
      Clearing requires server-admin tools. Re-post in a different
      channel to test changes.
    </p>
    <p>
      <strong>iMessage:</strong> Apple does its own parsing with
      lots of fallbacks. Usually works out of the box but fragile
      with dynamic content.
    </p>
    <p>
      <strong>WhatsApp:</strong> caches for the duration of a
      conversation. Small previews only.
    </p>
    <p>
      <strong>Bluesky, Mastodon:</strong> both respect OG. Bluesky
      supports larger images (up to 4MB).
    </p>

    <h2>Dynamic OG images</h2>
    <p>
      Modern frameworks (Next.js, Vercel Edge, Cloudflare Workers)
      can generate OG images per page — title overlay, author photo,
      gradient background. Vercel&rsquo;s <code>@vercel/og</code>{" "}
      ships images as SVG-rendered-to-PNG at request time.
    </p>
    <p>
      Benefits: every page gets a unique, branded preview. Cost:
      one edge-function invocation per first share. Cache headers
      amortize this.
    </p>

    <h2>Testing before shipping</h2>
    <p>
      <strong>Facebook Sharing Debugger:</strong>{" "}
      <code>developers.facebook.com/tools/debug</code>. Paste URL,
      see what Facebook sees. &ldquo;Scrape Again&rdquo; forces a
      re-fetch.
    </p>
    <p>
      <strong>LinkedIn Post Inspector:</strong>{" "}
      <code>linkedin.com/post-inspector</code>. Required after any
      OG change — LinkedIn caches for ~7 days otherwise.
    </p>
    <p>
      <strong>Twitter Card Validator:</strong> deprecated but X
      still renders OG; use Facebook debugger as proxy.
    </p>
    <p>
      <strong>Manual test:</strong> DM a link to yourself on each
      platform. Screenshot the preview. Compare to your intent.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using relative URLs</strong> for{" "}
      <code>og:image</code> or <code>og:url</code>. Must be
      absolute with protocol (<code>https://</code>).
    </p>
    <p>
      <strong>Shipping OG tags set by JavaScript.</strong> Most
      parsers don&rsquo;t run JS. SSR or prerender.
    </p>
    <p>
      <strong>Wrong image dimensions.</strong> 800&times;800 square
      images get cropped to strips on most platforms. Use 1.91:1.
    </p>
    <p>
      <strong>Identical OG tags across pages.</strong> Every page
      needs unique <code>og:title</code>,{" "}
      <code>og:description</code>,{" "}
      <code>og:image</code>. Auto-generating from page content is
      standard practice.
    </p>
    <p>
      <strong>Skipping og:url.</strong> Canonicalization suffers.
      When links re-share, they lose attribution.
    </p>
    <p>
      <strong>Using property= and name= interchangeably.</strong>{" "}
      OG wants <code>property=</code>. Twitter wants{" "}
      <code>name=</code>. They&rsquo;re different.
    </p>
    <p>
      <strong>Large og:image files.</strong> 4MB OG images slow
      previews on mobile carriers. Keep under 300KB when possible.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate a complete OG tag block with the{" "}
      <a href="/tools/open-graph-generator">Open Graph generator</a>.
      Pair with the{" "}
      <a href="/tools/meta-tag-generator">meta tag generator</a> for
      the broader SEO meta stack, and the{" "}
      <a href="/tools/image-resizer">image resizer</a> to get your
      OG image to exactly 1200&times;630.
    </p>
  </>
);
