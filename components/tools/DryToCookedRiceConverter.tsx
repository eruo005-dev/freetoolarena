"use client";

import { useMemo, useState } from "react";

type Grain = "white" | "jasmine" | "basmati" | "brown" | "wild" | "quinoa" | "farro" | "barley" | "couscous" | "bulgur";
type Direction = "dry_to_cooked" | "cooked_to_dry";

const RATIOS: Record<Grain, { water: number; yield: number; minutes: string; label: string }> = {
  white:    { water: 1.75, yield: 3.0, minutes: "18-20", label: "White (long-grain)" },
  jasmine:  { water: 1.50, yield: 3.0, minutes: "15-18", label: "Jasmine" },
  basmati:  { water: 1.50, yield: 3.0, minutes: "15-18", label: "Basmati" },
  brown:    { water: 2.25, yield: 3.0, minutes: "40-45", label: "Brown rice" },
  wild:     { water: 3.00, yield: 3.5, minutes: "45-55", label: "Wild rice" },
  quinoa:   { water: 2.00, yield: 3.0, minutes: "15", label: "Quinoa" },
  farro:    { water: 2.50, yield: 3.0, minutes: "25-30", label: "Farro" },
  barley:   { water: 2.50, yield: 3.5, minutes: "40-45", label: "Pearl barley" },
  couscous: { water: 1.25, yield: 2.5, minutes: "5", label: "Couscous (instant)" },
  bulgur:   { water: 1.50, yield: 3.0, minutes: "12-15", label: "Bulgur" },
};

export function DryToCookedRiceConverter() {
  const [grain, setGrain] = useState<Grain>("white");
  const [direction, setDirection] = useState<Direction>("dry_to_cooked");
  const [amount, setAmount] = useState<number>(1);

  const result = useMemo(() => {
    if (!Number.isFinite(amount) || amount < 0) return null;
    const r = RATIOS[grain];
    if (direction === "dry_to_cooked") {
      const cooked = amount * r.yield;
      const water = amount * r.water;
      return { dry: amount, cooked, water, ratio: r };
    } else {
      const dry = amount / r.yield;
      const water = dry * r.water;
      return { dry, cooked: amount, water, ratio: r };
    }
  }, [amount, grain, direction]);

  const fmt = (n: number) => {
    if (n < 0.1) return n.toFixed(2);
    if (n < 1) return n.toFixed(2);
    return n.toFixed(2);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Grain type</span>
          <select
            value={grain}
            onChange={(e) => setGrain(e.target.value as Grain)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            {Object.entries(RATIOS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Convert</span>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as Direction)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="dry_to_cooked">Dry &rarr; Cooked</option>
            <option value="cooked_to_dry">Cooked &rarr; Dry</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Amount (cups)</span>
          <input
            type="number"
            min={0}
            step={0.25}
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Dry</div>
              <div className="text-2xl font-bold text-slate-800">{fmt(result.dry)} cups</div>
            </div>
            <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4">
              <div className="text-xs uppercase tracking-wide text-emerald-700">Cooked yield</div>
              <div className="text-2xl font-bold text-emerald-900">{fmt(result.cooked)} cups</div>
              <div className="mt-1 text-xs text-emerald-800">~{Math.round(result.cooked * 4)} servings (1/2 cup ea)</div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Water needed</div>
              <div className="text-2xl font-bold text-brand">{fmt(result.water)} cups</div>
              <div className="mt-1 text-xs text-slate-500">For stovetop method</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <h4 className="mb-2 font-semibold">Quick recipe for {result.ratio.label}</h4>
            <ol className="list-decimal space-y-1 pl-5">
              <li>Rinse {fmt(result.dry)} cup{result.dry !== 1 ? "s" : ""} of grain in cold water until water runs mostly clear (skip for couscous/bulgur).</li>
              <li>Combine grain with {fmt(result.water)} cup{result.water !== 1 ? "s" : ""} water and a pinch of salt in a saucepan.</li>
              <li>Bring to a boil, then cover and reduce to lowest simmer.</li>
              <li>Cook {result.ratio.minutes} minutes without lifting the lid.</li>
              <li>Remove from heat, rest covered 5 minutes, then fluff with a fork.</li>
            </ol>
            <p className="mt-3 text-xs text-slate-500">
              Ratio used: {result.ratio.water}:1 water-to-grain &middot; yield ~{result.ratio.yield}&times; the dry volume.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">All ratios at a glance</h4>
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="py-1">Grain</th>
                  <th className="py-1">Water</th>
                  <th className="py-1">Yield</th>
                  <th className="py-1">Time</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(RATIOS).map(([k, v]) => (
                  <tr key={k} className={`border-t border-slate-100 ${k === grain ? "bg-amber-50" : ""}`}>
                    <td className="py-1">{v.label}</td>
                    <td className="py-1 text-slate-600">{v.water}:1</td>
                    <td className="py-1 text-slate-600">{v.yield}&times;</td>
                    <td className="py-1 text-slate-600">{v.minutes} min</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
