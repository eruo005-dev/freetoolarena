"use client";

import { useMemo, useState } from "react";

type Mode = "dims" | "ratio";

const PRESETS: Array<{ label: string; w: number; h: number }> = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "9:16", w: 9, h: 16 },
  { label: "21:9", w: 21, h: 9 },
  { label: "3:2", w: 3, h: 2 },
  { label: "2:3", w: 2, h: 3 },
];

export function AspectRatioCalculator() {
  const [mode, setMode] = useState<Mode>("dims");
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [ratioStr, setRatioStr] = useState("16:9");
  const [knownDim, setKnownDim] = useState<"w" | "h">("w");
  const [knownValue, setKnownValue] = useState<number>(1920);

  const dimsResult = useMemo(() => {
    if (width <= 0 || height <= 0) return null;
    const g = gcd(width, height);
    return {
      gcd: g,
      reducedW: width / g,
      reducedH: height / g,
      decimal: width / height,
    };
  }, [width, height]);

  const ratioResult = useMemo(() => {
    const parts = ratioStr.split(":").map((s) => Number(s.trim()));
    if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
    const [rw, rh] = parts;
    if (knownDim === "w") {
      return { w: knownValue, h: Math.round((knownValue * rh) / rw), rw, rh };
    }
    return { w: Math.round((knownValue * rw) / rh), h: knownValue, rw, rh };
  }, [ratioStr, knownDim, knownValue]);

  const previewRatio =
    mode === "dims" && dimsResult
      ? dimsResult.decimal
      : ratioResult
      ? ratioResult.rw / ratioResult.rh
      : 16 / 9;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode("dims")}
          className={`rounded-md border px-3 py-2 text-sm font-semibold ${
            mode === "dims"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Width × Height → Ratio
        </button>
        <button
          type="button"
          onClick={() => setMode("ratio")}
          className={`rounded-md border px-3 py-2 text-sm font-semibold ${
            mode === "ratio"
              ? "bg-brand text-white border-brand"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          Ratio + 1 dim → other
        </button>
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
          Preset ratios
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => {
                if (mode === "dims") {
                  setWidth(p.w * 120);
                  setHeight(p.h * 120);
                } else {
                  setRatioStr(`${p.w}:${p.h}`);
                }
              }}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {mode === "dims" ? (
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Width (px)
            </span>
            <input
              type="number"
              min={1}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Height (px)
            </span>
            <input
              type="number"
              min={1}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
      ) : (
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Ratio (W:H)
            </span>
            <input
              type="text"
              value={ratioStr}
              onChange={(e) => setRatioStr(e.target.value)}
              placeholder="16:9"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
            />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Known dimension
            </span>
            <select
              value={knownDim}
              onChange={(e) => setKnownDim(e.target.value as "w" | "h")}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            >
              <option value="w">Width</option>
              <option value="h">Height</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
              Value (px)
            </span>
            <input
              type="number"
              min={1}
              value={knownValue}
              onChange={(e) => setKnownValue(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 min-h-[200px] flex items-center justify-center">
        <div
          className="rounded-lg bg-brand/10 border border-brand text-brand-dark text-sm font-semibold flex items-center justify-center"
          style={{
            aspectRatio: `${previewRatio}`,
            width: previewRatio >= 1 ? 320 : undefined,
            height: previewRatio < 1 ? 280 : undefined,
            maxWidth: "100%",
          }}
        >
          {previewRatio.toFixed(3)}:1
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Results</p>
        {mode === "dims" && dimsResult && (
          <dl className="grid grid-cols-2 gap-y-1 text-sm">
            <dt className="text-slate-500">Aspect ratio</dt>
            <dd className="font-mono text-slate-900">
              {dimsResult.reducedW}:{dimsResult.reducedH}
            </dd>
            <dt className="text-slate-500">Decimal</dt>
            <dd className="font-mono text-slate-900">{dimsResult.decimal.toFixed(4)}</dd>
            <dt className="text-slate-500">GCD</dt>
            <dd className="font-mono text-slate-900">{dimsResult.gcd}</dd>
          </dl>
        )}
        {mode === "ratio" && ratioResult && (
          <dl className="grid grid-cols-2 gap-y-1 text-sm">
            <dt className="text-slate-500">Width</dt>
            <dd className="font-mono text-slate-900">{ratioResult.w}px</dd>
            <dt className="text-slate-500">Height</dt>
            <dd className="font-mono text-slate-900">{ratioResult.h}px</dd>
            <dt className="text-slate-500">Ratio</dt>
            <dd className="font-mono text-slate-900">
              {ratioResult.rw}:{ratioResult.rh}
            </dd>
          </dl>
        )}
      </div>
    </div>
  );
}

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}
