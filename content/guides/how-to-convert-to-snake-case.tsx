import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      snake_case is the naming convention that uses lowercase words
      joined by underscores. It&rsquo;s the default for Python functions
      and variables, Ruby methods, database column names, Rust local
      variables, and most config files. Converting from other case
      styles &mdash; PascalCase, camelCase, kebab-case, Title Case with
      Spaces &mdash; looks like a one-line regex until you hit acronyms
      (HTMLParser &rarr; html_parser? or h_t_m_l_parser?), numbers
      embedded in identifiers, and the SCREAMING_SNAKE variant used for
      constants. This guide covers the canonical conversion rules, how
      each language&rsquo;s community treats edge cases, and the regex
      patterns that produce consistent results.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The four snake variants</h2>
    <ul>
      <li><strong>snake_case</strong> &mdash; standard lowercase, for names</li>
      <li><strong>SCREAMING_SNAKE_CASE</strong> &mdash; uppercase, for constants</li>
      <li><strong>Title_Snake_Case</strong> &mdash; rare, sometimes HTTP header-style</li>
      <li><strong>camel_Snake_Case</strong> &mdash; very rare, hybrid</li>
    </ul>

    <h2>From camelCase and PascalCase</h2>
    <p>
      The canonical rule: insert an underscore before any uppercase
      letter preceded by a lowercase letter, then lowercase the whole
      thing.
    </p>
    <pre>{`str.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()

"camelCase"       -&gt; "camel_case"
"PascalCase"      -&gt; "pascal_case"
"getXMLParser"    -&gt; "get_xml_parser"  ??  (see next section)`}</pre>

    <h2>The acronym problem</h2>
    <p>
      &ldquo;HTMLParser&rdquo; is a single concept but three capitals in
      a row. The naive regex turns it into &ldquo;htmlparser&rdquo;
      (missing the word break) or &ldquo;h_t_m_l_parser&rdquo; (too
      aggressive). The canonical fix inserts underscores at two
      boundaries:
    </p>
    <ul>
      <li>Lowercase &rarr; uppercase: &ldquo;a&rdquo; &rarr; &ldquo;A&rdquo;</li>
      <li>Uppercase + uppercase-then-lowercase: &ldquo;AB&rdquo; + &ldquo;c&rdquo; at the split</li>
    </ul>
    <pre>{`function toSnake(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
}

toSnake("HTMLParser")      // "html_parser"
toSnake("getHTTPResponse") // "get_http_response"
toSnake("APIKey")          // "api_key"
toSnake("iOSVersion")      // "i_os_version"  (edge case!)`}</pre>
    <p>
      The &ldquo;iOSVersion&rdquo; case shows the limit: there&rsquo;s no
      dictionary-free way to know &ldquo;iOS&rdquo; is one acronym. Most
      codebases work around it by writing <em>IOSVersion</em> or
      <em>iOsVersion</em> in source.
    </p>

    <h2>From kebab-case</h2>
    <p>
      Trivial substitution:
    </p>
    <pre>{`str.replace(/-/g, "_").toLowerCase()

"my-variable-name" -&gt; "my_variable_name"`}</pre>

    <h2>From Title Case or space-separated</h2>
    <pre>{`str.replace(/\\s+/g, "_").toLowerCase()

"Get User Name" -&gt; "get_user_name"`}</pre>
    <p>
      Strip punctuation first for robustness:
    </p>
    <pre>{`str
  .replace(/[^\\p{L}\\p{N}\\s]/gu, "")
  .replace(/\\s+/g, "_")
  .toLowerCase()`}</pre>

    <h2>Numbers in identifiers</h2>
    <p>
      Language communities disagree on how to handle digits next to
      letters:
    </p>
    <ul>
      <li><code>user2FA</code> &rarr; <code>user_2_f_a</code>? <code>user_2fa</code>? <code>user2_fa</code>?</li>
      <li><code>version2</code> &rarr; <code>version_2</code> or <code>version2</code>?</li>
    </ul>
    <p>
      Python&rsquo;s <code>inflection</code> library uses
      <code>user_2fa</code> and <code>version_2</code>. Rails uses the
      same rule. Go prefers <code>user2fa</code> with no underscore
      before digits. Pick one and stay consistent.
    </p>

    <h2>SCREAMING_SNAKE_CASE for constants</h2>
    <p>
      Convert snake_case to screaming by uppercasing:
    </p>
    <pre>{`"max_retry_count".toUpperCase()
// -&gt; "MAX_RETRY_COUNT"`}</pre>
    <p>
      Python, Ruby, JavaScript, Rust, and most C-family languages use
      SCREAMING_SNAKE for compile-time constants and environment
      variables. <code>API_KEY</code>, <code>MAX_CONNECTIONS</code>,
      <code>DEFAULT_TIMEOUT_MS</code>.
    </p>

    <h2>Language conventions</h2>
    <ul>
      <li>
        <strong>Python</strong> (PEP 8) &mdash; snake_case for
        functions and variables, PascalCase for classes,
        SCREAMING_SNAKE for module-level constants.
      </li>
      <li>
        <strong>Ruby</strong> &mdash; snake_case for methods and
        variables, PascalCase for classes and modules,
        SCREAMING_SNAKE for constants.
      </li>
      <li>
        <strong>Rust</strong> &mdash; snake_case for variables,
        functions, modules; PascalCase for types; SCREAMING_SNAKE for
        constants and statics.
      </li>
      <li>
        <strong>PHP</strong> &mdash; snake_case was the historic
        convention; modern PHP (PSR-1) prefers camelCase for methods.
      </li>
      <li>
        <strong>SQL</strong> &mdash; column names almost universally
        snake_case. PascalCase and camelCase in column names cause
        quoting headaches in PostgreSQL especially.
      </li>
    </ul>

    <h2>Database column naming</h2>
    <p>
      Almost all ORMs expect snake_case column names and auto-map them
      to camelCase or PascalCase fields in application code. Rails
      <code>first_name</code> column &lt;-&gt; Ruby <code>first_name</code>
      attribute. ActiveRecord and SQLAlchemy both do this conversion
      automatically; mess up the DB casing and you&rsquo;ll fight the
      ORM all day.
    </p>

    <h2>Environment variables</h2>
    <p>
      Conventionally SCREAMING_SNAKE: <code>DATABASE_URL</code>,
      <code>NODE_ENV</code>, <code>API_KEY</code>. POSIX shells treat
      variable names as identifiers, so underscores and digits are
      fine; hyphens are not.
    </p>

    <h2>Round-trip considerations</h2>
    <p>
      snake_case &rarr; camelCase &rarr; snake_case usually round-trips
      cleanly <em>if</em> you avoid acronyms and digit edge cases.
      Breaking examples:
    </p>
    <pre>{`"html_parser"  -&gt; "htmlParser"  -&gt; "html_parser"   OK
"user_2fa"     -&gt; "user2Fa"     -&gt; "user_2_fa"    NOT OK
"io_s_version" -&gt; "ioSVersion"  -&gt; "io_s_version"  OK
"api_key"      -&gt; "apiKey"      -&gt; "api_key"       OK`}</pre>

    <h2>Leading-underscore conventions</h2>
    <p>
      Python uses <code>_private</code> for module-internal names and
      <code>__dunder__</code> for special protocol methods. JavaScript
      conventionally prefixes private fields with underscore even
      though the language has real private syntax now. Preserve
      leading underscores in conversion:
    </p>
    <pre>{`function toSnakePreservePrefix(s) {
  const leading = s.match(/^_+/)?.[0] ?? "";
  const rest = s.slice(leading.length);
  return leading + toSnake(rest);
}`}</pre>

    <h2>Common mistakes</h2>
    <p>
      Using one regex pass and getting &ldquo;HTMLParser&rdquo; wrong.
      Mixing snake and camel in the same codebase because you
      copy-pasted from sources with different conventions. Using
      SCREAMING_SNAKE for long identifiers and making them unreadable
      (a constant named <code>MAX_ALLOWED_RETRY_COUNT_BEFORE_FAIL</code>
      is a code smell, not a convention win). Converting database
      columns to camelCase and creating quoting headaches in Postgres.
      And forgetting that acronyms are the forever edge case &mdash;
      pick your rule and document it.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/snake-case-converter">Snake case converter</a>
      <a href="/tools/kebab-case-converter">Kebab case converter</a>
      <a href="/tools/case-converter">Case converter</a>
    </p>
  </>
);
