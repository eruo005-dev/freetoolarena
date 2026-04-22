"use client";

import { useMemo, useState } from "react";

const UNITS = [
  { id: "sqmm", label: "Square millimeter (mm²)", factor: 1e-6 },
  { id: "sqcm", label: "Square centimeter (cm²)", factor: 1e-4 },
  { id: "sqm", label: "Square meter (m²)", factor: 1 },
  { id: "ha", label: "Hectare (ha)", factor: 10000 },
  { id: "sqkm", label: "Square kilometer (km²)", factor: 1e6 },
  { id: "sqin", label: "Square inch (in²)", factor: 0.00064516 },
  { id: "sqft", label: "Square foot (ft²)", factor: 0.09290304 },
  { id: "sqyd", label: "Square yard (yd²)", factor: 0.83612736 },
  { id: "acre", label: "Acre", factor: 4046.8564224 },
  { id: "sqmi", label: "Square mile (mi²)", factor: 2589988.110336 },
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
  const sqm = value * getFactor(fromId);
  return sqm / getFactor(toId);
}

type Props = { initialValue?: string; initialFrom?: string; initialTo?: string };

export function AreaConverter({ initialValue = "1", initialFrom = "sqm", initialTo = "sqft" }: Props) {
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
