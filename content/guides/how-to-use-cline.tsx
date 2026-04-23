import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Cline (formerly Claude Dev) is an autonomous coding agent that lives in a VS Code side panel.
    It reads your files, edits them, runs terminal commands, and can drive a browser &mdash; all
    with a human-in-the-loop approval gate so you see every diff before it lands.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Cline actually is</h2>
    <p>
      Cline is a VS Code extension that wraps a frontier LLM in a tool-using agent loop. Each turn
      it picks one tool &mdash; read file, write file, run command, search, fetch URL, use a
      browser &mdash; and you approve or reject the action. The model you bring supplies the
      intelligence; Cline supplies the plumbing, a diff UI, and the permission prompts.
    </p>

    <h2>Installing</h2>
    <p>
      Install the <strong>Cline</strong> extension from the VS Code Marketplace (the publisher is
      saoudrizwan). Open the side panel, pick a provider &mdash; Anthropic, OpenRouter, AWS
      Bedrock, GCP Vertex, or a local Ollama endpoint &mdash; and paste a key. OpenRouter is the
      easy button if you want to try Claude, GPT, and Gemini without three separate accounts.
    </p>

    <h2>A first task</h2>
    <p>
      Open the Cline panel, type something concrete: &ldquo;add a{" "}
      <code>/api/users/:id</code> route with zod input validation, a happy-path test, and update
      the OpenAPI file.&rdquo; Cline will plan, list files, open the ones it needs, and propose
      edits in a diff view. Hit approve for each step, or toggle <strong>Auto-approve</strong> for
      read-only actions so it does not pause on every <code>cat</code>.
    </p>

    <h2>Plan vs Act mode</h2>
    <p>
      Plan mode is chat-only &mdash; the agent can read but not write. Use it to negotiate the
      design first (&ldquo;where should this live, which existing helper do we reuse&rdquo;) and
      then switch to Act to execute. Skipping Plan on anything non-trivial is the most common way
      Cline users burn tokens on a first draft they have to throw away.
    </p>

    <h2>Configuration that matters</h2>
    <p>
      Set <strong>Auto-approve</strong> for reads and shell commands you trust (lint, test,
      typecheck), but keep <code>rm</code>, <code>git push</code>, and writes outside the
      workspace gated. Add a <code>.clinerules</code> file &mdash; it is injected into the system
      prompt, and it is how you tell Cline &ldquo;always use pnpm, never npm&rdquo; or &ldquo;run
      our <code>make check</code> before claiming done.&rdquo; Cap context window spend via the
      model selector if you are using Sonnet on a long session.
    </p>

    <h2>When Cline shines</h2>
    <p>
      Medium-to-large features where you want an agent that can run the test suite, read the
      failure, and keep iterating &mdash; all while you review diffs visually in VS Code. The
      browser tool is genuinely useful for checking a running frontend without tab-switching.
    </p>

    <h2>When not to use it</h2>
    <p>
      If you live in JetBrains or Neovim, Cline is not for you &mdash; try Continue or Aider
      instead. It is also overkill for single-line tweaks where Copilot-style inline completion is
      faster. And watch the bill: running Claude Sonnet on a repo with a big context can cost more
      in one afternoon than a month of Copilot, so set a provider spend limit on day one.
    </p>
  </>
);
