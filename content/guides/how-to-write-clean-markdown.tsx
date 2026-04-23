import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Markdown is the lingua franca of developer writing: READMEs,
      commit bodies, GitHub issues, docs sites, Obsidian notes,
      Notion pages, Substack, chat apps. It&rsquo;s easy to write
      and hard to write well. Clean markdown renders consistently
      across platforms, diffs cleanly in git, and stays maintainable
      as it grows. Messy markdown breaks renderers, hides bugs in
      nested lists, and turns documents into git-diff nightmares.
      This guide covers the syntax (including the edge cases),
      flavor differences (CommonMark vs GFM vs others), style
      conventions, linting tools, and the patterns that separate
      readable markdown from the kind that works on your machine
      and nobody else&rsquo;s.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Markdown flavors — what actually works</h2>
    <p>
      <strong>CommonMark:</strong> the standardized spec. Defines
      exactly what the core syntax means. Reference implementation
      for &ldquo;portable&rdquo; markdown.
    </p>
    <p>
      <strong>GitHub Flavored Markdown (GFM):</strong> CommonMark +
      tables, strikethrough, task lists, autolinks, fenced code with
      language hints. What most developers actually write. Supported
      by GitHub, GitLab, many docs generators.
    </p>
    <p>
      <strong>MDX:</strong> markdown + JSX components. Used by
      Next.js docs, Docusaurus, many modern docs sites. Breaks
      portability — MDX files don&rsquo;t render on GitHub.
    </p>
    <p>
      <strong>Pandoc markdown:</strong> very extended — footnotes,
      definition lists, citations, raw LaTeX. Popular for academic
      writing.
    </p>
    <p>
      <strong>Obsidian markdown:</strong> GFM + wikilinks (
      <code>[[like this]]</code>) + embeds. Valid GFM but wikilinks
      break elsewhere.
    </p>
    <p>
      <strong>Rule:</strong> target GFM unless you have a reason
      not to. It&rsquo;s the broadest support with the features
      developers need.
    </p>

    <h2>Headings</h2>
    <p>
      <strong>ATX style (preferred):</strong>{" "}
      <code># H1</code>, <code>## H2</code>, etc. Clean, linter-friendly.
    </p>
    <p>
      <strong>Setext style:</strong> underline with <code>===</code>{" "}
      or <code>---</code> under the heading text. Only supports H1/H2.
      Harder to change levels.
    </p>
    <p>
      <strong>One H1 per document.</strong> The H1 is usually the
      title. Start body content at H2.
    </p>
    <p>
      <strong>Don&rsquo;t skip levels.</strong>{" "}
      <code>## → ####</code> is wrong. Accessibility and TOC
      generators both break.
    </p>
    <p>
      <strong>Blank lines around headings.</strong> Required in
      strict CommonMark. Avoids accidental continuation into
      paragraphs.
    </p>

    <h2>Lists — the easy-to-mess-up part</h2>
    <p>
      <strong>Indentation:</strong> use 2 or 4 spaces consistently.
      GFM usually 2; some linters expect 4. Mixing breaks nesting.
    </p>
    <p>
      <strong>Bullet consistency:</strong> pick one of{" "}
      <code>-</code>, <code>*</code>, <code>+</code>. Markdownlint
      enforces one.
    </p>
    <p>
      <strong>Ordered lists:</strong>{" "}
      <code>1. 2. 3.</code> works; so does <code>1. 1. 1.</code>{" "}
      (renderers renumber). The all-1s style is easier to maintain
      because you don&rsquo;t renumber when inserting items.
    </p>
    <p>
      <strong>Blank line before lists.</strong> Required in strict
      CommonMark. Otherwise the list starts mid-paragraph and
      doesn&rsquo;t render as a list.
    </p>
    <p>
      <strong>Nested code in lists.</strong> Indent the code block
      to match the list item&rsquo;s content column. Off-by-one
      indentation turns the code into regular text.
    </p>

    <h2>Code blocks</h2>
    <p>
      <strong>Fenced (preferred):</strong>{" "}
      <code>```language</code> ... <code>```</code>. Supports syntax
      highlighting via the language hint. Always specify the
      language when it&rsquo;s code — even{" "}
      <code>```text</code> for plain text blocks.
    </p>
    <p>
      <strong>Indented:</strong> 4 spaces of indent marks a code
      block. CommonMark spec. Breaks inside lists.
    </p>
    <p>
      <strong>Inline code:</strong> single backticks{" "}
      <code>`like this`</code>. If the code contains backticks, use
      double: <code>``code with `backticks` inside``</code>.
    </p>
    <p>
      <strong>Language hints:</strong> use standard names:{" "}
      <code>js</code>, <code>ts</code>, <code>python</code>,{" "}
      <code>go</code>, <code>rust</code>, <code>bash</code>,{" "}
      <code>shell</code>, <code>sql</code>, <code>json</code>,{" "}
      <code>yaml</code>, <code>html</code>, <code>css</code>,{" "}
      <code>diff</code>. Unknown languages fall through without
      highlighting.
    </p>

    <h2>Links and references</h2>
    <p>
      <strong>Inline:</strong>{" "}
      <code>[text](url)</code>. Good for one-off links.
    </p>
    <p>
      <strong>Reference:</strong>{" "}
      <code>[text][ref]</code> with{" "}
      <code>[ref]: url</code> at the bottom. Cleaner when the same
      URL appears multiple times, or URLs are long.
    </p>
    <p>
      <strong>Autolinks (GFM):</strong>{" "}
      <code>https://example.com</code> auto-converts. Bare URLs
      become clickable.
    </p>
    <p>
      <strong>Titles:</strong>{" "}
      <code>[text](url &quot;title&quot;)</code> — shown on hover.
      Optional but useful for accessibility.
    </p>
    <p>
      <strong>Image syntax:</strong>{" "}
      <code>![alt text](path)</code>. Always include alt text for
      accessibility.
    </p>
    <p>
      <strong>Relative vs absolute:</strong> in docs that get
      rebased (GitHub READMEs served at different paths), relative
      links break. Use absolute paths in published docs.
    </p>

    <h2>Tables (GFM)</h2>
    <p>
      Pipe-delimited with a header separator row:
    </p>
    <pre>
{`| Column 1 | Column 2 |
| -------- | -------- |
| Row 1    | Data     |
| Row 2    | Data     |`}
    </pre>
    <p>
      <strong>Alignment:</strong> <code>:---</code> left,{" "}
      <code>:---:</code> center, <code>---:</code> right in the
      separator row.
    </p>
    <p>
      <strong>Don&rsquo;t auto-align cells.</strong> Spending time
      aligning table cells with spaces is wasted — the renderer
      ignores it, and editing the table later re-breaks alignment.
    </p>
    <p>
      <strong>Long cells:</strong> tables with very long cell
      content render poorly. Consider a definition list or prose
      if you have more than a short phrase per cell.
    </p>

    <h2>Blockquotes and callouts</h2>
    <p>
      <strong>Standard:</strong> <code>&gt; quoted text</code>.
      Nested quotes: <code>&gt;&gt;</code>.
    </p>
    <p>
      <strong>GFM alerts (new):</strong> GitHub added{" "}
      <code>&gt; [!NOTE]</code>, <code>&gt; [!WARNING]</code>,{" "}
      <code>&gt; [!TIP]</code>, <code>&gt; [!IMPORTANT]</code>,{" "}
      <code>&gt; [!CAUTION]</code>. Renders as colored callout
      boxes on GitHub.
    </p>

    <h2>Line breaks and paragraphs</h2>
    <p>
      <strong>Paragraph:</strong> blank line between chunks of
      text.
    </p>
    <p>
      <strong>Hard line break:</strong> two spaces at end of line →
      <code>&lt;br&gt;</code>. Easy to miss in code review (trailing
      whitespace). GFM also accepts <code>\</code> at end of line.
    </p>
    <p>
      <strong>Rule:</strong> hard breaks are usually wrong. If you
      want two separate lines, make them separate paragraphs.
      Hard breaks inside a paragraph are rare in technical writing.
    </p>

    <h2>Escaping</h2>
    <p>
      Backslash-escape markdown special characters to render them
      literally: <code>\*not bold\*</code> →{" "}
      <code>*not bold*</code>.
    </p>
    <p>
      Common escape targets: <code>*</code>, <code>_</code>,{" "}
      <code>#</code>, <code>&lt;</code>, <code>&gt;</code>,{" "}
      <code>[</code>, <code>]</code>, <code>\</code>,{" "}
      <code>\`</code>.
    </p>
    <p>
      Inside code blocks or inline code, no escaping needed.
      Everything is literal.
    </p>

    <h2>Linting with markdownlint</h2>
    <p>
      <strong>markdownlint-cli</strong> catches: heading spacing,
      list indentation mismatches, trailing whitespace, inconsistent
      bullets, bare URLs, duplicate headings, line length (if
      configured).
    </p>
    <p>
      Add a <code>.markdownlint.json</code> to project root. Common
      overrides: disable line-length rule (<code>MD013: false</code>
      ) since prose doesn&rsquo;t need hard wrapping, and allow
      multiple H1s if needed (<code>MD025: false</code>).
    </p>
    <p>
      Prettier also formats markdown. Combine: Prettier for
      formatting, markdownlint for rules.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Trailing whitespace for line breaks.</strong> Invisible
      in diffs. Most editors strip it on save. Write as separate
      paragraphs instead.
    </p>
    <p>
      <strong>Tight lists without blank lines.</strong> Breaks
      renderers. Always put a blank line before the first item.
    </p>
    <p>
      <strong>Forgetting code block language.</strong> No
      highlighting, no copy-button support in many viewers. Always
      specify.
    </p>
    <p>
      <strong>Deeply nested lists.</strong> Past 3 levels, markdown
      becomes unreadable. Refactor to headings or sub-sections.
    </p>
    <p>
      <strong>Pasting rich text.</strong> Copying from Word or Notion
      often embeds HTML spans and non-breaking spaces. Paste as
      plain text, then format.
    </p>
    <p>
      <strong>Markdown-in-HTML confusion.</strong> Inside a{" "}
      <code>&lt;div&gt;</code>, most renderers don&rsquo;t parse
      markdown. Add a blank line inside the div, or use{" "}
      <code>markdown=&quot;1&quot;</code> (Kramdown) or equivalent.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert markdown to HTML instantly with the{" "}
      <a href="/tools/markdown-to-html">markdown to HTML converter</a>.
      Pair with the <a href="/tools/html-to-markdown">HTML to markdown</a>
      {" "}converter to extract content from web pages, and the{" "}
      <a href="/tools/html-formatter">HTML formatter</a> to clean
      up the generated output.
    </p>
  </>
);
