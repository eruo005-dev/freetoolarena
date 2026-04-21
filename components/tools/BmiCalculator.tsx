"use client";

import { useMemo, useState } from "react";

type Units = "metric" | "imperial";

export interface BmiCalculatorProps {
  /** Weight in kg — ?weight=72. */
  initialWeight?: number;
  /** Height in cm — ?height=175. */
  initialHeight?: number;
}

export function BmiCalculator({
  initialWeight,
  initialHeight,
}: BmiCalculatorProps = {}) {
  const [units, setUnits] = useState<Units>("metric");
  const [heightCm, setHeightCm] = useState(initialHeight != null ? String(initialHeight) : "175");
  const [weightKg, setWeightKg] = useState(initialWeight != null ? String(initialWeight) : "72");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [weightLb, setWeightLb] = useState("158");

  const { bmi, category } = useMemo(() => {
    let mKg = 0;
    let mMeters = 0;
    if (units === "metric") {
      mKg = parseFloat(weightKg) || 0;
      mMeters = (parseFloat(heightCm) || 0) / 100;
    } else {
      mKg = (parseFloat(weightLb) || 0) * 0.45359237;
      const inches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      mMeters = inches * 0.0254;
    }
    if (mKg <= 0 || mMeters <= 0) return { bmi: 0, category: "—" };
    const b = mKg / (mMeters * mMeters);
    return { bmi: b, category: classify(b) };
  }, [units, heightCm, weightKg, heightFt, heightIn, weightLb]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        {(["metric", "imperial"] as Units[]).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUnits(u)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              units === u ? "bg-brand text-white" : "border border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {u === "metric" ? "Metric (cm/kg)" : "Imperial (ft·in/lb)"}
          </button>
        ))}
      </div>
      {units === "metric" ? (
        <div className="grid grid-cols-2 gap-3">
          <Field label="Height (cm)" value={heightCm} onChange={setHeightCm} />
          <Field label="Weight (kg)" value={weightKg} onChange={setWeightKg} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <Field label="Height (ft)" value={heightFt} onChange={setHeightFt} />
          <Field label="Height (in)" value={heightIn} onChange={setHeightIn} />
          <Field label="Weight (lb)" value={weightLb} onChange={setWeightLb} />
        </div>
      )}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Your BMI</p>
        <p className="text-5xl font-bold text-brand tabular-nums">{bmi ? bmi.toFixed(1) : "—"}</p>
        <p className="mt-1 text-sm font-semibold text-slate-700">{category}</p>
      </div>
      <div className="text-sm text-slate-600">
        <p className="font-semibold text-slate-700 mb-1">WHO BMI ranges</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>Underweight: &lt; 18.5</li>
          <li>Normal: 18.5 – 24.9</li>
          <li>Overweight: 25.0 – 29.9</li>
          <li>Obese: 30.0+</li>
        </ul>
        <p className="mt-2 italic">BMI is a rough screen, not a diagnosis. Muscle mass and body composition matter.</p>
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

function classify(b: number) {
  if (b < 18.5) return "Underweight";
  if (b < 25) return "Normal weight";
  if (b < 30) return "Overweight";
  return "Obese";
}
