"use client";

import { useMemo, useState } from "react";

const PROS: { game: string; edpi: string }[] = [
  { game: "CS2 / CS:GO", edpi: "~800" },
  { game: "Valorant", edpi: "~280" },
  { game: "Apex Legends", edpi: "~1600" },
  { game: "Overwatch 2", edpi: "~4000" },
  { game: "Fortnite", edpi: "~50 (different scale)" },
];

function tier(edpi: number): { label: string; color: string } {
  if (edpi < 400) return { label: "Low (<400)", color: "text-emerald-700 bg-emerald-50" };
  if (edpi < 800) return { label: "Medium (400\u2013800)", color: "text-sky-700 bg-sky-50" };
  if (edpi < 1600) return { label: "High (800\u20131600)", color: "text-amber-700 bg-amber-50" };
  return { label: "Very high (>1600)", color: "text-rose-700 bg-rose-50" };
}

export function EdpiCalculator() {
  const [sensStr, setSensStr] = useState("1.0");
  const [dpiStr, setDpiStr] = useState("800");

  const sens = Number(sensStr);
  const dpi = Number(dpiStr);
  const valid = Number.isFinite(sens) && Number.isFinite(dpi) && sens > 0 && dpi > 0;

  const edpi = useMemo(() => (valid ? sens * dpi : 0), [sens, dpi, valid]);
  const cm360 = useMemo(() => {
    if (!valid) return 0;
    return (360 / (sens * 0.022)) * (2.54 / dpi);
  }, [sens, dpi, valid]);

  const t = tier(edpi);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">In-game sensitivity</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            inputMode="decimal"
            value={sensStr}
            onChange={(e) => setSensStr(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Mouse DPI</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            inputMode="numeric"
            value={dpiStr}
            onChange={(e) => setDpiStr(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">eDPI</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? edpi.toFixed(0) : "\u2014"}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Tier</div>
          <div className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${t.color}`}>{t.label}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">cm/360 @ CS2 yaw</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? cm360.toFixed(1) + " cm" : "\u2014"}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-600">
          Pro player eDPI averages
        </div>
        <table className="w-full text-sm">
          <tbody>
            {PROS.map((p) => (
              <tr key={p.game} className="border-t border-slate-200">
                <td className="px-4 py-2 text-slate-700">{p.game}</td>
                <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-900">{p.edpi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        eDPI (effective DPI) = in-game sens &times; mouse DPI. It&rsquo;s the single number that normalizes settings across setups &mdash; useful when comparing to pros or teammates.
      </p>
    </div>
  );
}
