"use client";

import { useMemo, useState } from "react";

function bottlesForAge(weeks: number): { perDayLow: number; perDayHigh: number; label: string } {
  if (weeks <= 4) return { perDayLow: 8, perDayHigh: 8, label: "0&ndash;1 month" };
  if (weeks <= 12) return { perDayLow: 6, perDayHigh: 7, label: "1&ndash;3 months" };
  if (weeks <= 26) return { perDayLow: 5, perDayHigh: 6, label: "4&ndash;6 months" };
  return { perDayLow: 4, perDayHigh: 5, label: "6&ndash;12 months (with solids)" };
}

export function BabyBottleFeedingAmount() {
  const [ageWeeks, setAgeWeeks] = useState<number>(8);
  const [weightLbs, setWeightLbs] = useState<number>(12);

  const calc = useMemo(() => {
    const safeWeeks = Number.isFinite(ageWeeks) ? Math.min(52, Math.max(0, ageWeeks)) : 0;
    const safeWeight = Number.isFinite(weightLbs) && weightLbs > 0 ? weightLbs : 0;
    // 2.5 oz per lb body weight, capped at 32 oz/day per medical guidance
    const rawDaily = safeWeight * 2.5;
    const cappedDaily = Math.min(rawDaily, 32);
    const band = bottlesForAge(safeWeeks);
    const avgBottles = (band.perDayLow + band.perDayHigh) / 2;
    const perBottleLow = avgBottles > 0 ? cappedDaily / band.perDayHigh : 0;
    const perBottleHigh = avgBottles > 0 ? cappedDaily / band.perDayLow : 0;
    return {
      band,
      dailyOz: cappedDaily.toFixed(1),
      rawDailyOz: rawDaily.toFixed(1),
      capped: rawDaily > 32,
      perBottle: `${perBottleLow.toFixed(1)}&ndash;${perBottleHigh.toFixed(1)}`,
      bottlesPerDay: `${band.perDayLow}&ndash;${band.perDayHigh}`,
    };
  }, [ageWeeks, weightLbs]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Baby age (weeks, 0&ndash;52)</span>
            <input
              type="number"
              min={0}
              max={52}
              step={1}
              value={ageWeeks}
              onChange={(event) => setAgeWeeks(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            />
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Baby weight (lbs)</span>
            <input
              type="number"
              min={0}
              step={0.1}
              value={weightLbs}
              onChange={(event) => setWeightLbs(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-brand/5 p-5">
        <p className="text-xs uppercase tracking-wide text-brand">Feeding estimate</p>
        <p
          className="mt-1 text-lg font-semibold text-slate-900"
          dangerouslySetInnerHTML={{ __html: calc.band.label }}
        />
        <dl className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Total formula / day</dt>
            <dd className="text-lg font-semibold text-slate-900">{calc.dailyOz} oz</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Bottles / day</dt>
            <dd
              className="text-lg font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: calc.bottlesPerDay }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Per bottle</dt>
            <dd
              className="text-lg font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: `${calc.perBottle} oz` }}
            />
          </div>
        </dl>
      </div>

      {calc.capped && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
          <p className="font-semibold">Daily total capped at 32 oz</p>
          <p className="mt-2">
            The 2.5 oz/lb rule put your baby at {calc.rawDailyOz} oz/day, but infants should not
            regularly exceed 32 oz of formula per day. If your baby seems to need more, check with
            your pediatrician &mdash; they may be ready for solids or need a feeding plan adjustment.
          </p>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
        <p className="font-semibold text-slate-900">How the math works</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Rule of thumb for the first 6 months: ~2.5 oz of formula per pound of body weight per day.</li>
          <li>Divide the daily total by typical bottles per day for your baby&rsquo;s age to get per-bottle volume.</li>
          <li>Once solids start (around 6 months), formula total drops gradually as calories come from food.</li>
        </ul>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Watch baby&rsquo;s hunger cues &mdash; these are averages</p>
        <p className="mt-2">
          Every baby has different appetite days. Rooting, hand-to-mouth, and fussing usually mean
          hungry. Turning away, slow sucking, or pushing the nipple out usually mean full. If your
          baby consistently needs much more or much less than these numbers, or isn&rsquo;t gaining
          weight as expected, check in with your pediatrician.
        </p>
      </div>
    </div>
  );
}
