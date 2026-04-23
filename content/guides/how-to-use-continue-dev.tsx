import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Continue is an open-source AI coding assistant that runs inside VS Code and JetBrains. It is
    the closest thing to a drop-in GitHub Copilot alternative where you own the model choice,
    the config, and can even run fully local.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Continue actually is</h2>
    <p>
      Continue ships four primitives: inline autocomplete, a chat sidebar, a quick-edit command,
      and an agent mode that can run tools. Unlike Copilot, you point it at whatever model you
      want &mdash; Claude, GPT, Gemini, DeepSeek, a local Ollama model, or a self-hosted vLLM
      endpoint &mdash; and you version-control the config.
    </p>

    <h2>Installing</h2>
    <p>
      Install <strong>Continue</strong> from the VS Code Marketplace or the JetBrains plugin
      repository. On first launch it opens a config UI; you can also edit{" "}
      <code>~/.continue/config.yaml</code> directly, which is what most power users end up doing.
      For autocomplete, a small fast model (Qwen-Coder-7B or similar on Ollama) feels better than
      a frontier model &mdash; latency matters more than IQ for that slot.
    </p>

    <h2>A first session</h2>
    <pre>{`# ~/.continue/config.yaml
models:
  - name: Claude Sonnet
    provider: anthropic
    model: claude-sonnet-4-5
    apiKey: \${ANTHROPIC_API_KEY}
  - name: Local Autocomplete
    provider: ollama
    model: qwen2.5-coder:7b
    roles: [autocomplete]`}</pre>
    <p>
      Reload the window. Hit the chat shortcut, select a block of code, ask &ldquo;why does this
      allocate twice&rdquo; and you will get an answer with the right file context attached. Use{" "}
      <code>@</code> in the chat input to pin specific files, docs, or the terminal output into
      the prompt.
    </p>

    <h2>Configuration that matters</h2>
    <p>
      The <code>config.yaml</code> is the entire product surface. Define multiple models with{" "}
      <code>roles</code> (<code>chat</code>, <code>edit</code>, <code>autocomplete</code>,{" "}
      <code>apply</code>, <code>embed</code>, <code>rerank</code>) so you can use Sonnet for chat
      and a cheap local model for inline completions. Add <code>docs</code> entries pointing at
      library docs you care about &mdash; Continue will index them and let you <code>@</code>{" "}
      reference them in prompts, which is the killer feature for unfamiliar frameworks.
    </p>

    <h2>Team workflow</h2>
    <p>
      Continue supports team configs via the Hub: one person defines the model setup, everyone
      else pulls it. This is how you avoid the Copilot problem where half the team is on a
      different model with no way to standardize. Commit a repo-level <code>.continue/</code> and
      you can ship prompt templates that encode house style.
    </p>

    <h2>When Continue shines</h2>
    <p>
      Teams that want Copilot ergonomics but need to self-host, comply with data residency rules,
      or just want to not be locked to one vendor. Also great for solo devs who want to mix a
      local autocomplete model with a cloud chat model to keep costs flat.
    </p>

    <h2>When not to use it</h2>
    <p>
      If you want a fully autonomous agent that plans multi-step changes, Continue&rsquo;s agent
      mode works but Cline and Cursor feel more polished for that flow. And the autocomplete is
      only as good as the model you wire up &mdash; plugging a frontier chat model into the{" "}
      <code>autocomplete</code> role makes typing miserable, so always use a small fast model
      there.
    </p>
  </>
);
