import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Picking an AI coding assistant in 2026 is a real decision &mdash; the gaps between Cursor,
    Copilot, Claude Code, and Windsurf are bigger than they look from the marketing pages. Here&rsquo;s
    how to pick correctly the first time, with the questions that actually matter.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Three questions that decide the answer</h2>
    <ol>
      <li><strong>Do you commit to one IDE?</strong> If yes &rarr; Cursor or Windsurf is fine. If no
        (you bounce between VS Code and JetBrains, or use Vim) &rarr; Copilot.</li>
      <li><strong>Is your work mostly inline edits or mostly multi-file refactors?</strong> Inline
        &rarr; Copilot or Cursor Tab. Multi-file &rarr; Claude Code.</li>
      <li><strong>What&rsquo;s your monthly budget?</strong> $10 &rarr; Copilot. $20 &rarr; one of
        Cursor / Claude Pro. $40+ &rarr; both.</li>
    </ol>

    <h2>The honest 2026 ranking</h2>
    <ul>
      <li><strong>Best autocomplete:</strong> Cursor Tab (slightly ahead of Copilot in 2026).</li>
      <li><strong>Best agent / multi-file:</strong> Claude Code.</li>
      <li><strong>Best multi-IDE:</strong> Copilot.</li>
      <li><strong>Best agent UX in IDE:</strong> Windsurf Cascades.</li>
      <li><strong>Best for solo founders + indie hackers:</strong> Cursor Pro alone.</li>
      <li><strong>Cheapest:</strong> Copilot Pro at $10/mo or Continue.dev (free, BYO API).</li>
    </ul>

    <h2>Free tier worth knowing</h2>
    <ul>
      <li><strong>GitHub Copilot Free</strong> &mdash; 50 chat messages, 2k completions/mo. Genuine
        productivity for occasional users.</li>
      <li><strong>Cursor free</strong> &mdash; 2-week Pro trial, then degraded but usable free
        tier with slow requests.</li>
      <li><strong>Continue.dev</strong> &mdash; free OSS plugin, plug in your own API keys.</li>
      <li><strong>Claude.ai web</strong> &mdash; not in your IDE, but free for chat-driven coding.</li>
    </ul>

    <h2>The 5-minute decision tree</h2>
    <ul>
      <li>I write Python all day &rarr; <strong>Cursor Pro + Claude Code</strong>.</li>
      <li>I write JS/TS in a big monorepo &rarr; <strong>Cursor Pro</strong> alone.</li>
      <li>I work in JetBrains &rarr; <strong>Copilot</strong> (Cursor isn&rsquo;t available).</li>
      <li>I&rsquo;m an indie / solo dev refactoring my own codebase &rarr; <strong>Claude Code</strong>
        (bundled with Claude Pro).</li>
      <li>I&rsquo;m on a team and IT picks one &rarr; <strong>Copilot Business</strong> or{" "}
        <strong>Cursor Business</strong>.</li>
      <li>I want to spend $0 &rarr; <strong>Continue.dev</strong> + Claude.ai free for chat.</li>
    </ul>

    <h2>Don&rsquo;t pick wrong</h2>
    <p>
      The biggest mistake: picking by &ldquo;which has the best model&rdquo; when models change
      every quarter and all flagship harnesses route to the same Claude Sonnet 4.6 / GPT-5 anyway.
      Pick by harness UX, IDE coverage, and price point. The model under the hood is mostly
      interchangeable.
    </p>
    <p>
      Use the <a href="/tools/ai-coding-tool-cost-comparison">AI coding tool cost comparison</a>
      for the full $/seat math. Compare:{" "}
      <a href="/compare/claude-code-vs-cursor">Claude Code vs Cursor</a>,{" "}
      <a href="/compare/cursor-vs-github-copilot">Cursor vs Copilot</a>.
    </p>
  </>
);
