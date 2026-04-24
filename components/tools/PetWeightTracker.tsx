"use client";

import { useMemo, useState } from "react";

type Entry = { date: Date; weight: number; raw: string };

const DEFAULT_LOG = `2024-11-01 22.5 lbs
2024-11-15 22.8 lbs
2024-12-01 23.1 lbs
2024-12-15 22.9 lbs
2025-01-02 22.4 lbs
2025-01-20 21.9 lbs`;

function parseLog(text: string): { entries: Entry[]; bad: string[] } {
  const entries: Entry[] = [];
  const bad: string[] = [];
  const re = /^\s*(\d{4}-\d{2}-\d{2})\s+(\d+(?:\.\d+)?)\s*(lbs?|kg)?\s*$/i;
  text.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const m = line.match(re);
    if (!m) {
      bad.push(line);
      return;
    }
    const date = new Date(m[1]);
    const w = parseFloat(m[2]);
    if (!Number.isFinite(w) || isNaN(date.getTime())) {
      bad.push(line);
      return;
    }
    const isKg = /kg/i.test(m[3] || "");
    const weightLbs = isKg ? w * 2.20462 : w;
    entries.push({ date, weight: weightLbs, raw: line.trim() });
  });
  entries.sort((a, b) => a.date.getTime() - b.date.getTime());
  return { entries, bad };
}

export function PetWeightTracker() {
  const [text, setText] = useState(DEFAULT_LOG);

  const { entries, bad } = useMemo(() => parseLog(text), [text]);

  const stats = useMemo(() => {
    if (entries.length < 1) return null;
    const start = entries[0];
    const current = entries[entries.length - 1];
    const delta = current.weight - start.weight;
    const pct = start.weight > 0 ? (delta / start.weight) * 100 : 0;
    const days =
      (current.date.getTime() - start.date.getTime()) / (1000 * 60 * 60 * 24);
    let trend: "losing" | "stable" | "gaining" = "stable";
    if (pct <= -1) trend = "losing";
    else if (pct >= 1) trend = "gaining";

    const weeks = days / 7;
    const weeklyPct = weeks > 0 ? pct / weeks : 0;

    return {
      start: start.weight,
      current: current.weight,
      delta,
      pct,
      trend,
      days: Math.round(days),
      count: entries.length,
      weeklyPct,
    };
  }, [entries]);

  const chart = useMemo(() => {
    if (entries.length === 0) return null;
    const min = Math.min(...entries.map((e) => e.weight));
    const max = Math.max(...entries.map((e) => e.weight));
    const range = max - min || 1;
    return entries.map((e) => ({
      raw: e.raw,
      h: 10 + ((e.weight - min) / range) * 90,
      weight: e.weight,
      date: e.date,
    }));
  }, [entries]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Weight log (one per line)</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
          placeholder="2024-01-15 22.5 lbs"
        />
        <span className="mt-1 block text-xs text-gray-500">
          Format: <code>YYYY-MM-DD weight [lbs|kg]</code>. Example:{" "}
          <code>2024-01-15 22.5 lbs</code>
        </span>
      </label>

      {bad.length > 0 ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Could not parse {bad.length} line{bad.length === 1 ? "" : "s"}:
          <ul className="mt-1 list-disc pl-5 font-mono text-xs">
            {bad.slice(0, 5).map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {stats && chart ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Starting" value={`${stats.start.toFixed(1)} lbs`} />
            <Stat label="Current" value={`${stats.current.toFixed(1)} lbs`} />
            <Stat
              label="Change"
              value={`${stats.delta >= 0 ? "+" : ""}${stats.delta.toFixed(1)} lbs (${stats.pct >= 0 ? "+" : ""}${stats.pct.toFixed(1)}%)`}
            />
            <Stat label="Days tracked" value={`${stats.days}`} />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Trend</span>
              <span
                className={`text-sm font-semibold ${
                  stats.trend === "gaining"
                    ? "text-amber-700"
                    : stats.trend === "losing"
                    ? "text-brand"
                    : "text-gray-700"
                }`}
              >
                {stats.trend.toUpperCase()}
              </span>
            </div>
            <div className="flex items-end gap-1 h-32">
              {chart.map((c, i) => (
                <div
                  key={i}
                  className="flex-1 bg-brand/70 rounded-t"
                  style={{ height: `${c.h}%` }}
                  title={`${c.date.toISOString().slice(0, 10)}: ${c.weight.toFixed(1)} lbs`}
                />
              ))}
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500">
              <span>{chart[0].date.toISOString().slice(0, 10)}</span>
              <span>{chart[chart.length - 1].date.toISOString().slice(0, 10)}</span>
            </div>
          </div>

          <div className="rounded-md border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700">
            <p>
              Healthy-change rate: dogs and cats should gain or lose slowly &mdash; about{" "}
              <strong>1% of body weight per week max</strong>. Your current pace is roughly{" "}
              <strong>{stats.weeklyPct >= 0 ? "+" : ""}{stats.weeklyPct.toFixed(2)}% / week</strong>.
              {Math.abs(stats.weeklyPct) > 1 ? (
                <> That&rsquo;s faster than recommended &mdash; check with your vet.</>
              ) : (
                <> That&rsquo;s within the healthy range.</>
              )}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  );
}
