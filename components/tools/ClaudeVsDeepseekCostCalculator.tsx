"use client";

import { useMemo, useState } from "react";

type Tier = { name: string; in: number; out: number; quality: number };

const MODELS: Tier[] = [
  { name: "Claude Opus 4.7",       in: 15.00, out: 75.00, quality: 95 },
  { name: "Claude Sonnet 4.6",     in: 3.00,  out: 15.00, quality: 92 },
  { name: "Claude Haiku 4.5",      in: 0.80,  out: 4.00,  quality: 80 },
  { name: "DeepSeek V3.2",         in: 0.27,  out: 1.10,  quality: 88 },
  { name: "DeepSeek R1",           in: 0.55,  out: 2.19,  quality: 90 },
  { name: "DeepSeek V3 (off-peak)",in: 0.135, out: 0.55,  quality: 88 },
];

export function ClaudeVsDeepseekCostCalculator() {
  const [inputK, setInputK] = useState<number>(80);
  const [outputK, setOutputK] = useState<number>(30);
  const [calls, setCalls] = useState<number>(2000);

  const rows = useMemo(() => {
    return MODELS.map((m) => {
      const cost = (inputK * m.in + outputK * m.out) / 1000 * calls;
      return { ...m, cost };
    }).sort((a, b) => a.cost - b.cost);
  }, [inputK, outputK, calls]);

  const cheapest = rows[0];
  const opus = rows.find((r) => r.name === "Claude Opus 4.7");
  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: n < 10 ? 4 : 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Input tokens (k) / call</span>
          <input type="number" min={0} value={inputK} onChange={(e) => setInputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Output tokens (k) / call</span>
          <input type="number" min={0} value={outputK} onChange={(e) => setOutputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Calls / month</span>
          <input type="number" min={0} value={calls} onChange={(e) => setCalls(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
          <div className="text-xs uppercase tracking-wide text-emerald-700">Cheapest</div>
          <div className="text-xl font-bold text-emerald-900">{cheapest.name}</div>
          <div className="text-sm text-emerald-800">{fmt(cheapest.cost)}/mo</div>
        </div>
        {opus && (
          <div className="rounded-lg border border-rose-300 bg-rose-50 p-4">
            <div className="text-xs uppercase tracking-wide text-rose-700">vs Claude Opus 4.7</div>
            <div className="text-xl font-bold text-rose-900">{fmt(opus.cost - cheapest.cost)} saved</div>
            <div className="text-sm text-rose-800">{((1 - cheapest.cost / opus.cost) * 100).toFixed(0)}% cheaper</div>
          </div>
        )}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Model</th><th className="py-1">In</th><th className="py-1">Out</th><th className="py-1 text-right">Quality</th><th className="py-1 text-right">Monthly</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{r.name}</td>
                <td className="py-1 text-slate-600">${r.in.toFixed(2)}</td>
                <td className="py-1 text-slate-600">${r.out.toFixed(2)}</td>
                <td className="py-1 text-right text-slate-600">{r.quality}</td>
                <td className="py-1 text-right font-semibold">{fmt(r.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong className="text-slate-800">Quality column</strong> is a rough composite of MMLU, SWE-bench, and HumanEval &mdash;
        useful as a tiebreaker when costs are close. DeepSeek V3.2 typically scores within 5 points of Claude Sonnet at 1/10 the cost,
        which is why it&rsquo;s the dominant pick for high-volume agentic work.
      </div>
    </div>
  );
}
