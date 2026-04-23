"use client";
import { useMemo, useState } from "react";

export function TileCountCalculator() {
  const [area, setArea] = useState("120");
  const [tileW, setTileW] = useState("12");
  const [tileH, setTileH] = useState("12");
  const [waste, setWaste] = useState("10");
  const [perBox, setPerBox] = useState("10");

  const toNum = (s: string, min = 0) => {
    const x = Number(s);
    return Number.isFinite(x) && x >= min ? x : min;
  };

  const A = useMemo(() => toNum(area), [area]);
  const TW = useMemo(() => toNum(tileW, 0.1) || 12, [tileW]);
  const TH = useMemo(() => toNum(tileH, 0.1) || 12, [tileH]);
  const WPCT = useMemo(() => toNum(waste), [waste]);
  const PB = useMemo(() => Math.max(0, Math.round(toNum(perBox))), [perBox]);

  const out = useMemo(() => {
    const tileSqft = (TW * TH) / 144;
    const baseTiles = tileSqft > 0 ? A / tileSqft : 0;
    const withWaste = baseTiles * (1 + WPCT / 100);
    const tiles = Math.ceil(withWaste);
    const boxes = PB > 0 ? Math.ceil(tiles / PB) : 0;
    return { tileSqft, baseTiles, withWaste, tiles, boxes };
  }, [A, TW, TH, WPCT, PB]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Area to tile (sqft)</span>
          <input type="number" value={area} onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tile width (in)</span>
          <input type="number" value={tileW} onChange={(e) => setTileW(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tile height (in)</span>
          <input type="number" value={tileH} onChange={(e) => setTileH(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Waste %</span>
          <input type="number" value={waste} onChange={(e) => setWaste(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tiles per box (opt)</span>
          <input type="number" value={perBox} onChange={(e) => setPerBox(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Tiles needed</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{out.tiles}</div>
        {out.boxes > 0 ? <div className="text-xs text-slate-500">&asymp; {out.boxes} box(es) at {PB}/box</div> : null}
      </div>

      <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1">Inputs used</div>
        <div>Tile coverage: {TW}&times;{TH} in = {out.tileSqft.toFixed(3)} sqft each</div>
        <div>Base tiles: {A} &divide; {out.tileSqft.toFixed(3)} = {out.baseTiles.toFixed(1)}</div>
        <div>With {WPCT}% waste: {out.withWaste.toFixed(1)} &rarr; round up to {out.tiles}</div>
      </div>
    </div>
  );
}
