export const intro = (
  <>
    <p>
      CrewAI is the most approachable framework for <strong>role-based
      multi-agent systems</strong>. Instead of one giant prompt juggling a
      dozen responsibilities, you describe a small team of agents — Researcher,
      Writer, Editor — give each one tools and a goal, and let them hand work
      back and forth.
    </p>
    <p>
      This guide builds a working three-agent crew in Python, explains the
      four primitives (Agent, Task, Crew, Tool), and flags the failure modes
      you&rsquo;ll hit once you put one on a schedule. Written April 2026.
    </p>
  </>
);

export const body = (
  <>
    <h2>When to reach for CrewAI</h2>
    <p>
      CrewAI is worth it when the task <em>naturally decomposes</em> into
      specialist roles that talk to each other. Good fits: content pipelines,
      research reports, customer-onboarding flows, multi-step analyses. Bad
      fits: a single API-call task (too heavy), tight low-latency work (too
      much overhead), deeply branching logic (use LangGraph — see our{" "}
      <a href="/guides/how-to-build-a-stateful-agent-with-langgraph">LangGraph guide</a>).
    </p>

    <h2>Step 1 — Install</h2>
    <pre><code>{`python -m venv .venv && source .venv/bin/activate
pip install crewai crewai-tools`}</code></pre>
    <p>
      Set <code>OPENAI_API_KEY</code> or <code>ANTHROPIC_API_KEY</code> depending
      on the model you&rsquo;ll use. CrewAI is model-agnostic; you configure
      per-agent.
    </p>

    <h2>Step 2 — The four primitives</h2>
    <ul>
      <li>
        <strong>Agent</strong> — a role with a goal, a backstory (short!), and
        an optional list of tools.
      </li>
      <li>
        <strong>Task</strong> — a specific unit of work given to an agent, with
        an expected output format.
      </li>
      <li>
        <strong>Crew</strong> — the orchestrator. Knows the agents, the tasks,
        and the process (sequential or hierarchical).
      </li>
      <li>
        <strong>Tool</strong> — a function any agent can call. Built-ins for
        web search, file I/O, etc.
      </li>
    </ul>

    <h2>Step 3 — A three-agent crew</h2>
    <p>The canonical example: research, write, edit. Paste into <code>crew.py</code>:</p>
    <pre><code>{`from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool

search_tool = SerperDevTool()

researcher = Agent(
    role="Researcher",
    goal="Find 3 recent, credible sources on the topic.",
    backstory="You value citations and primary sources.",
    tools=[search_tool],
    verbose=True,
)

writer = Agent(
    role="Writer",
    goal="Produce a 400-word briefing from the research.",
    backstory="You write like a tired editor: short, specific, no fluff.",
    verbose=True,
)

editor = Agent(
    role="Editor",
    goal="Cut fluff, check claims, return a tightened version.",
    backstory="You hate adverbs.",
    verbose=True,
)

research_task = Task(
    description="Research: AI agent frameworks used in production in 2026.",
    agent=researcher,
    expected_output="3 source URLs with one-line summaries.",
)

write_task = Task(
    description="Draft a 400-word briefing using the research.",
    agent=writer,
    expected_output="A 400-word markdown briefing.",
    context=[research_task],
)

edit_task = Task(
    description="Edit the draft. Keep it under 400 words, no adverbs.",
    agent=editor,
    expected_output="Final briefing text.",
    context=[write_task],
)

crew = Crew(
    agents=[researcher, writer, editor],
    tasks=[research_task, write_task, edit_task],
    process=Process.sequential,
)

if __name__ == "__main__":
    result = crew.kickoff()
    print(result)`}</code></pre>

    <h2>Step 4 — Run it</h2>
    <pre><code>{`python crew.py`}</code></pre>
    <p>
      You&rsquo;ll see the agents talk to each other in the console. Each
      task&rsquo;s output flows into the next task&rsquo;s context, which is
      why <code>context=[previous_task]</code> matters — without it, the next
      agent starts from nothing.
    </p>

    <h2>Step 5 — Tighten the prompts</h2>
    <p>
      CrewAI&rsquo;s biggest trap is verbose backstories. Keep them to one or
      two sentences. A long backstory eats context and distracts the model. If
      your &ldquo;Writer&rdquo; agent is drifting, cut the backstory, not the
      goal.
    </p>

    <h2>Step 6 — Sequential vs. hierarchical</h2>
    <ul>
      <li>
        <strong>Sequential</strong> (default) — tasks run in order; each feeds
        the next. Deterministic, easy to debug.
      </li>
      <li>
        <strong>Hierarchical</strong> — a manager agent delegates tasks
        dynamically. More flexible, harder to debug. Use it only once sequential
        stops expressing the workflow.
      </li>
    </ul>

    <h2>Step 7 — Cost control</h2>
    <p>
      Every agent is a separate model call. A 3-agent sequential crew with
      retries can easily hit 15–20 turns. Before you put one on a schedule:
    </p>
    <ul>
      <li>Run once with <code>verbose=True</code> and count the turns.</li>
      <li>Estimate per-run cost with our <a href="/tools/ai-token-counter">token counter</a>.</li>
      <li>Cap <code>max_rpm</code> on the crew to avoid runaway loops.</li>
      <li>Set a per-task <code>max_iter</code> for safety.</li>
    </ul>

    <h2>Step 8 — Schedule it</h2>
    <p>
      Once the crew runs cleanly on your laptop, wrap it in a FastAPI handler,
      trigger it from a cron, or drop it into a Modal / Temporal worker. The
      agents stay the same; only the trigger changes. For long-running or
      stateful work, compare against{" "}
      <a href="/guides/how-to-build-a-stateful-agent-with-langgraph">LangGraph</a> —
      it gives you retries and state persistence that CrewAI doesn&rsquo;t.
    </p>

    <h2>Common mistakes</h2>
    <ul>
      <li>
        <strong>Too many agents.</strong> Three or four is the sweet spot. Ten
        agents = ten prompt drift sources.
      </li>
      <li>
        <strong>Overlapping roles.</strong> If &ldquo;Researcher&rdquo; and
        &ldquo;Analyst&rdquo; could be the same person, they should be.
      </li>
      <li>
        <strong>No <code>expected_output</code>.</strong> Without it, agents
        freestyle the format and the next agent struggles to parse.
      </li>
      <li>
        <strong>Using CrewAI as a chat wrapper.</strong> If the task is one
        turn, just call the model directly.
      </li>
    </ul>
  </>
);
