"use client";

import { useMemo, useState } from "react";

export function AirbnbRevenueEstimator() {
  const [nightlyRate, setNightlyRate] = useState(180);
  const [occupancy, setOccupancy] = useState(65);
  const [cleaningFee, setCleaningFee] = useState(75);
  const [avgStay, setAvgStay] = useState(3);
  const [platformFee, setPlatformFee] = useState(14);
  const [pmFee, setPmFee] = useState(0);

  const result = useMemo(() => {
    if (!Number.isFinite(nightlyRate) || !Number.isFinite(occupancy))
      return null;

    const nightsBooked = 30 * (occupancy / 100);
    const bookings = avgStay > 0 ? nightsBooked / avgStay : 0;

    const grossMonthly = nightlyRate * nightsBooked + cleaningFee * bookings;
    const afterPlatform = grossMonthly * (1 - platformFee / 100);
    const afterPm = afterPlatform * (1 - pmFee / 100);
    const annualNet = afterPm * 12;

    return {
      nightsBooked,
      bookings,
      grossMonthly,
      afterPlatform,
      afterPm,
      annualNet,
    };
  }, [nightlyRate, occupancy, cleaningFee, avgStay, platformFee, pmFee]);

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Average nightly rate
          </span>
          <input
            type="number"
            value={nightlyRate}
            onChange={(e) => setNightlyRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Occupancy (%)
          </span>
          <input
            type="number"
            value={occupancy}
            onChange={(e) => setOccupancy(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Cleaning fee per booking
          </span>
          <input
            type="number"
            value={cleaningFee}
            onChange={(e) => setCleaningFee(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Avg stay (nights)
          </span>
          <input
            type="number"
            value={avgStay}
            onChange={(e) => setAvgStay(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Platform fee (%)
          </span>
          <input
            type="number"
            value={platformFee}
            onChange={(e) => setPlatformFee(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Property management (%)
          </span>
          <input
            type="number"
            value={pmFee}
            onChange={(e) => setPmFee(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Monthly gross revenue
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.grossMonthly)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Monthly net (after fees)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.afterPm)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              After platform {money(result.afterPlatform)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Annual net
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {money(result.annualNet)}
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Bookings &amp; nights / mo
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.bookings.toFixed(1)} / {result.nightsBooked.toFixed(1)}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Bookings &middot; nights booked
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Estimates vary wildly by market. Check AirDNA or MashVisor for your zip
        before buying.
      </p>
    </div>
  );
}
