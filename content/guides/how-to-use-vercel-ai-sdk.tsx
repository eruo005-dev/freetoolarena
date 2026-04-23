import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>The Vercel AI SDK is a TypeScript toolkit for calling, streaming, and tool-using any LLM from Node, edge, or the browser.</p>
);

export const body: ReactElement = (
  <>
    <p>
      The AI SDK (package name ai) normalizes the wire formats of OpenAI, Anthropic, Google, Mistral, Groq, Cohere,
      Amazon Bedrock, and dozens more behind a single API. You get generateText, streamText, generateObject (for Zod-
      validated structured output), and a set of React/Svelte/Vue hooks that plug straight into streaming UIs. It is the
      de-facto standard for TypeScript AI apps.
    </p>

    <h2>What it is</h2>
    <p>
      The SDK is Apache-2.0 licensed, maintained by Vercel, and split across ai (core), @ai-sdk/openai and siblings
      (providers), and @ai-sdk/react (UI hooks). It targets Node 18+, works on the Vercel Edge Runtime, and runs in the
      browser for providers that allow it.
    </p>

    <h2>Install</h2>
    <pre>{`npm install ai @ai-sdk/openai zod
# plus whichever UI package you need
npm install @ai-sdk/react`}</pre>

    <h2>First run</h2>
    <p>Stream a response from an API route and render it in a React component:</p>
    <pre>{`// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
  })
  return result.toDataStreamResponse()
}`}</pre>

    <h2>Everyday workflows</h2>
    <ul>
      <li>Use generateObject with a Zod schema to get validated JSON instead of parsing strings.</li>
      <li>Pass tools: a record of tool definitions to let the model call your functions; the SDK handles the loop.</li>
      <li>In the client, wire useChat() to your /api/chat route &mdash; streaming tokens, tool calls, and errors come for free.</li>
    </ul>

    <h2>Gotchas and tips</h2>
    <p>
      The SDK had a major version bump (v4 to v5) that changed message shape and tool-call semantics. Blog posts from
      2024 often target v3; check the package version before copy-pasting. Also remember that toDataStreamResponse uses
      a custom protocol &mdash; if you consume it outside the built-in hooks, read the stream spec first.
    </p>
    <p>
      Edge runtime is fast but limited. No Node APIs, 1MB bundle cap, and some providers&rsquo; SDKs pull in fs or crypto
      transitively. Check your bundle with next build before deploying a chat route to the edge.
    </p>

    <h2>Who it&rsquo;s for</h2>
    <p>
      Any TypeScript developer shipping an LLM feature into a web app. Tip: put all model selection behind one
      environment variable &mdash; swapping gpt-4o for claude-sonnet-4 then becomes a config change, not a refactor.
    </p>
  </>
);
