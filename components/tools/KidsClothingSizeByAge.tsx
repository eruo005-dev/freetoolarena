"use client";

import { useMemo, useState } from "react";

type Unit = "in" | "cm";

type Row = {
  size: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  minIn: number;
  maxIn: number;
  typicalLbs: number;
};

const SIZES: Row[] = [
  { size: "Newborn", minAgeMonths: 0, maxAgeMonths: 1, minIn: 19, maxIn: 21, typicalLbs: 8 },
  { size: "0-3M", minAgeMonths: 0, maxAgeMonths: 3, minIn: 22, maxIn: 24, typicalLbs: 12 },
  { size: "3-6M", minAgeMonths: 3, maxAgeMonths: 6, minIn: 24, maxIn: 26, typicalLbs: 16 },
  { size: "6-12M", minAgeMonths: 6, maxAgeMonths: 12, minIn: 27, maxIn: 30, typicalLbs: 20 },
  { size: "12-18M", minAgeMonths: 12, maxAgeMonths: 18, minIn: 30, maxIn: 32, typicalLbs: 24 },
  { size: "18-24M", minAgeMonths: 18, maxAgeMonths: 24, minIn: 32, maxIn: 34, typicalLbs: 27 },
  { size: "2T", minAgeMonths: 24, maxAgeMonths: 36, minIn: 34, maxIn: 36, typicalLbs: 28 },
  { size: "3T", minAgeMonths: 36, maxAgeMonths: 48, minIn: 37, maxIn: 39, typicalLbs: 32 },
  { size: "4T", minAgeMonths: 48, maxAgeMonths: 60, minIn: 40, maxIn: 42, typicalLbs: 37 },
  { size: "Size 5", minAgeMonths: 60, maxAgeMonths: 72, minIn: 42, maxIn: 45, typicalLbs: 45 },
  { size: "Size 6", minAgeMonths: 72, maxAgeMonths: 84, minIn: 46, maxIn: 48, typicalLbs: 55 },
  { size: "Size 7 / Youth XS", minAgeMonths: 84, maxAgeMonths: 96, minIn: 48, maxIn: 52, typicalLbs: 60 },
  { size: "Size 8 / Youth S", minAgeMonths: 96, maxAgeMonths: 108, minIn: 50, maxIn: 54, typicalLbs: 66 },
  { size: "Size 10 / Youth M", minAgeMonths: 108, maxAgeMonths: 132, minIn: 54, maxIn: 58, typicalLbs: 80 },
  { size: "Size 12 / Youth L", minAgeMonths: 132, maxAgeMonths: 156, minIn: 58, maxIn: 62, typicalLbs: 100 },
  { size: "Size 14 / Youth XL", minAgeMonths: 156, maxAgeMonths: 180, minIn: 61, maxIn: 65, typicalLbs: 120 },
  { size: "Size 16 / Adult XS", minAgeMonths: 168, maxAgeMonths: 192, minIn: 63, maxIn: 67, typicalLbs: 130 },
];

function sizeByHeight(heightIn: number): Row | null {
  if (!Number.isFinite(heightIn) || heightIn <= 0) return null;
  for (const r of SIZES) {
    if (heightIn >= r.minIn && heightIn <= r.maxIn) return r;
  }
  if (heightIn < SIZES[0].minIn) return SIZES[0];
  return SIZES[SIZES.length - 1];
}

function sizeByAge(ageMonths: number): Row | null {
  if (!Number.isFinite(ageMonths) || ageMonths < 0) return null;
  for (const r of SIZES) {
    if (ageMonths >= r.minAgeMonths && ageMonths < r.maxAgeMonths) return r;
  }
  return SIZES[SIZES.length - 1];
}

