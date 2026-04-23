import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Some of the most frustrating bugs in text processing are caused by
      characters you literally cannot see. Zero-width spaces, non-breaking
      spaces, byte-order marks, zero-width joiners, and the exotic tag
      characters used in Unicode hide in pasted text, survive regex
      cleanup, and silently break string matching, search indexes, and
      CSV parsing. A password field rejects your input; a regex
      doesn&rsquo;t match what you know is there; a file has a mysterious
      first character. This guide covers the most common invisible
      characters, how they sneak into your workflow, and the detection
      and stripping patterns that actually work.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The usual suspects</h2>
    <ul>
      <li><strong>NBSP</strong> (U+00A0) &mdash; non-breaking space, looks like space</li>
      <li><strong>ZWSP</strong> (U+200B) &mdash; zero-width space, takes no width</li>
      <li><strong>ZWNJ</strong> (U+200C) &mdash; zero-width non-joiner</li>
      <li><strong>ZWJ</strong> (U+200D) &mdash; zero-width joiner (used in emoji)</li>
      <li><strong>BOM</strong> (U+FEFF) &mdash; byte-order mark, often at file start</li>
      <li><strong>Soft hyphen</strong> (U+00AD) &mdash; only visible at line-break points</li>
      <li><strong>LRM/RLM</strong> (U+200E/U+200F) &mdash; LTR/RTL marks</li>
      <li><strong>Tag characters</strong> (U+E0000 block) &mdash; invisible hidden-message vector</li>
      <li><strong>Variation selectors</strong> (U+FE00&ndash;U+FE0F)</li>
      <li><strong>Ideographic space</strong> (U+3000) &mdash; full-width space</li>
    </ul>

    <h2>How they get in</h2>
    <p>
      Paste workflows are the main source:
    </p>
    <ul>
      <li>Copy from Microsoft Word &rarr; NBSP and smart quotes</li>
      <li>Copy from web pages &rarr; ZWSP for word-break hints</li>
      <li>Save from Excel CSV &rarr; BOM at file start</li>
      <li>Copy from terminal &rarr; ANSI escape sequences</li>
      <li>Paste from messaging apps &rarr; ZWJ in emoji sequences</li>
      <li>Malicious paste &rarr; intentionally hidden payloads</li>
    </ul>

    <h2>Detecting with a hex dump</h2>
    <p>
      The most reliable inspection: view the hex. Anything in a visible
      region that isn&rsquo;t ASCII is suspect.
    </p>
    <pre>{`// JS: dump each code point
[...str].forEach((c, i) =&gt; {
  const cp = c.codePointAt(0).toString(16).padStart(4, "0");
  console.log(i, c, "U+" + cp.toUpperCase());
});`}</pre>
    <p>
      On the command line: <code>xxd</code>, <code>od -c</code>, or
      <code>hexyl</code>.
    </p>

    <h2>Regex detection</h2>
    <p>
      Match anything that renders with zero or ambiguous width:
    </p>
    <pre>{`const INVISIBLES = /[\\u00A0\\u00AD\\u034F\\u061C\\u115F\\u1160\\u17B4\\u17B5\\u180E\\u2000-\\u200F\\u2028-\\u202F\\u205F-\\u206F\\u3000\\u2060-\\u2064\\uFEFF\\uFFF9-\\uFFFB]/gu;

str.match(INVISIBLES);`}</pre>
    <p>
      This covers the Unicode ranges explicitly listed as
      &ldquo;default-ignorable&rdquo; or known invisible-space
      characters. Extend with the E0000 tag block if you&rsquo;re
      paranoid about hidden-message attacks.
    </p>

    <h2>Zero-width characters</h2>
    <p>
      U+200B&ndash;U+200D and U+FEFF take zero rendering width. They&rsquo;re
      functionally invisible but affect:
    </p>
    <ul>
      <li>String length (<code>&rdquo;a\u200Bb&rdquo;.length === 3</code>)</li>
      <li>Regex matching (<code>/ab/</code> won&rsquo;t match)</li>
      <li>Search indexes</li>
      <li>URL parsing and domain validation</li>
      <li>Password comparison</li>
    </ul>
    <p>
      Strip aggressively for input normalization:
    </p>
    <pre>{`str.replace(/[\\u200B-\\u200D\\uFEFF]/g, "")`}</pre>

    <h2>The BOM problem</h2>
    <p>
      U+FEFF at the start of a file is a byte-order mark, used by some
      tools to signal UTF encoding. It causes:
    </p>
    <ul>
      <li>CSV parsers reading &ldquo;&#xFEFF;Name&rdquo; as the first column header</li>
      <li>JSON parsers failing with &ldquo;unexpected character&rdquo;</li>
      <li>Shell scripts failing because the shebang line is invalidated</li>
      <li>Diff tools showing a byte at position 0 that &ldquo;isn&rsquo;t there&rdquo;</li>
    </ul>
    <pre>{`// strip BOM at start of file only
str.replace(/^\\uFEFF/, "")`}</pre>

    <h2>Non-breaking space variants</h2>
    <p>
      NBSP (U+00A0) is the most common impostor. Looks identical to
      space. Breaks:
    </p>
    <ul>
      <li><code>/ /</code> regex</li>
      <li><code>str.split(&rdquo; &rdquo;)</code></li>
      <li>Trim (in older engines)</li>
    </ul>
    <p>
      Other space variants to watch: U+2007 (figure space), U+2008
      (punctuation space), U+202F (narrow no-break), U+3000 (ideographic
      space). Normalize all to regular space:
    </p>
    <pre>{`str.replace(/[\\u00A0\\u2000-\\u200A\\u202F\\u205F\\u3000]/g, " ")`}</pre>

    <h2>Tag characters &mdash; the hidden-message vector</h2>
    <p>
      Unicode&rsquo;s U+E0020&ndash;U+E007F block mirrors ASCII but is
      default-ignorable. You can encode an entire message in
      &ldquo;invisible&rdquo; tag characters and append it to normal
      text. It survives most regex, most UI display, and most copy-paste.
      Used in watermarking and some attack scenarios. Strip unless you
      have a specific reason to keep them.
    </p>
    <pre>{`str.replace(/[\\u{E0020}-\\u{E007F}]/gu, "")`}</pre>

    <h2>Detection UI patterns</h2>
    <p>
      When a user complains &ldquo;the form says my input is invalid but
      it looks fine,&rdquo; show a character-by-character diagnostic:
    </p>
    <ul>
      <li>Render each character with its code point</li>
      <li>Highlight any not in a safe allow-list</li>
      <li>Suggest an auto-cleaned version</li>
    </ul>

    <h2>Prevention at input boundaries</h2>
    <p>
      The fix is at ingest, not at query. On every user-text input:
    </p>
    <pre>{`function cleanInput(s) {
  return s
    .normalize("NFC")
    .replace(/^\\uFEFF/, "")
    .replace(/[\\u200B-\\u200D\\u2060-\\u2064\\uFEFF]/g, "")
    .replace(/[\\u00A0\\u2000-\\u200A\\u202F\\u205F\\u3000]/g, " ")
    .replace(/[\\x00-\\x08\\x0B\\x0C\\x0E-\\x1F\\x7F]/g, "")
    .trim();
}`}</pre>

    <h2>When invisible characters are wanted</h2>
    <p>
      Not always garbage. Legitimate uses include:
    </p>
    <ul>
      <li>ZWJ in emoji sequences (family, professions, flags)</li>
      <li>ZWNJ in Persian and Arabic text for correct letter-joining</li>
      <li>Soft hyphens for line-break hints in print typography</li>
      <li>LRM/RLM for fixing bidirectional text display</li>
    </ul>
    <p>
      Context-aware stripping only. Don&rsquo;t nuke ZWJ from emoji.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Writing a &ldquo;strip whitespace&rdquo; routine that misses NBSP
      and ideographic space. Not stripping the BOM from CSV imports and
      having a broken first column. Assuming <code>trim()</code> in every
      language handles Unicode whitespace (it doesn&rsquo;t, in some
      older runtimes). Treating all zero-width characters as noise
      when some carry meaning. And not logging code points when a
      mystery bug lands &mdash; debugging invisible characters without a
      hex dump is agony.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/invisible-character-detector">Invisible character detector</a>
      <a href="/tools/unicode-text-normalizer">Unicode text normalizer</a>
      <a href="/tools/whitespace-remover">Whitespace remover</a>
    </p>
  </>
);
