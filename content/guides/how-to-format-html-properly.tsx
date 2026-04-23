import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      HTML formatting sits at the intersection of developer ergonomics
      and runtime reality. Well-formatted HTML is easier to read,
      easier to diff in code review, and easier to debug in
      DevTools — but strict formatting rules also matter for SSR
      hydration, SEO parsers, and the brittle middle ground where
      whitespace becomes visible space. This guide covers HTML
      syntax basics, what formatters do and don&rsquo;t fix, the
      specific rules that matter (void elements, boolean attributes,
      whitespace-sensitive tags), tooling (Prettier, HTMLHint,
      hand-rolled), and the subtle differences between formatting
      template HTML versus output HTML.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What &ldquo;formatting&rdquo; actually covers</h2>
    <p>
      HTML formatting is the style layer: indentation, attribute
      wrapping, quote consistency, blank lines, closing slashes.
      It&rsquo;s separate from:
    </p>
    <p>
      <strong>Validation</strong> — is the HTML actually valid per
      spec? Formatters mostly don&rsquo;t check this.
    </p>
    <p>
      <strong>Linting</strong> — does it follow best practices? Use
      HTMLHint, eslint-plugin-html.
    </p>
    <p>
      <strong>Accessibility</strong> — does it have proper semantics?
      Use axe-core or eslint-plugin-jsx-a11y.
    </p>
    <p>
      Formatting is cosmetic. The browser ignores most of it. But
      developers read HTML thousands of times and messy HTML slows
      down every edit.
    </p>

    <h2>Indentation rules</h2>
    <p>
      <strong>Standard:</strong> 2 spaces per nesting level.
      Prettier defaults to 2, most style guides agree. 4 spaces and
      tabs both work; pick one and enforce it.
    </p>
    <p>
      <strong>Nest children:</strong> each child element gets one
      more indent. Attributes on long lines wrap one per line,
      aligned to the first attribute or indented from the tag.
    </p>
    <p>
      <strong>Closing tags:</strong> match the opening tag&rsquo;s
      indent. Never &ldquo;dangle&rdquo; closing tags weirdly mid-line
      unless they&rsquo;re inline elements inside text.
    </p>
    <p>
      <strong>Inline vs block:</strong>{" "}
      <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>,{" "}
      <code>&lt;a&gt;</code>, <code>&lt;code&gt;</code> stay on the
      same line as their text. Putting them on their own line
      introduces whitespace that changes rendering.
    </p>

    <h2>Void elements — no closing tag needed</h2>
    <p>
      These HTML5 elements never have content:{" "}
      <code>&lt;area&gt;</code>, <code>&lt;base&gt;</code>,{" "}
      <code>&lt;br&gt;</code>, <code>&lt;col&gt;</code>,{" "}
      <code>&lt;embed&gt;</code>, <code>&lt;hr&gt;</code>,{" "}
      <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>,{" "}
      <code>&lt;link&gt;</code>, <code>&lt;meta&gt;</code>,{" "}
      <code>&lt;source&gt;</code>, <code>&lt;track&gt;</code>,{" "}
      <code>&lt;wbr&gt;</code>.
    </p>
    <p>
      HTML5 allows <code>&lt;br&gt;</code> or{" "}
      <code>&lt;br/&gt;</code>. XHTML required the self-close slash.
      Pick one style, enforce it.
    </p>
    <p>
      Prettier removes the slash by default for HTML; keeps it for
      JSX (because JSX requires it).
    </p>

    <h2>Attribute style</h2>
    <p>
      <strong>Quotes:</strong> double quotes are standard. Single
      quotes parse but look foreign. Prettier enforces double by
      default.
    </p>
    <p>
      <strong>Boolean attributes:</strong>{" "}
      <code>&lt;input required&gt;</code> is equivalent to{" "}
      <code>&lt;input required=&quot;&quot;&gt;</code> or{" "}
      <code>&lt;input required=&quot;required&quot;&gt;</code>. Short
      form is preferred.
    </p>
    <p>
      <strong>Attribute wrapping:</strong> once an element has 3+
      attributes or one is long, wrap to one-per-line. Keeps diffs
      surgical when you change a single attribute.
    </p>
    <p>
      <strong>Order:</strong> loose convention is{" "}
      <code>class</code>, <code>id</code>, <code>data-*</code>,
      then everything else. Prettier doesn&rsquo;t enforce order.
    </p>

    <h2>Whitespace-sensitive tags</h2>
    <p>
      Most HTML ignores whitespace, but these tags don&rsquo;t:
    </p>
    <p>
      <strong>&lt;pre&gt;:</strong> preserves all whitespace. Code
      blocks, ASCII art, poetry. Formatters must not reformat
      inside <code>&lt;pre&gt;</code>.
    </p>
    <p>
      <strong>&lt;textarea&gt;:</strong> preserves whitespace in its
      initial content. Common gotcha — indenting HTML around a{" "}
      <code>&lt;textarea&gt;</code> puts that indentation in the
      user&rsquo;s input.
    </p>
    <p>
      <strong>&lt;code&gt; inside &lt;pre&gt;:</strong> the{" "}
      <code>&lt;pre&gt;&lt;code&gt;</code> pattern for code blocks —
      the <code>&lt;pre&gt;</code> preserves whitespace, the{" "}
      <code>&lt;code&gt;</code> gives semantic meaning. Must be on
      the same line as their content.
    </p>
    <p>
      <strong>Inline elements:</strong>{" "}
      <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, etc. between
      text — the space between them is rendered. Breaking to a new
      line with indentation introduces extra whitespace you can
      see.
    </p>

    <h2>Template HTML vs output HTML</h2>
    <p>
      Template engines (EJS, Jinja, Blade, Svelte, JSX) let you
      format for readability, then output compressed HTML. Two
      different optimization targets:
    </p>
    <p>
      <strong>Source (readable):</strong> indented, commented,
      separated into sections. Formatters apply here.
    </p>
    <p>
      <strong>Output (byte-efficient):</strong> minified, no
      whitespace, no comments. Build tools handle this.
    </p>
    <p>
      Never hand-minify source HTML. Modern bundlers (Vite, Webpack,
      Next.js) minify output automatically in production.
    </p>

    <h2>Semantic ordering</h2>
    <p>
      Beyond formatting, HTML has a structural order that matters:
    </p>
    <p>
      <strong>Heading hierarchy:</strong> one{" "}
      <code>&lt;h1&gt;</code> per page; don&rsquo;t skip levels
      (<code>h2 → h4</code> without <code>h3</code>). Affects
      accessibility and SEO.
    </p>
    <p>
      <strong>Document structure:</strong>{" "}
      <code>&lt;header&gt; → &lt;main&gt; → &lt;footer&gt;</code>
      {" "}with <code>&lt;nav&gt;</code>, <code>&lt;article&gt;</code>,
      and <code>&lt;section&gt;</code> inside. Avoid divs-all-the-way
      where a semantic tag exists.
    </p>
    <p>
      <strong>Head element order:</strong>{" "}
      <code>&lt;meta charset&gt;</code> before anything else,
      viewport next, then <code>title</code>, then CSS, then
      scripts. Order matters for parsing performance.
    </p>

    <h2>Prettier, HTMLHint, and friends</h2>
    <p>
      <strong>Prettier:</strong> the modern default formatter. Opinionated,
      minimal config. Integrates with editor save hooks. Handles
      HTML, CSS, JS, JSX, Vue, Svelte. Can&rsquo;t fix everything
      (wrapping rules and comment placement have quirks).
    </p>
    <p>
      <strong>HTMLHint:</strong> linter, not formatter. Catches
      unclosed tags, duplicate IDs, missing alt text, invalid
      attributes. Run alongside Prettier, not instead.
    </p>
    <p>
      <strong>js-beautify:</strong> older formatter, still used.
      More configuration, less opinionated than Prettier.
    </p>
    <p>
      <strong>Tidy (HTML Tidy):</strong> decades-old C utility.
      Cleans up broken HTML, useful for fixing legacy CMS output.
      Rarely used in modern codebases.
    </p>

    <h2>CSS inside HTML</h2>
    <p>
      <code>&lt;style&gt;</code> blocks should be formatted as
      standalone CSS (same indentation, selectors on own lines,
      one declaration per line). Prettier handles this.
    </p>
    <p>
      Inline styles (<code>style=&quot;...&quot;</code>) break
      around at ~80 chars. Complex inline styles are a code smell —
      consider extracting to a class.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Hand-formatting HTML in 2026.</strong> Use a formatter.
      Every minute you spend aligning attributes is wasted.
    </p>
    <p>
      <strong>Formatting HTML inside strings.</strong> Concatenating
      HTML strings in JavaScript disables all formatting and opens
      XSS holes. Use a templating system or JSX.
    </p>
    <p>
      <strong>Over-indenting.</strong> Every level of nesting costs
      horizontal screen. Deep nesting is usually a sign the markup
      can flatten.
    </p>
    <p>
      <strong>Formatting &lt;pre&gt; content.</strong> Formatter
      reformats code inside <code>&lt;pre&gt;</code>, breaking it.
      Most formatters respect <code>&lt;pre&gt;</code> and{" "}
      <code>&lt;textarea&gt;</code> but check your config.
    </p>
    <p>
      <strong>Treating HTML like XML.</strong> HTML5 is not XML.
      It&rsquo;s more lenient (missing closing tags often okay) and
      less lenient (some elements can&rsquo;t self-close). Use an
      HTML-aware formatter, not a generic XML one.
    </p>
    <p>
      <strong>Ignoring encoding.</strong> Save as UTF-8 without BOM.
      Declare charset first thing in <code>&lt;head&gt;</code>.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Format HTML instantly with the{" "}
      <a href="/tools/html-formatter">HTML formatter</a>. Pair with
      the <a href="/tools/html-to-markdown">HTML to markdown converter</a>
      {" "}when extracting content from pages, and the{" "}
      <a href="/tools/xml-formatter">XML formatter</a> when the
      document turns out to be XHTML or XML-shaped.
    </p>
  </>
);
