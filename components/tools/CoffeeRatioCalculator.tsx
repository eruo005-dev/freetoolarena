"use client";

import { useMemo, useState } from "react";

type MethodKey = "drip" | "french-press" | "espresso" | "aeropress" | "pour-over" | "cold-brew";

interface Method {
  label: string;
  ratio: number; // coffee-to-water (1:ratio)
  strength: string;
  note: string;
}

const METHODS: Record<MethodKey, Method> = {
  drip: { label: "Drip machine", ratio: 16, strength: "Balanced", note: "Standard golden ratio (SCA recommended)." },
  "french-press": { label: "French press", ratio: 15, strength: "Full-bodied", note: "Coarse grind; steep 4 minutes." },
  espresso: { label: "Espresso", ratio: 2, strength: "Concentrated", note: "Double shot: 18g in \u2192 36g out over 25\u201330 sec." },
  aeropress: { label: "AeroPress", ratio: 14, strength: "Clean, bold", note: "Inverted method recommended." },
  "pour-over": { label: "Pour-over (V60, Chemex)", ratio: 16.5, strength: "Clarity", note: "Medium-fine grind; total brew 3\u20134 min." },
  "cold-brew": { label: "Cold brew (concentrate)", ratio: 8, strength: "Strong concentrate", note: "Coarse grind; steep 12\u201318 hours. Dilute 1:1 to serve." },
};

const ML_PER_CUP = 180;
const G_PER_TBSP_COFFEE = 5;

export function CoffeeRatioCalculator() {
  const [method, setMethod] = useState<MethodKey>("drip");
  const [cups, setCups] = useState("2");

  const result = useMemo(() => {
    const c = parseFloat(cups);
    if (!Number.isFinite(c) || c <= 0) return null;

    const m = METHODS[method];
    const waterMl = c * ML_PER_CUP;
    const waterG = waterMl; // 1ml water = 1g
    const coffeeG = waterG / m.ratio;
    const coffeeTbsp = coffeeG / G_PER_TBSP_COFFEE;
    const waterOz = waterMl / 29.574;

    return { method: m, waterMl, waterG, coffeeG, coffeeTbsp, waterOz };
  }, [method, cups]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Brew method</span>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as MethodKey)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {Object.entries(METHODS).map(([key, m]) => (
              <option key={key} value={key}>
                {m.label} (1:{m.ratio})
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Cups desired (1 cup = 6 oz / 180 ml)</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={cups}
            onChange={(e) => setCups(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">Coffee</div>
              <div className="mt-1 text-3xl font-bold text-amber-900">{result.coffeeG.toFixed(1)} g</div>
              <div className="mt-1 text-sm text-slate-700">
                &asymp; {result.coffeeTbsp.toFixed(1)} tbsp
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">Water</div>
              <div className="mt-1 text-3xl font-bold text-blue-900">{result.waterG.toFixed(0)} g</div>
              <div className="mt-1 text-sm text-slate-700">
                {result.waterMl.toFixed(0)} ml &middot; {result.waterOz.toFixed(1)} oz
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Ratio &amp; strength</div>
            <div className="mt-1 text-2xl font-bold text-brand">1 : {result.method.ratio}</div>
            <div className="mt-1 text-sm text-slate-700">
              <span className="font-medium">{result.method.strength}</span> &middot; {result.method.note}
            </div>
          </div>
        </>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-2 text-sm font-semibold text-slate-700">Reference ratios</div>
        <div className="space-y-1 text-sm">
          {Object.entries(METHODS).map(([key, m]) => (
            <div key={key} className="flex items-center justify-between rounded px-2 py-1 odd:bg-slate-50">
              <span className="text-slate-700">{m.label}</span>
              <span className="font-mono text-slate-900">1:{m.ratio}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Measure by weight for consistency (kitchen scale). Adjust &plusmn;1 g per cup to dial in strength to your
        taste.
      </p>
    </div>
  );
}
