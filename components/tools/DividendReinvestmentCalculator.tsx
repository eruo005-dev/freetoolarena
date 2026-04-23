"use client";
import { useMemo, useState } from "react";

export function DividendReinvestmentCalculator() {
  const [initial, setInitial] = useState("10000");
  const [yieldPct, setYieldPct] = useState("3.5");
  const [growthPct, setGrowthPct] = useState("7");
  const [years, setYears] = useState("20");
  const [monthly, setMonthly] = useState("250");

  const iNum = useMemo(() => { const n = Number(initial); return Number.isFinite(n) && n >= 0 ? n : 0; }, [initial]);
  const yNum = useMemo(() => { const n = Number(yieldPct); return Number.isFinite(n) && n >= 0 ? n : 0; }, [yieldPct]);
  const gNum = useMemo(() => { const n = Number(growthPct); return Number.isFinite(n) && n >= 0 ? n : 0; }, [growthPct]);
  const tNum = useMemo(() => { const n = Number(years); return Number.isFinite(n) && n > 0 ? n : 1; }, [years]);
  const mNum = useMemo(() => { const n = Number(monthly); return Number.isFinite(n) && n >= 0 ? n : 0; }, [monthly]);

  const result = useMemo(() => {
    const months = tNum * 12;
    const totalMonthlyRate = (yNum + gNum) / 100 / 12;
    let balance = iNum;
    let dividends = 0;
    const dMonthly = yNum / 100 / 12;
    const gMonthly = gNum / 100 / 12;
    for (let i = 0; i < months; i++) {
      const divThisMonth = balance * dMonthly;
      dividends += divThisMonth;
      balance = balance * (1 + gMonthly) + divThisMonth + mNum;
    }
    const contributions = iNum + mNum * months;
    void totalMonthlyRate;
    return {
      ending: Number.isFinite(balance) ? balance : 0,
      contributions,
      dividends: Number.isFinite(dividends) ? dividends : 0,
    };
  }, [iNum, yNum, gNum, tNum, mNum]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Starting Investment</span>
          <input type="number" value={initial} onChange={(e) => setInitial(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Monthly Add</span>
          <input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Dividend Yield %</span>
          <input type="number" value={yieldPct} onChange={(e) => setYieldPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Price Growth %</span>
          <input type="number" value={growthPct} onChange={(e) => setGrowthPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Years</span>
          <input type="number" value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Ending Balance (DRIP)</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.ending)}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Total Contributions</div>
          <div className="text-xl font-semibold tabular-nums text-slate-700">{fmt(result.contributions)}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Dividends Reinvested</div>
          <div className="text-xl font-semibold tabular-nums text-slate-700">{fmt(result.dividends)}</div>
        </div>
      </div>
      <p className="text-xs text-slate-500">For guidance only &mdash; not financial advice. Actual returns vary with market and tax drag.</p>
    </div>
  );
}
