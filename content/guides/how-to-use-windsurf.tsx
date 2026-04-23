import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Windsurf is Codeium&rsquo;s AI-native editor &mdash; a VS Code fork built around{" "}
    <strong>Cascade</strong>, an agent that reads your whole codebase, plans multi-file changes,
    and keeps itself in sync as you edit. It is the most obvious Cursor alternative and in some
    workflows feels noticeably more proactive.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Windsurf actually is</h2>
    <p>
      Windsurf is the editor; Cascade is the agent inside it. Cascade has full repo awareness
      through Codeium&rsquo;s indexer, can run terminal commands, and is designed around what
      Codeium calls &ldquo;flows&rdquo; &mdash; it watches what you do and stays collaborative
      instead of waiting for a fresh prompt each turn. Underneath, it routes to frontier models
      (Claude, GPT, Gemini) plus Codeium&rsquo;s own SWE-1 family.
    </p>

    <h2>Installing</h2>
    <p>
      Download the installer from <code>windsurf.com</code> for macOS, Windows, or Linux. Sign in
      with a Codeium account and import your VS Code settings and extensions on first launch
      &mdash; it is a fork, so almost everything carries over. The free tier gives you a generous
      autocomplete quota and a smaller Cascade credit bucket to try the agent.
    </p>

    <h2>A first session</h2>
    <p>
      Open a repo, hit <code>Cmd+L</code> to open Cascade, and describe the change: &ldquo;move
      the rate limiter out of the route handler into middleware and add a test that hits it
      thrice in a second.&rdquo; Cascade proposes a plan, touches the relevant files, runs
      commands you approve, and shows diffs inline. Use <strong>Write mode</strong> to let it
      edit freely and <strong>Chat mode</strong> to keep it read-only while you think.
    </p>

    <h2>Rules and memories</h2>
    <p>
      Drop a <code>.windsurfrules</code> at the repo root for project rules (&ldquo;we use
      Drizzle, not Prisma; always add a migration file&rdquo;) and use the global rules panel for
      personal preferences. Cascade also has a Memories system that persists facts across
      sessions &mdash; review it occasionally, because a bad memory (&ldquo;the user prefers
      callbacks over promises&rdquo;) will poison every future turn until you delete it.
    </p>

    <h2>Configuration pitfalls</h2>
    <p>
      Turn off auto-accept for shell commands until you trust Cascade with your environment; it
      will cheerfully run <code>pnpm install</code> or a migration if you let it. Pin a default
      model in settings so you are not silently bounced onto a cheaper tier mid-refactor. And
      check the index status before the first big task &mdash; Cascade is dramatically better
      once the initial repo index finishes.
    </p>

    <h2>When Windsurf shines</h2>
    <p>
      Greenfield features and non-trivial refactors where you want one tool that plans, edits,
      and runs commands with good codebase awareness. The flow-style UI is genuinely more
      ergonomic than bouncing between a chat panel and files, and the autocomplete is best-in-class
      on large repos thanks to the indexer.
    </p>

    <h2>When not to use it</h2>
    <p>
      If you are deeply wired into JetBrains shortcuts, switching editors for an agent is a big
      ask &mdash; Continue or the JetBrains AI Assistant are saner choices. Same if your company
      forbids a second editor install. And for scripted, headless agent work (CI, bots), a CLI
      like Aider or OpenCode fits better than an editor-bound tool.
    </p>
  </>
);
