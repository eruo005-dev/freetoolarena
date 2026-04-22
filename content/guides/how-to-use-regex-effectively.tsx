import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Regex has a reputation for being unreadable, and most of the regex you see in the
      wild earns it. But the working subset is small — about ten building blocks cover
      90% of real-world matching. Learn those, build patterns from them, and stop
      copy-pasting 200-character monsters from Stack Overflow. This guide covers the
      building blocks, four worked examples you&rsquo;ll actually use, and the rule
      for when to stop writing regex and write a parser instead.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The ten building blocks</h2>
    <p>
      <code>.</code> matches any single character (except newline, usually).{" "}
      <code>*</code> is zero-or-more of the previous thing. <code>+</code> is
      one-or-more. <code>?</code> makes the previous thing optional (zero or one).
    </p>
    <p>
      <code>[abc]</code> is a character class — match any single char from the set.
      <code>[^abc]</code> is negated — match any char not in the set. Ranges work:
      <code>[a-z]</code>, <code>[0-9]</code>, <code>[A-Za-z0-9_]</code>.
    </p>
    <p>
      <code>^</code> anchors to start of line/string. <code>$</code> anchors to end.
      <code>\d</code> is a digit, <code>\w</code> is a word character (letter, digit,
      underscore), <code>\s</code> is whitespace. Capitalize any of them (<code>\D</code>,
      <code>\W</code>, <code>\S</code>) to invert.
    </p>
    <p>
      <code>()</code> creates a capture group — the matched text is saved and
      referenceable. <code>|</code> is alternation (&ldquo;or&rdquo;). That&rsquo;s it.
      Everything else is variations and flags on top of these ten.
    </p>

    <h2>Worked example: validating email</h2>
    <p>
      The realistic regex, not the perfect one:
    </p>
    <pre><code>{"^[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}$"}</code></pre>
    <p>
      One or more word characters, dots, plus, or hyphens, then <code>@</code>, then a
      domain, then a dot, then a TLD of 2+ letters. This rejects obvious junk and
      accepts real emails. The &ldquo;perfect&rdquo; RFC-5322 email regex is 6,000
      characters long and still wrong. Don&rsquo;t try. Use a light regex plus an
      actual confirmation email — that&rsquo;s the only real validation.
    </p>

    <h2>Worked example: finding all URLs</h2>
    <pre><code>{"https?:\\/\\/[\\w.-]+(?:\\/[\\w\\/.%?=&#-]*)?"}</code></pre>
    <p>
      <code>https?</code> matches <code>http</code> or <code>https</code>. Then
      <code>:\/\/</code>, then the host (word chars, dots, hyphens), then an optional
      path. The <code>(?:...)</code> is a non-capturing group — useful when you want to
      group for the <code>?</code> but don&rsquo;t need the captured text. Good enough
      for scraping URLs out of chat logs, emails, and docs. Not good enough for parsing
      real URLs where you care about query strings — use a URL library for that.
    </p>

    <h2>Worked example: extracting phone numbers</h2>
    <pre><code>{"\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}"}</code></pre>
    <p>
      An optional open paren, three digits, optional close paren, optional separator
      (hyphen, dot, space), three digits, separator, four digits. Catches (555)
      123-4567, 555.123.4567, 555 123 4567, and 5551234567. Doesn&rsquo;t handle
      country codes or international formats — if you need those, branch on the input
      before choosing a regex, or use a library like <code>libphonenumber</code>.
    </p>

    <h2>Worked example: replacing with backreferences</h2>
    <p>
      Capture groups are referenceable in the replacement string as <code>$1</code>,
      <code>$2</code>, etc. (or <code>\1</code>, <code>\2</code> in some flavors). Say
      you have a list of &ldquo;Last, First&rdquo; and want &ldquo;First Last&rdquo;:
    </p>
    <pre><code>{"Match: ^(\\w+), (\\w+)$\nReplace: $2 $1"}</code></pre>
    <p>
      &ldquo;Smith, John&rdquo; becomes &ldquo;John Smith.&rdquo; This is where regex
      actually shines — bulk text transformations that would take hours by hand. Test
      the pattern on a few inputs first, then run the replacement. Sanity check with a
      diff tool like <a href="/tools/diff-checker">our diff checker</a> before
      committing the result to a real file.
    </p>

    <h2>The 40-character rule</h2>
    <p>
      If your regex is pushing 40 characters, you&rsquo;re probably solving the wrong
      problem. Real parsers (CSV, JSON, HTML, programming languages) have nested
      structure, escape sequences, and edge cases that regex cannot express cleanly —
      HTML famously can&rsquo;t be parsed with regex at all because tags can nest
      arbitrarily.
    </p>
    <p>
      When you hit the 40-character mark, stop and ask: is there a library for this?
      Almost always, yes. <code>csv.reader</code>, <code>JSON.parse</code>, a URL
      parser, an HTML parser. Regex is for small, flat, line-oriented patterns. For
      structure, use a parser.
    </p>

    <h2>Iteration workflow</h2>
    <p>
      Write regex incrementally in a tester — never blind, never in production code.
      Paste sample input, build the pattern one block at a time, watch matches
      highlight live. <a href="/tools/regex-tester">Our regex tester</a> is the loop:
      paste input, try a pattern, see what matches, refine. Add test cases as you find
      edge cases. When it matches everything you want and nothing you don&rsquo;t,
      copy it into your code. Five minutes of testing beats two hours of debugging a
      regex in production.
    </p>
  </>
);
