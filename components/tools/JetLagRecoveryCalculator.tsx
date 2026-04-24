"use client";

import { useMemo, useState } from "react";

const OFFSETS = Array.from({ length: 27 }, (_, i) => i - 12);

function formatOffset(n: number) {
  if (n === 0) return "UTC";
  const sign = n > 0 ? "+" : "-";
  return `UTC${sign}${Math.abs(n)}`;
}

export function JetLagRecoveryCalculator() {
  const [origin, setOrigin] = useState(-5);
  const [destination, setDestination] = useState(9);
  const [direction, setDirection] = useState<"there" | "home">("there");

  const result = useMemo(() => {
    if (!Number.isFinite(origin) || !Number.isFinite(destination)) return null;

    const rawShift = destination - origin;
    let shift = rawShift;
    if (shift > 12) shift -= 24;
    if (shift < -12) shift += 24;

    const hoursShift = Math.abs(shift);
    const travelingEast =
      direction === "there" ? shift > 0 : shift < 0;

    const divisor = travelingEast ? 1.5 : 1;
    const recoveryDays = hoursShift === 0 ? 0 : Math.max(1, Math.round(hoursShift / divisor));

    let tier: "none" | "mild" | "moderate" | "severe" = "none";
    if (recoveryDays === 0) tier = "none";
    else if (recoveryDays <= 3) tier = "mild";
    else if (recoveryDays <= 7) tier = "moderate";
    else tier = "severe";

    return { hoursShift, recoveryDays, tier, travelingEast };
  }, [origin, destination, direction]);

  const tierLabel: Record<string, string> = {
    none: "No jet lag expected",
    mild: "Mild (1&ndash;3 days)",
    moderate: "Moderate (4&ndash;7 days)",
    severe: "Severe (8+ days)",
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Origin timezone
          </span>
          <select
            value={origin}
            onChange={(e) => setOrigin(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {OFFSETS.map((o) => (
              <option key={o} value={o}>
                {formatOffset(o)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Destination timezone
          </span>
          <select
            value={destination}
            onChange={(e) => setDestination(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {OFFSETS.map((o) => (
              <option key={o} value={o}>
                {formatOffset(o)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Direction
          </span>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as "there" | "home")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="there">Traveling there</option>
            <option value="home">Returning home</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Time shift
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.hoursShift}h
            </div>
            <div className="text-xs text-slate-600">
              Heading {result.travelingEast ? "eastward" : "westward"}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Recovery
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.recoveryDays} days
            </div>
            <div className="text-xs text-slate-600">
              {result.travelingEast ? "Eastward is harder" : "Westward is easier"}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Severity tier
            </div>
            <div
              className="text-2xl font-semibold tabular-nums text-brand"
              dangerouslySetInnerHTML={{ __html: tierLabel[result.tier] }}
            />
          </div>
        </div>
      ) : null}

      <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <div className="mb-2 font-medium text-slate-900">Recovery tips</div>
        <ul className="list-disc space-y-1 pl-5">
          <li>Shift your sleep schedule 15&ndash;30 min per day for 3 days before departure.</li>
          <li>Get bright morning light at your destination to anchor the new rhythm.</li>
          <li>Avoid alcohol and caffeine on travel day &mdash; both wreck sleep quality.</li>
          <li>Consider melatonin 1&ndash;3 mg about 30 minutes before local bedtime.</li>
        </ul>
      </div>

      <p className="text-xs text-slate-500">
        Rule of thumb: recovery takes about 1 day per time zone westbound and 1
        day per 1.5 time zones eastbound, because the human circadian clock
        runs slightly longer than 24 hours.
      </p>
    </div>
  );
}
