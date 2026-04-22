export const intro = (
  <>
    <p>
      A meta description is the snippet Google shows under your page title in the search results.
      It doesn&rsquo;t directly rank your page, but it is the ad copy for your listing. A good
      meta description can double click-through rate against a bad one — and doubling CTR on a
      page that already ranks is often the highest-ROI SEO work you will ever do.
    </p>
    <p>
      This guide covers the rules that actually matter in 2026: length, intent matching, the
      brackets and modifiers that earn clicks, and the mistakes that cause Google to ignore your
      description and auto-generate one instead.
    </p>
  </>
);

export const body = (
  <>
    <h2>What a meta description is (and isn&rsquo;t)</h2>
    <p>
      A meta description is a short HTML tag in the <code>&lt;head&gt;</code> of your page:{" "}
      <code>&lt;meta name=&quot;description&quot; content=&quot;...&quot; /&gt;</code>. It is
      not a ranking factor. Search engines may or may not display it — if they think the body
      text of your page answers the query better, they will use that instead. Your job is to
      write a description so tightly matched to the query that Google has no reason to swap it.
    </p>

    <h2>Optimal length</h2>
    <p>
      Aim for 150–160 characters for desktop and around 120 characters for mobile-first queries.
      Longer descriptions get truncated with an ellipsis — Google cuts the sentence mid-word,
      which looks unprofessional. Use our{" "}
      <a href="/tools/meta-description-length-checker">meta description length checker</a> to see
      exactly where the cutoff lands on desktop and mobile as you type.
    </p>

    <h2>Front-load the keyword</h2>
    <p>
      Google bolds words in the description that match the user&rsquo;s query. Put the primary
      keyword in the first 60 characters so it bolds on both desktop and mobile. After that, write
      for humans — benefit, differentiator, and a verb that invites a click.
    </p>

    <h2>The four-part formula</h2>
    <p>
      A reliable structure: <strong>what it is</strong> (1 sentence) + <strong>who it&rsquo;s for</strong>{" "}
      (1 phrase) + <strong>the benefit</strong> (1 phrase) + <strong>the call to action</strong>{" "}
      (2–3 words). Example: &ldquo;Free online PDF merger. Combine up to 50 PDFs in your browser —
      no uploads, no watermarks. Try it in seconds.&rdquo;
    </p>

    <h2>Match the query intent, not just the keyword</h2>
    <p>
      The same keyword can have different intents. &ldquo;Best budget laptop&rdquo; is a comparison
      query; the description should promise a shortlist. &ldquo;Buy budget laptop&rdquo; is
      transactional; the description should promise price and availability. Before you write,
      search the keyword yourself — note the intent the top three results are serving and match it.
    </p>

    <h2>Use specific numbers and modifiers</h2>
    <p>
      Descriptions with &ldquo;free,&rdquo; &ldquo;2026,&rdquo; &ldquo;in 60 seconds,&rdquo; or
      concrete numbers outperform vague copy. &ldquo;Learn SEO&rdquo; is weak. &ldquo;Learn SEO in
      15 minutes with our free 2026 checklist&rdquo; is a click.
    </p>

    <h2>Avoid quotes and special characters</h2>
    <p>
      Double quotes in a description can break the HTML tag if un-escaped. Use single quotes or
      em-dashes instead. Pipes and ampersands are fine. Emojis work on some queries and get
      stripped on others — worth testing on your highest-traffic pages, not worth relying on.
    </p>

    <h2>Write one per page — no duplicates</h2>
    <p>
      Duplicate meta descriptions across a site tell Google you have no unique value on any of
      the pages. Every indexable page should have its own description written for its own query.
      If you have 200 pages and can&rsquo;t hand-write 200 descriptions, write templated
      descriptions with at least one unique variable (product name, city, etc.) per page.
    </p>

    <h2>Test and iterate from Search Console</h2>
    <p>
      Once a page is live, watch its CTR in Google Search Console. Any page ranking in positions
      4–10 with below-average CTR is a candidate for a meta description rewrite. Ship a change,
      wait two weeks, and compare. This is the tightest SEO feedback loop you have.
    </p>

    <h2>Common mistakes that kill CTR</h2>
    <p>
      Writing for robots (keyword stuffing), using the same description as the title tag, leaving
      the description blank so Google auto-generates a random sentence, and writing descriptions
      that don&rsquo;t match the landing page&rsquo;s content — users bounce back to search
      results, and Google notices. Keep the promise specific, and make sure the page delivers it.
    </p>

    <h2>Pair the description with a strong title</h2>
    <p>
      A great description is wasted under a weak title. Run both through our{" "}
      <a href="/tools/title-tag-length-checker">title tag length checker</a> together — the title
      sets expectation, the description confirms fit. And if you need a full set of SEO tags at
      once, the <a href="/tools/meta-tag-generator">meta tag generator</a> outputs title,
      description, and Open Graph in one pass.
    </p>

    <p>
      Related reading: <a href="/guides/seo-basics-for-beginners">SEO basics for beginners</a>,{" "}
      <a href="/guides/how-to-start-a-blog">how to start a blog</a>, and{" "}
      <a href="/guides/how-to-use-utm-parameters">how to use UTM parameters</a> to measure which
      descriptions are earning real traffic.
    </p>
  </>
);