export function KidsClothingSizeByAge() {
  const [ageYears, setAgeYears] = useState<number>(3);
  const [ageMonths, setAgeMonths] = useState<number>(0);
  const [unit, setUnit] = useState<Unit>("in");
  const [height, setHeight] = useState<number>(39);
  const [weight, setWeight] = useState<number>(32);
  const [weightUnit, setWeightUnit] = useState<"lb" | "kg">("lb");

  const totalMonths = ageYears * 12 + ageMonths;
  const heightIn = unit === "in" ? height : height / 2.54;
  const weightLbs = weightUnit === "lb" ? weight : weight * 2.2046;

  const heightPick = useMemo(() => sizeByHeight(heightIn), [heightIn]);
  const agePick = useMemo(() => sizeByAge(totalMonths), [totalMonths]);

  const recommended = heightPick || agePick;
  const agreement = heightPick && agePick && heightPick.size === agePick.size;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="flex gap-2">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Age (years)</span>
            <input
              type="number"
              min={0}
              max={16}
              value={ageYears}
              onChange={(e) => setAgeYears(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </label>
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">+ months</span>
            <input
              type="number"
              min={0}
              max={11}
              value={ageMonths}
              onChange={(e) => setAgeMonths(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </label>
        </div>
        <div className="flex gap-2">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Height</span>
            <input
              type="number"
              step="0.5"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </label>
          <label className="flex w-24 flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Unit</span>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            >
              <option value="in">in</option>
              <option value="cm">cm</option>
            </select>
          </label>
        </div>
        <div className="flex gap-2">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Weight (optional)</span>
            <input
              type="number"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </label>
          <label className="flex w-24 flex-col gap-1 text-sm">
            <span className="font-medium text-slate-700">Unit</span>
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as "lb" | "kg")}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            >
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </label>
        </div>
      </div>

      {recommended ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Recommended size</div>
          <div className="mt-1 text-3xl font-semibold text-emerald-900">{recommended.size}</div>
          <div className="mt-1 text-sm text-emerald-900">
            Fits approx. {recommended.minIn}-{recommended.maxIn}&quot; ({Math.round(recommended.minIn * 2.54)}-
            {Math.round(recommended.maxIn * 2.54)} cm), typical weight ~{recommended.typicalLbs} lbs.
          </div>
          {!agreement && agePick && heightPick && (
            <div className="mt-2 text-xs text-emerald-800">
              Height suggests {heightPick.size}, age suggests {agePick.size}. Height wins &mdash; it&rsquo;s the
              stronger fit signal.
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Enter height and age to get a recommendation.
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">By height</div>
          <div className="mt-1 text-xl font-semibold text-brand">{heightPick ? heightPick.size : "--"}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">By age</div>
          <div className="mt-1 text-xl font-semibold text-brand">{agePick ? agePick.size : "--"}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Weight read</div>
          <div className="mt-1 text-xl font-semibold text-brand">
            {Number.isFinite(weightLbs) && weightLbs > 0 ? `${Math.round(weightLbs)} lbs` : "--"}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Size</th>
              <th className="px-3 py-2">Age</th>
              <th className="px-3 py-2">Height (in)</th>
              <th className="px-3 py-2">Weight (lbs)</th>
            </tr>
          </thead>
          <tbody>
            {SIZES.map((r) => (
              <tr key={r.size} className="border-t border-slate-100">
                <td className="px-3 py-2">{r.size}</td>
                <td className="px-3 py-2">
                  {r.minAgeMonths < 24
                    ? `${r.minAgeMonths}-${r.maxAgeMonths} mo`
                    : `${Math.floor(r.minAgeMonths / 12)}-${Math.floor(r.maxAgeMonths / 12)} yr`}
                </td>
                <td className="px-3 py-2">
                  {r.minIn}-{r.maxIn}
                </td>
                <td className="px-3 py-2">~{r.typicalLbs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Height is the most reliable input &mdash; age is a rough proxy. Some brands run small (Zara, H&amp;M) or large
        (Carter&rsquo;s, Old Navy); check reviews and the brand&rsquo;s own chart before buying.
      </p>
    </div>
  );
}
