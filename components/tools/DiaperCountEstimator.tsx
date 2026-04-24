"use client";

import { useMemo, useState } from "react";

type AgeBucket = "newborn" | "1-5" | "6-12" | "12plus";

const AGE_DATA: Record<AgeBucket, { label: string; perDayLow: number; perDayHigh: number }> = {
  newborn: { label: "Newborn (0&ndash;4 weeks)", perDayLow: 10, perDayHigh: 12 },
  "1-5": { label: "1&ndash;5 months", perDayLow: 8, perDayHigh: 10 },
  "6-12": { label: "6&ndash;12 months", perDayLow: 6, perDayHigh: 8 },
  "12plus": { label: "12+ months (pre-potty-train)", perDayLow: 4, perDayHigh: 6 },
};

const SIZE_PROGRESSION: { size: string; span: string; lbs: string }[] = [
  { size: "Newborn", span: "~2 weeks", lbs: "up to 10 lbs" },
  { size: "Size 1", span: "~2 months", lbs: "8&ndash;14 lbs" },
  { size: "Size 2", span: "~2 months", lbs: "12&ndash;18 lbs" },
  { size: "Size 3", span: "~4 months", lbs: "16&ndash;28 lbs" },
  { size: "Size 4", span: "~4 months", lbs: "22&ndash;37 lbs" },
  { size: "Size 5", span: "Until potty-trained", lbs: "27+ lbs" },
];

export function DiaperCountEstimator() {
  const [ageBucket, setAgeBucket] = useState<AgeBucket>("1-5");
  const [cost, setCost] = useState<number>(0.25);

  const numbers = useMemo(() => {
    const data = AGE_DATA[ageBucket];
    const perDayAvg = (data.perDayLow + data.perDayHigh) / 2;
    const perDay = Number.isFinite(perDayAvg) ? perDayAvg : 0;
    const perMonth = perDay * 30;
    const perYear = perDay * 365;
    const unit = Number.isFinite(cost) && cost >= 0 ? cost : 0;
    return {
      perDayRange: `${data.perDayLow}&ndash;${data.perDayHigh}`,
      perDay: perDay.toFixed(1),
      perMonth: Math.round(perMonth),
      perYear: Math.round(perYear),
      monthlyCost: (perMonth * unit).toFixed(2),
      yearlyCost: (perYear * unit).toFixed(2),
    };
  }, [ageBucket, cost]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Baby age</span>
            <select
              value={ageBucket}
              onChange={(event) => setAgeBucket(event.target.value as AgeBucket)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            >
              {Object.entries(AGE_DATA).map(([value, data]) => (
                <option
                  key={value}
                  value={value}
                  dangerouslySetInnerHTML={{ __html: data.label }}
                />
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Cost per diaper (USD)</span>
            <input
              type="number"
              min={0}
              step={0.01}
              value={cost}
              onChange={(event) => setCost(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-brand/5 p-5">
        <p className="text-xs uppercase tracking-wide text-brand">Estimated usage &amp; cost</p>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Per day</dt>
            <dd
              className="text-lg font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: `${numbers.perDayRange} diapers` }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Per month</dt>
            <dd className="text-lg font-semibold text-slate-900">{numbers.perMonth} diapers</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Per year</dt>
            <dd className="text-lg font-semibold text-slate-900">{numbers.perYear} diapers</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Monthly cost</dt>
            <dd className="text-lg font-semibold text-slate-900">${numbers.monthlyCost}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Yearly cost</dt>
            <dd className="text-lg font-semibold text-slate-900">${numbers.yearlyCost}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Typical size progression</h3>
        <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Size</th>
                <th className="px-3 py-2">Typical span</th>
                <th className="px-3 py-2">Weight range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SIZE_PROGRESSION.map((row) => (
                <tr key={row.size}>
                  <td className="px-3 py-2 font-medium text-slate-900">{row.size}</td>
                  <td
                    className="px-3 py-2 text-slate-700"
                    dangerouslySetInnerHTML={{ __html: row.span }}
                  />
                  <td
                    className="px-3 py-2 text-slate-700"
                    dangerouslySetInnerHTML={{ __html: row.lbs }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Cloth vs. disposable</p>
        <p className="mt-2">
          Cloth diapers cost more upfront (~$300&ndash;$800 for a starter stash) but can cut a 2.5-year
          disposable budget by 50&ndash;70%, especially across multiple kids. Add in water, detergent,
          and laundry time before comparing. A hybrid approach (cloth at home, disposables on the go)
          is popular because it splits the cost and convenience trade-off.
        </p>
      </div>
    </div>
  );
}
