"use client";

import { useMemo, useState } from "react";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export interface LoanCalculatorProps {
  /** Initial loan amount ($). Overridable via ?amount=25000 URL param. */
  initialAmount?: number;
  /** Initial annual interest rate (%). Overridable via ?rate=7.5. */
  initialRate?: number;
  /** Initial term in years. Overridable via ?years=5. */
  initialYears?: number;
}

export function LoanCalculator({
  initialAmount = 25000,
  initialRate = 7.5,
  initialYears = 5,
}: LoanCalculatorProps = {}) {
  const [amount, setAmount] = useState(initialAmount);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);

  const { monthly, total, interest } = useMemo(() => {
    const n = years * 12;
    const r = rate / 100 / 12;
    const m = r === 0 ? amount / n : (amount * r) / (1 - Math.pow(1 + r, -n));
    const t = m * n;
    return { monthly: m, total: t, interest: t - amount };
  }, [amount, rate, years]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Loan amount ($)</span>
        <input
          type="number"
          value={amount}
          min={0}
          step={100}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Annual interest rate (%)</span>
        <input
          type="number"
          value={rate}
          min={0}
          step={0.1}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Term (years)</span>
        <input
          type="number"
          value={years}
          min={1}
          max={40}
          step={1}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>
      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">Monthly payment</p>
        <p className="text-3xl font-bold">{formatMoney(monthly)}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total paid</p>
          <p className="text-lg font-semibold text-slate-900">{formatMoney(total)}</p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Total interest</p>
          <p className="text-lg font-semibold text-slate-900">{formatMoney(interest)}</p>
        </div>
      </div>
    </div>
  );
}
