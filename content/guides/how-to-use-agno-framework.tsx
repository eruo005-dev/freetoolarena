import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Agno &mdash; formerly known as Phidata &mdash; is a Python
    framework for building multi-agent systems. It gives you a
    batteries-included <code>Agent</code> class with memory, tools,
    knowledge bases, and a team abstraction that lets several agents
    hand off work to each other. If you want to ship an agent to
    production without wiring vector stores and message history
    yourself, Agno removes most of the boilerplate.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Agno actually is</h2>
    <p>
      Agno is a single-import framework that bundles: an agent loop
      with tool calling, pluggable memory (SQLite, Postgres,
      MongoDB), pluggable vector knowledge (PgVector, LanceDB, Chroma,
      Pinecone), model-provider adapters, and a
      <code> Team</code> primitive for orchestrating multiple agents
      in coordinated, collaborate, or route modes. It also ships a
      local playground UI so you can chat with your agents without
      building a frontend.
    </p>
    <p>
      Compared to LangChain, Agno is smaller and more
      convention-driven &mdash; fewer ways to do the same thing.
      Compared to CrewAI, it has stronger first-class memory and
      knowledge support and feels less framework-y.
    </p>

    <h2>Installing</h2>
    <pre>{`pip install -U agno

# Common extras you'll actually use
pip install openai duckduckgo-search yfinance lancedb`}</pre>
    <p>
      Agno itself stays lean; each tool and storage backend is an
      optional dependency you install as needed. Export
      <code> OPENAI_API_KEY</code> (or whichever provider) before
      running.
    </p>

    <h2>First working example</h2>
    <pre>{`from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.duckduckgo import DuckDuckGoTools

agent = Agent(
    model=OpenAIChat(id="gpt-4o-mini"),
    tools=[DuckDuckGoTools()],
    description="You are a news analyst. Cite sources with URLs.",
    markdown=True,
)

agent.print_response(
    "What happened with EU AI Act enforcement this week?",
    stream=True,
)`}</pre>
    <p>
      One agent, one tool, streamed to stdout with Markdown
      rendering. The <code>print_response</code> helper is for quick
      iteration; in production you&rsquo;ll use
      <code> agent.run()</code> which returns a
      <code> RunResponse</code> with the text, messages, and tool
      trace.
    </p>

    <h2>A real workflow &mdash; a team with memory and knowledge</h2>
    <pre>{`from agno.agent import Agent
from agno.team import Team
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from agno.knowledge.pdf_url import PDFUrlKnowledgeBase
from agno.vectordb.lancedb import LanceDb
from agno.storage.sqlite import SqliteStorage

kb = PDFUrlKnowledgeBase(
    urls=["https://example.com/10-k.pdf"],
    vector_db=LanceDb(table_name="filings", uri="tmp/lancedb"),
)
kb.load(recreate=False)

researcher = Agent(
    name="Researcher",
    model=OpenAIChat(id="gpt-4o"),
    knowledge=kb,
    search_knowledge=True,
    role="Answer questions about the 10-K filing.",
)

analyst = Agent(
    name="Analyst",
    model=OpenAIChat(id="gpt-4o"),
    tools=[YFinanceTools(stock_price=True, company_info=True)],
    role="Pull live market data and combine with research findings.",
)

team = Team(
    name="Equity Desk",
    members=[researcher, analyst],
    mode="coordinate",
    storage=SqliteStorage(table_name="team", db_file="tmp/team.db"),
)

team.print_response("Is AAPL's current price consistent with its latest 10-K guidance?")`}</pre>
    <p>
      The <code>coordinate</code> mode lets a team leader route sub-
      tasks to members and assemble a final answer. SQLite storage
      persists sessions across restarts so the team remembers prior
      conversations.
    </p>

    <h2>Gotchas</h2>
    <p>
      <strong>Knowledge base reloads are expensive.</strong> Call
      <code> kb.load(recreate=False)</code>, not <code>True</code>, in
      production. <code>True</code> re-embeds every document every
      run &mdash; burns your embeddings budget fast.
    </p>
    <p>
      <strong>The playground is local-only by default.</strong>
      <code> agno playground</code> binds to localhost. Don&rsquo;t
      expose it to the internet without auth; it lets anyone invoke
      your agents with your API keys.
    </p>
    <p>
      <strong>Team modes matter.</strong>
      <code> route</code> picks one member; <code>collaborate</code>
      {" "}lets all members respond; <code>coordinate</code> uses a
      leader. Pick wrong and you&rsquo;ll pay for every member every
      turn when you only needed one.
    </p>
    <p>
      <strong>Python 3.10+.</strong> Agno uses modern typing syntax
      (<code>str | None</code>) that won&rsquo;t import on 3.9.
    </p>

    <h2>When NOT to use it</h2>
    <p>
      If you&rsquo;re on TypeScript, look at Mastra or the Vercel AI
      SDK. If you need bulletproof type safety on a small typed-output
      service, Pydantic AI is a better fit. If you&rsquo;re doing
      pure document RAG, LlamaIndex has deeper retrieval primitives.
      Agno shines when you want multi-agent orchestration plus memory
      plus knowledge in one cohesive Python package without gluing
      four libraries together.
    </p>
    <p>
      Diagram the hand-offs between your agents with the{" "}
      <a href="/tools/flowchart-maker">flowchart maker</a>, sanity-
      check tool-call JSON with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a>, and estimate
      context-window usage per turn with the{" "}
      <a href="/tools/token-counter">token counter</a>.
    </p>
  </>
);
