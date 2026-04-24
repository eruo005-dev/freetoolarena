"use client";

import { useMemo, useState } from "react";

type AgeBucket = "16-19" | "20-24" | "25-34" | "35-54" | "55-69" | "70+";
type Coverage = "liability" | "full";
type Credit = "good" | "fair" | "poor";
type Record_ = "clean" | "ticket" | "accident";
type Vehicle = "economy" | "sedan" | "suv" | "truck" | "luxury" | "sports";

const STATES: { value: string; label: string; base: number }[] = [
  { value: "MI", label: "Michigan ($2,800)", base: 2800 },
  { value: "LA", label: "Louisiana ($2,500)", base: 2500 },
  { value: "FL", label: "Florida ($2,400)", base: 2400 },
  { value: "CA", label: "California ($2,000)", base: 2000 },
  { value: "TX", label: "Texas ($1,900)", base: 1900 },
  { value: "NY", label: "New York ($1,800)", base: 1800 },
  { value: "AVG", label: "Average state ($1,500)", base: 1500 },
  { value: "LOW", label: "Cheaper (ME/VT/NH) ($1,000)", base: 1000 },
];

const AGE: Record<AgeBucket, number> = {
  "16-19": 2.5,
  "20-24": 1.5,
  "25-34": 1.0,
  "35-54": 1.0,
  "55-69": 1.05,
  "70+": 1.2,
};

const COVERAGE: Record<Coverage, number> = { liability: 0.5, full: 1.0 };
const CREDIT: Record<Credit, number> = { good: 1.0, fair: 1.4, poor: 1.9 };
const RECORD: Record<Record_, number> = { clean: 1.0, ticket: 1.3, accident: 1.5 };
const VEHICLE: Record<Vehicle, number> = {
  economy: 0.9,
  sedan: 1.0,
  suv: 1.1,
  truck: 1.05,
  luxury: 1.5,
  sports: 1.7,
};

const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function CarInsuranceQuoteEstimator() {
  const [age, setAge] = useState<AgeBucket>("25-34");
  const [stateCode, setStateCode] = useState("AVG");
  const [coverage, setCoverage] = useState<Coverage>("full");
  const [credit, setCredit] = useState<Credit>("good");
  const [record, setRecord] = useState<Record_>("clean");
  const [vehicle, setVehicle] = useState<Vehicle>("sedan");

  const result = useMemo(() => {
    const stateRow = STATES.find((s) => s.value === stateCode) ?? STATES[6];
    const base = stateRow.base;
    const ageF = AGE[age];
    const covF = COVERAGE[coverage];
    const credF = CREDIT[credit];
    const recF = RECORD[record];
    const vehF = VEHICLE[vehicle];
    const annual = base * ageF * covF * credF * recF * vehF;
    if (!Number.isFinite(annual)) return null;
    return {
      base,
      annual,
      monthly: annual / 12,
      factors: [
        { name: "State base rate", value: usd(base) },
        { name: `Age (${age})`, value: `${ageF}x` },
        { name: `Coverage (${coverage})`, value: `${covF}x` },
        { name: `Credit (${credit})`, value: `${credF}x` },
        { name: `Driving record (${record})`, value: `${recF}x` },
        { name: `Vehicle (${vehicle})`, value: `${vehF}x` },
      ],
    };
  }, [age, stateCode, coverage, credit, record, vehicle]);

  const inputCls = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono";

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Driver age</span>
          <select value={age} onChange={(e) => setAge(e.target.value as AgeBucket)} className={inputCls}>
            {(Object.keys(AGE) as AgeBucket[]).map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">State</span>
          <select value={stateCode} onChange={(e) => setStateCode(e.target.value)} className={inputCls}>
            {STATES.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Coverage type</span>
          <select value={coverage} onChange={(e) => setCoverage(e.target.value as Coverage)} className={inputCls}>
            <option value="liability">Liability only</option>
            <option value="full">Full coverage</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Credit tier</span>
          <select value={credit} onChange={(e) => setCredit(e.target.value as Credit)} className={inputCls}>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Driving record</span>
          <select value={record} onChange={(e) => setRecord(e.target.value as Record_)} className={inputCls}>
            <option value="clean">Clean</option>
            <option value="ticket">Ticket</option>
            <option value="accident">At-fault accident</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Vehicle class</span>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value as Vehicle)} className={inputCls}>
            <option value="economy">Economy</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
            <option value="luxury">Luxury</option>
            <option value="sports">Sports</option>
          </select>
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Estimated annual premium</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{usd(result.annual)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Estimated monthly</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{usd(result.monthly)}</div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 text-sm font-medium text-slate-700">Factor breakdown</div>
            <ul className="space-y-1 text-sm">
              {result.factors.map((f) => (
                <li key={f.name} className="flex items-center justify-between">
                  <span className="text-slate-600">{f.name}</span>
                  <span className="font-mono tabular-nums text-slate-800">{f.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
        Estimates based on industry averages; actual quotes vary widely. Carriers also weigh ZIP code, annual
        mileage, claim history, deductible, and discount bundles that this estimator doesn&rsquo;t model.
      </div>
    </div>
  );
}
