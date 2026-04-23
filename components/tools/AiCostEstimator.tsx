"use client";

import { useMemo, useState } from "react";

const MODELS = [
  { id: "gpt-4o", label: "GPT-4o", inPrice: 2.5, outPrice: 10 },
  { id: "claude-sonnet", label: "Claude Sonnet 4", inPrice: 3, outPrice: 15 },
  { id: "claude-haiku", label: "Claude Haiku 4", inPrice: 0.8, outPrice: 4 },
  { id: "gemini-pro", label: "Gemini 1.5 Pro", inPrice: 1.25, outPrice: 5 },
  { id: "gemini-flash", label: "Gemini 1.5 Flash", inPrice: 0.075, outPrice: 0.3 },
];

export function AiCostEstimator() {
  const [requestsPerDay, setRequestsPerDay] = useState("1000");
  const [avgInput, setAvgInput] = useState("800");
  const [avgOutput, setAvgOutput] = useState("300");

  const rows = useMemo(() => {
    const r = Number(requestsPerDay) || 0;
    const i = Number(avgInput) || 0;
    const o = Number(avgOutput) || 0;
    const monthlyRequests = r * 30;
    return MODELS.map((m) => {
      const daily = (r * (i * m.inPrice + o * m.outPrice)) / 1_000_000;
      const monthly = daily * 30;
      const yearly = daily * 365;
      return { ...m, daily, monthly, yearly, monthlyRequests };
    });
  }, [requestsPerDay, avgInput, avgOutput]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Requests / day</span>
          <input type="number" value={requestsPerDay} onChange={(e) => setRequestsPerDay(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Avg input tokens</span>
          <input type="number" value={avgInput} onChange={(e) => setAvgInput(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Avg output tokens</span>
          <input type="number" value={avgOutput} onChange={(e) => setAvgOutput(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-3">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Monthly requests</div>
        <div className="text-xl font-semibold tabular-nums text-brand">{(rows[0]?.monthlyRequests || 0).toLocaleString()}</div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="text-left px-3 py-2">Model</th>
              <th className="text-right px-3 py-2">In $/M</th>
              <th className="text-right px-3 py-2">Out $/M</th>
              <th className="text-right px-3 py-2">Daily</th>
              <th className="text-right px-3 py-2">Monthly</th>
              <th className="text-right px-3 py-2">Yearly</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => (
              <tr key={m.id} className="border-t border-slate-200">
                <td className="px-3 py-2 font-semibold">{m.label}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs text-slate-600">${m.inPrice.toFixed(3)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs text-slate-600">${m.outPrice.toFixed(3)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs text-slate-600">${m.daily.toFixed(2)}</td>
                <td className="px-3 py-2 text-right tabular-nums font-semibold text-brand">${m.monthly.toFixed(2)}</td>
                <td className="px-3 py-2 text-right tabular-nums text-xs text-slate-600">${m.yearly.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Prices are list rates per million tokens. Volume discounts, batch pricing, and cache hits can lower real spend by 20-50%.</p>
    </div>
  );
}
