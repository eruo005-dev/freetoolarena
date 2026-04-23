import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Replit Agent builds working apps from a prompt, entirely in the
    browser. You describe the app, it scaffolds the code, installs
    dependencies, runs it, and hands you a live URL &mdash; no laptop
    setup, no deploy pipeline. It&rsquo;s aimed at founders, designers,
    and engineers who want a prototype in front of users the same day.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Replit Agent actually is</h2>
    <p>
      Replit Agent is the AI builder layered on top of Replit&rsquo;s
      browser-based IDE. Under the hood it uses frontier models (Claude
      and GPT-class) driving a planner that can create files, run the
      shell, install packages, wire up a Postgres database, set
      environment variables, and deploy. The output is a real Replit
      workspace you can keep editing by hand or by chat.
    </p>

    <h2>Setting it up</h2>
    <p>
      Sign in at <a href="https://replit.com">replit.com</a>. Agent is
      included with the Replit Core plan (around $20/mo) with a monthly
      credit allowance; pay-as-you-go credits are available above that.
      No install step &mdash; just click <strong>Create App</strong> and
      pick the Agent flow.
    </p>
    <pre>{`# No CLI install needed. Optional local connection:
npm install -g @replit/cli
replit login
replit connect   # open current folder as a Replit workspace`}</pre>

    <h2>Your first session</h2>
    <p>
      On the Agent start screen, write a prompt like: &ldquo;A Next.js app
      that lets a user paste a URL and get back a markdown summary. Use
      the OpenAI API, store history in Postgres, deploy it.&rdquo; Agent
      proposes a plan &mdash; framework, schema, routes. Approve it and
      watch it build. You&rsquo;ll get a running preview in a couple of
      minutes; a deploy link follows if you ask for one.
    </p>

    <h2>A realistic workflow</h2>
    <p>
      Treat Agent like a scaffolder plus a pair programmer. Use it to get
      from zero to a working skeleton, then drop into the editor (or
      connect Cursor via SSH) for the detailed work. Iterate by chat for
      feature-level changes (&ldquo;add email login&rdquo;), by hand for
      polish. Replit&rsquo;s built-in Postgres, object storage, secrets,
      and one-click deploy cover most small-app needs without leaving the
      tab.
    </p>

    <h2>Gotchas and limits</h2>
    <p>
      Credits disappear fast if you let Agent run wild &mdash; a single
      &ldquo;rebuild the app&rdquo; prompt can chew through several
      dollars. Be specific and incremental. The stack is whatever Agent
      picks; it favours Node, Python, and Next.js, and gets shakier with
      Rust, Go, or anything requiring system packages. Generated code
      quality is fine for prototypes but you&rsquo;ll still refactor
      before production &mdash; expect duplicated logic, thin tests, and
      the occasional hardcoded secret in a file you need to clean out.
    </p>

    <h2>When NOT to use it</h2>
    <p>
      Skip Replit Agent for existing large codebases &mdash; it&rsquo;s
      tuned for greenfield, not for navigating a ten-year-old monorepo.
      Skip it for regulated environments where source and data must stay
      on your infrastructure. And skip it if you already have a local
      setup you like &mdash; the value is &ldquo;no laptop needed&rdquo;;
      if your laptop&rsquo;s open anyway, <a href="/guides/how-to-use-bolt-new">Bolt.new</a>,{" "}
      <a href="/guides/how-to-use-v0-by-vercel">v0</a>, or plain{" "}
      <a href="/guides/how-to-set-up-claude-code">Claude Code</a> will
      usually give you tighter output.
    </p>
  </>
);
