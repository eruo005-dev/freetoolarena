"use client";

import { useMemo, useState } from "react";

type Gender = "men" | "women";
type Unit = "in" | "cm";
type Material = "leather" | "wool" | "synthetic" | "lined";

type Row = {
  inches: number;
  cm: number;
  letter: string;
  eu: number;
};

const MEN: Row[] = [
  { inches: 7, cm: 17.8, letter: "XS", eu: 7 },
  { inches: 7.5, cm: 19, letter: "S", eu: 8 },
  { inches: 8, cm: 20.3, letter: "M", eu: 9 },
  { inches: 8.5, cm: 21.6, letter: "L", eu: 10 },
  { inches: 9, cm: 22.9, letter: "XL", eu: 11 },
  { inches: 9.5, cm: 24.1, letter: "XXL", eu: 12 },
  { inches: 10, cm: 25.4, letter: "3XL", eu: 13 },
];

const WOMEN: Row[] = [
  { inches: 6, cm: 15.2, letter: "XXS", eu: 5.5 },
  { inches: 6.5, cm: 16.5, letter: "XS", eu: 6 },
  { inches: 7, cm: 17.8, letter: "S", eu: 6.5 },
  { inches: 7.5, cm: 19, letter: "M", eu: 7 },
  { inches: 8, cm: 20.3, letter: "L", eu: 7.5 },
  { inches: 8.5, cm: 21.6, letter: "XL", eu: 8 },
];

function nearest(rows: Row[], circInches: number): Row | null {
  if (!Number.isFinite(circInches) || circInches <= 0) return null;
  let best = rows[0];
  let bestDiff = Math.abs(best.inches - circInches);
  for (const r of rows) {
    const d = Math.abs(r.inches - circInches);
    if (d < bestDiff) {
      bestDiff = d;
      best = r;
    }
  }
  return best;
}

function materialAdvice(material: Material): string {
  if (material === "leather")
    return "Leather stretches ~1/4 size after a few wears &mdash; choose a snug fit, not loose.";
  if (material === "wool")
    return "Wool/knit fits tight but has natural stretch &mdash; go true to size.";
  if (material === "lined")
    return "Gloves with a liner (insulated, fleece-lined): size up by one for comfort and blood flow.";
  return "Synthetic (nylon, neoprene): go true to size. Most don&rsquo;t stretch much.";
}

export function GloveSizeConverter() {
  const [gender, setGender] = useState<Gender>("men");
  const [unit, setUnit] = useState<Unit>("in");
  const [value, setValue] = useState<number>(8);
  const [material, setMaterial] = useState<Material>("leather");

  const circInches = unit === "in" ? value : value / 2.54;
  const rows = gender === "men" ? MEN : WOMEN;
  const match = useMemo(() => nearest(rows, circInches), [rows, circInches]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Gender</span>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="men">Men&rsquo;s</option>
            <option value="women">Women&rsquo;s</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Unit</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="in">Inches</option>
            <option value="cm">Centimeters</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Palm circumference</span>
          <input
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Material</span>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value as Material)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="leather">Leather</option>
            <option value="wool">Wool / knit</option>
            <option value="synthetic">Synthetic</option>
            <option value="lined">Lined / insulated</option>
          </select>
        </label>
      </div>

      {match ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">US letter</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.letter}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">EU number</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.eu}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Palm</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.inches}&quot;</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Palm</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.cm} cm</div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Enter a valid palm circumference.
        </div>
      )}

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Material-fit advice</div>
        <p
          className="mt-1 text-sm text-emerald-900"
          dangerouslySetInnerHTML={{ __html: materialAdvice(material) }}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-sm font-semibold text-slate-800">How to measure your palm</div>
        <p className="mt-1 text-sm text-slate-700">
          Wrap a soft tape around the widest part of your dominant hand, just below the knuckles, excluding the
          thumb. Keep the hand relaxed and flat. Record the circumference in inches or centimeters.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Letter</th>
              <th className="px-3 py-2">EU</th>
              <th className="px-3 py-2">Palm (in)</th>
              <th className="px-3 py-2">Palm (cm)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.letter}-${r.eu}`} className="border-t border-slate-100">
                <td className="px-3 py-2">{r.letter}</td>
                <td className="px-3 py-2">{r.eu}</td>
                <td className="px-3 py-2">{r.inches}&quot;</td>
                <td className="px-3 py-2">{r.cm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
