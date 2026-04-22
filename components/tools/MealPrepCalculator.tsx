"use client";

import { useMemo, useState } from "react";

export function MealPrepCalculator() {
  const [calories, setCalories] = useState("2000");
  const [pPct, setPPct] = useState("30");
  const [cPct, setCPct] = useState("40");
  const [fPct, setFPct] = useState("30");
  const [meals, setMeals] = useState("4");

  const { sum, valid, rows, perMealCal, mealCount } = useMemo(() => {
    const cals = Math.max(0, parseFloat(calories) || 0);
    const p = Math.max(0, parseFloat(pPct) || 0);
    const c = Math.max(0, parseFloat(cPct) || 0);
    const f = Math.max(0, parseFloat(fPct) || 0);
    const s = p + c + f;
    const m = Math.max(3, Math.min(6, parseInt(meals) || 3));
    const perCal = cals / m;
    const pCal = (cals * p) / 100;
    const cCal = (cals * c) / 100;
    const fCal = (cals * f) / 100;
    const pG = pCal / 4;
    const cG = cCal / 4;
    const fG = fCal / 9;
    const r = Array.from({ length: m }, (_, i) => ({
      idx: i + 1,
      cal: perCal,
      p: pG / m,
      c: cG / m,
      f: fG / m,
    }));
    return {
      sum: s,
      valid: Math.abs(s - 100) < 0.01,
      rows: r,
      perMealCal: perCal,
      mealCount: m,
    };
  }, [calories, pPct, cPct, fPct, meals]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Daily calories</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Protein %</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            value={pPct}
            onChange={(e) => setPPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Carbs %</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            value={cPct}
            onChange={(e) => setCPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fat %</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={100}
            value={fPct}
            onChange={(e) => setFPct(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Meals per day (3–6)
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={3}
            max={6}
            value={meals}
            onChange={(e) => setMeals(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>

        <div
          className={`sm:col-span-2 text-sm rounded-lg px-3 py-2 border ${
            valid
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-amber-50 border-amber-200 text-amber-800"
          }`}
        >
          Macro split sums to {sum.toFixed(0)}%.{" "}
          {valid ? "Looks good." : "Please adjust so P + C + F = 100%."}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-2xl font-bold text-brand">
          {perMealCal.toFixed(0)} kcal / meal
        </div>
        <div className="text-sm text-slate-600 mt-1">
          Split over {mealCount} meals per day
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2 pr-2">Meal</th>
                <th className="py-2 pr-2">Calories</th>
                <th className="py-2 pr-2">Protein</th>
                <th className="py-2 pr-2">Carbs</th>
                <th className="py-2 pr-2">Fat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((r) => (
                <tr key={r.idx} className="text-slate-800">
                  <td className="py-2 pr-2 font-medium">Meal {r.idx}</td>
                  <td className="py-2 pr-2">{r.cal.toFixed(0)} kcal</td>
                  <td className="py-2 pr-2">{r.p.toFixed(0)} g</td>
                  <td className="py-2 pr-2">{r.c.toFixed(0)} g</td>
                  <td className="py-2 pr-2">{r.f.toFixed(0)} g</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — consult a doctor or RD for medical advice.
      </p>
    </div>
  );
}
