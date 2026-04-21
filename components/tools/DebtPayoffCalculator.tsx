"use client";

import { useMemo, useState } from "react";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function DebtPayoffCalculator() {
  const [balance, setBalance] = useState(5000);
  const [rate, setRate] = useState(22);
  const [monthly, setMonthly] = useState(200);

  const result = useMemo(() => {
    const r = rate / 100 / 12;
    const minInterest = balance * r;
    if (monthly <= minInterest + 0.01) {
      return { months: Infinity, total: Infinity, interest: Infinity, unpayable: true };
    }
    const n = Math.log(monthly / (monthly - balance * r)) / Math.log(1 + r);
    const months = Math.ceil(n);
    const total = monthly * months;
    return { months, total, interest: total - balance, unpayable: false };
  }, [balance, rate, monthly]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Balance ($)</span>
          <input type="number" value={balance} min={0} step={50}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">APR (%)</span>
          <input type="number" value={rate} min={0} step={0.1}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Monthly payment ($)</span>
          <input type="number" value={monthly} min={0} step={25}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      {result.unpayable ? (
        <div className="rounded-lg bg-rose-600 text-white p-5">
          <p className="text-sm font-semibold">Payment too low</p>
          <p className="text-xs text-white/80 mt-1">
            Your payment doesn&rsquo;t cover the monthly interest. Increase it or you&rsquo;ll never pay this off.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-lg bg-brand-dark text-white p-5">
            <p className="text-xs uppercase tracking-wide text-white/70">Months to payoff</p>
            <p className="text-3xl font-bold">
              {result.months} <span className="text-base font-normal text-white/80">
                ({(result.months / 12).toFixed(1)} yrs)
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Total paid</p>
              <p className="text-lg font-semibold text-slate-900">{formatMoney(result.total)}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Interest</p>
              <p className="text-lg font-semibold text-rose-700">{formatMoney(result.interest)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
