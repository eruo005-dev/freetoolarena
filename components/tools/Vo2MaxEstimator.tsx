"use client";

import { useMemo, useState } from "react";

type Sex = "male" | "female";
type Test = "cooper" | "rockport" | "rest";

export function Vo2MaxEstimator() {
  const [test, setTest] = useState<Test>("cooper");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number>(35);
  const [weightLbs, setWeightLbs] = useState<number>(170);

  // Cooper: distance in meters in 12 minutes
  const [cooperMeters, setCooperMeters] = useState<number>(2400);

  // Rockport: time minutes + final HR
  const [walkMin, setWalkMin] = useState<number>(13.5);
  const [walkHr, setWalkHr] = useState<number>(140);

  // Resting HR test: just resting HR
  const [restingHr, setRestingHr] = useState<number>(60);

  const result = useMemo(() => {
    let vo2 = 0;
    if (test === "cooper") {
      vo2 = (cooperMeters - 504.9) / 44.73;
    } else if (test === "rockport") {
      const kg = weightLbs / 2.20462;
      vo2 = 132.853 - 0.0769 * weightLbs - 0.3877 * age + 6.315 * (sex === "male" ? 1 : 0) - 3.2649 * walkMin - 0.1565 * walkHr;
      void kg;
    } else {
      const maxHR = 208 - 0.7 * age;
      vo2 = 15 * (maxHR / restingHr);
    }
    if (!Number.isFinite(vo2) || vo2 <= 0) return null;
    const cat = categorize(vo2, age, sex);
    return { vo2: Math.round(vo2 * 10) / 10, cat };
  }, [test, sex, age, weightLbs, cooperMeters, walkMin, walkHr, restingHr]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Test method</span>
          <select value={test} onChange={(e) => setTest(e.target.value as Test)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="cooper">Cooper 12-min run</option>
            <option value="rockport">Rockport 1-mile walk</option>
            <option value="rest">Resting HR (rough)</option>
          </select>
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Age</span>
          <input type="number" min={10} max={100} value={age} onChange={(e) => setAge(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Sex</span>
          <select value={sex} onChange={(e) => setSex(e.target.value as Sex)} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="male">Male</option><option value="female">Female</option>
          </select>
        </label>
      </div>

      {test === "cooper" && (
        <label className="block text-sm sm:max-w-md"><span className="mb-1 block font-medium text-slate-700">Distance covered in 12 min (meters)</span>
          <input type="number" min={500} max={5000} value={cooperMeters} onChange={(e) => setCooperMeters(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      )}
      {test === "rockport" && (
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Weight (lbs)</span>
            <input type="number" min={60} value={weightLbs} onChange={(e) => setWeightLbs(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">1-mile walk time (min)</span>
            <input type="number" min={5} max={30} step={0.1} value={walkMin} onChange={(e) => setWalkMin(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Final HR (bpm)</span>
            <input type="number" min={60} max={220} value={walkHr} onChange={(e) => setWalkHr(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
          </label>
        </div>
      )}
      {test === "rest" && (
        <label className="block text-sm sm:max-w-md"><span className="mb-1 block font-medium text-slate-700">Resting heart rate (bpm)</span>
          <input type="number" min={30} max={120} value={restingHr} onChange={(e) => setRestingHr(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
      )}

      {result && (
        <>
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
            <div className="text-xs uppercase tracking-wide text-emerald-700">Estimated VO&#8322; max</div>
            <div className="text-3xl font-bold text-emerald-900">{result.vo2} ml/kg/min</div>
            <div className="mt-1 text-sm text-emerald-800">{result.cat}</div>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            VO&#8322; max correlates with all-cause mortality more strongly than most other fitness markers. Going from
            &ldquo;poor&rdquo; to &ldquo;average&rdquo; is the single biggest health investment most adults can make. Build with
            Zone 2 (4-5 hours/week) + 1-2 high-intensity intervals/week. Re-test every 8-12 weeks.
          </div>
        </>
      )}
    </div>
  );
}

function categorize(vo2: number, age: number, sex: Sex): string {
  // Cooper-Norton norms, simplified
  const m = sex === "male";
  if (age < 30) {
    if (vo2 >= (m ? 53 : 47)) return "Excellent";
    if (vo2 >= (m ? 45 : 40)) return "Good";
    if (vo2 >= (m ? 38 : 33)) return "Average";
    return "Below average";
  } else if (age < 50) {
    if (vo2 >= (m ? 49 : 42)) return "Excellent";
    if (vo2 >= (m ? 41 : 35)) return "Good";
    if (vo2 >= (m ? 35 : 29)) return "Average";
    return "Below average";
  }
  if (vo2 >= (m ? 43 : 37)) return "Excellent";
  if (vo2 >= (m ? 36 : 31)) return "Good";
  if (vo2 >= (m ? 29 : 25)) return "Average";
  return "Below average";
}
