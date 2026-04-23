import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Unicode lets the same visible text be encoded multiple ways. The
      letter &ldquo;&eacute;&rdquo; can be one code point (U+00E9) or two
      (U+0065 + U+0301), and both render identically. When you compare
      two strings, index them in a database, use them as cache keys, or
      run a regex across them, these equivalent-but-different encodings
      silently diverge. Unicode normalization forces a canonical form so
      two &ldquo;equal&rdquo; strings actually compare equal. This guide
      covers the four normalization forms (NFC, NFD, NFKC, NFKD), when to
      use each, the security implications of homoglyph attacks, and the
      database and search-index patterns that depend on consistent
      normalization.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why normalization exists</h2>
    <p>
      Unicode added accented characters in two compatible ways. Legacy
      precomposed (single code point) and combining (letter plus
      modifier). Both render identically. Neither is &ldquo;wrong.&rdquo;
      But comparing them requires normalization.
    </p>
    <pre>{`"caf\\u00e9"         // 4 code points (precomposed)
"cafe\\u0301"        // 5 code points (decomposed)

length:              4          5
===:                 false
after normalize:     both become "caf\\u00e9"`}</pre>

    <h2>The four forms</h2>
    <ul>
      <li>
        <strong>NFC</strong> &mdash; Canonical Composition. Combines
        decomposed characters into precomposed form. Usually what you
        want.
      </li>
      <li>
        <strong>NFD</strong> &mdash; Canonical Decomposition. Splits
        precomposed characters into base + combining marks. Useful for
        stripping accents.
      </li>
      <li>
        <strong>NFKC</strong> &mdash; Compatibility Composition. NFC
        plus compatibility replacements (e.g., full-width to half-width,
        ligatures to individual letters).
      </li>
      <li>
        <strong>NFKD</strong> &mdash; Compatibility Decomposition.
        NFD plus compatibility mapping.
      </li>
    </ul>

    <h2>NFC: the default for storage and comparison</h2>
    <p>
      NFC produces the shortest, most common form. Most of the web stores
      text in NFC. Compare with NFC for &ldquo;are these the same
      user-perceived string&rdquo; tests.
    </p>
    <pre>{`a.normalize("NFC") === b.normalize("NFC")`}</pre>

    <h2>NFD: when you want to strip accents</h2>
    <p>
      Normalize to decomposed form, then strip combining marks
      (<code>{`\\p{M}`}</code>). You get ASCII-ish letters without the
      diacritics.
    </p>
    <pre>{`"caf\\u00e9".normalize("NFD").replace(/\\p{M}/gu, "")
// -&gt; "cafe"`}</pre>
    <p>
      This is the backbone of slug generation and accent-insensitive
      search.
    </p>

    <h2>NFKC: lossy but useful</h2>
    <p>
      NFKC collapses visual variants to their &ldquo;plain&rdquo; form:
    </p>
    <pre>{`"\\uFF21\\uFF22\\uFF23".normalize("NFKC")
// -&gt; "ABC" (full-width to half-width)

"\\uFB00".normalize("NFKC")
// -&gt; "ff" (ligature to letters)

"\\u00B2".normalize("NFKC")
// -&gt; "2" (superscript to digit)`}</pre>
    <p>
      Great for search and deduplication. <em>Not</em> great for
      preserving authorial intent &mdash; a document&rsquo;s typographic
      ligatures and superscripts are meaningful.
    </p>

    <h2>NFKD: search-index form</h2>
    <p>
      NFKD is the aggressive &ldquo;one true form&rdquo; for search:
      strip compatibility variants and decompose. Then you can strip
      combining marks for full accent-insensitive indexing.
    </p>
    <pre>{`function searchKey(s) {
  return s
    .normalize("NFKD")
    .replace(/\\p{M}/gu, "")
    .toLowerCase();
}`}</pre>

    <h2>When normalizations disagree</h2>
    <p>
      NFC and NFD round-trip safely &mdash; convert NFC to NFD back to
      NFC, you get the original. NFKC and NFKD are <strong>lossy</strong>.
      Once you&rsquo;ve NFKC&rsquo;d a string containing the ff ligature,
      you can&rsquo;t recover the ligature from &ldquo;ff.&rdquo;
    </p>

    <h2>Database key normalization</h2>
    <p>
      If your DB stores user handles, email addresses, or anything
      user-typed as a primary key, normalize before insert <em>and</em>
      before lookup. Pick NFC for display-preserving storage; NFKC if
      you want to treat full-width and half-width as equivalent.
    </p>
    <pre>{`INSERT INTO users (handle) VALUES (NFC(input));
SELECT * FROM users WHERE handle = NFC(lookup);`}</pre>
    <p>
      Postgres has <code>normalize()</code> built in. MySQL and SQLite
      require application-level normalization.
    </p>

    <h2>Homoglyph attacks</h2>
    <p>
      Attackers exploit visually-similar characters from different
      scripts. Latin &ldquo;a&rdquo; (U+0061) and Cyrillic
      &ldquo;&#1072;&rdquo; (U+0430) look identical but are different code
      points. Normalization <em>doesn&rsquo;t</em> collapse these
      &mdash; they&rsquo;re distinct Unicode characters. To defend:
    </p>
    <ul>
      <li>Restrict identifiers to a single script (Unicode IDN rules for domains)</li>
      <li>Flag or block mixed-script strings</li>
      <li>Use <code>confusables.txt</code> data from Unicode CLDR</li>
      <li>For passwords and usernames, apply PRECIS profiles (RFC 8264)</li>
    </ul>

    <h2>Normalization + case folding</h2>
    <p>
      Case-insensitive compare needs case folding, not just
      <code>toLowerCase</code>. German &szlig; uppercases to SS; Turkish
      dotless &#305; and dotted i don&rsquo;t map the way English expects.
    </p>
    <pre>{`// JS has limited folding
str.normalize("NFC").toLowerCase();

// Intl.Collator handles locale correctly
new Intl.Collator("tr", { sensitivity: "accent" })
  .compare(a, b) === 0`}</pre>

    <h2>Benchmarking and file size</h2>
    <p>
      Normalization is cheap for short strings (microseconds). Large
      documents (books, corpora) can measure in milliseconds. For
      streaming pipelines, normalize in chunks that align to grapheme
      boundaries &mdash; don&rsquo;t normalize half a combining sequence.
    </p>

    <h2>Round-tripping through systems</h2>
    <p>
      Copy through Windows, macOS, Linux, and web apps, and normalization
      form can silently change. macOS famously uses NFD for its
      filesystem, which means file names copied to other systems shift
      form. Always normalize at boundaries: on input, on storage, on
      output.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Comparing strings without normalizing, and wondering why
      &ldquo;equal&rdquo; strings don&rsquo;t match. Using NFKC for
      archival storage and losing typographic ligatures. Assuming
      <code>toLowerCase</code> is enough for case-insensitive compare
      across locales. Thinking normalization defends against homoglyphs
      &mdash; it doesn&rsquo;t. And forgetting that filenames from macOS
      are often NFD while your database stores NFC, causing case-like
      mismatches that look impossible.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/unicode-text-normalizer">Unicode text normalizer</a>
      <a href="/tools/invisible-character-detector">Invisible character detector</a>
      <a href="/tools/special-character-remover">Special character remover</a>
    </p>
  </>
);
