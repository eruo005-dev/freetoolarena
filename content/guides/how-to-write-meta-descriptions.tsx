import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The meta description is the short paragraph that shows under a page&rsquo;s title in a
      search result. It does not directly influence rankings&mdash;Google confirmed this in 2009
      and has repeated it since&mdash;but it has an outsize effect on whether a searcher
      clicks. A compelling description with the right length and a clear call to action can
      double click-through rate versus a generic or truncated one. Get the length wrong and
      Google rewrites it from page content; get the length right and the CTA strong and you
      harvest traffic your ranking already earned. This guide covers character and pixel limits,
      why Google rewrites descriptions, how to structure a description that converts, handling
      duplicates across pages, and checking mobile versus desktop truncation.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Length limits: 155-160 characters</h2>
    <p>
      The practical character limit for meta descriptions is 155 to 160 characters on desktop
      Google, which typically displays around 920 pixels of description text. Mobile truncation
      is shorter, around 120 characters, because the viewport is narrower. Bing displays up to
      about 168 characters. The 155-160 range is the safe target for primary search engines.
      Going over risks having the description cut off with an ellipsis; going well under wastes
      prime snippet real estate where you could be selling the click.
    </p>
    <pre>{`Google desktop:  ~155-160 chars (~920 px)
Google mobile:   ~120 chars
Bing:            ~168 chars
Safe target:     150-160 chars`}</pre>

    <h2>Pixel width versus character count</h2>
    <p>
      Google actually truncates based on pixel width, not character count. The character range
      is a proxy. Wide characters like capital M, W, or em dash consume more pixels per
      character than narrow ones like i, l, and punctuation. A description using many wide
      characters can truncate at 145 characters; one using many narrow characters can fit 165.
      Pixel-aware checkers measure actual width in the same font Google uses. For ordinary
      prose the 155-160 character range is reliable.
    </p>

    <h2>Why Google rewrites descriptions</h2>
    <p>
      Google rewrites roughly 60 to 70 percent of descriptions, using content from the page that
      better matches the query. When your meta description does not mention terms from the
      searcher&rsquo;s query, Google often pulls a snippet from the body that does. When your
      description is too short, generic (&ldquo;Welcome to our site&rdquo;), or clearly doesn&rsquo;t
      describe the page, Google overrides it. You can reduce rewrites by writing descriptions
      that include the likely queries your page ranks for and that read like a natural snippet,
      not a marketing tagline.
    </p>

    <h2>Structure that converts</h2>
    <p>
      The best-performing descriptions have three parts: a hook that matches the searcher&rsquo;s
      intent, a specific promise of what the page delivers, and a call to action. A typical
      structure fits all three in 150 characters. Lead with the value proposition, specify
      what makes the page different, and tell the reader what to do next. Avoid starting every
      description with the brand name&mdash;brand is already visible in the domain.
    </p>
    <pre>{`Weak:
Welcome to Acme. We sell widgets and gadgets. Check us out today.

Strong:
Shop 500+ waterproof widgets with free 2-day shipping and a 90-day
guarantee. Compare models, read 10,000+ reviews, order today.`}</pre>

    <h2>Include the target query naturally</h2>
    <p>
      Google bolds query terms in the snippet, which visually pulls the eye and lifts CTR.
      Include the likely target query once, naturally, in the first half of the description.
      Do not stuff&mdash;multiple mentions of the same phrase look spammy and can trigger a
      rewrite. If your page targets several closely related queries, pick the highest-volume
      one for the description and let the others appear in the body where Google can extract
      query-specific snippets.
    </p>

    <h2>Call to action choices</h2>
    <p>
      &ldquo;Learn more&rdquo; is the weakest CTA because it describes every link ever written.
      Stronger CTAs are specific: &ldquo;Compare plans&rdquo;, &ldquo;Get a free quote&rdquo;,
      &ldquo;Download the template&rdquo;, &ldquo;Try free for 14 days&rdquo;, &ldquo;Calculate
      your savings.&rdquo; The CTA should set the expectation of what happens after the click.
      Mismatched CTAs (promising a calculator then serving a 2,000-word article) hurt both CTR
      and bounce rate.
    </p>

    <h2>Duplicate descriptions across pages</h2>
    <p>
      Many CMS defaults copy the same description onto every page in a section or template. This
      is mildly harmful: Google&rsquo;s Search Console flags duplicate meta descriptions, and
      identical descriptions guarantee Google will rewrite every page that shares them. Every
      indexable page should have a unique, page-specific description. For large sites, generate
      descriptions from templated fields (product name, category, key attribute) so no two pages
      share the same string.
    </p>

    <h2>Mobile versus desktop truncation</h2>
    <p>
      Mobile SERPs truncate earlier because the viewport is narrower. A 160-character
      description that fits cleanly on desktop can be cut at 120 on mobile. Front-load the most
      important content: the first 120 characters should stand alone as a complete pitch. Put
      the CTA and any supporting detail in the last 30-40 characters where they are nice to
      have but not required.
    </p>

    <h2>What not to include</h2>
    <p>
      Do not use double quotes in a description&mdash;Google strips them. Do not include HTML,
      emojis beyond unicode characters, or keyword-stuffed lists. Do not include the brand name
      repeatedly. Do not include dates or &ldquo;Updated 2023&rdquo; in templated descriptions
      because they go stale instantly and signal to users that the content may be outdated.
      Do not duplicate the title tag in the description&mdash;that wastes space and contains no
      new information.
    </p>

    <h2>Tracking and iterating</h2>
    <p>
      In Google Search Console, compare the CTR column of Performance data across queries and
      pages. Pages ranking in positions 2-6 with below-average CTR are candidates for meta
      description improvements. Rewrite, wait two to four weeks for Google to re-crawl and
      re-serve, and compare CTR again. Changes below position 10 are harder to measure because
      impression volume is too low for statistical confidence.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Going over 160 characters.</strong> The snippet gets truncated mid-sentence. Keep
      the important content in the first 120 and the full pitch in the first 155.
    </p>
    <p>
      <strong>Auto-generating descriptions from the first paragraph.</strong> CMS defaults that
      grab the first 160 characters of body text produce bland descriptions that never have a
      CTA or a targeted pitch. Write descriptions intentionally.
    </p>
    <p>
      <strong>Using the same description across a section.</strong> Duplicates waste the
      per-page opportunity and get flagged in Search Console. Every indexable page needs a
      unique description.
    </p>
    <p>
      <strong>Stuffing keywords.</strong> Mentioning the target query three or four times
      triggers rewrites and looks spammy to searchers. One natural mention is enough.
    </p>
    <p>
      <strong>Omitting a call to action.</strong> Descriptions that end on an ellipsis or a
      period without telling the reader what to do leave CTR on the table. Finish every
      description with a specific action.
    </p>
    <p>
      <strong>Assuming Google will use your description.</strong> Google rewrites most
      descriptions. Write one that matches likely queries and reads like a natural snippet to
      reduce the chance of a rewrite.
    </p>
    <p>
      <strong>Using double quotes.</strong> Google strips double quote marks from descriptions.
      Use single quotes or rephrase to avoid them.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Check character count, pixel width, and SERP preview with the{" "}
      <a href="/tools/meta-description-length-checker">meta description length checker</a>.
      Pair with the{" "}
      <a href="/tools/title-tag-length-checker">title tag length checker</a> so the title and
      description work together as a single snippet, and the{" "}
      <a href="/tools/serp-snippet-preview">SERP snippet preview</a> to see exactly how the
      combination will look in search results on both desktop and mobile.
    </p>
  </>
);
