"use client";

import { useMemo, useState } from "react";

// All factors relative to byte
const DECIMAL_UNITS = [
  { id: "bit", label: "Bit (b)", factor: 1 / 8 },
  { id: "byte", label: "Byte (B)", factor: 1 },
  { id: "KB", label: "Kilobyte (KB)", factor: 1e3 },
  { id: "MB", label: "Megabyte (MB)", factor: 1e6 },
  { id: "GB", label: "Gigabyte (GB)", factor: 1e9 },
  { id: "TB", label: "Terabyte (TB)", factor: 1e12 },
  { id: "PB", label: "Petabyte (PB)", factor: 1e15 },
];

const BINARY_UNITS = [
  { id: "bit", label: "Bit (b)", factor: 1 / 8 },
  { id: "byte", label: "Byte (B)", factor: 1 },
  { id: "KiB", label: "Kibibyte (KiB)", factor: 1024 },
  { id: "MiB", label: "Mebibyte (MiB)", factor: 1024 ** 2 },
  { id: "GiB", label: "Gibibyte (GiB)", factor: 1024 ** 3 },
  { id: "TiB", label: "Tebibyte (TiB)", factor: 1024 ** 4 },
  { id: "PiB", label: "Pebibyte (PiB)", factor: 1024 ** 5 },
];

function fmt(n: number): string {
  if (!isFinite(n)) return "—";
  const abs = Math.abs(n);
  if (abs !== 0 && (abs < 0.0001 || abs > 1e10)) return n.toExponential(6);
  return n.toLocaleString("en-US", { maximumFractionDigits: 10 });
}

function getFactor(units: { id: string; factor: number }[], id: string): number {
  return units.find((u) => u.id === id)?.factor ?? 1;
}

function convert(units: { id: string; factor: number }[], value: number, fromId: string, toId: string): number {
  const bytes = value * getFactor(units, fromId);
  return bytes / getFactor(units, toId);
}

type Mode = "decimal" | "binary";
type Props = { initialValue?: string; initialFrom?: string; initialTo?: string };

export function DataSizeConverter({ initialValue = "1", initialFrom = "MB", initialTo = "GB" }: Props) {
  const [mode, setMode] = useState<Mode>(() => {
    const all = [...DECIMAL_UNITS, ...BINARY_UNITS].map((u) => u.id);
    if (BINARY_UNITS.some((u) => u.id === initialFrom) || BINARY_UNITS.some((u) => u.id === initialTo)) return "binary";
    return "decimal";
  });
  const units = mode === "decimal" ? DECIMAL_UNITS : BINARY_UNITS;

  const [fromId, setFromId] = useState(() =>
    units.some((u) => u.id === initialFrom) ? initialFrom : mode === "decimal" ? "MB" : "MiB",
  );
  const [toId, setToId] = useState(() =>
    units.some((u) => u.id === initialTo) ? initialTo : mode === "decimal" ? "GB" : "GiB",
  );
  const [value, setValue] = useState(initialValue);

  const parsed = parseFloat(value);
  const valid = isFinite(parsed);

  const result = useMemo(() => (valid ? convert(units, parsed, fromId, toId) : NaN), [parsed, fromId, toId, valid, units]);

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  const switchMode = (next: Mode) => {
    const nextUnits = next === "decimal" ? DECIMAL_UNITS : BINARY_UNITS;
    setMode(next);
    if (!nextUnits.some((u) => u.id === fromId)) setFromId(next === "decimal" ? "MB" : "MiB");
    if (!nextUnits.some((u) => u.id === toId)) setToId(next === "decimal" ? "GB" : "GiB");
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => switchMode("decimal")}
          className={`rounded-md border px-3 py-2 text-sm ${mode === "decimal" ? "border-brand bg-brand/5 text-brand font-semibold" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
        >
          Decimal (1000-based)
        </button>
        <button
          type="button"
          onClick={() => switchMode("binary")}
          className={`rounded-md border px-3 py-2 text-sm ${mode === "binary" ? "border-brand bg-brand/5 text-brand font-semibold" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
        >
          Binary (1024-based)
        </button>
      </div>

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
            {units.map((u) => (
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
              {units.map((u) => (
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
          <span className="text-base font-normal text-slate-600">{units.find((u) => u.id === toId)?.label}</span>
        </p>
        <p className="text-sm text-slate-600 mt-1">
          {valid ? `${fmt(parsed)} ${units.find((u) => u.id === fromId)?.label} = ${fmt(result)} ${units.find((u) => u.id === toId)?.label}` : "Enter a valid number."}
        </p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">All units ({mode})</p>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-100 text-left">
                <th className="px-3 py-2 font-semibold text-slate-700">Unit</th>
                <th className="px-3 py-2 font-semibold text-slate-700">Value</th>
              </tr>
            </thead>
            <tbody>
              {units.map((u) => (
                <tr key={u.id} className="even:bg-slate-50 odd:bg-white">
                  <td className="px-3 py-2 text-slate-700">{u.label}</td>
                  <td className="px-3 py-2 tabular-nums text-slate-900">{valid ? fmt(convert(units, parsed, fromId, u.id)) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
