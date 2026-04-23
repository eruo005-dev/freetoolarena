import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Dify is an open-source LLMOps platform that ships visual workflows, agents, datasets, and APIs in one stack.</p>);

export const body: ReactElement = (
  <>
    <p>Dify positions itself between &ldquo;no-code builder&rdquo; and &ldquo;full LLMOps platform.&rdquo; You design prompts and agents in a browser, attach datasets for RAG, and the platform exposes them as REST APIs with auth, rate limits, and analytics. Self-host for free or use the managed cloud.</p>
    <h2>What it is</h2>
    <p>A Python backend (Flask + Celery + Postgres + Redis + a vector store) plus a Next.js frontend. Apps come in four flavors: chat, agent, workflow, and text generation. Datasets handle ingestion and retrieval; models plug in via a provider registry with 30+ vendors supported.</p>
    <h2>Install / set up</h2>
    <pre>{`# self-host with docker compose
git clone https://github.com/langgenius/dify
cd dify/docker
cp .env.example .env
docker compose up -d`}</pre>
    <h2>First run</h2>
    <p>Browse to <code>http://localhost</code>, create the admin account, and wire up a model provider (OpenAI, Anthropic, or a local Ollama endpoint). Click Create App, pick Chatbot, write a system prompt, and publish &mdash; Dify generates a shareable URL and an API token.</p>
    <pre>{`$ curl -X POST http://localhost/v1/chat-messages \\
  -H "Authorization: Bearer app-xxx" \\
  -d '{"inputs":{},"query":"hi","user":"u1"}'
{"answer":"Hello!","conversation_id":"..."}`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Build a RAG chatbot by creating a dataset, uploading files, and toggling retrieval on in the app settings.</li>
      <li>Use the Workflow app type to chain HTTP calls, LLM nodes, code blocks, and conditionals for deterministic pipelines.</li>
      <li>Ship an internal tool by embedding the generated web app URL or calling the API from your existing product.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>The Docker Compose stack pulls a lot of images (Postgres, Redis, Weaviate, sandbox, SSRF proxy). Budget 4&ndash;6 GB of RAM minimum and don&rsquo;t run it on a 1 GB VPS. The <code>sandbox</code> container runs user code and needs <code>privileged</code> or a seccomp profile &mdash; read the security docs before exposing Dify publicly.</p>
    <p>Version upgrades occasionally require database migrations that aren&rsquo;t automatic. Snapshot your Postgres volume before <code>docker compose pull</code>. The team moves quickly and breaking changes do happen between minor versions.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Product teams that want to ship LLM features without building the platform layer. If you need prompts, datasets, auth, logs, and an API gateway in one package, Dify is the most complete open-source option today.</p>
  </>
);
