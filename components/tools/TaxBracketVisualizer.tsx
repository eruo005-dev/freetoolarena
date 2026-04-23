"use client";
import { useMemo, useState } from "react";

type Bracket = { rate: number; floor: number; ceiling: number };

const SINGLE: Bracket[] = [
  { rate: 10, floor: 0, ceiling: 11600 },
  { rate: 12, floor: 11600, ceiling: 47150 },
  { rate: 22, floor: 47150, ceiling: 100525 },
  { rate: 24, floor: 100525, ceiling: 191950 },
  { rate: 32, floor: 191950, ceiling: 243725 },
  { rate: 35, floor: 243725, ceiling: 609350 },
  { rate: 37, floor: 609350, ceiling: Infinity },
];

const MARRIED: Bracket[] = [
  { rate: 10, floor: 0, ceiling: 23200 },
  { rate: 12, floor: 23200, ceiling: 94300 },
  { rate: 22, floor: 94300, ceiling: 201050 },
  { rate: 24, floor: 201050, ceiling: 383900 },
  { rate: 32, floor: 383900, ceiling: 487450 },
  { rate: 35, floor: 487450, ceiling: 731200 },
  { rate: 37, floor: 731200, ceiling: Infinity },
];

export function TaxBracketVisualizer() {
  const [income, setIncome] = useState("120000");
  const [status, setStatus] = useState("single");

  const incomeNum = useMemo(() => { const n = Number(income); return Number.isFinite(n) && n >= 0 ? n : 0; }, [income]);
  const brackets = status === "married" ? MARRIED : SINGLE;

  const result = useMemo(() => {
    let tax = 0;
    let marginal = 0;
    const slices = brackets.map((b) => {
      const inBracket = Math.max(0, Math.min(incomeNum, b.ceiling) - b.floor);
      const owed = inBracket * (b.rate / 100);
      tax += owed;
      if (incomeNum > b.floor) marginal = b.rate;
      return { rate: b.rate, amount: inBracket, owed };
    });
    const effective = incomeNum > 0 ? (tax / incomeNum) * 100 : 0;
    return { slices, tax, effective, marginal };
  }, [incomeNum, brackets]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Taxable Income</span>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Filing Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono bg-white">
            <option value="single">Single</option>
            <option value="married">Married Filing Jointly</option>
          </select>
        </label>
      </div>
      <div className="rounded-xl bg-slate-50 p-4 space-y-1.5">
        {result.slices.map((s) => (
          <div key={s.rate} className={`flex justify-between text-xs ${s.amount > 0 ? "text-slate-800" : "text-slate-400"}`}>
            <span className="font-mono w-10">{s.rate}%</span>
            <span className="font-mono">{fmt(s.amount)}</span>
            <span className="font-mono text-slate-500">{fmt(s.owed)}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Total Tax</div>
          <div className="text-lg font-semibold tabular-nums text-brand">{fmt(result.tax)}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Effective</div>
          <div className="text-lg font-semibold tabular-nums text-brand">{result.effective.toFixed(2)}%</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Marginal</div>
          <div className="text-lg font-semibold tabular-nums text-brand">{result.marginal}%</div>
        </div>
      </div>
      <p className="text-xs text-slate-500">For guidance only &mdash; not financial advice. 2025 federal brackets, excludes state &amp; credits.</p>
    </div>
  );
}
