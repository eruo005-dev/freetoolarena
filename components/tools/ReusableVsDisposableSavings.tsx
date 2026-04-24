"use client";

import { useEffect, useMemo, useState } from "react";

type Preset = {
  id: string;
  label: string;
  reusableCost: number;
  lifespan: number;
  freq: "daily" | "weekly";
  units: number;
  dispCost: number;
  impact: (totalUnits: number) => string;
};

const PRESETS: Preset[] = [
  {
    id: "bottle",
    label: "Water bottle",
    reusableCost: 30,
    lifespan: 5,
    freq: "daily",
    units: 2,
    dispCost: 1.5,
    impact: (u) => `${Math.round(u).toLocaleString()} single-use plastic bottles avoided`,
  },
  {
    id: "coffee",
    label: "Reusable coffee cup",
    reusableCost: 25,
    lifespan: 4,
    freq: "daily",
    units: 1,
    dispCost: 0.3,
    impact: (u) => `${Math.round(u).toLocaleString()} paper cups + lids kept out of landfill`,
  },
  {
    id: "containers",
    label: "Food containers",
    reusableCost: 40,
    lifespan: 8,
    freq: "weekly",
    units: 4,
    dispCost: 0.4,
    impact: (u) => `${Math.round(u).toLocaleString()} plastic takeout containers saved`,
  },
  {
    id: "razor",
    label: "Safety razor",
    reusableCost: 35,
    lifespan: 10,
    freq: "weekly",
    units: 1,
    dispCost: 2.5,
    impact: (u) => `${Math.round(u).toLocaleString()} disposable razor cartridges avoided`,
  },
  {
    id: "cup",
    label: "Menstrual cup",
    reusableCost: 35,
    lifespan: 10,
    freq: "weekly",
    units: 20,
    dispCost: 0.25,
    impact: (u) => `${Math.round(u).toLocaleString()} tampons/pads kept out of landfill`,
  },
  {
    id: "diapers",
    label: "Cloth diapers",
    reusableCost: 600,
    lifespan: 3,
    freq: "daily",
    units: 8,
    dispCost: 0.3,
    impact: (u) => `${Math.round(u).toLocaleString()} disposable diapers avoided`,
  },
  {
    id: "bags",
    label: "Reusable bags",
    reusableCost: 15,
    lifespan: 5,
    freq: "weekly",
    units: 3,
    dispCost: 0.1,
    impact: (u) => `${Math.round(u).toLocaleString()} plastic bags avoided`,
  },
  {
    id: "cloths",
    label: "Cleaning cloths",
    reusableCost: 20,
    lifespan: 3,
    freq: "weekly",
    units: 4,
    dispCost: 0.2,
    impact: (u) => `${Math.round(u).toLocaleString()} paper towel sheets avoided`,
  },
];

export function ReusableVsDisposableSavings() {
  const [productId, setProductId] = useState("bottle");
  const preset = PRESETS.find((p) => p.id === productId) ?? PRESETS[0];

  const [reusableCost, setReusableCost] = useState(preset.reusableCost);
  const [lifespan, setLifespan] = useState(preset.lifespan);
  const [freq, setFreq] = useState<"daily" | "weekly">(preset.freq);
  const [units, setUnits] = useState(preset.units);
  const [dispCost, setDispCost] = useState(preset.dispCost);
  const [maintenance, setMaintenance] = useState(10);

  useEffect(() => {
    setReusableCost(preset.reusableCost);
    setLifespan(preset.lifespan);
    setFreq(preset.freq);
    setUnits(preset.units);
    setDispCost(preset.dispCost);
  }, [productId, preset]);

  const result = useMemo(() => {
    const rc = Number.isFinite(reusableCost) ? reusableCost : 0;
    const ls = Number.isFinite(lifespan) && lifespan > 0 ? lifespan : 1;
    const u = Number.isFinite(units) ? units : 0;
    const dc = Number.isFinite(dispCost) ? dispCost : 0;
    const m = Number.isFinite(maintenance) ? maintenance : 0;

    const unitsPerYear = freq === "daily" ? u * 365 : u * 52;
    const dispAnnual = unitsPerYear * dc;
    const reusableAnnual = rc / ls + m;
    const annualSavings = dispAnnual - reusableAnnual;
    const lifetimeSavings = annualSavings * ls;

    const monthlyDispSavings = dispAnnual / 12;
    const breakevenMonths =
      monthlyDispSavings > 0 ? Math.max(0, rc / monthlyDispSavings) : Infinity;

    const totalUnitsLifetime = unitsPerYear * ls;

    return {
      unitsPerYear,
      dispAnnual,
      reusableAnnual,
      annualSavings,
      lifetimeSavings,
      breakevenMonths,
      totalUnitsLifetime,
    };
  }, [reusableCost, lifespan, freq, units, dispCost, maintenance]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Product</span>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="rounded border border-slate-300 px-3 py-2"
        >
          {PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Reusable upfront cost ($)</span>
          <input
            type="number"
            value={reusableCost}
            onChange={(e) => setReusableCost(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Reusable lifespan (years)</span>
          <input
            type="number"
            value={lifespan}
            onChange={(e) => setLifespan(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Usage frequency</span>
          <select
            value={freq}
            onChange={(e) => setFreq(e.target.value as "daily" | "weekly")}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="daily">Per day</option>
            <option value="weekly">Per week</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Disposable units used each {freq === "daily" ? "day" : "week"}</span>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Disposable cost per unit ($)</span>
          <input
            type="number"
            step="0.01"
            value={dispCost}
            onChange={(e) => setDispCost(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Maintenance cost ($/yr)</span>
          <input
            type="number"
            value={maintenance}
            onChange={(e) => setMaintenance(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Annual disposable cost</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.dispAnnual)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Annual reusable cost</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.reusableAnnual)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Lifetime savings</div>
          <div className="text-2xl font-bold text-brand">{fmt(result.lifetimeSavings)}</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Breakeven</div>
          <div className="text-2xl font-bold text-brand">
            {Number.isFinite(result.breakevenMonths)
              ? `${result.breakevenMonths.toFixed(1)} mo`
              : "\u2014"}
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
        Environmental impact over the reusable&rsquo;s lifespan:{" "}
        <strong>{preset.impact(result.totalUnitsLifetime)}</strong>.
      </div>
    </div>
  );
}
