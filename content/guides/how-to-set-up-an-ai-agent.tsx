export const intro = (
  <>
    <p>
      &ldquo;AI agent&rdquo; has become a catch-all term, and the setup steps depend
      entirely on which kind you actually need. A Zapier workflow that summarises
      your inbox is an agent. Claude Code refactoring your codebase is an agent.
      A LangGraph state machine orchestrating five tool calls is an agent. The
      work you do to stand them up is not the same.
    </p>
    <p>
      This guide is a decision tree. In ten minutes you&rsquo;ll know which of
      four paths fits your problem, roughly what it costs, and what to read next.
      Written April 2026, against the current generation of tools (Claude Opus 4.7,
      GPT-5 class models, OpenAI AgentKit, Claude Agent SDK 0.1.48).
    </p>
  </>
);

export const body = (
  <>
    <h2>Step 1 — Name the job before naming the tool</h2>
    <p>
      Write one sentence: <em>&ldquo;I want an agent that takes X and produces Y
      without me watching.&rdquo;</em> If you can&rsquo;t finish that sentence,
      you don&rsquo;t need an agent yet — you need a prompt. Try our{" "}
      <a href="/tools/prompt-improver">prompt improver</a> and the{" "}
      <a href="/tools/ai-prompt-generator">prompt generator</a> first. Agents are
      for <strong>multi-step tasks with tool use</strong>, not single answers.
    </p>

    <h2>Step 2 — Pick the right lane</h2>
    <p>
      There are four real options in 2026. Pick the highest-level one that can
      do the job. Going lower buys flexibility but costs weeks of your time.
    </p>

    <h3>Lane A — Use a hosted agent product (1 hour)</h3>
    <p>
      For most knowledge-work tasks, the answer is <strong>ChatGPT agent mode</strong>,{" "}
      <strong>Claude&rsquo;s computer use</strong>, or a vertical product like
      Sierra, Intercom Fin, or Zapier Agents. Zero code, one configuration screen,
      live in under an hour. See our{" "}
      <a href="/guides/how-to-use-chatgpt-agent-mode">ChatGPT agent mode guide</a> —
      it covers 70% of &ldquo;please do this for me&rdquo; use cases.
    </p>

    <h3>Lane B — Use a no-code platform (1 day)</h3>
    <p>
      If the task involves glueing apps together — Slack to Gmail to a sheet —
      use <strong>Zapier Agents</strong>, <strong>n8n</strong>, or{" "}
      <strong>OpenAI&rsquo;s Agent Builder</strong>. You draw the flow, pick tools
      from a menu, and the agent runs on their infrastructure. Recurring cost,
      but you don&rsquo;t own an ops burden.
    </p>

    <h3>Lane C — Use an agent SDK (1 week)</h3>
    <p>
      If you&rsquo;re a developer and you want <em>your</em> code orchestrating
      the agent, use the <strong>OpenAI Agents SDK</strong> (<code>pip install
      openai-agents</code>) or the <strong>Claude Agent SDK</strong>
      (<code>pip install claude-agent-sdk</code>, version 0.1.48 as of March 2026).
      Both give you Agents, tools, handoffs, guardrails — and you host them
      yourself. See our{" "}
      <a href="/guides/how-to-build-an-agent-with-the-openai-agents-sdk">OpenAI SDK guide</a>{" "}
      and <a href="/guides/how-to-build-an-agent-with-the-claude-agent-sdk">Claude SDK guide</a>.
    </p>

    <h3>Lane D — Use a framework (2+ weeks)</h3>
    <p>
      For multi-agent, long-running, or stateful workflows, use{" "}
      <strong>LangGraph</strong> (stateful graphs), <strong>CrewAI</strong>{" "}
      (role-based teams), <strong>AutoGen</strong> (multi-agent conversations),
      or <strong>MetaGPT</strong> (software teams). These give the most control
      and the most rope to hang yourself with. Only pick this lane if you&rsquo;ve
      already outgrown Lane C.
    </p>

    <h2>Step 3 — Decide where it runs</h2>
    <p>
      Three choices. <strong>Hosted</strong>: the vendor runs it (ChatGPT, Claude,
      Zapier). Easiest, least flexible, per-seat or per-task pricing.{" "}
      <strong>Your laptop</strong>: run the SDK locally against an API key.
      Fastest to iterate, terrible for production. <strong>Your server</strong>:
      a small Python service on Fly, Render, or a VPS — the practical choice
      once the agent actually does useful work.
    </p>

    <h2>Step 4 — Wire it to the tools it needs</h2>
    <p>
      Almost every useful agent needs to reach outside its model: read a file,
      call an API, query a database, send a message. In 2026, the standard for
      this is <strong>MCP</strong> (Model Context Protocol). See{" "}
      <a href="/guides/how-to-connect-an-agent-to-mcp-tools">our MCP setup guide</a>{" "}
      — install a server, allow-list the tools, and the agent can use them the
      same way across Claude, OpenAI, and most frameworks. MCP is the single
      biggest quality-of-life improvement in agent engineering this year.
    </p>

    <h2>Step 5 — Start with read-only, add writes slowly</h2>
    <p>
      The single most common production failure is giving an agent write access
      too early. Begin with <em>read-only tools</em>: let it query, summarise,
      and suggest. Once you trust its judgment over ten or twenty runs, add one
      write tool at a time (send message → create draft → send draft). Every
      Claude and OpenAI SDK supports explicit allow-listing; use it.
    </p>

    <h2>Step 6 — Budget for tokens and cap them</h2>
    <p>
      An agent that loops can burn $50 in an afternoon. Before you ship, set a
      per-run token ceiling and a per-day spend cap at the provider level. Run
      your prompts through our{" "}
      <a href="/tools/ai-token-counter">AI token counter</a> so you know the
      baseline cost before you loop it 100 times.
    </p>

    <h2>Step 7 — Measure and iterate</h2>
    <p>
      Log every run: inputs, tool calls, outputs, token spend, user feedback.
      The best agents in production look boring — a narrow task, a tight tool
      set, 95%+ success, a human reviewing the 5%. The worst look impressive in
      demos and explode the first time they meet a real user.
    </p>

    <h2>The honest shortlist</h2>
    <p>
      If you asked me to pick just three places to start today: <strong>ChatGPT
      agent mode</strong> for personal research and browsing tasks,{" "}
      <strong>Claude Code</strong> for anything involving your codebase, and{" "}
      <strong>Zapier Agents</strong> for cross-app automation. Everything else
      is for when those three stop being enough.
    </p>
  </>
);
