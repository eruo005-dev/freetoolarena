"use client";

import { useMemo, useState } from "react";

type Age = "18-34" | "35-54" | "55-69" | "70+";
type Coverage = "basic" | "comp" | "cfar";

const BASE: Record<Age, Record<Coverage, number>> = {
  "18-34": { basic: 0.04, comp: 0.055, cfar: 0.08 },
  "35-54": { basic: 0.05, comp: 0.065, cfar: 0.09 },
  "55-69": { basic: 0.07, comp: 0.09, cfar: 0.12 },
  "70+": { basic: 0.1, comp: 0.13, cfar: 0.16 },
};

const COVERAGE_LABELS: Record<Coverage, string> = {
  basic: "Basic trip cancellation only",
  comp: "Comprehensive",
  cfar: "Premium with CFAR (Cancel For Any Reason)",
};

const COVERS: Record<Coverage, string[]> = {
  basic: [
    "Trip cancellation for covered reasons (illness, death, severe weather)",
    "Trip interruption for covered reasons",
    "Basic reimbursement for prepaid non-refundable costs",
  ],
  comp: [
    "Everything in basic cancellation",
    "Emergency medical and evacuation (usually $100k&ndash;$500k)",
    "Baggage loss / delay",
    "Trip delay meals and lodging",
    "24/7 travel assistance hotline",
  ],
  cfar: [
    "Everything in comprehensive",
    "Cancel For Any Reason &mdash; typically reimburses 50&ndash;75%",
    "Must be purchased within 14&ndash;21 days of initial trip deposit",
    "Must cancel 48&ndash;72 hours before departure",
    "Highest tier of emergency medical and evacuation coverage",
  ],
};

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function TravelInsuranceCostEstimator() {
  const [tripCost, setTripCost] = useState(4500);
  const [days, setDays] = useState(10);
  const [age, setAge] = useState<Age>("35-54");
  const [coverage, setCoverage] = useState<Coverage>("comp");

  const result = useMemo(() => {
    if (
      !Number.isFinite(tripCost) ||
      !Number.isFinite(days) ||
      tripCost <= 0 ||
      days <= 0
    ) {
      return null;
    }

    const baseRate = BASE[age][coverage];
    let dayMod = 1.0;
    if (days < 7) dayMod = 0.8;
    else if (days <= 14) dayMod = 1.0;
    else if (days <= 30) dayMod = 1.1;
    else dayMod = 1.3;

    const cost = tripCost * baseRate * dayMod;
    const pct = (cost / tripCost) * 100;
    const perDay = cost / days;

    return {
      cost,
      pct,
      perDay,
      baseRate,
      dayMod,
    };
  }, [tripCost, days, age, coverage]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Total trip cost ($)
          </label>
          <input
            type="number"
            min="0"
            value={tripCost}
            onChange={(e) => setTripCost(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Trip length (days)
          </label>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Traveler age
          </label>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as Age)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="18-34">18&ndash;34</option>
            <option value="35-54">35&ndash;54</option>
            <option value="55-69">55&ndash;69</option>
            <option value="70+">70+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Coverage type
          </label>
          <select
            value={coverage}
            onChange={(e) => setCoverage(e.target.value as Coverage)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {(Object.keys(COVERAGE_LABELS) as Coverage[]).map((k) => (
              <option key={k} value={k}>
                {COVERAGE_LABELS[k]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Estimated cost
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {fmtUSD(result.cost)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                % of trip cost
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.pct.toFixed(1) + "%"}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Per-day cost
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {fmtUSD(result.perDay)}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-800">
              What {COVERAGE_LABELS[coverage]} typically covers:
            </div>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              {COVERS[coverage].map((line, i) => (
                <li
                  key={i}
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Always compare actual quotes</strong> at InsureMyTrip,
            Squaremouth, or directly from a carrier. This is an estimate only
            based on industry-average rates (base{" "}
            {(result.baseRate * 100).toFixed(1) + "%"}, day-length modifier{" "}
            {result.dayMod.toFixed(2)}&times;). Pre-existing conditions, trip
            destination, and carrier can shift actual premiums materially.
          </div>
        </>
      )}
    </div>
  );
}
