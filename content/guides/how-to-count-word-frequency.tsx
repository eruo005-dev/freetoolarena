import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Word frequency is one of the oldest text-analysis techniques and
      still powers SEO, content audits, plagiarism detection, style
      checking, and basic NLP. Count how often each word appears in a
      document and you can spot overused terms, keyword coverage gaps,
      tonal tics, and the shape of a corpus. But naive
      <code>split(&rdquo; &rdquo;)</code> breaks on punctuation, treats
      &ldquo;run,&rdquo; &ldquo;runs,&rdquo; and &ldquo;running&rdquo; as
      three different words, and conflates meaningful content with
      high-frequency filler. This guide covers tokenization rules, stop
      words, stemming, n-grams, and the specific tuning you need for SEO
      vs style vs research applications.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Tokenization: the first hard choice</h2>
    <p>
      How you cut text into words determines every count downstream.
      Naive whitespace split:
    </p>
    <pre>{`"Don't split on hyphens, maybe."
 -&gt;  ["Don't", "split", "on", "hyphens,", "maybe."]`}</pre>
    <p>
      Punctuation is attached. Better: split on non-word characters, then
      lowercase:
    </p>
    <pre>{`str.toLowerCase().match(/\\b[\\p{L}\\p{N}']+\\b/gu)`}</pre>
    <p>
      This keeps contractions (&ldquo;don&rsquo;t&rdquo;) but strips
      commas and periods. Add hyphens to the class if you want
      &ldquo;state-of-the-art&rdquo; as one token.
    </p>

    <h2>Case folding</h2>
    <p>
      &ldquo;The&rdquo; and &ldquo;the&rdquo; should count as the same
      word unless you&rsquo;re analyzing capitalization patterns.
      <code>toLowerCase</code> is usually fine, but remember
      locale-specific rules (Turkish dotted/dotless i, German &szlig;).
    </p>

    <h2>Stop words</h2>
    <p>
      The top 20 words in English text are &ldquo;the, of, and, a, to,
      in, is, you, that, it, he, was, for, on, are&rdquo; &mdash; rarely
      interesting. Standard stop-word lists strip them so the remaining
      counts reflect content.
    </p>
    <pre>{`const STOP = new Set([
  "the","a","an","and","or","but","if","then","else","of",
  "to","in","on","at","for","from","by","with","as","is",
  "are","was","were","be","been","being","have","has","had",
  "do","does","did","will","would","shall","should","may","might",
  "must","can","could","this","that","these","those","i","you",
  "he","she","it","we","they"
]);

tokens.filter(t =&gt; !STOP.has(t))`}</pre>
    <p>
      Customize the list for your domain. SEO stop-word lists usually
      keep more terms than research-corpus lists.
    </p>

    <h2>Stemming vs lemmatization</h2>
    <p>
      Both collapse word variants to a single form:
    </p>
    <ul>
      <li>
        <strong>Stemming</strong> &mdash; algorithmic, cheap, aggressive.
        &ldquo;running&rdquo; &rarr; &ldquo;run&rdquo;, &ldquo;better&rdquo;
        &rarr; &ldquo;better&rdquo; (doesn&rsquo;t handle irregulars)
      </li>
      <li>
        <strong>Lemmatization</strong> &mdash; dictionary-based,
        accurate, slower. &ldquo;running&rdquo; &rarr; &ldquo;run&rdquo;,
        &ldquo;better&rdquo; &rarr; &ldquo;good&rdquo;
      </li>
    </ul>
    <p>
      Stemming is usually good enough for frequency counting. Porter
      stemmer is the classic; Snowball is its modern descendant. For
      accuracy-critical work, use <code>spaCy</code> or
      <code>NLTK</code> with WordNet.
    </p>

    <h2>Counting</h2>
    <p>
      Trivial with a map:
    </p>
    <pre>{`const counts = new Map();
for (const t of tokens) {
  counts.set(t, (counts.get(t) || 0) + 1);
}

// sort desc
const sorted = [...counts.entries()]
  .sort((a, b) =&gt; b[1] - a[1]);`}</pre>

    <h2>N-grams: beyond single words</h2>
    <p>
      Single-word counts miss phrases. &ldquo;San Francisco&rdquo;
      carries information that &ldquo;san&rdquo; + &ldquo;francisco&rdquo;
      separately doesn&rsquo;t. Bigrams (2-word) and trigrams (3-word)
      capture this:
    </p>
    <pre>{`function ngrams(tokens, n) {
  const out = [];
  for (let i = 0; i &lt;= tokens.length - n; i++) {
    out.push(tokens.slice(i, i + n).join(" "));
  }
  return out;
}

const bigrams = ngrams(tokens, 2);
const trigrams = ngrams(tokens, 3);`}</pre>
    <p>
      Bigram stop-word filtering is trickier &mdash; &ldquo;of the&rdquo;
      is noise but &ldquo;state of the art&rdquo; is signal. Strip
      bigrams where both tokens are stop words, keep the rest.
    </p>

    <h2>TF-IDF: frequency in context</h2>
    <p>
      Raw frequency favors stop words and common terms. TF-IDF (term
      frequency inverse document frequency) measures how distinctive a
      word is <em>to this document</em> relative to a corpus.
    </p>
    <pre>{`tf(t, d)   = count of t in d / total terms in d
idf(t)     = log(N / n_t)   // N docs total, n_t docs with t
tfidf(t,d) = tf(t, d) * idf(t)`}</pre>
    <p>
      High TF-IDF = characteristic of the document. Great for tagging,
      topic extraction, and finding the &ldquo;gist&rdquo; words.
    </p>

    <h2>SEO application: keyword density</h2>
    <p>
      Keyword density = (count of keyword / total words) &times; 100.
      Old SEO target was 1&ndash;3%. Modern consensus: natural language
      beats forced density. Use frequency counting to:
    </p>
    <ul>
      <li>Catch obvious keyword stuffing (&gt;5% for any one term)</li>
      <li>Find coverage gaps where expected terms are missing</li>
      <li>Audit multi-page consistency</li>
      <li>Spot over-indexing on stop-word-like phrases</li>
    </ul>

    <h2>Style checking</h2>
    <p>
      Frequency counts reveal habitual tics: &ldquo;really,&rdquo;
      &ldquo;just,&rdquo; &ldquo;very,&rdquo; &ldquo;that&rdquo; overused
      as filler. Run your draft through a frequency pass and the top 30
      content words show your patterns.
    </p>

    <h2>Research and corpus analysis</h2>
    <p>
      For larger corpora:
    </p>
    <ul>
      <li>Normalize to NFKC, lowercase, strip punctuation</li>
      <li>Apply a domain-specific stop-word list</li>
      <li>Stem with Snowball or Porter</li>
      <li>Generate uni/bi/trigrams, report top 50 of each</li>
      <li>For larger analysis, compute TF-IDF across document-by-document breakdown</li>
    </ul>

    <h2>Hapax legomena and Zipf&rsquo;s law</h2>
    <p>
      Natural-language frequency distributions follow Zipf&rsquo;s law:
      the Nth most common word has frequency roughly proportional to
      1/N. The single most common word appears twice as often as the
      second, three times as often as the third, etc. Deviations from
      Zipf&rsquo;s law often indicate artificially generated or
      translated text. Hapax legomena (words that appear exactly once)
      typically make up 40&ndash;60% of the distinct vocabulary in any
      corpus &mdash; a useful sanity check.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Splitting on whitespace only and keeping punctuation attached to
      tokens. Case-folding too early and losing proper-noun distinction.
      Applying an English stop-word list to non-English text. Counting
      &ldquo;run,&rdquo; &ldquo;runs,&rdquo; and &ldquo;running&rdquo;
      separately when you meant them as one concept. Forgetting that
      HTML tags, URLs, and numbers need separate handling. And
      confusing frequency rank with importance &mdash; Zipf&rsquo;s law
      guarantees &ldquo;the&rdquo; wins every time.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/word-frequency-counter">Word frequency counter</a>
      <a href="/tools/keyword-density-checker">Keyword density checker</a>
      <a href="/tools/word-counter">Word counter</a>
    </p>
  </>
);
