"use client";

import { useMemo, useState } from "react";

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function AirbnbCleaningFeeFairness() {
  const [cleaning, setCleaning] = useState(120);
  const [nightly, setNightly] = useState(180);
  const [nights, setNights] = useState(3);

  const result = useMemo(() => {
    if (
      !Number.isFinite(cleaning) ||
      !Number.isFinite(nightly) ||
      !Number.isFinite(nights) ||
      nightly <= 0 ||
      nights <= 0 ||
      cleaning < 0
    ) {
      return null;
    }

    const totalStay = nightly * nights + cleaning;
    const effectivePerNight = totalStay / nights;
    const pctOfNightly = (cleaning / nightly) * 100;
    const pctOfTotal = (cleaning / totalStay) * 100;
    const uplift = effectivePerNight - nightly;

    const ratioNights = cleaning / nightly;

    let tier: "Fair" | "Steep" | "Gouging";
    let tierClass: string;
    let tierNote: string;

    if (ratioNights <= 1 || pctOfTotal <= 10) {
      tier = "Fair";
      tierClass = "bg-emerald-50 text-emerald-900";
      tierNote =
        "Cleaning fee is reasonable relative to the nightly rate and total stay.";
    } else if (ratioNights <= 2 || pctOfTotal <= 20) {
      tier = "Steep";
      tierClass = "bg-amber-50 text-amber-900";
      tierNote =
        "Cleaning fee is on the high side. Consider whether the stay is long enough to amortize it.";
    } else {
      tier = "Gouging";
      tierClass = "bg-rose-50 text-rose-900";
      tierNote =
        "Cleaning fee is disproportionate to the nightly rate. You&rsquo;re subsidizing the host&rsquo;s cleaning costs.";
    }

    return {
      totalStay,
      effectivePerNight,
      pctOfNightly,
      pctOfTotal,
      uplift,
      tier,
      tierClass,
      tierNote,
    };
  }, [cleaning, nightly, nights]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Cleaning fee ($)
          </label>
          <input
            type="number"
            min="0"
            value={cleaning}
            onChange={(e) => setCleaning(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nightly rate ($)
          </label>
          <input
            type="number"
            min="0"
            value={nightly}
            onChange={(e) => setNightly(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Nights
          </label>
          <input
            type="number"
            min="1"
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {result && (
        <>
          <div className={`rounded-xl p-4 ${result.tierClass}`}>
            <div className="text-xs uppercase tracking-wide opacity-75">
              Verdict
            </div>
            <div className="mt-1 text-2xl font-semibold">{result.tier}</div>
            <div
              className="mt-1 text-sm"
              dangerouslySetInnerHTML={{ __html: result.tierNote }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Effective per-night cost
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {fmtUSD(result.effectivePerNight)}
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Uplift of {fmtUSD(result.uplift)}/night over listed rate
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Total stay cost
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {fmtUSD(result.totalStay)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Cleaning as % of nightly
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.pctOfNightly.toFixed(1) + "%"}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Cleaning as % of total
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.pctOfTotal.toFixed(1) + "%"}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            This is the same as paying{" "}
            <span className="font-semibold text-brand">
              {fmtUSD(result.effectivePerNight)}/night
            </span>{" "}
            all-in.
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-800">
              How cleaning fees actually work:
            </div>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>
                Stays over 5 nights amortize the cleaning fee across more
                nights &mdash; the per-night impact shrinks fast.
              </li>
              <li>
                Short 1&ndash;2 night stays are punished hardest; cleaning can
                double your effective nightly rate.
              </li>
              <li>
                If the cleaning fee exceeds 2 nights&rsquo; rate, compare a
                similar hotel &mdash; you may come out ahead.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
