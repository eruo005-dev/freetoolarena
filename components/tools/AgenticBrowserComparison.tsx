"use client";

import { useState } from "react";

type Browser = {
  name: string;
  vendor: string;
  basis: string;
  pricing: string;
  agents: boolean;
  tabs: boolean;
  memory: boolean;
  privacy: string;
  pros: string[];
  cons: string[];
};

const BROWSERS: Browser[] = [
  { name: "ChatGPT Atlas", vendor: "OpenAI", basis: "Standalone Chromium browser", pricing: "Free; Pro features in ChatGPT Plus / Pro", agents: true, tabs: true, memory: true, privacy: "Routes through OpenAI", pros: ["Tightest GPT-5 integration", "Operator runs multi-step tasks autonomously", "Cross-tab context", "Sora video gen built in"], cons: ["Closed ecosystem", "Sends browsing data to OpenAI", "Requires ChatGPT account"] },
  { name: "Comet", vendor: "Perplexity", basis: "Standalone Chromium", pricing: "Free; Pro Search via Perplexity Pro", agents: true, tabs: true, memory: false, privacy: "Cited answers; less aggressive memory", pros: ["Cited answers as default UX", "Pro Search runs deep multi-step research", "Can switch to Claude / GPT-5 / Sonar", "Lighter resource usage than Atlas"], cons: ["Smaller agent capability than Atlas", "Less integrated with non-Perplexity tools"] },
  { name: "Dia", vendor: "The Browser Company", basis: "Standalone, post-Arc", pricing: "Free; Pro tier $5/mo", agents: false, tabs: true, memory: true, privacy: "Optional cloud sync", pros: ["Beautiful UX", "AI sidebar with cross-tab awareness", "Skills (custom mini-agents)", "Quick model switching"], cons: ["Smaller agent capability", "macOS only as of Q1 2026"] },
  { name: "Arc Search", vendor: "Browser Company (legacy)", basis: "iOS only", pricing: "Free", agents: false, tabs: false, memory: false, privacy: "Stays on-device when possible", pros: ["Best mobile AI search experience", "Fastest 'Browse for Me' summarization", "No login required"], cons: ["iOS only", "Not maintained as actively post-Dia launch"] },
  { name: "Microsoft Copilot in Edge", vendor: "Microsoft", basis: "Edge browser", pricing: "Free with Edge; Pro $20/mo", agents: true, tabs: true, memory: true, privacy: "Microsoft 365 grade", pros: ["Tightest Microsoft 365 integration", "Page-aware Copilot sidebar", "Free for all Edge users", "Enterprise SSO"], cons: ["Edge lock-in", "GPT-5 quality but less polished UX than ChatGPT"] },
  { name: "Chrome (Gemini integration)", vendor: "Google", basis: "Chrome browser", pricing: "Free; Gemini Advanced $20/mo", agents: false, tabs: true, memory: true, privacy: "Google account scoped", pros: ["Largest browser install base", "Gemini in address bar + sidebar", "Tight Workspace integration", "Familiar UX"], cons: ["Lacks dedicated agentic mode", "Less proactive than Atlas / Copilot"] },
  { name: "Brave with Leo", vendor: "Brave Software", basis: "Brave browser", pricing: "Free; Leo Premium $15/mo", agents: false, tabs: false, memory: false, privacy: "Privacy-first; runs Llama / Mixtral", pros: ["Best privacy posture of any AI browser", "Optional fully-anonymous queries", "Built-in ad blocking + Tor mode", "Open weights default"], cons: ["No agent mode", "Smaller/older model selection by default"] },
];

export function AgenticBrowserComparison() {
  const [pick, setPick] = useState<string>("ChatGPT Atlas");
  const b = BROWSERS.find((x) => x.name === pick) ?? BROWSERS[0];

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Browser</th><th>Vendor</th><th>Pricing</th><th>Agents</th><th>Memory</th><th>Privacy</th></tr>
          </thead>
          <tbody>
            {BROWSERS.map((br) => (
              <tr key={br.name} className={`cursor-pointer border-t border-slate-100 ${br.name === pick ? 'bg-amber-50' : ''}`} onClick={() => setPick(br.name)}>
                <td className="py-1 font-medium text-slate-800">{br.name}</td>
                <td className="py-1 text-slate-600">{br.vendor}</td>
                <td className="py-1 text-xs text-slate-600">{br.pricing}</td>
                <td className="py-1">{br.agents ? <span className="text-emerald-700">&check;</span> : <span className="text-slate-300">&minus;</span>}</td>
                <td className="py-1">{br.memory ? <span className="text-emerald-700">&check;</span> : <span className="text-slate-300">&minus;</span>}</td>
                <td className="py-1 text-xs text-slate-600">{br.privacy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-emerald-900">{b.name} &middot; pros</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-emerald-900">
          {b.pros.map((p) => <li key={p}>{p}</li>)}
        </ul>
      </div>

      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4">
        <h4 className="mb-2 text-sm font-semibold text-rose-900">{b.name} &middot; cons</h4>
        <ul className="list-disc space-y-1 pl-5 text-sm text-rose-900">
          {b.cons.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Agentic browsers</strong> let an AI take multi-step actions on your behalf &mdash; book a flight, fill a form,
        compile a research report. As of 2026 Q1, ChatGPT Atlas leads autonomy; Dia leads UX; Comet leads research. Pick by what
        you do most.
      </div>
    </div>
  );
}
