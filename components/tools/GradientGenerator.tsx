"use client";

import { useMemo, useState } from "react";

type GradientType = "linear" | "radial";
type Stop = { color: string; position: number };

type Preset = { name: string; type: GradientType; direction: string; stops: Stop[] };

const DIRECTIONS: { label: string; value: string }[] = [
  { label: "to right", value: "to right" },
  { label: "to left", value: "to left" },
  { label: "to bottom", value: "to bottom" },
  { label: "to top", value: "to top" },
  { label: "to bottom right", value: "to bottom right" },
  { label: "to bottom left", value: "to bottom left" },
  { label: "to top right", value: "to top right" },
  { label: "to top left", value: "to top left" },
];

const PRESETS: Preset[] = [
  {
    name: "Sunset",
    type: "linear",
    direction: "to right",
    stops: [
      { color: "#ff7e5f", position: 0 },
      { color: "#feb47b", position: 100 },
    ],
  },
  {
    name: "Ocean",
    type: "linear",
    direction: "to bottom",
    stops: [
      { color: "#2e3192", position: 0 },
      { color: "#1bffff", position: 100 },
    ],
  },
  {
    name: "Forest",
    type: "linear",
    direction: "to top right",
    stops: [
      { color: "#134e5e", position: 0 },
      { color: "#71b280", position: 100 },
    ],
  },
  {
    name: "Fire",
    type: "linear",
    direction: "to top",
    stops: [
      { color: "#ff0844", position: 0 },
      { color: "#ffb199", position: 100 },
    ],
  },
  {
    name: "Twilight",
    type: "radial",
    direction: "circle at center",
    stops: [
      { color: "#4b6cb7", position: 0 },
      { color: "#182848", position: 100 },
    ],
  },
];

export function GradientGenerator({
  initialPreset = 0,
}: { initialPreset?: number } = {}) {
  const start = PRESETS[initialPreset] ?? PRESETS[0];
  const [type, setType] = useState<GradientType>(start.type);
  const [direction, setDirection] = useState<string>(start.direction);
  const [radialAngle, setRadialAngle] = useState<number>(0);
  const [stops, setStops] = useState<Stop[]>(start.stops);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => buildCss(type, direction, stops), [type, direction, stops]);

  function applyPreset(p: Preset) {
    setType(p.type);
    setDirection(p.direction);
    setStops(p.stops.map((s) => ({ ...s })));
  }

  function addStop() {
    const last = stops[stops.length - 1];
    setStops([...stops, { color: last?.color ?? "#ffffff", position: 100 }]);
  }

  function removeStop(idx: number) {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== idx));
  }

  function updateStop(idx: number, patch: Partial<Stop>) {
    setStops(stops.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`background: ${css};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl border border-slate-200"
        style={{ background: css, height: 400 }}
        aria-label="Gradient preview"
      />

      <div>
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
          Presets
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              style={{
                backgroundImage: buildCss(p.type, p.direction, p.stops),
                color: "#fff",
                textShadow: "0 1px 2px rgba(0,0,0,.5)",
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Type
          </span>
          <select
            value={type}
            onChange={(e) => {
              const t = e.target.value as GradientType;
              setType(t);
              setDirection(t === "linear" ? "to right" : "circle at center");
            }}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>
        </label>

        {type === "linear" ? (
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Direction
            </span>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              {DIRECTIONS.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Shape / center · {radialAngle}°
            </span>
            <input
              type="range"
              min={0}
              max={360}
              value={radialAngle}
              onChange={(e) => {
                const v = Number(e.target.value);
                setRadialAngle(v);
                setDirection("circle at center");
              }}
              className="w-full"
            />
          </label>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Color stops
          </p>
          <button
            type="button"
            onClick={addStop}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
          >
            + Add stop
          </button>
        </div>
        {stops.map((s, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="color"
              value={s.color}
              onChange={(e) => updateStop(idx, { color: e.target.value })}
              className="h-10 w-14 rounded-lg border border-slate-300 bg-white px-1"
            />
            <input
              type="text"
              value={s.color}
              onChange={(e) => updateStop(idx, { color: e.target.value })}
              className="w-32 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={s.position}
              onChange={(e) => updateStop(idx, { position: Number(e.target.value) })}
              className="flex-1"
            />
            <span className="text-xs tabular-nums text-slate-600 w-10 text-right">
              {s.position}%
            </span>
            <button
              type="button"
              onClick={() => removeStop(idx)}
              disabled={stops.length <= 2}
              className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            CSS
          </p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{`background: ${css};`}</pre>
      </div>
    </div>
  );
}

function buildCss(type: GradientType, direction: string, stops: Stop[]): string {
  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const parts = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");
  if (type === "linear") {
    return `linear-gradient(${direction}, ${parts})`;
  }
  return `radial-gradient(${direction}, ${parts})`;
}
