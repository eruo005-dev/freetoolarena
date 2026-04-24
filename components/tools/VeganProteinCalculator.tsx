"use client";

import { useMemo, useState } from "react";

type Activity = "sedentary" | "moderate" | "active" | "athlete";
type Goal = "maintenance" | "build" | "recovery";

const ACTIVITY_GPLB: Record<Activity, number> = {
  sedentary: 0.4,
  moderate: 0.6,
  active: 0.8,
  athlete: 1.0,
};

const GOAL_MULT: Record<Goal, number> = {
  maintenance: 1.0,
  build: 1.15,
  recovery: 1.1,
};

type Source = {
  name: string;
  protein: number;
  unit: string;
};

const SOURCES: Source[] = [
  { name: "Tofu", protein: 20, unit: "100g block" },
  { name: "Tempeh", protein: 19, unit: "100g" },
  { name: "Lentils", protein: 18, unit: "1 cup cooked" },
  { name: "Chickpeas", protein: 15, unit: "1 cup cooked" },
  { name: "Seitan", protein: 25, unit: "100g" },
  { name: "Quinoa", protein: 8, unit: "1 cup cooked" },
  { name: "Black beans", protein: 15, unit: "1 cup cooked" },
  { name: "Peanut butter", protein: 8, unit: "2 tbsp" },
  { name: "Edamame", protein: 17, unit: "1 cup" },
  { name: "Hemp seeds", protein: 10, unit: "3 tbsp" },
  { name: "Nutritional yeast", protein: 8, unit: "2 tbsp" },
];

type Meal = { title: string; items: Array<{ source: Source; servings: number }> };

function buildMeals(target: number): Meal[] {
  const templates: Array<{ title: string; picks: string[] }> = [
    { title: "High-performance day", picks: ["Tofu", "Lentils", "Seitan", "Hemp seeds"] },
    { title: "Whole-food classic", picks: ["Tempeh", "Black beans", "Quinoa", "Peanut butter"] },
    { title: "Quick prep", picks: ["Edamame", "Chickpeas", "Nutritional yeast", "Peanut butter"] },
  ];

  return templates.map((t) => {
    const picks = t.picks
      .map((n) => SOURCES.find((s) => s.name === n))
      .filter((s): s is Source => Boolean(s));
    const even = target / picks.length;
    const items = picks.map((source) => {
      const servings = Math.max(1, Math.round(even / source.protein));
      return { source, servings };
    });
    return { title: t.title, items };
  });
}

export function VeganProteinCalculator() {
  const [weight, setWeight] = useState<number>(165);
  const [activity, setActivity] = useState<Activity>("moderate");
  const [goal, setGoal] = useState<Goal>("maintenance");

  const target = useMemo(() => {
    if (!Number.isFinite(weight) || weight <= 0) return 0;
    const base = weight * ACTIVITY_GPLB[activity];
    return Math.round(base * GOAL_MULT[goal]);
  }, [weight, activity, goal]);

  const meals = useMemo(() => (target > 0 ? buildMeals(target) : []), [target]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Body weight (lbs)</span>
          <input
            type="number"
            min={60}
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Activity level</span>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value as Activity)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="sedentary">Sedentary (0.4 g/lb)</option>
            <option value="moderate">Moderate (0.6 g/lb)</option>
            <option value="active">Active (0.8 g/lb)</option>
            <option value="athlete">Athlete (1.0 g/lb)</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Goal</span>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as Goal)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="maintenance">Maintenance</option>
            <option value="build">Build muscle (+15%)</option>
            <option value="recovery">Recovery (+10%)</option>
          </select>
        </label>
      </div>

      {target > 0 && (
        <>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Daily plant protein target</div>
            <div className="text-3xl font-bold text-brand">{target} g</div>
            <p className="mt-1 text-xs text-slate-500">
              Spread across 3&ndash;5 meals for best absorption.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Hit this target with</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {meals.map((m) => {
                const total = m.items.reduce((s, i) => s + i.servings * i.source.protein, 0);
                return (
                  <div key={m.title} className="rounded border border-slate-200 bg-white p-3">
                    <div className="mb-2 text-sm font-semibold text-brand">{m.title}</div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {m.items.map((i) => (
                        <li key={i.source.name}>
                          {i.servings}&times; {i.source.name}{" "}
                          <span className="text-slate-500">
                            ({i.servings * i.source.protein}g &mdash; {i.source.unit})
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 border-t border-slate-100 pt-2 text-xs font-semibold text-slate-700">
                      Total: {total}g
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-3 text-xs text-slate-600">
            <strong className="text-slate-800">Tip:</strong> Combine grains (rice, quinoa) with
            legumes (beans, lentils) to cover all essential amino acids. A daily B12 supplement is
            recommended on a fully plant-based diet.
          </div>
        </>
      )}
    </div>
  );
}
