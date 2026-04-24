"use client";

import { useMemo, useState } from "react";

type Material = "cedar" | "pine" | "composite" | "metal";
type SoilMix = "topsoil-compost" | "mels" | "premium";

const MATERIALS: Record<Material, { name: string; costPerLinFt: number; lifespan: string; flat?: number }> = {
  cedar: { name: "Cedar (2x12)", costPerLinFt: 5, lifespan: "10-15 years" },
  pine: { name: "Pine (untreated 2x12)", costPerLinFt: 3, lifespan: "5-7 years" },
  composite: { name: "Composite (Trex-like)", costPerLinFt: 8, lifespan: "20+ years" },
  metal: { name: "Galvanized metal (prefab)", costPerLinFt: 0, lifespan: "20+ years", flat: 275 },
};

const SOIL: Record<SoilMix, { name: string; costPerYd: number; note: string }> = {
  "topsoil-compost": { name: "Topsoil + compost (50/50)", costPerYd: 30, note: "Budget option &mdash; works for most crops." },
  mels: { name: "Mel's Mix (33/33/33 peat, vermiculite, compost)", costPerYd: 80, note: "Square Foot Gardening standard. Premium but productive." },
  premium: { name: "Premium organic blend", costPerYd: 65, note: "Ready-to-plant, nutrient-rich." },
};

export function RaisedBedCostCalculator() {
  const [length, setLength] = useState(8);
  const [width, setWidth] = useState(4);
  const [heightIn, setHeightIn] = useState(12);
  const [material, setMaterial] = useState<Material>("cedar");
  const [soilMix, setSoilMix] = useState<SoilMix>("topsoil-compost");

  const result = useMemo(() => {
    const L = Number.isFinite(length) && length > 0 ? length : 0;
    const W = Number.isFinite(width) && width > 0 ? width : 0;
    const H = Number.isFinite(heightIn) && heightIn > 0 ? heightIn : 0;

    const mat = MATERIALS[material];
    const perimeter = 2 * (L + W);
    // height in ft determines number of board stacks. 2x12 = ~11.25" actual, so 1 stack per 12" of height approx
    const stacks = Math.max(1, Math.ceil(H / 12));
    const linFt = perimeter * stacks;
    const lumberCost = mat.flat !== undefined ? mat.flat : linFt * mat.costPerLinFt;

    const sqft = L * W;
    const cubicFeet = sqft * (H / 12);
    const cubicYards = cubicFeet / 27;

    const soil = SOIL[soilMix];
    const soilCost = cubicYards * soil.costPerYd;

    const hardwareCost = material === "metal" ? 0 : 15;
    const total = lumberCost + soilCost + hardwareCost;
    const perSqft = sqft > 0 ? total / sqft : 0;

    return {
      sqft,
      cubicYards,
      linFt,
      lumberCost,
      soilCost,
      hardwareCost,
      total,
      perSqft,
      lifespan: mat.lifespan,
      soilNote: soil.note,
    };
  }, [length, width, heightIn, material, soilMix]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Length (ft)</span>
          <input
            type="number"
            min={1}
            step={1}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Width (ft)</span>
          <input
            type="number"
            min={1}
            step={1}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Height (inches)</span>
          <input
            type="number"
            min={6}
            step={1}
            value={heightIn}
            onChange={(e) => setHeightIn(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Frame material</span>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as Material)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            {Object.entries(MATERIALS).map(([key, m]) => (
              <option key={key} value={key}>{m.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Soil mix</span>
          <select
            value={soilMix}
            onChange={(e) => setSoilMix(e.target.value as SoilMix)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            {Object.entries(SOIL).map(([key, s]) => (
              <option key={key} value={key}>{s.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Lumber / frame</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">${result.lumberCost.toFixed(0)}</div>
          <div className="text-xs text-slate-500">{material === "metal" ? "Prefab kit" : `${result.linFt} lin ft`}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Soil</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">${result.soilCost.toFixed(0)}</div>
          <div className="text-xs text-slate-500">{result.cubicYards.toFixed(2)} cu yd</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Hardware</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">${result.hardwareCost.toFixed(0)}</div>
          <div className="text-xs text-slate-500">Screws, brackets</div>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs text-emerald-700 uppercase tracking-wide">Total cost</div>
          <div className="text-3xl font-semibold text-brand mt-1">${result.total.toFixed(0)}</div>
          <div className="text-xs text-emerald-800">${result.perSqft.toFixed(2)}/sqft</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700">
          <strong>Frame lifespan:</strong> {result.lifespan}. Cedar is the sweet spot for durability vs cost. Avoid pressure-treated wood for edible gardens.
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-slate-700">
          <strong>Soil note:</strong> {result.soilNote} Buy bulk for anything over 1 cu yd; bagged soil is ~2x the price.
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Bed size:</strong> {result.sqft} sqft, {result.cubicYards.toFixed(2)} cu yd of soil. Most gardeners find 4ft width ideal &mdash; you can reach the center from either side without stepping on the soil.
      </div>
    </div>
  );
}
