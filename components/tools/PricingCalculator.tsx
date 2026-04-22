"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function PricingCalculator() {
  const [cost, setCost] = useState("20");
  const [overhead, setOverhead] = useState("5");
  const [markup, setMarkup] = useState("60");
  const [competitor, setCompetitor] = useState("");

  const { totalCost, recommended, profit, breakeven, economy, standard, premium, competitorDelta } = useMemo(() => {
    const c = Math.max(0, parseFloat(cost) || 0);
    const oh = Math.max(0, parseFloat(overhead) || 0);
    const m = Math.max(0, parseFloat(markup) || 0) / 100;
    const tc = c + oh;
    const rec = tc * (1 + m);
    const p = rec - tc;
    // Breakeven: units needed to cover $10k fixed costs as illustrative benchmark
    const fixed = 10000;
    const be = p > 0 ? fixed / p : 0;
    const comp = parseFloat(competitor);
    const cDelta = Number.isFinite(comp) && comp > 0 ? ((rec - comp) / comp) * 100 : null;
    return {
      totalCost: tc,
      recommended: rec,
      profit: p,
      breakeven: be,
      economy: rec * 0.9,
      standard: rec,
      premium: rec * 1.3,
      competitorDelta: cDelta,
    };
  }, [cost, overhead, markup, competitor]);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Cost to produce ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fixed overhead per unit ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={overhead}
            onChange={(e) => setOverhead(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Desired markup (%)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={markup}
            onChange={(e) => setMarkup(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Competitor price ($, optional)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={competitor}
            onChange={(e) => setCompetitor(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total cost / unit</p>
          <p className="text-2xl font-bold text-slate-900">{money(totalCost)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Recommended price</p>
          <p className="text-3xl font-bold text-brand">{money(recommended)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Profit per unit</p>
          <p className="text-2xl font-bold text-slate-900">{money(profit)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Breakeven vs $10k fixed</p>
          <p className="text-2xl font-bold text-slate-900">{breakeven > 0 ? `${Math.ceil(breakeven).toLocaleString()} units` : "—"}</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Pricing tiers</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Economy (0.9x)</p>
            <p className="text-xl font-bold text-slate-900">{money(economy)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Standard (1.0x)</p>
            <p className="text-xl font-bold text-brand">{money(standard)}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Premium (1.3x)</p>
            <p className="text-xl font-bold text-slate-900">{money(premium)}</p>
          </div>
        </div>
      </div>

      {competitorDelta !== null && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <span className="font-semibold">vs competitor: </span>
          {competitorDelta > 0
            ? `${competitorDelta.toFixed(1)}% more expensive`
            : competitorDelta < 0
              ? `${Math.abs(competitorDelta).toFixed(1)}% cheaper`
              : "Same price"}
        </div>
      )}
    </div>
  );
}
