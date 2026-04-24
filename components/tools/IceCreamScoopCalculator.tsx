"use client";

import { useMemo, useState } from "react";

const SCOOP_GRAMS: Record<string, number> = {
  small: 50,
  medium: 100,
  large: 150,
};

const PINT_ML = 473;
const QUART_ML = 946;
const GALLON_ML = 3785;
const COST_PER_QUART = 7; // USD

export function IceCreamScoopCalculator() {
  const [adults, setAdults] = useState(10);
  const [children, setChildren] = useState(4);
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [flavorsText, setFlavorsText] = useState("Vanilla, Chocolate, Strawberry");

  const flavors = useMemo(
    () => flavorsText.split(",").map((f) => f.trim()).filter(Boolean),
    [flavorsText]
  );

  const out = useMemo(() => {
    const a = Number.isFinite(adults) && adults > 0 ? adults : 0;
    const c = Number.isFinite(children) && children >= 0 ? children : 0;
    const perScoop = SCOOP_GRAMS[size] ?? 100;
    const totalGrams = a * perScoop + c * (perScoop / 2);
    // Ice cream density ~ 0.56 g/ml for packaged (due to overrun).
    const density = 0.56;
    const totalMl = totalGrams / density;
    const totalL = totalMl / 1000;

    const pints = totalMl / PINT_ML;
    const quarts = totalMl / QUART_ML;
    const gallons = totalMl / GALLON_ML;

    const cost = quarts * COST_PER_QUART;
    const perFlavorMl = flavors.length > 0 ? totalMl / flavors.length : 0;
    const perFlavorG = flavors.length > 0 ? totalGrams / flavors.length : 0;

    return {
      totalGrams,
      totalL,
      pints,
      quarts,
      gallons,
      cost,
      perFlavorMl,
      perFlavorG,
      perScoop,
    };
  }, [adults, children, size, flavors]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Adults</span>
          <input
            type="number"
            min={0}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Children (half portion)</span>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Scoop size</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as "small" | "medium" | "large")}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="small">Small (50 g)</option>
            <option value="medium">Medium (100 g)</option>
            <option value="large">Large (150 g)</option>
          </select>
        </label>
        <label className="block text-sm col-span-2 md:col-span-1">
          <span className="text-slate-700">Flavors (comma sep.)</span>
          <input
            value={flavorsText}
            onChange={(e) => setFlavorsText(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{out.totalL.toFixed(2)} L</div>
          <div className="text-sm text-slate-600">{Math.round(out.totalGrams)} g</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Pints</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{Math.ceil(out.pints)}</div>
          <div className="text-sm text-slate-600">{out.pints.toFixed(2)} exact</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Quarts</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{Math.ceil(out.quarts)}</div>
          <div className="text-sm text-slate-600">{out.quarts.toFixed(2)} exact</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Gallons</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{out.gallons.toFixed(2)}</div>
          <div className="text-sm text-slate-600">&asymp; ${out.cost.toFixed(0)} cost</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800">
          Per flavor ({flavors.length || 0} flavors)
        </div>
        {flavors.length === 0 ? (
          <div className="p-3 text-sm text-slate-500">Add at least one flavor above.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white">
              <tr>
                <th className="px-3 py-2 text-left">Flavor</th>
                <th className="px-3 py-2 text-right">Grams</th>
                <th className="px-3 py-2 text-right">ml</th>
              </tr>
            </thead>
            <tbody>
              {flavors.map((f) => (
                <tr key={f} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-medium text-slate-800">{f}</td>
                  <td className="px-3 py-2 text-right font-mono">{Math.round(out.perFlavorG)} g</td>
                  <td className="px-3 py-2 text-right font-mono">{Math.round(out.perFlavorMl)} ml</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
        <strong>Tip:</strong> Scoop ahead into cupcake liners and freeze on a tray &mdash; guests self-serve without the fight, and nobody&rsquo;s bending a spoon on rock-hard ice cream.
      </div>
      <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
        Assumes {out.perScoop} g per adult scoop, half for kids. Cost uses $7/quart average for mid-tier supermarket brands &mdash; adjust for premium pints.
      </div>
    </div>
  );
}
