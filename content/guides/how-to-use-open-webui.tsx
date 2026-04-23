import { type ReactElement } from "react";

export const intro: ReactElement = (<p>Open WebUI gives you a ChatGPT-style interface on top of your own local models, with RAG and MCP built in.</p>);

export const body: ReactElement = (
  <>
    <p>Open WebUI (formerly Ollama WebUI) is the most polished self-hosted chat front-end in the open-source ecosystem. It targets Ollama by default but speaks any OpenAI-compatible API, bundles document RAG, and recently added MCP tool support. One Docker command gets you a private ChatGPT clone that runs entirely on your hardware.</p>
    <h2>What it is</h2>
    <p>A SvelteKit web app backed by a FastAPI service. It manages users, chat history, model catalogs, prompt libraries, and a built-in vector store for retrieval. It connects to Ollama at <code>http://host.docker.internal:11434</code> out of the box, and to any OpenAI-compatible endpoint through a config panel.</p>
    <h2>Install / set up</h2>
    <pre>{`# docker deploy
docker run -d -p 3000:8080 \\
  --add-host=host.docker.internal:host-gateway \\
  -v open-webui:/app/backend/data \\
  --name open-webui --restart always \\
  ghcr.io/open-webui/open-webui:main`}</pre>
    <h2>First run</h2>
    <p>Open <code>http://localhost:3000</code>, create the admin account (the first signup is always admin), and pick a model from the dropdown. If Ollama is running locally with at least one pulled model, it appears automatically.</p>
    <pre>{`$ ollama pull llama3.1
$ curl http://localhost:3000
# then chat in the browser`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Drop a PDF into the chat to index it on the fly and ask questions against it &mdash; RAG happens inline.</li>
      <li>Create a &ldquo;model&rdquo; preset with a system prompt, temperature, and knowledge collection, then share it with your team.</li>
      <li>Register an MCP server in Settings &rarr; Tools to let the chat call external APIs (GitHub, filesystem, databases).</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>The first signup becomes admin, so register yourself before exposing the port. If you skip this step and a stranger hits the URL first, they own the instance. For production, set <code>WEBUI_AUTH=true</code> and put it behind a reverse proxy with TLS.</p>
    <p>Updates ship fast &mdash; sometimes multiple times a week. Pin a specific image tag in production rather than chasing <code>main</code>, and read the release notes before upgrading because database migrations are common.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Teams and hobbyists who want the ChatGPT UX on local or private models. If you run Ollama and you&rsquo;re tired of the terminal, this is the front-end you install next.</p>
  </>
);
