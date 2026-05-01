import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Anthropic Skills launched late 2025 as the answer to ChatGPT&rsquo;s Custom GPTs &mdash; reusable, packaged
    behaviors for Claude. By 2026 they ship with Claude.ai, Claude Desktop, and Claude Code. Here&rsquo;s the model.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What a Skill is</h2>
    <p>
      A directory with a <code>SKILL.md</code> file that defines a specific behavior + trigger keywords + optional
      tool access. When Claude detects the trigger condition, it loads the skill instructions and follows them.
    </p>
    <h2>Where Skills run</h2>
    <ul>
      <li><strong>Claude.ai web</strong> &mdash; user-loadable Skills.</li>
      <li><strong>Claude Desktop</strong> &mdash; local Skills with filesystem access.</li>
      <li><strong>Claude Code</strong> &mdash; project Skills in <code>.claude/skills/</code>.</li>
      <li><strong>Anthropic API (Managed Agents)</strong> &mdash; embedded in agent flows.</li>
    </ul>
    <h2>Anatomy of a Skill</h2>
    <pre className="rounded bg-slate-900 p-3 text-xs text-slate-100"><code>{`---
name: review-pr
description: Review a pull request for safety, performance, style. Use when asked to "review PR" or "code review".
---
# Instructions
1. Read the PR diff and surrounding context.
2. Flag: bugs, security issues, perf regressions, style violations.
3. Output a structured review with severity ratings.

# Examples
[1-2 ideal example reviews]`}</code></pre>
    <h2>Skills vs Custom GPTs</h2>
    <ul>
      <li><strong>Skills:</strong> markdown-defined, version-controlled in git, work in terminal.</li>
      <li><strong>Custom GPTs:</strong> public marketplace, custom Actions for third-party APIs, no terminal version.</li>
      <li><strong>Pick Skills</strong> for code-heavy or terminal-driven workflows; <strong>Custom GPTs</strong> for
        public-facing AI tools.</li>
    </ul>
    <h2>The 2026 Skill ecosystem</h2>
    <p>
      Anthropic ships ~30 official Skills (slack-gif-creator, theme-factory, doc-coauthoring, mcp-builder, etc.).
      Hundreds more in plugin marketplaces. The Skill+plugin combination is rapidly becoming the default Claude
      Desktop / Claude Code workflow.
    </p>
  </>
);
