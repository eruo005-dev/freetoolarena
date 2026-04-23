"use client";
import { useMemo, useState } from "react";

export function FireNumberCalculator() {
  const [expenses, setExpenses] = useState("50000");
  const [swr, setSwr] = useState("4");
  const [coastAge, setCoastAge] = useState("45");
  const [currentAge, setCurrentAge] = useState("30");
  const [growth, setGrowth] = useState("7");

  const eNum = useMemo(() => { const n = Number(expenses); return Number.isFinite(n) && n >= 0 ? n : 0; }, [expenses]);
  const sNum = useMemo(() => { const n = Number(swr); return Number.isFinite(n) && n > 0 ? n : 4; }, [swr]);
  const coastNum = useMemo(() => { const n = Number(coastAge); return Number.isFinite(n) && n > 0 ? n : 45; }, [coastAge]);
  const curNum = useMemo(() => { const n = Number(currentAge); return Number.isFinite(n) && n > 0 ? n : 30; }, [currentAge]);
  const gNum = useMemo(() => { const n = Number(growth); return Number.isFinite(n) && n >= 0 ? n : 0; }, [growth]);

  const result = useMemo(() => {
    const fire = eNum / (sNum / 100);
    const lean = eNum * 25;
    const fat = eNum * 33;
    const yearsToCoast = Math.max(0, 65 - coastNum);
    const coastTarget = fire / Math.pow(1 + gNum / 100, yearsToCoast);
    const yearsFromNow = Math.max(0, coastNum - curNum);
    void yearsFromNow;
    return {
      fire: Number.isFinite(fire) ? fire : 0,
      lean,
      fat,
      coast: Number.isFinite(coastTarget) ? coastTarget : 0,
    };
  }, [eNum, sNum, coastNum, curNum, gNum]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Annual Expenses</span>
          <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">SWR %</span>
          <input type="number" value={swr} onChange={(e) => setSwr(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Current Age</span>
          <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Coast Age</span>
          <input type="number" value={coastAge} onChange={(e) => setCoastAge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Expected Growth %</span>
          <input type="number" value={growth} onChange={(e) => setGrowth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">FIRE Number</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.fire)}</div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Lean (25x)</div>
          <div className="text-base font-semibold tabular-nums text-slate-700">{fmt(result.lean)}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Fat (33x)</div>
          <div className="text-base font-semibold tabular-nums text-slate-700">{fmt(result.fat)}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Coast @ {coastNum}</div>
          <div className="text-base font-semibold tabular-nums text-slate-700">{fmt(result.coast)}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500">For guidance only &mdash; not financial advice. SWR research assumes a 30-year horizon.</p>
    </div>
  );
}
