export const intro = (
  <>
    <p>
      Claude Code is Anthropic&rsquo;s terminal-native coding agent. It reads
      your entire repo, edits files, runs commands, and drives git — all from
      natural language. Powered by Claude Opus 4.7 (released April 16, 2026),
      it&rsquo;s the most capable autonomous coding agent you can actually use
      today, and in developer satisfaction surveys it sits at the top of the
      pack.
    </p>
    <p>
      This guide covers installation, your first real session, sub-agents,
      skills, and the permission model — in that order. Assumes you&rsquo;ve
      used a terminal before and have an Anthropic API key.
    </p>
  </>
);

export const body = (
  <>
    <h2>Step 1 — Install</h2>
    <p>
      Claude Code ships as an npm package. You need Node.js 18+.
    </p>
    <pre><code>{`npm install -g @anthropic-ai/claude-code`}</code></pre>
    <p>
      Then, from any project directory:
    </p>
    <pre><code>{`cd ~/code/my-project
claude`}</code></pre>
    <p>
      On first run it will ask you to log in (or paste an API key). A few
      IDE extensions wrap it — VS Code, JetBrains — but the terminal is the
      canonical surface; the wrappers just render the same session inline.
    </p>

    <h2>Step 2 — Your first session</h2>
    <p>Pick something real but bounded. Good first-session prompts:</p>
    <ul>
      <li>&ldquo;Summarise the architecture of this repo in 6 bullet points.&rdquo;</li>
      <li>&ldquo;Find dead code in /src and list it with line numbers.&rdquo;</li>
      <li>&ldquo;Add a unit test for the function in utils/date.ts.&rdquo;</li>
    </ul>
    <p>
      Don&rsquo;t start with &ldquo;refactor the whole app.&rdquo; Claude Code
      is most reliable when the scope fits in a single PR&rsquo;s worth of
      change. Large scopes should be decomposed — often into sub-agents, which
      we&rsquo;ll cover in step 5.
    </p>

    <h2>Step 3 — Understand the permission model</h2>
    <p>
      Claude Code never runs a write command without your permission. You&rsquo;ll
      see three prompts frequently:
    </p>
    <ul>
      <li>
        <strong>File write</strong> — approve, reject, or &ldquo;don&rsquo;t
        ask for this file again&rdquo; within the session.
      </li>
      <li>
        <strong>Shell command</strong> — same, but with a preview of the exact
        command.
      </li>
      <li>
        <strong>Tool use</strong> (web fetch, MCP tools) — approve or reject.
      </li>
    </ul>
    <p>
      Resist the urge to &ldquo;auto-approve everything.&rdquo; Review mode
      slows you down for about three sessions, then becomes fast muscle memory.
      It&rsquo;s also how you notice an agent about to delete the wrong
      directory, which is worth an hour of friction.
    </p>

    <h2>Step 4 — CLAUDE.md</h2>
    <p>
      In the root of your repo, create a <code>CLAUDE.md</code> file. This is
      a plain-text instruction set Claude Code reads at the start of every
      session. Put things in it that <em>you</em> wish every new dev on the
      team knew:
    </p>
    <pre><code>{`# Conventions
- TypeScript strict mode everywhere.
- Tests live next to the file: foo.ts -> foo.test.ts.
- Never commit .env files.
- Lint with 'npm run lint' before PR.

# This repo
- /app is Next.js app-router pages.
- /lib/pages.ts is the single manifest of every page.
- Changing that file triggers the full static build.`}</code></pre>
    <p>
      CLAUDE.md is how you get consistent behaviour across sessions without
      retyping the same context. It&rsquo;s also the top lever for output
      quality — vague CLAUDE.md, vague agent.
    </p>

    <h2>Step 5 — Sub-agents</h2>
    <p>
      For tasks with multiple stages (e.g. &ldquo;find this bug, fix it, write
      a test, write a changelog entry&rdquo;), Claude Code can spawn{" "}
      <strong>sub-agents</strong>. Each sub-agent runs in its own context,
      does one thing, and returns a summary to the main agent. This is the
      single biggest quality-of-life feature for long tasks — it stops the
      main session&rsquo;s context from getting cluttered with &ldquo;what was
      in that file I read twenty minutes ago.&rdquo;
    </p>
    <p>
      Create sub-agent definitions in <code>.claude/agents/</code> as Markdown
      files with a short system prompt and an allow-list. Claude Code picks
      them up automatically.
    </p>

    <h2>Step 6 — Skills</h2>
    <p>
      Skills are reusable &ldquo;recipes&rdquo; — folders under{" "}
      <code>.claude/skills/</code> with a <code>SKILL.md</code> that tells the
      agent when and how to use the skill. Use them for repeatable artefacts:
      &ldquo;when making a PR description, use this format,&rdquo; &ldquo;when
      writing release notes, do this.&rdquo; Skills beat copy-pasting a prompt
      into a new session every time.
    </p>

    <h2>Step 7 — MCP servers</h2>
    <p>
      Claude Code supports MCP — the same Model Context Protocol covered in{" "}
      <a href="/guides/how-to-connect-an-agent-to-mcp-tools">our MCP guide</a>.
      Hook up a GitHub MCP to open PRs, a Linear MCP to read issues, a Postgres
      MCP to query your dev DB. Configure them in <code>.claude/mcp.json</code>{" "}
      and allow-list the tools you want.
    </p>

    <h2>Step 8 — Budget</h2>
    <p>
      Claude Opus 4.7 is the premium model; a long agentic session can run
      $5–$15 of spend. Set a monthly cap in the Anthropic console. If you
      want cheaper iteration, configure Claude Code to fall back to Sonnet for
      routine tasks and reserve Opus for the hard ones. Also run the stuff you
      paste into it through our{" "}
      <a href="/tools/ai-token-counter">token counter</a> first so you have a
      baseline.
    </p>

    <h2>How to tell it&rsquo;s working</h2>
    <p>
      Good signs: you approve most changes on first pass, tests still green
      after edits, PR sizes are boring and focused. Bad signs: lots of
      &ldquo;let me try again,&rdquo; files touched that shouldn&rsquo;t have
      been, huge diffs. The fix is almost always a tighter CLAUDE.md and
      narrower scope, not a smarter model.
    </p>
    <p>
      Pair Claude Code with an editor-based agent like{" "}
      <a href="/guides/how-to-set-up-cursor-ai-ide">Cursor</a> for tight
      in-editor loops, and keep Claude Code for the heavy, multi-file,
      plan-and-execute work. The two complement each other — that&rsquo;s the
      workflow most developers have settled on in 2026.
    </p>
  </>
);
