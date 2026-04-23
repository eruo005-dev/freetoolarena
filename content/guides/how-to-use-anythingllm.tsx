import { type ReactElement } from "react";

export const intro: ReactElement = (<p>AnythingLLM packages private RAG, workspaces, and agents into a single desktop or Docker app.</p>);

export const body: ReactElement = (
  <>
    <p>AnythingLLM from Mintplex Labs is a batteries-included chat-with-your-documents platform. It handles ingestion, embedding, vector storage, LLM routing, and a clean workspace UI so you don&rsquo;t have to wire five services together. You get a desktop build for personal use and a Docker image for team deployments.</p>
    <h2>What it is</h2>
    <p>A Node/React app that organizes knowledge into workspaces. Each workspace has its own documents, vector namespace, system prompt, and permitted users. It supports dozens of LLM providers (OpenAI, Anthropic, Ollama, LM Studio, Azure) and swappable vector stores (LanceDB by default, Pinecone, Qdrant, Chroma, Weaviate).</p>
    <h2>Install / set up</h2>
    <pre>{`# docker
docker pull mintplexlabs/anythingllm
docker run -d -p 3001:3001 \\
  --cap-add SYS_ADMIN \\
  -v anythingllm_storage:/app/server/storage \\
  mintplexlabs/anythingllm`}</pre>
    <h2>First run</h2>
    <p>Hit <code>http://localhost:3001</code>, walk through onboarding, pick an LLM provider, and drop in an API key. Create a workspace, upload a few PDFs or point it at a website, and start chatting &mdash; embeddings happen in the background.</p>
    <pre>{`$ curl -F "file=@whitepaper.pdf" \\
  http://localhost:3001/api/v1/document/upload
{"success": true, "location": "..."}`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Build a workspace per project or per client so contexts never leak between them.</li>
      <li>Enable the Agent tab to let the workspace call web search, scrape pages, or run SQL via custom skills.</li>
      <li>Expose the workspace as an embeddable chat widget on a marketing site with a scoped API key.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>The desktop app and the Docker server store data in different locations and don&rsquo;t sync. Pick one deployment model up front. If you start on desktop and later move to Docker, you&rsquo;ll re-ingest everything &mdash; there&rsquo;s no migration path.</p>
    <p>Default chunking is generic. For dense technical docs, bump chunk size and overlap in the workspace settings before ingesting, otherwise retrieval quality suffers. Re-embedding after changing chunking is a manual delete-and-reupload today.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Small teams that need a private, multi-tenant RAG chat without building one. If you want ChatGPT-over-your-docs with user management and you don&rsquo;t want to touch LangChain, AnythingLLM is the shortest path.</p>
  </>
);
