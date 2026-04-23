import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A SERP snippet preview shows what your page will look like in a search result before you
      publish. The three-line block&mdash;URL, blue title, gray description&mdash;is the real
      product a user sees. Every pixel of width, every character of length, and every bolded
      query match affects whether they click your result or the one above it. Writing a title
      and description in isolation in a CMS field loses this context; you have to visualize the
      render to know whether it works. Preview tools simulate Google&rsquo;s layout closely
      enough that you can iterate on copy before it ships. This guide covers what the snippet
      contains, pixel math for title and description, rich snippet types, mobile versus desktop
      differences, and A/B testing titles without breaking rankings.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Anatomy of a SERP snippet</h2>
    <p>
      A standard Google SERP snippet has three visible elements: a breadcrumb-like URL at the
      top (previously the full URL), a blue title below it that is the clickable headline, and
      a gray description paragraph underneath. Optional additions include sitelinks (sub-page
      links indented below), a favicon (on mobile), an author image or site name, and rich
      results like star ratings, FAQ accordions, price, or stock status. The core snippet takes
      about 3-4 lines of vertical space; rich snippets can double that.
    </p>
    <pre>{`freetoolarea.com > tools > json-formatter
Free JSON Formatter - Beautify, Validate, Minify
Format and validate JSON instantly in your browser. Paste, format,
validate against schema, convert to YAML. No login required.`}</pre>

    <h2>Pixel width math</h2>
    <p>
      Title limit: about 600 pixels, roughly 50-60 characters in Arial-like proportional fonts.
      Description limit: about 920 pixels, roughly 155-160 characters. URL limit: Google shows
      a breadcrumb rather than the full URL in most cases, so URL length has less visual
      importance than it did five years ago. Character counts are proxies; real truncation is
      pixel-based. Preview tools measure exact pixel widths using the actual SERP fonts so they
      match what the user will see.
    </p>

    <h2>Rich snippets and structured data</h2>
    <p>
      Rich snippets pull additional data from structured markup (schema.org JSON-LD or
      microdata) and render it in the SERP. Common rich snippet types: FAQ with expandable
      question/answer pairs, HowTo with numbered steps, Product with price and rating, Recipe
      with time and calories, Article with author and date, Video with thumbnail and duration,
      Breadcrumbs with category navigation, and Event with date and location. A page with
      properly validated structured data is eligible (not guaranteed) for rich snippets. A
      preview tool that simulates rich snippet rendering helps you see what layout to aim for.
    </p>

    <h2>Mobile versus desktop</h2>
    <p>
      Mobile SERPs differ from desktop in layout, truncation points, and rich snippet behavior.
      Mobile titles truncate at similar pixel widths but render larger relative to the screen.
      Mobile descriptions truncate around 120 characters instead of 160 because the viewport
      is narrower. Mobile favicons are visible where desktop often omits them. Mobile also
      promotes AMP results differently (though AMP is deprecated) and shows app-install prompts
      for matching apps. A good preview toggles between mobile and desktop views because the
      same copy can work in one and fail in the other.
    </p>

    <h2>URL display and breadcrumbs</h2>
    <p>
      Google transforms URLs into breadcrumbs in most modern SERP layouts. A URL like
      <code>https://freetoolarea.com/tools/json-formatter</code> renders as
      <code>freetoolarea.com &gt; tools &gt; json-formatter</code>. The breadcrumb reveals site
      structure and can be customized by adding BreadcrumbList structured data that overrides
      the default URL segmentation. This matters for sites with deep URL paths: a clean
      breadcrumb hierarchy signals structure and category.
    </p>

    <h2>Query-term highlighting</h2>
    <p>
      Google bolds query terms in both the title and the description. If the searcher typed
      &ldquo;json formatter&rdquo;, the words &ldquo;json formatter&rdquo; will be bold in
      your title and description. Bolding pulls the eye and lifts CTR by 3-5 percent on
      average. Make sure the queries you want to rank for appear in both fields, naturally, at
      least once. A preview that simulates bolding helps visualize the emphasis the user sees.
    </p>

    <h2>Testing title variations</h2>
    <p>
      A/B testing titles in SEO is harder than in paid search because you cannot serve
      different titles to different users&mdash;the search engine sees whatever your HTML
      says. Proper title testing is done sequentially: push title A, wait 2-4 weeks, record
      CTR from Search Console, push title B, wait 2-4 weeks, compare. Control for
      seasonality, algorithm updates, and ranking drift. Tools like SearchPilot and
      RankScience run this at enterprise scale; for small sites, manual testing with clear
      documentation works fine.
    </p>

    <h2>Schema-driven snippet features</h2>
    <p>
      Some snippet features require specific structured data types. FAQ snippets need FAQPage
      schema with Question and Answer nodes. HowTo snippets need HowTo schema with step
      sequences. Recipe cards need Recipe schema with cook time, servings, and calories.
      Article bylines need Article or NewsArticle schema with author and datePublished. Test
      structured data in Google&rsquo;s Rich Results Test before relying on the feature, and
      monitor Search Console&rsquo;s Enhancements section for errors.
    </p>

    <h2>Image, video, and audio thumbnails</h2>
    <p>
      Image thumbnails appear for news, recipe, and video results in most cases. Video
      thumbnails require VideoObject schema with <code>thumbnailUrl</code>, <code>name</code>,
      <code>description</code>, and <code>uploadDate</code>. Podcast results sometimes show
      episode art from PodcastEpisode schema. For pages where a visual thumbnail would lift
      CTR, include the required schema and verify the image meets Google&rsquo;s size
      requirements (generally 1200 pixels on the longest side, aspect ratio within 1:1 to
      16:9).
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Previewing only desktop.</strong> Mobile is now 60+ percent of search traffic for
      most consumer niches. A snippet that works on desktop and breaks on mobile costs
      meaningful traffic. Always toggle between views.
    </p>
    <p>
      <strong>Forgetting the breadcrumb URL.</strong> Deep URL paths become long breadcrumbs
      that can visually compete with the title. Shorten category paths where possible or add
      custom BreadcrumbList data.
    </p>
    <p>
      <strong>Expecting rich snippets just because schema exists.</strong> Google decides which
      rich results to show based on many signals beyond the presence of structured data. Valid
      schema makes you eligible, not guaranteed.
    </p>
    <p>
      <strong>Writing titles and descriptions for preview, not for search.</strong> A snippet
      that looks great in a preview tool is useless if it does not match the queries your page
      actually ranks for. Match intent first, optimize layout second.
    </p>
    <p>
      <strong>Ignoring the query-bolding signal.</strong> Snippets without any bolded terms
      look less relevant than those with two or three. Include target query terms naturally.
    </p>
    <p>
      <strong>Testing by rewriting constantly.</strong> Changing titles weekly never gives
      Google enough signal to measure. Stick with each variation for at least two weeks.
    </p>
    <p>
      <strong>Using outdated preview dimensions.</strong> Google adjusts SERP layout roughly
      once a year. A preview tool built in 2019 may show truncation points that no longer
      match. Use a recently maintained tool.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Visualize exactly how title, URL, and description will render with the{" "}
      <a href="/tools/serp-snippet-preview">SERP snippet preview</a>. Pair with the{" "}
      <a href="/tools/title-tag-length-checker">title tag length checker</a> to verify pixel
      width before committing, and the{" "}
      <a href="/tools/schema-markup-generator">schema markup generator</a> when you want to
      add structured data that unlocks rich snippet features like FAQ, HowTo, or Product
      ratings.
    </p>
  </>
);
