"use client";

import { useMemo, useState } from "react";

type Energy = "low" | "medium" | "high";
type Walk = { date: Date; label: string; miles: number; minutes: number; raw: string };

const DEFAULT_LOG = `2025-01-13 morning 1.2 miles 25 min
2025-01-13 evening 0.8 miles 18 min
2025-01-14 morning 1.5 miles 30 min
2025-01-15 morning 1.3 miles 27 min
2025-01-15 evening 1.1 miles 22 min
2025-01-16 morning 1.6 miles 32 min
2025-01-17 morning 1.0 miles 20 min
2025-01-18 morning 2.0 miles 40 min
2025-01-19 morning 1.4 miles 28 min`;

const TARGETS: Record<Energy, { minPerDay: number; maxPerDay: number; label: string }> = {
  low: { minPerDay: 15, maxPerDay: 30, label: "Low-energy (bulldog, basset): 15&ndash;30 min/day" },
  medium: { minPerDay: 30, maxPerDay: 60, label: "Medium-energy (lab, retriever): 30&ndash;60 min/day" },
  high: { minPerDay: 60, maxPerDay: 120, label: "High-energy (border collie, husky): 60&ndash;120 min/day" },
};

function parseWalks(text: string): { walks: Walk[]; bad: string[] } {
  const walks: Walk[] = [];
  const bad: string[] = [];
  const re =
    /^\s*(\d{4}-\d{2}-\d{2})\s+([a-zA-Z_]+)?\s*(\d+(?:\.\d+)?)\s*(?:mi|miles?)\s+(\d+(?:\.\d+)?)\s*(?:min|minutes?)\s*$/i;
  text.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    const m = line.match(re);
    if (!m) {
      bad.push(line);
      return;
    }
    const date = new Date(m[1]);
    const miles = parseFloat(m[3]);
    const minutes = parseFloat(m[4]);
    if (!Number.isFinite(miles) || !Number.isFinite(minutes) || isNaN(date.getTime())) {
      bad.push(line);
      return;
    }
    walks.push({
      date,
      label: (m[2] || "walk").trim(),
      miles,
      minutes,
      raw: line.trim(),
    });
  });
  walks.sort((a, b) => a.date.getTime() - b.date.getTime());
  return { walks, bad };
}

export function DogWalkDistanceTracker() {
  const [text, setText] = useState(DEFAULT_LOG);
  const [energy, setEnergy] = useState<Energy>("medium");
  const [weight, setWeight] = useState(30);

  const { walks, bad } = useMemo(() => parseWalks(text), [text]);

  const summary = useMemo(() => {
    if (walks.length === 0) return null;
    const totalMiles = walks.reduce((s, w) => s + w.miles, 0);
    const totalMin = walks.reduce((s, w) => s + w.minutes, 0);
    const byDay = new Map<string, { miles: number; minutes: number }>();
    for (const w of walks) {
      const key = w.date.toISOString().slice(0, 10);
      const prev = byDay.get(key) || { miles: 0, minutes: 0 };
      byDay.set(key, {
        miles: prev.miles + w.miles,
        minutes: prev.minutes + w.minutes,
      });
    }
    const target = TARGETS[energy];
    let daysHit = 0;
    for (const d of Array.from(byDay.values())) {
      if (d.minutes >= target.minPerDay) daysHit += 1;
    }
    const pace = totalMiles > 0 ? totalMin / totalMiles : 0;
    const calPerMile = Number.isFinite(weight) && weight > 0 ? weight * 1 : 0;
    const cal = totalMiles * calPerMile;

    return {
      totalMiles,
      totalMin,
      byDay,
      pace,
      cal,
      daysHit,
      totalDays: byDay.size,
      target,
      attainmentPct: byDay.size > 0 ? (daysHit / byDay.size) * 100 : 0,
    };
  }, [walks, energy, weight]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Breed energy level</span>
          <select
            value={energy}
            onChange={(e) => setEnergy(e.target.value as Energy)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="low">Low-energy (bulldog, basset)</option>
            <option value="medium">Medium-energy (lab, retriever)</option>
            <option value="high">High-energy (border collie, husky)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Dog weight (lbs)</span>
          <input
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
          <span className="mt-1 block text-xs text-gray-500">Used for calorie estimate (~1 cal/lb per mile).</span>
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Walk log</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
        />
        <span className="mt-1 block text-xs text-gray-500">
          Format: <code>YYYY-MM-DD label 1.2 miles 25 min</code>
        </span>
      </label>

      {bad.length > 0 ? (
        <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          Could not parse {bad.length} line{bad.length === 1 ? "" : "s"}.
        </div>
      ) : null}

      {summary ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Total distance" value={`${summary.totalMiles.toFixed(2)} mi`} />
            <Stat label="Total time" value={`${summary.totalMin.toFixed(0)} min`} />
            <Stat
              label="Avg pace"
              value={summary.pace > 0 ? `${summary.pace.toFixed(1)} min/mi` : "&mdash;"}
            />
            <Stat
              label="Calories burned"
              value={`~${summary.cal.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            />
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-gray-700">Target attainment</span>
              <span className="text-2xl font-semibold text-brand">
                {summary.attainmentPct.toFixed(0)}%
              </span>
            </div>
            <div
              className="text-xs text-gray-500"
              dangerouslySetInnerHTML={{ __html: summary.target.label }}
            />
            <div className="text-sm text-gray-700">
              {summary.daysHit} of {summary.totalDays} logged days hit the minimum target.
            </div>
            <div className="mt-2 h-3 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-brand"
                style={{ width: `${Math.min(100, summary.attainmentPct)}%` }}
              />
            </div>
          </div>

          <div className="rounded-md border border-gray-200 bg-white p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Daily breakdown</h3>
            <div className="space-y-1">
              {Array.from(summary.byDay.entries()).map(([day, d]) => {
                const hit = d.minutes >= summary.target.minPerDay;
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="font-mono text-xs text-gray-600">{day}</span>
                    <span className="text-gray-700">
                      {d.miles.toFixed(2)} mi &middot; {d.minutes.toFixed(0)} min
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        hit ? "text-brand" : "text-amber-700"
                      }`}
                    >
                      {hit ? "hit" : "short"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div
        className="text-lg font-semibold text-gray-900"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
