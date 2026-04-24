"use client";

import { useMemo, useState } from "react";

type DstRule =
  | {
      kind: "us";
      offsetStd: number;
      offsetDst: number;
    }
  | {
      kind: "eu";
      offsetStd: number;
      offsetDst: number;
    }
  | {
      kind: "south";
      offsetStd: number;
      offsetDst: number;
    }
  | {
      kind: "none";
      offsetStd: number;
    };

type City = {
  name: string;
  tz: string;
  rule: DstRule;
};

const CITIES: City[] = [
  { name: "New York, USA", tz: "America/New_York", rule: { kind: "us", offsetStd: -5, offsetDst: -4 } },
  { name: "Los Angeles, USA", tz: "America/Los_Angeles", rule: { kind: "us", offsetStd: -8, offsetDst: -7 } },
  { name: "Chicago, USA", tz: "America/Chicago", rule: { kind: "us", offsetStd: -6, offsetDst: -5 } },
  { name: "Denver, USA", tz: "America/Denver", rule: { kind: "us", offsetStd: -7, offsetDst: -6 } },
  { name: "Miami, USA", tz: "America/New_York", rule: { kind: "us", offsetStd: -5, offsetDst: -4 } },
  { name: "Toronto, Canada", tz: "America/Toronto", rule: { kind: "us", offsetStd: -5, offsetDst: -4 } },
  { name: "Vancouver, Canada", tz: "America/Vancouver", rule: { kind: "us", offsetStd: -8, offsetDst: -7 } },
  { name: "Mexico City, Mexico", tz: "America/Mexico_City", rule: { kind: "none", offsetStd: -6 } },
  { name: "London, UK", tz: "Europe/London", rule: { kind: "eu", offsetStd: 0, offsetDst: 1 } },
  { name: "Dublin, Ireland", tz: "Europe/Dublin", rule: { kind: "eu", offsetStd: 0, offsetDst: 1 } },
  { name: "Berlin, Germany", tz: "Europe/Berlin", rule: { kind: "eu", offsetStd: 1, offsetDst: 2 } },
  { name: "Paris, France", tz: "Europe/Paris", rule: { kind: "eu", offsetStd: 1, offsetDst: 2 } },
  { name: "Madrid, Spain", tz: "Europe/Madrid", rule: { kind: "eu", offsetStd: 1, offsetDst: 2 } },
  { name: "Sydney, Australia", tz: "Australia/Sydney", rule: { kind: "south", offsetStd: 10, offsetDst: 11 } },
  { name: "Melbourne, Australia", tz: "Australia/Melbourne", rule: { kind: "south", offsetStd: 10, offsetDst: 11 } },
  { name: "Auckland, New Zealand", tz: "Pacific/Auckland", rule: { kind: "south", offsetStd: 12, offsetDst: 13 } },
  { name: "Tokyo, Japan", tz: "Asia/Tokyo", rule: { kind: "none", offsetStd: 9 } },
  { name: "Seoul, South Korea", tz: "Asia/Seoul", rule: { kind: "none", offsetStd: 9 } },
  { name: "Singapore", tz: "Asia/Singapore", rule: { kind: "none", offsetStd: 8 } },
  { name: "Bangkok, Thailand", tz: "Asia/Bangkok", rule: { kind: "none", offsetStd: 7 } },
  { name: "Dubai, UAE", tz: "Asia/Dubai", rule: { kind: "none", offsetStd: 4 } },
  { name: "Mumbai, India", tz: "Asia/Kolkata", rule: { kind: "none", offsetStd: 5.5 } },
  { name: "Hong Kong", tz: "Asia/Hong_Kong", rule: { kind: "none", offsetStd: 8 } },
  { name: "Beijing, China", tz: "Asia/Shanghai", rule: { kind: "none", offsetStd: 8 } },
  { name: "Taipei, Taiwan", tz: "Asia/Taipei", rule: { kind: "none", offsetStd: 8 } },
  { name: "Buenos Aires, Argentina", tz: "America/Argentina/Buenos_Aires", rule: { kind: "none", offsetStd: -3 } },
  { name: "Santiago, Chile", tz: "America/Santiago", rule: { kind: "none", offsetStd: -4 } },
  { name: "São Paulo, Brazil", tz: "America/Sao_Paulo", rule: { kind: "none", offsetStd: -3 } },
  { name: "Moscow, Russia", tz: "Europe/Moscow", rule: { kind: "none", offsetStd: 3 } },
  { name: "Honolulu, USA", tz: "Pacific/Honolulu", rule: { kind: "none", offsetStd: -10 } },
  { name: "Phoenix, USA (Arizona)", tz: "America/Phoenix", rule: { kind: "none", offsetStd: -7 } },
];

function nthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  n: number,
): Date {
  const d = new Date(Date.UTC(year, month, 1));
  const firstDow = d.getUTCDay();
  const offset = (weekday - firstDow + 7) % 7;
  d.setUTCDate(1 + offset + (n - 1) * 7);
  return d;
}

function lastWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
): Date {
  const d = new Date(Date.UTC(year, month + 1, 0));
  const lastDow = d.getUTCDay();
  const offset = (lastDow - weekday + 7) % 7;
  d.setUTCDate(d.getUTCDate() - offset);
  return d;
}

function usDstRange(year: number): { start: Date; end: Date } {
  return {
    start: nthWeekdayOfMonth(year, 2, 0, 2),
    end: nthWeekdayOfMonth(year, 10, 0, 1),
  };
}

function euDstRange(year: number): { start: Date; end: Date } {
  return {
    start: lastWeekdayOfMonth(year, 2, 0),
    end: lastWeekdayOfMonth(year, 9, 0),
  };
}

function southDstRange(year: number): { startInYear: Date; endInYear: Date } {
  return {
    startInYear: nthWeekdayOfMonth(year, 9, 0, 1),
    endInYear: nthWeekdayOfMonth(year, 3, 0, 1),
  };
}

function formatOffset(off: number): string {
  const sign = off >= 0 ? "+" : "-";
  const abs = Math.abs(off);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `UTC${sign}${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}`;
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function DaylightSavingsLookup() {
  const [cityIdx, setCityIdx] = useState(0);
  const [date, setDate] = useState("2026-07-15");

  const result = useMemo(() => {
    const city = CITIES[cityIdx];
    const d = new Date(date + "T12:00:00Z");
    if (!Number.isFinite(d.getTime())) return null;
    const year = d.getUTCFullYear();

    if (city.rule.kind === "none") {
      return {
        city,
        inDst: false as const,
        offset: city.rule.offsetStd,
        status: "NA",
        nextTransition: null,
        note: "This location does not observe Daylight Saving Time.",
      };
    }

    if (city.rule.kind === "us") {
      const { start, end } = usDstRange(year);
      const inDst = d >= start && d < end;
      let next: Date;
      if (d < start) next = start;
      else if (d < end) next = end;
      else next = usDstRange(year + 1).start;
      return {
        city,
        inDst,
        offset: inDst ? city.rule.offsetDst : city.rule.offsetStd,
        status: inDst ? "YES" : "NO",
        nextTransition: fmtDate(next),
        note: inDst
          ? "Daylight Saving Time is active (2nd Sun Mar to 1st Sun Nov)."
          : "Standard Time is active.",
      };
    }

    if (city.rule.kind === "eu") {
      const { start, end } = euDstRange(year);
      const inDst = d >= start && d < end;
      let next: Date;
      if (d < start) next = start;
      else if (d < end) next = end;
      else next = euDstRange(year + 1).start;
      return {
        city,
        inDst,
        offset: inDst ? city.rule.offsetDst : city.rule.offsetStd,
        status: inDst ? "YES" : "NO",
        nextTransition: fmtDate(next),
        note: inDst
          ? "Summer Time is active (last Sun Mar to last Sun Oct)."
          : "Standard Time is active.",
      };
    }

    const { startInYear, endInYear } = southDstRange(year);
    const inDst = d >= startInYear || d < endInYear;
    let next: Date;
    if (d < endInYear) next = endInYear;
    else if (d < startInYear) next = startInYear;
    else next = nthWeekdayOfMonth(year + 1, 3, 0, 1);
    return {
      city,
      inDst,
      offset: inDst ? city.rule.offsetDst : city.rule.offsetStd,
      status: inDst ? "YES" : "NO",
      nextTransition: fmtDate(next),
      note: inDst
        ? "Southern Hemisphere DST is active (1st Sun Oct to 1st Sun Apr)."
        : "Standard Time is active.",
    };
  }, [cityIdx, date]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            City
          </label>
          <select
            value={cityIdx}
            onChange={(e) => setCityIdx(parseInt(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {CITIES.map((c, i) => (
              <option key={c.name} value={i}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {result && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                DST in effect?
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.status}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Offset from UTC
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {formatOffset(result.offset)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Next DST transition
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.nextTransition ?? "—"}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-800">
              {result.city.name} &mdash; {result.city.tz}
            </div>
            <div className="mt-1">{result.note}</div>
          </div>
        </>
      )}
    </div>
  );
}
