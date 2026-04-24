"use client";

import { useMemo, useState } from "react";

type Plant =
  | "tomatoes"
  | "peppers"
  | "squash"
  | "leafy-greens"
  | "root-veg"
  | "herbs"
  | "container"
  | "lawn"
  | "young-trees"
  | "fruiting-trees";

type Soil = "sandy" | "loam" | "clay";
type Climate = "cool-temperate" | "warm" | "hot-arid";
type Season = "spring" | "summer" | "fall" | "winter";

const PLANTS: Record<
  Plant,
  { name: string; baseInchesPerWeek: number; baseDaysPerWeek: number; isContainer?: boolean }
> = {
  tomatoes: { name: "Tomatoes", baseInchesPerWeek: 1.5, baseDaysPerWeek: 3 },
  peppers: { name: "Peppers", baseInchesPerWeek: 1.25, baseDaysPerWeek: 3 },
  squash: { name: "Squash / zucchini", baseInchesPerWeek: 1.5, baseDaysPerWeek: 3 },
  "leafy-greens": { name: "Leafy greens", baseInchesPerWeek: 1, baseDaysPerWeek: 6 },
  "root-veg": { name: "Root vegetables", baseInchesPerWeek: 1, baseDaysPerWeek: 3 },
  herbs: { name: "Herbs", baseInchesPerWeek: 0.75, baseDaysPerWeek: 2 },
  container: { name: "Container plants", baseInchesPerWeek: 2, baseDaysPerWeek: 5, isContainer: true },
  lawn: { name: "Lawn", baseInchesPerWeek: 1.25, baseDaysPerWeek: 2 },
  "young-trees": { name: "Young trees (under 3 yrs)", baseInchesPerWeek: 2, baseDaysPerWeek: 2 },
  "fruiting-trees": { name: "Fruiting trees (mature)", baseInchesPerWeek: 1.5, baseDaysPerWeek: 1 },
};

export function PlantWateringSchedule() {
  const [plant, setPlant] = useState<Plant>("tomatoes");
  const [soil, setSoil] = useState<Soil>("loam");
  const [climate, setClimate] = useState<Climate>("warm");
  const [season, setSeason] = useState<Season>("summer");

  const result = useMemo(() => {
    const p = PLANTS[plant];
    let inches = p.baseInchesPerWeek;
    let days = p.baseDaysPerWeek;

    // Soil adjuster
    if (soil === "sandy") inches *= 1.5;
    if (soil === "clay") inches *= 0.75;

    // Climate adjuster
    if (climate === "hot-arid") inches *= 1.5;
    if (climate === "cool-temperate") inches *= 0.85;

    // Season adjuster
    if (season === "winter") {
      inches *= 0.4;
      days = Math.max(1, Math.round(days * 0.5));
    } else if (season === "fall") {
      inches *= 0.7;
      days = Math.max(1, days - 1);
    } else if (season === "spring") {
      inches *= 0.85;
    }

    // Containers always double frequency, not volume
    if (p.isContainer) {
      days = Math.min(7, days + 2);
    }

    // Minutes per session at 1 gph drip
    // 1 inch over 1 sqft = 0.623 gallons. Assume ~10 sqft zone per emitter for garden, 1 gph drip = 60 min per gallon.
    const gallonsPerSessionPerSqft = inches / days * 0.623;
    const minutesPerSession = Math.max(5, Math.round(gallonsPerSessionPerSqft * 60));

    return {
      daysPerWeek: days,
      inchesPerWeek: inches,
      minutesPerSession,
    };
  }, [plant, soil, climate, season]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Plant type</span>
          <select
            value={plant}
            onChange={(e) => setPlant(e.target.value as Plant)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            {Object.entries(PLANTS).map(([key, p]) => (
              <option key={key} value={key}>{p.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Soil type</span>
          <select
            value={soil}
            onChange={(e) => setSoil(e.target.value as Soil)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="sandy">Sandy (drains fast)</option>
            <option value="loam">Loam (balanced)</option>
            <option value="clay">Clay (holds water)</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Climate</span>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as Climate)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="cool-temperate">Cool temperate</option>
            <option value="warm">Warm</option>
            <option value="hot-arid">Hot / arid</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Season</span>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value as Season)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Frequency</div>
          <div className="text-3xl font-semibold text-brand mt-1">{result.daysPerWeek}x / week</div>
          <div className="text-sm text-slate-600">Days to water</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Per session</div>
          <div className="text-3xl font-semibold text-slate-900 mt-1">{result.minutesPerSession} min</div>
          <div className="text-sm text-slate-600">At 1 gph drip emitter</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Total per week</div>
          <div className="text-3xl font-semibold text-slate-900 mt-1">{result.inchesPerWeek.toFixed(2)}&quot;</div>
          <div className="text-sm text-slate-600">Inches of water</div>
        </div>
      </div>

      <div className="rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">
        <strong>Morning is best:</strong> Water between 5-9am so foliage dries before evening, reducing fungal disease risk. Evening watering is acceptable only in hot-arid climates where midday evaporation is severe &mdash; water the soil, not the leaves.
      </div>

      <div className="grid md:grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900">
          <strong>Signs of underwatering</strong>
          <ul className="list-disc ml-5 mt-1 space-y-0.5 text-xs">
            <li>Wilting that persists after sunset</li>
            <li>Dry, crispy leaf edges</li>
            <li>Soil pulling away from pot edges</li>
            <li>Blossom drop on tomatoes/peppers</li>
            <li>Stunted, slow growth</li>
          </ul>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900">
          <strong>Signs of overwatering</strong>
          <ul className="list-disc ml-5 mt-1 space-y-0.5 text-xs">
            <li>Yellow lower leaves</li>
            <li>Mushy stem base or root rot</li>
            <li>Fungal growth on soil surface</li>
            <li>Edema (water blisters on leaves)</li>
            <li>Fruit cracking on tomatoes</li>
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Finger test:</strong> Before watering, stick a finger 2 inches into the soil. If dry, water. If moist, wait. This single habit prevents more plant deaths than any schedule.
      </div>
    </div>
  );
}
