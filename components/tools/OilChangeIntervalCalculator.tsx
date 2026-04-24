"use client";

import { useMemo, useState } from "react";

type OilType = "conventional" | "blend" | "synthetic";
type Conditions = "normal" | "severe";
type EngineAge = "under50" | "50to100" | "100to150" | "over150";

const ENGINE_LABEL: Record<EngineAge, string> = {
  under50: "Under 50,000 mi",
  "50to100": "50,000 - 100,000 mi",
  "100to150": "100,000 - 150,000 mi",
  over150: "Over 150,000 mi",
};

const OIL_LABEL: Record<OilType, string> = {
  conventional: "Conventional",
  blend: "Synthetic blend",
  synthetic: "Full synthetic",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function baseInterval(oil: OilType, cond: Conditions): { low: number; high: number } {
  if (oil === "conventional") return cond === "severe" ? { low: 3000, high: 3000 } : { low: 3000, high: 5000 };
  if (oil === "blend") return cond === "severe" ? { low: 4000, high: 5000 } : { low: 5000, high: 7500 };
  return cond === "severe" ? { low: 5000, high: 5000 } : { low: 7500, high: 10000 };
}

function ageMultiplier(age: EngineAge): number {
  if (age === "under50") return 1;
  if (age === "50to100") return 1;
  if (age === "100to150") return 0.9;
  return 0.8;
}

export function OilChangeIntervalCalculator() {
  const [oil, setOil] = useState<OilType>("synthetic");
  const [cond, setCond] = useState<Conditions>("normal");
  const [annualMiles, setAnnualMiles] = useState("12000");
  const [age, setAge] = useState<EngineAge>("50to100");

  const result = useMemo(() => {
    const miles = parseFloat(annualMiles);
    if (!Number.isFinite(miles) || miles <= 0) return null;
    const base = baseInterval(oil, cond);
    const mult = ageMultiplier(age);
    const low = Math.round((base.low * mult) / 100) * 100;
    const high = Math.round((base.high * mult) / 100) * 100;
    const avg = Math.round(((low + high) / 2) / 100) * 100;

    const monthsUntil = (avg / miles) * 12;
    const monthsRounded = Math.max(1, Math.round(monthsUntil * 10) / 10);

    const now = new Date();
    const nextDate = new Date(now);
    nextDate.setMonth(now.getMonth() + Math.round(monthsUntil));
    const nextMonth = `${MONTHS[nextDate.getMonth()]} ${nextDate.getFullYear()}`;

    return { low, high, avg, monthsRounded, nextMonth, adjusted: mult < 1 };
  }, [oil, cond, annualMiles, age]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Oil type</span>
          <select
            value={oil}
            onChange={(e) => setOil(e.target.value as OilType)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="conventional">Conventional</option>
            <option value="blend">Synthetic blend</option>
            <option value="synthetic">Full synthetic</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Driving conditions</span>
          <select
            value={cond}
            onChange={(e) => setCond(e.target.value as Conditions)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="normal">Normal</option>
            <option value="severe">Severe</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Annual miles driven</span>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            step={500}
            value={annualMiles}
            onChange={(e) => setAnnualMiles(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Engine age / miles</span>
          <select
            value={age}
            onChange={(e) => setAge(e.target.value as EngineAge)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="under50">{ENGINE_LABEL.under50}</option>
            <option value="50to100">{ENGINE_LABEL["50to100"]}</option>
            <option value="100to150">{ENGINE_LABEL["100to150"]}</option>
            <option value="over150">{ENGINE_LABEL.over150}</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Recommended interval</p>
            <p className="text-3xl font-bold text-brand">
              {result.low === result.high ? result.low.toLocaleString() : `${result.low.toLocaleString()} - ${result.high.toLocaleString()}`} mi
            </p>
            {result.adjusted && <p className="text-xs text-slate-500 mt-1">Reduced for higher-mileage engine</p>}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Months at your driving rate</p>
            <p className="text-3xl font-bold text-slate-900">{result.monthsRounded} mo</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Target mileage</p>
            <p className="text-xl font-bold text-slate-900">{result.avg.toLocaleString()} mi</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Next change around</p>
            <p className="text-xl font-bold text-slate-900">{result.nextMonth}</p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Enter annual miles to see your schedule.</div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 space-y-2">
        <p className="text-sm font-semibold text-amber-900">What counts as severe driving?</p>
        <ul className="text-sm text-amber-900 space-y-1 list-disc pl-5">
          <li>Frequent short trips under 10 miles (engine never fully warms up)</li>
          <li>Stop-and-go city or commute traffic</li>
          <li>Dusty or sandy roads, unpaved surfaces</li>
          <li>Extreme cold below 0&deg;F or sustained heat above 90&deg;F</li>
          <li>Towing, hauling heavy loads, or roof-box highway driving</li>
        </ul>
        <p className="text-xs text-amber-800">If two or more apply, pick &ldquo;severe&rdquo; &mdash; your oil degrades faster than the owner&rsquo;s manual baseline.</p>
      </div>

      <p className="text-xs text-slate-500">
        Guidance based on typical manufacturer ranges for {OIL_LABEL[oil].toLowerCase()} oil. Your specific vehicle&rsquo;s owner&rsquo;s manual and any on-board oil life monitor take precedence.
      </p>
    </div>
  );
}
