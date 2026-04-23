"use client";

import { useMemo, useState } from "react";

export function HomeEquityLoanCalculator() {
  const [value, setValue] = useState("500000");
  const [balance, setBalance] = useState("300000");
  const [ltv, setLtv] = useState("85");
  const [apr, setApr] = useState("8.5");
  const [term, setTerm] = useState("15");

  const result = useMemo(() => {
    const v = Number(value) || 0;
    const b = Number(balance) || 0;
    const l = (Number(ltv) || 0) / 100;
    const maxTotal = v * l;
    const maxBorrow = Math.max(0, maxTotal - b);
    const currentEquity = Math.max(0, v - b);
    const currentLtv = v > 0 ? (b / v) * 100 : 0;

    const r = (Number(apr) || 0) / 100 / 12;
    const n = (Number(term) || 0) * 12;
    const monthly = r > 0 && n > 0 ? (maxBorrow * r) / (1 - Math.pow(1 + r, -n)) : n > 0 ? maxBorrow / n : 0;
    const totalInterest = monthly * n - maxBorrow;
    return { maxBorrow, currentEquity, currentLtv, monthly, totalInterest, totalPaid: monthly * n };
  }, [value, balance, ltv, apr, term]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Home value ($)</span>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Mortgage balance ($)</span>
          <input type="number" value={balance} onChange={(e) => setBalance(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">LTV cap (%)</span>
          <input type="number" value={ltv} onChange={(e) => setLtv(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">APR (%)</span>
          <input type="number" step="0.1" value={apr} onChange={(e) => setApr(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Term (years)</span>
          <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Max you can borrow</div>
          <div className="text-3xl font-bold text-brand tabular-nums">${result.maxBorrow.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Monthly payment</div>
          <div className="text-3xl font-bold text-brand tabular-nums">${result.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
      </div>

      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Current equity</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.currentEquity.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Current LTV</td>
            <td className="py-2 text-right tabular-nums font-medium">{result.currentLtv.toFixed(1)}%</td>
          </tr>
          <tr className="border-b border-slate-200">
            <td className="py-2 text-slate-600">Total interest paid</td>
            <td className="py-2 text-right tabular-nums font-medium">${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold">Total paid over term</td>
            <td className="py-2 text-right tabular-nums font-bold">${result.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
