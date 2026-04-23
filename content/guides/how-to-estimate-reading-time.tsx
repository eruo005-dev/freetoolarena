import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      &ldquo;5 min read&rdquo; at the top of an article isn&rsquo;t
      just decoration — it sets expectations, improves click-through,
      and gives readers permission to start. The math is simple
      (words divided by reading speed) but the details matter: which
      reading speed, how to count words, how to adjust for images
      and code blocks, and when to round. This guide covers how
      publishers like Medium, Substack, and the New York Times
      compute reading time, the science behind reading-speed
      averages, and how to handle mixed content correctly.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The base formula</h2>
    <p>
      <strong>Reading time = word count ÷ words-per-minute</strong>
    </p>
    <p>
      A typical adult reading non-technical content reads at ~240
      words per minute. Academic studies cluster around 200-300 WPM
      for adults reading for comprehension (not speed-reading, not
      skimming).
    </p>
    <p>
      <strong>Medium uses 265 WPM.</strong>
    </p>
    <p>
      <strong>New York Times uses 240 WPM.</strong>
    </p>
    <p>
      <strong>Academic research (Brysbaert 2019):</strong> 238 WPM
      silent reading, 183 WPM reading aloud.
    </p>
    <p>
      Pick one, use it consistently. 240 WPM is the safe middle
      ground.
    </p>

    <h2>What counts as a word</h2>
    <p>
      Simplest definition: whitespace-separated tokens.
    </p>
    <p>
      <code>&quot;hello world foo&quot;.split(/\s+/).filter(Boolean).length</code>
      = 3.
    </p>
    <p>
      <strong>Edge cases:</strong>
    </p>
    <p>
      Hyphenated words: &ldquo;long-term&rdquo; — count as 1 or 2?
      Most counters split on <code>\s+</code> so it&rsquo;s 1. Fine
      either way; don&rsquo;t overthink.
    </p>
    <p>
      Contractions: &ldquo;don&rsquo;t&rdquo; = 1 word.
    </p>
    <p>
      Numbers, punctuation, URLs: each counts as one word if
      surrounded by spaces.
    </p>
    <p>
      <strong>Don&rsquo;t</strong> count characters divided by 5
      (the old typewriter standard) — it&rsquo;s less accurate for
      modern prose with mixed word lengths.
    </p>

    <h2>Adjusting for images</h2>
    <p>
      People don&rsquo;t read images, but they spend time looking at
      them. Medium&rsquo;s algorithm adds ~12 seconds for the first
      image, decreasing for subsequent ones (3-10s each).
    </p>
    <p>
      Simple approximation: add 12 seconds per image, capped at
      maybe 30 seconds total. For articles with heavy visual
      content, this alone bumps the estimate meaningfully.
    </p>
    <p>
      Alternative approach: ignore images entirely. If your
      articles are primarily text, the variance per image is small
      enough not to matter.
    </p>

    <h2>Adjusting for code blocks</h2>
    <p>
      Code reads slower than prose — roughly half the speed. A
      Stanford study found programmers averaging ~100 WPM reading
      code vs ~250 WPM reading prose.
    </p>
    <p>
      For articles that mix prose and code:
    </p>
    <p>
      <strong>Option A:</strong> Extract code blocks, count words
      separately, apply 100 WPM to code and 240 WPM to prose. Sum
      the two estimates.
    </p>
    <p>
      <strong>Option B:</strong> Add a flat bump (30 seconds per
      code block, or 2x the word time for code). Close enough for
      most cases and simpler to implement.
    </p>
    <p>
      <strong>Option C (publishing default):</strong> Ignore the
      difference. For a typical technical article, the variance is
      10-20 seconds, which rounds away.
    </p>

    <h2>Rounding and display</h2>
    <p>
      Output needs to be usable. &ldquo;3.47 min read&rdquo; looks
      fake.
    </p>
    <p>
      <strong>Always round up to the nearest minute.</strong> A 2.1-
      minute article is &ldquo;3 min read&rdquo; — underpromising is
      better than overpromising.
    </p>
    <p>
      <strong>Articles under a minute:</strong> &ldquo;&lt; 1 min
      read&rdquo; or &ldquo;Quick read.&rdquo;
    </p>
    <p>
      <strong>Very long articles:</strong> some publishers switch
      to hours. Avoid fractional hours (&ldquo;2.5 hr read&rdquo;);
      say &ldquo;3 hr read&rdquo; or break into parts.
    </p>
    <p>
      <strong>Language matters:</strong> &ldquo;min read&rdquo; is
      the standard; &ldquo;minutes to read&rdquo; is longer but
      clearer. Medium picked &ldquo;min read.&rdquo; It stuck.
    </p>

    <h2>When accuracy matters more</h2>
    <p>
      For content where time pressure is real:
    </p>
    <p>
      <strong>Audiobooks/podcasts:</strong> different calculation —
      ~150-160 WPM for spoken content. Length in minutes is exact
      (duration) rather than estimated.
    </p>
    <p>
      <strong>Speech-to-text:</strong> generated transcripts inherit
      the audio duration directly.
    </p>
    <p>
      <strong>Email campaigns:</strong> A/B tests show promised
      reading times (&ldquo;3 min read&rdquo;) boost open-to-click
      rates ~10-15%. Overpromising (&ldquo;1 min&rdquo; on a 5-min
      read) hurts trust.
    </p>

    <h2>Non-English content</h2>
    <p>
      Reading speeds differ by language:
    </p>
    <p>
      English: 238 WPM.
    </p>
    <p>
      French: ~214 WPM.
    </p>
    <p>
      Spanish: ~218 WPM.
    </p>
    <p>
      Chinese: ~158 CPM (characters per minute, not words — Chinese
      doesn&rsquo;t use spaces).
    </p>
    <p>
      For Chinese/Japanese, count characters instead of words.
      Typical rate: 300-400 Chinese characters per minute.
    </p>

    <h2>Reading level and complexity</h2>
    <p>
      Readers slow down on dense academic prose or unfamiliar
      technical material. Flesch-Kincaid grade 12+ text is read
      roughly 20-30% slower than grade 8 text.
    </p>
    <p>
      Most publishers ignore this — estimates are rough by design.
      If you need precision, pair reading time with a readability
      score (Flesch, Dale-Chall) so readers see both.
    </p>

    <h2>Putting reading time where it helps</h2>
    <p>
      <strong>Top of article:</strong> standard placement. Medium,
      Substack, New York Times — all put it near the byline.
    </p>
    <p>
      <strong>In the preview card:</strong> on a list of articles,
      reading time helps readers pick what fits their available
      time.
    </p>
    <p>
      <strong>In email newsletters:</strong> &ldquo;5 things, 8 min
      read total&rdquo; performs well.
    </p>
    <p>
      <strong>Schema.org markup:</strong> the <code>timeRequired</code>
      property on Article lets search engines display reading time in
      rich results. <code>timeRequired: &quot;PT5M&quot;</code> in
      ISO 8601 duration format.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using 200 WPM (too slow).</strong> Modern adult
      readers exceed that. 200 WPM overstates reading time. Use
      240-265.
    </p>
    <p>
      <strong>Counting HTML or markdown syntax.</strong> Strip the
      markup first. <code>&lt;strong&gt;text&lt;/strong&gt;</code> is
      one word (&ldquo;text&rdquo;), not three tokens.
    </p>
    <p>
      <strong>Showing 0 min.</strong> Always floor at &ldquo;&lt; 1
      min read&rdquo; or &ldquo;1 min read.&rdquo; Never display
      zero.
    </p>
    <p>
      <strong>Counting words in comments or related-post
      sections.</strong> Only count the article body itself.
    </p>
    <p>
      <strong>Hard-coding the estimate.</strong> Compute it from the
      content at build/render time so edits update the display
      automatically.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste any text into the{" "}
      <a href="/tools/reading-time-estimator">reading time estimator</a>
      {" "}and get instant word count and minutes. Pair with the{" "}
      <a href="/tools/word-counter">word counter</a> for detailed
      stats including sentences and paragraphs, and the{" "}
      <a href="/tools/readability-score-checker">readability score
      checker</a> to match tone and grade level to your audience.
    </p>
  </>
);
