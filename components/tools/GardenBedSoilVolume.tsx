"use client";

import { useMemo, useState } from "react";

export function GardenBedSoilVolume() {
  const [lengthFt, setLengthFt] = useState("8");
  const [widthFt, setWidthFt] = useState("4");
  const [depthIn, setDepthIn] = useState("12");

  const result = useMemo(() => {
    const L = parseFloat(lengthFt);
    const W = parseFloat(widthFt);
    const D = parseFloat(depthIn);
    if (!Number.isFinite(L) || !Number.isFinite(W) || !Number.isFinite(D)) return null;
    if (L <= 0 || W <= 0 || D <= 0) return null;

    const cuFt = L * W * (D / 12);
    const cuYd = cuFt / 27;
    const cuFtWithExtra = cuFt * 1.1;
    const cuYdWithExtra = cuYd * 1.1;

    const bagSize = 1.5;
    const bagsNeeded = Math.ceil(cuFtWithExtra / bagSize);

    const bagCostLow = bagsNeeded * 5;
    const bagCostHigh = bagsNeeded * 8;
    const bulkCost = cuYdWithExtra * 30;

    return {
      cuFt,
      cuYd,
      cuFtWithExtra,
      cuYdWithExtra,
      bagsNeeded,
      bagCostLow,
      bagCostHigh,
      bulkCost,
    };
  }, [lengthFt, widthFt, depthIn]);

  const money = (n: number) => `$${n.toFixed(0)}`;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Bed length (ft)</label>
          <input
            type="number"
            min="1"
            step="0.5"
            value={lengthFt}
            onChange={(e) => setLengthFt(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Bed width (ft)</label>
          <input
            type="number"
            min="1"
            step="0.5"
            value={widthFt}
            onChange={(e) => setWidthFt(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Soil depth (in)</label>
          <input
            type="number"
            min="1"
            step="1"
            value={depthIn}
            onChange={(e) => setDepthIn(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </div>
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Cubic feet</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.cuFt.toFixed(1)} ft&sup3;</div>
              <div className="mt-1 text-xs text-slate-500">
                With 10% extra: {result.cuFtWithExtra.toFixed(1)} ft&sup3;
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Cubic yards</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.cuYd.toFixed(2)} yd&sup3;</div>
              <div className="mt-1 text-xs text-slate-500">
                With 10% extra: {result.cuYdWithExtra.toFixed(2)} yd&sup3;
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Bags needed (1.5 cu ft each)</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{result.bagsNeeded} bags</div>
            <div className="mt-1 text-xs text-slate-500">Includes 10% extra for settling</div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Bagged cost ($5&ndash;8/bag)</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {money(result.bagCostLow)}&ndash;{money(result.bagCostHigh)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Bulk delivery ($30/yd&sup3;)</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{money(result.bulkCost)}</div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Bulk is usually cheaper past ~1 cubic yard, but adds a delivery fee ($50&ndash;150). Bags are handier for
            small or rooftop beds. Always add 10% extra for settling &mdash; fresh mix compacts 1&ndash;2 inches in the
            first month.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Enter positive values for length, width, and depth to calculate soil volume.
        </div>
      )}
    </div>
  );
}
