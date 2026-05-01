import { type ReactElement } from "react";

export const intro: ReactElement = (
  <p>
    By 2026, hundreds of MCP servers exist &mdash; some official, many community. Picking the right ones for your
    setup is mostly about three questions: workflow, trust posture, hosting. Here&rsquo;s the framework.
  </p>
);

export const body: ReactElement = (
  <>
    <h2>Question 1: what does your AI agent need to do?</h2>
    <ul>
      <li><strong>Coding:</strong> Filesystem, Git, GitHub, Sequential Thinking, Memory.</li>
      <li><strong>Research:</strong> Brave Search, Fetch, Memory, Filesystem.</li>
      <li><strong>Data analysis:</strong> Postgres, SQLite, Filesystem, Memory.</li>
      <li><strong>Customer support:</strong> Slack, Notion, Linear, Memory.</li>
      <li><strong>PM / ops:</strong> Linear, Notion, Slack, GitHub, Google Drive.</li>
    </ul>
    <h2>Question 2: official or community?</h2>
    <ul>
      <li><strong>Official</strong> (modelcontextprotocol/* + vendor-published): SOC 2 review usually possible, source maintained, breaks fixed.</li>
      <li><strong>Community:</strong> often higher feature velocity, but vary in quality + abandon risk.</li>
      <li><strong>Heuristic:</strong> use official for anything reading sensitive data; community is fine for additive tooling.</li>
    </ul>
    <h2>Question 3: stdio or HTTP?</h2>
    <ul>
      <li><strong>stdio:</strong> local-only, simpler, no network exposure. Default choice.</li>
      <li><strong>HTTP/SSE:</strong> remote-deployable, multi-user. Required if your agent runs in cloud.</li>
    </ul>
    <h2>Trust + safety</h2>
    <ul>
      <li>Read the source for any community server before granting filesystem or network access.</li>
      <li>Treat MCP servers as having user-level privileges. They CAN read your files.</li>
      <li>Use scoped credentials &mdash; tokens with minimal permissions.</li>
      <li>Audit access logs periodically (Anthropic + OpenAI both expose them).</li>
    </ul>
    <p>
      Get a tailored picks + Claude Desktop config at the <a href="/tools/mcp-server-picker">MCP server picker</a>.
      For the protocol overview see <a href="/guides/what-is-mcp-protocol">what is MCP protocol</a>.
    </p>
  </>
);
