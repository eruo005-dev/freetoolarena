import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    MCP &mdash; Model Context Protocol &mdash; is the open standard for connecting AI assistants to tools and data
    sources. Anthropic launched it in late 2024; by 2026 it&rsquo;s supported by Claude, ChatGPT, Cursor, Zed, Goose, and a
    growing list. Think of it as USB-C for AI integrations.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>The problem MCP solves</h2>
    <p>
      Pre-MCP, every AI tool had its own way to integrate with external systems. Cursor extensions, ChatGPT custom
      actions, Claude tools &mdash; all incompatible. MCP defines a common protocol, so a server you write once works
      everywhere. The Slack MCP server you set up for Claude Desktop also works in Cursor, Zed, ChatGPT, etc.
    </p>

    <h2>How it works</h2>
    <p>
      An MCP server exposes <em>resources</em> (read-only data), <em>tools</em> (callable functions), and <em>prompts</em>
      (templates). The AI client connects to the server over JSON-RPC (stdio for local, HTTP/SSE for remote) and discovers
      what&rsquo;s available. Authentication is handled by the server.
    </p>

    <h2>Servers worth knowing in 2026</h2>
    <ul>
      <li><strong>Filesystem, GitHub, Git, SQLite, Postgres, Slack</strong> &mdash; the official servers.</li>
      <li><strong>Linear, Notion, Stripe, Google Drive</strong> &mdash; vendor-published.</li>
      <li><strong>Brave Search, Fetch, Puppeteer</strong> &mdash; web access.</li>
      <li><strong>Memory, Sequential Thinking</strong> &mdash; cognitive enhancements.</li>
    </ul>

    <p>
      For setup recommendations by workflow, use the <a href="/tools/mcp-server-picker">MCP server picker</a>. For agent
      design overall, see <a href="/guides/best-ai-for-agents">best AI for agents</a>.
    </p>
  </>
);
