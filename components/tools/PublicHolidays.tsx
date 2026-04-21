"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * date.nager.at public-holiday API — free, CORS-ok, no key.
 *   GET https://date.nager.at/api/v3/PublicHolidays/{year}/{country}
 * We also fetch the country list once, so new countries appear automatically
 * if the upstream adds them.
 */

interface Holiday {
  date: string;           // ISO yyyy-mm-dd
  localName: string;
  name: string;
  types: string[];
  global: boolean;
  counties?: string[] | null;
}

interface Country {
  countryCode: string;
  name: string;
}

// Small preferred-order set so the dropdown opens on something useful; the
// rest get appended alphabetically.
const PRIORITY = ["US", "GB", "CA", "AU", "DE", "FR", "ES", "IT", "NL", "JP", "IN"];

type Status = "loading" | "ok" | "empty" | "error";

export function PublicHolidays() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [countryCode, setCountryCode] = useState("US");
  const [countries, setCountries] = useState<Country[]>([]);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  // Load country list once.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(
          "https://date.nager.at/api/v3/AvailableCountries",
          { cache: "force-cache" },
        );
        if (!res.ok) throw new Error();
        const data = (await res.json()) as Country[];
        if (!alive) return;
        setCountries(sortCountries(data));
      } catch {
        // Fallback: minimal hardcoded list so the tool still works.
        if (!alive) return;
        setCountries([
          { countryCode: "US", name: "United States" },
          { countryCode: "GB", name: "United Kingdom" },
          { countryCode: "CA", name: "Canada" },
          { countryCode: "AU", name: "Australia" },
          { countryCode: "DE", name: "Germany" },
          { countryCode: "FR", name: "France" },
        ]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Fetch holidays whenever country/year change.
  useEffect(() => {
    let alive = true;
    setStatus("loading");
    (async () => {
      try {
        const res = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
          { cache: "no-store" },
        );
        if (!res.ok) throw new Error();
        const data = (await res.json()) as Holiday[];
        if (!alive) return;
        setHolidays(data);
        setStatus(data.length ? "ok" : "empty");
      } catch {
        if (!alive) return;
        setHolidays([]);
        setStatus("error");
      }
    })();
    return () => {
      alive = false;
    };
  }, [countryCode, year]);

  const grouped = useMemo(() => groupByMonth(holidays), [holidays]);
  const todayIso = new Date().toISOString().slice(0, 10);
  const selectedCountry =
    countries.find((c) => c.countryCode === countryCode)?.name ?? countryCode;

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[2fr_1fr]">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Country
          </span>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {countries.map((c) => (
              <option key={c.countryCode} value={c.countryCode}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Year
          </span>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {yearOptions().map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>
      </div>

      {status === "loading" && (
        <div className="h-40 animate-pulse rounded-xl bg-slate-100" />
      )}

      {status === "error" && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          Couldn&rsquo;t reach the holidays service. Try a different country or
          refresh the page.
        </div>
      )}

      {status === "empty" && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          No public holidays published for {selectedCountry} in {year}.
        </div>
      )}

      {status === "ok" && (
        <div className="space-y-5">
          <p className="text-sm text-slate-600">
            <span className="font-semibold text-slate-900">
              {holidays.length}
            </span>{" "}
            public {holidays.length === 1 ? "holiday" : "holidays"} in{" "}
            {selectedCountry}, {year}.
          </p>
          <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
            {grouped.map(([month, items]) => (
              <section key={month} className="p-4 sm:p-5">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {month}
                </h3>
                <ul className="space-y-2">
                  {items.map((h) => (
                    <HolidayRow
                      key={`${h.date}-${h.name}`}
                      holiday={h}
                      isToday={h.date === todayIso}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Dates from{" "}
        <a
          href="https://date.nager.at/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-dotted underline-offset-2 hover:text-slate-700"
        >
          Nager.Date
        </a>
        . Regional holidays (observed in specific states or counties) are
        included when the source marks them.
      </p>
    </div>
  );
}

function HolidayRow({
  holiday,
  isToday,
}: {
  holiday: Holiday;
  isToday: boolean;
}) {
  const [y, m, d] = holiday.date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const weekday = dt.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "UTC",
  });
  const day = dt.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
  const localMatches = holiday.localName === holiday.name;

  return (
    <li className="flex items-start gap-4">
      <div className="w-20 shrink-0 text-sm">
        <p className="font-semibold tabular-nums text-slate-900">{day}</p>
        <p className="text-xs text-slate-500">{weekday}</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-slate-900">
          {holiday.localName}
          {isToday && (
            <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-800">
              Today
            </span>
          )}
        </p>
        {!localMatches && (
          <p className="text-xs text-slate-500">{holiday.name}</p>
        )}
        {!holiday.global && holiday.counties?.length ? (
          <p className="mt-0.5 text-xs text-slate-500">
            Observed in: {holiday.counties.join(", ")}
          </p>
        ) : null}
      </div>
    </li>
  );
}

function groupByMonth(items: Holiday[]): [string, Holiday[]][] {
  const buckets = new Map<string, Holiday[]>();
  for (const h of items) {
    const [y, m] = h.date.split("-").map(Number);
    const label = new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    (buckets.get(label) ?? buckets.set(label, []).get(label)!).push(h);
  }
  return Array.from(buckets.entries());
}

function sortCountries(list: Country[]): Country[] {
  const priority = PRIORITY.map((code) => list.find((c) => c.countryCode === code)).filter(
    (c): c is Country => Boolean(c),
  );
  const rest = list
    .filter((c) => !PRIORITY.includes(c.countryCode))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...priority, ...rest];
}

function yearOptions(): number[] {
  const now = new Date().getFullYear();
  const out: number[] = [];
  for (let y = now - 2; y <= now + 3; y++) out.push(y);
  return out;
}
