import type { ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    Pydantic AI is a Python agent framework from the team behind
    Pydantic. It treats LLM output like any other untrusted input
    &mdash; validate it against a schema, retry on failure, and let
    the type checker catch your mistakes. If you already use Pydantic
    for FastAPI request bodies, Pydantic AI feels like the obvious
    extension to agents and tool calls.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>What Pydantic AI actually is</h2>
    <p>
      A thin, typed wrapper around model APIs (OpenAI, Anthropic,
      Gemini, Groq, Ollama, Bedrock) that forces every response
      through a Pydantic model. You define an <code>Agent</code> with
      a <code>result_type</code>, bind tools as decorated Python
      functions, and the framework handles JSON-schema generation,
      validation, and retry loops. The result is an object you can
      <code> .attribute</code> access with full IDE autocomplete
      instead of <code>response[&quot;choices&quot;][0][...]</code>.
    </p>
    <p>
      Compared to LangChain it is smaller, more opinionated, and
      actually typed. Compared to raw API calls it gives you
      structured output, automatic retries on schema mismatch, and a
      standard place to hang dependencies (database sessions, API
      clients) via its <code>deps_type</code> system.
    </p>

    <h2>Installing</h2>
    <pre>{`pip install pydantic-ai

# or with a specific model provider extra
pip install "pydantic-ai[openai]"
pip install "pydantic-ai[anthropic]"`}</pre>
    <p>
      Set the provider API key in your environment
      (<code>OPENAI_API_KEY</code>,
      <code> ANTHROPIC_API_KEY</code>, etc.). Python 3.9 or newer.
    </p>

    <h2>First working example</h2>
    <pre>{`from pydantic import BaseModel
from pydantic_ai import Agent

class Invoice(BaseModel):
    vendor: str
    total: float
    currency: str
    due_date: str

agent = Agent(
    "openai:gpt-4o-mini",
    result_type=Invoice,
    system_prompt="Extract invoice fields from the user message.",
)

result = agent.run_sync(
    "Acme Corp billed us 1,249.00 EUR, due 2026-05-15."
)
print(result.data)
# Invoice(vendor='Acme Corp', total=1249.0, currency='EUR', due_date='2026-05-15')`}</pre>
    <p>
      No JSON parsing, no try/except around
      <code> json.loads</code>, no &ldquo;the model returned prose
      again.&rdquo; If the model emits invalid JSON or the wrong
      shape, Pydantic AI retries with the validation error as
      feedback up to <code>retries=1</code> by default.
    </p>

    <h2>A real workflow &mdash; tools and dependencies</h2>
    <p>
      Agents become useful when they can call functions. Register
      tools with <code>@agent.tool</code>; Pydantic AI derives the
      JSON schema from the signature.
    </p>
    <pre>{`from dataclasses import dataclass
from pydantic_ai import Agent, RunContext

@dataclass
class Deps:
    db: "Database"

support_agent = Agent(
    "anthropic:claude-sonnet-4",
    deps_type=Deps,
    system_prompt="You are a support agent. Use tools to look up customers.",
)

@support_agent.tool
async def get_customer(ctx: RunContext[Deps], email: str) -> dict:
    """Fetch a customer row by email."""
    return await ctx.deps.db.fetch_one(
        "SELECT id, plan, mrr FROM customers WHERE email = $1", email
    )

async def handle_ticket(db, question: str):
    result = await support_agent.run(question, deps=Deps(db=db))
    return result.data`}</pre>
    <p>
      The <code>RunContext</code> gives tools typed access to the
      shared deps. No global state, no monkey-patching, no LangChain
      callback handlers &mdash; just a dataclass you pass in.
    </p>

    <h2>Gotchas</h2>
    <p>
      <strong>Streaming and structured output don&rsquo;t mix
      cleanly.</strong> If you want token streaming, drop the
      <code> result_type</code> and stream plain strings, or use
      <code> run_stream</code> with its partial-validation API and
      accept that early chunks may not validate.
    </p>
    <p>
      <strong>Retries hide costs.</strong> A validation failure
      doubles your token bill for that turn. Watch the
      <code> usage</code> field on results when you&rsquo;re tuning
      prompts, especially with expensive models.
    </p>
    <p>
      <strong>Tool docstrings are the prompt.</strong> The function
      docstring and parameter types become the JSON schema the model
      sees. Sloppy docstrings produce sloppy tool calls. Treat them
      like API docs.
    </p>

    <h2>When NOT to use it</h2>
    <p>
      Skip Pydantic AI if you need a huge pre-built tool ecosystem
      (LangChain&rsquo;s integrations are still an order of magnitude
      bigger), if you&rsquo;re staying in JavaScript/TypeScript, or
      if you&rsquo;re doing pure RAG over documents &mdash;
      LlamaIndex handles that with less glue code. For small typed
      extract-and-tool-call services, though, Pydantic AI is the
      least-painful option in Python today.
    </p>
    <p>
      Sketch your agent graph and tool flow with the{" "}
      <a href="/tools/flowchart-maker">flowchart maker</a>, validate
      sample JSON payloads against your Pydantic schemas in the{" "}
      <a href="/tools/json-formatter">JSON formatter</a>, and count
      prompt tokens before you ship with the{" "}
      <a href="/tools/token-counter">token counter</a>.
    </p>
  </>
);
