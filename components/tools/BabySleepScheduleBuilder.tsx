"use client";

import { useMemo, useState } from "react";

type ScheduleProfile = {
  label: string;
  totalSleep: string;
  naps: string;
  wakeWindow: string;
  routineLength: string;
  sample: { time: string; event: string }[];
};

function profileFor(months: number): ScheduleProfile {
  if (months <= 3) {
    return {
      label: "0&ndash;3 months (newborn)",
      totalSleep: "14&ndash;17 hours / day",
      naps: "Unlimited (4&ndash;6+ short naps)",
      wakeWindow: "45&ndash;90 minutes",
      routineLength: "10&ndash;15 minutes",
      sample: [
        { time: "7:00", event: "Wake &amp; feed" },
        { time: "8:15", event: "Nap 1" },
        { time: "10:00", event: "Wake &amp; feed" },
        { time: "11:15", event: "Nap 2" },
        { time: "13:00", event: "Wake &amp; feed" },
        { time: "19:00", event: "Bedtime routine &amp; bed" },
      ],
    };
  }
  if (months <= 6) {
    return {
      label: "4&ndash;6 months",
      totalSleep: "12&ndash;15 hours / day",
      naps: "3&ndash;4 naps",
      wakeWindow: "1.5&ndash;2.5 hours",
      routineLength: "15&ndash;20 minutes",
      sample: [
        { time: "7:00", event: "Wake &amp; feed" },
        { time: "9:00", event: "Nap 1 (until ~10:30)" },
        { time: "12:30", event: "Nap 2 (until ~2:00)" },
        { time: "16:00", event: "Cat-nap (30 min)" },
        { time: "19:00", event: "Bedtime routine" },
        { time: "19:30", event: "Bed" },
      ],
    };
  }
  if (months <= 9) {
    return {
      label: "7&ndash;9 months",
      totalSleep: "12&ndash;14 hours / day",
      naps: "2&ndash;3 naps",
      wakeWindow: "2&ndash;3 hours",
      routineLength: "15&ndash;20 minutes",
      sample: [
        { time: "7:00", event: "Wake" },
        { time: "9:30", event: "Nap 1 (until ~10:30)" },
        { time: "13:00", event: "Nap 2 (until ~2:30)" },
        { time: "19:00", event: "Bedtime routine" },
        { time: "19:30", event: "Bed" },
      ],
    };
  }
  if (months <= 12) {
    return {
      label: "10&ndash;12 months",
      totalSleep: "12&ndash;14 hours / day",
      naps: "2 naps",
      wakeWindow: "3&ndash;4 hours",
      routineLength: "20 minutes",
      sample: [
        { time: "7:00", event: "Wake" },
        { time: "9:30", event: "Nap 1 (until ~10:30)" },
        { time: "13:30", event: "Nap 2 (until ~2:30)" },
        { time: "19:00", event: "Bedtime routine" },
        { time: "19:30", event: "Bed" },
      ],
    };
  }
  if (months <= 18) {
    return {
      label: "13&ndash;18 months",
      totalSleep: "11&ndash;14 hours / day",
      naps: "1&ndash;2 naps",
      wakeWindow: "4&ndash;5 hours",
      routineLength: "20&ndash;25 minutes",
      sample: [
        { time: "7:00", event: "Wake" },
        { time: "12:30", event: "Nap (until ~2:30)" },
        { time: "19:00", event: "Bedtime routine" },
        { time: "19:30", event: "Bed" },
      ],
    };
  }
  return {
    label: "19&ndash;24 months",
    totalSleep: "11&ndash;13 hours / day",
    naps: "1 nap",
    wakeWindow: "5&ndash;6 hours",
    routineLength: "25&ndash;30 minutes",
    sample: [
      { time: "7:00", event: "Wake" },
      { time: "13:00", event: "Nap (until ~2:30)" },
      { time: "19:15", event: "Bedtime routine" },
      { time: "19:45", event: "Bed" },
    ],
  };
}

export function BabySleepScheduleBuilder() {
  const [ageMonths, setAgeMonths] = useState<number>(6);

  const profile = useMemo(() => {
    const safe = Number.isFinite(ageMonths) ? Math.min(24, Math.max(0, ageMonths)) : 0;
    return profileFor(safe);
  }, [ageMonths]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block text-sm font-medium text-slate-700">
          Baby age (months, 0&ndash;24)
        </label>
        <input
          type="number"
          min={0}
          max={24}
          step={1}
          value={ageMonths}
          onChange={(event) => setAgeMonths(Number(event.target.value))}
          className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-brand/5 p-5">
        <p className="text-xs uppercase tracking-wide text-brand">Age band</p>
        <p
          className="mt-1 text-lg font-semibold text-slate-900"
          dangerouslySetInnerHTML={{ __html: profile.label }}
        />
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Total sleep</dt>
            <dd
              className="text-base font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: profile.totalSleep }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Naps</dt>
            <dd className="text-base font-semibold text-slate-900">{profile.naps}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Wake window</dt>
            <dd
              className="text-base font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: profile.wakeWindow }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Bedtime routine</dt>
            <dd
              className="text-base font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: profile.routineLength }}
            />
          </div>
        </dl>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900">Sample schedule</h3>
        <ul className="mt-3 divide-y divide-slate-100">
          {profile.sample.map((row) => (
            <li key={row.time} className="flex items-center justify-between py-2 text-sm">
              <span className="font-mono text-brand">{row.time}</span>
              <span
                className="text-slate-700"
                dangerouslySetInnerHTML={{ __html: row.event }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Tips for better sleep</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Consistent bedtime matters more than the exact clock time &mdash; pick one and hold it within a 30-minute window.</li>
          <li>Watch wake windows, not the clock. An overtired baby fights sleep hardest.</li>
          <li>Dim lights and drop voices 20 minutes before bed to cue melatonin release.</li>
          <li>Every baby is different. If sleep is consistently off-pattern, check in with your pediatrician.</li>
        </ul>
      </div>
    </div>
  );
}
