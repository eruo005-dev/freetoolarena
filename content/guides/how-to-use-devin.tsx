import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Devin by Cognition is a managed autonomous software engineer. You give
    it a task in Slack, Linear, GitHub, or its own web UI, and it works in
    its own cloud workspace &mdash; planning, editing, running tests,
    opening PRs &mdash; reporting back when it&rsquo;s done or stuck. It&rsquo;s
    the most hands-off coding agent on the market, and it&rsquo;s priced
    accordingly.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Devin actually is</h2>
    <p>
      Devin is a fully hosted agent. There&rsquo;s no local install, no
      Docker image, no model to pick. Each &ldquo;session&rdquo; spins up a
      fresh cloud VM with a browser, a shell, and an editor. Devin drives
      all three. It has long-running memory per workspace, learns from
      corrections, and can run tasks in parallel. The tradeoff: you have
      less control than with OpenHands or Claude Code, and you pay for
      Cognition&rsquo;s infrastructure on top of inference.
    </p>

    <h2>Setting it up</h2>
    <p>
      Sign up at <a href="https://app.devin.ai">app.devin.ai</a>, pick a
      plan (the Core plan starts around $20/mo for pay-as-you-go ACU
      credits; Team is $500/mo with a credit bundle), and connect your
      integrations:
    </p>
    <pre>{`# Inside Devin's settings:
# 1. Connect GitHub (repo access, PR permissions)
# 2. Connect Slack or Linear (task intake)
# 3. Add any secrets the agent needs (DB URLs, API keys) to the Secrets vault
# 4. Write a "Devin Guidelines" doc describing your repo conventions`}</pre>
    <p>
      That Guidelines doc is load-bearing. Devin reads it before every
      task, the same way Claude Code reads <code>CLAUDE.md</code>.
    </p>

    <h2>Your first session</h2>
    <p>
      Click <strong>New session</strong> and write a brief: what you want,
      which repo, any constraints. Devin produces a plan &mdash; read it
      before approving. A good first task is something like &ldquo;upgrade
      the project from React 18 to React 19, update any deprecated APIs,
      keep the test suite green.&rdquo; Watch the VM stream while it works.
      You can intervene at any time with a chat message.
    </p>

    <h2>A realistic workflow</h2>
    <p>
      Devin shines for async, multi-step work. Good fits: dependency
      bumps, adding telemetry across a codebase, writing migration
      scripts, filling out test coverage, triaging Sentry errors into
      PRs. Kick off two or three sessions in parallel from Slack, get a
      coffee, come back to draft PRs ready for review. Treat each PR
      like a junior&rsquo;s work &mdash; read the diff, run it locally,
      and leave review comments. Devin responds to PR comments and pushes
      fixes the same way a human would.
    </p>

    <h2>Gotchas and limits</h2>
    <p>
      ACU (agent compute unit) burn is the main surprise. A meandering
      task can eat $10&ndash;20 of credits before you notice. Set budget
      limits in settings and cap session time. Devin is slower per task
      than running Claude Code locally &mdash; you&rsquo;re paying for the
      hands-off part, not speed. It also fails quietly on tasks that
      require ambiguous product decisions; if the &ldquo;right&rdquo;
      answer needs a human call, it will guess and you&rsquo;ll be
      rewriting the PR anyway.
    </p>

    <h2>When NOT to use it</h2>
    <p>
      Don&rsquo;t use Devin for live, interactive coding &mdash; the latency
      makes it miserable. Don&rsquo;t use it when you need to keep source
      on-prem without exception; while Cognition has enterprise options,
      default sessions run in their cloud. And don&rsquo;t use it for a
      one-line bug fix &mdash; you&rsquo;ll spend more time writing the
      brief than fixing it yourself. For cheaper self-hosted agents see
      our <a href="/guides/how-to-use-openhands">OpenHands guide</a>; for
      in-editor flow, <a href="/guides/how-to-set-up-cursor-ai-ide">Cursor</a>.
    </p>
  </>
);
