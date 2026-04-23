import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      &ldquo;Strip special characters&rdquo; is a deceptively fuzzy
      request. There&rsquo;s no universal definition of a &ldquo;special&rdquo;
      character &mdash; it depends on what you&rsquo;re cleaning text for.
      URL-safe output wants one character set; database primary keys want
      another; human-readable display wants a third. Running a blanket
      regex like <code>/[^a-zA-Z0-9]/g</code> will nuke spaces, accents,
      and punctuation you probably wanted to keep. This guide walks
      through defining &ldquo;special&rdquo; for your use case, the regex
      patterns for each, how to preserve common punctuation selectively,
      and how to produce ASCII-only or URL-safe output without destroying
      the meaning of the text.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Start by defining &ldquo;special&rdquo;</h2>
    <p>
      Pick the output constraint first, then derive the allow-list:
    </p>
    <ul>
      <li><strong>Filename-safe</strong> &mdash; no <code>/ \\ : * ? &ldquo; &lt; &gt; |</code></li>
      <li><strong>URL-safe</strong> &mdash; alphanumeric, dash, underscore, dot</li>
      <li><strong>ASCII-only</strong> &mdash; strip or transliterate everything outside U+0000&ndash;U+007F</li>
      <li><strong>Alphanumeric-only</strong> &mdash; letters and digits, nothing else</li>
      <li><strong>Human-readable</strong> &mdash; keep punctuation, strip control chars</li>
    </ul>

    <h2>Allow-list beats deny-list</h2>
    <p>
      Deny-listing (&ldquo;remove these bad characters&rdquo;) leaves you
      vulnerable to characters you didn&rsquo;t think of &mdash; especially
      Unicode confusables, zero-width characters, and invisible tags.
      Allow-listing (&ldquo;keep only these characters&rdquo;) is safer.
    </p>
    <pre>{`// Allow-list: alphanumeric + space + basic punctuation
str.replace(/[^\\p{L}\\p{N} .,!?'-]/gu, "")

// \\p{L} = any letter (any script)
// \\p{N} = any number
// u flag = Unicode`}</pre>

    <h2>ASCII-only with transliteration</h2>
    <p>
      Don&rsquo;t just strip non-ASCII &mdash; transliterate first so
      &ldquo;caf&eacute;&rdquo; becomes &ldquo;cafe,&rdquo; not
      &ldquo;caf.&rdquo; The trick: normalize to NFD (decomposed form),
      then strip combining marks, then strip anything still non-ASCII.
    </p>
    <pre>{`function toAscii(s) {
  return s
    .normalize("NFD")
    .replace(/\\p{M}/gu, "")       // strip combining marks
    .replace(/[^\\x00-\\x7F]/g, ""); // drop any remaining non-ASCII
}

toAscii("caf\\u00e9")        // "cafe"
toAscii("na\\u00efve")       // "naive"
toAscii("r\\u00e9sum\\u00e9") // "resume"`}</pre>
    <p>
      This handles accented Latin beautifully. It can&rsquo;t transliterate
      non-Latin scripts &mdash; for Cyrillic, Greek, or CJK you need a
      dedicated library.
    </p>

    <h2>URL-safe output</h2>
    <p>
      URLs allow a narrow character set. The standard pattern:
    </p>
    <pre>{`function toSlug(s) {
  return s
    .normalize("NFD")
    .replace(/\\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

toSlug("Hello, World!")       // "hello-world"
toSlug("caf\\u00e9 &amp; bar")   // "cafe-bar"`}</pre>

    <h2>Preserve spaces but strip punctuation</h2>
    <p>
      Common for prepping text for tokenization or search indexing:
    </p>
    <pre>{`str.replace(/[^\\p{L}\\p{N}\\s]/gu, "")
   .replace(/\\s+/g, " ")
   .trim()`}</pre>
    <p>
      Removes punctuation but keeps word boundaries intact.
    </p>

    <h2>Filename sanitization</h2>
    <p>
      Windows is the strictest. Safe filename regex:
    </p>
    <pre>{`function sanitizeFilename(name) {
  return name
    .replace(/[\\/\\\\:*?"&lt;&gt;|]/g, "_")
    .replace(/\\s+/g, " ")
    .trim()
    .slice(0, 200);              // reserve room for extension
}`}</pre>
    <p>
      Also check for reserved names on Windows: <code>CON</code>,
      <code>PRN</code>, <code>AUX</code>, <code>NUL</code>,
      <code>COM1</code>&ndash;<code>COM9</code>, <code>LPT1</code>&ndash;<code>LPT9</code>.
      Neither with nor without extensions are allowed as filenames.
    </p>

    <h2>Control character stripping</h2>
    <p>
      Control characters (U+0000&ndash;U+001F and U+007F) cause chaos in
      display, logs, and databases. Strip them universally unless you
      specifically need <code>\t</code>, <code>\n</code>, <code>\r</code>:
    </p>
    <pre>{`str.replace(/[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]/g, "")`}</pre>

    <h2>Preserving quotes and apostrophes</h2>
    <p>
      &ldquo;Smart&rdquo; quotes (U+2018, U+2019, U+201C, U+201D) vs
      straight (U+0027, U+0022) is a frequent headache. Pick one and
      normalize:
    </p>
    <pre>{`str
  .replace(/[\\u2018\\u2019\\u201A\\u201B]/g, "'")
  .replace(/[\\u201C\\u201D\\u201E\\u201F]/g, "\\"");`}</pre>

    <h2>Category-based stripping with Unicode</h2>
    <p>
      Regex Unicode categories let you strip by meaning, not by codepoint:
    </p>
    <ul>
      <li><code>{`\\p{L}`}</code> &mdash; letters</li>
      <li><code>{`\\p{N}`}</code> &mdash; numbers</li>
      <li><code>{`\\p{P}`}</code> &mdash; punctuation</li>
      <li><code>{`\\p{S}`}</code> &mdash; symbols (math, currency, etc.)</li>
      <li><code>{`\\p{M}`}</code> &mdash; marks (combining diacritics)</li>
      <li><code>{`\\p{C}`}</code> &mdash; control and format characters</li>
      <li><code>{`\\p{Z}`}</code> &mdash; separators (spaces)</li>
    </ul>
    <pre>{`// Strip punctuation and symbols only
str.replace(/[\\p{P}\\p{S}]/gu, "")`}</pre>

    <h2>Testing your filter</h2>
    <p>
      Always run it on a torture-test string:
    </p>
    <pre>{`const test = "Caf\\u00e9 \\u2014 'Na\\u00efve' &lt;3 &#x1F600; \\u0000\\u200B";
console.log(filter(test));`}</pre>
    <p>
      Check the output for smart quotes, combining marks, emoji,
      zero-width space, and control characters. If any slipped through,
      tighten your allow-list.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Using <code>[^a-zA-Z0-9]</code> without the Unicode flag and
      destroying all non-ASCII letters. Stripping combining marks
      without first normalizing to NFD, so &ldquo;caf&eacute;&rdquo; (one
      code point) stays intact but &ldquo;cafe + combining acute&rdquo;
      becomes &ldquo;cafe&rdquo; &mdash; inconsistent results across
      inputs. Forgetting zero-width characters exist. Writing a
      deny-list that misses a character class somebody pastes next week.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/special-character-remover">Special character remover</a>
      <a href="/tools/unicode-text-normalizer">Unicode text normalizer</a>
      <a href="/tools/slug-generator">Slug generator</a>
    </p>
  </>
);
