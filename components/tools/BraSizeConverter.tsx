"use client";

import { useMemo, useState } from "react";

type Country = "US" | "UK" | "EU" | "AU";

interface BandRow {
  US: string;
  UK: string;
  EU: string;
  AU: string;
}

interface CupRow {
  US: string;
  UK: string;
  EU: string;
  AU: string;
}

const bands: BandRow[] = [
  { US: "30", UK: "30", EU: "65", AU: "8" },
  { US: "32", UK: "32", EU: "70", AU: "10" },
  { US: "34", UK: "34", EU: "75", AU: "12" },
  { US: "36", UK: "36", EU: "80", AU: "14" },
  { US: "38", UK: "38", EU: "85", AU: "16" },
  { US: "40", UK: "40", EU: "90", AU: "18" },
  { US: "42", UK: "42", EU: "95", AU: "20" },
  { US: "44", UK: "44", EU: "100", AU: "22" },
];

const cups: CupRow[] = [
  { US: "A", UK: "A", EU: "A", AU: "A" },
  { US: "B", UK: "B", EU: "B", AU: "B" },
  { US: "C", UK: "C", EU: "C", AU: "C" },
  { US: "D", UK: "D", EU: "D", AU: "D" },
  { US: "DD", UK: "DD", EU: "E", AU: "DD" },
  { US: "DDD / F", UK: "E", EU: "F", AU: "E" },
  { US: "G", UK: "FF", EU: "G", AU: "F" },
  { US: "H", UK: "G", EU: "H", AU: "G" },
  { US: "I", UK: "GG", EU: "I", AU: "H" },
];

const countries: Country[] = ["US", "UK", "EU", "AU"];

export function BraSizeConverter() {
  const [bandSource, setBandSource] = useState<Country>("US");
  const [bandValue, setBandValue] = useState("34");
  const [cupSource, setCupSource] = useState<Country>("US");
  const [cupValue, setCupValue] = useState("C");

  const bandMatch = useMemo(() => {
    const needle = bandValue.trim().toLowerCase();
    if (!needle) return null;
    return bands.find((row) => row[bandSource].toLowerCase() === needle) ?? null;
  }, [bandSource, bandValue]);

  const cupMatch = useMemo(() => {
    const needle = cupValue.trim().toLowerCase();
    if (!needle) return null;
    return cups.find((row) => row[cupSource].toLowerCase() === needle || row[cupSource].toLowerCase().includes(needle)) ?? null;
  }, [cupSource, cupValue]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Band</div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
              <select
                value={bandSource}
                onChange={(e) => setBandSource(e.target.value as Country)}
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
                value={bandValue}
                onChange={(e) => setBandValue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
              />
            </label>
          </div>
          {bandMatch ? (
            <div className="grid grid-cols-4 gap-2">
              {countries.map((c) => (
                <div key={c} className="rounded-md bg-brand/5 border border-brand/20 p-2 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{c}</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{bandMatch[c]}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-amber-700 dark:text-amber-300">No band match found.</div>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-3">
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">Cup</div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
              <select
                value={cupSource}
                onChange={(e) => setCupSource(e.target.value as Country)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Cup
              <input
                type="text"
                value={cupValue}
                onChange={(e) => setCupValue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
              />
            </label>
          </div>
          {cupMatch ? (
            <div className="grid grid-cols-4 gap-2">
              {countries.map((c) => (
                <div key={c} className="rounded-md bg-brand/5 border border-brand/20 p-2 text-center">
                  <div className="text-xs text-gray-500 dark:text-gray-400">{c}</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">{cupMatch[c]}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-amber-700 dark:text-amber-300">No cup match found.</div>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-brand/30 bg-brand/5 p-4">
        <div className="text-sm font-semibold text-brand mb-2">Sister sizes &mdash; when the band fits but cup is off</div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Cup volume depends on the band. Move up a band size and drop a cup letter (or vice versa) to keep the same cup volume.
        </p>
        <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li><strong>32D</strong> &asymp; <strong>34C</strong> &asymp; <strong>30DD</strong></li>
          <li><strong>34B</strong> &asymp; <strong>36A</strong> &asymp; <strong>32C</strong></li>
          <li><strong>36DD</strong> &asymp; <strong>38D</strong> &asymp; <strong>34DDD</strong></li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Band chart</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {countries.map((c) => (
                    <th key={c} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bands.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                    {countries.map((c) => (
                      <td key={c} className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                        {row[c]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Cup chart</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {countries.map((c) => (
                    <th key={c} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cups.map((row, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                    {countries.map((c) => (
                      <td key={c} className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                        {row[c]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
