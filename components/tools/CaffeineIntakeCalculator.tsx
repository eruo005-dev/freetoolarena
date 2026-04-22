"use client";

import { useMemo, useState } from "react";

interface Source {
  id: string;
  type: string;
  servings: string;
}

const PRESETS: { key: string; label: string; mg: number }[] = [
  { key: "brewed", label: "Brewed coffee (8 oz)", mg: 95 },
  { key: "espresso", label: "Espresso shot", mg: 63 },
  { key: "cold_brew", label: "Cold brew (8 oz)", mg: 155 },
  { key: "green_tea", label: "Green tea (8 oz)", mg: 28 },
  { key: "black_tea", label: "Black tea (8 oz)", mg: 47 },
  { key: "matcha", label: "Matcha (8 oz)", mg: 70 },
  { key: "cola", label: "Cola (12 oz)", mg: 34 },
  { key: "energy_drink", label: "Energy drink (8 oz)", mg: 80 },
  { key: "pre_workout", label: "Pre-workout scoop", mg: 200 },
  { key: "dark_choc", label: "Dark chocolate (1 oz)", mg: 12 },
];

const FDA_LIMIT = 400;
const HALF_LIFE = 5; // hours

function newId() {
  return Math.random().toString(36).slice(2, 9);
}

function nowHHMM() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function hhmmToHours(s: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s);
  if (!m) return null;
  const h = parseInt(m[1], 10);
  const mi = parseInt(m[2], 10);
  if (h > 23 || mi > 59) return null;
  return h + mi / 60;
}

export function CaffeineIntakeCalculator() {
  const [sources, setSources] = useState<Source[]>([
    { id: newId(), type: "brewed", servings: "2" },
    { id: newId(), type: "green_tea", servings: "1" },
  ]);
  const [currentTime, setCurrentTime] = useState(nowHHMM());
  const [bedtime, setBedtime] = useState("22:30");

  function update(id: string, patch: Partial<Source>) {
    setSources((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  function addRow() {
    setSources((list) => [...list, { id: newId(), type: "brewed", servings: "1" }]);
  }

  function removeRow(id: string) {
    setSources((list) => (list.length > 1 ? list.filter((s) => s.id !== id) : list));
  }

  const { totalMg, pctLimit, hoursUntilBed, mgAtBed } = useMemo(() => {
    const total = sources.reduce((sum, s) => {
      const preset = PRESETS.find((p) => p.key === s.type);
      const servings = Math.max(0, parseFloat(s.servings) || 0);
      return sum + (preset ? preset.mg * servings : 0);
    }, 0);

    const now = hhmmToHours(currentTime);
    const bed = hhmmToHours(bedtime);
    let hours = 0;
    if (now !== null && bed !== null) {
      hours = bed - now;
      if (hours < 0) hours += 24;
    }
    const atBed = total * Math.pow(0.5, hours / HALF_LIFE);
    return {
      totalMg: total,
      pctLimit: (total / FDA_LIMIT) * 100,
      hoursUntilBed: hours,
      mgAtBed: atBed,
    };
  }, [sources, currentTime, bedtime]);

  const limitBar = Math.min(100, pctLimit);
  const barColor = pctLimit < 75 ? "bg-brand" : pctLimit < 100 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        {sources.map((s) => (
          <div key={s.id} className="rounded-lg border border-slate-200 bg-white p-4 grid sm:grid-cols-[1fr,100px,auto] gap-3 items-end">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Source</span>
              <select
                value={s.type}
                onChange={(e) => update(s.id, { type: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              >
                {PRESETS.map((p) => (
                  <option key={p.key} value={p.key}>
                    {p.label} — {p.mg}mg
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Servings</span>
              <input
                type="number"
                inputMode="decimal"
                min={0}
                step={0.5}
                value={s.servings}
                onChange={(e) => update(s.id, { servings: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <button
              type="button"
              onClick={() => removeRow(s.id)}
              className="text-rose-600 hover:text-rose-700 text-sm pb-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
      >
        + Add source
      </button>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Current time</span>
          <input
            type="time"
            value={currentTime}
            onChange={(e) => setCurrentTime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Bedtime</span>
          <input
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total caffeine</p>
          <p className="text-3xl font-bold text-brand">{Math.round(totalMg)} mg</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">% of FDA daily limit (400 mg)</p>
          <p className="text-xl font-bold text-slate-900">{pctLimit.toFixed(0)}%</p>
        </div>
        <div className="sm:col-span-2">
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <div className={`h-full ${barColor} transition-all`} style={{ width: `${limitBar}%` }} />
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Hours until bed</p>
          <p className="text-xl font-bold text-slate-900">{hoursUntilBed.toFixed(1)} h</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Caffeine remaining at bedtime</p>
          <p className="text-xl font-bold text-slate-900">{Math.round(mgAtBed)} mg</p>
        </div>
        <p className="sm:col-span-2 text-xs text-slate-500">
          Using a 5-hour half-life. Above ~50mg at bedtime may disrupt sleep for many adults.
        </p>
      </div>
    </div>
  );
}
