import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Line breaks are the most environment-dependent characters in plain
      text. Windows uses CRLF, Unix uses LF, classic Mac used bare CR, and
      PDFs, emails, and scraped web pages mix all three with abandon.
      Removing line breaks sounds like a one-liner but actually requires
      you to decide what you&rsquo;re preserving: paragraphs? Sentences?
      Bulleted structure? A blanket strip destroys structure; a naive
      regex misses one of the three line-ending variants. This guide
      covers the three line-ending types, the patterns that work across
      all of them, paragraph-preserving strategies, and the pitfalls that
      show up when you re-import the cleaned text into another tool.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three line endings</h2>
    <p>
      Only three characters matter, and their combinations are the source
      of most pain:
    </p>
    <ul>
      <li><strong>LF</strong> (<code>\n</code>, U+000A) &mdash; Unix, macOS, Linux</li>
      <li><strong>CRLF</strong> (<code>\r\n</code>, U+000D U+000A) &mdash; Windows, most email, HTTP</li>
      <li><strong>CR</strong> (<code>\r</code>, U+000D) &mdash; classic Mac, rare now but still in some exports</li>
    </ul>
    <p>
      A file scraped from a Windows-origin email and saved through a
      Mac text editor can contain all three.
    </p>

    <h2>Why the naive approach fails</h2>
    <p>
      <code>text.replace(/\n/g, &rdquo; &rdquo;)</code> only hits LF. On a
      CRLF file this leaves an orphan CR behind every line, which displays
      as a strange box or causes cursor-carriage behavior in some editors.
    </p>
    <pre>{`input (CRLF):  "line 1\\r\\nline 2\\r\\n"
after /\\n/g:    "line 1\\r line 2\\r "
                        ^        ^ orphan CRs`}</pre>

    <h2>The universal line-break regex</h2>
    <p>
      Match all three variants in any order:
    </p>
    <pre>{`/\\r\\n|\\r|\\n/g`}</pre>
    <p>
      This matches CRLF as a unit (so you don&rsquo;t double-replace),
      then bare CR, then bare LF. Order matters &mdash; put CRLF first.
    </p>

    <h2>Flatten to single line</h2>
    <p>
      Replace every break with a space, then collapse runs of spaces:
    </p>
    <pre>{`text
  .replace(/\\r\\n|\\r|\\n/g, " ")
  .replace(/\\s+/g, " ")
  .trim()`}</pre>
    <p>
      Use this for copy-pasting text from a PDF into a word processor
      when each visual line is a soft line-break and you want running
      prose.
    </p>

    <h2>Preserve paragraphs, flatten within</h2>
    <p>
      Most copy-from-PDF cases want paragraphs preserved but single
      wraps flattened. Detect paragraph breaks (two or more line breaks
      in a row), replace single breaks with a space, then restore
      paragraphs.
    </p>
    <pre>{`text
  .replace(/\\r\\n?/g, "\\n")          // normalize to LF
  .replace(/\\n{2,}/g, "\\u0000")     // temp marker for paragraphs
  .replace(/\\n/g, " ")              // flatten single breaks
  .replace(/\\u0000/g, "\\n\\n")      // restore paragraphs`}</pre>

    <h2>Normalize first, then operate</h2>
    <p>
      The cleanest strategy: <strong>always</strong> normalize to LF
      first. Makes every downstream rule simpler.
    </p>
    <pre>{`const lf = text.replace(/\\r\\n?/g, "\\n");`}</pre>
    <p>
      After normalization, <code>\n</code> is the only line break you
      ever have to match.
    </p>

    <h2>Preserving bulleted and numbered lists</h2>
    <p>
      Bulleted list items look like &ldquo;- item&rdquo; or &ldquo;1.
      item&rdquo; at the start of a line. Flattening them destroys the
      list. Detect them before flattening:
    </p>
    <pre>{`// Don't flatten breaks that precede bullet patterns
text.replace(/\\n(?!\\s*(?:[-*&bull;]|\\d+\\.))/g, " ")`}</pre>
    <p>
      This keeps breaks before bullet lines and flattens everywhere
      else. Adjust the character class for your bullet style.
    </p>

    <h2>Handling soft-wrap from PDFs</h2>
    <p>
      PDFs frequently break mid-word with a hyphen. Remove the hyphen and
      the break to re-flow:
    </p>
    <pre>{`text.replace(/-\\n/g, "")   // de-hyphenate
    .replace(/\\n/g, " ")`}</pre>
    <p>
      Watch out for genuine hyphenated compounds (&ldquo;re-\nfactor&rdquo;
      becomes &ldquo;refactor&rdquo; when you wanted &ldquo;re-factor&rdquo;).
      Hard to fix without a dictionary; usually acceptable.
    </p>

    <h2>Round-tripping: be reversible</h2>
    <p>
      If you need to undo the cleanup, keep a copy of the original. Line
      break removal is not reliably reversible &mdash; once you collapse
      &ldquo;end of sentence.\nNext sentence&rdquo; to &ldquo;end of
      sentence. Next sentence,&rdquo; you can&rsquo;t recover the original
      break. Version your text at each step.
    </p>

    <h2>Bulk flatten across many files</h2>
    <p>
      For batch jobs, normalize and strip in a loop:
    </p>
    <pre>{`# bash one-liner
for f in *.txt; do
  tr -d '\\r' &lt; "$f" | tr '\\n' ' ' &gt; "\${f%.txt}.flat"
done`}</pre>
    <p>
      Or in Python with pathlib + io. Always write to new filenames
      first, diff, then replace.
    </p>

    <h2>When to keep line breaks</h2>
    <p>
      Some content genuinely needs breaks preserved: code, poetry,
      addresses, CSV-style data, chat transcripts. If the text has any
      structural meaning encoded in line layout, think twice before
      stripping. A flatten pass is destructive.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Replacing only <code>\n</code> and leaving orphan <code>\r</code>
      characters behind. Flattening paragraphs and losing all structure.
      Removing soft-wrap hyphens without also handling real compound
      words. Forgetting to normalize first, then writing three separate
      regexes for each line-ending variant. And operating on the
      original file with no backup.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/line-break-remover">Line break remover</a>
      <a href="/tools/whitespace-remover">Whitespace remover</a>
      <a href="/tools/remove-duplicate-lines">Remove duplicate lines</a>
    </p>
  </>
);
