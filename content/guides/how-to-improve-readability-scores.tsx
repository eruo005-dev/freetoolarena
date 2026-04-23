import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Readability scores turn &ldquo;how hard is this to read?&rdquo; into a number. The formulas
      have been around since the 1940s, were adopted by the US military in the 1970s, and still
      shape style guides at publishers, law firms, and government agencies today. A Flesch
      Reading Ease of 60 is roughly an 8th-9th grade reading level; below 30 reads like academic
      prose; above 80 reads like a children&rsquo;s book. The numbers are rough proxies, not
      oracles, but they are consistent enough to catch prose that has drifted too dense for its
      audience. This guide covers the main formulas (Flesch-Kincaid, Flesch Reading Ease,
      Gunning Fog, SMOG, Coleman-Liau, ARI), how they differ, concrete tactics to bring scores
      down, target grade levels for common content types, and the limits of the metrics.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Flesch Reading Ease</h2>
    <p>
      Flesch Reading Ease (Rudolf Flesch, 1948) returns a score typically between 0 and 100,
      where higher is easier. The formula is
      <code> 206.835 &minus; 1.015 &times; (words/sentences) &minus; 84.6 &times;
      (syllables/words)</code>. A score of 90-100 reads like very easy prose (5th grade). 60-70
      is plain English (8th-9th grade) and the target for most general-audience writing. 30-50
      is difficult (college level). Below 30 is very difficult (academic). Flesch Reading Ease
      is the single most-cited readability metric and is built into Microsoft Word and many
      grammar checkers.
    </p>

    <h2>Flesch-Kincaid Grade Level</h2>
    <p>
      Flesch-Kincaid Grade Level (J. Peter Kincaid, 1975, for US Navy training manuals) maps
      text to a US school grade level. The formula is
      <code> 0.39 &times; (words/sentences) + 11.8 &times; (syllables/words) &minus; 15.59</code>.
      Output is a grade number: 8.0 means 8th grade, 12.0 means high school senior, 16+ means
      college level. Flesch-Kincaid Grade is easier to communicate to non-technical
      stakeholders (&ldquo;this reads at 10th grade&rdquo;) than Reading Ease (&ldquo;your score
      is 55&rdquo;).
    </p>
    <pre>{`Words: 142
Sentences: 8
Syllables: 220

words/sentences = 17.75
syllables/words = 1.55

Flesch Reading Ease = 206.835 - (1.015 * 17.75) - (84.6 * 1.55) = 57.7
Flesch-Kincaid Grade = (0.39 * 17.75) + (11.8 * 1.55) - 15.59 = 9.6`}</pre>

    <h2>Gunning Fog Index</h2>
    <p>
      Gunning Fog (Robert Gunning, 1952) estimates the grade level needed to understand the text
      on first read. Formula: <code>0.4 &times; ((words/sentences) + 100 &times;
      (complex words/words))</code>, where complex words are those with three or more syllables
      excluding proper nouns, common suffixes, and compound words. Gunning Fog tends to score
      higher than Flesch-Kincaid for the same text because the complex-word criterion is
      strict. A Fog score of 12 means a high school senior can read it; 17+ means college
      graduate.
    </p>

    <h2>SMOG Index</h2>
    <p>
      SMOG (G. Harry McLaughlin, 1969, &ldquo;Simple Measure of Gobbledygook&rdquo;) focuses on
      polysyllabic words (3+ syllables). Formula: <code>1.0430 &times;
      sqrt(polysyllables &times; (30/sentences)) + 3.1291</code>, computed over 30-sentence
      samples. SMOG is popular in healthcare because it was validated against full
      comprehension rather than shorter-recall measures, making it more predictive for material
      that patients actually need to understand, like consent forms and medication inserts.
    </p>

    <h2>Coleman-Liau and ARI</h2>
    <p>
      Coleman-Liau Index and Automated Readability Index both avoid counting syllables, which
      is error-prone. They use character counts and word counts to estimate grade level.
      Coleman-Liau: <code>0.0588 &times; L &minus; 0.296 &times; S &minus; 15.8</code>, where L
      is average letters per 100 words and S is average sentences per 100 words. ARI:
      <code>4.71 &times; (characters/words) + 0.5 &times; (words/sentences) &minus; 21.43</code>.
      Both are useful when syllable-counting heuristics fail (technical jargon, acronyms,
      non-English proper nouns).
    </p>

    <h2>Target grade levels by content type</h2>
    <p>
      Marketing copy targets grade 6-8. News writing targets grade 8-10 (the AP Style Guide
      recommends 8). General blog posts target grade 8-12. Technical documentation targets
      grade 10-14. Legal and academic writing often scores grade 16-20 but should still be
      simplified where possible. Government plain-language guidelines, including the US Plain
      Writing Act of 2010, recommend grade 8 for public-facing communication. Email subject
      lines and social posts target grade 3-5 for maximum comprehension under time pressure.
    </p>
    <pre>{`Marketing:       grade 6-8
News:            grade 8-10
Blog posts:      grade 8-12
Technical docs:  grade 10-14
Plain-language:  grade 8 target (US law for gov't content)
Email subjects:  grade 3-5`}</pre>

    <h2>Tactics to lower the grade level</h2>
    <p>
      Shorten sentences. The single biggest driver of a high grade level is long sentences with
      many clauses. Split sentences over 25 words into two or three. Replace polysyllabic words
      with shorter synonyms when they carry the same meaning: &ldquo;use&rdquo; for
      &ldquo;utilize&rdquo;, &ldquo;help&rdquo; for &ldquo;facilitate&rdquo;, &ldquo;start&rdquo;
      for &ldquo;initiate&rdquo;, &ldquo;show&rdquo; for &ldquo;demonstrate&rdquo;. Replace
      passive voice with active voice. Remove hedges and intensifiers (&ldquo;very&rdquo;,
      &ldquo;quite&rdquo;, &ldquo;arguably&rdquo;) that add length without meaning. Break up
      long paragraphs. Each of these moves a score down and each is visible to the reader.
    </p>

    <h2>Don&rsquo;t over-optimize</h2>
    <p>
      Writing to hit a specific score rather than to serve the reader produces stilted prose.
      Extremely short sentences read choppy. Banning all polysyllabic words strips out precise
      technical terms. Treat the score as a signal, not a target. If your content scores grade
      14 and the audience is engineers, that is probably fine. If it scores grade 14 and the
      audience is consumers, rewrite. The number tells you whether to look more closely, not
      what to do.
    </p>

    <h2>Handling domain-specific text</h2>
    <p>
      Legal, medical, and scientific writing necessarily contains terminology that raises
      scores. Some tools let you add a custom whitelist of domain terms to exclude from
      complex-word counts. That produces a more honest score of the overall writing style,
      separate from the unavoidable vocabulary. If your content is technical, measure
      readability on the prose around the jargon, not the jargon itself.
    </p>

    <h2>Reading ease of structure</h2>
    <p>
      Formulas only measure text. They do not measure whether a document is organized clearly,
      has useful headings, includes diagrams, or breaks up long lists. A grade-8 wall of text is
      harder to read than a grade-10 page with clear sections and visuals. Use readability
      scores alongside structural checks: heading hierarchy, paragraph length, line length,
      scannability. A score of 8 with a bad structure still reads poorly.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Optimizing for a single score.</strong> Different formulas disagree by design. If
      your text scores grade 10 on Flesch-Kincaid and grade 14 on Gunning Fog, that tells you
      something about your vocabulary (Fog counts complex words directly). Look at multiple
      scores together.
    </p>
    <p>
      <strong>Gaming the syllable count.</strong> Replacing every multisyllabic word with a
      contrived short synonym produces gibberish. Keep the words that carry precise meaning and
      cut the ones that add length without value.
    </p>
    <p>
      <strong>Ignoring the audience.</strong> Grade 6 copy aimed at PhD physicists reads as
      condescending. Match the score to the audience, not a universal &ldquo;plainer is
      better&rdquo; rule.
    </p>
    <p>
      <strong>Scoring a snippet instead of the whole document.</strong> Readability scores need
      enough text to be stable. Below 100 words the formulas swing wildly on one or two long
      sentences. Score paragraphs of at least 100-200 words or full documents.
    </p>
    <p>
      <strong>Forgetting proper nouns.</strong> Person and place names can inflate syllable
      counts without reflecting real complexity. Some tools strip proper nouns; others do not.
      Know which and interpret the score accordingly.
    </p>
    <p>
      <strong>Treating the score as absolute truth.</strong> A readability formula is a rough
      proxy, not a measure of comprehension. Validate with real readers, especially for
      high-stakes content like medical consent or public safety notices.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Score text across multiple formulas and compare passes after each revision with the{" "}
      <a href="/tools/readability-score-checker">readability score checker</a>. Pair with the{" "}
      <a href="/tools/text-summarizer">text summarizer</a> when long-form content needs to be
      compressed while preserving the argument, and the{" "}
      <a href="/tools/keyword-density-checker">keyword density checker</a> to verify the key
      terms your audience searches for are still prominent after simplification.
    </p>
  </>
);
