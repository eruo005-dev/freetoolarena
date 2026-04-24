"use client";

import { useMemo, useState } from "react";

type Sex = "boy" | "girl";
type Unit = "lbs" | "kg";

type Row = { month: number; p3: number; p15: number; p50: number; p85: number; p97: number };

// Weights in kilograms. Data approximated from WHO 0-24 mo + CDC 24-36 mo growth charts.
const BOY_DATA: Row[] = [
  { month: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.3 },
  { month: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.7 },
  { month: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.0 },
  { month: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 7.9 },
  { month: 4, p3: 5.6, p15: 6.3, p50: 7.0, p85: 7.8, p97: 8.6 },
  { month: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.7 },
  { month: 9, p3: 7.1, p15: 7.9, p50: 8.9, p85: 9.9, p97: 10.9 },
  { month: 12, p3: 7.7, p15: 8.6, p50: 9.6, p85: 10.8, p97: 11.8 },
  { month: 18, p3: 8.8, p15: 9.8, p50: 10.9, p85: 12.2, p97: 13.5 },
  { month: 24, p3: 9.7, p15: 10.8, p50: 12.2, p85: 13.6, p97: 15.1 },
  { month: 30, p3: 10.5, p15: 11.7, p50: 13.3, p85: 15.0, p97: 16.6 },
  { month: 36, p3: 11.3, p15: 12.7, p50: 14.3, p85: 16.2, p97: 18.0 },
];

const GIRL_DATA: Row[] = [
  { month: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
  { month: 1, p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.4 },
  { month: 2, p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.5 },
  { month: 3, p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.4 },
  { month: 4, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.1 },
  { month: 6, p3: 5.8, p15: 6.5, p50: 7.3, p85: 8.3, p97: 9.2 },
  { month: 9, p3: 6.5, p15: 7.3, p50: 8.2, p85: 9.3, p97: 10.4 },
  { month: 12, p3: 7.0, p15: 7.9, p50: 8.9, p85: 10.1, p97: 11.3 },
  { month: 18, p3: 8.1, p15: 9.1, p50: 10.2, p85: 11.6, p97: 13.0 },
  { month: 24, p3: 9.0, p15: 10.2, p50: 11.5, p85: 13.1, p97: 14.7 },
  { month: 30, p3: 9.8, p15: 11.1, p50: 12.6, p85: 14.4, p97: 16.2 },
  { month: 36, p3: 10.6, p15: 12.0, p50: 13.7, p85: 15.7, p97: 17.8 },
];

function interpolate(month: number, data: Row[]): Row {
  if (month <= data[0].month) return data[0];
  if (month >= data[data.length - 1].month) return data[data.length - 1];
  for (let i = 0; i < data.length - 1; i += 1) {
    const a = data[i];
    const b = data[i + 1];
    if (month >= a.month && month <= b.month) {
      const t = (month - a.month) / (b.month - a.month);
      return {
        month,
        p3: a.p3 + (b.p3 - a.p3) * t,
        p15: a.p15 + (b.p15 - a.p15) * t,
        p50: a.p50 + (b.p50 - a.p50) * t,
        p85: a.p85 + (b.p85 - a.p85) * t,
        p97: a.p97 + (b.p97 - a.p97) * t,
      };
    }
  }
  return data[data.length - 1];
}

function percentileBand(weightKg: number, row: Row): string {
  if (weightKg < row.p3) return "Below the 3rd percentile";
  if (weightKg < row.p15) return "Between the 3rd and 15th percentile";
  if (weightKg < row.p50) return "Between the 15th and 50th percentile";
  if (weightKg < row.p85) return "Between the 50th and 85th percentile";
  if (weightKg < row.p97) return "Between the 85th and 97th percentile";
  return "Above the 97th percentile";
}

export function BabyWeightPercentile() {
  const [ageMonths, setAgeMonths] = useState<number>(6);
  const [sex, setSex] = useState<Sex>("boy");
  const [weight, setWeight] = useState<number>(17);
  const [unit, setUnit] = useState<Unit>("lbs");

  const result = useMemo(() => {
    const safeMonths = Number.isFinite(ageMonths) ? Math.min(36, Math.max(0, ageMonths)) : 0;
    const safeWeight = Number.isFinite(weight) && weight > 0 ? weight : 0;
    const weightKg = unit === "kg" ? safeWeight : safeWeight * 0.453592;
    const data = sex === "boy" ? BOY_DATA : GIRL_DATA;
    const row = interpolate(safeMonths, data);
    const toDisplay = (kg: number) =>
      unit === "kg" ? `${kg.toFixed(1)} kg` : `${(kg / 0.453592).toFixed(1)} lbs`;
    return {
      weightKg,
      row,
      band: safeWeight > 0 ? percentileBand(weightKg, row) : "Enter a weight to compare",
      p3: toDisplay(row.p3),
      p15: toDisplay(row.p15),
      p50: toDisplay(row.p50),
      p85: toDisplay(row.p85),
      p97: toDisplay(row.p97),
    };
  }, [ageMonths, sex, weight, unit]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Age (months, 0&ndash;36)</span>
            <input
              type="number"
              min={0}
              max={36}
              step={1}
              value={ageMonths}
              onChange={(event) => setAgeMonths(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Sex</span>
            <select
              value={sex}
              onChange={(event) => setSex(event.target.value as Sex)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            >
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Weight</span>
            <input
              type="number"
              min={0}
              step={0.1}
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Unit</span>
            <select
              value={unit}
              onChange={(event) => setUnit(event.target.value as Unit)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            >
              <option value="lbs">Pounds (lbs)</option>
              <option value="kg">Kilograms (kg)</option>
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-brand/5 p-5">
        <p className="text-xs uppercase tracking-wide text-brand">Percentile estimate</p>
        <p className="mt-1 text-lg font-semibold text-slate-900">{result.band}</p>
        <dl className="mt-4 grid gap-3 sm:grid-cols-5">
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-slate-500">3rd</dt>
            <dd className="text-sm font-semibold text-slate-900">{result.p3}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-slate-500">15th</dt>
            <dd className="text-sm font-semibold text-slate-900">{result.p15}</dd>
          </div>
          <div className="rounded-lg border border-brand bg-brand/10 p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-brand">50th (median)</dt>
            <dd className="text-sm font-semibold text-slate-900">{result.p50}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-slate-500">85th</dt>
            <dd className="text-sm font-semibold text-slate-900">{result.p85}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
            <dt className="text-xs uppercase tracking-wide text-slate-500">97th</dt>
            <dd className="text-sm font-semibold text-slate-900">{result.p97}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Read percentiles as a trend, not a grade</p>
        <p className="mt-2">
          Percentiles measure growth trend over time. A single reading doesn&rsquo;t mean anything &mdash;
          a healthy baby can sit in the 10th, 50th, or 90th percentile and be perfectly fine.
          What matters is whether your baby is following their own curve. Track with your pediatrician
          at each well-visit.
        </p>
      </div>

      <p className="text-xs text-slate-500">
        Chart values approximate WHO standards (0&ndash;24 months) and CDC references (24&ndash;36 months)
        &mdash; useful for a quick check, not a diagnostic tool.
      </p>
    </div>
  );
}
