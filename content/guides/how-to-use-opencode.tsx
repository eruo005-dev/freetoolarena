import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    OpenCode is an open-source terminal AI coding agent from the sst team. It runs in your shell,
    reads and edits files in your repo, runs commands, and brings its own TUI so you can keep
    coding without leaving the terminal.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What OpenCode actually is</h2>
    <p>
      OpenCode is a standalone, model-agnostic agent. It is not a VS Code extension and it is not a
      wrapper around someone else&rsquo;s CLI. You point it at a directory, give it a task, and it
      plans, edits files, and executes shell commands inside that working tree. It supports
      Anthropic, OpenAI, Google, and local providers via their own keys or a gateway, so you pay
      the model vendor directly instead of a middleman.
    </p>

    <h2>Installing</h2>
    <pre>{`# macOS / Linux
curl -fsSL https://opencode.ai/install | bash

# or via npm
npm install -g opencode-ai`}</pre>
    <p>
      After install, run <code>opencode auth login</code> and pick a provider. Anthropic and
      OpenRouter are the two most common paths; OpenRouter is useful if you want to flip between
      Claude, GPT, and Gemini without juggling three billing dashboards.
    </p>

    <h2>A first session</h2>
    <pre>{`cd ~/code/my-app
opencode`}</pre>
    <p>
      That drops you into the TUI. Type your request in plain English &mdash; &ldquo;add a health
      check endpoint at /healthz that returns 200 and the git sha&rdquo; &mdash; and OpenCode will
      read relevant files, propose edits, and ask before running shell commands. Use <code>/model</code>{" "}
      to switch models mid-session and <code>/init</code> to have it generate an <code>AGENTS.md</code>{" "}
      that captures your build/test commands so future sessions boot faster.
    </p>

    <h2>Configuration that matters</h2>
    <p>
      Drop an <code>opencode.json</code> at the repo root to pin the default model, register MCP
      servers, and declare allowed shell commands. The biggest win is the permission config: set{" "}
      <code>permission.edit</code> to <code>ask</code> for a new codebase and <code>allow</code>{" "}
      once you trust the loop. Also add an <code>AGENTS.md</code> &mdash; OpenCode reads it
      automatically and it is how you teach the agent &ldquo;always run pnpm typecheck before you
      claim you&rsquo;re done.&rdquo;
    </p>

    <h2>Where OpenCode shines</h2>
    <p>
      Multi-file refactors where you want the agent to grep the repo, edit five files, run tests,
      and iterate until green &mdash; all without leaving tmux. The TUI&rsquo;s diff view is
      genuinely good, and because it is provider-agnostic you can keep your existing API keys. It
      also plays well with SSH sessions on a remote dev box, which is something most editor-bound
      agents handle poorly.
    </p>

    <h2>When not to reach for it</h2>
    <p>
      If your workflow is &ldquo;autocomplete while I type&rdquo; you want Copilot or Cursor
      Tab, not OpenCode. And if you hate the idea of an agent running shell commands on your
      machine, set permissions to <code>ask</code> everywhere or pick a reviewer-style tool
      instead. Finally, bills get real &mdash; a single big refactor can burn a few dollars of
      Claude Sonnet tokens, so keep an eye on the provider dashboard for the first week.
    </p>
  </>
);
