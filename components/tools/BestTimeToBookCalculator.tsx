"use client";

import { useMemo, useState } from "react";

type TripType =
  | "domestic"
  | "intl_short"
  | "intl_long"
  | "peak"
  | "holiday";

const WINDOWS: Record<
  TripType,
  { label: string; earliest: number; sweetStart: number; sweetEnd: number; tooLate: number; desc: string }
> = {
  domestic: {
    label: "Domestic",
    earliest: 120,
    sweetStart: 28,
    sweetEnd: 70,
    tooLate: 14,
    desc: "Cheapest 1&ndash;3 months out. Sweet spot: 28&ndash;70 days.",
  },
  intl_short: {
    label: "International short-haul",
    earliest: 180,
    sweetStart: 60,
    sweetEnd: 150,
    tooLate: 21,
    desc: "2&ndash;5 months out is typically the cheapest window.",
  },
  intl_long: {
    label: "International long-haul",
    earliest: 300,
    sweetStart: 90,
    sweetEnd: 240,
    tooLate: 30,
    desc: "3&ndash;8 months out. Long-haul prices firm up early.",
  },
  peak: {
    label: "Peak season (summer Europe, NYE)",
    earliest: 365,
    sweetStart: 120,
    sweetEnd: 300,
    tooLate: 60,
    desc: "Book 4&ndash;10 months ahead &mdash; earlier is better.",
  },
  holiday: {
    label: "Holiday domestic (Thanksgiving, Christmas)",
    earliest: 180,
    sweetStart: 60,
    sweetEnd: 120,
    tooLate: 21,
    desc: "2&ndash;4 months out. Prices spike sharply close in.",
  },
};

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function BestTimeToBookCalculator() {
  const [tripType, setTripType] = useState<TripType>("domestic");
  const [depDate, setDepDate] = useState("2026-08-15");

  const result = useMemo(() => {
    const d = new Date(depDate + "T00:00:00Z");
    if (!Number.isFinite(d.getTime())) return null;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const daysUntil = Math.round((d.getTime() - today.getTime()) / 86400000);
    if (!Number.isFinite(daysUntil)) return null;

    const w = WINDOWS[tripType];

    let tier: "Too early" | "Sweet spot" | "Last-minute" | "Sold out / panic";
    let tierClass: string;
    let advice: string;

    if (daysUntil > w.earliest) {
      tier = "Too early";
      tierClass = "bg-sky-50 text-sky-900";
      advice =
        "Prices may not be loaded yet or will drop. Set a fare alert and check back.";
    } else if (daysUntil >= w.sweetStart && daysUntil <= w.sweetEnd) {
      tier = "Sweet spot";
      tierClass = "bg-emerald-50 text-emerald-900";
      advice =
        "You&rsquo;re in the statistically cheapest window. Book soon if the price looks good.";
    } else if (daysUntil < w.sweetStart && daysUntil >= w.tooLate) {
      tier = "Last-minute";
      tierClass = "bg-amber-50 text-amber-900";
      advice =
        "Prices are rising. Book now; waiting typically hurts more than it helps.";
    } else if (daysUntil < w.tooLate && daysUntil > 0) {
      tier = "Sold out / panic";
      tierClass = "bg-rose-50 text-rose-900";
      advice =
        "Last-minute window. Expect premium pricing. Consider nearby airports and off-peak times.";
    } else if (daysUntil >= w.sweetEnd && daysUntil <= w.earliest) {
      tier = "Too early";
      tierClass = "bg-sky-50 text-sky-900";
      advice =
        "Slightly early but fine to watch. Most savings come in the sweet-spot window.";
    } else {
      tier = "Sold out / panic";
      tierClass = "bg-rose-50 text-rose-900";
      advice =
        "Departure date has passed or is today. Nothing to book.";
    }

    const sweetEntry = new Date(
      d.getTime() - w.sweetEnd * 86400000,
    );
    const sweetExit = new Date(
      d.getTime() - w.sweetStart * 86400000,
    );

    return {
      daysUntil,
      tier,
      tierClass,
      advice,
      window: w,
      sweetStartDate: sweetEntry.toISOString().slice(0, 10),
      sweetEndDate: sweetExit.toISOString().slice(0, 10),
    };
  }, [tripType, depDate]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Trip type
          </label>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value as TripType)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {Object.entries(WINDOWS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Desired departure date
          </label>
          <input
            type="date"
            value={depDate}
            onChange={(e) => setDepDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Days until departure
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.daysUntil}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Sweet-spot window
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.window.sweetStart}&ndash;{result.window.sweetEnd}d out
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Book between
              </div>
              <div className="text-lg font-semibold tabular-nums text-brand">
                {result.sweetStartDate} &ndash; {result.sweetEndDate}
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-4 ${result.tierClass}`}>
            <div className="text-xs uppercase tracking-wide opacity-75">
              Current status
            </div>
            <div className="mt-1 text-2xl font-semibold">{result.tier}</div>
            <div
              className="mt-1 text-sm"
              dangerouslySetInnerHTML={{ __html: result.advice }}
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-800">
              {result.window.label}
            </div>
            <div
              className="mt-1"
              dangerouslySetInnerHTML={{ __html: result.window.desc }}
            />
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-800">
              5 tips that actually work:
            </div>
            <ol className="mt-2 space-y-1 list-decimal pl-5">
              <li>
                Set fare alerts (Google Flights, Hopper, Kayak) &mdash; you
                can&rsquo;t beat the market by guessing.
              </li>
              <li>
                Be flexible with dates; shifting +/&ndash;3 days can cut 20%+
                on many routes.
              </li>
              <li>
                Check nearby airports &mdash; a 45-minute drive often saves{" "}
                {fmtUSD(80)}&ndash;{fmtUSD(200)}.
              </li>
              <li>
                Clearing cookies / incognito is a myth; prices don&rsquo;t
                change based on your browser. Tuesday-evening booking is also a
                myth in 2024+.
              </li>
              <li>
                Book one-ways separately if roundtrips look odd &mdash;
                sometimes two one-ways beat a combined fare.
              </li>
            </ol>
            <div className="mt-3 text-xs text-slate-500">
              Note: these windows are averages from airline revenue-management
              research. Specific routes, carriers, and seasons vary.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
