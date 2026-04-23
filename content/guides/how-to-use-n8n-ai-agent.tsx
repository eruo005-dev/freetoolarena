import { type ReactElement } from "react";

export const intro: ReactElement = (<p>n8n&rsquo;s AI Agent node turns any workflow into a tool-calling agent powered by LangChain under the hood.</p>);

export const body: ReactElement = (
  <>
    <p>n8n is a fair-code workflow automation platform, and its AI Agent node is the bridge between traditional integration flows and LLM reasoning. The node wraps LangChain&rsquo;s agent executor, letting an LLM decide which of your connected nodes to call as tools. You get agents that can send Slack messages, query Postgres, or hit any of n8n&rsquo;s 400+ integrations.</p>
    <h2>What it is</h2>
    <p>A node in the LangChain category of n8n. It accepts a chat model, optional memory, and a list of tool nodes as sub-nodes. Each tool is described by a name and a natural-language description that the LLM uses to plan. Output is the agent&rsquo;s final answer after any tool loop.</p>
    <h2>Install / set up</h2>
    <pre>{`# self-host with docker
docker volume create n8n_data
docker run -d -p 5678:5678 \\
  -v n8n_data:/home/node/.n8n \\
  --name n8n n8nio/n8n`}</pre>
    <h2>First run</h2>
    <p>Open <code>http://localhost:5678</code>, create your owner account, and start a new workflow. Add a Chat Trigger, then an AI Agent node, then an OpenAI Chat Model as a sub-node. Drag a tool like HTTP Request or Google Sheets into the Tool slot and describe what it does.</p>
    <pre>{`$ curl -X POST http://localhost:5678/webhook/chat \\
  -d '{"chatInput":"summarize last 5 rows in sheet X"}'
{"output":"Here are the 5 rows..."}`}</pre>
    <h2>Everyday workflows</h2>
    <ul>
      <li>Build an internal &ldquo;ops bot&rdquo; that takes plain-English requests and calls your CRM, billing, or support APIs.</li>
      <li>Attach a Window Buffer Memory node so the agent remembers context across turns in a single chat session.</li>
      <li>Stack multiple agents with the Agent-as-Tool pattern to let a planner agent delegate to specialist agents.</li>
    </ul>
    <h2>Gotchas and tips</h2>
    <p>Tool descriptions matter more than you think. The LLM picks tools by reading the description field, not the node name, so &ldquo;HTTP Request&rdquo; with a blank description will be ignored. Write one clear sentence per tool describing when the agent should call it.</p>
    <p>The agent can loop. If your tool returns an error the LLM doesn&rsquo;t understand, it may retry forever until it hits the max iterations cap. Set <code>maxIterations</code> explicitly, return structured errors from tools, and watch the execution log the first few times you run a new agent.</p>
    <h2>Who it&rsquo;s for</h2>
    <p>Teams already running n8n for automations who want to layer LLM reasoning on top. If you&rsquo;ve got 20 existing workflows and want an agent that can invoke them, this is the easiest on-ramp &mdash; no new platform to learn.</p>
  </>
);
