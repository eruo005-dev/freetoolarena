"use client";

import { useMemo, useState } from "react";

export function PizzaDoughCalculator() {
  const [pizzas, setPizzas] = useState(4);
  const [ballGrams, setBallGrams] = useState(250);
  const [hydration, setHydration] = useState(65);
  const [saltPct, setSaltPct] = useState(2.5);
  const [yeastPct, setYeastPct] = useState(0.3);
  const [oilPct, setOilPct] = useState(2);

  const totals = useMemo(() => {
    const p = Number.isFinite(pizzas) && pizzas > 0 ? pizzas : 0;
    const g = Number.isFinite(ballGrams) && ballGrams > 0 ? ballGrams : 0;
    const h = Number.isFinite(hydration) ? hydration / 100 : 0;
    const s = Number.isFinite(saltPct) ? saltPct / 100 : 0;
    const y = Number.isFinite(yeastPct) ? yeastPct / 100 : 0;
    const o = Number.isFinite(oilPct) ? oilPct / 100 : 0;

    const totalDough = p * g;
    const flour = totalDough / (1 + h + s + y + o);
    const water = flour * h;
    const salt = flour * s;
    const yeast = flour * y;
    const oil = flour * o;

    return {
      totalDough,
      flour,
      water,
      salt,
      yeast,
      oil,
    };
  }, [pizzas, ballGrams, hydration, saltPct, yeastPct, oilPct]);

  const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(n < 10 ? 2 : 0) : "0");

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Number of pizzas</span>
          <input
            type="number"
            min={1}
            value={pizzas}
            onChange={(e) => setPizzas(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Ball weight (g)</span>
          <input
            type="number"
            min={50}
            value={ballGrams}
            onChange={(e) => setBallGrams(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <span className="text-xs text-slate-500">12&quot; = 250g, 14&quot; = 320g, 16&quot; = 400g</span>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Hydration %</span>
          <input
            type="number"
            step="0.5"
            value={hydration}
            onChange={(e) => setHydration(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Salt %</span>
          <input
            type="number"
            step="0.1"
            value={saltPct}
            onChange={(e) => setSaltPct(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Yeast %</span>
          <input
            type="number"
            step="0.1"
            value={yeastPct}
            onChange={(e) => setYeastPct(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <span className="text-xs text-slate-500">0.3 dry / 1 fresh</span>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Oil %</span>
          <input
            type="number"
            step="0.5"
            value={oilPct}
            onChange={(e) => setOilPct(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <span className="text-xs text-slate-500">Italian traditional = 0</span>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left">Ingredient</th>
              <th className="px-3 py-2 text-right">Baker&rsquo;s %</th>
              <th className="px-3 py-2 text-right">Grams</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Flour</td>
              <td className="px-3 py-2 text-right">100%</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(totals.flour)} g</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Water</td>
              <td className="px-3 py-2 text-right">{hydration}%</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(totals.water)} g</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Salt</td>
              <td className="px-3 py-2 text-right">{saltPct}%</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(totals.salt)} g</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Yeast</td>
              <td className="px-3 py-2 text-right">{yeastPct}%</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(totals.yeast)} g</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-medium">Oil</td>
              <td className="px-3 py-2 text-right">{oilPct}%</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(totals.oil)} g</td>
            </tr>
            <tr className="border-t border-slate-200 bg-slate-50 font-semibold">
              <td className="px-3 py-2">Total dough</td>
              <td className="px-3 py-2 text-right">&mdash;</td>
              <td className="px-3 py-2 text-right font-mono">{fmt(totals.totalDough)} g</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-blue-900">
          <strong>Same-day:</strong> 1% dry yeast, bulk 4&ndash;6 hr at room temp, ball 1 hr before stretch.
        </div>
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-emerald-900">
          <strong>Cold ferment:</strong> 0.2&ndash;0.3% dry yeast, 24&ndash;72 hr in fridge &mdash; deeper flavor, better blister.
        </div>
      </div>
    </div>
  );
}
