"use client";
import { useMemo, useState } from "react";

export function WallpaperRollCalculator() {
  const [width, setWidth] = useState("12");
  const [height, setHeight] = useState("9");
  const [rollW, setRollW] = useState("20.5");
  const [rollL, setRollL] = useState("33");
  const [repeat, setRepeat] = useState("0");

  const toNum = (s: string, min = 0) => {
    const x = Number(s);
    return Number.isFinite(x) && x >= min ? x : min;
  };

  const W = useMemo(() => toNum(width), [width]);
  const H = useMemo(() => toNum(height), [height]);
  const rw = useMemo(() => toNum(rollW, 0.1) || 20.5, [rollW]);
  const rl = useMemo(() => toNum(rollL, 0.1) || 33, [rollL]);
  const rep = useMemo(() => toNum(repeat), [repeat]);

  const out = useMemo(() => {
    const wallWidthIn = W * 12;
    const wallHeightIn = H * 12;
    const rollLenIn = rl * 12;
    const stripHeight = wallHeightIn + rep;
    const stripsPerRoll = stripHeight > 0 ? Math.floor(rollLenIn / stripHeight) : 0;
    const stripsNeeded = rw > 0 ? Math.ceil(wallWidthIn / rw) : 0;
    const rolls = stripsPerRoll > 0 ? Math.ceil(stripsNeeded / stripsPerRoll) : 0;
    const totalSqftBought = rolls * (rw / 12) * rl;
    const wallSqft = W * H;
    const wastePct = totalSqftBought > 0 ? ((totalSqftBought - wallSqft) / totalSqftBought) * 100 : 0;
    return { stripsPerRoll, stripsNeeded, rolls, totalSqftBought, wallSqft, wastePct };
  }, [W, H, rw, rl, rep]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Wall width (ft)</span>
          <input type="number" value={width} onChange={(e) => setWidth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Wall height (ft)</span>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Roll width (in)</span>
          <input type="number" step="0.25" value={rollW} onChange={(e) => setRollW(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Roll length (ft)</span>
          <input type="number" value={rollL} onChange={(e) => setRollL(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Pattern repeat (in, 0 if none)</span>
          <input type="number" value={repeat} onChange={(e) => setRepeat(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Rolls needed</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{out.rolls}</div>
        <div className="text-xs text-slate-500">Waste: {out.wastePct.toFixed(0)}%</div>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1">Inputs used</div>
        <div>Strips per roll (after repeat): {out.stripsPerRoll}</div>
        <div>Strips needed to cover width: {out.stripsNeeded}</div>
        <div>Wall area: {out.wallSqft.toFixed(1)} sqft &middot; purchased paper: {out.totalSqftBought.toFixed(1)} sqft</div>
      </div>
    </div>
  );
}
