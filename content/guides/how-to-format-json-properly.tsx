export const intro = (
  <>
    <p>
      JSON looks simple until you open a 4,000-line minified file with a single trailing comma
      somewhere inside it and spend an hour finding the error. Formatting JSON properly is half
      aesthetics and half survival: consistent indentation, valid syntax, and sane key ordering
      make the difference between a file you can debug in minutes and one that kills your
      afternoon.
    </p>
    <p>
      This guide covers the rules of valid JSON, the conventions that keep files maintainable,
      and the tools that will format, validate, and diff it for you so you never have to
      hand-align braces again.
    </p>
  </>
);

export const body = (
  <>
    <h2>The rules that are non-negotiable</h2>
    <p>
      JSON is strict. Keys must be double-quoted strings. Strings must use double quotes, never
      single. No trailing commas — after the last item in an array or object, the comma is
      illegal. No comments (despite what JSON5 or JSONC might let you write). No unquoted keys.
      No undefined. These aren&rsquo;t style rules; breaking any of them makes the file unparseable.
    </p>

    <h2>Pick two or four spaces and stick with it</h2>
    <p>
      JSON doesn&rsquo;t have an official indentation rule. Two spaces is compact and good for
      configs; four spaces is more readable for deeply nested data. Tabs work but render
      inconsistently across editors. The golden rule: whatever you pick, apply it everywhere in
      the file. Mixed indentation is how you end up reviewing pull requests where half the diff
      is whitespace.
    </p>

    <h2>Format once, automate forever</h2>
    <p>
      Hand-formatting JSON is a waste of time. Paste it into our{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to get pretty-printed output with your
      chosen indent. In editors, Prettier or VS Code&rsquo;s built-in JSON formatter does the
      same on save. For API responses in the browser, a JSON viewer extension formats them
      automatically.
    </p>

    <h2>Validate before you ship</h2>
    <p>
      Invalid JSON breaks silently. An API endpoint returning malformed JSON to a client throws
      a parse error with no useful line number. Validate anything you don&rsquo;t control:
      config files loaded at startup, data from third-party APIs, fixtures in tests. The JSON
      formatter above flags the first invalid token and tells you which line to fix.
    </p>

    <h2>Sort keys when diffing</h2>
    <p>
      If you check JSON into git, sorted keys make diffs readable. Two identical objects with
      keys in different order look completely different to <code>git diff</code>. Most formatters
      have a &ldquo;sort keys alphabetically&rdquo; option; turn it on for config files and
      schema definitions. For our site, run the file through our{" "}
      <a href="/tools/json-diff-checker">JSON diff checker</a> to see only the real changes
      regardless of key order.
    </p>

    <h2>Minify for production, pretty-print for humans</h2>
    <p>
      Pretty-printed JSON has lots of whitespace — great for reading, wasteful for network
      transfer. API responses and bundled configs should be minified in production, and
      pretty-printed only when you open them in an editor. Build tools handle this automatically,
      but if you&rsquo;re shipping JSON by hand, minify the one that goes to the wire.
    </p>

    <h2>Watch data types carefully</h2>
    <p>
      <code>42</code> is a number; <code>&quot;42&quot;</code> is a string — they are not
      interchangeable. <code>true</code>, <code>false</code>, and <code>null</code> are lowercase
      only. Dates are always strings (JSON has no date type) — the convention is ISO 8601
      (&ldquo;2026-04-22T10:30:00Z&rdquo;). Large integers can lose precision in JavaScript —
      above 2^53, send them as strings.
    </p>

    <h2>Prefer arrays over numbered keys</h2>
    <p>
      An anti-pattern: <code>&#123; &quot;item1&quot;: ..., &quot;item2&quot;: ... &#125;</code>.
      Use an array: <code>&#123; &quot;items&quot;: [...] &#125;</code>. Arrays preserve order,
      iterate cleanly, and don&rsquo;t require parsing integers out of keys. Only use object keys
      when the key has real meaning (user ID, region code, etc.).
    </p>

    <h2>Handle nested data without pain</h2>
    <p>
      Deeply nested JSON — three or four levels — becomes unreadable fast. If you&rsquo;re
      designing your own schema, flatten where possible. For third-party data you can&rsquo;t
      control, use the JSON formatter&rsquo;s collapse controls to fold branches you don&rsquo;t
      care about.
    </p>

    <h2>JSON vs YAML vs TOML</h2>
    <p>
      JSON is the default for APIs and programmatic data. YAML is easier for humans to write but
      has its own pitfalls (significant whitespace, the Norway problem). TOML is simple for
      configs. If you need to move between formats, our{" "}
      <a href="/tools/yaml-json-converter">YAML / JSON converter</a> handles the common case.
    </p>

    <h2>Common mistakes and how to avoid them</h2>
    <p>
      Copy-pasting JSON from documentation that uses smart quotes — they look like quotes but
      aren&rsquo;t. Forgetting to escape backslashes in Windows paths (<code>&quot;C:\\Users\\me&quot;</code>,
      not <code>&quot;C:\Users\me&quot;</code>). Including BOMs (byte-order marks) in UTF-8 JSON
      files — some parsers choke on them. Editing JSON in a word processor that auto-converts
      quotes. Solution: use a code editor, and validate before you ship.
    </p>

    <p>
      Related: <a href="/guides/what-is-schema-markup">what is schema markup</a>,{" "}
      <a href="/guides/how-to-use-regex-effectively">how to use regex effectively</a>, and{" "}
      <a href="/guides/what-is-an-api">what is an API</a> for the full picture of where JSON
      shows up in modern development.
    </p>
  </>
);
