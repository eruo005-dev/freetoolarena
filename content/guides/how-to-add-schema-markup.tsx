import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Schema markup is structured data that describes the entities on
      your page &mdash; articles, products, events, reviews, people
      &mdash; in a vocabulary search engines understand. Done right,
      it unlocks rich results: star ratings in the SERP, FAQ
      accordions, recipe cards, breadcrumb trails, and Knowledge
      Graph entries. Done wrong, it earns manual actions and silent
      filtering. The vocabulary comes from <code>schema.org</code>,
      but there are three ways to embed it, and Google has had a
      strong preference for one format since 2015. This guide covers
      JSON-LD vs microdata vs RDFa, the types that unlock rich
      results in 2026 (Article, Product, FAQPage, BreadcrumbList,
      Organization, Review), how to test with the Rich Results Test
      and Schema Validator, and the validation errors that quietly
      disable your rich snippets.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>JSON-LD vs microdata vs RDFa</h2>
    <p>
      Schema.org data can be embedded in three syntaxes. All three
      produce the same semantic graph; they differ in how they wrap
      the markup.
    </p>
    <p>
      <strong>JSON-LD:</strong> a JSON object inside a
      <code> &lt;script type=&quot;application/ld+json&quot;&gt;</code>
      tag, typically placed in <code>&lt;head&gt;</code>. Not
      entangled with visible HTML. Google explicitly recommends this
      format and most documentation examples use it.
    </p>
    <p>
      <strong>Microdata:</strong> attributes
      (<code>itemscope</code>, <code>itemtype</code>,
      <code> itemprop</code>) sprinkled on visible HTML. The markup
      and the content stay together, which is tempting, but template
      changes can silently break the graph.
    </p>
    <p>
      <strong>RDFa:</strong> similar to microdata using different
      attributes (<code>vocab</code>, <code>typeof</code>,
      <code> property</code>). Rarely used on the modern web outside
      government and academic sites.
    </p>
    <p>
      Pick JSON-LD unless you have a specific constraint otherwise.
      It is the only format that lets you keep structured data
      decoupled from the DOM your CMS produces.
    </p>

    <h2>The JSON-LD skeleton</h2>
    <p>
      Every JSON-LD block needs a context and a type. The rest are
      properties of that type as defined on schema.org.
    </p>
    <pre>{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to add schema markup",
  "datePublished": "2026-04-23",
  "author": {
    "@type": "Person",
    "name": "Jay Rivera"
  }
}
</script>`}</pre>
    <p>
      Use <code>https://schema.org</code> (not http) for the context.
      Validators accept either but the canonical value is https.
    </p>

    <h2>Article &mdash; news, blog, long-form</h2>
    <p>
      Use <code>Article</code>, <code>NewsArticle</code>, or
      <code> BlogPosting</code>. Required for Google&rsquo;s Top
      Stories: <code>headline</code>, <code>image</code>,
      <code> datePublished</code>, and a
      <code> Publisher</code> with a logo no taller than 60 px. The
      headline must be 110 characters or fewer to appear in Top
      Stories; longer headlines are truncated in some surfaces.
    </p>

    <h2>Product &mdash; the big rich-result earner</h2>
    <p>
      <code>Product</code> with <code>offers</code> and
      <code> aggregateRating</code> earns price, availability, and
      star-rating snippets. Minimal example:
    </p>
    <pre>{`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Mechanical Keyboard K7",
  "image": "https://example.com/k7.jpg",
  "brand": {"@type": "Brand", "name": "Clackco"},
  "offers": {
    "@type": "Offer",
    "price": "129.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.7",
    "reviewCount": "382"
  }
}`}</pre>
    <p>
      Google requires reviews to be written by humans and visible on
      the page. Auto-generated ratings or ratings invisible to users
      trigger a manual action for spammy structured data.
    </p>

    <h2>FAQPage &mdash; powerful but restricted</h2>
    <p>
      As of August 2023, Google shows FAQ rich results only for
      authoritative government and health sites. Everyone else still
      benefits from the clearer semantic signal, and the snippets may
      return for other verticals later.
    </p>
    <pre>{`{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Is JSON-LD case sensitive?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Property names must match schema.org casing exactly."
    }
  }]
}`}</pre>
    <p>
      Every question in the markup must appear verbatim on the
      visible page. Asking in the markup what the page never actually
      answers is a policy violation.
    </p>

    <h2>BreadcrumbList</h2>
    <p>
      Replaces the URL shown in the SERP with a breadcrumb trail. The
      <code> position</code> property must be an integer starting at 1
      and incrementing. The final item&rsquo;s <code>item</code> can
      be omitted &mdash; Google treats the current page as implicit.
    </p>
    <pre>{`{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home",
     "item": "https://example.com/"},
    {"@type": "ListItem", "position": 2, "name": "Guides",
     "item": "https://example.com/guides/"},
    {"@type": "ListItem", "position": 3, "name": "Schema"}
  ]
}`}</pre>

    <h2>Organization and Person</h2>
    <p>
      One <code>Organization</code> block per site, usually on the
      homepage, populates the Knowledge Graph panel for your brand.
      Include <code>name</code>, <code>url</code>,
      <code> logo</code>, and <code>sameAs</code> (an array of your
      social and authority profiles). For authors, add a
      <code> Person</code> block linked from each article&rsquo;s
      <code> author</code> field to build author authority.
    </p>

    <h2>Testing tools</h2>
    <p>
      Run every change through two validators before shipping.
    </p>
    <p>
      <strong>Google Rich Results Test</strong> at
      <code> search.google.com/test/rich-results</code> tells you
      which rich results your page qualifies for and which properties
      are missing.
    </p>
    <p>
      <strong>Schema.org Validator</strong> at
      <code> validator.schema.org</code> checks the markup against
      the full vocabulary, catching typos and unknown properties that
      the Google tool sometimes silently ignores.
    </p>
    <p>
      After deploying, monitor Search Console&rsquo;s Enhancements
      reports. They surface warnings and errors across your whole
      site, with per-page error lists.
    </p>

    <h2>Multiple types on one page</h2>
    <p>
      A product page can legitimately have Product, BreadcrumbList,
      and Organization markup at once. Use separate
      <code> &lt;script&gt;</code> tags or a single JSON-LD
      <code> @graph</code> array:
    </p>
    <pre>{`{
  "@context": "https://schema.org",
  "@graph": [
    {"@type": "Product", "name": "..."},
    {"@type": "BreadcrumbList", "itemListElement": [...]}
  ]
}`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Marking up content that is not on the page.</strong>
      Every value in structured data must correspond to something
      users can see. Invisible FAQs and fake review snippets trigger
      manual actions.
    </p>
    <p>
      <strong>Using the wrong type.</strong> A category page is not a
      <code> Product</code>; a how-to article is an
      <code> Article</code>, not a <code>HowTo</code> unless it has
      numbered steps with tools and materials. Mis-typing earns
      ineligibility for any rich result.
    </p>
    <p>
      <strong>Missing required properties.</strong> Each rich-result
      type has a required-property list. Miss one &mdash;
      <code> priceCurrency</code>, <code>datePublished</code>,
      <code> image</code> &mdash; and the whole snippet becomes
      ineligible. The Rich Results Test flags these.
    </p>
    <p>
      <strong>Case-sensitive typos.</strong> It is
      <code> datePublished</code>, not <code>DatePublished</code> or
      <code> date_published</code>. Schema.org property names are
      camelCase and validators reject variants silently.
    </p>
    <p>
      <strong>Inventing properties.</strong> Unknown properties do
      not fail validation but they do nothing either. Before adding
      a field, check it exists on the schema.org type page.
    </p>
    <p>
      <strong>Stale dates.</strong> Templates that auto-update
      <code> dateModified</code> to &ldquo;now&rdquo; on every page
      render make Google discount the signal. Only bump it when
      content actually changes.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate valid JSON-LD for the common types in seconds with
      the{" "}
      <a href="/tools/schema-markup-generator">schema markup generator</a>.
      Pair with the{" "}
      <a href="/tools/faq-schema-generator">FAQ schema generator</a>
      {" "}when the page has a question-and-answer block, and the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to pretty-print
      and syntax-check your JSON-LD before pasting it into the head.
    </p>
  </>
);
