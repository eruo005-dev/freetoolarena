import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Meta tags are the HTML signals browsers, search engines, and
      social platforms use to decide what your page means — before
      anyone sees the content. Good meta tags push rankings up,
      improve click-through rates in search results, and make
      shared links look professional. Bad meta tags (duplicated,
      missing, truncated, or outdated) cost clicks that never
      recover. This guide covers the meta tags that actually matter
      in 2026 (not all of them do), the character budgets Google
      and Bing enforce, how title tags and descriptions interact
      with ranking, the OG and Twitter Card variants for social,
      and how to test before shipping.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The meta tags that actually matter</h2>
    <p>
      <strong>&lt;title&gt;:</strong> technically an element, not a
      meta tag, but ranked alongside them in SEO importance. The
      most influential on-page signal.
    </p>
    <p>
      <strong>&lt;meta name=&quot;description&quot;&gt;:</strong>
      {" "}doesn&rsquo;t affect ranking directly but heavily affects
      click-through from search results. Often rewritten by Google
      when it disagrees with you.
    </p>
    <p>
      <strong>&lt;meta name=&quot;viewport&quot;&gt;:</strong>{" "}
      critical for mobile. <code>width=device-width, initial-scale=1</code>
      {" "}is the universal standard.
    </p>
    <p>
      <strong>&lt;meta charset&gt;:</strong>{" "}
      <code>&lt;meta charset=&quot;UTF-8&quot;&gt;</code>. Must
      appear in the first 1024 bytes of the document.
    </p>
    <p>
      <strong>&lt;link rel=&quot;canonical&quot;&gt;:</strong> tells
      search engines which URL is authoritative when duplicate
      content exists. Critical for syndication and faceted URLs.
    </p>
    <p>
      <strong>Open Graph (og:*) tags:</strong> for Facebook,
      LinkedIn, Slack, Discord, any app using OG parsing.
    </p>
    <p>
      <strong>Twitter Card (twitter:*) tags:</strong> for X
      previews. Falls back to OG if absent.
    </p>
    <p>
      <strong>&lt;meta name=&quot;robots&quot;&gt;:</strong> controls
      indexing and following. <code>noindex</code>,{" "}
      <code>nofollow</code>, <code>noarchive</code> are common.
    </p>

    <h2>Meta tags that don&rsquo;t matter</h2>
    <p>
      <strong>keywords meta:</strong> Google ignored it since 2009.
      Don&rsquo;t bother.
    </p>
    <p>
      <strong>author, generator:</strong> cosmetic. No SEO impact.
    </p>
    <p>
      <strong>revisit-after, rating:</strong> never been supported
      by mainstream search engines.
    </p>
    <p>
      Don&rsquo;t waste bytes on tags that no parser reads.
    </p>

    <h2>Title tag — the rules</h2>
    <p>
      <strong>Length:</strong> Google truncates around 580 pixels on
      desktop, which is usually 50-60 characters. Over that, it
      cuts to &ldquo;&hellip;&rdquo; Mobile is similar.
    </p>
    <p>
      <strong>Format:</strong>{" "}
      <code>Primary Keyword | Secondary Context | Brand</code>. Put
      the keyword first. Brand last lets you be terse if truncated.
    </p>
    <p>
      <strong>Uniqueness:</strong> every page needs a unique title.
      Duplicate titles are a &ldquo;this page isn&rsquo;t helpful&rdquo;
      signal.
    </p>
    <p>
      <strong>Keyword placement:</strong> front-loaded keywords
      historically weighted more. Still a small factor.
    </p>
    <p>
      <strong>Numbers and brackets:</strong>{" "}
      <code>[2026 Guide]</code> and specific numbers raise CTR in
      A/B tests. Use sparingly — feels spammy at scale.
    </p>
    <p>
      <strong>Google rewrites titles</strong> about 60% of the time
      per 2022 research. You can&rsquo;t prevent it, but clear
      titles with the primary query keyword get rewritten less
      often.
    </p>

    <h2>Meta description — the rules</h2>
    <p>
      <strong>Length:</strong> 150-160 characters. Desktop shows
      ~158 chars; mobile slightly less. Going longer isn&rsquo;t
      penalized but gets truncated.
    </p>
    <p>
      <strong>Purpose:</strong> entice the click. Make it read like
      ad copy, not a summary.
    </p>
    <p>
      <strong>Include the query keyword</strong> — search engines
      bold matching terms in results, increasing CTR.
    </p>
    <p>
      <strong>Action verbs:</strong> &ldquo;Learn,&rdquo; &ldquo;
      Compare,&rdquo; &ldquo;Find,&rdquo; &ldquo;Get.&rdquo; Make
      the user click.
    </p>
    <p>
      <strong>One sentence or two short sentences.</strong> Anything
      longer gets truncated in the middle of a clause.
    </p>
    <p>
      <strong>Don&rsquo;t duplicate</strong> across pages. Google
      ignores duplicate descriptions and writes its own from body
      text.
    </p>

    <h2>Canonical tags</h2>
    <p>
      <code>&lt;link rel=&quot;canonical&quot; href=&quot;https://example.com/page&quot;&gt;</code>
    </p>
    <p>
      <strong>When you need one:</strong> your page is accessible
      via multiple URLs (query params, tracking params, print
      version, www/non-www mix). Tell Google which is canonical.
    </p>
    <p>
      <strong>Self-referencing canonicals</strong> on all pages are
      standard practice. Prevents surprise duplicate-content issues.
    </p>
    <p>
      <strong>Canonical must be absolute URL</strong> with protocol.
      Relative canonicals work but are risky.
    </p>
    <p>
      <strong>One canonical per page.</strong> Multiple canonical
      tags cause Google to ignore all of them.
    </p>

    <h2>Open Graph tags</h2>
    <p>
      OG tags control how links look when shared to Facebook,
      LinkedIn, WhatsApp, Discord, Slack, iMessage.
    </p>
    <p>
      <strong>Minimum set:</strong>
    </p>
    <p>
      <code>og:title</code>, <code>og:description</code>,{" "}
      <code>og:image</code>, <code>og:url</code>,{" "}
      <code>og:type</code>.
    </p>
    <p>
      <strong>og:image specs:</strong> 1200&times;630 pixels is the
      sweet spot — works across all major platforms. Under 1MB.
      PNG or JPG. Include the brand and primary message (assume
      users won&rsquo;t read the headline text).
    </p>
    <p>
      <strong>og:type:</strong>{" "}
      <code>website</code>, <code>article</code>,{" "}
      <code>product</code>, <code>video.other</code>. Defaults to{" "}
      <code>website</code>.
    </p>
    <p>
      <strong>og:locale:</strong>{" "}
      <code>en_US</code>, <code>fr_FR</code>, etc. Default is{" "}
      <code>en_US</code>.
    </p>

    <h2>Twitter Card tags</h2>
    <p>
      X reads <code>twitter:*</code> tags; falls back to OG if
      absent.
    </p>
    <p>
      <strong>Minimum useful:</strong>{" "}
      <code>twitter:card</code> = <code>summary_large_image</code>
      {" "}(for the big preview) or <code>summary</code> (small
      preview). Add <code>twitter:site</code> with your{" "}
      <code>@handle</code>.
    </p>
    <p>
      Twitter deprecated <code>twitter:creator</code> tracking but
      still parses it.
    </p>
    <p>
      If OG tags are complete, you can skip Twitter-specific tags
      except for <code>twitter:card</code>.
    </p>

    <h2>Robots meta</h2>
    <p>
      <code>&lt;meta name=&quot;robots&quot; content=&quot;index, follow&quot;&gt;</code>
    </p>
    <p>
      Default is <code>index, follow</code> — you don&rsquo;t need
      to declare it unless you&rsquo;re changing the default.
    </p>
    <p>
      <strong>Common overrides:</strong>
    </p>
    <p>
      <code>noindex</code> — don&rsquo;t show in search results
      (thank-you pages, internal tools, draft content).
    </p>
    <p>
      <code>nofollow</code> — don&rsquo;t pass link equity from this
      page&rsquo;s links (rare for whole pages; usually set per-link).
    </p>
    <p>
      <code>noarchive</code> — don&rsquo;t show cached versions.
    </p>
    <p>
      <code>max-snippet:150</code> — cap description length in
      results.
    </p>

    <h2>hreflang for international</h2>
    <p>
      <code>&lt;link rel=&quot;alternate&quot; hreflang=&quot;es&quot; href=&quot;https://example.com/es/page&quot;&gt;</code>
    </p>
    <p>
      Each language variant gets a tag. Include a{" "}
      <code>hreflang=&quot;x-default&quot;</code> for the fallback.
      Bidirectional — every language page must reference every
      other.
    </p>
    <p>
      Easy to mess up at scale. Audit with a hreflang checker
      before shipping international sites.
    </p>

    <h2>Testing before shipping</h2>
    <p>
      <strong>Facebook Sharing Debugger</strong> — tests OG tags.
      Shows what Facebook sees and re-fetches if you&rsquo;ve
      updated.
    </p>
    <p>
      <strong>Twitter Card Validator</strong> — deprecated but X
      still reads most tags via OG.
    </p>
    <p>
      <strong>LinkedIn Post Inspector</strong> — verifies LinkedIn
      rendering (its OG parser is quirky).
    </p>
    <p>
      <strong>Google Rich Results Test</strong> — checks structured
      data on top of meta tags.
    </p>
    <p>
      <strong>View source</strong> — the oldest trick. Open your
      page, Ctrl+U, check that all meta tags actually render
      server-side. Client-rendered meta tags don&rsquo;t work for
      most crawlers.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Client-rendering meta tags.</strong> Single-page apps
      that set meta tags via JavaScript often fail to render for
      crawlers. Use server-side rendering or prerender.
    </p>
    <p>
      <strong>Duplicate titles and descriptions.</strong> Common at
      scale in templated sites. Unique is better than good.
    </p>
    <p>
      <strong>Missing OG image.</strong> Links shared without an OG
      image get a text-only preview — much lower click-through.
    </p>
    <p>
      <strong>Using og:image without og:image:width/height.</strong>
      Slack and Discord cache aggressively. Without dimensions, they
      sometimes skip the preview entirely.
    </p>
    <p>
      <strong>Very long titles.</strong> 70+ chars always truncate.
      Pick one primary keyword.
    </p>
    <p>
      <strong>Keywords meta tag.</strong> Still seeing this in
      2026 means the team hasn&rsquo;t updated since 2008.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate complete meta tag blocks with the{" "}
      <a href="/tools/meta-tag-generator">meta tag generator</a>.
      Pair with the{" "}
      <a href="/tools/open-graph-generator">Open Graph generator</a>
      {" "}for social preview setup, and the{" "}
      <a href="/tools/word-counter">word counter</a> to keep your
      descriptions under 160 characters.
    </p>
  </>
);
