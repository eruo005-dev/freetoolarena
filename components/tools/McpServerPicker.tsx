"use client";

import { useMemo, useState } from "react";

interface Server {
  name: string;
  category: string[];
  pitch: string;
  install: string;
  url: string;
  trust: "official" | "community";
}

const SERVERS: Server[] = [
  { name: "Filesystem", category: ["files", "core"], pitch: "Read/write/edit files in a sandboxed directory.", install: "@modelcontextprotocol/server-filesystem", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "GitHub", category: ["dev", "core"], pitch: "Issues, PRs, repos, code search via the GitHub API.", install: "@modelcontextprotocol/server-github", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Git", category: ["dev"], pitch: "Local git operations: log, diff, blame, status, commit prep.", install: "@modelcontextprotocol/server-git", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Slack", category: ["comms"], pitch: "Read channels, post messages, search history.", install: "@modelcontextprotocol/server-slack", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Postgres", category: ["data", "dev"], pitch: "Query Postgres directly, schema-aware.", install: "@modelcontextprotocol/server-postgres", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "SQLite", category: ["data", "dev"], pitch: "Lightweight local SQL — great for analytics on CSVs.", install: "@modelcontextprotocol/server-sqlite", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Puppeteer", category: ["browser", "scrape"], pitch: "Headless Chrome for screenshots, scraping, web automation.", install: "@modelcontextprotocol/server-puppeteer", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Brave Search", category: ["search"], pitch: "Web + image search through Brave's API. Privacy-friendly.", install: "@modelcontextprotocol/server-brave-search", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Memory", category: ["core"], pitch: "Persistent knowledge graph across sessions.", install: "@modelcontextprotocol/server-memory", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Fetch", category: ["search", "core"], pitch: "Fetch arbitrary URLs and parse them.", install: "@modelcontextprotocol/server-fetch", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Sequential Thinking", category: ["reasoning"], pitch: "Forces step-by-step thinking for hard problems.", install: "@modelcontextprotocol/server-sequential-thinking", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
  { name: "Linear", category: ["pm", "dev"], pitch: "Read/write Linear issues + projects.", install: "linear-mcp-server", url: "https://linear.app", trust: "community" },
  { name: "Notion", category: ["docs", "pm"], pitch: "Read/write Notion pages and databases.", install: "@notionhq/notion-mcp-server", url: "https://developers.notion.com/docs/mcp", trust: "official" },
  { name: "Stripe", category: ["data", "biz"], pitch: "Query Stripe customers, invoices, charges.", install: "@stripe/mcp", url: "https://stripe.com", trust: "official" },
  { name: "Google Drive", category: ["docs", "files"], pitch: "Search + read Drive files.", install: "@modelcontextprotocol/server-gdrive", url: "https://github.com/modelcontextprotocol/servers", trust: "official" },
];

const WORKFLOWS = [
  { id: "coding", label: "Coding agent", picks: ["Filesystem", "Git", "GitHub", "Sequential Thinking", "Memory"] },
  { id: "research", label: "Research agent", picks: ["Brave Search", "Fetch", "Memory", "Filesystem"] },
  { id: "data", label: "Data analyst", picks: ["Postgres", "SQLite", "Filesystem", "Memory"] },
  { id: "support", label: "Customer support", picks: ["Slack", "Notion", "Linear", "Memory"] },
  { id: "scraping", label: "Web scraping / automation", picks: ["Puppeteer", "Fetch", "Brave Search", "Filesystem"] },
  { id: "pm", label: "Project manager / ops", picks: ["Linear", "Notion", "Slack", "GitHub", "Google Drive"] },
  { id: "personal", label: "Personal assistant", picks: ["Notion", "Google Drive", "Memory", "Brave Search"] },
];

export function McpServerPicker() {
  const [workflow, setWorkflow] = useState<string>("coding");

  const picks = useMemo(() => {
    const wf = WORKFLOWS.find((w) => w.id === workflow);
    if (!wf) return [];
    return wf.picks.map((n) => SERVERS.find((s) => s.name === n)).filter((s): s is Server => Boolean(s));
  }, [workflow]);

  const claudeConfig = useMemo(() => {
    if (picks.length === 0) return "";
    const obj: Record<string, { command: string; args: string[] }> = {};
    for (const s of picks) {
      const isOfficial = s.install.startsWith("@modelcontextprotocol/");
      obj[s.name.toLowerCase().replace(/\s+/g, "-")] = {
        command: "npx",
        args: ["-y", s.install].concat(isOfficial && s.name === "Filesystem" ? ["/path/to/allowed/dir"] : []),
      };
    }
    return JSON.stringify({ mcpServers: obj }, null, 2);
  }, [picks]);

  return (
    <div className="space-y-5">
      <label className="block text-sm sm:max-w-md">
        <span className="mb-1 block font-medium text-slate-700">Workflow</span>
        <select value={workflow} onChange={(e) => setWorkflow(e.target.value)} className="w-full rounded border border-slate-300 px-3 py-2">
          {WORKFLOWS.map((w) => <option key={w.id} value={w.id}>{w.label}</option>)}
        </select>
      </label>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-3 text-sm font-semibold text-slate-700">Recommended MCP servers</h4>
        <ul className="space-y-3">
          {picks.map((s) => (
            <li key={s.name} className="border-l-2 border-emerald-300 pl-3">
              <div className="flex items-baseline justify-between">
                <span className="font-medium text-slate-800">{s.name}</span>
                <span className={`rounded px-1.5 py-0.5 text-xs ${s.trust === "official" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{s.trust}</span>
              </div>
              <div className="text-sm text-slate-600">{s.pitch}</div>
              <code className="text-xs text-slate-500">{s.install}</code>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h4 className="text-sm font-semibold text-emerald-900">Claude Desktop / Code config snippet</h4>
          <button type="button" onClick={() => navigator.clipboard?.writeText(claudeConfig)} className="text-xs text-emerald-800 underline hover:text-emerald-900">Copy</button>
        </div>
        <pre className="overflow-x-auto whitespace-pre font-mono text-xs text-emerald-900">{claudeConfig}</pre>
        <p className="mt-2 text-xs text-emerald-800">
          For Claude Desktop: paste into <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) or <code>%APPDATA%\Claude\claude_desktop_config.json</code> (Windows).
        </p>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Trust note:</strong> &ldquo;official&rdquo; servers are maintained by Anthropic or the listed vendor. Community
        servers vary in quality &mdash; review the source before granting them filesystem or network access. Treat all MCP
        servers as having the same privileges as the user running them.
      </div>
    </div>
  );
}
