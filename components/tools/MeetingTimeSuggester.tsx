"use client";
import { useMemo, useState } from "react";

const ZONES = [
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

export function MeetingTimeSuggester() {
  const [z1, setZ1] = useState("America/New_York");
  const [z2, setZ2] = useState("Europe/London");
  const [z3, setZ3] = useState("Asia/Tokyo");
  const [earliest, setEarliest] = useState(8);
  const [latest, setLatest] = useState(20);

  const rows = useMemo(() => buildGrid([z1, z2, z3], earliest, latest), [z1, z2, z3, earliest, latest]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <ZoneSelect label="Zone 1" value={z1} onChange={setZ1} />
        <ZoneSelect label="Zone 2" value={z2} onChange={setZ2} />
        <ZoneSelect label="Zone 3" value={z3} onChange={setZ3} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Earliest hour (base z1)</span>
          <input type="number" min={0} max={23} value={earliest} onChange={(e) => setEarliest(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Latest hour (base z1)</span>
          <input type="number" min={0} max={23} value={latest} onChange={(e) => setLatest(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 overflow-x-auto">
        <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold mb-2">Overlap grid (green = all in 9-17)</div>
        <table className="text-xs border-separate border-spacing-1">
          <thead>
            <tr>
              <th className="text-left px-2 py-1 font-semibold">{z1}</th>
              <th className="text-left px-2 py-1 font-semibold">{z2}</th>
              <th className="text-left px-2 py-1 font-semibold">{z3}</th>
              <th className="text-left px-2 py-1 font-semibold">Overlap</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={r.allWorking ? "bg-emerald-100" : r.anyWorking ? "bg-amber-50" : ""}>
                <td className="px-2 py-1 font-mono">{r.t1}</td>
                <td className="px-2 py-1 font-mono">{r.t2}</td>
                <td className="px-2 py-1 font-mono">{r.t3}</td>
                <td className="px-2 py-1">{r.allWorking ? "All working" : r.anyWorking ? "Partial" : "None"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ZoneSelect({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
        {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
      </select>
    </label>
  );
}

type Row = { t1: string; t2: string; t3: string; allWorking: boolean; anyWorking: boolean };

function buildGrid(zones: string[], earliest: number, latest: number): Row[] {
  const rows: Row[] = [];
  const base = new Date();
  base.setMinutes(0, 0, 0);
  const lo = Math.max(0, Math.min(23, earliest));
  const hi = Math.max(lo, Math.min(23, latest));
  for (let h = lo; h <= hi; h++) {
    const d = new Date(base);
    d.setHours(h);
    const formatted = zones.map((z) => formatInZone(d, z));
    const hours = zones.map((z) => hourInZone(d, z));
    const working = hours.map((x) => x >= 9 && x < 17);
    rows.push({
      t1: formatted[0],
      t2: formatted[1],
      t3: formatted[2],
      allWorking: working.every(Boolean),
      anyWorking: working.some(Boolean),
    });
  }
  return rows;
}

function hourInZone(d: Date, zone: string): number {
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric", hour12: false });
  const parts = fmt.formatToParts(d);
  const hour = parts.find((p) => p.type === "hour")?.value ?? "0";
  return parseInt(hour, 10) % 24;
}

function formatInZone(d: Date, zone: string): string {
  return new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
}
