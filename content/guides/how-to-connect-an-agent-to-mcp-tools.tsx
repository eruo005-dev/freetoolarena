export const intro = (
  <>
    <p>
      Model Context Protocol — <strong>MCP</strong> — is an open standard for
      connecting AI agents to external tools and data. In 2026 it has become
      the default. Claude Code, the Claude Agent SDK, Cursor, and most
      agent frameworks speak it; there&rsquo;s a growing ecosystem of MCP
      servers for GitHub, Slack, Postgres, Notion, Linear, your internal APIs,
      and hundreds of other systems.
    </p>
    <p>
      This guide explains what MCP actually is, how to install and connect a
      server, how to allow-list only the tools you want, and how to avoid the
      security mistakes that bite people on the way in.
    </p>
  </>
);

export const body = (
  <>
    <h2>What MCP actually is (in plain terms)</h2>
    <p>
      MCP is a small JSON-RPC protocol that lets any agent talk to any
      compatible tool provider. The provider is called an <strong>MCP
      server</strong>; your agent is the <strong>MCP client</strong>. The
      server advertises a list of tools (and resources, and prompts). The
      client asks for a tool to be invoked with arguments. That&rsquo;s it.
    </p>
    <p>
      The payoff: the same Slack MCP server works with Claude Code, the Claude
      Agent SDK, and most other agent frameworks. You write the integration
      once, you use it everywhere.
    </p>

    <h2>Step 1 — Pick a server to start with</h2>
    <p>
      Pick something with a clear, low-risk tool set. Good first MCP servers:
    </p>
    <ul>
      <li>
        <strong>Filesystem</strong> — scoped to a directory.
      </li>
      <li>
        <strong>Fetch</strong> — fetches a URL and returns text.
      </li>
      <li>
        <strong>GitHub (read-only)</strong> — list repos, read issues, read code.
      </li>
      <li>
        <strong>Postgres (read-only)</strong> — against a dev DB, not prod.
      </li>
    </ul>
    <p>
      Avoid starting with a server that can <em>write</em> — post to Slack,
      send email, merge PRs. Add those after you trust the agent.
    </p>

    <h2>Step 2 — Install an MCP server</h2>
    <p>
      Most MCP servers ship as npm or Python packages. Example — the
      filesystem server:
    </p>
    <pre><code>{`npx -y @modelcontextprotocol/server-filesystem /path/to/allowed/dir`}</code></pre>
    <p>
      That single command starts an MCP server over stdio, scoped to the
      directory you pass. It&rsquo;ll list tools like <code>read_file</code>,
      <code>write_file</code>, <code>list_directory</code>.
    </p>

    <h2>Step 3 — Wire it into your agent</h2>
    <h3>Claude Code</h3>
    <p>
      Create <code>.claude/mcp.json</code> in your repo:
    </p>
    <pre><code>{`{
  "mcpServers": {
    "fs": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./docs"]
    }
  }
}`}</code></pre>
    <p>
      Restart Claude Code and the agent can call <code>mcp__fs__read_file</code>,
      etc. See our{" "}
      <a href="/guides/how-to-set-up-claude-code">Claude Code setup guide</a>{" "}
      for the full picture.
    </p>

    <h3>Claude Agent SDK (Python)</h3>
    <pre><code>{`from claude_agent_sdk import ClaudeAgentOptions, query

opts = ClaudeAgentOptions(
    mcp_servers={
        "fs": {
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-filesystem", "./docs"],
        }
    },
    allowed_tools=["mcp__fs__read_file", "mcp__fs__list_directory"],
)

async for m in query(prompt="List files in docs and read README.md.", options=opts):
    print(m)`}</code></pre>
    <p>
      Notice the <code>allowed_tools</code> list — only those tools can be
      called. Even if the server advertises <code>write_file</code>, the
      agent can&rsquo;t call it unless you list it.
    </p>

    <h3>Cursor</h3>
    <p>
      Cursor reads <code>.cursor/mcp.json</code> with the same shape. Add the
      server, restart, and the agent can use its tools in agent mode.
    </p>

    <h2>Step 4 — Allow-list narrowly</h2>
    <p>
      Default to <em>read-only</em> tools. Add write tools one at a time, each
      time asking: &ldquo;if this tool is called wrongly, what does it take to
      recover?&rdquo; Sending a Slack DM is recoverable. Dropping a Postgres
      table is not.
    </p>

    <h2>Step 5 — Hook for audit + spend</h2>
    <p>
      On the Claude Agent SDK, attach a <code>pre_tool_use</code> hook that
      logs every tool call and can veto ones that look wrong. Free sanity
      check, costs nothing, saves you once.
    </p>

    <h2>Step 6 — Environment variables, not prompts, for secrets</h2>
    <p>
      Never put API keys in an MCP server&rsquo;s prompt or config visible to
      the agent. Pass them as environment variables to the server process.
      The agent should be able to use the tool without ever seeing the
      credential.
    </p>

    <h2>Step 7 — Run untrusted MCP servers with care</h2>
    <p>
      MCP servers are real code on your machine. A malicious MCP server can
      exfiltrate data, especially if the agent passes sensitive inputs to it.
      Rules of thumb:
    </p>
    <ul>
      <li>Only run servers you&rsquo;d trust as a regular npm/pip dependency.</li>
      <li>Prefer official servers (Anthropic, GitHub, Vercel, etc.) when they exist.</li>
      <li>For sketchy third-party servers, run them in a container or a scratch user.</li>
      <li>Keep the filesystem server&rsquo;s path scoped; don&rsquo;t point it at <code>/</code>.</li>
    </ul>

    <h2>The clearest upside</h2>
    <p>
      MCP turns agent tool integration from a per-framework project into a
      plug-and-play exercise. If you&rsquo;re still hand-coding REST clients
      inside a single framework, you&rsquo;re paying a tax you no longer need
      to pay. Pick one MCP server, wire it in, and you&rsquo;ll see why it
      flipped to being the standard.
    </p>

    <p>
      For context on where MCP fits into the bigger agent picture, see our{" "}
      <a href="/guides/how-to-set-up-an-ai-agent">setup-an-AI-agent overview</a>{" "}
      — MCP is the tools layer in almost every path on the decision tree.
    </p>
  </>
);
