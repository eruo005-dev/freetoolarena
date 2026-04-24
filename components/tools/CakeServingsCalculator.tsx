"use client";

import { useMemo, useState } from "react";

type Shape = "round" | "square";
type SliceSize = "wedding" | "party" | "dessert";

const SLICE: Record<SliceSize, { label: string; dims: string; factor: number }> = {
  wedding: { label: "Standard wedding (1\" x 2\")", dims: "1 x 2 in", factor: 1.0 },
  party: { label: "Party (1.5\" x 2\")", dims: "1.5 x 2 in", factor: 1.5 / 1.0 },
  dessert: { label: "Dessert (2\" x 2\")", dims: "2 x 2 in", factor: 2.0 },
};

// Wilton wedding-slice servings
const TIERS: { size: number; shape: Shape; servings: number }[] = [
  { size: 6, shape: "round", servings: 12 },
  { size: 8, shape: "round", servings: 24 },
  { size: 10, shape: "round", servings: 38 },
  { size: 12, shape: "round", servings: 56 },
  { size: 14, shape: "round", servings: 78 },
  { size: 16, shape: "round", servings: 100 },
  { size: 6, shape: "square", servings: 18 },
  { size: 8, shape: "square", servings: 32 },
  { size: 10, shape: "square", servings: 50 },
  { size: 12, shape: "square", servings: 72 },
  { size: 14, shape: "square", servings: 98 },
];

export interface CakeServingsCalculatorProps {
  initialGuests?: number;
  initialSlice?: SliceSize;
  initialShape?: Shape;
}

function buildConfig(target: number, shape: Shape, factor: number) {
  // Try 1-tier, 2-tier, 3-tier, 4-tier combos; pick the one that covers target with least excess.
  const pool = TIERS.filter((t) => t.shape === shape);
  const adjusted = pool.map((t) => ({ ...t, effective: Math.floor(t.servings / factor) }));

  type Combo = { tiers: typeof adjusted; total: number };
  const best: Combo[] = [];

  for (const a of adjusted) {
    if (a.effective >= target) best.push({ tiers: [a], total: a.effective });
  }
  for (let i = 0; i < adjusted.length; i++) {
    for (let j = i; j < adjusted.length; j++) {
      const sum = adjusted[i].effective + adjusted[j].effective;
      if (sum >= target) best.push({ tiers: [adjusted[j], adjusted[i]], total: sum });
    }
  }
  for (let i = 0; i < adjusted.length; i++) {
    for (let j = i; j < adjusted.length; j++) {
      for (let k = j; k < adjusted.length; k++) {
        const sum = adjusted[i].effective + adjusted[j].effective + adjusted[k].effective;
        if (sum >= target) best.push({ tiers: [adjusted[k], adjusted[j], adjusted[i]], total: sum });
      }
    }
  }
  for (let i = 0; i < adjusted.length; i++) {
    for (let j = i; j < adjusted.length; j++) {
      for (let k = j; k < adjusted.length; k++) {
        for (let l = k; l < adjusted.length; l++) {
          const sum = adjusted[i].effective + adjusted[j].effective + adjusted[k].effective + adjusted[l].effective;
          if (sum >= target) best.push({ tiers: [adjusted[l], adjusted[k], adjusted[j], adjusted[i]], total: sum });
        }
      }
    }
  }

  if (best.length === 0) {
    // target too big — recommend 4 largest
    const big = [...adjusted].sort((a, b) => b.effective - a.effective).slice(0, 4);
    return { tiers: big, total: big.reduce((s, t) => s + t.effective, 0), shortage: true };
  }

  best.sort((a, b) => (a.total - target) - (b.total - target) || a.tiers.length - b.tiers.length);
  return { ...best[0], shortage: false };
}

export function CakeServingsCalculator({
  initialGuests = 100,
  initialSlice = "wedding",
  initialShape = "round",
}: CakeServingsCalculatorProps = {}) {
  const [guests, setGuests] = useState(String(initialGuests));
  const [slice, setSlice] = useState<SliceSize>(initialSlice);
  const [shape, setShape] = useState<Shape>(initialShape);

  const { config, guestCount, tierLabel } = useMemo(() => {
    const g = Math.max(1, parseFloat(guests) || 0);
    const gNum = Number.isFinite(g) ? Math.round(g) : 1;
    const factor = SLICE[slice].factor;
    const cfg = buildConfig(gNum, shape, factor);
    const labels = ["1-tier", "2-tier", "3-tier", "4-tier"];
    return { config: cfg, guestCount: gNum, tierLabel: labels[cfg.tiers.length - 1] ?? `${cfg.tiers.length}-tier` };
  }, [guests, slice, shape]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Guest count</span>
          <input
            type="number"
            min={1}
            step={1}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Serving size</span>
          <select
            value={slice}
            onChange={(e) => setSlice(e.target.value as SliceSize)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white"
          >
            {Object.entries(SLICE).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Cake shape</span>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value as Shape)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white"
          >
            <option value="round">Round</option>
            <option value="square">Square</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-3 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold mb-1 text-slate-500">Recommended config</p>
          <p className="text-3xl font-bold text-brand">{tierLabel}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold mb-1 text-slate-500">Total servings</p>
          <p className="text-2xl font-bold text-slate-900">{config.total}</p>
          <p className="text-xs text-slate-500 mt-1">at {SLICE[slice].dims} slice</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold mb-1 text-slate-500">Guests</p>
          <p className="text-2xl font-bold text-slate-900">{guestCount}</p>
          <p className={`text-xs mt-1 ${config.shortage ? "text-rose-600 font-medium" : "text-emerald-600"}`}>
            {config.shortage ? "Short — consider party slices or more tiers" : `${config.total - guestCount} extra`}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="text-left px-4 py-2 font-semibold">Tier</th>
              <th className="text-left px-4 py-2 font-semibold">Size</th>
              <th className="text-right px-4 py-2 font-semibold">Wedding slices</th>
              <th className="text-right px-4 py-2 font-semibold">At selected slice</th>
            </tr>
          </thead>
          <tbody>
            {config.tiers.map((t, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-4 py-2 text-slate-800">Tier {config.tiers.length - i} (top to bottom)</td>
                <td className="px-4 py-2 text-slate-700">{t.size}&quot; {t.shape}</td>
                <td className="px-4 py-2 text-right text-slate-600">{t.servings}</td>
                <td className="px-4 py-2 text-right font-semibold text-slate-900">{t.effective}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <h3 className="font-semibold text-slate-900 mb-1">Wedding vs. party slices</h3>
        <p>
          A wedding slice is 1&quot; x 2&quot;&mdash;a polite sliver that stretches cake across a big crowd. A party slice is 1.5&quot; x 2&quot;, dessert slice is 2&quot; x 2&quot;. Plan for the size you&rsquo;ll actually serve or you&rsquo;ll run out.
        </p>
      </div>
    </div>
  );
}
