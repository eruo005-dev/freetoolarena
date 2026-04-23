import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Zed is a high-performance open-source editor written in Rust, and its Agent Panel turns it into a full AI coding workspace backed by Anthropic&rsquo;s Claude models.</p>);

export const body: ReactElement = (
  <>
    <p>Zed started life as a GPU-accelerated successor to Atom, built by the same team. In 2025 it shipped the Agent Panel, Edit Predictions, and multiplayer collaboration, putting it in direct competition with Cursor and Copilot while staying fully open source under a GPL/Apache mix.</p>
    <h2>What it is</h2>
    <p>Zed is a native desktop editor (macOS, Linux, Windows preview) that renders through its own GPUI toolkit. The Agent Panel is a chat pane wired into your workspace: it can read files, run shell commands, and apply multi-file edits through tool calls. Edit Predictions is an inline model (Zeta) that proposes the next edit as you type. Collaboration mode shares buffers and terminals in real time.</p>
    <h2>Install / sign up</h2>
    <pre>{`# macOS
brew install --cask zed

# Linux
curl -f https://zed.dev/install.sh | sh

# Sign in via GitHub at https://zed.dev
# Optional: add your own Anthropic / OpenAI key in Settings`}</pre>
    <h2>First session</h2>
    <p>Open a project folder, then hit cmd-? (or ctrl-?) to toggle the Agent Panel. Pick a model &mdash; Claude Sonnet is the default &mdash; and type a request. The agent will propose a diff you can accept hunk-by-hunk.</p>
    <pre>{`$ zed ~/code/my-app
# cmd-? opens Agent Panel
> refactor src/auth.ts to use async/await and add tests
# Zed shows a diff, you hit cmd-enter to apply`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Ask the agent to add a feature &mdash; it edits multiple files and runs the test command.</li>
      <li>2. Drop files or symbols into the chat with @ to scope context precisely.</li>
      <li>3. Use Edit Predictions (tab to accept) for line-level completions while the agent handles larger tasks.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>The built-in Zed hosted plan gives you a monthly Claude quota; heavy users should plug in their own API key under Settings &rsquo; AI to avoid throttling. Rules files (.rules at the project root) steer the agent &mdash; keep them short and specific.</p>
    <p>Windows support is still preview, so expect rough edges around PTY and file watching. Collaboration requires everyone to be signed in and on the same Zed version.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Developers who want Cursor-class agent features inside a fast, native, open-source editor, and teams that value real-time pair-programming without leaving their IDE.</p>
  </>
);
