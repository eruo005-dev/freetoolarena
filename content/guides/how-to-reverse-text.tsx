import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Reversing a string is one of the first problems in any programming
      tutorial, which creates the illusion that it&rsquo;s trivial. It
      isn&rsquo;t. &ldquo;Reverse this text&rdquo; can mean reverse every
      character, reverse every word, reverse the bytes, or reverse the
      user-perceived characters &mdash; and each of those gives a different
      answer once you include emoji, combining diacritics, or right-to-left
      scripts. This guide covers the four common reversal definitions, why a
      naive character-by-character loop breaks modern Unicode text, and how
      to handle edge cases like flag emoji, Thai vowel marks, and Hebrew.
      You&rsquo;ll also learn the palindrome-checking application and the
      gotchas specific to that.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Four definitions of &ldquo;reverse&rdquo;</h2>
    <p>
      Before writing code, pick a definition:
    </p>
    <ul>
      <li><strong>Character reversal</strong> &mdash; last char first, first char last</li>
      <li><strong>Word reversal</strong> &mdash; word order flips, word spelling stays</li>
      <li><strong>Byte reversal</strong> &mdash; rarely what you want, shown for completeness</li>
      <li><strong>Grapheme reversal</strong> &mdash; what users actually expect with emoji/diacritics</li>
    </ul>

    <h2>Character reversal: the naive version</h2>
    <p>
      The textbook approach works for pure ASCII:
    </p>
    <pre>{`"hello" -> "olleh"

// JS
[...str].reverse().join("")

// Python
str[::-1]`}</pre>
    <p>
      This works until the input has anything beyond the basic multilingual
      plane.
    </p>

    <h2>Why naive reversal breaks on emoji</h2>
    <p>
      Many emoji are stored as <strong>surrogate pairs</strong> in UTF-16
      &mdash; two code units forming one user-perceived character. JavaScript&rsquo;s
      <code>str.split(&rdquo;&rdquo;)</code> splits at the code-unit level,
      which splits surrogate pairs apart.
    </p>
    <pre>{`// Broken:
"a\\uD83D\\uDE00b".split("").reverse().join("")
// produces garbled surrogate order

// Correct:
[..."a\\uD83D\\uDE00b"].reverse().join("")
// spread uses iterator, which respects code points`}</pre>

    <h2>Combining characters: the deeper problem</h2>
    <p>
      Even code-point iteration isn&rsquo;t enough. An &ldquo;&eacute;&rdquo; can be
      one code point (U+00E9) or two (U+0065 + U+0301 combining acute). If
      you reverse the two-code-point form, the accent ends up on the wrong
      letter.
    </p>
    <pre>{`"cafe\\u0301" reversed naively -> "\\u0301efac"
// the combining mark now attaches to whatever
// was before it, not to "e"`}</pre>
    <p>
      The fix: split by <em>grapheme clusters</em>, not code points. Use
      <code>Intl.Segmenter</code> in modern JS or the <code>regex</code>
      package in Python.
    </p>

    <h2>Grapheme-safe reversal</h2>
    <pre>{`// JS
const seg = new Intl.Segmenter("en", { granularity: "grapheme" });
const graphemes = [...seg.segment(str)].map(s =&gt; s.segment);
const reversed = graphemes.reverse().join("");

// Python
import regex
graphemes = regex.findall(r"\\X", str)
reversed = "".join(graphemes[::-1])`}</pre>
    <p>
      This handles flag emoji (regional-indicator pairs), skin-tone
      modifiers, ZWJ sequences (family emoji), and combining marks
      correctly.
    </p>

    <h2>Word reversal</h2>
    <p>
      Word-level reversal flips the order of tokens without reversing each
      token. &ldquo;The quick brown fox&rdquo; becomes &ldquo;fox brown quick
      The.&rdquo;
    </p>
    <pre>{`str.split(/\\s+/).reverse().join(" ")`}</pre>
    <p>
      Watch the whitespace handling &mdash; double spaces, tabs, newlines.
      Decide whether you want to preserve exact whitespace or normalize.
    </p>

    <h2>Right-to-left scripts</h2>
    <p>
      Arabic, Hebrew, and Persian already display right-to-left. Reversing
      them at the character level produces text that displays in
      left-to-right order, which looks &ldquo;forward&rdquo; to an LTR
      reader but is actually a scrambled string. Reversing is almost never
      what you want for RTL content. If you&rsquo;re rendering a mixed-script
      sentence, the Unicode bidirectional algorithm handles visual order
      separately from storage order &mdash; don&rsquo;t fight it.
    </p>

    <h2>Byte reversal</h2>
    <p>
      Reversing raw UTF-8 bytes produces invalid UTF-8 in almost every case
      and should be avoided unless you&rsquo;re doing low-level work on
      ASCII-only data. The multi-byte continuation bytes will end up in
      positions where lead bytes belong.
    </p>

    <h2>Palindrome checking</h2>
    <p>
      The classic application. Canonical workflow:
    </p>
    <ul>
      <li>Lowercase</li>
      <li>Strip punctuation and whitespace</li>
      <li>Normalize Unicode (NFC)</li>
      <li>Compare to its grapheme-reversed self</li>
    </ul>
    <pre>{`function isPalindrome(s) {
  const norm = s.toLowerCase()
    .normalize("NFC")
    .replace(/[^\\p{L}\\p{N}]/gu, "");
  const seg = new Intl.Segmenter("en", { granularity: "grapheme" });
  const graphs = [...seg.segment(norm)].map(x =&gt; x.segment);
  return graphs.join("") === graphs.slice().reverse().join("");
}`}</pre>

    <h2>Line-by-line reversal</h2>
    <p>
      A different kind of &ldquo;reverse&rdquo;: keep each line intact but
      put the last line first. Useful for chronological log files.
    </p>
    <pre>{`str.split("\\n").reverse().join("\\n")`}</pre>

    <h2>Performance notes</h2>
    <p>
      For strings under ~10&nbsp;KB, grapheme segmentation is fast enough
      that you shouldn&rsquo;t worry. For multi-MB inputs, iterator-based
      approaches beat splitting the whole thing into an array. Streaming
      grapheme segmentation requires buffer handling because a grapheme
      can span chunks.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Splitting on empty string and reversing &mdash; breaks emoji and
      combining marks. Reversing then lowercasing palindromes (do it in the
      other order &mdash; case changes in some scripts change the code-point
      count). Forgetting to normalize before comparing, so &ldquo;caf&eacute;&rdquo;
      and &ldquo;cafe + combining accent&rdquo; compare unequal. Expecting
      meaningful output from reversing RTL text.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/text-reverser">Text reverser</a>
      <a href="/tools/text-repeater">Text repeater</a>
      <a href="/tools/case-converter">Case converter</a>
    </p>
  </>
);
