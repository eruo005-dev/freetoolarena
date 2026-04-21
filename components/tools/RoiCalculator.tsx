"use client";

import { useMemo, useState } from "react";

function pct(n: number): string {
  if (!Number.isFinite(n)) return "—";
  return (n * 100).toFixed(2) + "%";
}
function money(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function RoiCalculator() {
  const [cost, setCost] = useState(1000);
  const [revenue, setRevenue] = useState(1500);
  const [years, setYears] = useState(1);

  const r = useMemo(() => {
    const gain = revenue - cost;
    const roi = cost > 0 ? gain / cost : 0;
    const annualized = years > 0 && cost > 0 && revenue > 0 ? Math.pow(revenue / cost, 1 / years) - 1 : 0;
    return { gain, roi, annualized };
  }, [cost, revenue, years]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Initial cost ($)</span>
          <input type="number" value={cost} onChange={(e) => setCost(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Final value ($)</span>
          <input type="number" value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Years</span>
          <input type="number" value={years} min={0} step={0.5} onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">ROI</p>
        <p className="text-3xl font-bold">{pct(r.roi)}</p>
        <p className="text-xs text-white/80 mt-1">Net gain: {money(r.gain)}</p>
      </div>
      <div className="rounded-lg border border-slate-200 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">Annualized return</p>
        <p className="text-lg font-semibold text-slate-900">{pct(r.annualized)}</p>
      </div>
    </div>
  );
}
