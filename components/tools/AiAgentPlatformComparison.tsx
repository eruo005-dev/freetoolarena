"use client";

const PLATFORMS = [
  { name: "ChatGPT Operator", vendor: "OpenAI", access: "ChatGPT Pro $200/mo", strength: "Web automation, form filling", limit: "Pro tier only", best: "Booking, shopping, repetitive web tasks" },
  { name: "ChatGPT Atlas (browser)", vendor: "OpenAI", access: "Free with ChatGPT Plus/Pro", strength: "Cross-tab agent in standalone browser", limit: "OpenAI ecosystem", best: "Day-to-day browsing with AI assist" },
  { name: "Claude Computer Use", vendor: "Anthropic", access: "API + Claude Pro", strength: "Most reliable on long-horizon agentic SWE", limit: "Beta in 2026", best: "Coding agents, multi-step refactors" },
  { name: "Devin", vendor: "Cognition Labs", access: "$500/mo team tier", strength: "Autonomous SWE engineer (writes + tests + ships)", limit: "Expensive; learning curve", best: "Routine tickets, side-quests" },
  { name: "Manus", vendor: "Manus AI (China)", access: "Free invite + paid", strength: "General-purpose autonomous agent", limit: "Account scarcity early 2026", best: "Multi-step research + creation" },
  { name: "Replit Agent", vendor: "Replit", access: "Replit Core $25/mo", strength: "Build + deploy full apps from prompt", limit: "Tied to Replit infra", best: "Quick MVPs, internal tools" },
  { name: "Cursor Agent (Background)", vendor: "Cursor", access: "Cursor Pro $20+/mo", strength: "Background agents in IDE", limit: "Inside Cursor only", best: "Multi-file edits, refactors" },
  { name: "Bolt.new", vendor: "StackBlitz", access: "Free + $20-200/mo", strength: "Full-stack app generation in-browser", limit: "Best for new builds, not legacy", best: "Greenfield SaaS prototypes" },
  { name: "v0 (Vercel)", vendor: "Vercel", access: "Free + Pro $20/mo", strength: "UI generation + deploy in one click", limit: "React + Next.js focused", best: "Marketing pages, dashboard UI" },
  { name: "Lovable.dev", vendor: "Lovable", access: "$20-100/mo", strength: "Beautiful full-stack apps via chat", limit: "Sometimes opinionated", best: "Founders who want a working product fast" },
];

export function AiAgentPlatformComparison() {
  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Platform</th><th>Vendor</th><th>Access</th><th>Strength</th><th>Best for</th></tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => (
              <tr key={p.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{p.name}</td>
                <td className="py-1 text-slate-600">{p.vendor}</td>
                <td className="py-1 text-xs text-slate-600">{p.access}</td>
                <td className="py-1 text-xs text-slate-600">{p.strength}</td>
                <td className="py-1 text-xs text-slate-600">{p.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h4 className="mb-2 text-sm font-semibold text-slate-700">Decision shortcut</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          <li><strong>Coding agent:</strong> Claude Computer Use (best reliability) or Devin (most autonomy).</li>
          <li><strong>Web automation:</strong> Operator if budget, Atlas if not.</li>
          <li><strong>App generation:</strong> v0 for UI, Bolt.new for full-stack, Lovable for &ldquo;ship a SaaS&rdquo;.</li>
          <li><strong>Cheap general-purpose:</strong> Manus or Atlas.</li>
        </ul>
      </div>
    </div>
  );
}
