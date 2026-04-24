"use client";

import { useMemo, useState } from "react";

type Condition =
  | "city-mild"
  | "highway-mild"
  | "cold-city"
  | "cold-highway"
  | "hot"
  | "aggressive";
type Hvac = "off" | "moderate" | "heavy";

export function EvRangeEstimator() {
  const [ratedRange, setRatedRange] = useState(300);
  const [batteryKwh, setBatteryKwh] = useState(75);
  const [condition, setCondition] = useState<Condition>("highway-mild");
  const [hvac, setHvac] = useState<Hvac>("moderate");

  const result = useMemo(() => {
    const rated = Number.isFinite(ratedRange) && ratedRange > 0 ? ratedRange : 0;
    const batt = Number.isFinite(batteryKwh) && batteryKwh > 0 ? batteryKwh : 1;
    const baseEff = rated / batt; // miles per kWh

    const condMultiplier: Record<Condition, number> = {
      "city-mild": 1.0,
      "highway-mild": 0.85,
      "cold-city": 0.7,
      "cold-highway": 0.6,
      hot: 0.9,
      aggressive: 0.8,
    };
    const hvacMultiplier: Record<Hvac, number> = {
      off: 1.0,
      moderate: 0.95,
      heavy: 0.85,
    };

    const adjEff = baseEff * condMultiplier[condition] * hvacMultiplier[hvac];
    const realRange = adjEff * batt;
    const trip100Kwh = adjEff > 0 ? 100 / adjEff : 0;
    const usable500 = batt * 0.8;
    const milesPerStop = adjEff * usable500;
    const stops500 = milesPerStop > 0 ? Math.max(0, Math.ceil(500 / milesPerStop) - 1) : 0;

    return {
      baseEff,
      adjEff,
      realRange,
      trip100Kwh,
      stops500,
    };
  }, [ratedRange, batteryKwh, condition, hvac]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Rated range (miles)</span>
          <input
            type="number"
            value={ratedRange}
            onChange={(e) => setRatedRange(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Battery capacity (kWh)</span>
          <input
            type="number"
            value={batteryKwh}
            onChange={(e) => setBatteryKwh(parseFloat(e.target.value))}
            className="rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Driving conditions</span>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value as Condition)}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="city-mild">City, mild weather</option>
            <option value="highway-mild">Highway, mild weather</option>
            <option value="cold-city">Cold weather, city</option>
            <option value="cold-highway">Cold weather, highway</option>
            <option value="hot">Hot weather</option>
            <option value="aggressive">Aggressive driving</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Climate control use</span>
          <select
            value={hvac}
            onChange={(e) => setHvac(e.target.value as Hvac)}
            className="rounded border border-slate-300 px-3 py-2"
          >
            <option value="off">Off</option>
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </label>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Real-world range</div>
          <div className="text-2xl font-bold text-brand">{result.realRange.toFixed(0)} mi</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Efficiency</div>
          <div className="text-2xl font-bold text-brand">{result.adjEff.toFixed(2)} mi/kWh</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Energy for 100-mile trip</div>
          <div className="text-2xl font-bold text-brand">{result.trip100Kwh.toFixed(1)} kWh</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4">
          <div className="text-xs uppercase text-slate-500">Charging stops (500 mi)</div>
          <div className="text-2xl font-bold text-brand">{result.stops500}</div>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Real-world efficiency is modeled from the rated miles/kWh and adjusted for speed, temperature, and
        HVAC draw. The 500-mile trip assumes you&rsquo;re charging to 80% usable SOC at each stop.
      </p>
    </div>
  );
}
