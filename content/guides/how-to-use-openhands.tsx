import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    OpenHands (the project formerly known as OpenDevin) is an open-source
    autonomous coding agent you run yourself. You point it at a repo, give
    it a task, and it plans, edits files, runs a shell, and iterates until
    the task passes. It&rsquo;s the closest open-source equivalent to Devin,
    with the tradeoff that you provide the infrastructure and the API key.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What OpenHands actually is</h2>
    <p>
      OpenHands is a Python + TypeScript project maintained by the All Hands
      AI team and a large contributor base. It ships a web UI, a headless
      mode, and a set of agent personas (CodeActAgent is the default). The
      agent runs inside a sandboxed Docker container, which gives it a real
      shell, a browser, and a file editor without touching your host. You
      bring the LLM &mdash; it talks to Anthropic, OpenAI, Groq, local models
      via LiteLLM, or anything OpenAI-compatible.
    </p>

    <h2>Setting it up</h2>
    <p>
      The fastest path is the prebuilt Docker image. You need Docker
      Desktop (or engine + compose) and an API key for whichever model
      you plan to use.
    </p>
    <pre>{`docker run -it --rm --pull=always \\
  -e SANDBOX_RUNTIME_CONTAINER_IMAGE=docker.all-hands.dev/all-hands-ai/runtime:latest \\
  -e LOG_ALL_EVENTS=true \\
  -v /var/run/docker.sock:/var/run/docker.sock \\
  -v ~/.openhands:/.openhands \\
  -p 3000:3000 \\
  --name openhands-app \\
  docker.all-hands.dev/all-hands-ai/openhands:latest`}</pre>
    <p>
      Open <code>http://localhost:3000</code>, paste your API key on the
      settings page, pick a model (Claude Opus 4.7 and GPT-5 are the
      strongest choices), and you&rsquo;re live.
    </p>

    <h2>Your first session</h2>
    <p>
      Use the GitHub connector to pull in a repo, or mount a local folder
      with <code>-v /path/to/repo:/workspace</code>. Start with something
      contained: &ldquo;add a <code>/health</code> endpoint that returns
      <code>{`{ "ok": true }`}</code> and a passing test.&rdquo; Watch the
      event stream &mdash; you&rsquo;ll see it think, run <code>ls</code>,
      open files, make edits, run tests, and retry on failure. If it
      goes off the rails, click stop. That&rsquo;s the whole loop.
    </p>

    <h2>A realistic workflow</h2>
    <p>
      Treat OpenHands like a junior on a branch. Create a feature branch,
      write the task as a short brief (what, where, constraints, done
      criteria), and let it work. Review the diff like a PR &mdash; run
      the tests locally, skim for unrelated edits, look at the commit
      messages. For anything bigger than a couple of files, break it into
      sub-tasks and run them as separate sessions so the context stays
      tight and cheap.
    </p>

    <h2>Gotchas and limits</h2>
    <p>
      The big one is cost &mdash; an agent that loops burns tokens fast.
      Set a max-iterations cap in settings (20&ndash;40 is a reasonable
      starting ceiling) and watch your API dashboard. The Docker-in-Docker
      requirement is real; on Windows/WSL you&rsquo;ll occasionally hit
      socket permission issues &mdash; fix them by adding your user to the
      <code>docker</code> group. It also struggles on repos with no tests
      because it has no signal for &ldquo;done.&rdquo; Give it a way to
      verify its own work.
    </p>

    <h2>When NOT to use it</h2>
    <p>
      Skip OpenHands for single-file autocomplete &mdash; GitHub Copilot or
      Cursor is faster. Skip it for production incidents where you need
      deterministic edits &mdash; a human with Claude Code in the terminal
      will beat a planning agent on latency. And don&rsquo;t point it at a
      private repo full of secrets until you&rsquo;ve read the sandbox docs
      and decided whether your model provider&rsquo;s data policy matches
      your risk tolerance. For hosted alternatives without the ops work,
      see our guides on Devin and Replit Agent.
    </p>
  </>
);
