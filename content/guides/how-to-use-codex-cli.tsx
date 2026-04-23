import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Codex CLI is OpenAI&rsquo;s open-source terminal agent: a `codex` command that edits files, runs shell commands, and reasons about code inside a sandbox.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Codex CLI gives you an agentic loop at the command line, backed by OpenAI&rsquo;s coding-tuned models. You launch `codex` in any directory, describe a task, and it reads files, proposes edits, runs commands, and iterates until the task is done or it needs your input. Unlike a chat window, it keeps execution inside a sandbox and surfaces diffs for approval before touching disk, which makes it safer to hand real work.
    </p>

    <h2>What it is</h2>
    <p>
      Codex CLI is an Apache-2.0 project from OpenAI on GitHub. It ships as an npm package and authenticates with either a ChatGPT login (tied to your plan&rsquo;s usage) or an OpenAI API key. The agent is multimodal &mdash; it can read images pasted into the terminal &mdash; and uses the Responses API under the hood. It supports MCP servers for extending tools.
    </p>

    <h2>Install</h2>
    <pre>{`# Node 20+
npm install -g @openai/codex

# first run prompts for login or API key
codex
`}</pre>

    <h2>First session</h2>
    <p>
      Run `codex` in a project directory. Pick an approval mode (suggest, auto-edit, or full-auto) and describe a task.
    </p>
    <pre>{`$ codex
&gt; Fix the failing test in tests/users.spec.ts
&rarr; reads test &rarr; greps source &rarr; proposes patch &rarr; runs npm test`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Bug triage &mdash; paste a failing CI log and let Codex reproduce and patch locally.</li>
      <li>Small features &mdash; scope a single endpoint or component and let it run in auto-edit mode.</li>
      <li>Refactors &mdash; ask for a rename or extraction, review the diff, commit.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      Full-auto mode is tempting but will happily rewrite large swaths of code if the task is vague. Use suggest mode for anything near production, and keep dirty working trees out &mdash; Codex occasionally stages changes it then undoes. Commit or stash before starting.
    </p>
    <p>
      The sandbox blocks network by default on some platforms; if your task needs npm install or a curl, enable network access explicitly for that session. A codex.md or AGENTS.md file at the repo root lets you pin conventions that apply every run.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Developers already in the OpenAI ecosystem who want a terminal-native alternative to ChatGPT&rsquo;s code interpreter, with real access to their local filesystem. Start with a test-fix task &mdash; narrow, verifiable, and a great sanity check of the tool&rsquo;s behavior.
    </p>
  </>
);
