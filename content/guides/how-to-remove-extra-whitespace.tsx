import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Extra whitespace is the silent ugliness of text pipelines. Trailing
      spaces break diffs, runs of spaces ruin alignment, tabs mixed with
      spaces break code, and non-breaking spaces pasted from Word look
      identical to regular spaces but compare unequal and cause string
      matches to fail mysteriously. &ldquo;Remove extra whitespace&rdquo;
      is a dozen different operations depending on what you mean: trim,
      collapse runs, convert tabs, strip invisible variants, or normalize
      the lot. This guide covers each operation, the regex patterns that
      actually work, and the cases where you deliberately <em>don&rsquo;t</em>
      want to strip &mdash; like code indentation.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What counts as whitespace</h2>
    <p>
      More than just the space character. The Unicode whitespace class
      includes:
    </p>
    <ul>
      <li>Regular space (U+0020)</li>
      <li>Tab (U+0009)</li>
      <li>Line feed, carriage return, form feed, vertical tab</li>
      <li>Non-breaking space (U+00A0) &mdash; looks like space, isn&rsquo;t</li>
      <li>En space, em space, thin space, hair space (U+2000 to U+200A)</li>
      <li>Zero-width space (U+200B) &mdash; technically not whitespace in Unicode, but often treated as one</li>
      <li>Ideographic space (U+3000) &mdash; full-width space from CJK</li>
    </ul>

    <h2>Trim</h2>
    <p>
      Remove leading and trailing whitespace, leave the middle alone.
      Every language has a built-in. In regex:
    </p>
    <pre>{`str.replace(/^\\s+|\\s+$/g, "")

// Or JS built-in
str.trim();        // both ends
str.trimStart();   // leading only
str.trimEnd();     // trailing only`}</pre>
    <p>
      JavaScript&rsquo;s <code>trim</code> uses the Unicode whitespace
      class, so it handles non-breaking space and the exotic Unicode
      spaces too.
    </p>

    <h2>Collapse runs of whitespace</h2>
    <p>
      Replace any run of whitespace with a single space:
    </p>
    <pre>{`str.replace(/\\s+/g, " ")`}</pre>
    <p>
      This flattens tabs, multiple spaces, and any line breaks inside.
      Combine with trim for the classic &ldquo;clean up this mess&rdquo;
      pass:
    </p>
    <pre>{`str.replace(/\\s+/g, " ").trim()`}</pre>

    <h2>Preserve line structure while collapsing intra-line runs</h2>
    <p>
      When you want clean lines but still want <em>lines</em>:
    </p>
    <pre>{`str
  .split(/\\r\\n|\\r|\\n/)
  .map(l =&gt; l.replace(/[^\\S\\n]+/g, " ").trim())
  .join("\\n")`}</pre>
    <p>
      <code>[^\\S\\n]</code> is &ldquo;whitespace that isn&rsquo;t a
      newline,&rdquo; a classic trick.
    </p>

    <h2>Non-breaking spaces</h2>
    <p>
      NBSP (U+00A0) is the villain of copy-paste workflows. It looks
      identical to a space in most fonts but:
    </p>
    <ul>
      <li>Doesn&rsquo;t match <code>/ /</code> regex (which matches literal space only)</li>
      <li>Doesn&rsquo;t break lines in HTML rendering</li>
      <li>Breaks naive <code>split(&rdquo; &rdquo;)</code> tokenization</li>
    </ul>
    <p>
      It <em>does</em> match <code>/\\s/</code>, which is why collapse-runs
      regex handles it transparently. If you want to preserve NBSP (for
      typographic reasons) and only collapse regular spaces, be explicit:
    </p>
    <pre>{`str.replace(/ +/g, " ")   // only ASCII space
str.replace(/\\s+/g, " ")  // all whitespace`}</pre>

    <h2>Tab-to-space conversion</h2>
    <p>
      Tabs render differently across editors and cause alignment chaos in
      mixed-indent code. Convert to N spaces:
    </p>
    <pre>{`str.replace(/\\t/g, "  ")   // 2 spaces
str.replace(/\\t/g, "    ") // 4 spaces`}</pre>
    <p>
      For column alignment (tab-expand), you need tab stops:
    </p>
    <pre>{`function expandTabs(str, tabSize = 4) {
  return str.split("\\n").map(line =&gt; {
    let out = "";
    for (const ch of line) {
      if (ch === "\\t") {
        const pad = tabSize - (out.length % tabSize);
        out += " ".repeat(pad);
      } else {
        out += ch;
      }
    }
    return out;
  }).join("\\n");
}`}</pre>

    <h2>Preserving code indentation</h2>
    <p>
      The one case where you <strong>must</strong> not collapse leading
      whitespace. Code has meaning in indent levels (Python especially,
      but also YAML, Makefile, and anything following line structure).
      Trim trailing whitespace, collapse runs <em>inside</em> non-indent
      regions only:
    </p>
    <pre>{`str.split("\\n").map(line =&gt; {
  const indent = line.match(/^[ \\t]*/)[0];
  const rest = line.slice(indent.length).replace(/[ \\t]+/g, " ").trimEnd();
  return indent + rest;
}).join("\\n");`}</pre>

    <h2>Trailing whitespace per line</h2>
    <p>
      The most universally safe cleanup: strip trailing whitespace on
      every line. Never breaks meaning, cleans up editor artifacts.
    </p>
    <pre>{`str.replace(/[ \\t]+$/gm, "")`}</pre>
    <p>
      The <code>m</code> flag makes <code>$</code> match at line breaks,
      not just end-of-string.
    </p>

    <h2>Blank-line collapse</h2>
    <p>
      Two or more blank lines becomes one:
    </p>
    <pre>{`str.replace(/\\n{3,}/g, "\\n\\n")`}</pre>
    <p>
      Three or more newlines means two or more blank lines (because one
      newline is the end of a line, not a blank line).
    </p>

    <h2>Full normalization pipeline</h2>
    <pre>{`function cleanWhitespace(s) {
  return s
    .replace(/\\r\\n?/g, "\\n")         // normalize line endings
    .replace(/[ \\t]+$/gm, "")         // trim trailing per line
    .replace(/\\n{3,}/g, "\\n\\n")      // collapse blank lines
    .split("\\n")
    .map(l =&gt; l.replace(/[ \\t]+/g, " ").trimStart() === ""
                ? ""
                : l)
    .join("\\n")
    .trim();
}`}</pre>

    <h2>Common mistakes</h2>
    <p>
      Using <code>/ /</code> to match spaces and missing NBSP. Collapsing
      leading whitespace in code. Stripping all whitespace from CSV
      fields and losing significant spaces in names. Forgetting to
      normalize line endings before regex, then missing matches on CRLF
      files. And stripping trailing whitespace on a file with
      significant-whitespace languages like Markdown, where two trailing
      spaces = <code>&lt;br&gt;</code>.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/whitespace-remover">Whitespace remover</a>
      <a href="/tools/line-break-remover">Line break remover</a>
      <a href="/tools/special-character-remover">Special character remover</a>
    </p>
  </>
);
