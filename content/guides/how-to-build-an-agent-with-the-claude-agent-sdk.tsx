export const intro = (
  <>
    <p>
      The Claude Agent SDK is Anthropic&rsquo;s library for building your own
      agents on top of Claude Opus 4.7 and Sonnet. It ships the same machinery
      that powers Claude Code — tools, hooks, MCP, and sub-agents — but as
      primitives you can wire into your own Python or Node service.
    </p>
    <p>
      This guide covers the four concepts you need (tools, hooks, MCP servers,
      sub-agents), installs the current version as of March 2026, and ships a
      working agent. If you&rsquo;re deciding between this and the OpenAI
      Agents SDK, read our{" "}
      <a href="/guides/how-to-set-up-an-ai-agent">agent setup overview</a> first.
    </p>
  </>
);

export const body = (
  <>
    <h2>Prerequisites</h2>
    <ul>
      <li>Python 3.10+ <em>or</em> Node.js 18+.</li>
      <li>An Anthropic API key (<code>ANTHROPIC_API_KEY</code>).</li>
      <li>
        A spend cap on the console. Agents that loop are expensive; budget
        first, code second.
      </li>
    </ul>

    <h2>Step 1 — Install</h2>
    <p>Python (version 0.1.48 on PyPI as of March 2026):</p>
    <pre><code>{`python -m venv .venv && source .venv/bin/activate
pip install claude-agent-sdk`}</code></pre>
    <p>TypeScript (version 0.2.71 on npm):</p>
    <pre><code>{`npm install @anthropic-ai/agent-sdk`}</code></pre>

    <h2>Step 2 — The four core concepts</h2>
    <ul>
      <li>
        <strong>Tools</strong> — functions the agent can call. Built-ins cover
        files, shell, HTTP, and web search. You add your own as needed.
      </li>
      <li>
        <strong>Hooks</strong> — callbacks that fire before/after tool calls
        and model turns. Use them for logging, validation, and spend caps.
      </li>
      <li>
        <strong>MCP servers</strong> — external tool providers the agent can
        connect to. Slack, GitHub, databases, your internal APIs.
      </li>
      <li>
        <strong>Sub-agents</strong> — narrower specialists the main agent
        delegates to. Smaller prompts, better results, easier debugging.
      </li>
    </ul>

    <h2>Step 3 — Minimum working agent (Python)</h2>
    <pre><code>{`from claude_agent_sdk import query, AssistantMessage, TextBlock
import asyncio

async def main():
    async for message in query(prompt="Explain MCP in 2 sentences."):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, TextBlock):
                    print(block.text)

asyncio.run(main())`}</code></pre>
    <p>
      That&rsquo;s a working agent. No tools yet, no guardrails — just Claude,
      reachable through the SDK. Run it to confirm your key works before you
      layer anything on.
    </p>

    <h2>Step 4 — Add a custom tool</h2>
    <p>
      Custom tools in the Claude Agent SDK are in-process MCP servers. That
      sounds heavy; it isn&rsquo;t. Wrap a Python function with{" "}
      <code>@tool</code> and register it via <code>create_sdk_mcp_server</code>.
    </p>
    <pre><code>{`from claude_agent_sdk import tool, create_sdk_mcp_server, ClaudeAgentOptions, query

@tool("square", "Square a number", {"n": int})
async def square(args):
    return {"content": [{"type": "text", "text": str(args["n"] ** 2)}]}

math_server = create_sdk_mcp_server(name="math", tools=[square])

opts = ClaudeAgentOptions(
    mcp_servers={"math": math_server},
    allowed_tools=["mcp__math__square"],
)

async def run():
    async for m in query(prompt="Square 17 using your tool.", options=opts):
        print(m)`}</code></pre>
    <p>
      Two things matter here. First, custom tools are MCP tools with a{" "}
      <code>mcp__&lt;server&gt;__&lt;tool&gt;</code> namespace — that&rsquo;s
      why the allow-list string looks the way it does. Second,{" "}
      <code>allowed_tools</code> is a safety fence: the agent cannot call
      anything not on that list.
    </p>

    <h2>Step 5 — Add a hook</h2>
    <p>
      Hooks let you veto, log, or modify the agent&rsquo;s behaviour without
      changing the prompt.
    </p>
    <pre><code>{`async def pre_tool(tool_name, args, ctx):
    print(f"-> calling {tool_name} with {args}")
    return {"allow": True}

opts = ClaudeAgentOptions(
    mcp_servers={"math": math_server},
    allowed_tools=["mcp__math__square"],
    hooks={"pre_tool_use": [pre_tool]},
)`}</code></pre>
    <p>
      Flip <code>allow</code> to <code>False</code> to block the call. This is
      where you put your spend cap (&ldquo;if total_tokens &gt; 100k: block&rdquo;)
      or your domain allow-list for HTTP fetches.
    </p>

    <h2>Step 6 — Connect an external MCP server</h2>
    <p>
      Say you want the agent to read Slack. Install the Slack MCP server
      (one line in your agent options), allow-list the specific tools you
      want, and the agent can use them. See our dedicated{" "}
      <a href="/guides/how-to-connect-an-agent-to-mcp-tools">MCP setup guide</a>{" "}
      for the full pattern.
    </p>

    <h2>Step 7 — Sub-agents for complex jobs</h2>
    <p>
      When one agent&rsquo;s tool list grows past ~8 tools, or its instructions
      pass ~300 lines, break off a sub-agent. The main agent invokes the
      sub-agent as if it were a tool; the sub-agent has its own allow-list,
      its own instructions, and its own guardrails. Sub-agents are the cleanest
      way to keep a production agent reliable as scope grows.
    </p>

    <h2>Step 8 — Deploy</h2>
    <p>
      Any host that runs Python or Node runs this. For async workloads, the
      SDK works cleanly inside FastAPI, Cloudflare Workers (TS), or AWS Lambda.
      Add a request-level timeout, a token cap, and structured logging — and
      you have a production agent. For dev-tool agents specifically, see our{" "}
      <a href="/guides/how-to-set-up-claude-code">Claude Code setup guide</a> —
      Claude Code is built on top of this same SDK.
    </p>

    <h2>Common mistakes</h2>
    <ul>
      <li>
        Forgetting <code>allowed_tools</code>. Without it the agent has no
        tool permissions and silently fails to call anything.
      </li>
      <li>
        Giving the agent a single 40-tool server instead of several small ones.
        Tool choice accuracy drops fast over ~12 options.
      </li>
      <li>
        Not running prompts through our{" "}
        <a href="/tools/ai-token-counter">token counter</a> first. Agent turns
        are priced by input <em>plus</em> output; a chatty system prompt costs
        you every loop.
      </li>
    </ul>
  </>
);
