"use client";

import { useMemo, useState } from "react";

type Unit = "kg" | "lb";
type Activity = "sedentary" | "moderate" | "active" | "athlete";
type Goal = "cut" | "maintain" | "bulk";

const RATES: Record<Activity, number> = {
  sedentary: 0.8,
  moderate: 1.2,
  active: 1.6,
  athlete: 2.0,
};

const GOAL_ADJUST: Record<Goal, number> = {
  cut: 0.2,
  maintain: 0,
  bulk: 0.2,
};

export function ProteinIntakeCalculator() {
  const [weight, setWeight] = useState("70");
  const [unit, setUnit] = useState<Unit>("kg");
  const [activity, setActivity] = useState<Activity>("moderate");
  const [goal, setGoal] = useState<Goal>("maintain");

  const { dailyGrams, perMeal, kg, ratePerKg } = useMemo(() => {
    const raw = Math.max(0, parseFloat(weight) || 0);
    const kgVal = unit === "lb" ? raw * 0.45359237 : raw;
    const base = RATES[activity];
    const adj = GOAL_ADJUST[goal];
    const rate = base + adj;
    const g = kgVal * rate;
    return {
      dailyGrams: g,
      perMeal: g / 4,
      kg: kgVal,
      ratePerKg: rate,
    };
  }, [weight, unit, activity, goal]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Body weight</span>
          <div className="flex gap-2">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            />
            <div className="flex rounded-lg border border-slate-300 overflow-hidden">
              {(["kg", "lb"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  className={`px-3 text-sm font-medium ${
                    unit === u ? "bg-brand text-white" : "bg-white text-slate-700"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Activity level</span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="sedentary">Sedentary (0.8 g/kg)</option>
            <option value="moderate">Moderate (1.2 g/kg)</option>
            <option value="active">Active (1.6 g/kg)</option>
            <option value="athlete">Athlete (2.0 g/kg)</option>
          </select>
        </label>

        <label className="block sm:col-span-2">
          <span className="block text-sm font-medium text-slate-700 mb-1">Goal</span>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="cut">Cut (+0.2 g/kg)</option>
            <option value="maintain">Maintain</option>
            <option value="bulk">Bulk (+0.2 g/kg)</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-2xl font-bold text-brand">
          {dailyGrams.toFixed(0)} g protein / day
        </div>
        <div className="text-sm text-slate-600 mt-1">
          Based on {kg.toFixed(1)} kg x {ratePerKg.toFixed(1)} g/kg
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="rounded-lg border border-slate-200 bg-white p-3 text-center"
            >
              <div className="text-xs uppercase tracking-wide text-slate-500">Meal {n}</div>
              <div className="text-lg font-semibold text-slate-900">
                {perMeal.toFixed(0)} g
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-3">
          Based on 4 evenly-spaced meals per day.
        </p>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — consult a doctor or RD for medical advice.
      </p>
    </div>
  );
}
