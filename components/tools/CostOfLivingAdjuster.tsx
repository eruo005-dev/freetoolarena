"use client";
import { useMemo, useState } from "react";

export function CostOfLivingAdjuster() {
  const [salary, setSalary] = useState("90000");
  const [fromIdx, setFromIdx] = useState("100");
  const [toIdx, setToIdx] = useState("145");

  const sNum = useMemo(() => { const n = Number(salary); return Number.isFinite(n) && n >= 0 ? n : 0; }, [salary]);
  const fNum = useMemo(() => { const n = Number(fromIdx); return Number.isFinite(n) && n > 0 ? n : 100; }, [fromIdx]);
  const tNum = useMemo(() => { const n = Number(toIdx); return Number.isFinite(n) && n > 0 ? n : 100; }, [toIdx]);

  const result = useMemo(() => {
    const equivalent = sNum * (tNum / fNum);
    const delta = equivalent - sNum;
    const pct = sNum > 0 ? (delta / sNum) * 100 : 0;
    return {
      equivalent: Number.isFinite(equivalent) ? equivalent : 0,
      delta: Number.isFinite(delta) ? delta : 0,
      pct: Number.isFinite(pct) ? pct : 0,
    };
  }, [sNum, fNum, tNum]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Current Salary</span>
        <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">From City COL Index</span>
          <input type="number" value={fromIdx} onChange={(e) => setFromIdx(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">To City COL Index</span>
          <input type="number" value={toIdx} onChange={(e) => setToIdx(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Equivalent Salary</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.equivalent)}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Delta</div>
          <div className={`text-xl font-semibold tabular-nums ${result.delta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {result.delta >= 0 ? "+" : ""}{fmt(result.delta)}
          </div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Delta %</div>
          <div className={`text-xl font-semibold tabular-nums ${result.pct >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {result.pct >= 0 ? "+" : ""}{result.pct.toFixed(1)}%
          </div>
        </div>
      </div>
      <p className="text-xs text-slate-500">For guidance only &mdash; not financial advice. COL indices vary by source (Numbeo, BEA, C2ER).</p>
    </div>
  );
}
