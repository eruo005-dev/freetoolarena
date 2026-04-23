"use client";
import { useMemo, useState } from "react";

export function CaloriesPerMacroEstimator() {
  const [protein, setProtein] = useState("30");
  const [carbs, setCarbs] = useState("45");
  const [fat, setFat] = useState("15");
  const [fiber, setFiber] = useState("5");

  const toNum = (s: string) => {
    const x = Number(s);
    return Number.isFinite(x) && x >= 0 ? x : 0;
  };

  const p = useMemo(() => toNum(protein), [protein]);
  const c = useMemo(() => toNum(carbs), [carbs]);
  const f = useMemo(() => toNum(fat), [fat]);
  const fb = useMemo(() => toNum(fiber), [fiber]);

  const out = useMemo(() => {
    const netCarbs = Math.max(0, c - fb);
    const pKcal = p * 4;
    const cKcal = netCarbs * 4;
    const fKcal = f * 9;
    const fbKcal = fb * 2;
    const total = pKcal + cKcal + fKcal + fbKcal;
    const pct = (x: number) => (total > 0 ? (x / total) * 100 : 0);
    const proteinLow = total > 0 && pct(pKcal) < 15;
    return {
      total: Math.round(total),
      pKcal: Math.round(pKcal),
      cKcal: Math.round(cKcal),
      fKcal: Math.round(fKcal),
      fbKcal: Math.round(fbKcal),
      pPct: pct(pKcal).toFixed(1),
      cPct: pct(cKcal).toFixed(1),
      fPct: pct(fKcal).toFixed(1),
      fbPct: pct(fbKcal).toFixed(1),
      proteinLow,
    };
  }, [p, c, f, fb]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Protein (g)</span>
          <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Carbs (g)</span>
          <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Fat (g)</span>
          <input type="number" value={fat} onChange={(e) => setFat(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Fiber (g)</span>
          <input type="number" value={fiber} onChange={(e) => setFiber(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-2">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Total calories</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{out.total} kcal</div>
        <div className="text-xs text-slate-500">Uses 4&middot;4&middot;9 kcal/g plus 2 kcal/g for fiber (net carbs)</div>
      </div>

      <div className="rounded-xl border border-slate-200 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-2">Breakdown</div>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Protein</span><span className="font-mono tabular-nums">{out.pKcal} kcal &middot; {out.pPct}%</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Net carbs</span><span className="font-mono tabular-nums">{out.cKcal} kcal &middot; {out.cPct}%</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Fat</span><span className="font-mono tabular-nums">{out.fKcal} kcal &middot; {out.fPct}%</span></div>
          <div className="flex justify-between"><span className="text-slate-500">Fiber</span><span className="font-mono tabular-nums">{out.fbKcal} kcal &middot; {out.fbPct}%</span></div>
        </div>
      </div>

      {out.proteinLow ? (
        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
          Protein is below 15% of total calories &mdash; most adults benefit from 20&ndash;30% for satiety and muscle retention.
        </div>
      ) : null}

      <p className="text-xs text-slate-500">Not medical advice &mdash; consult a provider or dietitian for individualized nutrition plans.</p>
    </div>
  );
}
