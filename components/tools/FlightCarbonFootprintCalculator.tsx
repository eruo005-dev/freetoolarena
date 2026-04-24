"use client";

import { useMemo, useState } from "react";

type Cabin = "economy" | "premium" | "business" | "first";

const CABIN_FACTOR: Record<Cabin, number> = {
  economy: 1.0,
  premium: 1.5,
  business: 2.9,
  first: 4.0,
};

const CABIN_LABEL: Record<Cabin, string> = {
  economy: "Economy",
  premium: "Premium Economy",
  business: "Business",
  first: "First",
};

export function FlightCarbonFootprintCalculator() {
  const [distanceKm, setDistanceKm] = useState(5500);
  const [cabin, setCabin] = useState<Cabin>("economy");
  const [multiLeg, setMultiLeg] = useState(false);

  const result = useMemo(() => {
    if (!Number.isFinite(distanceKm) || distanceKm <= 0) return null;

    let perKm = 0.15;
    let band = "Long-haul (>3700km)";
    if (distanceKm < 1500) {
      perKm = 0.255;
      band = "Short-haul (<1500km)";
    } else if (distanceKm < 3700) {
      perKm = 0.156;
      band = "Medium-haul (1500-3700km)";
    }

    const base = distanceKm * perKm;
    const withCabin = base * CABIN_FACTOR[cabin];
    const total = multiLeg ? withCabin * 1.15 : withCabin;

    const gallonsGas = total / 8.887; // ~8.887 kg CO2 per gallon of gasoline
    const drivingDays = total / (0.404 * 30); // 0.404 kg/mi avg car, ~30 mi/day
    const treesToOffset = (total / 1000) * 20;

    return {
      total,
      band,
      perKm,
      gallonsGas,
      drivingDays,
      treesToOffset,
    };
  }, [distanceKm, cabin, multiLeg]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Flight distance (km)</span>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={distanceKm}
            onChange={(e) => setDistanceKm(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Cabin class</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={cabin}
            onChange={(e) => setCabin(e.target.value as Cabin)}
          >
            {(Object.keys(CABIN_LABEL) as Cabin[]).map((k) => (
              <option key={k} value={k}>
                {CABIN_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Itinerary</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={multiLeg ? "multi" : "direct"}
            onChange={(e) => setMultiLeg(e.target.value === "multi")}
          >
            <option value="direct">Direct flight</option>
            <option value="multi">1-stop / multi-leg</option>
          </select>
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-sm text-slate-600">CO2 per passenger ({result.band})</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">
              {result.total.toLocaleString("en-US", { maximumFractionDigits: 0 })} kg
            </div>
            <div className="text-xs text-slate-500">
              {result.perKm.toFixed(3)} kg/km base &times; cabin factor {CABIN_FACTOR[cabin]}
              {multiLeg ? " &times; 1.15 (multi-leg)" : ""}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Gasoline equivalent</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.gallonsGas.toFixed(1)} gal
              </div>
              <div className="text-xs text-slate-500">burned in a car</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Driving equivalent</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.drivingDays.toFixed(0)} days
              </div>
              <div className="text-xs text-slate-500">of average US driving</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Trees to offset</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                ~{Math.ceil(result.treesToOffset)}
              </div>
              <div className="text-xs text-slate-500">over 40 years (~20/ton)</div>
            </div>
          </div>

          <p className="rounded-lg bg-emerald-50 p-3 text-xs text-emerald-900">
            Offsetting is a last resort &mdash; most voluntary offsets deliver a fraction of the climate
            benefit they claim. Reducing flights (fewer trips, economy cabin, direct routing, trains for
            &lt;1000 km) is far more effective than buying credits after the fact.
          </p>
        </>
      )}
    </div>
  );
}
