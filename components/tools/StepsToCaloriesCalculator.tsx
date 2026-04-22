"use client";

import { useMemo, useState } from "react";

type Units = "metric" | "imperial";
type Pace = "slow" | "moderate" | "brisk";

const PACE: Record<Pace, { factor: number; spm: number; label: string }> = {
  slow: { factor: 0.035, spm: 100, label: "Slow (~2 mph)" },
  moderate: { factor: 0.045, spm: 120, label: "Moderate (~3 mph)" },
  brisk: { factor: 0.055, spm: 140, label: "Brisk (~4 mph)" },
};

export interface StepsToCaloriesCalculatorProps {
  initialSteps?: number;
  /** kg */
  initialWeight?: number;
  initialPace?: Pace;
}

export function StepsToCaloriesCalculator({
  initialSteps,
  initialWeight,
  initialPace,
}: StepsToCaloriesCalculatorProps = {}) {
  const [units, setUnits] = useState<Units>("metric");
  const [steps, setSteps] = useState(initialSteps != null ? String(initialSteps) : "10000");
  const [weightKg, setWeightKg] = useState(initialWeight != null ? String(initialWeight) : "72");
  const [weightLb, setWeightLb] = useState("158");
  const [pace, setPace] = useState<Pace>(initialPace ?? "moderate");

  const { calories, miles, km, minutes } = useMemo(() => {
    const s = Math.max(0, parseFloat(steps) || 0);
    const wKg =
      units === "metric"
        ? Math.max(0, parseFloat(weightKg) || 0)
        : Math.max(0, parseFloat(weightLb) || 0) * 0.45359237;
    const cfg = PACE[pace];
    // Scaled: ~10k steps at 72kg moderate ≈ ~324 kcal (MET-consistent)
    const cal = (s * wKg * cfg.factor) / 100;
    const mi = s / 2000;
    const kmVal = mi * 1.609344;
    const mins = cfg.spm > 0 ? s / cfg.spm : 0;
    return { calories: cal, miles: mi, km: kmVal, minutes: mins };
  }, [units, steps, weightKg, weightLb, pace]);

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
            {u === "metric" ? "Metric (kg)" : "Imperial (lb)"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Steps" value={steps} onChange={setSteps} />
        {units === "metric" ? (
          <Field label="Weight (kg)" value={weightKg} onChange={setWeightKg} />
        ) : (
          <Field label="Weight (lb)" value={weightLb} onChange={setWeightLb} />
        )}
      </div>

      <div>
        <span className="block text-sm font-medium text-slate-700 mb-1">Pace</span>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PACE) as Pace[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPace(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                pace === p
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-300 hover:border-brand"
              }`}
            >
              {PACE[p].label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Calories burned</p>
          <p className="text-3xl font-bold text-brand tabular-nums">
            {calories ? Math.round(calories).toLocaleString() : "—"}
            <span className="text-sm font-medium text-slate-500"> kcal</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Time walking</p>
          <p className="text-xl font-bold text-slate-900 tabular-nums">
            {minutes ? `${Math.round(minutes)} min` : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Distance</p>
          <p className="text-xl font-bold text-slate-900 tabular-nums">
            {miles ? `${miles.toFixed(2)} mi` : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Distance (km)</p>
          <p className="text-xl font-bold text-slate-900 tabular-nums">
            {km ? `${km.toFixed(2)} km` : "—"}
          </p>
        </div>
      </div>

      <div className="text-sm text-slate-600">
        <p className="font-semibold text-slate-700 mb-1">Assumptions</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>~2,000 steps per mile (1.6 km).</li>
          <li>Pace cadence: slow 100 spm, moderate 120 spm, brisk 140 spm.</li>
          <li>Calorie burn scales with body weight and walking intensity.</li>
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
