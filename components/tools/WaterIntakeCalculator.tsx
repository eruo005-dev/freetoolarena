"use client";

import { useMemo, useState } from "react";

type Units = "metric" | "imperial";

export function WaterIntakeCalculator() {
  const [units, setUnits] = useState<Units>("metric");
  const [weightKg, setWeightKg] = useState("70");
  const [weightLb, setWeightLb] = useState("155");
  const [activityMin, setActivityMin] = useState("30");

  const result = useMemo(() => {
    const kg = units === "metric" ? parseFloat(weightKg) : (parseFloat(weightLb) || 0) * 0.45359237;
    const act = parseFloat(activityMin) || 0;
    if (!kg || kg <= 0) return { liters: 0, ounces: 0, cups: 0 };
    // Base: ~35 ml per kg + 355 ml per 30 min exercise
    const ml = kg * 35 + (act / 30) * 355;
    return {
      liters: ml / 1000,
      ounces: ml / 29.5735,
      cups: ml / 237,
    };
  }, [units, weightKg, weightLb, activityMin]);

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
            {u === "metric" ? "kg" : "lb"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field
          label={units === "metric" ? "Weight (kg)" : "Weight (lb)"}
          value={units === "metric" ? weightKg : weightLb}
          onChange={units === "metric" ? setWeightKg : setWeightLb}
        />
        <Field label="Exercise (min/day)" value={activityMin} onChange={setActivityMin} />
      </div>
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-center">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Daily water target</p>
        <p className="text-5xl font-bold text-brand tabular-nums">
          {result.liters ? result.liters.toFixed(1) : "—"}
          <span className="text-2xl ml-2">L</span>
        </p>
        <p className="mt-1 text-sm text-slate-600">
          ≈ {result.ounces ? Math.round(result.ounces) : "—"} fl oz · {result.cups ? Math.round(result.cups) : "—"} cups
        </p>
      </div>
      <div className="text-sm text-slate-600">
        <p>Includes water from all drinks and food (food supplies roughly 20%). Add more in hot climates, when sick, or during long workouts.</p>
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
