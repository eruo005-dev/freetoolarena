import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>LangChain is the sprawling but battle-tested framework for composing LLM calls, retrievers, tools, and agents in Python or JavaScript.</p>
);

export const body: ReactElement = (
  <>
    <p>
      LangChain gives you a vocabulary &mdash; prompts, chat models, output parsers, retrievers, vector stores, agents
      &mdash; and the glue to wire them together. Its modern composition layer, LCEL (LangChain Expression Language),
      uses a pipe operator to chain Runnables: prompt | model | parser reads like the data flow itself and unlocks
      streaming, batching, and async for free.
    </p>

    <h2>What it is</h2>
    <p>
      LangChain is MIT-licensed and maintained by LangChain Inc. (Harrison Chase and team). In 2024 it split into
      langchain-core (Runnables and interfaces), langchain (high-level chains), partner packages like langchain-openai
      and langchain-anthropic, and langchain-community for third-party integrations. JavaScript lives in a separate
      monorepo with equivalent modules.
    </p>

    <h2>Install</h2>
    <pre>{`pip install langchain langchain-openai langchain-community
# JavaScript
npm install langchain @langchain/openai`}</pre>

    <h2>First run</h2>
    <p>A three-step LCEL chain that answers a question with structured output:</p>
    <pre>{`from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_template("Answer briefly: {q}")
model = ChatOpenAI(model="gpt-4o-mini")
chain = prompt | model | StrOutputParser()

print(chain.invoke({"q": "Why is the sky blue?"}))`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Build RAG with a Chroma or pgvector retriever piped into a prompt; add a reranker for quality.</li>
      <li>Expose the chain over HTTP with LangServe or Flask; trace every run in LangSmith.</li>
      <li>For agents, prefer LangGraph (the sibling project) over the legacy AgentExecutor &mdash; it is more controllable.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      LangChain&rsquo;s surface area is enormous and documentation lags behind code. Pin versions, read the source when
      docs conflict, and avoid deeply nested chains you cannot trace. A 5-line chain you understand beats a 50-line
      chain you copied from a tutorial.
    </p>
    <p>
      Production caveats matter: many community integrations are community-maintained, meaning patchy reliability.
      Wrap external tools with retries, timeouts, and circuit breakers; never trust a retriever to return within SLA
      without measuring it first.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Teams that want the broadest integration ecosystem and are willing to pay the complexity tax. Tip: LangSmith
      tracing is the single biggest quality-of-life upgrade &mdash; turn it on before you write your second chain.
    </p>
  </>
);
