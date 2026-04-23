import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Text diffs are how developers, writers, legal teams, and
      reviewers see what actually changed. &ldquo;I updated the
      doc&rdquo; tells you nothing. A diff tells you exactly which
      words moved, which clauses were added, which numbers were
      tweaked. The difference between diff-illiterate and
      diff-fluent is hours a week in code review, contract review,
      and document review. This guide covers how diff algorithms
      work (line-based, word-based, character-based), the diff
      formats you&rsquo;ll encounter (unified, context, side-by-side),
      practical diffing for code versus prose versus contracts,
      and the tools that go beyond naive line-level comparison.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What a diff actually computes</h2>
    <p>
      A diff algorithm finds the minimum set of edits that transforms
      one string into another. &ldquo;Minimum&rdquo; is the key word —
      there are always many valid edit sequences, but the readable
      one is the shortest.
    </p>
    <p>
      <strong>Myers diff algorithm:</strong> the standard since
      1986. Used by git, most IDEs, and most online tools. Computes
      the longest common subsequence (LCS), then marks additions
      and deletions around it.
    </p>
    <p>
      <strong>Patience diff:</strong> alternative used by Bazaar and
      git (with <code>--patience</code>). Better on structured text
      like code — aligns function signatures and braces more
      intuitively.
    </p>
    <p>
      <strong>Histogram diff:</strong> git&rsquo;s default since
      2.12. Variant of patience, often the clearest for real code.
      Enable globally: <code>git config --global diff.algorithm histogram</code>.
    </p>

    <h2>Granularity — line, word, or character</h2>
    <p>
      <strong>Line-based:</strong> the default in git and most
      tools. Fast, readable, but noisy when you&rsquo;ve reformatted.
      A single wrapping change makes the whole paragraph look
      changed.
    </p>
    <p>
      <strong>Word-based:</strong> highlights which words changed
      within a line. git&rsquo;s <code>--word-diff</code> enables
      this. Much clearer for prose and contracts.
    </p>
    <p>
      <strong>Character-based:</strong> highlights exactly which
      characters flipped. Overkill for most reading; useful for
      spotting typos or non-printing character changes (smart
      quotes, non-breaking spaces).
    </p>

    <h2>Common diff formats</h2>
    <p>
      <strong>Unified diff</strong> (<code>git diff</code> default):
    </p>
    <pre>
{`@@ -10,5 +10,7 @@
 unchanged line
-deleted line
+added line 1
+added line 2
 unchanged line`}
    </pre>
    <p>
      <code>@@ -10,5 +10,7 @@</code> means &ldquo;5 lines at line 10
      in the old file correspond to 7 lines at line 10 in the new.&rdquo;
    </p>
    <p>
      <strong>Context diff</strong> (older, less common): shows 3
      lines of context with <code>!</code> markers for changes.
    </p>
    <p>
      <strong>Side-by-side diff:</strong> tools render unified diffs
      visually with old on left, new on right. Better for long
      blocks; worse for many small changes.
    </p>
    <p>
      <strong>Three-way merge diff:</strong> shows base, local, and
      remote versions when resolving conflicts. git&rsquo;s
      <code>conflictstyle=diff3</code> enables this — huge quality
      improvement over the default.
    </p>

    <h2>Diffing code — the standard workflow</h2>
    <p>
      <strong>git diff:</strong> unstaged changes vs. the index.
      <br />
      <strong>git diff --staged:</strong> staged vs. last commit.
      <br />
      <strong>git diff main..feature:</strong> branch comparison.
      <br />
      <strong>git diff commit1 commit2:</strong> between arbitrary
      commits.
    </p>
    <p>
      <strong>Ignore whitespace:</strong>{" "}
      <code>git diff -w</code> strips whitespace-only changes —
      essential when reviewing after a formatter ran.
    </p>
    <p>
      <strong>Word-level for prose:</strong>{" "}
      <code>git diff --word-diff</code>.
    </p>
    <p>
      <strong>Stat summary:</strong>{" "}
      <code>git diff --stat</code> shows files with line counts.
    </p>
    <p>
      <strong>Pickaxe:</strong>{" "}
      <code>git log -S&quot;searchterm&quot;</code> finds commits
      where that string was added or removed.
    </p>

    <h2>Diffing prose and documents</h2>
    <p>
      Code diff tools handle code well; prose diffs need different
      care.
    </p>
    <p>
      <strong>Reformatting noise:</strong> hard line-wrapping at 80
      chars makes diffs unreadable when one word changes. Prose
      should be soft-wrapped (one sentence per line or unwrapped
      entirely) to keep diffs clean.
    </p>
    <p>
      <strong>Tracked changes</strong> (Word, Google Docs): native
      diff UX for non-technical users. Good for collaborative
      editing but not round-trippable with git.
    </p>
    <p>
      <strong>Markdown diffs:</strong> treat markdown as prose for
      formatting, but validate structure changes (headings, lists)
      visually — diff tools don&rsquo;t understand markdown
      semantically.
    </p>

    <h2>Diffing contracts and legal documents</h2>
    <p>
      <strong>Redlining tools</strong> (Microsoft Word&rsquo;s
      &ldquo;Compare,&rdquo; Litera, iManage) produce a legal-style
      redline showing deletions struck through and additions
      underlined. Standard for legal review.
    </p>
    <p>
      <strong>Word-level is essential</strong> for contracts. A
      single changed word can shift liability.
    </p>
    <p>
      <strong>Formatting diffs matter less;</strong> content diffs
      matter more. Use tools that let you ignore style-only changes.
    </p>
    <p>
      <strong>Sign every redline.</strong> Best practice: circulate
      both clean and redlined versions for review. Never sign
      without the redline.
    </p>

    <h2>Common diff tools</h2>
    <p>
      <strong>git diff / git difftool:</strong> default for code.
      Configure difftool with Beyond Compare, Meld, or Delta.
    </p>
    <p>
      <strong>Delta:</strong> syntax-highlighted, readable git diff
      replacement. Install and configure{" "}
      <code>git config pager.diff delta</code>.
    </p>
    <p>
      <strong>VS Code diff viewer:</strong> side-by-side with syntax
      highlighting. Opens on branch compare or from Git tab.
    </p>
    <p>
      <strong>Beyond Compare, Meld, Kaleidoscope:</strong> dedicated
      diff apps. Heavy for casual use; powerful for complex merges.
    </p>
    <p>
      <strong>Online diff checkers:</strong> for quick ad-hoc text
      compare — don&rsquo;t upload sensitive content. Use local
      tools for anything private.
    </p>
    <p>
      <strong>diff command (Unix):</strong>{" "}
      <code>diff file1 file2</code>. Venerable, minimal.{" "}
      <code>-u</code> for unified, <code>-r</code> for recursive
      directory diff.
    </p>

    <h2>Patch files</h2>
    <p>
      A diff saved to a file is a patch. Apply with{" "}
      <code>git apply patch.diff</code> or{" "}
      <code>patch &lt; patch.diff</code>.
    </p>
    <p>
      <strong>Use cases:</strong> sharing changes without
      pushing/pulling, reviewing contributions to read-only repos,
      applying upstream fixes to forked code.
    </p>
    <p>
      <strong>Patch hygiene:</strong> patches fail when the target
      file has drifted. Small, single-purpose patches apply
      cleanly; large patches break.
    </p>

    <h2>Reading diffs efficiently</h2>
    <p>
      <strong>Deletions first:</strong> read what was removed.
      Understanding what&rsquo;s gone gives context for what&rsquo;s
      new.
    </p>
    <p>
      <strong>Context lines:</strong> expand context (<code>-U10</code>
      ) when the default 3 lines isn&rsquo;t enough. Too much
      context hides the change; too little hides the reason.
    </p>
    <p>
      <strong>Split noisy diffs:</strong> reformatting + content
      changes in one commit are unreadable. Reformat in one commit,
      change content in the next. This is not optional.
    </p>
    <p>
      <strong>Check whitespace characters:</strong> git marks
      trailing whitespace with red background. Non-breaking spaces,
      tabs-vs-spaces, Windows/Unix line endings all show up in
      diffs as mysterious changes.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Reviewing reformatted code line-by-line.</strong>
      Impossible. Pre-format, re-commit, re-review.
    </p>
    <p>
      <strong>Ignoring whitespace noise.</strong> CRLF vs LF,
      trailing whitespace, tab sizes — all hide real changes.
      Normalize line endings with{" "}
      <code>.gitattributes</code>.
    </p>
    <p>
      <strong>Pasting binary files.</strong> Diff tools can&rsquo;t
      show meaningful diffs of binary formats (images, PDFs, Word
      docs). Use format-specific tools.
    </p>
    <p>
      <strong>Using character-level diff for code review.</strong>
      Too noisy. Line-level with word-level expansion is the
      sweet spot.
    </p>
    <p>
      <strong>Skipping the word diff for prose.</strong> Line-level
      makes paragraph changes unreadable.
    </p>
    <p>
      <strong>Comparing files in different encodings.</strong>{" "}
      UTF-8 vs CP1252 makes everything look changed. Normalize
      encoding first.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compare two blocks of text instantly with the{" "}
      <a href="/tools/diff-checker">diff checker</a>. Pair with the{" "}
      <a href="/tools/word-counter">word counter</a> to see how much
      was added or removed, and the{" "}
      <a href="/tools/text-reverser">text reverser</a> for quick
      text transformations before comparing.
    </p>
  </>
);
