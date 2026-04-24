"use client";

import { useMemo, useState } from "react";

export function MulchCubicYardsCalculator() {
  const [sqft, setSqft] = useState(200);
  const [depthIn, setDepthIn] = useState(3);

  const result = useMemo(() => {
    const a = Number.isFinite(sqft) && sqft > 0 ? sqft : 0;
    const d = Number.isFinite(depthIn) && depthIn > 0 ? depthIn : 0;
    const cubicFeet = a * (d / 12);
    const cubicYards = cubicFeet / 27;
    const bulkCost = cubicYards * 30;
    const bagsNeeded = Math.ceil(cubicFeet / 2);
    const bagCost = bagsNeeded * 4;
    return { cubicFeet, cubicYards, bulkCost, bagsNeeded, bagCost };
  }, [sqft, depthIn]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Area (square feet)</span>
          <input
            type="number"
            min={0}
            step={1}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <span className="text-xs text-slate-500">Length x width of the bed</span>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Depth (inches)</span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={depthIn}
            onChange={(e) => setDepthIn(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <span className="text-xs text-slate-500">3&quot; standard, 2&quot; around trees</span>
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Cubic yards</div>
          <div className="text-3xl font-semibold text-brand mt-1">{result.cubicYards.toFixed(2)}</div>
          <div className="text-sm text-slate-600">{result.cubicFeet.toFixed(1)} cu ft</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Bulk cost ($30/yd)</div>
          <div className="text-3xl font-semibold text-slate-900 mt-1">${result.bulkCost.toFixed(0)}</div>
          <div className="text-sm text-slate-600">Delivered, dumped in driveway</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Bagged ($4 / 2-cu-ft)</div>
          <div className="text-3xl font-semibold text-slate-900 mt-1">${result.bagCost.toFixed(0)}</div>
          <div className="text-sm text-slate-600">{result.bagsNeeded} bags needed</div>
        </div>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
        <strong>Coverage note:</strong> 3 inches is standard for weed suppression; 2 inches is plenty around trees (deeper can smother root flares). Refresh 1&quot; annually as mulch decomposes.
      </div>

      <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">
        <strong>Delivery tip:</strong> Bulk is cheaper above ~2 cubic yards once you factor delivery fees ($50-100). Below that, bagged is easier to handle and move in a wheelbarrow. Call two suppliers for quotes &mdash; mulch pricing varies 30-50% locally.
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Formula:</strong> cu ft = sqft &times; (depth &divide; 12); cu yd = cu ft &divide; 27. A standard 2-cu-ft bag covers 8 sqft at 3&quot; depth.
      </div>
    </div>
  );
}
