"use client";

import { useMemo, useState } from "react";

type MeatKey = "beef" | "pork" | "poultry" | "fish" | "lamb" | "ground-meat";

interface DonenessLevel {
  label: string;
  tempF: number;
  description: string;
  usda?: boolean;
}

interface MeatProfile {
  label: string;
  levels: DonenessLevel[];
  restMinutes: number;
  note: string;
  usdaMin: number;
}

const MEATS: Record<MeatKey, MeatProfile> = {
  beef: {
    label: "Beef (steak, roast)",
    usdaMin: 145,
    restMinutes: 3,
    note: "USDA recommends 145°F minimum for whole cuts. Rare/medium-rare are chef recommendations, not USDA-endorsed.",
    levels: [
      { label: "Rare", tempF: 120, description: "Cool red center, very soft" },
      { label: "Medium-Rare", tempF: 130, description: "Warm red center, slight firmness" },
      { label: "Medium", tempF: 140, description: "Warm pink center, firmer" },
      { label: "Medium-Well", tempF: 150, description: "Slightly pink center" },
      { label: "Well Done", tempF: 160, description: "Little to no pink", usda: true },
    ],
  },
  pork: {
    label: "Pork (whole cuts)",
    usdaMin: 145,
    restMinutes: 3,
    note: "USDA lowered pork to 145°F in 2011. A slight blush of pink is safe.",
    levels: [
      { label: "Medium-Rare", tempF: 145, description: "USDA safe minimum, pink center", usda: true },
      { label: "Medium", tempF: 150, description: "Lightly pink" },
      { label: "Well Done", tempF: 160, description: "No pink, firm" },
    ],
  },
  poultry: {
    label: "Poultry (chicken, turkey)",
    usdaMin: 165,
    restMinutes: 3,
    note: "All poultry must hit 165°F in the thickest part to kill salmonella.",
    levels: [
      { label: "Safe (white meat)", tempF: 165, description: "USDA minimum", usda: true },
      { label: "Juicy thigh", tempF: 175, description: "Dark meat ideal" },
    ],
  },
  fish: {
    label: "Fish & Seafood",
    usdaMin: 145,
    restMinutes: 0,
    note: "Fish flakes easily at 145°F. Tuna/salmon often served medium-rare at ~125°F (chef, not USDA).",
    levels: [
      { label: "Rare (tuna/salmon)", tempF: 115, description: "Sashimi-style center" },
      { label: "Medium-Rare", tempF: 125, description: "Translucent, soft" },
      { label: "Medium", tempF: 135, description: "Lightly flaky" },
      { label: "USDA Safe", tempF: 145, description: "Flakes with a fork", usda: true },
    ],
  },
  lamb: {
    label: "Lamb (whole cuts)",
    usdaMin: 145,
    restMinutes: 3,
    note: "Lamb is traditionally served medium-rare to medium.",
    levels: [
      { label: "Rare", tempF: 125, description: "Cool red center" },
      { label: "Medium-Rare", tempF: 135, description: "Warm pink, most popular" },
      { label: "Medium", tempF: 145, description: "Light pink", usda: true },
      { label: "Well Done", tempF: 160, description: "No pink" },
    ],
  },
  "ground-meat": {
    label: "Ground Meat (beef, pork, lamb)",
    usdaMin: 160,
    restMinutes: 0,
    note: "Grinding spreads surface bacteria throughout — must reach 160°F.",
    levels: [
      { label: "USDA Safe", tempF: 160, description: "No pink, fully cooked", usda: true },
      { label: "Well Done", tempF: 170, description: "Dry but safe" },
    ],
  },
};

function toCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export function MeatDonenessTemperature() {
  const [meat, setMeat] = useState<MeatKey>("beef");

  const profile = useMemo(() => MEATS[meat], [meat]);

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="font-medium text-slate-700">Meat type</span>
        <select
          value={meat}
          onChange={(e) => setMeat(e.target.value as MeatKey)}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          {Object.entries(MEATS).map(([key, m]) => (
            <option key={key} value={key}>
              {m.label}
            </option>
          ))}
        </select>
      </label>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="text-sm text-slate-600">USDA safe minimum</div>
        <div className="mt-1 text-3xl font-bold text-brand">
          {profile.usdaMin}&deg;F <span className="text-xl text-slate-500">/ {Math.round(toCelsius(profile.usdaMin))}&deg;C</span>
        </div>
        <div className="mt-1 text-xs text-slate-500">Rest {profile.restMinutes} min after removing from heat</div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-3 text-sm font-semibold text-slate-700">Doneness chart</div>
        <div className="space-y-2">
          {profile.levels.map((lvl) => (
            <div
              key={lvl.label}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                lvl.usda ? "bg-brand/10 border border-brand/30" : "bg-slate-50"
              }`}
            >
              <div>
                <div className="font-medium text-slate-900">
                  {lvl.label}
                  {lvl.usda && <span className="ml-2 text-xs font-semibold text-brand">USDA SAFE</span>}
                </div>
                <div className="text-xs text-slate-500">{lvl.description}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">{lvl.tempF}&deg;F</div>
                <div className="text-xs text-slate-500">{Math.round(toCelsius(lvl.tempF))}&deg;C</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        <span className="font-semibold">Note:</span> {profile.note}
      </div>

      <p className="text-xs text-slate-500">
        Always use an instant-read thermometer in the thickest part, avoiding bone. Carryover cooking adds
        5&ndash;10&deg;F during rest&mdash;pull 5&deg;F early.
      </p>
    </div>
  );
}
