"use client";

import { useMemo, useState } from "react";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export interface MortgageCalculatorProps {
  initialPrice?: number;
  initialDown?: number;
  initialRate?: number;
  initialYears?: number;
}

export function MortgageCalculator({
  initialPrice = 400000,
  initialDown = 20,
  initialRate = 6.75,
  initialYears = 30,
}: MortgageCalculatorProps = {}) {
  const [price, setPrice] = useState(initialPrice);
  const [down, setDown] = useState(initialDown);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);
  const [tax, setTax] = useState(1.2);
  const [insurance, setInsurance] = useState(1200);

  const calc = useMemo(() => {
    const principal = price * (1 - down / 100);
    const n = years * 12;
    const r = rate / 100 / 12;
    const pi = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
    const monthlyTax = (price * (tax / 100)) / 12;
    const monthlyIns = insurance / 12;
    const total = pi + monthlyTax + monthlyIns;
    return { principal, pi, monthlyTax, monthlyIns, total };
  }, [price, down, rate, years, tax, insurance]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Home price ($)</span>
          <input type="number" value={price} min={0} step={1000}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Down payment (%)</span>
          <input type="number" value={down} min={0} max={100} step={1}
            onChange={(e) => setDown(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Rate (%)</span>
          <input type="number" value={rate} min={0} step={0.05}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Term (years)</span>
          <input type="number" value={years} min={1} max={40} step={1}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Property tax (% / yr)</span>
          <input type="number" value={tax} min={0} step={0.05}
            onChange={(e) => setTax(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Insurance ($ / yr)</span>
          <input type="number" value={insurance} min={0} step={50}
            onChange={(e) => setInsurance(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Monthly payment (PITI)</p>
        <p className="text-3xl font-bold">{formatMoney(calc.total)}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">P&amp;I</p>
          <p className="font-semibold">{formatMoney(calc.pi)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Tax</p>
          <p className="font-semibold">{formatMoney(calc.monthlyTax)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Insurance</p>
          <p className="font-semibold">{formatMoney(calc.monthlyIns)}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">Loan amount: {formatMoney(calc.principal)}</p>
    </div>
  );
}
