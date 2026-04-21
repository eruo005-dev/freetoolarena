export const intro = (
  <>
    <p>
      Most developers use about six git commands and wing the rest. That&rsquo;s fine until
      something goes wrong and you&rsquo;re staring at a detached HEAD with uncommitted changes,
      wondering if <code>reset --hard</code> is going to delete two hours of work.
    </p>
    <p>
      This guide covers the commands that actually matter day-to-day, organized by what
      you&rsquo;re trying to do — plus the &ldquo;oh no&rdquo; recovery commands that every
      engineer needs at some point.
    </p>
  </>
);

export const body = (
  <>
    <h2>Daily-use commands</h2>

    <h3><code>git status</code></h3>
    <p>
      The command you run more than any other. Shows branch, staged vs unstaged changes, and
      untracked files. If in doubt — run <code>git status</code>.
    </p>

    <h3><code>git add -p</code></h3>
    <p>
      Interactive staging. Walks through each change and asks whether to stage it. Prevents the
      classic &ldquo;I accidentally committed my console.logs&rdquo; mistake. Use this instead of
      <code>git add .</code> as a default.
    </p>

    <h3><code>git commit -m &quot;message&quot;</code></h3>
    <p>
      Basic commit. Write clear messages — imperative mood (&ldquo;Add&rdquo; not
      &ldquo;Added&rdquo;), brief first line, blank line, then detail if needed.
    </p>

    <h3><code>git commit --amend</code></h3>
    <p>
      Edit the most recent commit. Great for typo fixes or adding a forgotten file. Don&rsquo;t
      amend commits you&rsquo;ve already pushed to shared branches — it rewrites history.
    </p>

    <h3><code>git log --oneline --graph --decorate --all</code></h3>
    <p>
      The view you actually want from <code>git log</code>. One line per commit, ASCII graph of
      branches and merges, shows all refs. Alias it to <code>git lg</code>.
    </p>

    <h3><code>git diff</code> and <code>git diff --staged</code></h3>
    <p>
      See unstaged changes (<code>git diff</code>) and staged changes (<code>git diff
      --staged</code>). Read the diff before every commit — you&rsquo;d be surprised how often it
      catches mistakes.
    </p>

    <h2>Branching</h2>

    <h3><code>git switch -c feature/name</code></h3>
    <p>
      Modern way to create and switch to a new branch (replaces <code>git checkout -b</code>).
      <code>git switch branch-name</code> to switch between existing branches.
    </p>

    <h3><code>git branch -vv</code></h3>
    <p>
      List branches with their tracking branch and how far ahead/behind. Useful when multiple
      feature branches are in flight.
    </p>

    <h3><code>git branch -d branch-name</code></h3>
    <p>
      Delete a merged branch. Use <code>-D</code> only when you&rsquo;re sure — forces deletion
      even if unmerged.
    </p>

    <h2>Syncing</h2>

    <h3><code>git fetch</code></h3>
    <p>
      Download refs from remote without merging. Check what&rsquo;s on origin before integrating.
      Safer than <code>git pull</code> when you want to know what&rsquo;s changed.
    </p>

    <h3><code>git pull --rebase</code></h3>
    <p>
      Fetch and replay your local commits on top of origin. Keeps history linear, avoids the
      &ldquo;merge commit spam&rdquo; from default <code>git pull</code>. Set as default with{" "}
      <code>git config --global pull.rebase true</code>.
    </p>

    <h3><code>git push</code> and <code>git push -u origin branch</code></h3>
    <p>
      Standard push. <code>-u</code> sets upstream on first push so future pushes know where to
      go.
    </p>

    <h2>History and rewriting</h2>

    <h3><code>git rebase -i HEAD~N</code></h3>
    <p>
      Interactive rebase — the cleanup tool. Reorder, squash, edit, or reword the last N commits
      before pushing. Essential for turning messy WIP commits into a clean PR history.
    </p>

    <h3><code>git cherry-pick &lt;sha&gt;</code></h3>
    <p>
      Apply a specific commit from another branch. Great when you need one fix from a feature
      branch without the rest.
    </p>

    <h3><code>git stash</code> / <code>git stash pop</code></h3>
    <p>
      Save uncommitted changes temporarily. Useful when switching branches urgently. Check{" "}
      <code>git stash list</code> periodically — stashes are easy to forget about.
    </p>

    <h2>Recovery (the &ldquo;oh no&rdquo; commands)</h2>

    <h3><code>git reflog</code></h3>
    <p>
      History of HEAD movements — shows everything you&rsquo;ve done, including resets and
      checkouts. If you think you&rsquo;ve lost work, this is where you look first. Almost
      nothing is truly lost in git if you act within 90 days.
    </p>

    <h3><code>git reset --soft HEAD~1</code></h3>
    <p>
      Undo the last commit but keep changes staged. The safe &ldquo;oops, let me redo that
      commit&rdquo; command.
    </p>

    <h3><code>git reset --hard HEAD</code></h3>
    <p>
      Nuclear option: discards all uncommitted changes. Only use when you&rsquo;re <em>sure</em>
      you want to throw work away. Triple-check with <code>git status</code> first.
    </p>

    <h3><code>git revert &lt;sha&gt;</code></h3>
    <p>
      Create a new commit that undoes a previous commit. Safe for shared branches because it
      doesn&rsquo;t rewrite history. Use this on main instead of <code>reset</code>.
    </p>

    <h2>Bonus: config that makes your life easier</h2>
    <p>
      Set these once and benefit every day: <code>git config --global pull.rebase true</code>,{" "}
      <code>git config --global push.autoSetupRemote true</code>,{" "}
      <code>git config --global init.defaultBranch main</code>,{" "}
      <code>git config --global rerere.enabled true</code>. Pair with our{" "}
      <a href="/guides/how-to-write-clean-code">clean code guide</a> — clean commits belong to
      clean code.
    </p>
  </>
);
