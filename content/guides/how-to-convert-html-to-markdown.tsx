import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Converting HTML to Markdown sounds lossless until you hit your first <code>&lt;table&gt;</code>
      with merged cells, a <code>&lt;div&gt;</code> soup full of inline styles, or a legacy CMS
      export where every paragraph is wrapped in a decorative span. Markdown is a deliberately
      small language&mdash;it covers roughly the subset of HTML a plain-prose writer needs&mdash;and
      anything beyond that subset has to be dropped, approximated, or preserved as raw HTML
      passthrough. Getting the conversion right means knowing which elements map cleanly, which
      are lossy, and how to configure your converter to fail gracefully. This guide covers the
      safe-mapping elements, the lossy ones, how to handle nested HTML, and the best strategies
      for bulk-migrating content without losing structure.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The safe subset</h2>
    <p>
      A handful of HTML elements map one-to-one to Markdown with zero information loss. Headings
      <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code> become <code>#</code> through
      <code>######</code>. Paragraphs become blank-line-separated text. <code>&lt;strong&gt;</code>
      and <code>&lt;b&gt;</code> both become <code>**bold**</code>. <code>&lt;em&gt;</code> and
      <code>&lt;i&gt;</code> become <code>_italic_</code>. <code>&lt;code&gt;</code> becomes
      backtick spans, <code>&lt;pre&gt;&lt;code&gt;</code> becomes fenced code blocks, and
      <code>&lt;blockquote&gt;</code> becomes <code>&gt;</code>-prefixed lines. If your source HTML
      consists only of these tags, your converter can produce clean Markdown that round-trips
      perfectly back to HTML.
    </p>

    <h2>Links and images</h2>
    <p>
      Links and images convert cleanly when the attributes are minimal.
      <code>&lt;a href=&quot;/about&quot;&gt;About&rsquo;</code> becomes <code>[About](/about)</code>,
      and <code>&lt;img src=&quot;x.png&quot; alt=&quot;X&quot;&gt;</code> becomes
      <code>![X](x.png)</code>. Extra attributes like <code>class</code>, <code>id</code>,
      <code>rel</code>, <code>target</code>, <code>loading</code>, or inline styles cannot be
      expressed in standard Markdown and must be dropped. If any of those attributes carry
      semantic meaning in your content&mdash;for example, <code>target=&quot;_blank&quot;</code> on
      external links&mdash;your converter should be configured to either fall back to inline HTML
      or warn you so you can add the attributes back manually after conversion.
    </p>
    <pre>{`HTML:  <a href="https://example.com" target="_blank" rel="noopener">Docs</a>
Lossy: [Docs](https://example.com)
Lossless: <a href="https://example.com" target="_blank" rel="noopener">Docs</a>`}</pre>

    <h2>Lists and nesting</h2>
    <p>
      Unordered lists become <code>-</code>, <code>*</code>, or <code>+</code> lines; ordered lists
      become <code>1.</code>, <code>2.</code>, etc. Most converters normalize the numbers to
      <code>1.</code> on every line because Markdown renderers auto-increment. Nested lists work
      but require four-space indentation per level in strict Markdown and two spaces in GFM. The
      real trouble is when HTML lists contain block-level children&mdash;paragraphs, code blocks,
      tables, or other lists. Those need a blank line and continuation-indented content inside the
      list item, which many naive converters get wrong.
    </p>

    <h2>Tables and other lossy elements</h2>
    <p>
      HTML tables support things Markdown tables cannot: merged cells via <code>rowspan</code> and
      <code>colspan</code>, captions, multiple tbody sections, headers in the left column, and
      arbitrary HTML inside cells. A converter has three options: flatten the table into a GFM
      pipe table and drop the unsupported features, emit the entire <code>&lt;table&gt;</code> as
      raw HTML inside the Markdown, or throw an error and ask for human review. For documentation
      content, raw HTML passthrough is usually the right call because preserving the structure
      matters more than source readability.
    </p>

    <h2>Nested and decorative HTML</h2>
    <p>
      Legacy CMS exports often wrap content in decorative <code>&lt;div&gt;</code> and
      <code>&lt;span&gt;</code> elements with classes like <code>wp-block-paragraph</code>,
      <code>mce-container</code>, or <code>post-content</code>. Those elements carry no meaning
      and should be stripped before conversion. A well-configured converter unwraps purely
      decorative containers and keeps their children. More aggressive converters apply a
      whitelist: anything outside a known-safe set of tags is either unwrapped or dropped
      entirely.
    </p>
    <pre>{`Input:
<div class="wp-block-group">
  <div class="wp-block-column">
    <p>Hello <span class="emphasis">world</span>.</p>
  </div>
</div>

Output:
Hello **world**.`}</pre>

    <h2>Inline styles and color</h2>
    <p>
      Markdown has no syntax for color, font family, size, or any other CSS property. If your
      source uses <code>&lt;span style=&quot;color: red&quot;&gt;</code> to flag errors or
      <code>&lt;mark&gt;</code> for highlights, you have to choose between dropping the styling,
      replacing it with an emoji or unicode marker, or preserving the HTML passthrough. For
      technical docs, passthrough is fine. For blog prose, dropping is usually cleaner and the
      styling should be reintroduced via CSS classes once the Markdown renders.
    </p>

    <h2>Code blocks and language hints</h2>
    <p>
      A well-formed <code>&lt;pre&gt;&lt;code class=&quot;language-python&quot;&gt;</code> block
      converts cleanly into a fenced code block with the language tag. But many editors emit
      <code>class=&quot;lang-python&quot;</code>, <code>class=&quot;python&quot;</code>, or nothing
      at all, and highlight.js and Prism use different class conventions. A good converter detects
      the language from any of the common class prefixes and falls back to an untagged fence when
      no language can be identified. Preserve indentation carefully&mdash;Markdown renderers are
      strict about the content between the fences.
    </p>

    <h2>Bulk migration strategy</h2>
    <p>
      For one-off conversions, paste the HTML into a converter and clean up the output by hand.
      For a bulk migration&mdash;say, a thousand CMS posts&mdash;script the conversion with a tool
      like Turndown (JavaScript) or html2text (Python), tune the rules to match your HTML patterns,
      and run the conversion against a sample of twenty posts first. Look for patterns that break:
      custom shortcodes, embedded widgets, <code>&lt;iframe&gt;</code> embeds, and anything
      generated by a WYSIWYG editor. Build transformations for those patterns before running the
      full batch, or you will spend weeks cleaning up the output.
    </p>

    <h2>Round-trip testing</h2>
    <p>
      The fastest way to check converter quality is to convert a sample from HTML to Markdown and
      back. Elements that survive the round trip without changing are safe. Elements that degrade,
      lose attributes, or restructure are the ones you need to handle manually or with custom
      rules. A round-trip diff run on a representative sample gives you a concrete coverage
      number for your migration.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Assuming the conversion is lossless.</strong> Markdown covers maybe sixty percent of
      real-world HTML cleanly. The rest needs choices. Plan for review and cleanup in your
      migration schedule.
    </p>
    <p>
      <strong>Dropping tables silently.</strong> If your converter turns a complex table into
      paragraphs of piped text, you lose the structure. Either force HTML passthrough for tables or
      flag them for manual review.
    </p>
    <p>
      <strong>Keeping decorative wrappers.</strong> Converting every <code>&lt;div&gt;</code> and
      <code>&lt;span&gt;</code> into raw HTML passthrough defeats the point of going to Markdown.
      Strip the ones that carry no semantic weight.
    </p>
    <p>
      <strong>Forgetting image paths change.</strong> Markdown images use relative paths
      differently than HTML, and a site reorganization during migration often breaks every image.
      Rewrite image paths as part of the conversion, not after.
    </p>
    <p>
      <strong>Ignoring whitespace inside code blocks.</strong> Leading tabs, trailing spaces, and
      blank lines in code matter. Converters that trim whitespace aggressively will corrupt your
      code samples.
    </p>
    <p>
      <strong>Not handling HTML entities.</strong> Entities like <code>&amp;mdash;</code>,
      <code>&amp;nbsp;</code>, and <code>&amp;#x2014;</code> should be decoded to their literal
      characters during conversion unless they appear inside code blocks.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert single files or whole batches with the{" "}
      <a href="/tools/html-to-markdown">HTML to Markdown converter</a>. Pair with the{" "}
      <a href="/tools/markdown-to-html">Markdown to HTML converter</a> for round-trip verification
      that your output renders the same as your input, and the{" "}
      <a href="/tools/html-formatter">HTML formatter</a> to tidy up the source before conversion
      so the converter has a consistent input shape to work with.
    </p>
  </>
);
