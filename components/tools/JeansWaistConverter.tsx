"use client";

import { useMemo, useState } from "react";

type Gender = "men" | "women";
type Country = "US" | "EU" | "UK";

type Row = { us: number; eu: number; uk: number; waistCm: number; waistIn: number };

const MEN: Row[] = [
  { us: 28, eu: 44, uk: 28, waistIn: 28, waistCm: 71 },
  { us: 29, eu: 45, uk: 29, waistIn: 29, waistCm: 74 },
  { us: 30, eu: 46, uk: 30, waistIn: 30, waistCm: 76 },
  { us: 31, eu: 47, uk: 31, waistIn: 31, waistCm: 79 },
  { us: 32, eu: 48, uk: 32, waistIn: 32, waistCm: 81 },
  { us: 33, eu: 49, uk: 33, waistIn: 33, waistCm: 84 },
  { us: 34, eu: 50, uk: 34, waistIn: 34, waistCm: 86 },
  { us: 36, eu: 52, uk: 36, waistIn: 36, waistCm: 91 },
  { us: 38, eu: 54, uk: 38, waistIn: 38, waistCm: 97 },
  { us: 40, eu: 56, uk: 40, waistIn: 40, waistCm: 102 },
  { us: 42, eu: 58, uk: 42, waistIn: 42, waistCm: 107 },
];

const WOMEN: Row[] = [
  { us: 24, eu: 32, uk: 4, waistIn: 24, waistCm: 61 },
  { us: 25, eu: 34, uk: 6, waistIn: 25, waistCm: 64 },
  { us: 26, eu: 36, uk: 8, waistIn: 26, waistCm: 66 },
  { us: 27, eu: 38, uk: 10, waistIn: 27, waistCm: 69 },
  { us: 28, eu: 38, uk: 10, waistIn: 28, waistCm: 71 },
  { us: 29, eu: 40, uk: 12, waistIn: 29, waistCm: 74 },
  { us: 30, eu: 40, uk: 12, waistIn: 30, waistCm: 76 },
  { us: 31, eu: 42, uk: 14, waistIn: 31, waistCm: 79 },
  { us: 32, eu: 44, uk: 16, waistIn: 32, waistCm: 81 },
  { us: 33, eu: 44, uk: 16, waistIn: 33, waistCm: 84 },
  { us: 34, eu: 46, uk: 18, waistIn: 34, waistCm: 86 },
];

function findRow(rows: Row[], size: number, country: Country): Row | null {
  if (!Number.isFinite(size)) return null;
  let best: Row | null = null;
  let bestDiff = Infinity;
  for (const r of rows) {
    const v = country === "US" ? r.us : country === "EU" ? r.eu : r.uk;
    const diff = Math.abs(v - size);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = r;
    }
  }
  return best;
}

export function JeansWaistConverter() {
  const [gender, setGender] = useState<Gender>("men");
  const [country, setCountry] = useState<Country>("US");
  const [size, setSize] = useState<number>(32);

  const rows = gender === "men" ? MEN : WOMEN;
  const match = useMemo(() => findRow(rows, size, country), [rows, size, country]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
          <span className="font-medium text-slate-700">Source country</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value as Country)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="US">US</option>
            <option value="EU">EU</option>
            <option value="UK">UK</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Your size ({country})</span>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </label>
      </div>

      {match ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">US</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.us}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">EU</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.eu}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">UK</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.uk}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Waist</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.waistIn}&quot; / {match.waistCm} cm</div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Enter a valid size to see a conversion.
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-sm font-semibold text-slate-800">How to measure</div>
        <p className="mt-1 text-sm text-slate-700">
          Measure your waist in inches at the point where jeans sit (about 1&quot; below the navel). Keep the tape
          snug but not tight. Waist measurement = jeans size &plusmn; 0-1&quot; on most brands.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">US</th>
              <th className="px-3 py-2">EU</th>
              <th className="px-3 py-2">UK</th>
              <th className="px-3 py-2">Waist (in)</th>
              <th className="px-3 py-2">Waist (cm)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.us}-${r.eu}-${r.uk}`} className="border-t border-slate-100">
                <td className="px-3 py-2">{r.us}</td>
                <td className="px-3 py-2">{r.eu}</td>
                <td className="px-3 py-2">{r.uk}</td>
                <td className="px-3 py-2">{r.waistIn}</td>
                <td className="px-3 py-2">{r.waistCm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Slim, skinny, and stretch cuts can run a full size small; relaxed/classic fits run true to waist. When
        between sizes, size up on rigid denim and size down on stretch.
      </p>
    </div>
  );
}
