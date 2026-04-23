"use client";
import { useMemo, useState } from "react";

export function FurnitureFitCalculator() {
  const [roomL, setRoomL] = useState("144");
  const [roomW, setRoomW] = useState("120");
  const [furnL, setFurnL] = useState("84");
  const [furnW, setFurnW] = useState("36");
  const [walk, setWalk] = useState("36");

  const toNum = (s: string, min = 0) => {
    const x = Number(s);
    return Number.isFinite(x) && x >= min ? x : min;
  };

  const RL = useMemo(() => toNum(roomL), [roomL]);
  const RW = useMemo(() => toNum(roomW), [roomW]);
  const FL = useMemo(() => toNum(furnL), [furnL]);
  const FW = useMemo(() => toNum(furnW), [furnW]);
  const W = useMemo(() => toNum(walk), [walk]);

  const out = useMemo(() => {
    const fitsNormal = FL + W <= RL && FW + W <= RW;
    const fitsRotated = FW + W <= RL && FL + W <= RW;
    const fits = fitsNormal || fitsRotated;
    const remainingL = RL - FL;
    const remainingW = RW - FW;
    const diag = Math.sqrt(FL * FL + FW * FW);
    const diagFits = diag <= Math.min(RL, RW);
    return {
      fits,
      fitsNormal,
      fitsRotated,
      remainingL,
      remainingW,
      diag,
      diagFits,
    };
  }, [RL, RW, FL, FW, W]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Room length (in)</span>
          <input type="number" value={roomL} onChange={(e) => setRoomL(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Room width (in)</span>
          <input type="number" value={roomW} onChange={(e) => setRoomW(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Furniture length (in)</span>
          <input type="number" value={furnL} onChange={(e) => setFurnL(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Furniture width (in)</span>
          <input type="number" value={furnW} onChange={(e) => setFurnW(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block col-span-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Walkway clearance (in, 36 typical)</span>
          <input type="number" value={walk} onChange={(e) => setWalk(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
      </div>

      <div className={`rounded-xl p-4 ${out.fits ? "bg-emerald-50 border border-emerald-200" : "bg-rose-50 border border-rose-200"}`}>
        <div className="text-[10px] uppercase tracking-wide font-semibold text-slate-500">Verdict</div>
        <div className={`text-2xl font-semibold ${out.fits ? "text-emerald-700" : "text-rose-700"}`}>
          {out.fits ? "Fits" : "Doesn&rsquo;t fit"}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-1">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-1">Inputs used</div>
        <div>As placed: {out.fitsNormal ? "fits" : "too tight"} &mdash; length slack {out.remainingL} in, width slack {out.remainingW} in</div>
        <div>Rotated 90&deg;: {out.fitsRotated ? "fits" : "too tight"}</div>
        <div>Diagonal for move-in: {out.diag.toFixed(1)} in ({out.diagFits ? "clears room min dimension" : "wider than room &mdash; check doorway"})</div>
        <div>Walkway required: {W} in on each relevant side</div>
      </div>
    </div>
  );
}
