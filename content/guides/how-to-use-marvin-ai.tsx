import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Marvin turns Python functions into structured AI tools without the usual prompt-engineering boilerplate.</p>);

export const body: ReactElement = (
  <>
    <p>Marvin is a Python toolkit from the Prefect team that wraps LLM calls in typed, reliable primitives. Instead of hand-writing prompts and parsing responses, you decorate a function signature and Marvin handles the schema coercion, retries, and validation. It feels like regular Python, which is the point.</p>
    <h2>What it is</h2>
    <p>Marvin exposes a small set of primitives &mdash; <code>classify</code>, <code>extract</code>, <code>generate</code>, <code>cast</code>, and the <code>@ai_fn</code> decorator &mdash; that delegate to an LLM backend (OpenAI by default) and return Pydantic-typed results. Under the hood it generates a system prompt from the type signature and docstring, calls the model, and parses JSON back into Python objects.</p>
    <h2>Install / set up</h2>
    <pre>{`# install
pip install marvin
export OPENAI_API_KEY=sk-...`}</pre>
    <h2>First run</h2>
    <p>The fastest demo is classification. Give Marvin a string and a list of labels, and it returns the best match as a typed value.</p>
    <pre>{`$ python -c "import marvin; print(marvin.classify('This is amazing!', ['positive','negative']))"
positive`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Wrap a business rule with <code>@ai_fn</code> so product code calls a typed function instead of an LLM directly.</li>
      <li>Use <code>marvin.extract</code> to pull entities (emails, prices, dates) out of unstructured support tickets.</li>
      <li>Chain <code>marvin.generate</code> with Pydantic models to fabricate test fixtures that match your schema.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Marvin is thin on purpose. It does not ship a vector store, a chat UI, or an agent loop &mdash; if you need those, pair it with LangChain or ControlFlow (also from Prefect). Treat Marvin as the &ldquo;typed function&rdquo; layer and compose it with heavier frameworks.</p>
    <p>Token cost is easy to underestimate because every decorated call round-trips to the model. Cache aggressively in production, and prefer <code>classify</code> over <code>@ai_fn</code> when the output space is small and known &mdash; it&rsquo;s cheaper and more deterministic.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Python developers who want LLM features inside existing services without adopting a full agent framework. If you already live in FastAPI, Prefect, or a data pipeline and you need structured outputs today, Marvin slots in cleanly.</p>
  </>
);
