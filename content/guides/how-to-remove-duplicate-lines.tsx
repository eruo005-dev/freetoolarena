import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Dedup looks like the simplest text operation in the world: remove
      lines that appear more than once. In reality &ldquo;duplicate&rdquo;
      is a spectrum. Is leading whitespace significant? Does case matter?
      Should the first occurrence win, or the last? Do trailing spaces
      make two lines different or the same? And what about a file
      that&rsquo;s 10 GB and won&rsquo;t fit in memory? The right answer
      depends entirely on what you&rsquo;re cleaning &mdash; email lists,
      log files, source code, shopping lists &mdash; and picking the
      wrong one can silently discard data you needed. This guide walks
      through every dedup decision and the patterns that handle each.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Exact vs normalized dedup</h2>
    <p>
      Exact dedup compares bytes. Normalized dedup compares after a
      transformation &mdash; lowercase, trim, collapse whitespace, etc.
      Real-world lists almost always need some normalization, because
      real-world sources have inconsistent formatting.
    </p>
    <pre>{`inputs:
  "user@example.com"
  "User@Example.com"
  "  user@example.com  "
  "user@example.com\\r"

exact dedup:       4 lines (all different)
normalized dedup:  1 line`}</pre>

    <h2>Case-insensitive dedup</h2>
    <p>
      Common for emails, usernames, domains. Build a key by lowercasing,
      keep the original for output:
    </p>
    <pre>{`const seen = new Set();
const result = [];
for (const line of lines) {
  const key = line.toLowerCase();
  if (!seen.has(key)) {
    seen.add(key);
    result.push(line);   // preserve original case
  }
}`}</pre>

    <h2>Trimmed comparison</h2>
    <p>
      Leading and trailing whitespace silently differentiates identical
      content. Trim for the comparison, keep whichever version you
      prefer for output:
    </p>
    <pre>{`const key = line.trim();`}</pre>
    <p>
      For really aggressive matching, also collapse internal whitespace:
    </p>
    <pre>{`const key = line.replace(/\\s+/g, " ").trim();`}</pre>

    <h2>Preserve-first vs preserve-last</h2>
    <p>
      When two lines match, which copy do you keep? Default is
      preserve-first: walk the list, skip anything you&rsquo;ve seen.
      Preserve-last requires a second pass:
    </p>
    <pre>{`// preserve-last: keep the LATER occurrence
const map = new Map();
lines.forEach((line, i) =&gt; map.set(keyOf(line), { line, i }));
const result = [...map.values()]
  .sort((a, b) =&gt; a.i - b.i)
  .map(x =&gt; x.line);`}</pre>
    <p>
      Preserve-first is right for logs (earliest record matters).
      Preserve-last is right for change feeds (last state wins).
    </p>

    <h2>Unique vs all-duplicates</h2>
    <p>
      Three possible outputs for a deduplication job:
    </p>
    <ul>
      <li><strong>Unique</strong> &mdash; each distinct line once</li>
      <li><strong>First-occurrence only</strong> &mdash; preserves order</li>
      <li><strong>Only duplicates</strong> &mdash; lines that appeared more than once (opposite direction)</li>
    </ul>
    <pre>{`// lines that appeared &gt; 1 time
const counts = new Map();
for (const line of lines) {
  counts.set(line, (counts.get(line) || 0) + 1);
}
const dupes = [...counts.entries()]
  .filter(([_, n]) =&gt; n &gt; 1)
  .map(([line]) =&gt; line);`}</pre>

    <h2>Unix: sort | uniq</h2>
    <p>
      The classic one-liner. But note: <code>uniq</code> only dedups
      <em>consecutive</em> duplicates, which is why you sort first.
    </p>
    <pre>{`sort input.txt | uniq &gt; output.txt

sort -f input.txt | uniq -i &gt; output.txt   # case-insensitive
sort input.txt | uniq -c &gt; counts.txt      # with counts
sort input.txt | uniq -d &gt; dupes.txt       # only duplicates`}</pre>

    <h2>Preserving order with awk</h2>
    <p>
      Sorting destroys order. <code>awk</code> dedups while preserving
      the original sequence:
    </p>
    <pre>{`awk '!seen[$0]++' input.txt &gt; output.txt`}</pre>
    <p>
      The trick: <code>seen[$0]++</code> is 0 on first occurrence (falsy,
      so <code>!</code> = true, print), and &ge; 1 thereafter (truthy, so
      <code>!</code> = false, skip).
    </p>

    <h2>Large files: streaming dedup</h2>
    <p>
      In-memory <code>Set</code> is O(N) space. For files bigger than
      RAM, you have two options:
    </p>
    <ul>
      <li>
        External sort + uniq &mdash; disk-based, works for any size,
        O(N log N) time
      </li>
      <li>
        Bloom filter &mdash; constant space, probabilistic, may miss
        rare duplicates or treat uniques as duplicates
      </li>
    </ul>
    <pre>{`# GNU sort spills to disk automatically
sort -u --parallel=4 -S 2G -T /tmp huge.txt &gt; dedup.txt`}</pre>

    <h2>Hash-based keys for long lines</h2>
    <p>
      If lines are very long (&gt;1&nbsp;KB each) and you have millions
      of them, storing full lines in a <code>Set</code> wastes memory.
      Store a hash instead:
    </p>
    <pre>{`import crypto from "crypto";
const seen = new Set();
for (const line of lines) {
  const h = crypto.createHash("sha1").update(line).digest("hex");
  if (!seen.has(h)) { seen.add(h); out.push(line); }
}`}</pre>
    <p>
      SHA-1 collisions on human text are vanishingly rare. For
      adversarial input, use SHA-256.
    </p>

    <h2>Dedup with count column</h2>
    <p>
      Sometimes you want the deduplicated list <em>with</em> how many
      times each appeared. Useful for frequency analysis:
    </p>
    <pre>{`sort input.txt | uniq -c | sort -rn | head -20`}</pre>
    <p>
      The <code>-c</code> flag prefixes counts; <code>sort -rn</code>
      puts highest first.
    </p>

    <h2>CSV dedup by key column</h2>
    <p>
      For tabular data, &ldquo;duplicate&rdquo; usually means &ldquo;same
      value in the key column,&rdquo; not full-row match. Use a CSV-aware
      tool:
    </p>
    <pre>{`# csvkit
csvsort -c email input.csv | uniq -f2   # approximate

# or better: load into a script and dedup by column
import csv
seen = set()
with open("in.csv") as f, open("out.csv", "w") as g:
    r = csv.DictReader(f)
    w = csv.DictWriter(g, r.fieldnames)
    w.writeheader()
    for row in r:
        if row["email"].lower() not in seen:
            seen.add(row["email"].lower())
            w.writerow(row)`}</pre>

    <h2>Common mistakes</h2>
    <p>
      Assuming <code>uniq</code> dedups without sorting first. Comparing
      raw lines without trimming and getting 80% &ldquo;duplicate&rdquo;
      survivors that are actually just whitespace variants. Losing order
      when order mattered. Discarding the wrong copy (first vs last) for
      the problem. Running in-memory dedup on a 20&nbsp;GB file and
      crashing. And dedup&rsquo;ing on full rows when only one column
      mattered.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/remove-duplicate-lines">Remove duplicate lines</a>
      <a href="/tools/text-sorter">Text sorter</a>
      <a href="/tools/line-counter">Line counter</a>
    </p>
  </>
);
