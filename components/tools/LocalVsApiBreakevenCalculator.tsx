"use client";

import { useMemo, useState } from "react";

const HARDWARE = [
  { name: "Mac Studio M2 Max 64GB",  cost: 1800, watts: 80,  tps: 8 },
  { name: "Mac Studio M2 Ultra 128GB",cost: 3500, watts: 120, tps: 14 },
  { name: "Mac Studio M3 Ultra 192GB",cost: 4500, watts: 150, tps: 18 },
  { name: "PC + RTX 4090 24GB",      cost: 2800, watts: 450, tps: 12 },
  { name: "PC + RTX 5090 32GB",      cost: 3500, watts: 575, tps: 18 },
  { name: "Hyperspace pod (4 owned laptops)", cost: 0, watts: 200, tps: 9 },
];

const API_RATES = {
  "Claude Sonnet 4.6": 18,
  "GPT-5":             12.5,
  "Gemini 2.5 Pro":    6.25,
  "DeepSeek V3.2":     1.37,
};

export function LocalVsApiBreakevenCalculator() {
  const [model, setModel] = useState<keyof typeof API_RATES>("Claude Sonnet 4.6");
  const [tokensPerMonth, setTokensPerMonth] = useState<number>(20);
  const [electricity, setElectricity] = useState<number>(0.15);

  const apiMonthly = useMemo(() => tokensPerMonth * API_RATES[model], [tokensPerMonth, model]);

  const rows = useMemo(() => {
    return HARDWARE.map((h) => {
      const hoursPerMonth = (tokensPerMonth * 1_000_000) / (h.tps * 3600);
      const elecPerMonth = (h.watts / 1000) * hoursPerMonth * electricity;
      const breakevenMonths = h.cost > 0 ? h.cost / Math.max(1, apiMonthly - elecPerMonth) : 0;
      return { ...h, hoursPerMonth, elecPerMonth, breakevenMonths };
    });
  }, [tokensPerMonth, electricity, apiMonthly]);

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">API model</span>
          <select value={model} onChange={(e) => setModel(e.target.value as keyof typeof API_RATES)} className="w-full rounded border border-slate-300 px-3 py-2">
            {Object.keys(API_RATES).map((k) => <option key={k} value={k}>{k}</option>)}
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Million tokens / month</span>
          <input type="number" min={0} value={tokensPerMonth} onChange={(e) => setTokensPerMonth(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Electricity ($/kWh)</span>
          <input type="number" min={0} step={0.01} value={electricity} onChange={(e) => setElectricity(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="rounded-lg border border-rose-300 bg-rose-50 p-4">
        <div className="text-xs uppercase tracking-wide text-rose-700">API cost @ {model}</div>
        <div className="text-2xl font-bold text-rose-900">{fmt(apiMonthly)} / month</div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="py-1">Hardware</th><th className="py-1">Up-front</th><th className="py-1">Hours/mo</th><th className="py-1">Power $/mo</th><th className="py-1 text-right">Break-even</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-slate-100">
                <td className="py-1 font-medium">{r.name}</td>
                <td className="py-1 text-slate-600">{fmt(r.cost)}</td>
                <td className="py-1 text-slate-600">{r.hoursPerMonth.toFixed(0)}h</td>
                <td className="py-1 text-slate-600">{fmt(r.elecPerMonth)}</td>
                <td className="py-1 text-right font-semibold">
                  {r.cost === 0 ? <span className="text-emerald-700">already paid for</span> :
                   r.breakevenMonths > 60 ? <span className="text-rose-700">never</span> :
                   `${r.breakevenMonths.toFixed(1)} months`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Reality check:</strong> the math says &ldquo;buy hardware&rdquo; well before it&rsquo;s
        wise to. Don&rsquo;t self-host until you&rsquo;re confident your usage is sustained &mdash; a
        72-hour evaluation per model is a fair bar. The non-financial wins (privacy, no rate limits,
        no quota anxiety) can justify the spend even when the dollar break-even is years out.
      </div>
    </div>
  );
}
