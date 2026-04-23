"use client";
import { useMemo, useState } from "react";

export function KanbanWipCalculator() {
  const [teamSize, setTeamSize] = useState(5);
  const [cycleDays, setCycleDays] = useState(4);
  const [focusPct, setFocusPct] = useState(70);

  const result = useMemo(() => compute(teamSize, cycleDays, focusPct), [teamSize, cycleDays, focusPct]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Team size</span>
          <input type="number" min={1} value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Avg cycle time (days)</span>
          <input type="number" min={0.5} step={0.5} value={cycleDays} onChange={(e) => setCycleDays(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Focus factor %</span>
          <input type="number" min={10} max={100} value={focusPct} onChange={(e) => setFocusPct(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Suggested total WIP" value={String(result.totalWip)} />
        <Stat label="Per-column WIP" value={String(result.perColumn)} hint="across 3 active columns" />
        <Stat label="Throughput" value={`${result.throughput.toFixed(1)}/day`} />
        <Stat label="Weekly throughput" value={`${(result.throughput * 5).toFixed(1)}`} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">How this is calculated</div>
        <div className="text-sm mt-1">
          Little&rsquo;s Law: WIP = Throughput &times; Cycle Time. With {teamSize} people at {focusPct}% focus, we estimate ~{result.throughput.toFixed(1)} items finished per day. Multiplied by your {cycleDays}-day cycle, that gives a total in-flight cap of {result.totalWip}, or roughly {result.perColumn} per active column (To Do, In Progress, Review).
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Rule of thumb: WIP &le; team size &times; 1.5 prevents multitasking overload.
      </div>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
      {hint && <div className="text-[11px] text-slate-500 mt-0.5">{hint}</div>}
    </div>
  );
}

function compute(team: number, cycle: number, focus: number) {
  const t = Math.max(1, team);
  const c = Math.max(0.5, cycle);
  const f = Math.max(10, Math.min(100, focus)) / 100;
  const throughput = (t * f) / c;
  const totalWip = Math.max(1, Math.round(throughput * c));
  const perColumn = Math.max(1, Math.ceil(totalWip / 3));
  return { throughput, totalWip, perColumn };
}
