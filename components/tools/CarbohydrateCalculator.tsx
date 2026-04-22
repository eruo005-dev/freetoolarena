"use client";

import { useMemo, useState } from "react";

type Diet = "balanced" | "low-carb" | "keto";

const PCT: Record<Diet, number> = {
  balanced: 0.5,
  "low-carb": 0.2,
  keto: 0.05,
};

const LABEL: Record<Diet, string> = {
  balanced: "Balanced (50%)",
  "low-carb": "Low-carb (20%)",
  keto: "Keto (5%)",
};

export function CarbohydrateCalculator() {
  const [calories, setCalories] = useState("2000");
  const [diet, setDiet] = useState<Diet>("balanced");
  const [meals, setMeals] = useState("3");

  const { gramsPerDay, carbCals, pct, perMealGrams, perMealCals, mealCount } = useMemo(() => {
    const cals = Math.max(0, parseFloat(calories) || 0);
    const p = PCT[diet];
    const carbC = cals * p;
    const g = carbC / 4;
    const m = Math.max(1, Math.min(8, parseInt(meals) || 3));
    return {
      gramsPerDay: g,
      carbCals: carbC,
      pct: p,
      perMealGrams: g / m,
      perMealCals: carbC / m,
      mealCount: m,
    };
  }, [calories, diet, meals]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Total daily calories
          </span>
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
          <span className="block text-sm font-medium text-slate-700 mb-1">Diet type</span>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value as Diet)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="balanced">{LABEL.balanced}</option>
            <option value="low-carb">{LABEL["low-carb"]}</option>
            <option value="keto">{LABEL.keto}</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Meals per day</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={8}
            value={meals}
            onChange={(e) => setMeals(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-2xl font-bold text-brand">
          {gramsPerDay.toFixed(0)} g carbs / day
        </div>
        <div className="text-sm text-slate-600 mt-1">
          {Math.round(pct * 100)}% of {parseFloat(calories) || 0} kcal = {carbCals.toFixed(0)} kcal from carbs
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Per meal (grams)</div>
            <div className="text-lg font-semibold text-slate-900">
              {perMealGrams.toFixed(0)} g
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">Per meal (cals)</div>
            <div className="text-lg font-semibold text-slate-900">
              {perMealCals.toFixed(0)} kcal
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Based on {mealCount} meal{mealCount === 1 ? "" : "s"} per day. 1 g carb = 4 kcal.
        </p>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — consult a doctor or RD for medical advice.
      </p>
    </div>
  );
}
