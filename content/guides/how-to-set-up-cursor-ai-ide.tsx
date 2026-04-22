export const intro = (
  <>
    <p>
      Cursor is the AI-native code editor — a VS Code fork rebuilt around an
      in-editor agent. In April 2026 it&rsquo;s the market leader for
      editor-based AI coding, reportedly closing a ~$50B valuation round and
      sitting around $2B ARR. For fast, in-flow coding — not long autonomous
      jobs — this is the tool most developers have settled on.
    </p>
    <p>
      This guide gets you from download to a productive setup in under an
      hour, and then explains the credit-pricing gotcha that burned a lot of
      people in 2025.
    </p>
  </>
);

export const body = (
  <>
    <h2>Step 1 — Install</h2>
    <p>
      Download from <a href="https://cursor.com">cursor.com</a>. macOS, Linux,
      and Windows builds. If you&rsquo;re coming from VS Code, your extensions
      and settings will import on first launch — Cursor is a fork, so 95% of
      what you know carries over.
    </p>

    <h2>Step 2 — Sign in</h2>
    <p>
      Create an account and pick a plan. Free has limited requests, Pro is the
      default paid tier, Business/Enterprise add SSO and privacy guarantees.
      If your employer has strict data-handling rules, confirm &ldquo;Privacy
      Mode&rdquo; is on before you open source code.
    </p>

    <h2>Step 3 — Index your repo</h2>
    <p>
      Open a project folder and Cursor will offer to index it. Accept.
      Indexing embeds your code so the agent can retrieve relevant files on
      demand instead of only seeing what&rsquo;s currently open. For monorepos,
      indexing takes a few minutes the first time and then updates
      incrementally.
    </p>

    <h2>Step 4 — Learn the three modes</h2>
    <p>Cursor has three main agent surfaces. Know which one to reach for:</p>
    <ul>
      <li>
        <strong>Inline edit</strong> (<code>⌘K</code> / <code>Ctrl+K</code>) —
        ask the agent to change the current selection. Best for small edits,
        renaming, &ldquo;add types here.&rdquo;
      </li>
      <li>
        <strong>Chat pane</strong> (<code>⌘L</code> / <code>Ctrl+L</code>) —
        conversational Q&amp;A over the repo. Best for &ldquo;where is X,&rdquo;
        &ldquo;explain this function.&rdquo;
      </li>
      <li>
        <strong>Agent mode</strong> — multi-file autonomous edits. Best for
        &ldquo;add a new endpoint end-to-end,&rdquo; &ldquo;implement this
        ticket.&rdquo; Approve each change before it writes.
      </li>
    </ul>

    <h2>Step 5 — Pick models per mode</h2>
    <p>
      Cursor gives you a model picker. In practice:
    </p>
    <ul>
      <li>
        <strong>Inline edits:</strong> a fast Sonnet-class model — latency
        matters, not depth.
      </li>
      <li>
        <strong>Agent mode:</strong> Claude Opus 4.7 or GPT-5 class — quality
        matters, latency less.
      </li>
      <li>
        <strong>Chat:</strong> whichever handles your codebase best. Test a few;
        switch by task.
      </li>
    </ul>

    <h2>Step 6 — Rules file</h2>
    <p>
      Create <code>.cursorrules</code> at the repo root. This is Cursor&rsquo;s
      version of a CLAUDE.md — persistent instructions the agent reads every
      session. Put style, conventions, and &ldquo;never do this&rdquo; rules
      here. Short and specific beats long and polite.
    </p>
    <pre><code>{`- TypeScript strict. No 'any' unless commented.
- Keep React components under 300 lines; split if larger.
- Prefer server components; only use 'use client' when needed.
- Don't modify files under /generated.`}</code></pre>

    <h2>Step 7 — The credit-pricing gotcha</h2>
    <p>
      Cursor moved to credit-based pricing in mid-2025. The trap: a single
      long agent run can burn through your monthly credits in one afternoon
      (there&rsquo;s a well-circulated story of a team depleting an annual
      subscription in a day). Protect yourself:
    </p>
    <ul>
      <li>
        Set a hard monthly spend cap in the account settings.
      </li>
      <li>
        Keep agent-mode tasks small. If a task needs hours of autonomy, hand
        it to Claude Code — see our{" "}
        <a href="/guides/how-to-set-up-claude-code">Claude Code setup guide</a>.
      </li>
      <li>
        For routine edits, use inline edit with a cheaper model. Save agent-mode
        for the hard cases.
      </li>
    </ul>

    <h2>Step 8 — Keyboard shortcuts worth memorising</h2>
    <ul>
      <li><code>⌘K</code> — inline edit.</li>
      <li><code>⌘L</code> — chat pane.</li>
      <li><code>⌘I</code> — agent composer.</li>
      <li><code>⌘⇧L</code> — add current file to chat context.</li>
      <li><code>@</code> in chat — reference a file, symbol, or doc.</li>
    </ul>

    <h2>The workflow most people converge on</h2>
    <p>
      Cursor for the tight in-editor loop — small edits, refactors, quick
      explanations. Claude Code for anything that needs hours of reasoning or
      a full repo sweep. ChatGPT (web) for one-off questions you don&rsquo;t
      want in your editor context. That stack — plus our{" "}
      <a href="/tools/ai-token-counter">token counter</a> to estimate what
      everything costs — is the most common setup among shipping developers
      this year.
    </p>
  </>
);
