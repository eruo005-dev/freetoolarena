"use client";

import { useMemo, useState } from "react";

const ZONES = [
  "UTC",
  "America/Los_Angeles",
  "America/Denver",
  "America/Chicago",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Europe/Istanbul",
  "Africa/Johannesburg",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

function fmt(date: Date, zone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function TimeZoneConverter() {
  const now = useMemo(() => new Date(), []);
  const [iso, setIso] = useState(
    new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
  );
  const [fromZone, setFromZone] = useState("America/New_York");
  const [toZones, setToZones] = useState<string[]>(["Europe/London", "Asia/Tokyo"]);

  const date = useMemo(() => {
    // Treat `iso` as local time in `fromZone`. Use tz offset via Intl.
    // Simpler approach: parse as local Date, then compute the offset diff.
    const localDate = new Date(iso);
    // Compute offset between fromZone and user's local zone in ms
    const nowUtc = new Date();
    const inFrom = new Date(nowUtc.toLocaleString("en-US", { timeZone: fromZone })).getTime();
    const inLocal = new Date(nowUtc.toLocaleString("en-US")).getTime();
    const diff = inLocal - inFrom;
    return new Date(localDate.getTime() + diff);
  }, [iso, fromZone]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Date &amp; time</span>
          <input type="datetime-local" value={iso} onChange={(e) => setIso(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">From zone</span>
          <select value={fromZone} onChange={(e) => setFromZone(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            {ZONES.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </label>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Convert to</p>
        <div className="flex flex-wrap gap-2">
          {ZONES.map((z) => {
            const on = toZones.includes(z);
            return (
              <button key={z} type="button"
                onClick={() => setToZones((prev) => prev.includes(z) ? prev.filter((x) => x !== z) : [...prev, z])}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${on ? "bg-brand-dark text-white" : "bg-slate-100 text-slate-700"}`}>
                {z}
              </button>
            );
          })}
        </div>
      </div>
      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200">
        {toZones.map((z) => (
          <li key={z} className="flex items-center justify-between px-3 py-2 text-sm">
            <span className="font-mono text-slate-600">{z}</span>
            <span className="font-semibold text-slate-900">{fmt(date, z)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
