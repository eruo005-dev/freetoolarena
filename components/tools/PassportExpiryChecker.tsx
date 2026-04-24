"use client";

import { useMemo, useState } from "react";

type Rule = "six" | "three" | "entry";

type Country = {
  name: string;
  rule: Rule;
};

const COUNTRIES: Country[] = [
  { name: "Schengen Area (most of EU)", rule: "six" },
  { name: "France", rule: "six" },
  { name: "Germany", rule: "six" },
  { name: "Italy", rule: "six" },
  { name: "Spain", rule: "six" },
  { name: "Netherlands", rule: "six" },
  { name: "Portugal", rule: "six" },
  { name: "Greece", rule: "six" },
  { name: "Switzerland", rule: "six" },
  { name: "Thailand", rule: "six" },
  { name: "Vietnam", rule: "six" },
  { name: "China", rule: "six" },
  { name: "India", rule: "six" },
  { name: "Indonesia", rule: "six" },
  { name: "Malaysia", rule: "six" },
  { name: "Philippines", rule: "six" },
  { name: "Singapore", rule: "six" },
  { name: "Japan", rule: "entry" },
  { name: "South Korea", rule: "entry" },
  { name: "United Arab Emirates", rule: "six" },
  { name: "Qatar", rule: "six" },
  { name: "Saudi Arabia", rule: "six" },
  { name: "Turkey", rule: "six" },
  { name: "Egypt", rule: "six" },
  { name: "South Africa", rule: "three" },
  { name: "Brazil", rule: "six" },
  { name: "Argentina", rule: "six" },
  { name: "Chile", rule: "six" },
  { name: "Peru", rule: "six" },
  { name: "Mexico", rule: "three" },
  { name: "Canada", rule: "entry" },
  { name: "United States", rule: "entry" },
  { name: "United Kingdom", rule: "entry" },
  { name: "Ireland", rule: "entry" },
  { name: "Australia", rule: "entry" },
  { name: "New Zealand", rule: "three" },
  { name: "Russia", rule: "six" },
];

const RULE_LABEL: Record<Rule, string> = {
  six: "6 months past departure",
  three: "3 months past departure",
  entry: "Valid at entry",
};

function daysBetween(a: string, b: string) {
  const da = new Date(a).getTime();
  const db = new Date(b).getTime();
  if (!Number.isFinite(da) || !Number.isFinite(db)) return NaN;
  return Math.floor((da - db) / (1000 * 60 * 60 * 24));
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function addYears(iso: string, years: number) {
  const d = new Date(iso);
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().slice(0, 10);
}

function addDays(iso: string, days: number) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function PassportExpiryChecker() {
  const today = todayISO();
  const [expiry, setExpiry] = useState(addYears(today, 2));
  const [departure, setDeparture] = useState(addDays(today, 60));
  const [returnDate, setReturnDate] = useState(addDays(today, 74));
  const [country, setCountry] = useState(COUNTRIES[0].name);

  const result = useMemo(() => {
    const picked = COUNTRIES.find((c) => c.name === country);
    if (!picked) return null;
    const atDeparture = daysBetween(expiry, departure);
    const atReturn = daysBetween(expiry, returnDate);
    if (!Number.isFinite(atDeparture) || !Number.isFinite(atReturn)) return null;

    const required =
      picked.rule === "six" ? 180 : picked.rule === "three" ? 90 : 1;

    const passes =
      picked.rule === "entry"
        ? atDeparture >= 0
        : atDeparture >= required;

    const buffer = atDeparture - required;

    return {
      picked,
      atDeparture,
      atReturn,
      required,
      passes,
      buffer,
    };
  }, [expiry, departure, returnDate, country]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Passport expiration date
          </span>
          <input
            type="date"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Destination country
          </span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {COUNTRIES.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} &mdash; {RULE_LABEL[c.rule]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Planned departure
          </span>
          <input
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Scheduled return
          </span>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Validity at departure
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.atDeparture} days
              </div>
              <div className="text-xs text-slate-600">
                Rule requires {result.required}+ days
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Validity at return
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.atReturn} days
              </div>
              <div className="text-xs text-slate-600">
                {result.atReturn < 0 ? "Expires before you return" : "Still valid on return"}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Meets destination rule
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.passes ? "Pass" : "Fail"}
              </div>
              <div className="text-xs text-slate-600">
                Buffer: {result.buffer >= 0 ? "+" : ""}
                {result.buffer} days
              </div>
            </div>
          </div>

          {!result.passes ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
              <div className="mb-1 font-semibold">Renew your passport</div>
              Your passport doesn&rsquo;t meet {result.picked.name}&rsquo;s validity
              requirement for this trip. Most airlines will refuse boarding at
              check-in, so start the renewal process now.
            </div>
          ) : result.picked.rule === "six" && result.atDeparture < 210 ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="mb-1 font-semibold">Cutting it close</div>
              {result.picked.name} enforces a 6-month rule. You pass today, but
              consider renewing before your next trip to avoid surprises.
            </div>
          ) : null}
        </>
      ) : null}

      <p className="text-xs text-slate-500">
        Rules are summarized for the most common traveler cases. Always confirm
        with the destination&rsquo;s embassy or your airline before booking.
      </p>
    </div>
  );
}
