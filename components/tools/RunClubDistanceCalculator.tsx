"use client";

import { useMemo, useState } from "react";

type Pace = "social" | "recovery" | "moderate" | "tempo";
type Level = "beginner" | "intermediate" | "advanced";

const PACE_MIN_PER_MILE: Record<Pace, [number, number]> = {
  social: [10.5, 11.5],
  recovery: [9.5, 10.5],
  moderate: [8.5, 9.5],
  tempo: [7.0, 8.5],
};

export function RunClubDistanceCalculator() {
  const [level, setLevel] = useState<Level>("intermediate");
  const [pace, setPace] = useState<Pace>("social");
  const [duration, setDuration] = useState<number>(45);

  const result = useMemo(() => {
    const [low, high] = PACE_MIN_PER_MILE[pace];
    const adj = level === "beginner" ? 1.5 : level === "advanced" ? -1 : 0;
    const minPerMile = (low + high) / 2 + adj;
    const miles = duration / minPerMile;
    const km = miles * 1.609;
    const energyKcal = miles * 100;
    const recoveryHours = level === "beginner" ? 18 : level === "intermediate" ? 12 : 8;
    return {
      minPerMile,
      miles: Math.round(miles * 10) / 10,
      km: Math.round(km * 10) / 10,
      kcal: Math.round(energyKcal),
      recoveryHours,
    };
  }, [level, pace, duration]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Run-club level</span>
          <select value={level} onChange={(e) => setLevel(e.target.value as Level)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="beginner">Beginner (run/walk)</option>
            <option value="intermediate">Intermediate (steady runner)</option>
            <option value="advanced">Advanced (sub-9-min mile)</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Pace</span>
          <select value={pace} onChange={(e) => setPace(e.target.value as Pace)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="social">Social / chat pace</option>
            <option value="recovery">Recovery / easy</option>
            <option value="moderate">Moderate</option>
            <option value="tempo">Tempo / harder</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Duration (min)</span>
          <input type="number" min={5} max={300} value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Distance</div>
          <div className="text-2xl font-bold text-slate-800">{result.miles} mi</div>
          <div className="mt-1 text-xs text-slate-500">{result.km} km</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Average pace</div>
          <div className="text-2xl font-bold text-slate-800">{Math.floor(result.minPerMile)}:{String(Math.round((result.minPerMile % 1) * 60)).padStart(2, "0")}</div>
          <div className="mt-1 text-xs text-slate-500">min/mile</div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">Energy burned</div>
          <div className="text-2xl font-bold text-slate-800">~{result.kcal} kcal</div>
          <div className="mt-1 text-xs text-slate-500">Approximate</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <h4 className="mb-2 font-semibold">Run-club etiquette tips</h4>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong>Pace honesty:</strong> if you can&rsquo;t hold a full conversation, you&rsquo;re not on social pace.</li>
          <li><strong>Pack manners:</strong> stay in formation up to 4 wide; collapse to 2 on narrow paths or with traffic.</li>
          <li><strong>Headphones:</strong> one ear in is fine; two earbuds reads as antisocial.</li>
          <li><strong>Slowest sets the pace:</strong> on the &ldquo;all-paces welcome&rdquo; rule. Don&rsquo;t drop the back of the pack.</li>
          <li><strong>Recovery time:</strong> ~{result.recoveryHours}h for {level} runner at this distance. Eat protein + hydrate within 30 min of stopping.</li>
        </ul>
      </div>
    </div>
  );
}
