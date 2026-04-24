"use client";

import { useMemo, useState } from "react";

type Country = "US" | "UK" | "EU" | "JP";

interface RingRow {
  US: string;
  UK: string;
  EU: string;
  JP: string;
  mm: number;
}

const rings: RingRow[] = [
  { US: "3", UK: "F", EU: "44", JP: "4", mm: 14.05 },
  { US: "3.5", UK: "G", EU: "45", JP: "6", mm: 14.46 },
  { US: "4", UK: "H", EU: "46", JP: "7", mm: 14.86 },
  { US: "4.5", UK: "I", EU: "47", JP: "8", mm: 15.27 },
  { US: "5", UK: "J", EU: "49", JP: "9", mm: 15.7 },
  { US: "5.5", UK: "K", EU: "50", JP: "10", mm: 16.1 },
  { US: "6", UK: "L", EU: "51", JP: "11", mm: 16.51 },
  { US: "6.5", UK: "M", EU: "52", JP: "12", mm: 16.92 },
  { US: "7", UK: "N", EU: "54", JP: "13", mm: 17.35 },
  { US: "7.5", UK: "O", EU: "55", JP: "14", mm: 17.75 },
  { US: "8", UK: "P", EU: "57", JP: "16", mm: 18.19 },
  { US: "8.5", UK: "Q", EU: "58", JP: "17", mm: 18.53 },
  { US: "9", UK: "R", EU: "59", JP: "18", mm: 18.89 },
  { US: "9.5", UK: "S", EU: "61", JP: "19", mm: 19.41 },
  { US: "10", UK: "T", EU: "62", JP: "20", mm: 19.84 },
  { US: "10.5", UK: "U", EU: "63", JP: "22", mm: 20.2 },
  { US: "11", UK: "V", EU: "64", JP: "23", mm: 20.68 },
  { US: "11.5", UK: "W", EU: "66", JP: "24", mm: 21.08 },
  { US: "12", UK: "X", EU: "67", JP: "25", mm: 21.49 },
  { US: "12.5", UK: "Y", EU: "68", JP: "26", mm: 21.89 },
  { US: "13", UK: "Z", EU: "70", JP: "27", mm: 22.33 },
];

const countries: Country[] = ["US", "UK", "EU", "JP"];

export function RingSizeConverter() {
  const [mode, setMode] = useState<"size" | "mm">("size");
  const [source, setSource] = useState<Country>("US");
  const [value, setValue] = useState("7");

  const match = useMemo(() => {
    const needle = value.trim().toLowerCase();
    if (!needle) return null;
    if (mode === "mm") {
      const mm = Number(needle);
      if (!Number.isFinite(mm)) return null;
      return rings.reduce<RingRow | null>((closest, row) => {
        if (!closest) return row;
        return Math.abs(row.mm - mm) < Math.abs(closest.mm - mm) ? row : closest;
      }, null);
    }
    return (
      rings.find((row) => row[source].toLowerCase() === needle) ?? null
    );
  }, [mode, source, value]);

  const diameter = match ? match.mm / Math.PI : null;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Input type
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "size" | "mm")}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
          >
            <option value="size">Size</option>
            <option value="mm">mm (circumference)</option>
          </select>
        </label>
        {mode === "size" ? (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Source country
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as Country)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
        ) : (
          <div />
        )}
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {mode === "mm" ? "Circumference (mm)" : "Size"}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
            placeholder={mode === "mm" ? "e.g. 17.35" : "e.g. 7"}
          />
        </label>
      </div>

      {match && (
        <div className="rounded-lg border border-brand/30 bg-brand/5 p-4">
          <div className="text-sm font-semibold text-brand mb-2">Your ring size</div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {countries.map((c) => (
              <div key={c} className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-400">{c}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{match[c]}</div>
              </div>
            ))}
            <div className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">Circumference</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{match.mm.toFixed(2)} mm</div>
            </div>
            <div className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">Inner diameter</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {Number.isFinite(diameter ?? NaN) ? `${(diameter as number).toFixed(2)} mm` : "\u2014"}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">How to measure at home</div>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>Wrap a thin strip of paper or string around the base of your finger.</li>
          <li>Mark where it overlaps, then measure the length in millimeters &mdash; that&rsquo;s your circumference.</li>
          <li>Measure at the end of the day when fingers are largest; avoid right after exercise.</li>
          <li>If you&rsquo;re between sizes, round up &mdash; knuckles need room to pass through.</li>
          <li>Wider bands (&gt;6mm) fit tighter &mdash; go up a half size.</li>
        </ul>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {countries.map((c) => (
                <th key={c} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  {c}
                </th>
              ))}
              <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">mm</th>
            </tr>
          </thead>
          <tbody>
            {rings.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                {countries.map((c) => (
                  <td key={c} className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                    {row[c]}
                  </td>
                ))}
                <td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                  {row.mm.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
