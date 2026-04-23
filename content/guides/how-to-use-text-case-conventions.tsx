import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      camelCase, PascalCase, snake_case, kebab-case, SCREAMING_CASE,
      Title Case — and they&rsquo;re not interchangeable. Mixing them
      in a single codebase looks amateur; picking the wrong one for
      a URL or an environment variable breaks things silently. This
      guide covers each case convention, where it&rsquo;s standard,
      the reasoning behind each choice, the edge cases (acronyms,
      numbers, leading underscores), and the style-guide rules that
      top-tier codebases follow.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The six cases you&rsquo;ll use</h2>
    <p>
      <strong>camelCase:</strong> first word lowercase, subsequent
      words capitalized. <code>userName</code>, <code>getUserById</code>.
      JavaScript, Java, Kotlin, Swift variables and functions.
    </p>
    <p>
      <strong>PascalCase</strong> (aka UpperCamelCase): every word
      capitalized. <code>UserAccount</code>, <code>HttpRequest</code>.
      Class names, types, React components, Go exported identifiers.
    </p>
    <p>
      <strong>snake_case:</strong> lowercase words joined by
      underscores. <code>user_name</code>, <code>get_user_by_id</code>.
      Python, Ruby, Rust variables; PostgreSQL and most SQL database
      schemas.
    </p>
    <p>
      <strong>SCREAMING_SNAKE_CASE:</strong> uppercase with
      underscores. <code>MAX_RETRIES</code>, <code>API_KEY</code>.
      Constants and environment variables in almost every language.
    </p>
    <p>
      <strong>kebab-case</strong> (aka lisp-case or dash-case):
      lowercase with dashes. <code>user-name</code>, <code>my-app-
      config</code>. URLs, CSS class names, HTML attributes, CLI
      flags.
    </p>
    <p>
      <strong>Title Case:</strong> each major word capitalized with
      spaces. <code>The Quick Brown Fox</code>. Article titles,
      headings, book names, UI labels.
    </p>

    <h2>Matching case to context</h2>
    <p>
      <strong>JavaScript / TypeScript:</strong>
    </p>
    <p>
      camelCase for variables, functions, methods. PascalCase for
      classes, types, components, interfaces. SCREAMING_SNAKE_CASE
      for constants. kebab-case for file names (usually), though
      PascalCase for React component files is also common.
    </p>
    <p>
      <strong>Python:</strong>
    </p>
    <p>
      snake_case for variables, functions, modules. PascalCase for
      classes. SCREAMING_SNAKE_CASE for module-level constants.
      Leading underscore (<code>_private</code>) signals internal use;
      double leading underscore (<code>__dunder</code>) triggers name
      mangling in classes.
    </p>
    <p>
      <strong>Go:</strong>
    </p>
    <p>
      camelCase for unexported. PascalCase for exported (public).
      Visibility encoded in case — the language enforces it, so
      convention isn&rsquo;t optional.
    </p>
    <p>
      <strong>Ruby:</strong>
    </p>
    <p>
      snake_case for variables and methods. PascalCase for classes
      and modules. SCREAMING_SNAKE_CASE for constants (Ruby
      enforces — start with a capital letter = constant).
    </p>
    <p>
      <strong>Rust:</strong>
    </p>
    <p>
      snake_case for variables and functions. PascalCase for types,
      traits, and enums. SCREAMING_SNAKE_CASE for constants and
      statics.
    </p>
    <p>
      <strong>SQL (most dialects):</strong>
    </p>
    <p>
      snake_case for tables, columns, indexes. Identifiers are
      case-insensitive but conventions matter: <code>user_profiles</code>,
      <code> created_at</code>.
    </p>
    <p>
      <strong>CSS:</strong>
    </p>
    <p>
      kebab-case for class names and custom properties.
      <code> .nav-item</code>, <code>--text-color</code>. HTML
      attributes same rule: <code>data-user-id</code>.
    </p>
    <p>
      <strong>URLs:</strong>
    </p>
    <p>
      kebab-case for paths and slugs. <code>/blog/how-to-use-css-gradients</code>,
      not <code>/blog/how_to_use_css_gradients</code>. Google
      confirmed dashes are preferred over underscores for
      word separators.
    </p>
    <p>
      <strong>File names:</strong>
    </p>
    <p>
      kebab-case is safest (cross-platform, no escaping, URL-safe).
      Exceptions: React component files (<code>UserCard.jsx</code>),
      Python modules (<code>user_service.py</code>).
    </p>
    <p>
      <strong>Environment variables:</strong>
    </p>
    <p>
      SCREAMING_SNAKE_CASE. <code>DATABASE_URL</code>,
      <code> NODE_ENV</code>. Universal across shells, CI systems,
      container orchestrators.
    </p>

    <h2>Acronyms — the hardest edge case</h2>
    <p>
      How do you write &ldquo;HTTP server&rdquo; in camelCase?
    </p>
    <p>
      <strong>Standard (Google, Microsoft, Go):</strong> acronyms
      stay capitalized. <code>HTTPServer</code>, <code>parseXMLFile</code>.
      Treats the acronym as one unit.
    </p>
    <p>
      <strong>Alternative (Java, older Microsoft):</strong> treat
      acronyms as words. <code>HttpServer</code>, <code>parseXmlFile</code>.
      Easier to parse visually; avoids ambiguity in subclasses
      (<code>HttpServerFactory</code> vs <code>HTTPServerFactory</code>).
    </p>
    <p>
      <strong>In 2026 practice:</strong> the &ldquo;treat acronyms as
      words&rdquo; style (<code>HttpServer</code>) has mostly won,
      especially in new TypeScript and JavaScript codebases. Go still
      holds to all-caps acronyms as part of its style spec.
    </p>
    <p>
      Pick one, document it, enforce it. Don&rsquo;t mix
      <code> HTTPClient</code> and <code>XmlParser</code> in the same
      file.
    </p>

    <h2>Numbers in identifiers</h2>
    <p>
      Numbers attach to the adjacent word, typically without a
      separator: <code>parseH264Stream</code>, <code>connectIPv6</code>.
    </p>
    <p>
      In snake_case: <code>parse_h264_stream</code>, <code>connect_ipv6</code>.
      Number stays adjacent; separator still present around words.
    </p>
    <p>
      <strong>Leading digits are invalid in most languages.</strong>
      <code>1stPlace</code> → either <code>firstPlace</code> or
      <code>placeOne</code>.
    </p>

    <h2>Title Case rules</h2>
    <p>
      For headlines and display text, Title Case isn&rsquo;t just
      &ldquo;capitalize every word.&rdquo; Conventions exist:
    </p>
    <p>
      <strong>APA style:</strong> capitalize first and last words;
      capitalize all major words (nouns, verbs, adjectives,
      adverbs); lowercase articles (a, an, the), short prepositions
      (of, in, for), and conjunctions (and, but, or). &ldquo;How to
      Choose a Color Palette for a Website.&rdquo;
    </p>
    <p>
      <strong>Chicago style:</strong> similar but capitalizes
      prepositions 4+ letters (about, after, above).
    </p>
    <p>
      <strong>Sentence case:</strong> only the first word
      capitalized, plus proper nouns. &ldquo;How to choose a color
      palette for a website.&rdquo; Popular on modern product UIs
      (Slack, Stripe, GitHub).
    </p>
    <p>
      <strong>ALL CAPS:</strong> shouting. Useful for very short
      labels and notices; painful at paragraph length (reduces
      reading speed ~15-20%).
    </p>

    <h2>Converting between cases programmatically</h2>
    <p>
      When you need to convert programmatically, most languages
      have libraries or quick regex approaches:
    </p>
    <p>
      <strong>camelCase → snake_case:</strong> replace capital
      letters with underscore + lowercase. <code>someText.replace(/
      ([A-Z])/g, &quot;_$1&quot;).toLowerCase()</code>.
    </p>
    <p>
      <strong>snake_case → camelCase:</strong> replace underscore +
      letter with capital letter. <code>someText.replace(/_([a-z])/g,
      (_, c) =&gt; c.toUpperCase())</code>.
    </p>
    <p>
      <strong>Libraries:</strong> lodash has <code>_.camelCase</code>,
      <code> _.snakeCase</code>, <code>_.kebabCase</code>, <code>
      _.startCase</code>. Python has <code>inflection</code>. Ruby
      has these built into ActiveSupport.
    </p>

    <h2>Style guides worth reading</h2>
    <p>
      <strong>Google:</strong> language-specific style guides for
      JavaScript, Python, Java, Go, C++, Shell.
    </p>
    <p>
      <strong>Airbnb JavaScript style guide:</strong> industry-standard
      for modern JS. Details case rules per identifier type.
    </p>
    <p>
      <strong>PEP 8:</strong> the Python naming convention bible.
    </p>
    <p>
      <strong>Effective Go:</strong> official Go case and naming
      conventions.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Mixing conventions in a single codebase.</strong> A
      Python project with camelCase functions alongside snake_case
      ones is a code smell that broadcasts confusion.
    </p>
    <p>
      <strong>Using snake_case in URLs.</strong> Dashes are SEO-
      safer. Underscores look like spaces were there and broke;
      search engines treat hyphens as word separators.
    </p>
    <p>
      <strong>Casing database column names that match API field
      names.</strong> Database is snake_case; API is typically
      camelCase. Either transform at the boundary or accept the
      mismatch — don&rsquo;t half-do one.
    </p>
    <p>
      <strong>Over-capitalizing Title Case.</strong> &ldquo;The How
      Of&rdquo; looks wrong because <code>Of</code> shouldn&rsquo;t
      be capitalized in most styles.
    </p>
    <p>
      <strong>Inconsistent acronym handling.</strong> Pick
      &ldquo;Http&rdquo; or &ldquo;HTTP&rdquo; and stick with it
      across the whole project.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert text between all common cases instantly with the{" "}
      <a href="/tools/case-converter">case converter</a>. Pair with
      the{" "}
      <a href="/tools/slug-generator">slug generator</a> to produce
      URL-safe kebab-case from titles, and the{" "}
      <a href="/tools/text-diff">text diff</a> to compare
      before/after when renaming identifiers across a file.
    </p>
  </>
);
