import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      HTML that lands in your repo after a copy-paste from a CMS, a WYSIWYG editor, or a code
      generator is almost always ugly: inconsistent indentation, closing tags jammed against
      content, attributes scattered in random order, and self-closing tags that disagree with the
      project&rsquo;s conventions. The browser does not care&mdash;it will parse almost anything
      that looks like HTML&mdash;but humans and diff tools care a lot. Consistent formatting keeps
      reviews fast, makes diffs meaningful, and surfaces structural bugs that messy HTML hides.
      This guide covers indent size, attribute ordering, self-closing and void elements, how
      Prettier differs from html-tidy, inline versus block-level rules, and the specific
      conventions that make HTML readable at scale.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Indent size and character</h2>
    <p>
      Two-space indentation is the modern default for HTML, matching the JavaScript and CSS
      ecosystem. Four-space and tab indentation are still common in older codebases and some
      enterprise style guides. The absolute rule is consistency: mixed tabs and spaces break
      diff-tool alignment and trigger noisy whitespace changes on every commit. Configure your
      editor with <code>editorconfig</code> or a Prettier config so every contributor produces the
      same output, and add a pre-commit hook that runs the formatter on changed files.
    </p>
    <pre>{`.editorconfig
[*.html]
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true`}</pre>

    <h2>Void elements and self-closing syntax</h2>
    <p>
      HTML5 has 14 void elements that never have a closing tag: <code>area</code>,
      <code>base</code>, <code>br</code>, <code>col</code>, <code>embed</code>, <code>hr</code>,
      <code>img</code>, <code>input</code>, <code>link</code>, <code>meta</code>, <code>param</code>,
      <code>source</code>, <code>track</code>, and <code>wbr</code>. The HTML5 spec allows both
      <code>&lt;br&gt;</code> and <code>&lt;br /&gt;</code> and treats them identically, but project
      style usually picks one. Plain <code>&lt;br&gt;</code> is the HTML5 idiom. Self-closing
      <code>&lt;br /&gt;</code> is a holdover from XHTML but remains common in JSX-adjacent
      codebases where developers want one consistent rule across both languages. Pick one and
      enforce it with the formatter.
    </p>

    <h2>Block versus inline elements</h2>
    <p>
      Block-level elements (<code>div</code>, <code>section</code>, <code>article</code>,
      <code>header</code>, <code>footer</code>, <code>p</code>, <code>h1</code>-<code>h6</code>,
      <code>ul</code>, <code>ol</code>, <code>li</code>, <code>table</code>) go on their own line
      with their children indented one level. Inline elements (<code>span</code>, <code>a</code>,
      <code>em</code>, <code>strong</code>, <code>code</code>) stay on the same line as
      surrounding text so the prose reads naturally. Breaking inline elements onto their own lines
      can introduce unintended whitespace nodes that change rendering, especially in flex and grid
      layouts where a stray space affects alignment.
    </p>
    <pre>{`<p>This is <a href="/">a link</a> in a sentence.</p>

Not:
<p>
  This is
  <a href="/">a link</a>
  in a sentence.
</p>`}</pre>

    <h2>Attribute ordering</h2>
    <p>
      No official spec mandates an attribute order, but consistent ordering makes scanning faster
      and helps reviewers spot missing values. A widely used order is: structural attributes first
      (<code>id</code>, <code>class</code>), then element-specific attributes (<code>href</code>,
      <code>src</code>, <code>type</code>, <code>value</code>), then metadata (<code>name</code>,
      <code>title</code>, <code>alt</code>, <code>role</code>, <code>aria-*</code>), then event
      handlers (<code>onclick</code>), then <code>data-*</code> attributes last. Prettier does not
      sort attributes by default, but the <code>prettier-plugin-organize-attributes</code> plugin
      and many linters can enforce an order if your team picks one.
    </p>

    <h2>Attribute wrapping</h2>
    <p>
      When a tag has more attributes than fit on a single line at the project&rsquo;s print-width
      setting (usually 80 or 100 characters), wrap each attribute onto its own line with the
      closing bracket on a new line. Prettier does this automatically when
      <code>singleAttributePerLine</code> is enabled or when the line would exceed the print
      width.
    </p>
    <pre>{`<button
  type="button"
  class="btn btn-primary"
  data-action="submit"
  aria-label="Save changes"
  disabled
>
  Save
</button>`}</pre>

    <h2>Quote style for attributes</h2>
    <p>
      HTML5 accepts unquoted attribute values for values that contain no whitespace, quotes,
      ampersands, equals signs, or angle brackets. Quoted values are universally safer and are
      the norm in every modern style guide. Double quotes are the default. Single quotes work but
      can collide with JavaScript string content when HTML is embedded in JS templates. Pick
      double quotes and lock it in your formatter.
    </p>

    <h2>Boolean attributes</h2>
    <p>
      HTML boolean attributes like <code>disabled</code>, <code>checked</code>,
      <code>readonly</code>, <code>required</code>, <code>selected</code>, and <code>hidden</code>
      are true when present and false when absent regardless of value. You can write them as
      <code>disabled</code>, <code>disabled=&quot;&quot;</code>, or <code>disabled=&quot;disabled&quot;</code>
      and all three mean the same thing. The bare-name form is the modern idiom. Do not write
      <code>disabled=&quot;false&quot;</code>&mdash;it is still true, because the attribute exists,
      and the string &ldquo;false&rdquo; is ignored. To make the input not disabled, remove the
      attribute entirely.
    </p>

    <h2>Prettier versus html-tidy versus js-beautify</h2>
    <p>
      Prettier is the modern default: fast, opinionated, minimal configuration, and handles
      embedded CSS and JavaScript consistently. It formats HTML as part of a project-wide
      formatter covering many languages. html-tidy is the classic tool: very configurable, good
      at repairing malformed HTML, but slower and more opinionated in weird directions.
      js-beautify (with its HTML mode) sits between them with more knobs than Prettier and faster
      operation than tidy. For new projects Prettier is the path of least resistance; for legacy
      cleanup where you need to repair broken HTML, html-tidy is better.
    </p>

    <h2>Preserving meaningful whitespace</h2>
    <p>
      Inside <code>&lt;pre&gt;</code>, <code>&lt;textarea&gt;</code>, and any element with
      <code>white-space: pre</code> in CSS, whitespace matters. Formatters must leave these
      contents alone&mdash;no reindentation, no collapsing, no trailing-whitespace trimming.
      Prettier and html-tidy both respect this by default. If you see formatter output that adds
      or removes leading spaces inside a <code>&lt;pre&gt;</code>, check for a formatter bug or a
      misconfigured override.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Reformatting generated files.</strong> Template engines, bundlers, and CMS exports
      all produce HTML that may have intentional structure. Running a formatter on
      build-output HTML creates noise that obscures real changes. Format source, not output.
    </p>
    <p>
      <strong>Breaking inline text across lines.</strong> Putting <code>&lt;a&gt;</code> or
      <code>&lt;em&gt;</code> tags on their own line adds whitespace nodes that change rendering
      in flex and grid layouts. Keep inline elements on the same line as surrounding prose.
    </p>
    <p>
      <strong>Mixing self-closing styles.</strong> Some <code>&lt;br /&gt;</code> and some
      <code>&lt;br&gt;</code> in the same file means the formatter is not running or is
      misconfigured. Pick one and enforce it.
    </p>
    <p>
      <strong>Manual indentation on a large file.</strong> Humans are bad at counting spaces.
      Always run the formatter before committing instead of adjusting indentation by eye.
    </p>
    <p>
      <strong>Writing <code>disabled=&quot;false&quot;</code>.</strong> A present boolean
      attribute is always true. Remove the attribute to make it false.
    </p>
    <p>
      <strong>Unquoted attribute values.</strong> Technically legal for simple values but brittle
      the moment someone adds a space or a quote. Always quote attribute values.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Clean up messy HTML instantly with the{" "}
      <a href="/tools/html-formatter">HTML formatter</a>. Pair with the{" "}
      <a href="/tools/xml-formatter">XML formatter</a> for XHTML and XML-flavored markup where
      whitespace and self-closing rules differ, and the{" "}
      <a href="/tools/html-to-markdown">HTML to Markdown converter</a> when you decide the content
      would be better expressed as Markdown once it is legible.
    </p>
  </>
);
