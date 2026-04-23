import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Keyword density is the percentage of a page&rsquo;s total words that match a target term.
      It was once the single most discussed metric in SEO, the axis on which whole chapters of
      Google&rsquo;s 2003 ranking algorithm turned. A decade of deliberate stuffing penalties,
      the Panda update, BERT, and the shift to semantic search has stripped density of most of
      its direct ranking power. But it remains useful as a diagnostic: it tells you whether a
      page is actually about what you think it is about, whether you are under-serving the
      primary intent, or whether the language has drifted into padding. This guide covers the
      basic calculation, historical versus modern SEO use, penalties for overuse, stemming and
      variation handling, what &ldquo;natural frequency&rdquo; means, and where LSI keywords
      actually fit.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The basic calculation</h2>
    <p>
      Keyword density is (occurrences of the keyword / total words) &times; 100. A 1,000-word
      article that mentions &ldquo;email marketing&rdquo; 15 times has an exact-match density of
      1.5 percent. For a single-word keyword the counting is simple. For multi-word phrases the
      numerator stays the count of phrase occurrences, and the denominator stays total words,
      which dilutes density because one occurrence of a two-word phrase still counts as one in
      the numerator but consumes two slots in the denominator. Most density tools report the
      phrase count over the word count without adjusting, which is the convention.
    </p>
    <pre>{`Text:     1,000 words total
Phrase:   "email marketing" appears 15 times

Density = (15 / 1000) * 100 = 1.5%`}</pre>

    <h2>Historical SEO: what density meant</h2>
    <p>
      In the first decade of search, keyword density was a strong ranking signal. Pages with
      densities in the 2-5 percent range for a target term outranked pages that mentioned the
      term only in passing. This led to a decade of over-optimization: thin pages stuffed with
      target keywords, doorway pages built to rank for single terms, and footer-text gardens
      designed purely to hit a density threshold. The early search engines treated high density
      as a positive signal because the alternative was worse&mdash;ignoring the term entirely.
    </p>

    <h2>Modern SEO: what density means now</h2>
    <p>
      Google&rsquo;s 2011 Panda update, 2013 Hummingbird rewrite, and 2019 BERT and 2022
      MUM-style language models have all moved ranking away from word-frequency matching toward
      semantic understanding. BERT can tell that a page about &ldquo;running shoes&rdquo; and a
      page about &ldquo;athletic footwear for runners&rdquo; are about the same topic even
      without identical keywords. Density is no longer the direct lever it once was. But it is
      still a useful diagnostic: if your page about &ldquo;email marketing&rdquo; never uses
      the phrase, or uses it only in the title, the page may be less focused than you think.
    </p>

    <h2>Stuffing penalties</h2>
    <p>
      Google&rsquo;s spam policies explicitly list keyword stuffing as a violation. The detection
      is not tied to a precise density threshold&mdash;it looks for patterns that suggest
      mechanical insertion rather than natural writing. Repeating the keyword in every sentence,
      inserting it into irrelevant places, or filling footer text and alt attributes with
      variants all trigger flags. A page with 5 percent density written naturally can rank fine;
      a page with 2 percent density that reads like robot-generated padding can get suppressed.
      The modern rule: write for readers, let density follow.
    </p>

    <h2>Natural frequency</h2>
    <p>
      Natural frequency is the density you get when a knowledgeable writer addresses the topic
      without thinking about density at all. It varies by topic. Technical content about a
      specific product mentions the product name often&mdash;2 to 3 percent is common and
      normal. A broader article about a category mentions the category term less often because
      the writer uses pronouns, synonyms, and partial references. If your target density for a
      term is wildly above or below what a human writer would produce naturally on that topic,
      the density is signaling a problem with the writing.
    </p>

    <h2>Stemming and partial matches</h2>
    <p>
      A density tool that counts only exact matches under-reports the real prominence of a
      topic. &ldquo;Email marketing&rdquo;, &ldquo;email marketer&rdquo;, and &ldquo;marketing
      emails&rdquo; all signal the same topic to a modern search engine. Stemming collapses
      inflected forms (marketing, marketer, markets) to a common root. Lemmatization is stricter
      and maps word forms to dictionary headwords. Most density tools offer exact-match by
      default and stemmed-match as a toggle. For SEO analysis, stemmed counts are usually more
      honest.
    </p>

    <h2>LSI and semantic terms</h2>
    <p>
      &ldquo;LSI keywords&rdquo; is an SEO term borrowed loosely from Latent Semantic Indexing,
      a 1990s information-retrieval technique. Google does not use actual LSI in its production
      ranking, despite the name&rsquo;s popularity in SEO content. What Google does use is
      topic modeling via transformer-based language models, which recognize that a page about
      &ldquo;cameras&rdquo; should probably mention &ldquo;lens&rdquo;, &ldquo;shutter&rdquo;,
      &ldquo;aperture&rdquo;, and &ldquo;exposure&rdquo;. These are often called LSI keywords in
      SEO tools but are better described as semantically related terms or co-occurring topic
      terms. Checking that your page covers the terms your competitors cover is more useful than
      hitting a density threshold on the primary keyword.
    </p>

    <h2>Competitor density analysis</h2>
    <p>
      Before optimizing your density, measure what top-ranking competitors use. Pull the top
      five organic results for your target query, strip navigation and boilerplate, and compute
      density for each. The median tells you what density Google considers appropriate for that
      query. If your page sits far outside that range (either much higher or much lower), the
      content is probably an outlier in either information density or relevance. Match the
      competitive baseline before trying to exceed it.
    </p>

    <h2>Density by document zone</h2>
    <p>
      Word position matters more than raw density. A keyword in the title, H1, first paragraph,
      URL, and first image alt attribute signals topic more strongly than the same keyword
      repeated ten times in a sidebar. Modern density analysis should weight different zones
      differently, or at least report density per zone (title, H1, intro, body, footer). An
      unfocused page with the right density in the wrong places underperforms a focused page
      with lower density where it counts.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Targeting a fixed density number.</strong> &ldquo;I want exactly 2 percent&rdquo;
      leads to stilted writing with the keyword inserted mechanically. Write for the reader and
      measure density as a diagnostic.
    </p>
    <p>
      <strong>Ignoring phrase variations.</strong> Counting only exact matches misses
      &ldquo;marketing emails&rdquo; when you are measuring &ldquo;email marketing&rdquo;. Use
      stemmed or lemmatized counts for an honest picture.
    </p>
    <p>
      <strong>Counting everything on the page.</strong> Navigation, footer, sidebar, and
      boilerplate dilute or inflate the density measurement. Analyze the main content area
      only, as a search engine would.
    </p>
    <p>
      <strong>Stuffing alt text and meta tags.</strong> Image alt attributes and meta
      descriptions full of keyword variants are an old pattern that still triggers penalties.
      Write alt text that describes the image; write descriptions that describe the page.
    </p>
    <p>
      <strong>Ignoring anchor text.</strong> Internal and inbound anchor text counts toward how
      search engines associate a page with topics. Heavy anchor-text repetition with the same
      exact phrase is a signal of manipulation.
    </p>
    <p>
      <strong>Forgetting to measure after edits.</strong> Adding a single section or rewriting
      the intro can shift density by half a percent. Re-measure after significant edits to
      verify the page still focuses where you intended.
    </p>
    <p>
      <strong>Treating LSI keywords as magic.</strong> Dropping in a list of related terms does
      not substitute for writing about the topic thoroughly. Related terms should appear because
      you covered the topic, not because a tool said they should.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Measure keyword density, phrase frequency, and term distribution with the{" "}
      <a href="/tools/keyword-density-checker">keyword density checker</a>. Pair with the{" "}
      <a href="/tools/readability-score-checker">readability score checker</a> to make sure
      optimizing density has not made the prose harder to read, and the{" "}
      <a href="/tools/meta-description-length-checker">meta description length checker</a>
      {" "}to confirm the key terms make it into the snippet that shows in search results.
    </p>
  </>
);
