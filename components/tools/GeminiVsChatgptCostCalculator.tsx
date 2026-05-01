"use client";

import { useMemo, useState } from "react";

type Tier = { name: string; in: number; out: number };

const MODELS: Tier[] = [
  { name: "Gemini 3 Pro",       in: 2.50,  out: 10.00 },
  { name: "Gemini 2.5 Pro",     in: 1.25,  out: 5.00  },
  { name: "Gemini 2.5 Flash",   in: 0.30,  out: 2.50  },
  { name: "Gemini 2.5 Flash-Lite", in: 0.10,  out: 0.40  },
  { name: "GPT-5",              in: 2.50,  out: 10.00 },
  { name: "GPT-5 mini",         in: 0.25,  out: 2.00  },
  { name: "GPT-5 nano",         in: 0.05,  out: 0.40  },
  { name: "GPT-4o",             in: 2.50,  out: 10.00 },
  { name: "GPT-4o mini",        in: 0.15,  out: 0.60  },
];

export function GeminiVsChatgptCostCalculator() {
  const [inputK, setInputK] = useState<number>(50);
  const [outputK, setOutputK] = useState<number>(20);
  const [calls, setCalls] = useState<number>(1000);

  const rows = useMemo(() => {
    return MODELS.map((m) => {
      const cost = (inputK * m.in + outputK * m.out) / 1000 * calls;
      return { ...m, cost };
    }).sort((a, b) => a.cost - b.cost);
  }, [inputK, outputK, calls]);

  const cheapest = rows[0];
  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: n < 10 ? 4 : 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Input tokens / call (thousands)</span>
          <input type="number" min={0} value={inputK} onChange={(e) => setInputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Output tokens / call (thousands)</span>
          <input type="number" min={0} value={outputK} onChange={(e) => setOutputK(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Calls / month</span>
          <input type="number" min={0} value={calls} onChange={(e) => setCalls(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
        <div className="text-xs uppercase tracking-wide text-emerald-700">Cheapest at this volume</div>
        <div className="text-2xl font-bold text-emerald-900">{cheapest.name} &mdash; {fmt(cheapest.cost)}/mo</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="py-1">Model</th>
              <th className="py-1 text-right">$ in / 1M</th>
              <th className="py-1 text-right">$ out / 1M</th>
              <th className="py-1 text-right">Monthly cost</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="py-1 font-medium text-slate-800">{r.name}</td>
                <td className="py-1 text-right text-slate-600">${r.in.toFixed(2)}</td>
                <td className="py-1 text-right text-slate-600">${r.out.toFixed(2)}</td>
                <td className="py-1 text-right font-semibold">{fmt(r.cost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
        <strong>Heads up:</strong> rates are USD per 1M tokens at standard tier; they shift quarterly.
        Doesn&rsquo;t include caching discounts, batch API (50% off), or vision/audio surcharges &mdash;
        use the prompt-cache and batch-API calculators for those.
      </div>
    </div>
  );
}
