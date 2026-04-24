"use client";

import { useMemo, useState } from "react";

type InputMode = "gauge" | "metric" | "diameter";

interface ScrewRow {
  gauge: string;
  metric: string;
  diameter: number; // inches
  tpiCoarse: number;
  tpiFine: number;
  heads: string[];
}

const SCREW_TABLE: ScrewRow[] = [
  {
    gauge: "#4",
    metric: "M2.9",
    diameter: 0.112,
    tpiCoarse: 40,
    tpiFine: 48,
    heads: ["flat", "pan", "round"],
  },
  {
    gauge: "#6",
    metric: "M3.5",
    diameter: 0.138,
    tpiCoarse: 32,
    tpiFine: 40,
    heads: ["flat", "pan", "round", "truss"],
  },
  {
    gauge: "#8",
    metric: "M4",
    diameter: 0.164,
    tpiCoarse: 32,
    tpiFine: 36,
    heads: ["flat", "pan", "round", "truss", "button"],
  },
  {
    gauge: "#10",
    metric: "M5",
    diameter: 0.19,
    tpiCoarse: 24,
    tpiFine: 32,
    heads: ["flat", "pan", "round", "truss", "button"],
  },
  {
    gauge: "#12",
    metric: "M6",
    diameter: 0.216,
    tpiCoarse: 24,
    tpiFine: 28,
    heads: ["flat", "pan", "round", "truss", "button"],
  },
  {
    gauge: "#14",
    metric: "M7",
    diameter: 0.242,
    tpiCoarse: 20,
    tpiFine: 24,
    heads: ["flat", "pan", "round", "hex"],
  },
];

const COMMON_LENGTHS = ['1/2"', '3/4"', '1"', '1-1/4"', '1-1/2"', '2"', '2-1/2"', '3"'];

export interface ScrewSizeConverterProps {
  initialGauge?: string;
}

export function ScrewSizeConverter({ initialGauge = "#8" }: ScrewSizeConverterProps = {}) {
  const [mode, setMode] = useState<InputMode>("gauge");
  const [gauge, setGauge] = useState(initialGauge);
  const [metric, setMetric] = useState("M4");
  const [diameter, setDiameter] = useState("0.164");

  const result = useMemo(() => {
    if (mode === "gauge") {
      return SCREW_TABLE.find((r) => r.gauge === gauge) ?? null;
    }
    if (mode === "metric") {
      return SCREW_TABLE.find((r) => r.metric === metric) ?? null;
    }
    const d = parseFloat(diameter);
    if (!Number.isFinite(d)) return null;
    // nearest by abs diff
    let best = SCREW_TABLE[0];
    let bestDiff = Math.abs(best.diameter - d);
    for (const row of SCREW_TABLE) {
      const diff = Math.abs(row.diameter - d);
      if (diff < bestDiff) {
        best = row;
        bestDiff = diff;
      }
    }
    return best;
  }, [mode, gauge, metric, diameter]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2">
        {(["gauge", "metric", "diameter"] as InputMode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-lg border px-3 py-2 text-sm capitalize ${
              mode === m
                ? "border-brand bg-slate-50 font-semibold text-brand"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            {m === "diameter" ? "Diameter (in)" : m}
          </button>
        ))}
      </div>

      {mode === "gauge" && (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Screw gauge</span>
          <select
            value={gauge}
            onChange={(e) => setGauge(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {SCREW_TABLE.map((r) => (
              <option key={r.gauge} value={r.gauge}>
                {r.gauge}
              </option>
            ))}
          </select>
        </label>
      )}
      {mode === "metric" && (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Metric size</span>
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {SCREW_TABLE.map((r) => (
              <option key={r.metric} value={r.metric}>
                {r.metric}
              </option>
            ))}
          </select>
        </label>
      )}
      {mode === "diameter" && (
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Diameter (in, .11&ndash;.25)
          </span>
          <input
            type="number"
            step="0.001"
            value={diameter}
            onChange={(e) => setDiameter(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      )}

      {result ? (
        <>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Gauge</p>
              <p className="text-2xl font-semibold tabular-nums text-brand">{result.gauge}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Metric</p>
              <p className="text-2xl font-semibold tabular-nums text-brand">{result.metric}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Diameter
              </p>
              <p className="text-2xl font-semibold tabular-nums text-brand">
                {result.diameter.toFixed(3)}&quot;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Thread pitch (TPI)
              </p>
              <p className="text-sm text-slate-700 tabular-nums">
                Coarse: <span className="font-semibold">{result.tpiCoarse}</span> TPI &middot;
                Fine: <span className="font-semibold">{result.tpiFine}</span> TPI
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Head types
              </p>
              <p className="text-sm text-slate-700 capitalize">{result.heads.join(", ")}</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
              Common lengths
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_LENGTHS.map((l) => (
                <span
                  key={l}
                  className="rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-mono text-slate-700"
                >
                  {l}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Metric conversion is nominal &mdash; M4 is technically 0.157&quot; but is the closest
            commercial equivalent to #8. For structural use, match the exact fastener standard
            (ANSI B18.6.3 for inch, ISO 1478 for metric).
          </p>
        </>
      ) : (
        <p className="text-sm text-red-600">Enter a valid size.</p>
      )}
    </div>
  );
}
