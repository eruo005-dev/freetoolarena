"use client";

import { useMemo, useState } from "react";

type Category = "small" | "medium" | "large" | "mega";

const CATEGORY_LABEL: Record<Category, string> = {
  small: "Small regional",
  medium: "Medium hub",
  large: "Large hub",
  mega: "Mega-hub (DXB, LHR, ATL, CDG)",
};

const BASELINES: Record<Category, { min: number; safe: number }> = {
  small: { min: 45, safe: 60 },
  medium: { min: 45, safe: 60 },
  large: { min: 60, safe: 90 },
  mega: { min: 90, safe: 120 },
};

export function LayoverRiskChecker() {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [category, setCategory] = useState<Category>("large");
  const [international, setInternational] = useState(false);
  const [customs, setCustoms] = useState(false);
  const [terminalChange, setTerminalChange] = useState(false);

  const result = useMemo(() => {
    const total = (Number(hours) || 0) * 60 + (Number(minutes) || 0);
    if (!Number.isFinite(total) || total < 0) return null;

    const base = BASELINES[category];
    let min = base.min;
    let safe = base.safe;
    if (international) {
      min += 60;
      safe += 60;
    }
    if (customs) {
      min += 30;
      safe += 30;
    }
    if (terminalChange && category === "mega") {
      min += 30;
      safe += 30;
    }

    let tier: "tight" | "safe" | "generous" | "ridiculous";
    let risk: number;
    if (total < min) {
      tier = "tight";
      const deficit = (min - total) / min;
      risk = Math.min(85, Math.round(30 + deficit * 70));
    } else if (total < safe) {
      tier = "safe";
      risk = Math.max(5, Math.round(15 * (1 - (total - min) / (safe - min))));
    } else if (total < safe * 2.5) {
      tier = "generous";
      risk = 3;
    } else {
      tier = "ridiculous";
      risk = 1;
    }

    return { total, min, safe, tier, risk };
  }, [hours, minutes, category, international, customs, terminalChange]);

  const tierLabel: Record<string, string> = {
    tight: "Tight &mdash; high risk",
    safe: "Safe",
    generous: "Generous",
    ridiculous: "Ridiculously long",
  };

  const tips: Record<string, string[]> = {
    tight: [
      "Sit near the front of the plane for a faster exit.",
      "Check your next gate on the airline app the moment you land.",
      "Skip lounge / bathroom / shopping detours.",
      "Ask the gate agent if they can radio ahead for you.",
    ],
    safe: [
      "Expect a brisk walk &mdash; no long sit-downs.",
      "Use airport wayfinding signs rather than betting on memory.",
      "Still worth checking the gate on the app after landing.",
    ],
    generous: [
      "Plenty of buffer for delays.",
      "Grab a real meal or a lounge shower if you have access.",
      "Keep an eye on the board in case of last-minute gate changes.",
    ],
    ridiculous: [
      "Look into a day-room, transit tour, or city excursion.",
      "Many mega-hubs offer free connection tours at this length.",
      "Some airlines will rebook you onto an earlier flight for free &mdash; ask.",
    ],
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Hours</span>
          <input
            type="number"
            min={0}
            max={24}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Minutes</span>
          <input
            type="number"
            min={0}
            max={59}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">
          Airport category
        </span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        >
          {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABEL[c]}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-2 text-sm text-slate-700">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={international}
            onChange={(e) => setInternational(e.target.checked)}
          />
          <span>International connection (changing airlines / re-checking bags)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={customs}
            onChange={(e) => setCustoms(e.target.checked)}
          />
          <span>Requires customs / passport control (first entry to country)</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={terminalChange}
            onChange={(e) => setTerminalChange(e.target.checked)}
          />
          <span>Terminal change at a mega-hub</span>
        </label>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Your layover
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {Math.floor(result.total / 60)}h {result.total % 60}m
            </div>
            <div className="text-xs text-slate-600">
              Recommended minimum {result.min} min
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Risk of missing connection
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.risk}%
            </div>
            <div className="text-xs text-slate-600">
              Safe threshold {result.safe} min
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Tier
            </div>
            <div
              className="text-2xl font-semibold tabular-nums text-brand"
              dangerouslySetInnerHTML={{ __html: tierLabel[result.tier] }}
            />
          </div>
        </div>
      ) : null}

      {result ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
          <div className="mb-2 font-medium text-slate-900">Tips for this layover</div>
          <ul className="list-disc space-y-1 pl-5">
            {tips[result.tier].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <p className="text-xs text-slate-500">
        Guidance based on published minimum connect times at major hubs. Airlines
        won&rsquo;t book you on a single itinerary below their published minimum &mdash;
        but self-booked separate tickets have no protection.
      </p>
    </div>
  );
}
