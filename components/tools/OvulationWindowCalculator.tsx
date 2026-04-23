"use client";
import { useMemo, useState } from "react";

export function OvulationWindowCalculator() {
  const today = new Date().toISOString().slice(0, 10);
  const [lastPeriod, setLastPeriod] = useState(today);
  const [cycle, setCycle] = useState("28");

  const cycleLen = useMemo(() => {
    const x = Number(cycle);
    if (!Number.isFinite(x)) return 28;
    return Math.max(20, Math.min(45, Math.round(x)));
  }, [cycle]);

  const result = useMemo(() => {
    const start = new Date(lastPeriod + "T00:00:00");
    if (Number.isNaN(start.getTime())) return null;
    const ovulation = new Date(start);
    ovulation.setDate(start.getDate() + cycleLen - 14);
    const fertileStart = new Date(ovulation);
    fertileStart.setDate(ovulation.getDate() - 5);
    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(ovulation.getDate() + 1);
    const nextPeriod = new Date(start);
    nextPeriod.setDate(start.getDate() + cycleLen);
    const fmt = (d: Date) => d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
    return {
      ovulation: fmt(ovulation),
      fertile: `${fmt(fertileStart)} &ndash; ${fmt(fertileEnd)}`,
      nextPeriod: fmt(nextPeriod),
    };
  }, [lastPeriod, cycleLen]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">First day of last period</span>
        <input type="date" value={lastPeriod} onChange={(e) => setLastPeriod(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Cycle length (days)</span>
        <input type="number" min={20} max={45} value={cycle} onChange={(e) => setCycle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
      </label>

      {result ? (
        <div className="space-y-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Estimated ovulation day</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{result.ovulation}</div>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Fertile window</div>
            <div className="text-sm font-mono mt-1" dangerouslySetInnerHTML={{ __html: result.fertile }} />
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Next period estimate</div>
            <div className="text-sm font-mono mt-1">{result.nextPeriod}</div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">Enter a valid date.</div>
      )}

      <p className="text-xs text-slate-500">Not medical advice &mdash; consult a provider for family planning decisions.</p>
    </div>
  );
}
