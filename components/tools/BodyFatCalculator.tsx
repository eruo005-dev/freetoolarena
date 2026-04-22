"use client";

import { useMemo, useState } from "react";

type Sex = "male" | "female";
type Units = "metric" | "imperial";

export interface BodyFatCalculatorProps {
  initialSex?: Sex;
  /** cm */
  initialHeight?: number;
  /** cm */
  initialNeck?: number;
  /** cm */
  initialWaist?: number;
  /** cm */
  initialHip?: number;
}

export function BodyFatCalculator({
  initialSex,
  initialHeight,
  initialNeck,
  initialWaist,
  initialHip,
}: BodyFatCalculatorProps = {}) {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>(initialSex ?? "male");
  const [height, setHeight] = useState(initialHeight != null ? String(initialHeight) : "175");
  const [neck, setNeck] = useState(initialNeck != null ? String(initialNeck) : "38");
  const [waist, setWaist] = useState(initialWaist != null ? String(initialWaist) : "85");
  const [hip, setHip] = useState(initialHip != null ? String(initialHip) : "95");

  const { bodyFat, category } = useMemo(() => {
    const toCm = (v: string) => {
      const n = parseFloat(v) || 0;
      return units === "metric" ? n : n * 2.54;
    };
    const h = toCm(height);
    const n = toCm(neck);
    const w = toCm(waist);
    const hp = toCm(hip);
    if (h <= 0 || n <= 0 || w <= 0 || (sex === "female" && hp <= 0)) {
      return { bodyFat: 0, category: "—" };
    }
    let bf = 0;
    if (sex === "male") {
      if (w - n <= 0) return { bodyFat: 0, category: "—" };
      bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      if (w + hp - n <= 0) return { bodyFat: 0, category: "—" };
      bf = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
    }
    if (!isFinite(bf) || bf <= 0) return { bodyFat: 0, category: "—" };
    return { bodyFat: bf, category: classify(bf, sex) };
  }, [units, sex, height, neck, waist, hip]);

  const unitLabel = units === "metric" ? "cm" : "in";

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
            {u === "metric" ? "Metric (cm)" : "Imperial (in)"}
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

      <div className={`grid gap-3 ${sex === "female" ? "sm:grid-cols-4" : "sm:grid-cols-3"} grid-cols-2`}>
        <Field label={`Height (${unitLabel})`} value={height} onChange={setHeight} />
        <Field label={`Neck (${unitLabel})`} value={neck} onChange={setNeck} />
        <Field label={`Waist (${unitLabel})`} value={waist} onChange={setWaist} />
        {sex === "female" && <Field label={`Hip (${unitLabel})`} value={hip} onChange={setHip} />}
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Body fat</p>
          <p className="text-3xl font-bold text-brand tabular-nums">
            {bodyFat ? `${bodyFat.toFixed(1)}%` : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Category</p>
          <p className="text-xl font-bold text-slate-900">{category}</p>
        </div>
      </div>

      <div className="text-sm text-slate-600">
        <p className="font-semibold text-slate-700 mb-1">
          {sex === "male" ? "Men" : "Women"} — body fat ranges
        </p>
        <ul className="list-disc ml-5 space-y-0.5">
          {(sex === "male"
            ? [
                ["Essential fat", "2–5%"],
                ["Athletes", "6–13%"],
                ["Fitness", "14–17%"],
                ["Average", "18–24%"],
                ["Obese", "25%+"],
              ]
            : [
                ["Essential fat", "10–13%"],
                ["Athletes", "14–20%"],
                ["Fitness", "21–24%"],
                ["Average", "25–31%"],
                ["Obese", "32%+"],
              ]
          ).map(([k, v]) => (
            <li key={k}>
              <span className="font-medium text-slate-700">{k}:</span> {v}
            </li>
          ))}
        </ul>
        <p className="mt-2 italic">Uses the US Navy circumference method. Estimates only.</p>
      </div>
    </div>
  );
}

function classify(bf: number, sex: Sex) {
  if (sex === "male") {
    if (bf < 6) return "Essential fat";
    if (bf < 14) return "Athletes";
    if (bf < 18) return "Fitness";
    if (bf < 25) return "Average";
    return "Obese";
  }
  if (bf < 14) return "Essential fat";
  if (bf < 21) return "Athletes";
  if (bf < 25) return "Fitness";
  if (bf < 32) return "Average";
  return "Obese";
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={0.1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}
