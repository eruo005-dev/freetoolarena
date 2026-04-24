"use client";

import { useMemo, useState } from "react";

type FrostData = { lastSpring: string; firstFall: string; lastMonth: number; lastDay: number; firstMonth: number; firstDay: number };

const ZONE_DATA: Record<string, FrostData> = {
  "3a": { lastSpring: "May 15", firstFall: "Sep 15", lastMonth: 4, lastDay: 15, firstMonth: 8, firstDay: 15 },
  "3b": { lastSpring: "May 15", firstFall: "Sep 15", lastMonth: 4, lastDay: 15, firstMonth: 8, firstDay: 15 },
  "4a": { lastSpring: "May 5", firstFall: "Sep 25", lastMonth: 4, lastDay: 5, firstMonth: 8, firstDay: 25 },
  "4b": { lastSpring: "May 5", firstFall: "Sep 25", lastMonth: 4, lastDay: 5, firstMonth: 8, firstDay: 25 },
  "5a": { lastSpring: "Apr 25", firstFall: "Oct 5", lastMonth: 3, lastDay: 25, firstMonth: 9, firstDay: 5 },
  "5b": { lastSpring: "Apr 25", firstFall: "Oct 5", lastMonth: 3, lastDay: 25, firstMonth: 9, firstDay: 5 },
  "6a": { lastSpring: "Apr 15", firstFall: "Oct 15", lastMonth: 3, lastDay: 15, firstMonth: 9, firstDay: 15 },
  "6b": { lastSpring: "Apr 15", firstFall: "Oct 15", lastMonth: 3, lastDay: 15, firstMonth: 9, firstDay: 15 },
  "7a": { lastSpring: "Apr 5", firstFall: "Oct 25", lastMonth: 3, lastDay: 5, firstMonth: 9, firstDay: 25 },
  "7b": { lastSpring: "Apr 5", firstFall: "Oct 25", lastMonth: 3, lastDay: 5, firstMonth: 9, firstDay: 25 },
  "8a": { lastSpring: "Mar 25", firstFall: "Nov 5", lastMonth: 2, lastDay: 25, firstMonth: 10, firstDay: 5 },
  "8b": { lastSpring: "Mar 25", firstFall: "Nov 5", lastMonth: 2, lastDay: 25, firstMonth: 10, firstDay: 5 },
  "9a": { lastSpring: "Mar 15", firstFall: "Nov 15", lastMonth: 2, lastDay: 15, firstMonth: 10, firstDay: 15 },
  "9b": { lastSpring: "Mar 15", firstFall: "Nov 15", lastMonth: 2, lastDay: 15, firstMonth: 10, firstDay: 15 },
  "10a": { lastSpring: "Mar 1", firstFall: "Nov 30", lastMonth: 2, lastDay: 1, firstMonth: 10, firstDay: 30 },
  "10b": { lastSpring: "Mar 1", firstFall: "Nov 30", lastMonth: 2, lastDay: 1, firstMonth: 10, firstDay: 30 },
};

const ZONE_OPTIONS = ["3a", "3b", "4a", "4b", "5a", "5b", "6a", "6b", "7a", "7b", "8a", "8b", "9a", "9b", "10a", "10b"];

function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.round(ms / 86400000);
}

export function FrostDateLookup() {
  const [zone, setZone] = useState("6a");

  const result = useMemo(() => {
    const data = ZONE_DATA[zone];
    if (!data) return null;
    const year = new Date().getFullYear();
    const lastFrost = new Date(year, data.lastMonth, data.lastDay);
    const firstFrost = new Date(year, data.firstMonth, data.firstDay);
    const season = daysBetween(lastFrost, firstFrost);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let daysToLast = daysBetween(today, lastFrost);
    if (daysToLast < -30) {
      // Last frost already passed; show next year&rsquo;s
      const nextYear = new Date(year + 1, data.lastMonth, data.lastDay);
      daysToLast = daysBetween(today, nextYear);
    }
    const safeStart = new Date(lastFrost.getTime() + 14 * 86400000);
    const safeEnd = new Date(firstFrost.getTime() - 14 * 86400000);
    const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return {
      lastSpring: data.lastSpring,
      firstFall: data.firstFall,
      season: Number.isFinite(season) ? season : 0,
      safeStart: fmt(safeStart),
      safeEnd: fmt(safeEnd),
      daysToLast,
    };
  }, [zone]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">USDA hardiness zone</label>
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        >
          {ZONE_OPTIONS.map((z) => (
            <option key={z} value={z}>
              Zone {z}
            </option>
          ))}
        </select>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Last spring frost</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.lastSpring}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">First fall frost</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.firstFall}</div>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Growing-season length</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{result.season} days</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Safe planting window (tender crops)</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.safeStart} &mdash; {result.safeEnd}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Days until last frost</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.daysToLast >= 0 ? `${result.daysToLast} days` : `${Math.abs(result.daysToLast)} days ago`}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Typical averages for the zone &mdash; your local microclimate can shift dates by 1&ndash;2 weeks. Always
            check a 10-day forecast before transplanting tender crops.
          </p>
        </div>
      )}
    </div>
  );
}
