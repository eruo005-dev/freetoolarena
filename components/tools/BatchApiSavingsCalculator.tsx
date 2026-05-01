"use client";

import { useMemo, useState } from "react";

const PROVIDERS = [
  { name: "Claude (Anthropic)",  in: 3.00,  out: 15.00, discount: 0.50, sla: "24h" },
  { name: "OpenAI (GPT-5)",      in: 2.50,  out: 10.00, discount: 0.50, sla: "24h" },
  { name: "Gemini 2.5 Pro",      in: 1.25,  out: 5.00,  discount: 0.50, sla: "24h" },
  { name: "DeepSeek (off-peak)", in: 0.135, out: 0.55,  discount: 0.50, sla: "8h" },
];

export function BatchApiSavingsCalculator() {
  const [inputK, setInputK] = useState<number>(50);
  const [outputK, setOutputK] = useState<number>(15);
  const [calls, setCalls] = useState<number>(50000);

  const rows = useMemo(() => {
    return PROVIDERS.map((p) => {
      const real = (inputK * p.in + outputK * p.out) / 1000 * calls;
      const batch = real * (1 - p.discount);
      return { ...p, real, batch, savings: real - batch };
    });
  }, [inputK, outputK, calls]);

  const totalSavings = rows.reduce((s, r) => s + r.savings, 0) / rows.length;
  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Input tokens (k)/call</span>
          <input type="number" min={0} value={inputK} onChange={(e) => setInputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Output tokens (k)/call</span>
          <input type="number" min={0} value={outputK} onChange={(e) => setOutputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Total calls in batch</span>
          <input type="number" min={0} value={calls} onChange={(e) => setCalls(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
        <div className="text-xs uppercase tracking-wide text-emerald-700">Average savings switching to batch</div>
        <div className="text-2xl font-bold text-emerald-900">{fmt(totalSavings)} per batch (50% off)</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Provider</th><th className="py-1">Real-time</th><th className="py-1">Batch</th><th className="py-1">SLA</th><th className="py-1 text-right">Savings</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{r.name}</td>
                <td className="py-1 text-slate-600">{fmt(r.real)}</td>
                <td className="py-1 text-slate-600">{fmt(r.batch)}</td>
                <td className="py-1 text-slate-600">{r.sla}</td>
                <td className="py-1 text-right font-semibold text-emerald-700">{fmt(r.savings)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>When to use batch:</strong> async jobs that don&rsquo;t need a same-second response &mdash;
        bulk classification, summarization, embedding generation, evals. Submit a JSONL of requests,
        get a results JSONL back within 24h (most return in 1-6h). 50% savings for the price of patience.
      </div>
    </div>
  );
}
