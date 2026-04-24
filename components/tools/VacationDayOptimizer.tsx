"use client";

import { useMemo, useState } from "react";

type Country = "US" | "UK" | "EU" | "CA" | "AU";

type Holiday = {
  name: string;
  // 0 = Sunday, 1 = Mon, ..., 6 = Sat
  dayOfWeek: number;
  // PTO days required to stitch together the best break
  pto: number;
  // Total days off achieved including weekends and holiday(s)
  daysOff: number;
  recommendation: string;
  month: string;
};

const HOLIDAYS: Record<Country, Holiday[]> = {
  US: [
    {
      name: "Thanksgiving weekend",
      dayOfWeek: 4,
      pto: 3,
      daysOff: 9,
      recommendation: "Take Mon&ndash;Wed before Thanksgiving for a 9-day break with 3 PTO days.",
      month: "Late November",
    },
    {
      name: "Christmas &ndash; New Year",
      dayOfWeek: 1,
      pto: 3,
      daysOff: 10,
      recommendation: "Take Dec 26, 27, 30 and 31 off to span Christmas through New Year &mdash; 10 days off for 3&ndash;4 PTO.",
      month: "Late December",
    },
    {
      name: "Independence Day (Jul 4)",
      dayOfWeek: 5,
      pto: 4,
      daysOff: 9,
      recommendation: "When July 4 lands midweek, take Mon&ndash;Thu or Thu&ndash;Fri plus the weekend for 9 days off.",
      month: "July",
    },
    {
      name: "Memorial Day (last Mon May)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Burn Tue&ndash;Fri after Memorial Day &mdash; 9 days off with 4 PTO.",
      month: "Late May",
    },
    {
      name: "Labor Day (first Mon Sep)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Take the week after Labor Day &mdash; 9 days off with 4 PTO.",
      month: "Early September",
    },
    {
      name: "Presidents Day (3rd Mon Feb)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Take Tue&ndash;Fri after Presidents Day for a 9-day winter escape.",
      month: "Mid February",
    },
    {
      name: "MLK Day (3rd Mon Jan)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Tue&ndash;Fri after MLK Day &mdash; 9 days off from 4 PTO.",
      month: "Mid January",
    },
  ],
  UK: [
    {
      name: "Easter (Good Fri + Easter Mon)",
      dayOfWeek: 5,
      pto: 3,
      daysOff: 10,
      recommendation: "Take Tue&ndash;Thu between the Easter bank holidays &mdash; 10 days off for 3 PTO.",
      month: "March/April",
    },
    {
      name: "Early May bank holiday",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Tue&ndash;Fri after the Monday bank holiday for 9 days off.",
      month: "Early May",
    },
    {
      name: "Spring bank holiday",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Take the week after late-May bank holiday &mdash; 9 days off with 4 PTO.",
      month: "Late May",
    },
    {
      name: "Summer bank holiday",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Tue&ndash;Fri after the August Monday bank holiday &mdash; 9 days off.",
      month: "Late August",
    },
    {
      name: "Christmas + Boxing Day + New Year",
      dayOfWeek: 1,
      pto: 3,
      daysOff: 10,
      recommendation: "Bridge Boxing Day to New Year with 3 PTO &mdash; up to 10 consecutive days off.",
      month: "Late December",
    },
  ],
  EU: [
    {
      name: "Easter long weekend",
      dayOfWeek: 5,
      pto: 3,
      daysOff: 10,
      recommendation: "Take Tue&ndash;Thu between Good Friday and Easter Monday for a 10-day break.",
      month: "March/April",
    },
    {
      name: "Labour Day (May 1)",
      dayOfWeek: 4,
      pto: 4,
      daysOff: 9,
      recommendation: "Bridge May 1 with the surrounding weekend &mdash; 9 days off with 4 PTO.",
      month: "May 1",
    },
    {
      name: "Ascension Day (Thu)",
      dayOfWeek: 4,
      pto: 1,
      daysOff: 4,
      recommendation: "Take the Friday between Ascension and the weekend &mdash; 4 days off for 1 PTO.",
      month: "May/June",
    },
    {
      name: "Assumption Day (Aug 15)",
      dayOfWeek: 4,
      pto: 4,
      daysOff: 9,
      recommendation: "Bridge August 15 with the full week &mdash; 9 days off for 4 PTO.",
      month: "Mid August",
    },
    {
      name: "All Saints (Nov 1)",
      dayOfWeek: 4,
      pto: 4,
      daysOff: 9,
      recommendation: "Take the week around November 1 &mdash; 9 days off with 4 PTO.",
      month: "Early November",
    },
    {
      name: "Christmas &ndash; New Year",
      dayOfWeek: 1,
      pto: 3,
      daysOff: 10,
      recommendation: "3 PTO days bridges Christmas Day, Boxing Day and New Year &mdash; up to 10 days off.",
      month: "Late December",
    },
  ],
  CA: [
    {
      name: "Victoria Day (Mon before May 25)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Tue&ndash;Fri after Victoria Day for 9 days off with 4 PTO.",
      month: "Late May",
    },
    {
      name: "Canada Day (Jul 1)",
      dayOfWeek: 3,
      pto: 4,
      daysOff: 9,
      recommendation: "Bridge July 1 with Mon/Tue and Thu/Fri &mdash; up to 9 days off.",
      month: "July 1",
    },
    {
      name: "Civic Holiday (1st Mon Aug)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Tue&ndash;Fri after the August long weekend &mdash; 9 days off with 4 PTO.",
      month: "Early August",
    },
    {
      name: "Labour Day (1st Mon Sep)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Tue&ndash;Fri after Labour Day for a 9-day late-summer break.",
      month: "Early September",
    },
    {
      name: "Thanksgiving (2nd Mon Oct)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Burn Tue&ndash;Fri after Thanksgiving Monday for 9 days off.",
      month: "Mid October",
    },
    {
      name: "Christmas + Boxing + New Year",
      dayOfWeek: 1,
      pto: 3,
      daysOff: 10,
      recommendation: "3 PTO days between Boxing Day and New Year Eve &mdash; up to 10 days off.",
      month: "Late December",
    },
  ],
  AU: [
    {
      name: "Australia Day (Jan 26)",
      dayOfWeek: 2,
      pto: 4,
      daysOff: 9,
      recommendation: "Bridge Australia Day with the week around it &mdash; 9 days off with 4 PTO.",
      month: "Late January",
    },
    {
      name: "Easter (Fri&ndash;Mon)",
      dayOfWeek: 5,
      pto: 3,
      daysOff: 10,
      recommendation: "Take Tue&ndash;Thu between Good Friday and Easter Monday &mdash; 10 days off.",
      month: "March/April",
    },
    {
      name: "ANZAC Day (Apr 25)",
      dayOfWeek: 4,
      pto: 4,
      daysOff: 9,
      recommendation: "Bridge ANZAC Day with the surrounding week &mdash; 9 days off for 4 PTO.",
      month: "Late April",
    },
    {
      name: "King&rsquo;s Birthday (2nd Mon Jun)",
      dayOfWeek: 1,
      pto: 4,
      daysOff: 9,
      recommendation: "Tue&ndash;Fri after the King&rsquo;s Birthday public holiday &mdash; 9 days off.",
      month: "Early June",
    },
    {
      name: "Christmas + Boxing + New Year",
      dayOfWeek: 1,
      pto: 3,
      daysOff: 10,
      recommendation: "3 PTO days between the public holidays &mdash; up to 10 consecutive days off.",
      month: "Late December",
    },
  ],
};

