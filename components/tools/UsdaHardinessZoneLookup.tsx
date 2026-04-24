"use client";

import { useMemo, useState } from "react";

type ZoneInfo = {
  zoneRange: string;
  minTempF: string;
  region: string;
  plants: string;
  frostMonths: string;
};

const PREFIX_MAP: Record<string, Omit<ZoneInfo, "plants" | "frostMonths">> = {
  "03": { zoneRange: "3-5", minTempF: "-40 to -10 F", region: "Northern New England (ME/NH/VT)" },
  "04": { zoneRange: "3-5", minTempF: "-40 to -10 F", region: "Maine" },
  "01": { zoneRange: "5-7", minTempF: "-20 to 10 F", region: "Massachusetts" },
  "02": { zoneRange: "5-7", minTempF: "-20 to 10 F", region: "MA / CT / RI" },
  "06": { zoneRange: "6-7", minTempF: "-10 to 10 F", region: "Connecticut" },
  "08": { zoneRange: "7", minTempF: "0 to 10 F", region: "Southern New Jersey" },
  "09": { zoneRange: "7", minTempF: "0 to 10 F", region: "Southern New Jersey" },
  "10": { zoneRange: "7a", minTempF: "0 to 5 F", region: "New York City metro" },
  "11": { zoneRange: "7a", minTempF: "0 to 5 F", region: "Long Island / NYC" },
  "19": { zoneRange: "7a", minTempF: "0 to 5 F", region: "Delaware / Eastern PA" },
  "20": { zoneRange: "7", minTempF: "0 to 10 F", region: "DC / Maryland" },
  "21": { zoneRange: "7", minTempF: "0 to 10 F", region: "Maryland" },
  "30": { zoneRange: "8", minTempF: "10 to 20 F", region: "Georgia" },
  "31": { zoneRange: "8", minTempF: "10 to 20 F", region: "Georgia" },
  "32": { zoneRange: "9-11", minTempF: "20 to 40 F", region: "Florida" },
  "33": { zoneRange: "9-11", minTempF: "20 to 40 F", region: "Florida" },
  "34": { zoneRange: "9-11", minTempF: "20 to 40 F", region: "Florida" },
  "40": { zoneRange: "6-7", minTempF: "-10 to 10 F", region: "Kentucky" },
  "41": { zoneRange: "6-7", minTempF: "-10 to 10 F", region: "Kentucky" },
  "42": { zoneRange: "6-7", minTempF: "-10 to 10 F", region: "Kentucky" },
  "50": { zoneRange: "4-5", minTempF: "-30 to -10 F", region: "Iowa" },
  "51": { zoneRange: "4-5", minTempF: "-30 to -10 F", region: "Iowa" },
  "52": { zoneRange: "4-5", minTempF: "-30 to -10 F", region: "Iowa" },
  "60": { zoneRange: "5-6", minTempF: "-20 to 0 F", region: "Illinois" },
  "61": { zoneRange: "5-6", minTempF: "-20 to 0 F", region: "Illinois" },
  "62": { zoneRange: "5-6", minTempF: "-20 to 0 F", region: "Illinois" },
  "70": { zoneRange: "8-9", minTempF: "10 to 30 F", region: "Louisiana" },
  "71": { zoneRange: "8-9", minTempF: "10 to 30 F", region: "Louisiana" },
  "77": { zoneRange: "8-9", minTempF: "10 to 30 F", region: "South Texas" },
  "78": { zoneRange: "8-9", minTempF: "10 to 30 F", region: "South Texas" },
  "79": { zoneRange: "8-9", minTempF: "10 to 30 F", region: "South Texas" },
  "80": { zoneRange: "4-6", minTempF: "-30 to 0 F", region: "Colorado" },
  "81": { zoneRange: "4-6", minTempF: "-30 to 0 F", region: "Colorado" },
  "85": { zoneRange: "9", minTempF: "20 to 30 F", region: "Arizona" },
  "87": { zoneRange: "5-8", minTempF: "-20 to 20 F", region: "New Mexico" },
  "88": { zoneRange: "5-8", minTempF: "-20 to 20 F", region: "New Mexico" },
  "89": { zoneRange: "5-9", minTempF: "-20 to 30 F", region: "Nevada" },
  "90": { zoneRange: "9-10", minTempF: "20 to 40 F", region: "Southern California" },
  "91": { zoneRange: "9-10", minTempF: "20 to 40 F", region: "Southern California" },
  "92": { zoneRange: "9-10", minTempF: "20 to 40 F", region: "Southern California" },
  "93": { zoneRange: "9-10", minTempF: "20 to 40 F", region: "Southern California" },
  "94": { zoneRange: "9", minTempF: "20 to 30 F", region: "Northern California" },
  "95": { zoneRange: "9", minTempF: "20 to 30 F", region: "Northern California" },
  "96": { zoneRange: "9", minTempF: "20 to 30 F", region: "Northern California" },
  "97": { zoneRange: "6-9", minTempF: "-10 to 30 F", region: "Oregon" },
  "98": { zoneRange: "6-9", minTempF: "-10 to 30 F", region: "Washington" },
  "99": { zoneRange: "6-9", minTempF: "-10 to 30 F", region: "Washington" },
};

