"use client";

import { useMemo, useState } from "react";

type Shadow = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
};

const DEFAULT_SHADOW: Shadow = {
  x: 0,
  y: 10,
  blur: 25,
  spread: -5,
  color: "#000000",
  opacity: 0.2,
  inset: false,
};

function hexToRgba(hex: string, opacity: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function shadowToCss(s: Shadow): string {
  return `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${hexToRgba(s.color, s.opacity)}`;
}

export function BoxShadowGenerator() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...DEFAULT_SHADOW }]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => shadows.map(shadowToCss).join(", "), [shadows]);
  const cur = shadows[active];

  function update(patch: Partial<Shadow>) {
    setShadows(shadows.map((s, i) => (i === active ? { ...s, ...patch } : s)));
  }
  function addLayer() {
    setShadows([...shadows, { ...DEFAULT_SHADOW }]);
    setActive(shadows.length);
  }
  function removeLayer(i: number) {
    if (shadows.length <= 1) return;
    const next = shadows.filter((_, idx) => idx !== i);
    setShadows(next);
    setActive(Math.max(0, Math.min(active, next.length - 1)));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(`box-shadow: ${css};`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 flex items-center justify-center min-h-[200px]">
        <div
          className="h-40 w-40 rounded-xl bg-white"
          style={{ boxShadow: css }}
        />
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2 block">
          Shadow Layers
        </span>
        <div className="flex flex-wrap gap-2">
          {shadows.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                active === i
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-300 hover:border-brand"
              }`}
            >
              Layer {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={addLayer}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border transition bg-white text-slate-700 border-slate-300 hover:border-brand"
          >
            + Add
          </button>
          {shadows.length > 1 && (
            <button
              type="button"
              onClick={() => removeLayer(active)}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border transition bg-white text-slate-700 border-slate-300 hover:border-brand"
            >
              Remove Layer {active + 1}
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            X offset · {cur.x}px
          </span>
          <input type="range" min={-100} max={100} value={cur.x} onChange={(e) => update({ x: Number(e.target.value) })} className="w-full accent-brand" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Y offset · {cur.y}px
          </span>
          <input type="range" min={-100} max={100} value={cur.y} onChange={(e) => update({ y: Number(e.target.value) })} className="w-full accent-brand" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Blur · {cur.blur}px
          </span>
          <input type="range" min={0} max={200} value={cur.blur} onChange={(e) => update({ blur: Number(e.target.value) })} className="w-full accent-brand" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Spread · {cur.spread}px
          </span>
          <input type="range" min={-50} max={50} value={cur.spread} onChange={(e) => update({ spread: Number(e.target.value) })} className="w-full accent-brand" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Opacity · {cur.opacity.toFixed(2)}
          </span>
          <input type="range" min={0} max={1} step={0.01} value={cur.opacity} onChange={(e) => update({ opacity: Number(e.target.value) })} className="w-full accent-brand" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Color
          </span>
          <div className="flex items-center gap-2">
            <input type="color" value={cur.color} onChange={(e) => update({ color: e.target.value })} className="h-10 w-14 rounded-lg border border-slate-300 bg-white px-1" />
            <input type="text" value={cur.color} onChange={(e) => update({ color: e.target.value })} className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono text-sm" />
          </div>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={cur.inset} onChange={(e) => update({ inset: e.target.checked })} className="accent-brand" />
        Inset shadow
      </label>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">CSS</span>
          <button type="button" onClick={copy} className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{`box-shadow: ${css};`}</pre>
      </div>
    </div>
  );
}
