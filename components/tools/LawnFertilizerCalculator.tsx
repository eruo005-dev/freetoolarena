"use client";
import { useMemo, useState } from "react";

export function LawnFertilizerCalculator() {
  const [sqft, setSqft] = useState("5000");
  const [targetN, setTargetN] = useState("1");
  const [nPct, setNPct] = useState("24");
  const [bagLbs, setBagLbs] = useState("40");

  const toNum = (s: string, min = 0) => {
    const x = Number(s);
    return Number.isFinite(x) && x >= min ? x : min;
  };

  const A = useMemo(() => toNum(sqft), [sqft]);
  const T = useMemo(() => toNum(targetN), [targetN]);
  const P = useMemo(() => toNum(nPct, 0.1) || 1, [nPct]);
  const B = useMemo(() => toNum(bagLbs, 0.1) || 1, [bagLbs]);

  const out = useMemo(() => {
    const totalNlbs = (A / 1000) * T;
    const productLbs = totalNlbs / (P / 100);
    const bags = productLbs / B;
    return {
      totalNlbs,
      productLbs,
      bags,
      bagsRounded: Math.ceil(bags * 10) / 10,
    };
  }, [A, T, P, B]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Lawn area (sqft)</span>
          <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Target lbs N / 1000 sqft</span>
          <input type="number" step="0.1" value={targetN} onChange={(e) => setTargetN(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Fertilizer N %</span>
          <input type="number" step="0.1" value={nPct} onChange={(e) => setNPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Bag size (lbs)</span>
          <input type="number" value={bagLbs} onChange={(e) => setBagLbs(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Product to apply</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{out.productLbs.toFixed(1)} lbs</div>
        <div className="text-xs text-slate-500">&asymp; {out.bagsRounded} bag(s) at {B} lb each</div>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1">Inputs used</div>
        <div>Lawn: {A.toLocaleString()} sqft &rarr; {(A/1000).toFixed(2)} thousand-sqft units</div>
        <div>Target: {T} lb N &times; {(A/1000).toFixed(2)} = {out.totalNlbs.toFixed(2)} lb N total</div>
        <div>Product: {out.totalNlbs.toFixed(2)} &divide; {P}% = {out.productLbs.toFixed(1)} lb fertilizer</div>
      </div>
    </div>
  );
}
