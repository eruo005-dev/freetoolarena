"use client";

import { useMemo, useState } from "react";

const SCHENGEN_COUNTRIES = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Czechia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Italy",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
];

function parseDate(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + "T00:00:00Z");
  return Number.isFinite(d.getTime()) ? d : null;
}

function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function addDays(d: Date, n: number): Date {
  const r = new Date(d.getTime());
  r.setUTCDate(r.getUTCDate() + n);
  return r;
}

function fmt(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function Schengen90180Tracker() {
  const [priorStays, setPriorStays] = useState(
    "2026-01-05 to 2026-01-20\n2026-02-10 to 2026-02-25",
  );
  const [plannedStart, setPlannedStart] = useState("2026-05-10");
  const [plannedEnd, setPlannedEnd] = useState("2026-05-30");

  const result = useMemo(() => {
    const start = parseDate(plannedStart);
    const end = parseDate(plannedEnd);
    if (!start || !end || end < start) {
      return null;
    }

    const plannedDays = daysBetween(start, end) + 1;
    if (!Number.isFinite(plannedDays) || plannedDays <= 0) return null;

    const windowStart = addDays(start, -179);

    const prior: { from: Date; to: Date }[] = [];
    const lines = priorStays
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    for (const line of lines) {
      const m = line.match(
        /(\d{4}-\d{2}-\d{2})\s+to\s+(\d{4}-\d{2}-\d{2})/i,
      );
      if (!m) continue;
      const f = parseDate(m[1]);
      const t = parseDate(m[2]);
      if (!f || !t || t < f) continue;
      prior.push({ from: f, to: t });
    }

    let usedInWindow = 0;
    for (const p of prior) {
      const effFrom = p.from < windowStart ? windowStart : p.from;
      const effTo = p.to < start ? p.to : addDays(start, -1);
      if (effTo < effFrom) continue;
      usedInWindow += daysBetween(effFrom, effTo) + 1;
    }

    const remaining = Math.max(0, 90 - usedInWindow);
    const totalIfStay = usedInWindow + plannedDays;
    const pass = totalIfStay <= 90;
    const maxAllowed = remaining;
    const allowedExit =
      maxAllowed > 0 ? fmt(addDays(start, maxAllowed - 1)) : "—";

    return {
      plannedDays,
      usedInWindow,
      remaining,
      totalIfStay,
      pass,
      maxAllowed,
      allowedEntry: fmt(start),
      allowedExit,
      windowStart: fmt(windowStart),
      windowEnd: fmt(start),
    };
  }, [priorStays, plannedStart, plannedEnd]);

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Prior Schengen stays (one per line, format: YYYY-MM-DD to YYYY-MM-DD)
        </label>
        <textarea
          value={priorStays}
          onChange={(e) => setPriorStays(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Planned entry date
          </label>
          <input
            type="date"
            value={plannedStart}
            onChange={(e) => setPlannedStart(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Planned exit date
          </label>
          <input
            type="date"
            value={plannedEnd}
            onChange={(e) => setPlannedEnd(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Days used (last 180)
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.usedInWindow} / 90
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Remaining allowance
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.remaining} days
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Planned stay
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.plannedDays} days
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl p-4 ${
              result.pass
                ? "bg-emerald-50 text-emerald-900"
                : "bg-rose-50 text-rose-900"
            }`}
          >
            <div className="text-sm font-semibold">
              {result.pass
                ? "YES — Planned stay is within the 90/180 rule."
                : "NO — Planned stay would overstay the 90/180 rule."}
            </div>
            <div className="mt-1 text-sm">
              If you enter on {result.allowedEntry}, total Schengen days in the
              rolling 180-day window would be{" "}
              <span className="font-semibold tabular-nums">
                {result.totalIfStay}
              </span>
              .
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <div className="font-semibold text-slate-800">
              Max additional days allowed: {result.maxAllowed}
            </div>
            <div className="mt-1 text-slate-600">
              Allowed entry: {result.allowedEntry} &mdash; latest allowed exit:{" "}
              {result.allowedExit}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Rolling window checked: {result.windowStart} to {result.windowEnd}
            </div>
          </div>

          {!result.pass && (
            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
              <strong>Overstay risk.</strong> Shorten your stay by{" "}
              {result.totalIfStay - 90} day
              {result.totalIfStay - 90 === 1 ? "" : "s"} or delay your entry.
            </div>
          )}
        </>
      )}

      <div className="rounded-xl border border-slate-200 p-4 text-xs text-slate-600">
        <div className="mb-2 font-semibold text-slate-700">
          Schengen area countries (29):
        </div>
        <div>{SCHENGEN_COUNTRIES.join(", ")}.</div>
      </div>
    </div>
  );
}
