"use client";

import { useMemo, useState } from "react";

type Norms = {
  currency: string;
  restaurants: string;
  taxis: string;
  hotels: string;
  bars: string;
  percent: { small: number; standard: number; generous: number };
};

const COUNTRIES: Record<string, Norms> = {
  "United States": {
    currency: "USD",
    restaurants: "18&ndash;22% expected; often pre-added for groups",
    taxis: "15&ndash;20% of fare",
    hotels: "$1&ndash;2 per bag; $2&ndash;5 per night for housekeeping",
    bars: "$1&ndash;2 per drink or 20% on a tab",
    percent: { small: 15, standard: 20, generous: 25 },
  },
  "United Kingdom": {
    currency: "GBP",
    restaurants: "10&ndash;12.5% (often added as service charge)",
    taxis: "Round up to the nearest pound",
    hotels: "Porter \u00a31&ndash;2 per bag; housekeeping optional",
    bars: "Not expected &mdash; offer the bartender a drink instead",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  France: {
    currency: "EUR",
    restaurants: "Service compris; round up or leave a few euros",
    taxis: "Round up to the nearest euro",
    hotels: "\u20ac1&ndash;2 per bag for porters",
    bars: "Not expected",
    percent: { small: 2, standard: 5, generous: 10 },
  },
  Germany: {
    currency: "EUR",
    restaurants: "5&ndash;10%, announced when paying",
    taxis: "Round up 5&ndash;10%",
    hotels: "\u20ac1&ndash;2 per bag",
    bars: "Round up to the next euro",
    percent: { small: 5, standard: 8, generous: 10 },
  },
  Italy: {
    currency: "EUR",
    restaurants: "Coperto covers it; round up for great service",
    taxis: "Round up",
    hotels: "\u20ac1&ndash;2 per bag",
    bars: "Not expected",
    percent: { small: 2, standard: 5, generous: 10 },
  },
  Spain: {
    currency: "EUR",
    restaurants: "5&ndash;10% for good service",
    taxis: "Round up",
    hotels: "\u20ac1&ndash;2 per bag",
    bars: "Not expected",
    percent: { small: 3, standard: 7, generous: 10 },
  },
  Portugal: {
    currency: "EUR",
    restaurants: "5&ndash;10%",
    taxis: "Round up",
    hotels: "\u20ac1 per bag",
    bars: "Not expected",
    percent: { small: 3, standard: 7, generous: 10 },
  },
  Netherlands: {
    currency: "EUR",
    restaurants: "5&ndash;10% for good service",
    taxis: "Round up 5&ndash;10%",
    hotels: "\u20ac1&ndash;2 per bag",
    bars: "Round up",
    percent: { small: 3, standard: 7, generous: 10 },
  },
  Switzerland: {
    currency: "CHF",
    restaurants: "Service included; round up for great service",
    taxis: "Round up",
    hotels: "CHF 2 per bag",
    bars: "Round up",
    percent: { small: 2, standard: 5, generous: 10 },
  },
  Sweden: {
    currency: "SEK",
    restaurants: "5&ndash;10% optional",
    taxis: "Round up",
    hotels: "Not expected",
    bars: "Not expected",
    percent: { small: 3, standard: 7, generous: 10 },
  },
  Norway: {
    currency: "NOK",
    restaurants: "5&ndash;10% optional",
    taxis: "Round up",
    hotels: "Not expected",
    bars: "Not expected",
    percent: { small: 3, standard: 7, generous: 10 },
  },
  Denmark: {
    currency: "DKK",
    restaurants: "Included; round up if you wish",
    taxis: "Round up",
    hotels: "Not expected",
    bars: "Not expected",
    percent: { small: 2, standard: 5, generous: 10 },
  },
  Finland: {
    currency: "EUR",
    restaurants: "Not expected; round up for great service",
    taxis: "Not expected",
    hotels: "Not expected",
    bars: "Not expected",
    percent: { small: 2, standard: 5, generous: 10 },
  },
  Ireland: {
    currency: "EUR",
    restaurants: "10&ndash;12.5% if not already added",
    taxis: "Round up",
    hotels: "\u20ac1&ndash;2 per bag",
    bars: "Not expected",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Greece: {
    currency: "EUR",
    restaurants: "5&ndash;10%",
    taxis: "Round up",
    hotels: "\u20ac1 per bag",
    bars: "Round up",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Turkey: {
    currency: "TRY",
    restaurants: "10%",
    taxis: "Round up",
    hotels: "Small amount per bag",
    bars: "Round up",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Japan: {
    currency: "JPY",
    restaurants: "Do not tip &mdash; can be offensive",
    taxis: "Do not tip",
    hotels: "Do not tip",
    bars: "Do not tip",
    percent: { small: 0, standard: 0, generous: 0 },
  },
  China: {
    currency: "CNY",
    restaurants: "Officially none; 10% creeping in at international hotels",
    taxis: "Not expected",
    hotels: "Not expected outside high-end international brands",
    bars: "Not expected",
    percent: { small: 0, standard: 0, generous: 10 },
  },
  "South Korea": {
    currency: "KRW",
    restaurants: "Not expected",
    taxis: "Not expected",
    hotels: "Not expected",
    bars: "Not expected",
    percent: { small: 0, standard: 0, generous: 0 },
  },
  Thailand: {
    currency: "THB",
    restaurants: "10% or round up",
    taxis: "Round up",
    hotels: "20&ndash;40 THB per bag",
    bars: "Round up",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Vietnam: {
    currency: "VND",
    restaurants: "5&ndash;10% at tourist restaurants",
    taxis: "Round up",
    hotels: "20,000&ndash;50,000 VND per bag",
    bars: "Round up",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Singapore: {
    currency: "SGD",
    restaurants: "Service charge included; extra not expected",
    taxis: "Not expected",
    hotels: "S$1&ndash;2 per bag",
    bars: "Not expected",
    percent: { small: 0, standard: 5, generous: 10 },
  },
  Malaysia: {
    currency: "MYR",
    restaurants: "Service charge included",
    taxis: "Not expected",
    hotels: "RM 5 per bag",
    bars: "Not expected",
    percent: { small: 0, standard: 5, generous: 10 },
  },
  Indonesia: {
    currency: "IDR",
    restaurants: "Service charge included; small extra welcome",
    taxis: "Round up",
    hotels: "10,000&ndash;20,000 IDR per bag",
    bars: "Round up",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Philippines: {
    currency: "PHP",
    restaurants: "10% if service charge not added",
    taxis: "Round up",
    hotels: "\u20b150&ndash;100 per bag",
    bars: "Round up",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  India: {
    currency: "INR",
    restaurants: "10% if not already on the bill",
    taxis: "Round up",
    hotels: "\u20b950&ndash;100 per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  "United Arab Emirates": {
    currency: "AED",
    restaurants: "10&ndash;15%, often added as service",
    taxis: "Round up",
    hotels: "AED 5&ndash;10 per bag",
    bars: "10%",
    percent: { small: 5, standard: 12, generous: 15 },
  },
  "Saudi Arabia": {
    currency: "SAR",
    restaurants: "Service charge common; 5&ndash;10% appreciated",
    taxis: "Round up",
    hotels: "SAR 5 per bag",
    bars: "N/A",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Egypt: {
    currency: "EGP",
    restaurants: "10% on top of service charge",
    taxis: "Round up generously",
    hotels: "EGP 20&ndash;50 per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Morocco: {
    currency: "MAD",
    restaurants: "10%",
    taxis: "Round up",
    hotels: "MAD 10&ndash;20 per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  "South Africa": {
    currency: "ZAR",
    restaurants: "10&ndash;15%",
    taxis: "10%",
    hotels: "R10&ndash;20 per bag",
    bars: "10%",
    percent: { small: 5, standard: 12, generous: 15 },
  },
  Kenya: {
    currency: "KES",
    restaurants: "5&ndash;10%",
    taxis: "Round up",
    hotels: "KES 100&ndash;200 per bag",
    bars: "Round up",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Mexico: {
    currency: "MXN",
    restaurants: "10&ndash;15%",
    taxis: "Not expected for street cabs; 10% for app rides",
    hotels: "$1&ndash;2 per bag; housekeeping similar",
    bars: "10%",
    percent: { small: 10, standard: 15, generous: 20 },
  },
  Brazil: {
    currency: "BRL",
    restaurants: "10% service charge usually added",
    taxis: "Round up",
    hotels: "R$5 per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Argentina: {
    currency: "ARS",
    restaurants: "10%",
    taxis: "Round up",
    hotels: "Small amount per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Chile: {
    currency: "CLP",
    restaurants: "10% often added",
    taxis: "Not expected",
    hotels: "CLP 1,000 per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Peru: {
    currency: "PEN",
    restaurants: "10% if not added",
    taxis: "Not expected",
    hotels: "S/5 per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  Canada: {
    currency: "CAD",
    restaurants: "15&ndash;20%",
    taxis: "15%",
    hotels: "C$2 per bag; C$2&ndash;5 per night",
    bars: "C$1&ndash;2 per drink",
    percent: { small: 12, standard: 18, generous: 22 },
  },
  Australia: {
    currency: "AUD",
    restaurants: "10% for good service; not expected",
    taxis: "Not expected",
    hotels: "Not expected",
    bars: "Not expected",
    percent: { small: 5, standard: 10, generous: 15 },
  },
  "New Zealand": {
    currency: "NZD",
    restaurants: "Not expected; round up for great service",
    taxis: "Not expected",
    hotels: "Not expected",
    bars: "Not expected",
    percent: { small: 0, standard: 5, generous: 10 },
  },
  Russia: {
    currency: "RUB",
    restaurants: "10%",
    taxis: "Round up",
    hotels: "100&ndash;200 RUB per bag",
    bars: "10%",
    percent: { small: 5, standard: 10, generous: 15 },
  },
};

export function TipByCountryLookup() {
  const [country, setCountry] = useState("United States");
  const [bill, setBill] = useState(50);

  const info = COUNTRIES[country];

  const tips = useMemo(() => {
    if (!info) return null;
    const b = Number(bill);
    if (!Number.isFinite(b) || b < 0) return null;
    const small = (b * info.percent.small) / 100;
    const standard = (b * info.percent.standard) / 100;
    const generous = (b * info.percent.generous) / 100;
    return { small, standard, generous };
  }, [bill, info]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Tipping culture changes. When in doubt, local staff appreciate being
        asked politely &mdash; a quick &ldquo;is tipping customary here?&rdquo;
        goes a long way.
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Country</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {Object.keys(COUNTRIES).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">
            Bill amount ({info?.currency ?? ""})
          </span>
          <input
            type="number"
            min={0}
            step={0.01}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {info ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <div className="mb-1 font-medium text-slate-900">Restaurants</div>
            <div
              className="text-slate-700"
              dangerouslySetInnerHTML={{ __html: info.restaurants }}
            />
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <div className="mb-1 font-medium text-slate-900">Taxis &amp; rideshare</div>
            <div
              className="text-slate-700"
              dangerouslySetInnerHTML={{ __html: info.taxis }}
            />
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <div className="mb-1 font-medium text-slate-900">Hotels</div>
            <div
              className="text-slate-700"
              dangerouslySetInnerHTML={{ __html: info.hotels }}
            />
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-sm">
            <div className="mb-1 font-medium text-slate-900">Bars</div>
            <div
              className="text-slate-700"
              dangerouslySetInnerHTML={{ __html: info.bars }}
            />
          </div>
        </div>
      ) : null}

      {tips && info ? (
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Small ({info.percent.small}%)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {tips.small.toFixed(2)}
            </div>
            <div className="text-xs text-slate-600">{info.currency}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Standard ({info.percent.standard}%)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {tips.standard.toFixed(2)}
            </div>
            <div className="text-xs text-slate-600">{info.currency}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Generous ({info.percent.generous}%)
            </div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {tips.generous.toFixed(2)}
            </div>
            <div className="text-xs text-slate-600">{info.currency}</div>
          </div>
        </div>
      ) : null}

      <p className="text-xs text-slate-500">
        Norms summarized from common traveler guidance. Always check the bill
        for an auto-added service charge before adding more &mdash; double-tipping
        is the most common mistake.
      </p>
    </div>
  );
}