const COUNTRY_LABEL: Record<Country, string> = {
  US: "United States",
  UK: "United Kingdom",
  EU: "EU (generic)",
  CA: "Canada",
  AU: "Australia",
};

export function VacationDayOptimizer() {
  const [country, setCountry] = useState<Country>("US");
  const [targetDays, setTargetDays] = useState(9);
  const [ptoAvailable, setPtoAvailable] = useState(15);

  const ranked = useMemo(() => {
    const list = HOLIDAYS[country] ?? [];
    return [...list]
      .map((h) => ({
        ...h,
        efficiency: h.daysOff / Math.max(1, h.pto),
        feasible: h.pto <= ptoAvailable && h.daysOff >= targetDays * 0.75,
      }))
      .sort((a, b) => {
        if (a.feasible !== b.feasible) return a.feasible ? -1 : 1;
        return b.efficiency - a.efficiency;
      })
      .slice(0, 5);
  }, [country, targetDays, ptoAvailable]);

  const bestSet = useMemo(() => {
    // Greedy: pick clusters that fit within remaining PTO, maximize total days off
    const list = HOLIDAYS[country] ?? [];
    const sorted = [...list].sort((a, b) => b.daysOff / b.pto - a.daysOff / a.pto);
    const picks: typeof list = [];
    let ptoLeft = ptoAvailable;
    let totalOff = 0;
    for (const h of sorted) {
      if (h.pto <= ptoLeft) {
        picks.push(h);
        ptoLeft -= h.pto;
        totalOff += h.daysOff;
      }
    }
    return { picks, ptoUsed: ptoAvailable - ptoLeft, totalOff };
  }, [country, ptoAvailable]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Country</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={country}
            onChange={(e) => setCountry(e.target.value as Country)}
          >
            {(Object.keys(COUNTRY_LABEL) as Country[]).map((k) => (
              <option key={k} value={k}>
                {COUNTRY_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Target break length (days)</span>
          <input
            type="number"
            min={3}
            max={21}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={targetDays}
            onChange={(e) => setTargetDays(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">PTO days available</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={ptoAvailable}
            onChange={(e) => setPtoAvailable(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-sm text-slate-600">Best annual plan with {ptoAvailable} PTO</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">
          {bestSet.totalOff} days off
        </div>
        <div className="text-xs text-slate-500">
          using {bestSet.ptoUsed} PTO across {bestSet.picks.length} break{bestSet.picks.length === 1 ? "" : "s"} &mdash; leverage ratio{" "}
          {(bestSet.totalOff / Math.max(1, bestSet.ptoUsed)).toFixed(2)}x
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-700">Top 5 PTO leverage opportunities</h3>
        {ranked.map((h, i) => (
          <div
            key={h.name}
            className={`rounded-xl border p-4 ${h.feasible ? "border-slate-200 bg-white" : "border-slate-200 bg-slate-50 opacity-70"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>#{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: h.name }} />
                  <span className="text-xs text-slate-400">&middot; {h.month}</span>
                </div>
                <div
                  className="mt-1 text-sm text-slate-700"
                  dangerouslySetInnerHTML={{ __html: h.recommendation }}
                />
              </div>
              <div className="text-right">
                <div className="text-2xl font-semibold tabular-nums text-brand">{h.efficiency.toFixed(2)}x</div>
                <div className="text-xs text-slate-500">
                  {h.pto} PTO &rarr; {h.daysOff} days off
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-500">
        Dates drift year to year &mdash; always check your HR calendar before booking. &ldquo;Leverage&rdquo; is days-off divided by
        PTO spent, so 3x means every PTO day unlocks three days of break.
      </p>
    </div>
  );
}
