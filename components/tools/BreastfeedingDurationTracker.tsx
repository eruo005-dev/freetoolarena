"use client";

import { useMemo, useState } from "react";

type Side = "left" | "right" | "both";
type AgeGroup = "0to3" | "4to6" | "6to12";

type Session = {
  id: number;
  start: string;
  end: string;
  side: Side;
  minutes: number;
};

const AGE_RANGES: Record<AgeGroup, { label: string; feeds: string; perFeed: string; totalLow: number; totalHigh: number }> = {
  "0to3": {
    label: "0&mdash;3 months",
    feeds: "8&mdash;12 feeds/day",
    perFeed: "15&mdash;45 min each",
    totalLow: 180,
    totalHigh: 360,
  },
  "4to6": {
    label: "4&mdash;6 months",
    feeds: "6&mdash;8 feeds/day",
    perFeed: "10&mdash;25 min each",
    totalLow: 100,
    totalHigh: 200,
  },
  "6to12": {
    label: "6&mdash;12 months (plus solids)",
    feeds: "4&mdash;6 feeds/day",
    perFeed: "10&mdash;20 min each",
    totalLow: 60,
    totalHigh: 120,
  },
};

function diffMinutes(startStr: string, endStr: string): number {
  if (!startStr || !endStr) return NaN;
  const [sh, sm] = startStr.split(":").map(Number);
  const [eh, em] = endStr.split(":").map(Number);
  if ([sh, sm, eh, em].some((n) => !Number.isFinite(n))) return NaN;
  let mins = eh * 60 + em - (sh * 60 + sm);
  if (mins < 0) mins += 24 * 60;
  return mins;
}

export function BreastfeedingDurationTracker() {
  const [start, setStart] = useState<string>("08:00");
  const [end, setEnd] = useState<string>("08:20");
  const [side, setSide] = useState<Side>("both");
  const [age, setAge] = useState<AgeGroup>("0to3");
  const [sessions, setSessions] = useState<Session[]>([]);

  const currentMinutes = useMemo(() => diffMinutes(start, end), [start, end]);

  const totals = useMemo(() => {
    const total = sessions.reduce((acc, s) => acc + s.minutes, 0);
    const avg = sessions.length ? total / sessions.length : 0;
    return { total, avg, count: sessions.length };
  }, [sessions]);

  const tier = useMemo(() => {
    if (sessions.length === 0) return null;
    const { totalLow, totalHigh } = AGE_RANGES[age];
    if (totals.total < totalLow * 0.7)
      return { label: "Below typical", color: "text-sky-600" };
    if (totals.total <= totalHigh)
      return { label: "Within typical range", color: "text-emerald-600" };
    if (totals.total <= totalHigh * 1.3)
      return { label: "Above typical", color: "text-amber-600" };
    return { label: "Well above typical", color: "text-orange-600" };
  }, [totals, age, sessions.length]);

  const addSession = () => {
    if (!Number.isFinite(currentMinutes) || currentMinutes <= 0) return;
    setSessions((prev) => [
      ...prev,
      {
        id: Date.now(),
        start,
        end,
        side,
        minutes: currentMinutes,
      },
    ]);
  };

  const removeSession = (id: number) =>
    setSessions((prev) => prev.filter((s) => s.id !== id));

  const resetAll = () => setSessions([]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Start time</span>
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">End time</span>
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Side</span>
          <select
            value={side}
            onChange={(e) => setSide(e.target.value as Side)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="both">Both</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Baby&rsquo;s age</span>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as AgeGroup)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {(Object.keys(AGE_RANGES) as AgeGroup[]).map((k) => (
              <option
                key={k}
                value={k}
                dangerouslySetInnerHTML={{ __html: AGE_RANGES[k].label }}
              />
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="text-sm text-slate-700">
          Current session:{" "}
          <strong>
            {Number.isFinite(currentMinutes) && currentMinutes > 0
              ? `${currentMinutes} min`
              : "enter valid times"}
          </strong>
        </div>
        <button
          type="button"
          onClick={addSession}
          className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Add to daily log
        </button>
        {sessions.length > 0 && (
          <button
            type="button"
            onClick={resetAll}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Reset day
          </button>
        )}
      </div>

      {sessions.length > 0 && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Sessions</div>
              <div className="text-2xl font-bold text-slate-800">{totals.count}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Daily total</div>
              <div className="text-2xl font-bold text-brand">{totals.total} min</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Avg per session</div>
              <div className="text-2xl font-bold text-slate-800">
                {totals.avg.toFixed(1)} min
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Vs typical</div>
              <div className={`text-lg font-bold ${tier?.color ?? "text-slate-800"}`}>
                {tier?.label ?? "&mdash;"}
              </div>
            </div>
          </div>
          <ul className="mt-4 divide-y divide-slate-200 text-sm">
            {sessions.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-2">
                <span>
                  {s.start} &rarr; {s.end} &bull; {s.side} &bull;{" "}
                  <strong>{s.minutes} min</strong>
                </span>
                <button
                  type="button"
                  onClick={() => removeSession(s.id)}
                  className="text-xs text-slate-500 hover:text-red-600"
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 p-4 text-sm text-slate-700">
        <h3 className="mb-2 font-semibold text-slate-800">
          Typical range for{" "}
          <span dangerouslySetInnerHTML={{ __html: AGE_RANGES[age].label }} />
        </h3>
        <ul className="list-disc space-y-1 pl-5">
          <li dangerouslySetInnerHTML={{ __html: AGE_RANGES[age].feeds }} />
          <li dangerouslySetInnerHTML={{ __html: AGE_RANGES[age].perFeed }} />
          <li>
            Daily total typically {AGE_RANGES[age].totalLow}&mdash;{AGE_RANGES[age].totalHigh}{" "}
            minutes.
          </li>
        </ul>
      </div>

      <div className="rounded-lg border-l-4 border-brand bg-brand/5 p-4 text-sm text-slate-700">
        Duration varies enormously &mdash; fast nursers may finish in 7 minutes, slow nursers take 40.
        Baby getting enough is measured by weight gain and wet/dirty diapers, not the clock.
      </div>
    </div>
  );
}
