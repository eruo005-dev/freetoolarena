import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Markdown tables look deceptively simple&mdash;three pipes and a dashed separator&mdash;but the
      moment you try to align columns, escape pipes inside cell content, or move a table between
      GitHub Flavored Markdown and CommonMark, the cracks show. A table that renders beautifully on
      GitHub can break on a static site generator, and a table that copies cleanly from a
      spreadsheet can arrive with ragged pipes and missing headers. The spec also refuses to
      standardize tables at the CommonMark level, which means every renderer implements them
      slightly differently. Getting the syntax right once saves hours of manual fiddling across
      README files, documentation sites, and blog posts. This guide covers pipe syntax, header
      separators, alignment, escaping special characters, GFM versus CommonMark differences, and
      the fastest way to generate valid tables from existing data.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The pipe-and-dash skeleton</h2>
    <p>
      Every Markdown table is built from three row types: a header row, a separator row of dashes,
      and one or more data rows. The leading and trailing pipes are optional in most renderers, but
      always including them makes the source easier to read and less prone to parser ambiguity when
      a cell starts with a character the renderer treats as meaningful.
    </p>
    <pre>{`| Column A | Column B | Column C |
| -------- | -------- | -------- |
| cell 1   | cell 2   | cell 3   |
| cell 4   | cell 5   | cell 6   |`}</pre>
    <p>
      The separator row needs at least three dashes per column in most strict parsers, although
      GFM accepts a single dash. Pad the dashes to match the header width if you want the source to
      line up visually&mdash;the rendered output is identical either way.
    </p>

    <h2>Column alignment with colons</h2>
    <p>
      Alignment is controlled by where you place colons in the separator row. A colon on the left
      means left-aligned, a colon on the right means right-aligned, and colons on both sides mean
      center-aligned. Without any colon, most renderers default to left alignment, but some respect
      the renderer&rsquo;s CSS instead, so always be explicit when alignment matters.
    </p>
    <pre>{`| Left     | Center   | Right   |
| :------- | :------: | ------: |
| apple    | 1.50     | 12      |
| banana   | 0.75     | 6       |
| cherry   | 3.25     | 120     |`}</pre>
    <p>
      Right alignment is particularly useful for numeric columns because it lines up decimal points
      visually in monospace-rendered source, even though the final HTML output uses a CSS
      <code>text-align</code> rule rather than any padding.
    </p>

    <h2>GFM versus CommonMark</h2>
    <p>
      CommonMark&rsquo;s base specification does not define tables at all. Tables are a GitHub
      Flavored Markdown extension, later adopted by other flavors like MultiMarkdown and Pandoc,
      but each implementation diverges in small ways. GFM requires a header row, GFM rejects tables
      without a separator row, and GFM allows inline formatting like bold and code inside cells but
      forbids block elements like nested lists or paragraphs. Pandoc supports pipe tables, grid
      tables, and multiline tables with different rules for each. When in doubt, write to the GFM
      spec because it has the widest runtime support across static site generators, documentation
      tools, and chat platforms.
    </p>

    <h2>Escaping pipes inside cells</h2>
    <p>
      A raw pipe character inside a cell will be interpreted as a column boundary and silently
      break your table. Escape it with a backslash, or wrap the value in a code span if the content
      is code-like. HTML entities also work but make the source harder to read.
    </p>
    <pre>{`| Command          | Description             |
| ---------------- | ----------------------- |
| \`ls | grep x\`   | List files matching x   |
| a \\| b           | Literal pipe character  |
| \`cat a.txt\`     | Print file contents     |`}</pre>
    <p>
      Backticks around the whole cell are the most robust option because the renderer stops parsing
      table syntax inside a code span. That is also the only way to include a literal backslash
      without the renderer eating it.
    </p>

    <h2>Inline formatting inside cells</h2>
    <p>
      GFM cells accept inline formatting: bold with <code>**</code>, italic with <code>_</code>,
      inline code with backticks, links, images, and inline HTML. Block-level elements like
      headings, blockquotes, lists, and multi-paragraph text are not allowed inside a cell. If you
      need a list inside a cell, use <code>&lt;br&gt;</code> tags to create visual line breaks or
      switch to an HTML <code>&lt;table&gt;</code> entirely.
    </p>

    <h2>Handling long content and wrapping</h2>
    <p>
      Markdown tables do not wrap gracefully. A single long cell pushes the column wider and forces
      horizontal scrolling on narrow viewports. If your content is prose-heavy, consider
      restructuring into a definition list or a series of short subsections with <code>&lt;h3&gt;</code>
      headings. If the table is reference-style data, accept the scroll and make sure your CSS
      wraps the table in an <code>overflow-x: auto</code> container so mobile readers can pan
      horizontally without breaking the page layout.
    </p>

    <h2>Generating tables from spreadsheets and CSV</h2>
    <p>
      Copy-pasting directly from Excel, Google Sheets, or Numbers usually produces tab-separated
      values, which Markdown renderers do not understand. Convert TSV or CSV into pipe-delimited
      Markdown by replacing commas or tabs with <code> | </code> and adding a header separator row.
      Watch for embedded commas in quoted CSV fields&mdash;a naive find-and-replace will corrupt
      them. Most table generators handle this correctly, stripping quotes and normalizing
      whitespace in one step.
    </p>
    <pre>{`Name,Role,Start
Alice,Engineer,2024-01-15
Bob,"Manager, Ops",2023-08-01

becomes

| Name  | Role          | Start      |
| ----- | ------------- | ---------- |
| Alice | Engineer      | 2024-01-15 |
| Bob   | Manager, Ops  | 2023-08-01 |`}</pre>

    <h2>Tables inside lists and blockquotes</h2>
    <p>
      Nesting a table inside a list item or blockquote requires careful indentation. Most GFM
      parsers need the table to be indented by the same amount as the list item&rsquo;s content,
      which usually means two or four spaces. Mixing tabs and spaces will break the nesting. If you
      cannot get it to render, fall back to inline HTML using an explicit
      <code>&lt;table&gt;</code>&mdash;the result is uglier source but bulletproof rendering.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Missing the separator row.</strong> Without the dashed row directly below the
      header, GFM treats the content as a paragraph and collapses all the pipes into text. Always
      include the separator, even for a single-row table.
    </p>
    <p>
      <strong>Uneven column counts.</strong> If the header has four columns and a data row has
      three, some renderers silently drop the extra cell, others render a jagged table, and some
      refuse to parse it at all. Count the pipes in every row.
    </p>
    <p>
      <strong>Unescaped pipes in cell content.</strong> A raw <code>|</code> inside a cell
      terminates the cell early and shifts every subsequent column. Escape with a backslash or wrap
      the value in backticks.
    </p>
    <p>
      <strong>Trying to put block elements in cells.</strong> Lists, multi-paragraph content, and
      fenced code blocks do not belong inside table cells. Use <code>&lt;br&gt;</code> for soft
      breaks and keep cell content short.
    </p>
    <p>
      <strong>Assuming alignment works everywhere.</strong> The colon-in-separator syntax is GFM
      only. Strict CommonMark parsers ignore it, and some documentation generators like Sphinx use
      their own directive-based table formats instead.
    </p>
    <p>
      <strong>Copy-pasting from spreadsheet software blindly.</strong> Tab-separated output is not
      Markdown. You have to convert delimiters and add the separator row before the table
      renders.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Skip the manual pipe-counting and generate tables from your source data with the{" "}
      <a href="/tools/markdown-table-generator">markdown table generator</a>. Pair with the{" "}
      <a href="/tools/markdown-to-html">markdown to HTML converter</a> to preview exactly how your
      table will render before pushing, and the{" "}
      <a href="/tools/html-to-markdown">HTML to Markdown converter</a> to pull existing HTML tables
      out of legacy pages and into clean Markdown source.
    </p>
  </>
);
