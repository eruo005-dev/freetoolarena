"use client";

import { useMemo, useState } from "react";

type PetType = "dog" | "cat";
type AgeBand = "puppy" | "adult_young" | "adult_mid" | "senior";
type BreedRisk = "low" | "standard" | "high";
type Coverage = "accident" | "accident_illness" | "comprehensive";
type Deductible = "100" | "250" | "500" | "1000";
type Reimb = "70" | "80" | "90";

const AGE_MULT: Record<AgeBand, number> = {
  puppy: 1.0,
  adult_young: 1.1,
  adult_mid: 1.8,
  senior: 2.5,
};

const BREED_MULT: Record<BreedRisk, number> = {
  low: 0.85,
  standard: 1,
  high: 1.4,
};

const COVERAGE_MULT: Record<Coverage, number> = {
  accident: 0.5,
  accident_illness: 1,
  comprehensive: 1.5,
};

const DEDUCT_MULT: Record<Deductible, number> = {
  "100": 1.3,
  "250": 1.1,
  "500": 1.0,
  "1000": 0.8,
};

const REIMB_MULT: Record<Reimb, number> = {
  "70": 0.85,
  "80": 1,
  "90": 1.2,
};

function money(n: number) {
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

export function PetInsuranceCostEstimator() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [ageBand, setAgeBand] = useState<AgeBand>("adult_young");
  const [breedRisk, setBreedRisk] = useState<BreedRisk>("standard");
  const [coverage, setCoverage] = useState<Coverage>("accident_illness");
  const [deductible, setDeductible] = useState<Deductible>("250");
  const [reimb, setReimb] = useState<Reimb>("80");

  const result = useMemo(() => {
    const base = petType === "dog" ? 45 : 25;
    const mid =
      base *
      AGE_MULT[ageBand] *
      BREED_MULT[breedRisk] *
      COVERAGE_MULT[coverage] *
      DEDUCT_MULT[deductible] *
      REIMB_MULT[reimb];
    if (!Number.isFinite(mid)) return null;
    const low = mid * 0.8;
    const high = mid * 1.25;
    return { low, mid, high, annualMid: mid * 12 };
  }, [petType, ageBand, breedRisk, coverage, deductible, reimb]);

  const advice = useMemo(() => {
    const tips: string[] = [];
    if (ageBand === "senior")
      tips.push("Senior pets often have pre-existing conditions excluded &mdash; enroll earlier when possible.");
    if (deductible === "100")
      tips.push("Low deductibles raise premium fast &mdash; $500 is often the value sweet spot.");
    if (reimb === "90")
      tips.push("90% reimbursement feels nice but may not beat 80% once you weigh premium cost.");
    if (coverage === "comprehensive")
      tips.push("Wellness add-ons rarely save money &mdash; budget for routine care separately.");
    if (breedRisk === "high")
      tips.push("High-risk breeds: lock in coverage young before issues surface.");
    if (tips.length === 0) tips.push("Your setup is reasonably balanced.");
    return tips;
  }, [ageBand, deductible, reimb, coverage, breedRisk]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Pet type</span>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value as PetType)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Age</span>
          <select
            value={ageBand}
            onChange={(e) => setAgeBand(e.target.value as AgeBand)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="puppy">Puppy / kitten (under 1)</option>
            <option value="adult_young">Adult 1&ndash;5</option>
            <option value="adult_mid">Adult 6&ndash;9</option>
            <option value="senior">Senior 10+</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Breed risk tier</span>
          <select
            value={breedRisk}
            onChange={(e) => setBreedRisk(e.target.value as BreedRisk)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="standard">Standard</option>
            <option value="high">High</option>
          </select>
          <span className="mt-1 block text-xs text-gray-500">
            Large dogs and purebreds often fall into the higher tier.
          </span>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Coverage level</span>
          <select
            value={coverage}
            onChange={(e) => setCoverage(e.target.value as Coverage)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="accident">Accident only</option>
            <option value="accident_illness">Accident + illness</option>
            <option value="comprehensive">Comprehensive + wellness</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Annual deductible</span>
          <select
            value={deductible}
            onChange={(e) => setDeductible(e.target.value as Deductible)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="100">$100</option>
            <option value="250">$250</option>
            <option value="500">$500</option>
            <option value="1000">$1,000</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Reimbursement level</span>
          <select
            value={reimb}
            onChange={(e) => setReimb(e.target.value as Reimb)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="70">70%</option>
            <option value="80">80%</option>
            <option value="90">90%</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
          <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">Estimated monthly premium</div>
              <div className="text-3xl font-semibold text-brand">
                {money(result.low)} &ndash; {money(result.high)}
              </div>
              <div className="text-sm text-gray-600">Mid estimate {money(result.mid)}/mo</div>
            </div>
            <div className="mt-3 md:mt-0">
              <div className="text-xs uppercase tracking-wide text-gray-500">Annual (mid)</div>
              <div className="text-2xl font-semibold text-gray-900">{money(result.annualMid)}</div>
            </div>
          </div>

          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            {advice.map((a, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: a }} />
            ))}
          </ul>

          <p className="text-xs text-gray-500">
            Actual quotes vary &mdash; compare at Healthy Paws, Trupanion, Nationwide, Embrace.
          </p>
        </div>
      ) : null}
    </div>
  );
}
