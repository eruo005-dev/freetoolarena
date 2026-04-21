"use client";

import { useMemo, useState } from "react";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function SavingsGoalCalculator() {
  const [goal, setGoal] = useState(10000);
  const [start, setStart] = useState(500);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(4);

  const { monthly, totalSaved } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = months;
    const futureFromStart = start * Math.pow(1 + r, n);
    const needed = goal - futureFromStart;
    // PMT = needed * r / ((1+r)^n - 1)
    const m = r === 0 ? needed / n : (needed * r) / (Math.pow(1 + r, n) - 1);
    return { monthly: Math.max(m, 0), totalSaved: start + Math.max(m, 0) * n };
  }, [goal, start, months, rate]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Goal amount ($)</span>
          <input type="number" value={goal} min={0} step={100}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Starting balance ($)</span>
          <input type="number" value={start} min={0} step={100}
            onChange={(e) => setStart(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Months to reach goal</span>
          <input type="number" value={months} min={1} max={360} step={1}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">HYSA APY (%)</span>
          <input type="number" value={rate} min={0} step={0.1}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Required monthly deposit</p>
        <p className="text-3xl font-bold">{formatMoney(monthly)}</p>
      </div>
      <p className="text-xs text-slate-500">
        You&rsquo;ll end up with ~{formatMoney(totalSaved)} after {months} months at {rate}% APY.
      </p>
    </div>
  );
}
