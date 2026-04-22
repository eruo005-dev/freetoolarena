"use client";

import { useMemo, useState } from "react";

type Sex = "M" | "F";

const HIGH_FIBER_FOODS: { food: string; grams: number; serving: string }[] = [
  { food: "Black beans", grams: 15, serving: "1 cup cooked" },
  { food: "Lentils", grams: 13, serving: "1 cup cooked" },
  { food: "Raspberries", grams: 8, serving: "1 cup" },
  { food: "Avocado", grams: 10, serving: "1 whole" },
  { food: "Chia seeds", grams: 10, serving: "2 tbsp" },
];

function targetGrams(age: number, sex: Sex): number {
  if (sex === "M") return age <= 50 ? 38 : 30;
  return age <= 50 ? 25 : 21;
}

export function FiberIntakeCalculator() {
  const [age, setAge] = useState("30");
  const [sex, setSex] = useState<Sex>("M");

  const { target, ageNum, bracket } = useMemo(() => {
    const a = Math.max(0, parseInt(age) || 0);
    const t = targetGrams(a, sex);
    const label =
      sex === "M"
        ? a <= 50
          ? "Men 50 and under"
          : "Men over 50"
        : a <= 50
          ? "Women 50 and under"
          : "Women over 50";
    return { target: t, ageNum: a, bracket: label };
  }, [age, sex]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Age (years)</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Sex</span>
          <div className="flex rounded-lg border border-slate-300 overflow-hidden">
            {(["M", "F"] as Sex[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSex(s)}
                className={`flex-1 py-2 text-sm font-medium ${
                  sex === s ? "bg-brand text-white" : "bg-white text-slate-700"
                }`}
              >
                {s === "M" ? "Male" : "Female"}
              </button>
            ))}
          </div>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-2xl font-bold text-brand">{target} g fiber / day</div>
        <div className="text-sm text-slate-600 mt-1">
          IOM recommendation for {bracket} (age {ageNum}).
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">High-fiber foods to try</h3>
        <ul className="divide-y divide-slate-100">
          {HIGH_FIBER_FOODS.map((f) => (
            <li key={f.food} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-medium text-slate-900">{f.food}</div>
                <div className="text-xs text-slate-500">{f.serving}</div>
              </div>
              <div className="text-sm font-semibold text-brand">{f.grams} g</div>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-slate-500">
        Estimate only — consult a doctor or RD for medical advice.
      </p>
    </div>
  );
}
