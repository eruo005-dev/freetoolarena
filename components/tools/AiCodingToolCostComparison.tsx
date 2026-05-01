"use client";

import { useMemo, useState } from "react";

type Plan = { name: string; monthly: number; included: string; overageNote: string };

const PLANS: Plan[] = [
  { name: "GitHub Copilot Pro",        monthly: 10,   included: "Unlimited completions, GPT-5 chat", overageNote: "No overage" },
  { name: "GitHub Copilot Business",   monthly: 19,   included: "Per seat, admin controls", overageNote: "No overage" },
  { name: "Cursor Pro",                monthly: 20,   included: "500 fast Claude/GPT requests + unlimited slow", overageNote: "$0.04 per fast call" },
  { name: "Cursor Ultra",              monthly: 200,  included: "Unlimited fast on all frontier models", overageNote: "No overage" },
  { name: "Windsurf Pro",              monthly: 15,   included: "500 prompt credits + 1500 flow actions", overageNote: "$10 per 250 credits" },
  { name: "Claude Pro",                monthly: 20,   included: "5x usage, Opus + Sonnet via Claude Code", overageNote: "Hits hourly cap" },
  { name: "Claude Max",                monthly: 100,  included: "20x usage, big agentic budgets", overageNote: "Hits weekly cap" },
  { name: "Cody Pro (Sourcegraph)",    monthly: 9,    included: "Unlimited completions, 500 chat", overageNote: "Slows after cap" },
  { name: "Continue.dev (self-host)",  monthly: 0,    included: "BYO API keys, free OSS plugin", overageNote: "Pay per token" },
];

export function AiCodingToolCostComparison() {
  const [seats, setSeats] = useState<number>(1);

  const rows = useMemo(() => {
    return PLANS.map((p) => ({ ...p, total: p.monthly * seats }))
      .sort((a, b) => a.total - b.total);
  }, [seats]);

  const fmt = (n: number) => n === 0 ? "Free" : "$" + n.toFixed(0);

  return (
    <div className="space-y-5">
      <label className="block text-sm sm:max-w-xs"><span className="mb-1 block font-medium text-slate-700">Seats / developers</span>
        <input type="number" min={1} value={seats} onChange={(e) => setSeats(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
      </label>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Plan</th><th className="py-1">Per seat</th><th className="py-1">Includes</th><th className="py-1">Overage</th><th className="py-1 text-right">Monthly</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{r.name}</td>
                <td className="py-1 text-slate-600">{fmt(r.monthly)}</td>
                <td className="py-1 text-slate-600">{r.included}</td>
                <td className="py-1 text-slate-600">{r.overageNote}</td>
                <td className="py-1 text-right font-semibold">{fmt(r.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong className="text-slate-800">Quick picks:</strong> for solo devs who just want autocomplete that works,
        Copilot Pro at $10 is unbeatable. For agentic refactors and multi-file changes, Cursor Pro or Claude
        Max win. Teams should evaluate Cursor Business or Copilot Business per seat. Self-host plus BYO API
        keys via Continue.dev makes sense if you already pay for Anthropic / OpenAI consoles for other reasons.
      </div>
    </div>
  );
}
