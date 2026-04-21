"use client";

import { useMemo, useState } from "react";

type Sex = "male" | "female";
type Activity = "sedentary" | "light" | "moderate" | "active" | "very";

const ACTIVITY: Record<Activity, { factor: number; label: string }> = {
  sedentary: { factor: 1.2, label: "Sedentary (desk, little exercise)" },
  light: { factor: 1.375, label: "Light (1–3 workouts/week)" },
  moderate: { factor: 1.55, label: "Moderate (3–5 workouts/week)" },
  active: { factor: 1.725, label: "Active (6–7 workouts/week)" },
  very: { factor: 1.9, label: "Very active (physical job + training)" },
};

export function CalorieCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState("30");
  const [heightCm, setHeightCm] = useState("175");
  const [weightKg, setWeightKg] = useState("72");
  const [activity, setActivity] = useState<Activity>("moderate");

  const { bmr, tdee } = useMemo(() => {
    const a = parseFloat(age) || 0;
    const h = parseFloat(heightCm) || 0;
    const w = parseFloat(weightKg) || 0;
    if (a <= 0 || h <= 0 || w <= 0) return { bmr: 0, tdee: 0 };
    // Mifflin-St Jeor
    const base = 10 * w + 6.25 * h - 5 * a;
    const bmr = sex === "male" ? base + 5 : base - 161;
    const tdee = bmr * ACTIVITY[activity].factor;
    return { bmr, tdee };
  }, [sex, age, heightCm, weightKg, activity]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["male", "female"] as Sex[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSex(s)}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold ${
              sex === s ? "bg-brand text-white" : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Age" value={age} onChange={setAge} />
        <Field label="Height (cm)" value={heightCm} onChange={setHeightCm} />
        <Field label="Weight (kg)" value={weightKg} onChange={setWeightKg} />
      </div>
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Activity level</span>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as Activity)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
        >
          {(Object.keys(ACTIVITY) as Activity[]).map((k) => (
            <option key={k} value={k}>{ACTIVITY[k].label}</option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Stat label="BMR (at rest)" value={bmr} suffix="kcal/day" />
        <Stat label="TDEE (with activity)" value={tdee} suffix="kcal/day" highlight />
      </div>
      <div className="text-sm text-slate-600">
        <p className="font-semibold text-slate-700 mb-1">Rough targets</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Weight loss: TDEE − 300 to 500 kcal</li>
          <li>Maintenance: around TDEE</li>
          <li>Muscle gain: TDEE + 200 to 400 kcal</li>
        </ul>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
      />
    </label>
  );
}

function Stat({ label, value, suffix, highlight }: { label: string; value: number; suffix: string; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${highlight ? "border-brand bg-brand/5" : "border-slate-200 bg-slate-50"}`}>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-0.5">{label}</p>
      <p className={`text-2xl font-bold tabular-nums ${highlight ? "text-brand" : "text-slate-900"}`}>
        {value ? Math.round(value).toLocaleString() : "—"} <span className="text-sm font-medium text-slate-500">{suffix}</span>
      </p>
    </div>
  );
}
