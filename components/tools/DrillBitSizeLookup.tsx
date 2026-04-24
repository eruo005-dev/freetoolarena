"use client";

import { useMemo, useState } from "react";

type Application = "pilot-wood" | "pilot-machine" | "anchor" | "tap";

interface BitEntry {
  soft?: string;
  hard?: string;
  main?: string;
  alt?: string[];
  notes?: string;
}

// Fractional string, decimal inches, mm
const BIT_DATA: Record<Application, Record<string, BitEntry>> = {
  "pilot-wood": {
    "#6": { soft: "5/64", hard: "3/32", alt: ["1/16"] },
    "#8": { soft: "3/32", hard: "7/64", alt: ["1/8"] },
    "#10": { soft: "7/64", hard: "1/8", alt: ["9/64"] },
    "#12": { soft: "1/8", hard: "9/64", alt: ["5/32"] },
  },
  "pilot-machine": {
    "#6": { main: "7/64", alt: ["1/8"], notes: "32 TPI" },
    "#8": { main: "9/64", alt: ["5/32"], notes: "32 TPI" },
    "#10": { main: "5/32", alt: ["11/64"], notes: "24 TPI" },
    "#12": { main: "11/64", alt: ["3/16"], notes: "24 TPI" },
  },
  anchor: {
    "1/4": { main: "1/4", alt: ["17/64"], notes: "Hammer-set drop-in or plastic anchor" },
    "5/16": { main: "5/16", alt: ["11/32"], notes: "Wedge anchor" },
    "3/8": { main: "3/8", alt: ["25/64"], notes: "Wedge anchor" },
    "1/2": { main: "1/2", alt: ["17/32"], notes: "Wedge anchor; SDS drill recommended" },
  },
  tap: {
    "#6": { main: "#36", alt: ["7/64"], notes: "32 TPI tap drill = 0.1065 in" },
    "#8": { main: "#29", alt: ["9/64"], notes: "32 TPI tap drill = 0.1360 in" },
    "#10": { main: "#21", alt: ["5/32"], notes: "24 TPI tap drill = 0.1590 in" },
    "#12": { main: "#16", alt: ["11/64"], notes: "24 TPI tap drill = 0.1770 in" },
  },
};

const FRACTION_TO_INCH: Record<string, number> = {
  "1/16": 0.0625,
  "5/64": 0.0781,
  "3/32": 0.0938,
  "7/64": 0.1094,
  "1/8": 0.125,
  "9/64": 0.1406,
  "5/32": 0.1562,
  "11/64": 0.1719,
  "3/16": 0.1875,
  "13/64": 0.2031,
  "7/32": 0.2188,
  "15/64": 0.2344,
  "1/4": 0.25,
  "17/64": 0.2656,
  "5/16": 0.3125,
  "11/32": 0.3438,
  "3/8": 0.375,
  "25/64": 0.3906,
  "1/2": 0.5,
  "17/32": 0.5312,
  "#36": 0.1065,
  "#29": 0.1360,
  "#21": 0.1590,
  "#16": 0.1770,
};

const SIZE_OPTIONS: Record<Application, string[]> = {
  "pilot-wood": ["#6", "#8", "#10", "#12"],
  "pilot-machine": ["#6", "#8", "#10", "#12"],
  anchor: ["1/4", "5/16", "3/8", "1/2"],
  tap: ["#6", "#8", "#10", "#12"],
};

export interface DrillBitSizeLookupProps {
  initialApp?: Application;
}

export function DrillBitSizeLookup({ initialApp = "pilot-wood" }: DrillBitSizeLookupProps = {}) {
  const [app, setApp] = useState<Application>(initialApp);
  const [size, setSize] = useState("#8");
  const [wood, setWood] = useState<"soft" | "hard">("soft");

  const entry = useMemo(() => {
    const row = BIT_DATA[app][size];
    if (!row) return null;

    let primary = row.main;
    if (app === "pilot-wood") {
      primary = wood === "soft" ? row.soft : row.hard;
    }

    const asInch = primary ? FRACTION_TO_INCH[primary] : undefined;
    const asMm = asInch !== undefined ? asInch * 25.4 : undefined;

    return {
      primary: primary ?? "-",
      inch: asInch,
      mm: asMm,
      alt: row.alt ?? [],
      notes: row.notes,
      soft: row.soft,
      hard: row.hard,
    };
  }, [app, size, wood]);

  const options = SIZE_OPTIONS[app];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Application</span>
          <select
            value={app}
            onChange={(e) => {
              const next = e.target.value as Application;
              setApp(next);
              setSize(SIZE_OPTIONS[next][1] ?? SIZE_OPTIONS[next][0]);
            }}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="pilot-wood">Pilot hole &mdash; wood screw</option>
            <option value="pilot-machine">Pilot hole &mdash; machine screw</option>
            <option value="anchor">Anchor hole (concrete/masonry)</option>
            <option value="tap">Tap drill hole</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Screw / anchor size</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      {app === "pilot-wood" && (
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setWood("soft")}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
              wood === "soft"
                ? "border-brand bg-slate-50 font-semibold text-brand"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            Softwood (pine, cedar, fir)
          </button>
          <button
            type="button"
            onClick={() => setWood("hard")}
            className={`flex-1 rounded-lg border px-3 py-2 text-sm ${
              wood === "hard"
                ? "border-brand bg-slate-50 font-semibold text-brand"
                : "border-slate-300 bg-white text-slate-700"
            }`}
          >
            Hardwood (oak, maple, walnut)
          </button>
        </div>
      )}

      {entry ? (
        <>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              Recommended bit
            </p>
            <p className="text-2xl font-semibold tabular-nums text-brand">{entry.primary}&quot;</p>
            {entry.inch !== undefined && entry.mm !== undefined && (
              <p className="text-sm text-slate-600 mt-1 tabular-nums">
                {entry.inch.toFixed(4)} in &middot; {entry.mm.toFixed(2)} mm
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Alternatives
              </p>
              <p className="text-sm font-mono text-slate-700">
                {entry.alt.length > 0 ? entry.alt.join(", ") : "\u2014"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
                Notes
              </p>
              <p className="text-sm text-slate-700">
                {entry.notes
                  ? entry.notes
                  : app === "pilot-wood"
                  ? `Softwood: ${entry.soft ?? "-"}" - Hardwood: ${entry.hard ?? "-"}"`
                  : "Standard fastener spec"}
              </p>
            </div>
          </div>
          {app === "pilot-wood" && (
            <p className="text-xs text-slate-500">
              Softwood grips threads easily so smaller pilot is fine. Hardwood needs a larger
              pilot to prevent splitting &mdash; go up one bit size if the screw still binds.
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-red-600">No data for that combination.</p>
      )}
    </div>
  );
}
