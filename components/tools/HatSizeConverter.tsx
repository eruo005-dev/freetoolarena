"use client";

import { useMemo, useState } from "react";

type Row = {
  us: string;
  usDecimal: number;
  uk: string;
  eu: number;
  letter: string;
};

const ROWS: Row[] = [
  { us: "6 1/2", usDecimal: 6.5, uk: "6 3/8", eu: 52, letter: "XS" },
  { us: "6 5/8", usDecimal: 6.625, uk: "6 1/2", eu: 53, letter: "XS" },
  { us: "6 3/4", usDecimal: 6.75, uk: "6 5/8", eu: 54, letter: "S" },
  { us: "6 7/8", usDecimal: 6.875, uk: "6 3/4", eu: 55, letter: "S" },
  { us: "7", usDecimal: 7, uk: "6 7/8", eu: 56, letter: "M" },
  { us: "7 1/8", usDecimal: 7.125, uk: "7", eu: 57, letter: "M" },
  { us: "7 1/4", usDecimal: 7.25, uk: "7 1/8", eu: 58, letter: "L" },
  { us: "7 3/8", usDecimal: 7.375, uk: "7 1/4", eu: 59, letter: "XL" },
  { us: "7 1/2", usDecimal: 7.5, uk: "7 3/8", eu: 60, letter: "XL" },
  { us: "7 5/8", usDecimal: 7.625, uk: "7 1/2", eu: 61, letter: "XXL" },
  { us: "7 3/4", usDecimal: 7.75, uk: "7 5/8", eu: 62, letter: "XXL" },
  { us: "7 7/8", usDecimal: 7.875, uk: "7 3/4", eu: 63, letter: "3XL" },
  { us: "8", usDecimal: 8, uk: "7 7/8", eu: 64, letter: "3XL" },
];

type Mode = "cm" | "us";

function nearestByCm(cm: number): Row | null {
  if (!Number.isFinite(cm) || cm <= 0) return null;
  let best = ROWS[0];
  let bestDiff = Math.abs(best.eu - cm);
  for (const r of ROWS) {
    const d = Math.abs(r.eu - cm);
    if (d < bestDiff) {
      bestDiff = d;
      best = r;
    }
  }
  return best;
}

function nearestByUS(us: number): Row | null {
  if (!Number.isFinite(us)) return null;
  let best = ROWS[0];
  let bestDiff = Math.abs(best.usDecimal - us);
  for (const r of ROWS) {
    const d = Math.abs(r.usDecimal - us);
    if (d < bestDiff) {
      bestDiff = d;
      best = r;
    }
  }
  return best;
}

export function HatSizeConverter() {
  const [mode, setMode] = useState<Mode>("cm");
  const [cm, setCm] = useState<number>(56);
  const [us, setUs] = useState<number>(7);

  const match = useMemo(() => {
    if (mode === "cm") return nearestByCm(cm);
    return nearestByUS(us);
  }, [mode, cm, us]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Input type</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            <option value="cm">Head circumference (cm)</option>
            <option value="us">US hat size</option>
          </select>
        </label>
        {mode === "cm" ? (
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            <span className="font-medium text-slate-700">Head circumference (cm)</span>
            <input
              type="number"
              step="0.5"
              value={cm}
              onChange={(e) => setCm(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </label>
        ) : (
          <label className="flex flex-col gap-1 text-sm md:col-span-2">
            <span className="font-medium text-slate-700">US size (decimal, e.g. 7.25)</span>
            <input
              type="number"
              step="0.125"
              value={us}
              onChange={(e) => setUs(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </label>
        )}
      </div>

      {match ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">US</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.us}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">UK</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.uk}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">EU (cm)</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.eu}</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Letter</div>
            <div className="mt-1 text-2xl font-semibold text-brand">{match.letter}</div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Enter a valid measurement or size.
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-sm font-semibold text-slate-800">How to measure your head</div>
        <p className="mt-1 text-sm text-slate-700">
          Use a soft tape (or wrap a string and measure on a ruler). Place it about 1 cm above your ears and just
          above your brow &mdash; where a hat normally sits. Hold it level and snug, not tight. Measure twice and
          take the larger of the two.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">US</th>
              <th className="px-3 py-2">UK</th>
              <th className="px-3 py-2">EU (cm)</th>
              <th className="px-3 py-2">Letter</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.eu} className="border-t border-slate-100">
                <td className="px-3 py-2">{r.us}</td>
                <td className="px-3 py-2">{r.uk}</td>
                <td className="px-3 py-2">{r.eu}</td>
                <td className="px-3 py-2">{r.letter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Between sizes? Wool felt hats stretch up to ~1 cm &mdash; size down. Straw hats don&rsquo;t stretch &mdash; size up.
        Fitted caps (New Era 59FIFTY etc.) run true to US fractional sizes.
      </p>
    </div>
  );
}
