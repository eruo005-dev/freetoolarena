"use client";

import { useMemo, useState } from "react";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export interface CompoundInterestCalculatorProps {
  initialPrincipal?: number;
  initialContribution?: number;
  initialRate?: number;
  initialYears?: number;
}

export function CompoundInterestCalculator({
  initialPrincipal = 1000,
  initialContribution = 250,
  initialRate = 7,
  initialYears = 20,
}: CompoundInterestCalculatorProps = {}) {
  const [start, setStart] = useState(initialPrincipal);
  const [monthly, setMonthly] = useState(initialContribution);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);

  const { finalValue, contributed, interest } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    let balance = start;
    for (let i = 0; i < n; i++) {
      balance = balance * (1 + r) + monthly;
    }
    const c = start + monthly * n;
    return { finalValue: balance, contributed: c, interest: balance - c };
  }, [start, monthly, rate, years]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Starting balance ($)</span>
          <input type="number" value={start} min={0} step={100}
            onChange={(e) => setStart(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Monthly deposit ($)</span>
          <input type="number" value={monthly} min={0} step={25}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Annual return (%)</span>
          <input type="number" value={rate} min={0} max={30} step={0.1}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Years</span>
          <input type="number" value={years} min={1} max={60} step={1}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Final balance</p>
        <p className="text-3xl font-bold">{formatMoney(finalValue)}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">You contributed</p>
          <p className="text-lg font-semibold text-slate-900">{formatMoney(contributed)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Interest earned</p>
          <p className="text-lg font-semibold text-brand-dark">{formatMoney(interest)}</p>
        </div>
      </div>
    </div>
  );
}
