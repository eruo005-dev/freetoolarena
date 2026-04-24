"use client";

import { useMemo, useState } from "react";

const HZ_ROWS = [30, 60, 75, 120, 144, 165, 240, 360, 500];

export function FpsToFrameTime() {
  const [fpsStr, setFpsStr] = useState("144");

  const fps = Number(fpsStr);
  const valid = Number.isFinite(fps) && fps > 0;

  const frameMs = useMemo(() => (valid ? 1000 / fps : 0), [fps, valid]);
  const msPerPixel = useMemo(() => (valid ? frameMs / 1080 : 0), [frameMs, valid]);

  const monitorHz = 144;
  const perceivedMs = useMemo(() => {
    if (!valid) return 0;
    return Math.max(frameMs, 1000 / monitorHz);
  }, [frameMs, valid]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Target FPS</span>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          inputMode="decimal"
          value={fpsStr}
          onChange={(e) => setFpsStr(e.target.value)}
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Frame time</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? frameMs.toFixed(3) + " ms" : "\u2014"}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Time per scanline (1080p)</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{valid ? (msPerPixel * 1000).toFixed(3) + " \u00b5s" : "\u2014"}</div>
        </div>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">On a {monitorHz} Hz monitor</div>
        <div className="text-sm text-slate-700 mt-1">
          If you render at <span className="font-mono tabular-nums text-brand">{valid ? fps.toFixed(0) : "\u2014"}</span> FPS, you see a new frame every{" "}
          <span className="font-mono tabular-nums text-brand">{valid ? perceivedMs.toFixed(2) : "\u2014"}</span> ms
          {valid && fps > monitorHz ? " (capped by the monitor refresh rate)." : "."}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 text-xs uppercase tracking-wide font-semibold text-slate-600">
          Refresh rate &rarr; frame time
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2 text-left">Hz / FPS</th>
              <th className="px-4 py-2 text-right">Frame time</th>
              <th className="px-4 py-2 text-right">Gap vs 60 Hz</th>
            </tr>
          </thead>
          <tbody>
            {HZ_ROWS.map((hz) => {
              const ms = 1000 / hz;
              const gap = 1000 / 60 - ms;
              return (
                <tr key={hz} className="border-t border-slate-200">
                  <td className="px-4 py-2 text-slate-700">{hz} Hz</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-900">{ms.toFixed(3)} ms</td>
                  <td className="px-4 py-2 text-right font-mono tabular-nums text-slate-500">
                    {hz === 60 ? "\u2014" : (gap > 0 ? "\u2212" : "+") + Math.abs(gap).toFixed(2) + " ms"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-slate-500">
        Frame time = 1000 / FPS. Lower is better for input responsiveness &mdash; the jump from 60 to 144 Hz cuts ~9.7 ms off every frame.
      </p>
    </div>
  );
}
