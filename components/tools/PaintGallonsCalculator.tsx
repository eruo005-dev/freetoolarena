"use client";
import { useMemo, useState } from "react";

export function PaintGallonsCalculator() {
  const [length, setLength] = useState("12");
  const [height, setHeight] = useState("9");
  const [walls, setWalls] = useState("4");
  const [coats, setCoats] = useState("2");
  const [coverage, setCoverage] = useState("350");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("2");

  const toNum = (s: string, min = 0) => {
    const x = Number(s);
    return Number.isFinite(x) && x >= min ? x : min;
  };

  const L = useMemo(() => toNum(length), [length]);
  const H = useMemo(() => toNum(height), [height]);
  const W = useMemo(() => toNum(walls), [walls]);
  const C = useMemo(() => Math.max(1, Math.round(toNum(coats))), [coats]);
  const COV = useMemo(() => toNum(coverage, 1) || 350, [coverage]);
  const D = useMemo(() => Math.max(0, Math.round(toNum(doors))), [doors]);
  const WIN = useMemo(() => Math.max(0, Math.round(toNum(windows))), [windows]);

  const out = useMemo(() => {
    const grossArea = L * H * W;
    const doorArea = D * 21;
    const winArea = WIN * 15;
    const netArea = Math.max(0, grossArea - doorArea - winArea);
    const totalArea = netArea * C;
    const gallonsExact = totalArea / COV;
    const gallons = Math.ceil(gallonsExact * 10) / 10;
    const gallonsRounded = Math.ceil(gallonsExact);
    return { grossArea, netArea, totalArea, gallonsExact, gallons, gallonsRounded };
  }, [L, H, W, C, COV, D, WIN]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Wall length (ft)</span>
          <input type="number" value={length} onChange={(e) => setLength(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Wall height (ft)</span>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block"># of walls</span>
          <input type="number" value={walls} onChange={(e) => setWalls(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Coats</span>
          <input type="number" value={coats} onChange={(e) => setCoats(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Coverage/gal (sqft)</span>
          <input type="number" value={coverage} onChange={(e) => setCoverage(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Doors / Windows</span>
          <div className="flex gap-2">
            <input type="number" value={doors} onChange={(e) => setDoors(e.target.value)} aria-label="doors"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
            <input type="number" value={windows} onChange={(e) => setWindows(e.target.value)} aria-label="windows"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
          </div>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Gallons needed</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{out.gallonsRounded} gal</div>
        <div className="text-xs text-slate-500">Exact: {out.gallonsExact.toFixed(2)} gal &mdash; buy {out.gallonsRounded} gallon(s) to have some in reserve.</div>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1">Inputs used</div>
        <div>Gross wall area: {out.grossArea.toFixed(0)} sqft ({L} &times; {H} &times; {W})</div>
        <div>Subtract doors: {D} &times; 21 sqft &middot; windows: {WIN} &times; 15 sqft</div>
        <div>Net paintable area: {out.netArea.toFixed(0)} sqft &times; {C} coat(s) = {out.totalArea.toFixed(0)} sqft</div>
        <div>Coverage: {COV} sqft/gal &rarr; {out.totalArea.toFixed(0)} &divide; {COV} = {out.gallonsExact.toFixed(2)} gal</div>
      </div>
    </div>
  );
}
