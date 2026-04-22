export const intro = (
  <>
    <p>
      Schema markup is structured data you add to your HTML that tells search engines what your
      page is actually about. A recipe page, a product page, and a job posting all look like
      &ldquo;a page&rdquo; to a plain web crawler. With schema, they become a recipe, a product,
      and a job — each with their own structured fields and each eligible for rich results in
      search.
    </p>
    <p>
      The payoff is real. Pages with valid schema can earn star ratings, FAQ accordions, price
      displays, breadcrumbs, and knowledge-panel entries — all of which expand the listing and
      push competitors off the screen. This guide covers what schema is, which types matter,
      and how to implement it without breaking your site.
    </p>
  </>
);

export const body = (
  <>
    <h2>What schema markup actually is</h2>
    <p>
      Schema is a shared vocabulary — maintained at <code>schema.org</code> — that Google, Bing,
      Pinterest, and other search engines understand. You embed it in your page as JSON-LD, a
      small block of JavaScript-flavored JSON, and it describes the entity on the page: article,
      product, event, person, organization, and around 800 others. Crawlers read the JSON, match
      it to their knowledge graph, and optionally show a richer result in search.
    </p>

    <h2>JSON-LD vs microdata vs RDFa</h2>
    <p>
      There are three ways to write schema. Google explicitly recommends <strong>JSON-LD</strong>
      {" "}because it lives in a single <code>&lt;script&gt;</code> tag in the <code>&lt;head&gt;</code>
      or <code>&lt;body&gt;</code>, doesn&rsquo;t interfere with visible HTML, and is easy to
      maintain. Microdata and RDFa embed attributes directly in HTML tags — more fragile, harder
      to audit. Pick JSON-LD. Use our{" "}
      <a href="/tools/schema-markup-generator">schema markup generator</a> to build it without
      memorizing the syntax.
    </p>

    <h2>The schema types worth your time</h2>
    <p>
      Not every schema type triggers a rich result. The high-value ones in 2026 are:{" "}
      <strong>Article</strong> (news, blog posts), <strong>FAQPage</strong> (shows accordion in
      results), <strong>HowTo</strong> (numbered step carousel), <strong>Product</strong> (price,
      availability, ratings), <strong>Recipe</strong> (image, time, calories),{" "}
      <strong>Event</strong> (dates, venue), <strong>BreadcrumbList</strong> (replaces URL with
      path), <strong>Organization</strong> (knowledge-panel logo), and <strong>LocalBusiness</strong>{" "}
      (hours, address, map pin).
    </p>

    <h2>FAQPage is the fastest win</h2>
    <p>
      If you write any content that answers questions, add FAQPage schema. It&rsquo;s the cheapest
      rich result to earn — Google shows your FAQ as a collapsible accordion under your listing,
      doubling vertical real estate. You can generate the JSON-LD directly with our{" "}
      <a href="/tools/faq-schema-generator">FAQ schema generator</a>. Note: only questions with
      public, visible answers on the page are eligible.
    </p>

    <h2>How to add it to your site</h2>
    <p>
      Paste the JSON-LD block inside a <code>&lt;script type=&quot;application/ld+json&quot;&gt;</code>
      tag anywhere in the page. In Next.js or similar frameworks, generate it server-side and
      render it in the page head. Don&rsquo;t inject it with client-side JavaScript —
      Googlebot sometimes doesn&rsquo;t wait for JS to execute before reading the markup.
    </p>

    <h2>Validate before you ship</h2>
    <p>
      Google&rsquo;s Rich Results Test (<code>search.google.com/test/rich-results</code>) and the
      Schema Markup Validator (<code>validator.schema.org</code>) are the two tools you need.
      Paste a URL or the raw HTML and they flag every required property you forgot. One
      invalid character in the JSON and the entire block is ignored, so validating is not
      optional.
    </p>

    <h2>Match the schema to the visible content</h2>
    <p>
      Google&rsquo;s spam policy requires schema to describe content that is actually visible to
      the user. Claiming a 5-star rating in schema that doesn&rsquo;t appear on the page can earn
      a manual action and tank rankings. The rule: if it&rsquo;s in the schema, it should be on
      the page too.
    </p>

    <h2>Watch for conflicting schema</h2>
    <p>
      Having both Article and NewsArticle schema on the same page, or two Product blocks for the
      same product, confuses crawlers. Audit old pages before adding new schema — WordPress plugins
      sometimes auto-add their own markup that collides with yours.
    </p>

    <h2>Breadcrumb schema is quietly powerful</h2>
    <p>
      BreadcrumbList replaces the raw URL in the search result with a readable path — Home &gt;
      Guides &gt; Schema Markup. It takes five minutes to add site-wide, lifts CTR on every
      indexable page, and has no downside. Do this first if you haven&rsquo;t already.
    </p>

    <h2>Don&rsquo;t chase every rich result</h2>
    <p>
      Review schema availability in your vertical. Recipe schema is useless for a SaaS site;
      Product schema is pointless on a blog. Pick the two or three types that map to your
      content and implement them well. Twenty half-broken schema blocks are worse than two
      correct ones.
    </p>

    <h2>Review monthly in Search Console</h2>
    <p>
      Google Search Console has an &ldquo;Enhancements&rdquo; section that shows every schema
      type it detected on your site, plus errors and warnings. Check monthly. Any new error
      usually means a template change broke the markup on a whole section of pages.
    </p>

    <p>
      Related: <a href="/guides/seo-basics-for-beginners">SEO basics for beginners</a>,{" "}
      <a href="/guides/how-to-write-a-meta-description">how to write a meta description</a>, and{" "}
      <a href="/guides/how-to-format-json-properly">how to format JSON properly</a> so your
      schema validates on the first try.
    </p>
  </>
);
