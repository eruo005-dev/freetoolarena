import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Warp is a Rust-built terminal that treats every command as a structured block and layers an AI agent on top, so you can describe what you want in English and have it run, explain, or script the result.</p>);

export const body: ReactElement = (
  <>
    <p>Warp started as a reimagined terminal with IDE-style editing and shareable blocks, then in 2024&ndash;2025 it pivoted hard into Agent Mode &mdash; a terminal that can plan, run, and review shell work on your behalf while still giving you the raw pty underneath.</p>
    <h2>What it is</h2>
    <p>Each command in Warp is a block: input, output, exit code, and metadata. The AI sits beside the prompt &mdash; press # or ctrl-\` to ask questions, and switch to Agent Mode to let Warp execute multi-step tasks. It also ships Workflows (parameterised command snippets) and a team-shared Notebook for runbooks.</p>
    <h2>Install / sign up</h2>
    <pre>{`# macOS
brew install --cask warp

# Linux (Debian/Ubuntu)
curl -fsSL https://app.warp.dev/linux-deb.sh | sh

# Windows
winget install Warp.Warp

# Sign in at https://app.warp.dev to unlock AI features`}</pre>
    <h2>First session</h2>
    <p>Open Warp and hit # to type a natural-language request. Warp suggests a command, shows a dry explanation, and waits for you to press enter. Agent Mode (cmd-I) goes further: it plans steps, runs them, reads output, and iterates.</p>
    <pre>{`$ # find all log files over 100MB modified this week
  find . -type f -name "*.log" -size +100M -mtime -7
# press enter to run, or tab to edit first`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Use Agent Mode to debug a failing CI job &mdash; it reads the error, proposes a fix, and re-runs.</li>
      <li>2. Save reusable Workflows for k8s, docker, or git rituals your team repeats daily.</li>
      <li>3. Pipe a block into &ldquo;Explain output&rdquo; to get a plain-English summary of stack traces or long logs.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Warp sends command context to its cloud for AI features; enterprise plans offer zero-retention and BYO-key if that matters. Turn on command redaction in Settings to strip tokens before anything leaves your machine.</p>
    <p>Agent Mode is powerful but not infallible &mdash; keep destructive commands (rm, DROP, terraform apply) gated behind the confirm prompt, which is on by default. If zsh plugins misbehave, try Warp&rsquo;s built-in shell mode before blaming the agent.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Terminal-heavy engineers, SREs, and DevOps folks who want a modern CLI experience plus an AI collaborator that actually understands shell semantics.</p>
  </>
);
