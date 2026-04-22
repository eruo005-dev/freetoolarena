"use client";

import { useMemo, useState } from "react";

type Mode = "uniform" | "corner" | "elliptical";

type Corners = { tl: number; tr: number; br: number; bl: number };
type Elliptical = {
  tlH: number; tlV: number;
  trH: number; trV: number;
  brH: number; brV: number;
  blH: number; blV: number;
};

export function BorderRadiusGenerator() {
  const [mode, setMode] = useState<Mode>("uniform");
  const [uniform, setUniform] = useState(16);
  const [corners, setCorners] = useState<Corners>({ tl: 24, tr: 8, br: 24, bl: 8 });
  const [ell, setEll] = useState<Elliptical>({
    tlH: 40, tlV: 20,
    trH: 40, trV: 20,
    brH: 40, brV: 20,
    blH: 40, blV: 20,
  });
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => {
    if (mode === "uniform") return `${uniform}px`;
    if (mode === "corner") {
      return `${corners.tl}px ${corners.tr}px ${corners.br}px ${corners.bl}px`;
    }
    return `${ell.tlH}px ${ell.trH}px ${ell.brH}px ${ell.blH}px / ${ell.tlV}px ${ell.trV}px ${ell.brV}px ${ell.blV}px`;
  }, [mode, uniform, corners, ell]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(`border-radius: ${css};`);
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
          className="h-48 w-72 bg-brand"
          style={{ borderRadius: css }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["uniform", "corner", "elliptical"] as Mode[]).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition capitalize ${
                active
                  ? "bg-brand text-white border-brand"
                  : "bg-white text-slate-700 border-slate-300 hover:border-brand"
              }`}
            >
              {m}
            </button>
          );
        })}
      </div>

      {mode === "uniform" && (
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Radius · {uniform}px
          </span>
          <input type="range" min={0} max={200} value={uniform} onChange={(e) => setUniform(Number(e.target.value))} className="w-full accent-brand" />
        </label>
      )}

      {mode === "corner" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {([
            ["tl", "Top-Left"],
            ["tr", "Top-Right"],
            ["br", "Bottom-Right"],
            ["bl", "Bottom-Left"],
          ] as const).map(([k, label]) => (
            <label key={k} className="block">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
                {label} · {corners[k]}px
              </span>
              <input type="range" min={0} max={200} value={corners[k]} onChange={(e) => setCorners({ ...corners, [k]: Number(e.target.value) })} className="w-full accent-brand" />
            </label>
          ))}
        </div>
      )}

      {mode === "elliptical" && (
        <div className="grid sm:grid-cols-2 gap-4">
          {([
            ["tlH", "tlV", "Top-Left"],
            ["trH", "trV", "Top-Right"],
            ["brH", "brV", "Bottom-Right"],
            ["blH", "blV", "Bottom-Left"],
          ] as const).map(([hk, vk, label]) => (
            <div key={hk} className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
                {label}
              </span>
              <label className="block">
                <span className="text-xs text-slate-600 mb-1 block">Horizontal · {ell[hk]}px</span>
                <input type="range" min={0} max={200} value={ell[hk]} onChange={(e) => setEll({ ...ell, [hk]: Number(e.target.value) })} className="w-full accent-brand" />
              </label>
              <label className="block">
                <span className="text-xs text-slate-600 mb-1 block">Vertical · {ell[vk]}px</span>
                <input type="range" min={0} max={200} value={ell[vk]} onChange={(e) => setEll({ ...ell, [vk]: Number(e.target.value) })} className="w-full accent-brand" />
              </label>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500">CSS</span>
          <button type="button" onClick={copy} className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{`border-radius: ${css};`}</pre>
      </div>
    </div>
  );
}
