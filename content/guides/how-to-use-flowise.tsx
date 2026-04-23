import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Flowise lets you build LangChain flows by dragging nodes on a canvas instead of writing Python.</p>);

export const body: ReactElement = (
  <>
    <p>Flowise is an open-source visual builder for LLM orchestration. You connect nodes &mdash; LLMs, prompts, memory, vector stores, tools &mdash; on a canvas and it emits a working API endpoint. Under the hood it&rsquo;s LangChain JS, so anything LangChain does, Flowise can wire up without code.</p>
    <h2>What it is</h2>
    <p>A Node.js app with a React Flow canvas. Every node is a thin wrapper around a LangChain class. The runtime executes the graph when a request hits the chatflow endpoint, and the studio lets you test conversations in a side panel while you build.</p>
    <h2>Install / set up</h2>
    <pre>{`# npx quickstart
npx flowise start
# or docker
docker run -d -p 3000:3000 \\
  -v ~/.flowise:/root/.flowise \\
  flowiseai/flowise`}</pre>
    <h2>First run</h2>
    <p>Open <code>http://localhost:3000</code>, click New Chatflow, and drop a Chat Model node, a Conversation Chain node, and a Buffer Memory node onto the canvas. Connect them, add your OpenAI key in the model node, and hit the purple chat icon to test.</p>
    <pre>{`$ curl -X POST http://localhost:3000/api/v1/prediction/<flowId> \\
  -H "Content-Type: application/json" \\
  -d '{"question":"hello"}'
{"text":"Hi! How can I help?"}`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Start from a marketplace template (RAG, SQL agent, multi-agent) and customize rather than building from scratch.</li>
      <li>Use the Credentials vault so API keys aren&rsquo;t baked into exported flows.</li>
      <li>Embed the generated chat widget in a website with the provided &lt;script&gt; snippet, no backend glue needed.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Flows are JSON under the hood but node versions change between Flowise releases. Export flows regularly and test after upgrading &mdash; a renamed input on a node will silently drop the connection and your agent will misbehave at runtime.</p>
    <p>The canvas abstracts LangChain but doesn&rsquo;t hide its sharp edges. Token windows, streaming quirks, and tool-call loops still bite you. Keep the browser devtools open on the server logs tab while iterating &mdash; that&rsquo;s where the real errors surface.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Builders who think visually, prototypers who want to demo an agent before committing to code, and teams pairing a non-engineer PM with a LangChain-fluent dev. Production-grade workloads often graduate to raw code, but Flowise gets you to a working prototype fast.</p>
  </>
);
