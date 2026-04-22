"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

type Mode = "forward" | "reverse";

export interface ProfitMarginCalculatorProps {
  /** Initial cost ($). Overridable via ?cost=50. */
  initialCost?: number;
  /** Initial revenue ($). Overridable via ?revenue=80. */
  initialRevenue?: number;
  /** Initial desired margin (%) for reverse mode. */
  initialMargin?: number;
  /** "forward" (cost + revenue) or "reverse" (cost + target margin → price). */
  initialMode?: Mode;
}

export function ProfitMarginCalculator({
  initialCost = 50,
  initialRevenue = 80,
  initialMargin = 40,
  initialMode = "forward",
}: ProfitMarginCalculatorProps = {}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [cost, setCost] = useState(initialCost);
  const [revenue, setRevenue] = useState(initialRevenue);
  const [targetMargin, setTargetMargin] = useState(initialMargin);

  const r = useMemo(() => {
    const c = Math.max(0, cost || 0);
    if (mode === "forward") {
      const rev = Math.max(0, revenue || 0);
      const profit = rev - c;
      const margin = rev > 0 ? (profit / rev) * 100 : 0;
      const markup = c > 0 ? (profit / c) * 100 : 0;
      return { cost: c, revenue: rev, profit, margin, markup };
    }
    // reverse: given cost + target margin%, find price
    const m = Math.max(0, Math.min(99.99, targetMargin || 0)) / 100;
    const price = m >= 1 ? 0 : c / (1 - m);
    const profit = price - c;
    const markup = c > 0 ? (profit / c) * 100 : 0;
    return { cost: c, revenue: price, profit, margin: m * 100, markup };
  }, [mode, cost, revenue, targetMargin]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("forward")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "forward"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Cost + revenue
        </button>
        <button
          type="button"
          onClick={() => setMode("reverse")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
            mode === "reverse"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:border-brand"
          }`}
        >
          Cost + target margin → price
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Cost ($)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={cost}
            onChange={(e) => setCost(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        {mode === "forward" ? (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Revenue ($)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={0.01}
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        ) : (
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Target margin (%)</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={99.99}
              step={0.1}
              value={targetMargin}
              onChange={(e) => setTargetMargin(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
          </label>
        )}
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        {mode === "reverse" && (
          <div className="sm:col-span-2">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Suggested price</p>
            <p className="text-3xl font-bold text-brand">{money(r.revenue)}</p>
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Profit</p>
          <p className={`font-bold ${mode === "forward" ? "text-3xl text-brand" : "text-xl text-slate-900"}`}>
            {money(r.profit)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Margin</p>
          <p className="text-xl font-bold text-slate-900">{r.margin.toFixed(2)}%</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Markup</p>
          <p className="text-xl font-bold text-slate-900">{r.markup.toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}
