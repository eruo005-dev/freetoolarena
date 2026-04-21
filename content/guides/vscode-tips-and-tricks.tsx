export const intro = (
  <>
    <p>
      VS Code is the editor most developers settle on — free, fast, and configurable to
      death. But most people use maybe 10% of what it can do. Learning the keyboard
      shortcuts, extensions, and workflow tricks below will make you measurably faster.
    </p>
    <p>
      Below are the tips that actually matter — the ones experienced devs use every day.
    </p>
  </>
);

export const body = (
  <>
    <h2>1. Learn the command palette</h2>
    <p>
      Cmd/Ctrl + Shift + P opens the command palette. Literally every feature in VS Code
      is reachable from here. Stop hunting through menus. If you remember one shortcut,
      make it this one.
    </p>

    <h2>2. Quick file jump</h2>
    <p>
      Cmd/Ctrl + P jumps to any file by name. Fuzzy-matched. Much faster than clicking
      through the file tree. Combine with &ldquo;@&rdquo; to jump to a symbol,
      &ldquo;:&rdquo; to jump to a line.
    </p>

    <h2>3. Multi-cursor editing</h2>
    <p>
      Alt + click to add cursors. Cmd/Ctrl + D selects the next occurrence of the current
      word (keep pressing to add more). This is the single biggest time-saver for
      repetitive edits and refactors.
    </p>

    <h2>4. Integrated terminal</h2>
    <p>
      Ctrl + ` opens a terminal right in VS Code. Split panes, run tests, tail logs — all
      without leaving the editor. You can even have multiple terminals for dev server,
      tests, and git.
    </p>

    <h2>5. Source control panel</h2>
    <p>
      Cmd/Ctrl + Shift + G opens git integration. Stage hunks, write commit messages, see
      diffs inline. For 80% of git work, you don&rsquo;t need the CLI. Keep the CLI for
      rebases and tricky operations.
    </p>

    <h2>6. Must-have extensions</h2>
    <p>
      ESLint, Prettier, GitLens, Error Lens, Path Intellisense. That&rsquo;s the core
      starter pack. Add language-specific ones (Python, Go, Rust) as needed. Don&rsquo;t
      install 50 extensions — they slow the editor down.
    </p>

    <h2>7. Code snippets</h2>
    <p>
      Type a snippet prefix (like &ldquo;log&rdquo; for console.log) and hit Tab. Create
      your own snippets via Preferences &gt; User Snippets. Saves a surprising amount of
      typing over a week.
    </p>

    <h2>8. Zen mode</h2>
    <p>
      Cmd/Ctrl + K Z hides everything but your code. Great for focused deep work. Hit it
      when you need to stop noticing notifications and just write code.
    </p>

    <h2>9. Settings sync</h2>
    <p>
      Built in. Sign in with GitHub, all your extensions/settings/keybindings sync across
      machines. Set it once, never configure a fresh install again.
    </p>

    <h2>10. Format on save</h2>
    <p>
      Enable &ldquo;Editor: Format On Save&rdquo; and pair with Prettier/Black/gofmt. Never
      think about code style again. Your team&rsquo;s PRs get cleaner overnight.
    </p>

    <h2>11. Go to definition / references</h2>
    <p>
      F12 jumps to definition. Shift + F12 lists references. Hover for docs. These three
      are the foundation of reading an unfamiliar codebase fast. Works even better with
      a language server installed.
    </p>

    <h2>12. Stop using the mouse</h2>
    <p>
      Seriously. Tab navigation (Cmd/Ctrl + Tab), split editors (Cmd/Ctrl + \), breadcrumbs.
      Every time you reach for the mouse, there&rsquo;s a shortcut you haven&rsquo;t
      learned yet. See <a href="/guides/how-to-learn-coding-fast">how to learn coding
      fast</a> for the broader productivity mindset, and <a href="/guides/how-to-write-clean-code">
      clean code habits</a> once your editor is dialed in.
    </p>

    <h2>Minimal config to steal</h2>
    <p>
      Format on save: on. Auto save: on focus change. Tab size: 2. Trim trailing
      whitespace: on. Confirm delete: off. These 5 settings alone will pay for themselves
      within a week of use.
    </p>
  </>
);
