import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The <code>&lt;title&gt;</code> tag is the single highest-leverage piece of SEO copy on a
      page. It shows in the SERP as the blue clickable headline, in browser tabs, in social
      shares that fall back to it, and in bookmarks. It is one of Google&rsquo;s oldest
      confirmed ranking signals and still one of the strongest. It also has tight limits:
      about 60 characters or roughly 600 pixels in desktop Google, with aggressive rewriting
      when Google thinks your title doesn&rsquo;t match the content. A strong title combines
      the exact query a searcher typed, a specific modifier that promises value, and enough
      brand to build recall over time. This guide covers pixel and character limits, brand
      placement, separator characters, click-worthy modifiers, and how Google rewrites titles.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Length limits: 60 characters, 600 pixels</h2>
    <p>
      Google displays about 600 pixels of title text on desktop, which corresponds to roughly
      60 characters of average-width text. Mobile truncation is similar or slightly tighter.
      The 50-60 character range is the safe target. Titles over 60 characters are frequently
      truncated with an ellipsis. Titles under 30 characters tend to be too vague to differentiate.
      Every character above 60 is a bet that Google will still show your title in full, and
      that bet usually loses.
    </p>
    <pre>{`Desktop Google:  ~600 px = ~60 chars
Mobile Google:   ~600 px = ~60 chars (narrower rendering)
Safe target:     50-60 chars
Minimum useful:  30 chars`}</pre>

    <h2>Pixel width beats character count</h2>
    <p>
      Google uses pixel width, not characters, to decide where to truncate. Wide letters (M,
      W, capitals generally) and special characters consume more pixels. Narrow letters (i, l,
      t, punctuation) consume less. A title that fits 63 characters of narrow text may exceed
      600 pixels; one that fits 57 characters of wide text may fit easily. Pixel-aware checkers
      measure against the Arial font Google uses in its SERPs, which gives a more accurate
      truncation point than a character count alone.
    </p>

    <h2>Query match and click-worthiness</h2>
    <p>
      The query term should appear in the title, ideally close to the front. Google bolds
      matching terms in the SERP, which draws the eye. But match alone is not enough&mdash;the
      title also has to promise something the searcher wants. Modifiers that boost CTR include
      numbers (&ldquo;10 ways&rdquo;, &ldquo;5-minute&rdquo;), year (&ldquo;2026 guide&rdquo;),
      specificity (&ldquo;for freelancers&rdquo;, &ldquo;on a budget&rdquo;), emotional language
      (&ldquo;ultimate&rdquo;, &ldquo;proven&rdquo;), and format promises (&ldquo;checklist&rdquo;,
      &ldquo;template&rdquo;, &ldquo;calculator&rdquo;). Pick the modifier that matches user
      intent for the target query, not the one that sounds catchiest in isolation.
    </p>

    <h2>Brand placement</h2>
    <p>
      Most sites append the brand name at the end of every title, separated from the page-specific
      content: <code>Primary Keyword &#124; Brand</code>. This order puts the unique, query-matching
      content first while still building brand recognition over time. For strong brands
      (Amazon, the New York Times, Wikipedia) the brand can go first because the brand itself
      drives clicks. For smaller brands, brand-first wastes the premium characters. A sensible
      default: brand last on content pages, brand first on the home page and primary category
      pages.
    </p>
    <pre>{`Content page:    How to Format JSON: A Beginner's Guide | Freetoolarea
Category page:   Free SEO Tools - Title, Meta, Schema | Freetoolarea
Home page:       Freetoolarea - Free Online Tools for Developers`}</pre>

    <h2>Separator characters</h2>
    <p>
      The pipe <code>|</code>, hyphen <code>-</code>, em dash <code>&mdash;</code>, and colon
      <code>:</code> are the common separators. Pipes are the most visually distinct and the
      most common in professional SEO. Hyphens feel slightly softer. Em dashes convey a more
      editorial tone. Colons work when the title follows a &ldquo;subject: description&rdquo;
      pattern. Avoid mixing separators within a single title. Every separator character costs
      1-2 characters in your budget, so repeated separators add up fast on long titles.
    </p>

    <h2>Avoid title-tag patterns that get rewritten</h2>
    <p>
      Google rewrites titles it considers bad: overly long, stuffed with keywords, identical
      across many pages, or mismatched with content. Common triggers: starting every title with
      the brand name followed by generic category text, including multiple brackets or pipes,
      repeating the same keyword two or three times, and using ALL CAPS. If Google rewrites
      your title in the wild, you can find what replacement it chose by running a
      <code>site:</code> search. Match your original title closer to what Google chose, and the
      rewrite usually stops.
    </p>

    <h2>Unique titles per page</h2>
    <p>
      Every indexable page should have a unique title tag. Duplicate titles (especially across
      pagination, sort variations, or filter combinations) confuse Google and waste crawl
      budget. Use canonical tags to consolidate filter URLs and make sure the canonical page
      has a distinctive title. Google Search Console flags duplicate titles in the Coverage
      report.
    </p>

    <h2>Title-description pairing</h2>
    <p>
      The title and meta description work together as a single SERP snippet. The title gets
      600 pixels of bold blue space; the description gets 920 pixels of smaller text.
      Well-paired titles and descriptions do not repeat each other: the title makes the primary
      promise, the description adds specifics and a CTA. A title that says &ldquo;Free Online
      SQL Formatter&rdquo; and a description that opens &ldquo;Free online SQL formatter&hellip;&rdquo;
      wastes 30 characters. Make the description complement the title instead.
    </p>

    <h2>Tracking CTR in Search Console</h2>
    <p>
      Google Search Console&rsquo;s Performance report shows CTR per query and per page.
      Pages ranking in positions 2-6 with below-average CTR are title-rewrite candidates.
      Benchmarks: position 1 averages around 30-35 percent CTR, position 3 around 10-12
      percent, position 10 around 2-3 percent. If your page sits at position 3 with 4 percent
      CTR, the title is underselling. Rewrite, wait two to four weeks, compare.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Going over 60 characters.</strong> Truncation happens at around 600 pixels.
      Titles that ellipsize waste the last characters and hide the call to action. Measure in
      pixels, not just characters.
    </p>
    <p>
      <strong>Leading with the brand name on content pages.</strong> Brand-first burns the
      first 15-20 characters on content pages where the specific topic should lead.
    </p>
    <p>
      <strong>Stuffing keywords.</strong> &ldquo;SQL Formatter, SQL Beautifier, Format SQL
      Online&rdquo; repeats the same term three times and reads as spam to both users and
      Google. One primary keyword plus one modifier is enough.
    </p>
    <p>
      <strong>Identical titles across many pages.</strong> Paginated archives, filtered
      category pages, and templated product listings often share titles. Each should be unique
      and describe what the specific page contains.
    </p>
    <p>
      <strong>Writing titles that don&rsquo;t match content.</strong> Google detects this and
      rewrites aggressively. If your title promises &ldquo;calculator&rdquo; the page better
      have one, or Google will replace the title with whatever it thinks the page is about.
    </p>
    <p>
      <strong>Using ALL CAPS.</strong> All-caps titles look like spam and some tools or
      browsers render them lowercased anyway. Use title case or sentence case consistently.
    </p>
    <p>
      <strong>Forgetting emoji behavior.</strong> Some emoji show in SERPs, some are stripped,
      and support changes over time. Use sparingly and verify the actual SERP display before
      relying on visual differentiation from emoji.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Check pixel width, character count, and truncation with the{" "}
      <a href="/tools/title-tag-length-checker">title tag length checker</a>. Pair with the{" "}
      <a href="/tools/meta-description-length-checker">meta description length checker</a>
      {" "}so the title and description work together as a single SERP snippet, and the{" "}
      <a href="/tools/serp-snippet-preview">SERP snippet preview</a> to see the rendered
      combination in both desktop and mobile formats before pushing the change live.
    </p>
  </>
);
