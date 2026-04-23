import { type ReactElement } from "react";

export const intro: ReactElement = (<p>LibreChat is an open-source ChatGPT clone that talks to every major model provider from a single UI.</p>);

export const body: ReactElement = (
  <>
    <p>LibreChat started as a faithful ChatGPT reimplementation and grew into a multi-provider chat hub. One interface fronts OpenAI, Anthropic, Google, Azure, AWS Bedrock, local Ollama, and the OpenAI Assistants API. It adds plugins, multimodal inputs, presets, and per-user API keys on top.</p>
    <h2>What it is</h2>
    <p>A Node.js + React monorepo backed by MongoDB for chat history and Meilisearch for conversation search. Auth supports email, Google, GitHub, Discord, Facebook, Apple, and OpenID. Models are configured via <code>librechat.yaml</code>, which is where you declare endpoints, custom providers, and rate limits.</p>
    <h2>Install / set up</h2>
    <pre>{`# docker compose
git clone https://github.com/danny-avila/LibreChat
cd LibreChat
cp .env.example .env
cp librechat.example.yaml librechat.yaml
docker compose up -d`}</pre>
    <h2>First run</h2>
    <p>Open <code>http://localhost:3080</code>, register an account (the first user can be elevated to admin via the CLI), add an API key in the top-right menu, and start chatting. Switch providers from the model dropdown mid-conversation to compare outputs side by side.</p>
    <pre>{`$ npm run create-user admin@example.com Admin password123
User created successfully
$ npm run ban-user someone@example.com`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Save a Preset with a provider, model, system prompt, and temperature so teammates start from the same baseline.</li>
      <li>Enable Assistants to upload files and run OpenAI&rsquo;s code interpreter without leaving LibreChat.</li>
      <li>Wire in plugins (web search, DALL&middot;E, Zapier, custom actions) to extend chat into tool-calling agents.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p><code>librechat.yaml</code> is the source of truth for custom endpoints, but it&rsquo;s read at boot &mdash; changes require a container restart. Validate your YAML before restarting, because a typo will crash the API container and silently fall back to the last good config only if you&rsquo;re lucky.</p>
    <p>MongoDB grows fast if users never delete conversations. Set up a retention policy or a cron that archives old threads, and put Meilisearch on a persistent volume or you&rsquo;ll lose full-text search indexes on every redeploy.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Anyone who wants a polished, self-hosted ChatGPT with multi-provider support and real auth. Families sharing a plan, small teams wanting unified billing through API keys, and tinkerers who like the ChatGPT UI but want to own the data.</p>
  </>
);
