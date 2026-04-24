"use client";

import { useMemo, useState } from "react";

type Gender = "women" | "men" | "kids";
type Country = "US" | "UK" | "EU" | "JP";

interface ShoeRow {
  US: string;
  UK: string;
  EU: string;
  JP: string;
  cm: number;
}

const womensShoes: ShoeRow[] = [
  { US: "5", UK: "3", EU: "35-36", JP: "22", cm: 22 },
  { US: "5.5", UK: "3.5", EU: "36", JP: "22.5", cm: 22.5 },
  { US: "6", UK: "4", EU: "36-37", JP: "23", cm: 23 },
  { US: "6.5", UK: "4.5", EU: "37", JP: "23.5", cm: 23.5 },
  { US: "7", UK: "5", EU: "37-38", JP: "24", cm: 24 },
  { US: "7.5", UK: "5.5", EU: "38", JP: "24.5", cm: 24.5 },
  { US: "8", UK: "6", EU: "38-39", JP: "25", cm: 25 },
  { US: "8.5", UK: "6.5", EU: "39", JP: "25.5", cm: 25.5 },
  { US: "9", UK: "7", EU: "39-40", JP: "26", cm: 26 },
  { US: "9.5", UK: "7.5", EU: "40", JP: "26.5", cm: 26.5 },
  { US: "10", UK: "8", EU: "40-41", JP: "27", cm: 27 },
  { US: "10.5", UK: "8.5", EU: "41", JP: "27.5", cm: 27.5 },
  { US: "11", UK: "9", EU: "41-42", JP: "28", cm: 28 },
];

const mensShoes: ShoeRow[] = [
  { US: "7", UK: "6.5", EU: "40", JP: "25", cm: 25 },
  { US: "7.5", UK: "7", EU: "40.5", JP: "25.5", cm: 25.5 },
  { US: "8", UK: "7", EU: "41", JP: "26", cm: 26 },
  { US: "8.5", UK: "7.5", EU: "41.5", JP: "26.5", cm: 26.5 },
  { US: "9", UK: "8", EU: "42", JP: "27", cm: 27 },
  { US: "9.5", UK: "8.5", EU: "42.5", JP: "27.5", cm: 27.5 },
  { US: "10", UK: "9", EU: "43", JP: "28", cm: 28 },
  { US: "10.5", UK: "9.5", EU: "43.5", JP: "28.5", cm: 28.5 },
  { US: "11", UK: "10", EU: "44", JP: "29", cm: 29 },
  { US: "11.5", UK: "10.5", EU: "44.5", JP: "29.5", cm: 29.5 },
  { US: "12", UK: "11", EU: "45", JP: "30", cm: 30 },
  { US: "13", UK: "12", EU: "46", JP: "31", cm: 31 },
];

const kidsShoes: ShoeRow[] = [
  { US: "8 (toddler)", UK: "7", EU: "25", JP: "14", cm: 14 },
  { US: "9 (toddler)", UK: "8", EU: "26", JP: "15", cm: 15 },
  { US: "10 kids", UK: "9", EU: "27", JP: "16", cm: 16 },
  { US: "11 kids", UK: "10", EU: "28", JP: "17", cm: 17 },
  { US: "12 kids", UK: "11", EU: "30", JP: "18", cm: 18 },
  { US: "13 kids", UK: "12", EU: "31", JP: "19", cm: 19 },
  { US: "1 youth", UK: "13", EU: "32", JP: "20", cm: 20 },
  { US: "2 youth", UK: "1", EU: "33", JP: "21", cm: 21 },
  { US: "3 youth", UK: "2", EU: "34", JP: "22", cm: 22 },
];

const countries: Country[] = ["US", "UK", "EU", "JP"];

function pickTable(gender: Gender): ShoeRow[] {
  if (gender === "women") return womensShoes;
  if (gender === "men") return mensShoes;
  return kidsShoes;
}

export function ShoeSizeConverter() {
  const [gender, setGender] = useState<Gender>("women");
  const [source, setSource] = useState<Country>("US");
  const [size, setSize] = useState("8");

  const table = useMemo(() => pickTable(gender), [gender]);

  const match = useMemo(() => {
    const needle = size.trim().toLowerCase();
    if (!needle) return null;
    return (
      table.find((row) => {
        const val = row[source];
        return val.toLowerCase() === needle || val.toLowerCase().startsWith(needle + " ");
      }) ?? null
    );
  }, [table, source, size]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
          >
            <option value="women">Women&rsquo;s</option>
            <option value="men">Men&rsquo;s</option>
            <option value="kids">Kids / Youth</option>
          </select>
        </label>
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Size
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
            placeholder="e.g. 8 or 8.5"
          />
        </label>
      </div>

      {match ? (
        <div className="rounded-lg border border-brand/30 bg-brand/5 p-4">
          <div className="text-sm font-semibold text-brand mb-2">Your equivalents</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {countries.map((c) => (
              <div key={c} className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-400">{c}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{match[c]}</div>
              </div>
            ))}
            <div className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">Foot length</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {Number.isFinite(match.cm) ? `${match.cm} cm` : "\u2014"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-800 dark:text-amber-200">
          No exact match &mdash; pick the closest size from the chart below.
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {countries.map((c) => (
                <th key={c} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  {c}
                </th>
              ))}
              <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                Foot (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            {table.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                {countries.map((c) => (
                  <td key={c} className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                    {row[c]}
                  </td>
                ))}
                <td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                  {row.cm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Measure feet late in the day, standing up &mdash; they swell a touch. When between sizes, go up.
      </p>
    </div>
  );
}
