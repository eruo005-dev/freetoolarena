import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Goose is an open-source, extensible AI agent from Block (the Square/Cash App company). It
    runs on your machine, speaks MCP natively, and is designed so you can plug in new tools
    &mdash; GitHub, a browser, a database, your own scripts &mdash; and have the agent use them
    without custom glue.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Goose actually is</h2>
    <p>
      Goose is a local agent you drive from either a desktop app or a CLI. It connects to any
      LLM provider (Anthropic, OpenAI, Google, Databricks, Ollama, OpenRouter, and more) and uses{" "}
      <strong>extensions</strong> &mdash; MCP servers, effectively &mdash; to gain capabilities.
      The developer extension ships by default and gives it a shell, file editor, and text
      tools; everything else is opt-in.
    </p>

    <h2>Installing</h2>
    <pre>{`# macOS / Linux CLI
curl -fsSL https://github.com/block/goose/releases/download/stable/download_cli.sh | bash

# or install the Desktop app from block.github.io/goose`}</pre>
    <p>
      Run <code>goose configure</code> once to pick a provider and model, then{" "}
      <code>goose session</code> to start talking. The desktop app wraps the same engine with a
      chat UI, extension toggles, and a log viewer; under the hood both share the same sessions.
    </p>

    <h2>A first session</h2>
    <pre>{`cd my-project
goose session --name refactor-auth`}</pre>
    <p>
      Describe the task: &ldquo;audit how we pass the session token, move it to an httpOnly
      cookie, and update the two fetch helpers that read it from localStorage.&rdquo; Goose will
      grep, edit, run tests via the developer extension, and keep going until the task is done or
      it hits a tool error. Named sessions mean you can <code>goose session --resume</code> the
      next morning and pick up with full history.
    </p>

    <h2>Extensions and recipes</h2>
    <p>
      The real power is extensions. Add the GitHub MCP to let Goose open PRs, the Playwright MCP
      for browser automation, a Postgres MCP for schema work, or point it at your own internal
      MCP server. <strong>Recipes</strong> are YAML files that predefine the provider, extensions,
      and a starting prompt &mdash; version them in your repo so teammates launch the same agent
      shape with one command.
    </p>

    <h2>Configuration pitfalls</h2>
    <p>
      Goose runs real commands on your machine, so the developer extension is effectively root-in-your-workspace.
      Use a project directory you are happy to blow away, or sandbox with a devcontainer on first
      contact. Also watch the context: Goose will happily pull in large files &mdash; set{" "}
      <code>GOOSE_MAX_TURNS</code> or use the <code>lead/worker</code> model split so a cheap
      model handles the long-running grunt work and only the planner uses your premium tokens.
    </p>

    <h2>When Goose shines</h2>
    <p>
      Ops-flavored work where you want one agent to touch git, files, a database, and a browser
      in the same session. Also a strong pick if you are MCP-curious, since the ecosystem is
      native rather than bolted on.
    </p>

    <h2>When not to use it</h2>
    <p>
      If you want tight IDE integration with inline diffs and click-to-approve, Cline or
      Windsurf feel more polished. Goose is a terminal-and-window tool first; the editor
      experience is intentionally not the focus. And the docs move quickly &mdash; pin a version
      for team use instead of chasing <code>stable</code>.
    </p>
  </>
);
