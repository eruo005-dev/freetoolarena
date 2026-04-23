import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>Mastra is a TypeScript-native AI framework for agents, workflows, and evals, from the team behind Gatsby.</p>
);

export const body: ReactElement = (
  <>
    <p>
      Mastra brings the LangChain-style primitives &mdash; agents, tools, memory, RAG, workflows &mdash; to idiomatic
      TypeScript with a strong focus on DX. It ships a local dev playground, built-in tracing, and a workflow engine
      with branching and retries that feels closer to a real orchestrator than a pile of callbacks. It deploys to Node,
      Vercel, Cloudflare Workers, or as a standalone server.
    </p>

    <h2>What it is</h2>
    <p>
      Mastra is an Elastic-2.0 licensed open-source project maintained by the Mastra team (many ex-Gatsby engineers).
      It is built on top of the Vercel AI SDK for model access, so any provider that SDK supports &mdash; OpenAI,
      Anthropic, Google, Groq, Ollama &mdash; is available. TypeScript-first, Zod-powered schemas throughout.
    </p>

    <h2>Install</h2>
    <pre>{`npm create mastra@latest
# or add to an existing project
npm install @mastra/core @ai-sdk/openai zod`}</pre>

    <h2>First run</h2>
    <p>Define an agent and call it &mdash; the playground at localhost:4111 gives you a chat UI for free:</p>
    <pre>{`import { Agent } from "@mastra/core/agent"
import { openai } from "@ai-sdk/openai"

export const assistant = new Agent({
  name: "assistant",
  instructions: "You are a concise coding helper.",
  model: openai("gpt-4o-mini"),
})

const { text } = await assistant.generate("Explain useEffect in 2 lines.")
console.log(text)`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Compose createWorkflow().step().then().branch() to build durable multi-step pipelines with typed inputs.</li>
      <li>Attach tools defined with createTool and a Zod schema &mdash; Mastra handles the JSON-schema conversion.</li>
      <li>Add evals (mastra/evals) to score agent outputs against golden datasets in CI.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      Mastra is young and pre-1.0 &mdash; APIs still shift between minor versions. Commit a package-lock and read the
      changelog before upgrading. The storage layer defaults to LibSQL file-on-disk, which is convenient in dev but
      needs swapping for Postgres or Upstash in production.
    </p>
    <p>
      Because Mastra sits on top of the Vercel AI SDK, any quirk there leaks through &mdash; including the occasional
      breaking change in tool-call formats between providers. Integration-test across models if you expect to swap.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      TypeScript teams tired of translating Python tutorials into JS. Tip: even if you only need one agent, start with a
      Workflow &mdash; retries and tracing are free and you&rsquo;ll want them the first time a tool call times out.
    </p>
  </>
);
