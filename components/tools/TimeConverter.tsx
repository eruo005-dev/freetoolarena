"use client";

import { useMemo, useState } from "react";

const UNITS = [
  { id: "ms", label: "Millisecond (ms)", factor: 0.001 },
  { id: "s", label: "Second (s)", factor: 1 },
  { id: "min", label: "Minute (min)", factor: 60 },
  { id: "hr", label: "Hour (hr)", factor: 3600 },
  { id: "day", label: "Day", factor: 86400 },
  { id: "week", label: "Week", factor: 604800 },
  { id: "month", label: "Month (30.44 d)", factor: 2629746 },
  { id: "year", label: "Year (365.25 d)", factor: 31557600 },
];

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.0001 || abs > 1e10)) return n.toExponential(6);
  return n.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function getFactor(id: string): number {
  return UNITS.find((u) => u.id === id)?.factor ?? 1;
}

function convert(value: number, fromId: string, toId: string): number {
  const seconds = value * getFactor(fromId);
  return seconds / getFactor(toId);
}

type Props = { initialValue?: string; initialFrom?: string; initialTo?: string };

export function TimeConverter({ initialValue = "1", initialFrom = "hr", initialTo = "min" }: Props) {
  const [fromId, setFromId] = useState(initialFrom);
  const [toId, setToId] = useState(initialTo);
  const [value, setValue] = useState(initialValue);

  const parsed = parseFloat(value);
  const valid = isFinite(parsed);

  const result = useMemo(() => (valid ? convert(parsed, fromId, toId) : NaN), [parsed, fromId, toId, valid]);

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Value</span>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">From</span>
          <select
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 items-end">
          <label className="block flex-1">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">To</span>
            <select
              value={toId}
              onChange={(e) => setToId(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={swap}
            aria-label="Swap units"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            ↔
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Result</p>
        <p className="text-brand text-3xl font-bold tabular-nums">
          {valid ? fmt(result) : "—"}{" "}
          <span className="text-base font-normal text-slate-600">{UNITS.find((u) => u.id === toId)?.label}</span>
        </p>
        <p className="text-sm text-slate-600 mt-1">
          {valid ? `${fmt(parsed)} ${UNITS.find((u) => u.id === fromId)?.label} = ${fmt(result)} ${UNITS.find((u) => u.id === toId)?.label}` : "Enter a valid number."}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">All units</p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2 font-semibold text-slate-700">Unit</th>
                <th className="px-3 py-2 font-semibold text-slate-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {UNITS.map((u) => (
                <tr key={u.id} className="even:bg-slate-50 odd:bg-white">
                  <td className="px-3 py-2 text-slate-700">{u.label}</td>
                  <td className="px-3 py-2 tabular-nums text-slate-900">{valid ? fmt(convert(parsed, fromId, u.id)) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
