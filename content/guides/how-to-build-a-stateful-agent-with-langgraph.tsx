export const intro = (
  <>
    <p>
      LangGraph is a library for building <strong>stateful, long-running
      agents</strong> as explicit graphs — nodes are steps, edges are
      transitions, and there&rsquo;s a state object that carries context
      through the whole run. It&rsquo;s the framework you reach for when a
      task has branches, loops, or needs to survive a restart.
    </p>
    <p>
      This guide is a from-scratch walkthrough: install, define a graph,
      wire in tools, persist state, and run it. If you&rsquo;ve already
      tried a sequential framework like{" "}
      <a href="/guides/how-to-build-a-multi-agent-system-with-crewai">CrewAI</a>{" "}
      and hit the wall where &ldquo;what if X happens&rdquo; becomes ugly,
      LangGraph is the next step up.
    </p>
  </>
);

export const body = (
  <>
    <h2>Mental model</h2>
    <p>
      Forget &ldquo;multi-agent conversation.&rdquo; Think <em>state
      machine</em>. You define:
    </p>
    <ul>
      <li>
        <strong>A State</strong> — a typed dict that holds everything the
        agent has learned so far.
      </li>
      <li>
        <strong>Nodes</strong> — Python functions that read the state and
        return updates to it.
      </li>
      <li>
        <strong>Edges</strong> — rules for which node runs next, possibly
        conditional on the state.
      </li>
    </ul>
    <p>
      Because the state is explicit, LangGraph can checkpoint it, resume
      after a crash, retry a node, and branch — things a sequential crew
      can&rsquo;t express cleanly.
    </p>

    <h2>Step 1 — Install</h2>
    <pre><code>{`python -m venv .venv && source .venv/bin/activate
pip install langgraph langchain-openai`}</code></pre>
    <p>
      LangGraph is model-agnostic. We&rsquo;ll use OpenAI here; swap to
      Anthropic by replacing <code>langchain-openai</code> with{" "}
      <code>langchain-anthropic</code>.
    </p>

    <h2>Step 2 — Define the state</h2>
    <pre><code>{`from typing import TypedDict, Annotated, List
from operator import add

class State(TypedDict):
    question: str
    notes: Annotated[List[str], add]   # accumulates across nodes
    answer: str`}</code></pre>
    <p>
      The <code>Annotated[..., add]</code> means &ldquo;when a node returns
      <code>notes</code>, append it to the list instead of replacing.&rdquo;
      This is LangGraph&rsquo;s reducer pattern — you say <em>how</em> updates
      merge, per field.
    </p>

    <h2>Step 3 — Define two nodes</h2>
    <pre><code>{`from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-5-mini")

def research(state: State):
    prompt = f"List 3 facts relevant to: {state['question']}"
    out = llm.invoke(prompt).content
    return {"notes": [out]}

def answer(state: State):
    joined = "\\n".join(state["notes"])
    prompt = f"Using these notes:\\n{joined}\\nAnswer: {state['question']}"
    out = llm.invoke(prompt).content
    return {"answer": out}`}</code></pre>

    <h2>Step 4 — Wire the graph</h2>
    <pre><code>{`from langgraph.graph import StateGraph, START, END

builder = StateGraph(State)
builder.add_node("research", research)
builder.add_node("answer", answer)
builder.add_edge(START, "research")
builder.add_edge("research", "answer")
builder.add_edge("answer", END)
graph = builder.compile()`}</code></pre>

    <h2>Step 5 — Run it</h2>
    <pre><code>{`result = graph.invoke({"question": "Why is MCP becoming the agent tool standard?"})
print(result["answer"])`}</code></pre>
    <p>
      That&rsquo;s a working LangGraph agent. Linear, but it&rsquo;s the
      shape everything else builds on.
    </p>

    <h2>Step 6 — Add a conditional edge</h2>
    <p>
      The power of LangGraph is conditional routing. Say you only want to
      call the answer node if you got at least one note.
    </p>
    <pre><code>{`def route(state: State):
    return "answer" if state["notes"] else "research"   # loop until notes exist

builder.add_conditional_edges("research", route, {"research": "research", "answer": "answer"})`}</code></pre>
    <p>
      This is a loop — the graph will keep running <code>research</code> until
      the condition flips. Put a hard iteration cap (see step 8) so it
      can&rsquo;t run forever.
    </p>

    <h2>Step 7 — Persist state (checkpointing)</h2>
    <p>
      The killer feature. Add a checkpointer and the graph can pause, restart,
      and be inspected at any node.
    </p>
    <pre><code>{`from langgraph.checkpoint.sqlite import SqliteSaver

saver = SqliteSaver.from_conn_string("agent.sqlite")
graph = builder.compile(checkpointer=saver)

config = {"configurable": {"thread_id": "task-42"}}
graph.invoke({"question": "..."}, config=config)`}</code></pre>
    <p>
      The graph&rsquo;s state after every node is saved to SQLite (or Postgres,
      or Redis). If the process crashes, you can resume the same
      <code>thread_id</code> and pick up where it stopped. This is why
      LangGraph is the default choice for long-running workloads.
    </p>

    <h2>Step 8 — Safety rails</h2>
    <ul>
      <li>
        Cap total iterations: <code>graph.invoke(..., config={'{'}"recursion_limit": 25{'}'})</code>.
      </li>
      <li>
        Log every node with a decorator; you&rsquo;ll debug graphs three times
        more often than you expect.
      </li>
      <li>
        Budget tokens up front. Run a single end-to-end pass through our{" "}
        <a href="/tools/ai-token-counter">token counter</a> before looping it.
      </li>
      <li>
        Use LangSmith or OpenTelemetry for traces. Looking at the graph in a
        viewer is a different experience from reading logs.
      </li>
    </ul>

    <h2>When NOT to use LangGraph</h2>
    <ul>
      <li>
        Your agent is one LLM call. Just call the LLM.
      </li>
      <li>
        Your agent is a straight pipeline of 2–4 agents. Use{" "}
        <a href="/guides/how-to-build-a-multi-agent-system-with-crewai">CrewAI</a> —
        simpler mental model.
      </li>
      <li>
        You need autocomplete-in-editor help. LangGraph is an ops framework,
        not a coding assistant. Use{" "}
        <a href="/guides/how-to-set-up-cursor-ai-ide">Cursor</a> or{" "}
        <a href="/guides/how-to-set-up-claude-code">Claude Code</a>.
      </li>
    </ul>
  </>
);
