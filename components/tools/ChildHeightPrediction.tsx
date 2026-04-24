"use client";

import { useMemo, useState } from "react";

type Sex = "boy" | "girl";
type Unit = "in" | "cm";

function toInches(v: number, unit: Unit) {
  return unit === "in" ? v : v / 2.54;
}
function fromInches(v: number, unit: Unit) {
  return unit === "in" ? v : v * 2.54;
}
function fmtHeight(inches: number, unit: Unit): string {
  if (unit === "cm") return `${(inches * 2.54).toFixed(1)} cm`;
  const ft = Math.floor(inches / 12);
  const rem = inches - ft * 12;
  return `${ft}&rsquo; ${rem.toFixed(1)}&rdquo;`;
}

// Approximate percent of adult height by age/sex (boys, then girls)
const BOY_PCT: Record<number, number> = {
  2: 49.5, 3: 53.8, 4: 57.3, 5: 60.5, 6: 63.7, 7: 66.6, 8: 69.4, 9: 72,
  10: 74.5, 11: 77, 12: 80, 13: 84.5, 14: 90, 15: 95, 16: 98, 17: 99.2, 18: 99.8,
};
const GIRL_PCT: Record<number, number> = {
  2: 52.5, 3: 57.3, 4: 61.8, 5: 66, 6: 70, 7: 73.5, 8: 77, 9: 80.7,
  10: 84.4, 11: 88.4, 12: 92.9, 13: 96.5, 14: 98.5, 15: 99.5, 16: 99.9, 17: 100, 18: 100,
};

function pctOfAdult(age: number, sex: Sex): number {
  const table = sex === "boy" ? BOY_PCT : GIRL_PCT;
  const years = Math.max(2, Math.min(18, Math.round(age)));
  return table[years] / 100;
}

export function ChildHeightPrediction() {
  const [unit, setUnit] = useState<Unit>("in");
  const [sex, setSex] = useState<Sex>("boy");
  const [childHeight, setChildHeight] = useState<string>("50");
  const [childAge, setChildAge] = useState<string>("8");
  const [father, setFather] = useState<string>("70");
  const [mother, setMother] = useState<string>("64");

  const result = useMemo(() => {
    const ch = Number(childHeight);
    const ca = Number(childAge);
    const fh = Number(father);
    const mh = Number(mother);
    if (![ch, ca, fh, mh].every(Number.isFinite)) return null;
    if (ca < 2 || ca > 18 || ch <= 0 || fh <= 0 || mh <= 0) return null;

    const fIn = toInches(fh, unit);
    const mIn = toInches(mh, unit);
    const chIn = toInches(ch, unit);

    // Mid-parental height
    const mph = sex === "boy" ? (fIn + mIn + 5) / 2 : (fIn + mIn - 5) / 2;
    const mphLow = mph - 4;
    const mphHigh = mph + 4;

    // Growth-curve projection: child inches / pct of adult height
    const pct = pctOfAdult(ca, sex);
    const growthProj = chIn / pct;

    // Blended: average the two
    const blended = (mph + growthProj) / 2;

    return { mph, mphLow, mphHigh, growthProj, blended };
  }, [childHeight, childAge, father, mother, sex, unit]);

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setUnit("in")}
          className={`rounded-md border px-3 py-1 text-sm ${
            unit === "in" ? "border-brand bg-brand text-white" : "border-slate-300 text-slate-700"
          }`}
        >
          inches
        </button>
        <button
          type="button"
          onClick={() => setUnit("cm")}
          className={`rounded-md border px-3 py-1 text-sm ${
            unit === "cm" ? "border-brand bg-brand text-white" : "border-slate-300 text-slate-700"
          }`}
        >
          cm
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Child&rsquo;s sex</span>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="boy">Boy</option>
            <option value="girl">Girl</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Child&rsquo;s age (years)</span>
          <input
            type="number"
            min={2}
            max={18}
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Child&rsquo;s current height ({unit})
          </span>
          <input
            type="number"
            step="0.1"
            value={childHeight}
            onChange={(e) => setChildHeight(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Father height ({unit})</span>
          <input
            type="number"
            step="0.1"
            value={father}
            onChange={(e) => setFather(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Mother height ({unit})</span>
          <input
            type="number"
            step="0.1"
            value={mother}
            onChange={(e) => setMother(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Predicted adult height (mid-parental)
            </div>
            <div
              className="text-3xl font-bold text-brand"
              dangerouslySetInnerHTML={{ __html: fmtHeight(result.mph, unit) }}
            />
            <div
              className="text-sm text-slate-600"
              dangerouslySetInnerHTML={{
                __html: `95% range: ${fmtHeight(result.mphLow, unit)} &ndash; ${fmtHeight(
                  result.mphHigh,
                  unit
                )}`,
              }}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded bg-white p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Growth-curve projection
              </div>
              <div
                className="text-xl font-semibold text-slate-800"
                dangerouslySetInnerHTML={{ __html: fmtHeight(result.growthProj, unit) }}
              />
              <div className="mt-1 text-xs text-slate-500">
                Based on current height and age percentile.
              </div>
            </div>
            <div className="rounded bg-white p-3">
              <div className="text-xs uppercase tracking-wide text-slate-500">Blended estimate</div>
              <div
                className="text-xl font-semibold text-slate-800"
                dangerouslySetInnerHTML={{ __html: fmtHeight(result.blended, unit) }}
              />
              <div className="mt-1 text-xs text-slate-500">
                Average of mid-parental and growth-curve.
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Genetics is ~80% of final adult height. Nutrition, sleep, and overall health account for the
        rest. Estimates are probabilistic &mdash; individual growth varies.
      </p>
    </div>
  );
}
