import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Diffing two files is one of those operations every developer does a hundred times a day
      without thinking about what is actually happening. Under the hood, <code>diff</code>
      computes the shortest edit script between two sequences: the smallest set of insertions
      and deletions that turns one into the other. That is a harder problem than it sounds, and
      the choice of algorithm, granularity (line, word, character), and output format
      (unified, context, side-by-side) each have trade-offs. The right choice depends on whether
      you are reading the diff yourself, feeding it to a patch tool, or comparing structured data
      where line-level diffs miss the point. This guide covers unified and context formats,
      line-word-character granularities, three-way merge, the Myers algorithm that most tools
      use, and when to reach for <code>git diff</code> versus a standalone diff tool.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The edit-script problem</h2>
    <p>
      A diff is the answer to: given sequence A and sequence B, what is the shortest sequence of
      insertions and deletions that turns A into B? Ignoring reorders, the minimum-edit-distance
      problem has a well-known dynamic-programming solution in O(mn) time and O(mn) space. For a
      10,000-line file, that is 100 million cells of memory, which is too much. The Myers
      algorithm (Eugene Myers, 1986) solves the same problem in O((m+n)D) time where D is the
      size of the edit script, which is usually much smaller than m+n. Git, most GNU
      <code>diff</code> implementations, and most online diff tools all use Myers or a patience
      variant.
    </p>

    <h2>Unified diff format</h2>
    <p>
      Unified diff is the format you see in pull requests and <code>git diff</code> output. Each
      hunk starts with a range header like <code>@@ -10,7 +10,8 @@</code>: starting at line 10 of
      the old file, 7 lines long, becoming starting at line 10 of the new file, 8 lines long.
      Lines prefixed with <code>-</code> are removed, <code>+</code> are added, and unprefixed
      lines are context. The default context is three lines before and after each change, which
      is enough for a human to orient without drowning in unchanged content.
    </p>
    <pre>{`--- a/config.yml
+++ b/config.yml
@@ -10,7 +10,8 @@
 server:
   host: localhost
-  port: 8080
+  port: 8443
+  tls: true
   timeout: 30
   retries: 3`}</pre>

    <h2>Context diff format</h2>
    <p>
      Context diff is the older format, still in use for some patch-based workflows. Each hunk
      shows the old block fully (lines prefixed with <code>!</code> for changed, <code>-</code>
      for removed) and the new block fully (with <code>!</code> for changed, <code>+</code> for
      added). It is more verbose than unified but easier for some humans to read because old and
      new are shown as intact blocks instead of interleaved. Most modern tools default to
      unified.
    </p>

    <h2>Line granularity</h2>
    <p>
      Line-level diffs are the default because most code and text-based formats are line-oriented.
      A diff that says &ldquo;line 42 was replaced&rdquo; is usually precise enough for code
      review. Line-level diffs break down when a single long line changes: you see the whole
      line as removed and the whole line as added, which obscures the actual edit. Long YAML
      values, minified JavaScript, and single-line SVG documents all have this problem.
    </p>

    <h2>Word and character granularity</h2>
    <p>
      Word-level diffs split the content on whitespace and run the diff algorithm over tokens.
      Character-level goes one step further. Both produce diffs that highlight the exact
      sub-line change, which is essential for prose and helpful for long-line structured data.
      Most diff UIs default to line-level and offer a toggle to &ldquo;show intra-line
      changes.&rdquo; Git&rsquo;s <code>--word-diff</code> flag produces word-level output.
    </p>
    <pre>{`# Line-level
- The quick brown fox jumps over the lazy dog.
+ The quick red fox leaps over the sleepy dog.

# Word-level
The quick [-brown-]{+red+} fox [-jumps-]{+leaps+} over the [-lazy-]{+sleepy+} dog.`}</pre>

    <h2>Side-by-side view</h2>
    <p>
      Side-by-side diffs show the old content in one column and the new content in the other,
      with aligned lines and highlighted changes. This is the view most IDE diff tools default
      to because it matches how humans compare things visually. Unified is more compact and
      better for narrow terminals or for reading a patch file; side-by-side is better for
      full-file review. Some tools offer a three-column view that adds a common-ancestor column
      for merge conflicts.
    </p>

    <h2>Three-way merge</h2>
    <p>
      Two-way diff compares A and B. Three-way merge compares A and B against a common ancestor
      C, which is what <code>git merge</code> does. If both A and B changed a line relative to
      C but in different ways, that is a conflict&mdash;Git marks it with
      <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code>, <code>=======</code>, and
      <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> markers and leaves it to the human to resolve.
      If A and B changed different lines, the merge proceeds automatically. Three-way merge is
      why version control works at all&mdash;without it, every concurrent edit would require
      manual resolution.
    </p>

    <h2>Structured diffs</h2>
    <p>
      Line-level diffs are meaningless for some formats. A reordered JSON object, a
      whitespace-only YAML change, or a reformatted SQL query can produce a huge textual diff
      with zero semantic difference. Structured diff tools parse both documents into their
      native data model and compare the models directly. <code>jq</code> and custom
      <code>jsondiff</code> libraries handle JSON. SQL parsers produce AST diffs. The tradeoff is
      complexity: textual diff works on anything, structural diff has to understand the format.
    </p>

    <h2>When to use git diff</h2>
    <p>
      <code>git diff</code> is the right tool for any file tracked by Git. It handles large
      files efficiently, shows colorized output, supports word-level with <code>--word-diff</code>,
      can compare arbitrary commits or branches, and produces patch files with
      <code>git diff &gt; my.patch</code>. For files outside a Git repo or for comparing text
      you just have in clipboards, a standalone diff tool is faster. For comparing two configs
      from different environments, or two API response payloads, a browser-based diff tool beats
      setting up a temporary repo.
    </p>

    <h2>Patience diff and histogram diff</h2>
    <p>
      Myers diff is fast but sometimes produces hunks that align changes poorly&mdash;for
      example, showing a moved function as a big delete and a big insert far apart in the file.
      Patience diff (Bram Cohen, 2008) and histogram diff (Git&rsquo;s variant) use common unique
      lines as anchors to produce more human-readable diffs at the cost of some performance.
      Git offers <code>--patience</code> and <code>--histogram</code> flags that switch to these
      algorithms when the default Myers output is noisy.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Diffing binary files.</strong> Textual diff tools produce gibberish on binary
      input. Use a binary diff tool like <code>bsdiff</code> or compare hash digests for
      equality checks. Git detects binary files and shows
      <code>Binary files differ</code> rather than attempting a text diff.
    </p>
    <p>
      <strong>Ignoring line-ending differences.</strong> A file moved between Windows and Unix
      often diffs completely because every line gained or lost a <code>\r</code>. Configure
      your diff tool or Git to normalize line endings before comparing.
    </p>
    <p>
      <strong>Trusting whitespace-only diffs in code review.</strong> A pull request that
      touches 500 lines but is entirely whitespace changes can hide a single real change. Use
      the <code>--ignore-all-space</code> flag to see the semantic changes only.
    </p>
    <p>
      <strong>Relying on line-level diff for JSON or YAML.</strong> Reordered keys look like
      huge diffs but change nothing. Use a structured diff tool for configuration data.
    </p>
    <p>
      <strong>Applying a patch to the wrong base.</strong> A unified diff contains line numbers
      and context. If the target file has drifted from the patch&rsquo;s expected base, the
      patch will fail or apply to the wrong place. Always verify the patch applies cleanly
      before relying on the result.
    </p>
    <p>
      <strong>Diffing minified files.</strong> One-line minified bundles produce useless
      line-level diffs. Beautify both sides first, then diff.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compare two documents side-by-side or unified in the browser with the{" "}
      <a href="/tools/diff-checker">diff checker</a>. Pair with the{" "}
      <a href="/tools/json-diff-checker">JSON diff checker</a> when both sides are JSON and you
      need a structural comparison that ignores reordered keys, and the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to normalize both inputs before
      diffing so whitespace and key ordering do not pollute the result.
    </p>
  </>
);
