"use client";

import { useMemo, useState } from "react";

const COUNTRY_BY_FIRST: Record<string, string> = {
  "1": "United States",
  "4": "United States",
  "5": "United States",
  "2": "Canada",
  "3": "Mexico",
  J: "Japan",
  K: "Korea",
  L: "China",
  S: "United Kingdom",
  V: "France",
  W: "Germany",
  Z: "Italy",
  "9": "Brazil",
  Y: "Sweden / Finland",
  T: "Switzerland / Czechia",
};

const WMI_BY_PREFIX: Record<string, string> = {
  "1H": "Honda (US)",
  "1F": "Ford (US)",
  "1G": "General Motors (US)",
  "1C": "Chrysler (US)",
  "1N": "Nissan (US)",
  "1V": "Volkswagen (US)",
  "2H": "Honda (Canada)",
  "2T": "Toyota (Canada)",
  "3F": "Ford (Mexico)",
  "3N": "Nissan (Mexico)",
  "4T": "Toyota (US)",
  "5Y": "Mazda (US)",
  JH: "Honda (Japan)",
  JM: "Mazda (Japan)",
  JN: "Nissan (Japan)",
  JT: "Toyota (Japan)",
  JF: "Subaru (Japan)",
  KM: "Hyundai (Korea)",
  KN: "Kia (Korea)",
  LF: "BYD (China)",
  SA: "Jaguar / Land Rover (UK)",
  VF: "Renault / Peugeot (France)",
  WA: "Audi (Germany)",
  WB: "BMW (Germany)",
  WP: "Porsche (Germany)",
  WD: "Mercedes-Benz (Germany)",
  WV: "Volkswagen (Germany)",
  ZF: "Ferrari (Italy)",
  ZA: "Alfa Romeo / Fiat (Italy)",
};

// 30-year year code cycle (1980-2009 and 2010-2039 repeat)
const YEAR_CODES: Record<string, number[]> = {
  A: [1980, 2010],
  B: [1981, 2011],
  C: [1982, 2012],
  D: [1983, 2013],
  E: [1984, 2014],
  F: [1985, 2015],
  G: [1986, 2016],
  H: [1987, 2017],
  J: [1988, 2018],
  K: [1989, 2019],
  L: [1990, 2020],
  M: [1991, 2021],
  N: [1992, 2022],
  P: [1993, 2023],
  R: [1994, 2024],
  S: [1995, 2025],
  T: [1996, 2026],
  V: [1997, 2027],
  W: [1998, 2028],
  X: [1999, 2029],
  Y: [2000, 2030],
  "1": [2001, 2031],
  "2": [2002, 2032],
  "3": [2003, 2033],
  "4": [2004, 2034],
  "5": [2005, 2035],
  "6": [2006, 2036],
  "7": [2007, 2037],
  "8": [2008, 2038],
  "9": [2009, 2039],
};

type Decode =
  | { ok: false; error: string }
  | {
      ok: true;
      wmi: string;
      country: string;
      brand: string;
      yearChar: string;
      yearGuesses: number[];
      plantCode: string;
      serial: string;
    };

function decode(vin: string): Decode {
  const v = vin.trim().toUpperCase();
  if (v.length !== 17) return { ok: false, error: "VIN must be exactly 17 characters." };
  if (/[IOQ]/.test(v)) return { ok: false, error: "VIN cannot contain the letters I, O, or Q." };
  if (!/^[A-HJ-NPR-Z0-9]+$/.test(v)) return { ok: false, error: "VIN contains invalid characters." };

  const wmi = v.slice(0, 3);
  const country = COUNTRY_BY_FIRST[v[0]] ?? "Unknown region";
  const twoCharKey = v.slice(0, 2);
  const brand = WMI_BY_PREFIX[twoCharKey] ?? "Unknown manufacturer (see NHTSA decoder)";
  const yearChar = v[9];
  const yearGuesses = YEAR_CODES[yearChar] ?? [];
  const plantCode = v[10];
  const serial = v.slice(11, 17);

  return { ok: true, wmi, country, brand, yearChar, yearGuesses, plantCode, serial };
}

export function VinDecoder() {
  const [vin, setVin] = useState("1HGCM82633A123456");

  const decoded = useMemo(() => decode(vin), [vin]);

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">17-character VIN</span>
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value.toUpperCase())}
          maxLength={17}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono uppercase tracking-wider"
          placeholder="1HGCM82633A123456"
        />
        <span className="mt-1 block text-xs text-slate-500">
          Letters I, O, and Q are never used in VINs to avoid confusion with 1 and 0.
        </span>
      </label>

      {!decoded.ok && (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{decoded.error}</div>
      )}

      {decoded.ok && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">WMI (positions 1&ndash;3)</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{decoded.wmi}</div>
              <div className="text-sm text-slate-600">{decoded.country}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Likely manufacturer</div>
              <div className="text-lg font-semibold text-brand">{decoded.brand}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Model year (position 10 = &ldquo;{decoded.yearChar}&rdquo;)
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {decoded.yearGuesses.length ? decoded.yearGuesses.join(" or ") : "Unknown"}
              </div>
              <div className="text-xs text-slate-500">Year codes repeat every 30 years.</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Plant code (position 11)</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{decoded.plantCode}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Sequential serial (positions 12&ndash;17)
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{decoded.serial}</div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            This decoder uses hardcoded WMI and year tables and covers common manufacturers. For the full
            VDS (positions 4&ndash;9) &mdash; engine, body, trim, restraint &mdash; use the NHTSA VIN decoder at
            vpic.nhtsa.dot.gov.
          </div>
        </>
      )}
    </div>
  );
}
