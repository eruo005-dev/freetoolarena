import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Letta (formerly MemGPT) is an open-source framework for stateful agents &mdash; LLMs that manage their own long-term memory across conversations.</p>);

export const body: ReactElement = (
  <>
    <p>MemGPT started as a Berkeley research project that gave LLMs an operating-system-style memory hierarchy: a small in-context working set, a larger archival store, and tools to page between them. It rebranded as Letta in 2024 and now ships a server, a Python/TypeScript SDK, and the Agent Development Environment (ADE) &mdash; a visual debugger for stateful agents.</p>
    <h2>What it is</h2>
    <p>Letta runs a persistent server that owns agent state: core memory blocks (persona, human), archival memory (vector store), and message history. Agents are addressable by ID and survive restarts. You talk to them over REST or WebSocket; they call tools, update their own memory blocks, and keep learning across sessions.</p>
    <h2>Install / sign up</h2>
    <pre>{`# Docker (recommended)
docker run -it -p 8283:8283 \\
  -v ~/.letta:/root/.letta \\
  letta/letta:latest

# Or pip
pip install letta
letta server

# Cloud option: https://app.letta.com (managed)`}</pre>
    <h2>First session</h2>
    <p>Open the ADE at http://localhost:8283, create an agent, and start chatting. Watch the memory panel on the right &mdash; when you mention your name, you&rsquo;ll see the agent update its &ldquo;human&rdquo; block in real time.</p>
    <pre>{`$ letta run
> Hi, I'm Jay and I build SEO tools.
# agent writes to core memory:
#   human: "Name is Jay. Builds SEO tools."
> What do I work on?
# agent recalls from core memory, not context window`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>1. Build a personal assistant that remembers preferences across weeks of chats.</li>
      <li>2. Give agents tools (Python functions or MCP servers) so they can act, not just remember.</li>
      <li>3. Use the ADE to inspect memory edits and step through tool calls when debugging.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Archival memory uses a vector store (pgvector by default) &mdash; point it at a durable Postgres in production, not the in-container SQLite, or you&rsquo;ll lose memories on restart. Letta supports any OpenAI-compatible endpoint, so local models via Ollama or vLLM work fine for privacy-sensitive deployments.</p>
    <p>Core memory blocks are small (a few KB) on purpose &mdash; they&rsquo;re always in context. Push larger facts into archival and let the agent retrieve them. The agent&rsquo;s self-editing of memory is powerful but occasionally overwrites useful info; version your memory blocks via the API if that matters.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Builders of long-lived assistants, companion apps, customer-support bots, and any product where &ldquo;the agent remembers you&rdquo; is the core value prop.</p>
  </>
);
