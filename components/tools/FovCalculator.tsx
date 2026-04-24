"use client";

import { useMemo, useState } from "react";

type Ratio = { id: string; label: string; value: number };

const RATIOS: Ratio[] = [
  { id: "4:3", label: "4:3", value: 4 / 3 },
  { id: "16:10", label: "16:10", value: 16 / 10 },
  { id: "16:9", label: "16:9", value: 16 / 9 },
  { id: "21:9", label: "21:9 (ultrawide)", value: 21 / 9 },
  { id: "32:9", label: "32:9 (super ultrawide)", value: 32 / 9 },
];

const PRESETS: { game: string; fov: string }[] = [
  { game: "CS2", fov: "90\u00b0 (default, fixed)" },
  { game: "Valorant", fov: "103\u00b0 (max, fixed)" },
  { game: "Apex Legends", fov: "70\u2013110\u00b0" },
  { game: "Overwatch 2", fov: "80\u2013103\u00b0" },
  { game: "Fortnite", fov: "80\u2013120\u00b0" },
];

export function FovCalculator() {
  const [fovStr, setFovStr] = useState("90");
  const [fromId, setFromId] = useState("16:9");
  const [toId, setToId] = useState("21:9");

  const fov = Number(fovStr);
  const valid = Number.isFinite(fov) && fov > 0 && fov < 180;

  const fromRatio = RATIOS.find((r) => r.id === fromId) ?? RATIOS[2];
  const toRatio = RATIOS.find((r) => r.id === toId) ?? RATIOS[3];

  const result = useMemo(() => {
    if (!valid) return { newH: 0, newV: 0, oldV: 0 };
    const rad = (fov * Math.PI) / 180;
    const newHorRad = 2 * Math.atan(Math.tan(rad / 2) * (toRatio.value / fromRatio.value));
    const newHorDeg = (newHorRad * 180) / Math.PI;
    // vertical FOV from horizontal: vFov = 2 * atan(tan(hFov/2) / aspect)
    const newVertRad = 2 * Math.atan(Math.tan(newHorRad / 2) / toRatio.value);
    const newVertDeg = (newVertRad * 180) / Math.PI;
    const oldVertRad = 2 * Math.atan(Math.tan(rad / 2) / fromRatio.value);
    const oldVertDeg = (oldVertRad * 180) / Math.PI;
    return { newH: newHorDeg, newV: newVertDeg, oldV: oldVertDeg };
  }, [fov, fromRatio, toRatio, valid]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Horizontal FOV (degrees)</span>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          inputMode="decimal"
          value={fovStr}
          onChange={(e) => setFovStr(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">From aspect ratio</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
          >
            {RATIOS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">To aspect ratio</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={toId}
            onChange={(e) => setToId(e.target.value)}
          >
            {RATIOS.map((r) => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Converted horizontal FOV</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? result.newH.toFixed(2) + "\u00b0" : "\u2014"}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Vertical FOV (new)</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? result.newV.toFixed(2) + "\u00b0" : "\u2014"}</div>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Vertical FOV (source, for Source-engine games)</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? result.oldV.toFixed(2) + "\u00b0" : "\u2014"}</div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-600">
          Game FOV presets
        </div>
        <table className="w-full text-sm">
          <tbody>
            {PRESETS.map((p) => (
              <tr key={p.game} className="border-t border-slate-200">
                <td className="px-4 py-2 text-slate-700">{p.game}</td>
                <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-900">{p.fov}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Uses the Hor+ formula: fov_new = 2 &times; atan(tan(fov_old/2) &times; (aspect_new / aspect_old)). Matches what modern FPS games do when you widen your monitor.
      </p>
    </div>
  );
}
