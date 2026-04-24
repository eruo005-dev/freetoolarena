"use client";

import { useMemo, useState } from "react";

type Unit = "mpg_us" | "mpg_uk" | "l_100km" | "km_l";

const UNITS: { value: Unit; label: string }[] = [
  { value: "mpg_us", label: "MPG (US)" },
  { value: "mpg_uk", label: "MPG (UK)" },
  { value: "l_100km", label: "L/100 km" },
  { value: "km_l", label: "km/L" },
];

function toL100km(value: number, from: Unit): number {
  if (!Number.isFinite(value) || value <= 0) return NaN;
  if (from === "l_100km") return value;
  if (from === "mpg_us") return 235.215 / value;
  if (from === "mpg_uk") return 282.481 / value;
  if (from === "km_l") return 100 / value;
  return NaN;
}

function fromL100km(l100: number, to: Unit): number {
  if (!Number.isFinite(l100) || l100 <= 0) return NaN;
  if (to === "l_100km") return l100;
  if (to === "mpg_us") return 235.215 / l100;
  if (to === "mpg_uk") return 282.481 / l100;
  if (to === "km_l") return 100 / l100;
  return NaN;
}

function tierLabel(l100: number): string {
  if (!Number.isFinite(l100)) return "";
  if (l100 < 4) return "Excellent (hybrid / very efficient)";
  if (l100 < 6) return "Very good (compact / efficient sedan)";
  if (l100 < 8) return "Good (mid-size sedan)";
  if (l100 < 11) return "Average (SUV / larger sedan)";
  if (l100 < 15) return "Below average (large SUV / truck)";
  return "Poor (heavy truck / high-performance)";
}

export function FuelEconomyConverter() {
  const [value, setValue] = useState("30");
  const [fromUnit, setFromUnit] = useState<Unit>("mpg_us");
  const [toUnit, setToUnit] = useState<Unit>("l_100km");

  const numeric = Number(value);
  const valid = Number.isFinite(numeric) && numeric > 0;

  const { converted, reference, tier } = useMemo(() => {
    if (!valid) {
      return { converted: NaN, reference: null as null | Record<Unit, number>, tier: "" };
    }
    const l100 = toL100km(numeric, fromUnit);
    const ref: Record<Unit, number> = {
      mpg_us: fromL100km(l100, "mpg_us"),
      mpg_uk: fromL100km(l100, "mpg_uk"),
      l_100km: l100,
      km_l: fromL100km(l100, "km_l"),
    };
    return { converted: fromL100km(l100, toUnit), reference: ref, tier: tierLabel(l100) };
  }, [numeric, fromUnit, toUnit, valid]);

  const unitLabel = (u: Unit) => UNITS.find((x) => x.value === u)?.label ?? u;

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Value</span>
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">From</span>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as Unit)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">To</span>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as Unit)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {UNITS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">
          {valid ? `${numeric} ${unitLabel(fromUnit)} =` : "Enter a positive number"}
        </div>
        <div className="text-2xl font-semibold tabular-nums text-brand">
          {valid && Number.isFinite(converted) ? `${converted.toFixed(2)} ${unitLabel(toUnit)}` : "&mdash;"}
        </div>
        {tier && <div className="mt-1 text-sm text-slate-600">Efficiency tier: {tier}</div>}
      </div>

      {reference && (
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="mb-2 text-sm font-medium text-slate-700">Reference table</div>
          <div className="grid gap-3 sm:grid-cols-4">
            {UNITS.map((u) => (
              <div key={u.value} className="rounded-lg bg-white p-3 shadow-sm">
                <div className="text-xs text-slate-500">{u.label}</div>
                <div className="font-mono text-lg font-semibold tabular-nums text-brand">
                  {reference[u.value].toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        <div className="mb-1 font-medium text-slate-700">How it works</div>
        MPG (US) to L/100km uses 235.215 / MPG. MPG (UK) gallons are larger, so 282.481 / MPG.
        L/100km and km/L are reciprocals scaled by 100. Lower L/100km is better; higher MPG &amp; km/L are better.
      </div>
    </div>
  );
}
