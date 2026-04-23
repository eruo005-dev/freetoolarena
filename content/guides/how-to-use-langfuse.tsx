import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Langfuse is the observability layer your LLM app should have had from day one &mdash; traces, scores, prompts, and evals in one OSS stack.</p>);

export const body: ReactElement = (
  <>
    <p>Langfuse solves the &ldquo;why did my chatbot say that?&rdquo; problem. It captures every LLM call, tool invocation, and user interaction as a nested trace, adds latency and cost math, and lets you score outputs manually or with LLM-as-judge. It&rsquo;s open-source, self-hostable, and drops into Python or JS apps with a few lines of code.</p>
    <h2>What it is</h2>
    <p>A Next.js + Postgres + ClickHouse stack (Redis and S3 for object storage). SDKs for Python and TypeScript send events to the ingestion API, which populates traces made of spans, generations, and events. The UI renders traces, aggregates metrics, and runs dataset-based evals against prompt versions.</p>
    <h2>Install / set up</h2>
    <pre>{`# self-host
git clone https://github.com/langfuse/langfuse
cd langfuse
docker compose up -d
# or use cloud
pip install langfuse`}</pre>
    <h2>First run</h2>
    <p>Sign up at cloud.langfuse.com or your self-hosted URL, create a project, and copy the public and secret keys. Instrument your app: one decorator or one <code>@observe()</code> on the entry function is enough to start seeing nested traces in the dashboard.</p>
    <pre>{`$ python
from langfuse.decorators import observe
@observe()
def ask(q): return llm.invoke(q)
ask("hello")
# trace appears in UI`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Use Prompts to version system prompts in Langfuse and pull them at runtime with <code>langfuse.get_prompt()</code>.</li>
      <li>Create Datasets from production traces, then run Evals against new prompt versions before promoting them.</li>
      <li>Score traces in the UI (thumbs up/down) or automatically via LLM-as-judge templates to track quality over time.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>ClickHouse is required as of v3 and it&rsquo;s heavier than the old Postgres-only stack. If you self-host on a small VM, the ingestion worker can fall behind and traces arrive minutes late. Size your instance for ClickHouse, not for Next.js.</p>
    <p>Cost accuracy depends on token counts. If your model provider doesn&rsquo;t return usage, Langfuse estimates from the text &mdash; fine for ballpark, bad for billing. Always pass <code>usage</code> explicitly when you call <code>langfuse.generation()</code> manually so your cost dashboards aren&rsquo;t fiction.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Any team shipping an LLM feature to real users. The moment you have more than 10 daily conversations and someone asks &ldquo;is it getting better or worse?&rdquo;, you need Langfuse or something like it.</p>
  </>
);
