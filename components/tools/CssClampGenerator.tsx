"use client";

import { useMemo, useState } from "react";

const ROOT = 16;

function toRem(px: number): number {
  return px / ROOT;
}

function round(n: number, d = 4): number {
  const f = Math.pow(10, d);
  return Math.round(n * f) / f;
}

export function CssClampGenerator() {
  const [minFs, setMinFs] = useState(16);
  const [maxFs, setMaxFs] = useState(32);
  const [minVw, setMinVw] = useState(320);
  const [maxVw, setMaxVw] = useState(1440);
  const [copied, setCopied] = useState(false);

  const { slope, yIntercept, minRem, maxRem, yInterceptRem, slopeVw, css } = useMemo(() => {
    const slope = (maxFs - minFs) / (maxVw - minVw || 1);
    const yIntercept = minFs - slope * minVw;
    const minRem = round(toRem(minFs));
    const maxRem = round(toRem(maxFs));
    const yInterceptRem = round(toRem(yIntercept));
    const slopeVw = round(slope * 100, 3);
    const css = `font-size: clamp(${minRem}rem, ${yInterceptRem}rem + ${slopeVw}vw, ${maxRem}rem);`;
    return { slope, yIntercept, minRem, maxRem, yInterceptRem, slopeVw, css };
  }, [minFs, maxFs, minVw, maxVw]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  function previewAt(vw: number): number {
    const computed = yIntercept + slope * vw;
    return Math.max(minFs, Math.min(maxFs, computed));
  }

  const previewWidths = [minVw, Math.round((minVw + maxVw) / 2), maxVw];

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Min font-size (px)
          </span>
          <input
            type="number"
            value={minFs}
            onChange={(e) => setMinFs(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Max font-size (px)
          </span>
          <input
            type="number"
            value={maxFs}
            onChange={(e) => setMaxFs(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Min viewport (px)
          </span>
          <input
            type="number"
            value={minVw}
            onChange={(e) => setMinVw(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Max viewport (px)
          </span>
          <input
            type="number"
            value={maxVw}
            onChange={(e) => setMaxVw(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">CSS</span>
          <button type="button" onClick={copy} className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{css}</pre>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 space-y-1">
        <div><strong>Slope:</strong> <span className="font-mono">{round(slope, 6)}</span></div>
        <div><strong>Y-intercept:</strong> <span className="font-mono">{round(yIntercept, 4)}px</span> ({yInterceptRem}rem)</div>
        <div><strong>Fluid term:</strong> <span className="font-mono">{yInterceptRem}rem + {slopeVw}vw</span></div>
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">
          Preview at 3 viewport widths
        </span>
        <div className="space-y-3">
          {previewWidths.map((vw) => {
            const fs = previewAt(vw);
            return (
              <div key={vw} className="rounded-xl border border-slate-200 bg-slate-50 p-8 flex items-center justify-center min-h-[120px]">
                <div className="text-center">
                  <p style={{ fontSize: `${fs}px` }} className="text-slate-900 font-semibold">
                    The quick brown fox
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-mono">
                    viewport: {vw}px → font-size: {round(fs, 2)}px
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
