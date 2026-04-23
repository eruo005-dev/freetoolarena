"use client";
import { useMemo, useState } from "react";

export function TimeBlockPlanner() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [blockSize, setBlockSize] = useState(50);
  const [breakAfter, setBreakAfter] = useState(2);

  const plan = useMemo(() => build(startTime, endTime, blockSize, breakAfter), [startTime, endTime, blockSize, breakAfter]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Start</span>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">End</span>
          <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Block (min)</span>
          <input type="number" min={10} max={180} value={blockSize} onChange={(e) => setBlockSize(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Break after N</span>
          <input type="number" min={1} max={10} value={breakAfter} onChange={(e) => setBreakAfter(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Stat label="Focus blocks" value={String(plan.focusCount)} />
        <Stat label="Break blocks" value={String(plan.breakCount)} />
        <Stat label="Total focus" value={`${plan.totalFocus} min`} />
      </div>

      <div className="rounded-xl bg-slate-50 p-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase tracking-wide">
              <th className="px-2 py-1 font-semibold">Time</th>
              <th className="px-2 py-1 font-semibold">Type</th>
              <th className="px-2 py-1 font-semibold">Task</th>
            </tr>
          </thead>
          <tbody>
            {plan.blocks.map((b, i) => (
              <tr key={i} className={b.type === "break" ? "bg-amber-50" : "bg-white"}>
                <td className="px-2 py-1 font-mono text-xs whitespace-nowrap">{b.start} &ndash; {b.end}</td>
                <td className="px-2 py-1 text-xs">{b.type === "focus" ? "Focus" : "Break"}</td>
                <td className="px-2 py-1 text-xs text-slate-400">{b.type === "focus" ? "_______________" : "&mdash;"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{label}</div>
      <div className="text-lg font-semibold text-slate-800">{value}</div>
    </div>
  );
}

type Block = { start: string; end: string; type: "focus" | "break" };

function build(startTime: string, endTime: string, blockSize: number, breakAfter: number) {
  const [sh, sm] = startTime.split(":").map(Number);
  const [eh, em] = endTime.split(":").map(Number);
  let cur = (sh || 0) * 60 + (sm || 0);
  const end = (eh || 0) * 60 + (em || 0);
  const size = Math.max(10, blockSize);
  const brk = 10;
  const n = Math.max(1, breakAfter);

  const blocks: Block[] = [];
  let focusCount = 0;
  let breakCount = 0;

  while (cur + size <= end) {
    const s = cur;
    const e = cur + size;
    blocks.push({ start: toHHMM(s), end: toHHMM(e), type: "focus" });
    focusCount++;
    cur = e;
    if (focusCount % n === 0 && cur + brk <= end) {
      blocks.push({ start: toHHMM(cur), end: toHHMM(cur + brk), type: "break" });
      breakCount++;
      cur += brk;
    }
  }

  return { blocks, focusCount, breakCount, totalFocus: focusCount * size };
}

function toHHMM(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
