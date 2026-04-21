"use client";

import { useState } from "react";

type Scale = "C" | "F" | "K";

export function TemperatureConverter() {
  const [value, setValue] = useState("20");
  const [from, setFrom] = useState<Scale>("C");

  const v = parseFloat(value);
  const valid = isFinite(v);
  const c = valid ? toC(v, from) : null;
  const out = {
    C: c == null ? "" : fmt(c),
    F: c == null ? "" : fmt(c * 9 / 5 + 32),
    K: c == null ? "" : fmt(c + 273.15),
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value as Scale)}
          className="rounded-lg border border-slate-300 px-3 py-2 w-32"
        >
          <option value="C">°Celsius</option>
          <option value="F">°Fahrenheit</option>
          <option value="K">Kelvin</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Box label="Celsius" value={`${out.C}°C`} active={from === "C"} />
        <Box label="Fahrenheit" value={`${out.F}°F`} active={from === "F"} />
        <Box label="Kelvin" value={`${out.K} K`} active={from === "K"} />
      </div>
      <div className="text-sm text-slate-600 space-y-1">
        <p><strong>Formulas:</strong> °F = °C × 9/5 + 32 · K = °C + 273.15</p>
        <p>Freezing water: 0°C = 32°F = 273.15 K. Body temp: 37°C = 98.6°F.</p>
      </div>
    </div>
  );
}

function toC(v: number, from: Scale) {
  if (from === "C") return v;
  if (from === "F") return (v - 32) * 5 / 9;
  return v - 273.15;
}
function fmt(n: number) {
  return (Math.round(n * 100) / 100).toString();
}
function Box({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${active ? "border-brand bg-brand/5" : "border-slate-200 bg-slate-50"}`}>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-0.5">{label}</p>
      <p className={`text-2xl font-bold tabular-nums ${active ? "text-brand" : "text-slate-900"}`}>{value}</p>
    </div>
  );
}
