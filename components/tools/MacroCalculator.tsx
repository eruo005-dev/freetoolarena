"use client";

import { useMemo, useState } from "react";

type Goal = "cut" | "maintain" | "bulk";

export function MacroCalculator() {
  const [calories, setCalories] = useState(2200);
  const [goal, setGoal] = useState<Goal>("maintain");
  const [weightLb, setWeightLb] = useState(175);

  const r = useMemo(() => {
    // Protein target: 1g per lb of bodyweight (good general rule)
    const proteinG = weightLb;
    const proteinCal = proteinG * 4;
    // Fat: 25-30% of calories
    const fatPct = 0.28;
    const fatCal = calories * fatPct;
    const fatG = fatCal / 9;
    // Carbs: remainder
    const carbCal = Math.max(0, calories - proteinCal - fatCal);
    const carbG = carbCal / 4;
    return {
      proteinG: Math.round(proteinG),
      proteinCal: Math.round(proteinCal),
      fatG: Math.round(fatG),
      fatCal: Math.round(fatCal),
      carbG: Math.round(carbG),
      carbCal: Math.round(carbCal),
    };
  }, [calories, goal, weightLb]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Daily calories</span>
          <input type="number" value={calories} onChange={(e) => setCalories(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Weight (lb)</span>
          <input type="number" value={weightLb} onChange={(e) => setWeightLb(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Goal</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            <option value="cut">Cut</option>
            <option value="maintain">Maintain</option>
            <option value="bulk">Bulk</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg bg-brand-dark text-white p-4">
          <p className="text-xs uppercase tracking-wide text-white/70">Protein</p>
          <p className="text-xl font-bold">{r.proteinG}g</p>
          <p className="text-xs text-white/80">{r.proteinCal} cal</p>
        </div>
        <div className="rounded-lg bg-brand-dark text-white p-4">
          <p className="text-xs uppercase tracking-wide text-white/70">Fat</p>
          <p className="text-xl font-bold">{r.fatG}g</p>
          <p className="text-xs text-white/80">{r.fatCal} cal</p>
        </div>
        <div className="rounded-lg bg-brand-dark text-white p-4">
          <p className="text-xs uppercase tracking-wide text-white/70">Carbs</p>
          <p className="text-xl font-bold">{r.carbG}g</p>
          <p className="text-xs text-white/80">{r.carbCal} cal</p>
        </div>
      </div>
      <p className="text-xs text-slate-500">Protein = 1 g per lb bodyweight. Fat = 28% of calories. Carbs fill the rest.</p>
    </div>
  );
}
