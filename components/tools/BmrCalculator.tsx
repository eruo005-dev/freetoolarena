"use client";

import { useMemo, useState } from "react";

type Sex = "male" | "female";
type Units = "metric" | "imperial";
type Activity = "sedentary" | "light" | "moderate" | "active" | "very";

const ACTIVITY: Record<Activity, { factor: number; label: string }> = {
  sedentary: { factor: 1.2, label: "Sedentary (little or no exercise)" },
  light: { factor: 1.375, label: "Light (1–3 workouts/week)" },
  moderate: { factor: 1.55, label: "Moderate (3–5 workouts/week)" },
  active: { factor: 1.725, label: "Active (6–7 workouts/week)" },
  very: { factor: 1.9, label: "Very active (physical job + training)" },
};

export interface BmrCalculatorProps {
  initialAge?: number;
  initialSex?: Sex;
  /** kg */
  initialWeight?: number;
  /** cm */
  initialHeight?: number;
  initialActivity?: Activity;
}

export function BmrCalculator({
  initialAge,
  initialSex,
  initialWeight,
  initialHeight,
  initialActivity,
}: BmrCalculatorProps = {}) {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>(initialSex ?? "male");
  const [age, setAge] = useState(initialAge != null ? String(initialAge) : "30");
  const [weightKg, setWeightKg] = useState(initialWeight != null ? String(initialWeight) : "72");
  const [heightCm, setHeightCm] = useState(initialHeight != null ? String(initialHeight) : "175");
  const [weightLb, setWeightLb] = useState("158");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [activity, setActivity] = useState<Activity>(initialActivity ?? "moderate");

  const { bmr, tdee } = useMemo(() => {
    const a = parseFloat(age) || 0;
    let wKg = 0;
    let hCm = 0;
    if (units === "metric") {
      wKg = parseFloat(weightKg) || 0;
      hCm = parseFloat(heightCm) || 0;
    } else {
      wKg = (parseFloat(weightLb) || 0) * 0.45359237;
      const inches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      hCm = inches * 2.54;
    }
    if (a <= 0 || wKg <= 0 || hCm <= 0) return { bmr: 0, tdee: 0 };
    const base = 10 * wKg + 6.25 * hCm - 5 * a;
    const bmr = sex === "male" ? base + 5 : base - 161;
    const tdee = bmr * ACTIVITY[activity].factor;
    return { bmr, tdee };
  }, [units, sex, age, weightKg, heightCm, weightLb, heightFt, heightIn, activity]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["metric", "imperial"] as Units[]).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnits(u)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              units === u
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {u === "metric" ? "Metric (cm/kg)" : "Imperial (ft·in/lb)"}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {(["male", "female"] as Sex[]).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSex(s)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
              sex === s
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {s[0].toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {units === "metric" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Age" value={age} onChange={setAge} />
          <Field label="Height (cm)" value={heightCm} onChange={setHeightCm} />
          <Field label="Weight (kg)" value={weightKg} onChange={setWeightKg} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Age" value={age} onChange={setAge} />
          <Field label="Height (ft)" value={heightFt} onChange={setHeightFt} />
          <Field label="Height (in)" value={heightIn} onChange={setHeightIn} />
          <Field label="Weight (lb)" value={weightLb} onChange={setWeightLb} />
        </div>
      )}

      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Activity level</span>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value as Activity)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        >
          {(Object.keys(ACTIVITY) as Activity[]).map((k) => (
            <option key={k} value={k}>
              {ACTIVITY[k].label}
            </option>
          ))}
        </select>
      </label>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <Stat label="BMR (at rest)" value={bmr} suffix="kcal/day" />
        <Stat label="TDEE (with activity)" value={tdee} suffix="kcal/day" highlight />
      </div>

      <div className="text-sm text-slate-600">
        <p className="font-semibold text-slate-700 mb-1">About these numbers</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>BMR is calories burned at complete rest (Mifflin–St Jeor equation).</li>
          <li>TDEE is BMR multiplied by your activity factor.</li>
          <li>Use TDEE as a baseline for maintenance, cutting, or bulking.</li>
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}

function Stat({
  label,
  value,
  suffix,
  highlight,
}: {
  label: string;
  value: number;
  suffix: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{label}</p>
      <p className={`font-bold tabular-nums ${highlight ? "text-3xl text-brand" : "text-xl text-slate-900"}`}>
        {value ? Math.round(value).toLocaleString() : "—"}{" "}
        <span className="text-sm font-medium text-slate-500">{suffix}</span>
      </p>
    </div>
  );
}
