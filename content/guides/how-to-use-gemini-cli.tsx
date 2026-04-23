import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Gemini CLI is Google&rsquo;s open-source terminal agent that puts Gemini&rsquo;s 1M-token context window behind a single `gemini` command.
  </p>
);

export const body: ReactElement = (
  <>
    <p>
      Gemini CLI is Google&rsquo;s answer to terminal-first AI tools like Claude Code and Codex CLI. You install it once, sign in with a personal Google account, and get access to Gemini 2.5 Pro with a generous free tier of requests per day and minute. It reads files, runs shell commands, edits code, and can pull in web search and the full 1M-token context window for questions that span a whole repo or long documents.
    </p>

    <h2>What it is</h2>
    <p>
      Gemini CLI is an Apache-2.0 project from Google on GitHub. It ships as an npm package (gemini-cli) and runs on Node. Authentication is either a personal Google sign-in for the free tier, or an API key via Google AI Studio / Vertex AI for higher limits and team usage. It follows the Model Context Protocol, so MCP servers plug in as tools.
    </p>

    <h2>Install</h2>
    <pre>{`# Node 20+
npm install -g @google/gemini-cli

# first run triggers login
gemini
`}</pre>

    <h2>First session</h2>
    <p>
      Run `gemini` in any project directory. The REPL opens, reads a GEMINI.md file if present, and waits for a task.
    </p>
    <pre>{`$ cd my-repo && gemini
&gt; Summarize how auth is wired in this repo
&rarr; grep, read files, cite paths, answer`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Codebase questions &mdash; point it at a large repo and ask architectural questions; 1M context shines here.</li>
      <li>Scripted refactors &mdash; let it edit files in place, review the diff, commit.</li>
      <li>Research &mdash; built-in Google Search grounds answers in live links instead of stale training data.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      Free-tier rate limits are per-minute and per-day, so long tool-heavy tasks can stall. If you hit the ceiling, switch to an API key or drop to Gemini 2.5 Flash for the cheap iterations. The CLI respects a .gitignore-style pattern file to keep sensitive paths out of context.
    </p>
    <p>
      Context compaction runs automatically on long sessions, but you can force it with /compress. Drop a GEMINI.md at the project root with conventions, test commands, and taboo files &mdash; it is loaded on every session and is the easiest way to get consistent output.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Developers who want a free, open-source terminal agent with a very large context window, and who are fine living inside Google&rsquo;s model family. Start on a read-only task to get a feel for the tool-use loop before letting it edit files.
    </p>
  </>
);
