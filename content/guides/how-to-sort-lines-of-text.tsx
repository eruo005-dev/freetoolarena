import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Sorting a list of lines is a one-click operation until the moment you
      realize the sort put &ldquo;Item 10&rdquo; before &ldquo;Item 2,&rdquo;
      mixed your capitalization wrong, or flipped Spanish &ntilde; into the
      wrong alphabetical slot. &ldquo;Sort these lines&rdquo; hides a dozen
      decisions: alphabetical or numeric, case-sensitive or not, natural or
      lexicographic, stable or not, and which locale&rsquo;s collation
      rules. This guide walks through each choice, shows where the common
      mistakes happen, and covers the specialized modes &mdash; natural sort
      for mixed alphanumeric, reverse sort for most-recent-first, and
      locale-aware sort for non-English text &mdash; that handle real-world
      data correctly.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Lexicographic vs alphabetical vs numeric</h2>
    <p>
      Most &ldquo;alphabetical&rdquo; sort is technically
      <strong>lexicographic</strong> &mdash; character-by-character comparison
      by code point. That works for pure letters but produces surprises:
    </p>
    <pre>{`lexicographic:       numeric:
  Apple                Apple
  Banana               Banana
  Item 10              Item 2
  Item 2               Item 10
  Zebra                Zebra`}</pre>
    <p>
      &ldquo;Item 10&rdquo; sorts before &ldquo;Item 2&rdquo; lexicographically
      because &lsquo;1&rsquo; &lt; &lsquo;2&rsquo; in ASCII. Natural sort
      fixes this.
    </p>

    <h2>Case sensitivity</h2>
    <p>
      In ASCII, uppercase letters all have lower code points than
      lowercase. A case-sensitive sort produces:
    </p>
    <pre>{`Apple
Banana
apple
banana`}</pre>
    <p>
      Case-insensitive sort groups them together:
    </p>
    <pre>{`apple
Apple
banana
Banana`}</pre>
    <p>
      Case-insensitive is almost always what humans want for human-readable
      lists. Case-sensitive is right when you&rsquo;re sorting identifiers,
      code, or anything where case carries meaning.
    </p>

    <h2>Natural sort</h2>
    <p>
      Natural sort recognizes runs of digits and compares them numerically.
      It&rsquo;s what you want for filenames, version numbers, chapter
      lists, and anything with embedded numbers.
    </p>
    <pre>{`v1.2
v1.10
v1.9

natural sort:
v1.2
v1.9
v1.10`}</pre>
    <p>
      In JavaScript, <code>localeCompare</code> with
      <code>{`{ numeric: true }`}</code> gives you natural sort for free.
    </p>

    <h2>Stable sort</h2>
    <p>
      A stable sort preserves the relative order of lines that compare
      equal. Non-stable sort may reshuffle them. This matters when you sort
      on one key and want a previous ordering preserved as the tiebreaker.
    </p>
    <pre>{`input (sorted by age):
Alice  30
Bob    30
Carol  25

sort by name (stable):
Alice  30
Bob    30
Carol  25

sort by name (unstable):
Alice/Bob order may flip`}</pre>
    <p>
      Most modern language sorts are stable: JavaScript&rsquo;s
      <code>Array.sort</code> (since ES2019), Python&rsquo;s <code>sorted</code>,
      Java&rsquo;s <code>Collections.sort</code>. Unix <code>sort -s</code>
      is stable.
    </p>

    <h2>Reverse sort</h2>
    <p>
      Sort ascending, then reverse. Or pass a descending flag. Most
      languages have a one-liner:
    </p>
    <pre>{`// JS
arr.sort((a, b) =&gt; b.localeCompare(a));

// Python
sorted(lines, reverse=True)

// Unix
sort -r`}</pre>

    <h2>Locale-aware collation</h2>
    <p>
      Code-point order is not alphabetical order in many languages. A few
      examples:
    </p>
    <ul>
      <li>Spanish &ntilde; sorts between n and o</li>
      <li>German &szlig; traditionally sorts as &ldquo;ss&rdquo;</li>
      <li>Swedish &aring; &auml; &ouml; sort after z, not as variants of a/o</li>
      <li>Czech ch is a single collation unit</li>
      <li>French ignores accents at the primary level, uses them as tiebreakers</li>
    </ul>
    <p>
      Use <code>Intl.Collator</code> with the right locale:
    </p>
    <pre>{`const coll = new Intl.Collator("sv");
arr.sort(coll.compare);`}</pre>

    <h2>Diacritic handling</h2>
    <p>
      Base-letter vs diacritic-aware comparison is set via <code>sensitivity</code>:
    </p>
    <ul>
      <li><code>base</code> &mdash; a = &aacute; = A = &Aacute;</li>
      <li><code>accent</code> &mdash; a = A, a &ne; &aacute;</li>
      <li><code>case</code> &mdash; a = &aacute;, a &ne; A</li>
      <li><code>variant</code> &mdash; distinguishes everything (default)</li>
    </ul>

    <h2>Sorting with a header line</h2>
    <p>
      A lot of real data has a header or title line that shouldn&rsquo;t be
      sorted. Either strip it first, prefix with a character that sorts
      first (<code>!</code> or <code>#</code>), or sort the slice
      excluding the first line and re-prepend.
    </p>

    <h2>Sorting by column</h2>
    <p>
      For tab- or comma-separated data, you usually want to sort by one
      column, not the whole line. Unix: <code>sort -k2</code> sorts by the
      second field. In a spreadsheet, sort the range and pick the column
      as key. Doing a naive line sort on CSV data gives alphabetical by
      first column only.
    </p>

    <h2>Large files and memory</h2>
    <p>
      Sorting a 10&nbsp;GB file in memory won&rsquo;t work. Use an external
      merge-sort or the Unix <code>sort</code> command, which spills to
      disk automatically. Set the temp directory and memory limit
      explicitly when needed.
    </p>
    <pre>{`sort -T /tmp -S 2G input.txt -o output.txt`}</pre>

    <h2>Common mistakes</h2>
    <p>
      Using lexicographic sort for filenames and getting
      &ldquo;file10&rdquo; before &ldquo;file2.&rdquo; Running a
      case-sensitive sort on mixed-case human names. Sorting German or
      Spanish lists with default ASCII collation. Reading the sort output
      as &ldquo;stable&rdquo; when you ran a non-stable algorithm.
      Forgetting that your header line is now somewhere in the middle of
      the list.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/text-sorter">Text sorter</a>
      <a href="/tools/remove-duplicate-lines">Remove duplicate lines</a>
      <a href="/tools/text-joiner">Text joiner</a>
    </p>
  </>
);
