"use client";

import { useMemo, useState } from "react";

const TRIGGERS = [
  { key: "hunger", label: "Hunger" },
  { key: "tired", label: "Tired / overtired" },
  { key: "transition", label: "Transition (leaving somewhere)" },
  { key: "sensory", label: "Sensory overload" },
  { key: "no", label: "The word &ldquo;no&rdquo;" },
  { key: "frustrated", label: "Frustration with a task" },
];

const DEESCALATION = [
  "Name the feeling: &ldquo;You&rsquo;re angry because we had to leave.&rdquo;",
  "Offer two acceptable choices instead of one demand.",
  "Reduce stimuli: dim lights, move somewhere quiet.",
  "Slow breathing together &mdash; blow out imaginary candles.",
  "Get low, stay calm, keep words short.",
  "Hold space &mdash; stay near without fixing, until the wave passes.",
];

function typicalPerDay(months: number): { low: number; high: number; peak: boolean } {
  if (months < 12) return { low: 0, high: 1, peak: false };
  if (months < 18) return { low: 1, high: 2, peak: false };
  if (months < 24) return { low: 2, high: 4, peak: false };
  if (months < 36) return { low: 2, high: 5, peak: true };
  if (months < 42) return { low: 1, high: 3, peak: false };
  return { low: 0, high: 2, peak: false };
}

export function ToddlerTantrumCalculator() {
  const [months, setMonths] = useState<string>("30");
  const [actualPerDay, setActualPerDay] = useState<string>("3");
  const [triggers, setTriggers] = useState<Record<string, boolean>>({
    tired: true,
    hunger: true,
  });

  const result = useMemo(() => {
    const m = Number(months);
    const a = Number(actualPerDay);
    if (!Number.isFinite(m) || !Number.isFinite(a)) return null;
    if (m < 12 || m > 48 || a < 0) return null;
    const t = typicalPerDay(m);
    const midpoint = (t.low + t.high) / 2;
    let tier = "Typical";
    let color = "text-emerald-600";
    if (a > t.high * 1.5) {
      tier = "Above typical";
      color = "text-orange-600";
    } else if (a < t.low * 0.5 && t.high > 1) {
      tier = "Below typical";
      color = "text-sky-600";
    }
    return {
      low: t.low,
      high: t.high,
      peak: t.peak,
      midpoint,
      perWeekLow: t.low * 7,
      perWeekHigh: t.high * 7,
      tier,
      color,
    };
  }, [months, actualPerDay]);

  const selectedTriggers = Object.entries(triggers)
    .filter(([, v]) => v)
    .map(([k]) => TRIGGERS.find((t) => t.key === k)?.label)
    .filter(Boolean) as string[];

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Toddler age (months, 12&mdash;48)
          </span>
          <input
            type="number"
            min={12}
            max={48}
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Your current tantrums/day</span>
          <input
            type="number"
            min={0}
            step="0.5"
            value={actualPerDay}
            onChange={(e) => setActualPerDay(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-2 font-semibold text-slate-800">Common triggers</h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {TRIGGERS.map((t) => (
            <label key={t.key} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!!triggers[t.key]}
                onChange={(e) => setTriggers({ ...triggers, [t.key]: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand/30"
              />
              <span dangerouslySetInnerHTML={{ __html: t.label }} />
            </label>
          ))}
        </div>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Typical per day</div>
              <div className="text-2xl font-bold text-brand">
                {result.low}&mdash;{result.high}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Typical per week</div>
              <div className="text-2xl font-bold text-slate-800">
                {result.perWeekLow}&mdash;{result.perWeekHigh}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">Your tier</div>
              <div className={`text-2xl font-bold ${result.color}`}>{result.tier}</div>
            </div>
          </div>
          {result.peak && (
            <p className="mt-3 text-sm text-amber-700">
              You&rsquo;re right in the peak window (2&mdash;3 years). This is when brains are
              sprinting and language is still catching up.
            </p>
          )}
        </div>
      )}

      <div className="rounded-lg border border-slate-200 p-4">
        <h3 className="mb-2 font-semibold text-slate-800">De-escalation toolkit</h3>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {DEESCALATION.map((tip, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: tip }} />
          ))}
        </ul>
        {selectedTriggers.length > 0 && (
          <p className="mt-3 text-sm text-slate-600">
            Top levers for your triggers: pre-empt hunger and sleep windows, narrate transitions
            5 minutes ahead, and pre-plan choices for the friction points.
          </p>
        )}
      </div>

      <div className="rounded-lg border-l-4 border-brand bg-brand/5 p-4 text-sm text-slate-700">
        Tantrums are a developmental milestone, not a behavior problem. Your toddler&rsquo;s brain is
        still building the wiring to regulate big feelings &mdash; your calm is the scaffolding.
      </div>
    </div>
  );
}
