export const intro = (
  <>
    <p>
      The OpenAI Agents SDK is the production successor to the old Swarm
      experiments — a small, sharp Python and TypeScript library for building
      agents that use tools, hand off to other agents, and run inside a sandbox.
      It&rsquo;s what you reach for when ChatGPT agent mode stops being enough
      and you want <em>your code</em> orchestrating the model.
    </p>
    <p>
      This guide walks from <code>pip install</code> to a working agent that
      does something real, with the four primitives you actually need in April
      2026: Agents, Tools, Handoffs, Guardrails.
    </p>
  </>
);

export const body = (
  <>
    <h2>Prerequisites</h2>
    <ul>
      <li>Python 3.10 or newer.</li>
      <li>An OpenAI API key (<code>OPENAI_API_KEY</code>) with billing set up.</li>
      <li>A spend cap on the key. Set it before you write a line of code.</li>
    </ul>

    <h2>Step 1 — Install the SDK</h2>
    <pre><code>{`python -m venv .venv
source .venv/bin/activate   # Windows: .venv\\Scripts\\activate
pip install openai-agents`}</code></pre>
    <p>
      The package name is <code>openai-agents</code>. Don&rsquo;t confuse it
      with the older <code>openai</code> core library — you&rsquo;ll use both.
    </p>

    <h2>Step 2 — The smallest working agent</h2>
    <p>Paste this into <code>agent.py</code>:</p>
    <pre><code>{`from agents import Agent, Runner

agent = Agent(
    name="Tutor",
    instructions="You are a patient tutor. Answer in <= 3 sentences.",
)

if __name__ == "__main__":
    result = Runner.run_sync(agent, "Explain eigenvectors like I'm 12.")
    print(result.final_output)`}</code></pre>
    <p>
      Run with <code>python agent.py</code>. If it prints an explanation,
      you&rsquo;re done with step 2 — the SDK, the key, and the model are all
      wired up.
    </p>

    <h2>Step 3 — Add a tool</h2>
    <p>
      Tools are functions the agent can call. Decorate them with{" "}
      <code>@function_tool</code> and they show up in the model&rsquo;s function
      list automatically.
    </p>
    <pre><code>{`from agents import Agent, Runner, function_tool

@function_tool
def word_count(text: str) -> int:
    """Count words in a string."""
    return len(text.split())

agent = Agent(
    name="Editor",
    instructions="When asked about length, call word_count.",
    tools=[word_count],
)`}</code></pre>
    <p>
      Run it on <em>&ldquo;How long is &lsquo;the quick brown fox&rsquo;?&rdquo;</em>.
      The model decides to call <code>word_count</code>, the SDK runs the
      Python, the result flows back into the conversation.
    </p>

    <h2>Step 4 — Add a handoff</h2>
    <p>
      Handoffs let an agent delegate to a specialist. Instead of one giant
      prompt, you compose small agents.
    </p>
    <pre><code>{`from agents import Agent

math_agent = Agent(name="Math", instructions="Solve step-by-step.")
writing_agent = Agent(name="Writing", instructions="Edit for clarity.")

triage = Agent(
    name="Triage",
    instructions="Hand off to math for math, writing for prose.",
    handoffs=[math_agent, writing_agent],
)`}</code></pre>
    <p>
      The triage agent reads the user&rsquo;s message, decides which specialist
      to invoke, and the SDK transfers the conversation. You debug each
      specialist in isolation — this is the biggest reason to use the SDK over
      a single mega-prompt.
    </p>

    <h2>Step 5 — Add a guardrail</h2>
    <p>
      Guardrails are validators the SDK runs on inputs and outputs.
    </p>
    <pre><code>{`from agents import input_guardrail, GuardrailFunctionOutput

@input_guardrail
def no_secrets(ctx, agent, input_str):
    banned = ("api_key", "password", "ssn")
    tripped = any(b in input_str.lower() for b in banned)
    return GuardrailFunctionOutput(
        output_info={"flagged": tripped},
        tripwire_triggered=tripped,
    )`}</code></pre>
    <p>
      Attach it to your agent with{" "}
      <code>Agent(&hellip;, input_guardrails=[no_secrets])</code>. If the
      guardrail trips, the SDK raises before the model ever sees the prompt —
      cheap, fast, and logged.
    </p>

    <h2>Step 6 — Sandbox code and file work</h2>
    <p>
      The April 2026 Agents SDK ships with a <strong>model-native harness</strong>
      — the agent can inspect files, edit them, run shell commands, and iterate
      on long-horizon tasks inside a sandbox your process controls. This is the
      feature to use when you&rsquo;re tempted to give an agent raw shell
      access: don&rsquo;t, use the harness instead.
    </p>

    <h2>Step 7 — Deploy</h2>
    <p>
      The same Python file runs on your laptop, on Fly.io, on a VPS, in Lambda.
      Wrap it in a FastAPI handler for a webhook, a scheduled job for a cron,
      or a CLI for humans. The SDK stays the same — that&rsquo;s the point of
      it being lightweight.
    </p>

    <h2>Pitfalls I&rsquo;ve seen</h2>
    <ul>
      <li>
        <strong>Giant single agents.</strong> Break them up with handoffs early.
        Debugging a 600-line system prompt is misery.
      </li>
      <li>
        <strong>Tools that do five things.</strong> Keep each tool to one
        responsibility — the model picks them better.
      </li>
      <li>
        <strong>No token cap.</strong> Set{" "}
        <code>max_turns</code> on the runner. An infinite-loop agent at 3am is
        an expensive learning experience.
      </li>
    </ul>

    <p>
      Once you&rsquo;re comfortable, compare the flow to{" "}
      <a href="/guides/how-to-build-an-agent-with-the-claude-agent-sdk">
        the Claude Agent SDK
      </a>{" "}
      — same primitives, different model strengths, and MCP as the tool standard.
      Also run your prompts through our{" "}
      <a href="/tools/ai-token-counter">token counter</a> so you know what
      each turn costs before you put the thing on a cron.
    </p>
  </>
);