function plantsForZone(zoneRange: string): string {
  const first = parseInt(zoneRange, 10);
  if (!Number.isFinite(first)) return "Varies by microclimate";
  if (first <= 4) return "Apples, rhubarb, kale, peas, spinach, hardy herbs (chives, mint)";
  if (first <= 6) return "Tomatoes, peppers, beans, squash, most herbs, apples, blueberries";
  if (first <= 7) return "Figs, peaches, most annual vegetables, lavender, rosemary";
  if (first <= 8) return "Okra, sweet potatoes, citrus (protected), pomegranate, olives";
  return "Citrus, avocado, mango, papaya, bananas, year-round greens";
}

function frostMonthsForZone(zoneRange: string): string {
  const first = parseInt(zoneRange, 10);
  if (!Number.isFinite(first)) return "Oct-Apr typical";
  if (first <= 4) return "Sep-May (very long frost season)";
  if (first <= 6) return "Oct-Apr";
  if (first <= 7) return "Nov-Mar";
  if (first <= 8) return "Dec-Feb";
  return "Rare frost (Jan only, if any)";
}

export function UsdaHardinessZoneLookup() {
  const [zip, setZip] = useState("10001");

  const result = useMemo<ZoneInfo | null>(() => {
    const clean = zip.trim();
    if (!/^\d{5}$/.test(clean)) return null;
    const prefix = clean.slice(0, 2);
    const base = PREFIX_MAP[prefix] ?? {
      zoneRange: "6-7 average",
      minTempF: "-10 to 10 F",
      region: "US average (default)",
    };
    return {
      ...base,
      plants: plantsForZone(base.zoneRange),
      frostMonths: frostMonthsForZone(base.zoneRange),
    };
  }, [zip]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">US ZIP code (5 digits)</label>
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          inputMode="numeric"
          maxLength={5}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          placeholder="10001"
        />
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">USDA hardiness zone</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">Zone {result.zoneRange}</div>
            <div className="mt-1 text-sm text-slate-600">{result.region}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Avg winter minimum temperature</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{result.minTempF}</div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Recommended plants</div>
              <div className="mt-1 text-sm text-slate-700">{result.plants}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Frost-risk months</div>
              <div className="mt-1 text-sm text-slate-700">{result.frostMonths}</div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Approximate regional rollup by ZIP prefix. For precise zones, check the USDA Plant Hardiness Zone Map
            &mdash; microclimates, elevation, and urban heat islands can shift your zone by a half-step.
          </p>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Enter a valid 5-digit US ZIP code to see your growing zone.
        </div>
      )}
    </div>
  );
}
