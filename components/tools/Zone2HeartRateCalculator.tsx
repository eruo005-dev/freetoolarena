"use client";

import { useMemo, useState } from "react";

export function Zone2HeartRateCalculator() {
  const [age, setAge] = useState<number>(34);
  const [resting, setResting] = useState<number>(60);
  const [method, setMethod] = useState<"karvonen" | "180minus" | "simple">("karvonen");

  const result = useMemo(() => {
    if (![age, resting].every(Number.isFinite) || age < 10 || age > 100) return null;
    const maxHR = 211 - 0.64 * age; // Nes 2013 formula

    let z2Low = 0, z2High = 0;
    if (method === "karvonen") {
      const hrr = maxHR - resting;
      z2Low = resting + hrr * 0.6;
      z2High = resting + hrr * 0.7;
    } else if (method === "180minus") {
      const target = 180 - age;
      z2Low = target - 10;
      z2High = target;
    } else {
      z2Low = maxHR * 0.6;
      z2High = maxHR * 0.7;
    }

    return { maxHR: Math.round(maxHR), z2Low: Math.round(z2Low), z2High: Math.round(z2High) };
  }, [age, resting, method]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Age</span>
          <input type="number" min={10} max={100} value={age} onChange={(e) => setAge(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Resting HR (bpm)</span>
          <input type="number" min={30} max={120} value={resting} onChange={(e) => setResting(parseFloat(e.target.value))} className="w-full rounded border border-slate-300 px-3 py-2" />
        </label>
        <label className="block text-sm"><span className="mb-1 block font-medium text-slate-700">Method</span>
          <select value={method} onChange={(e) => setMethod(e.target.value as "karvonen" | "180minus" | "simple")} className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="karvonen">Karvonen (HRR)</option>
            <option value="180minus">Maffetone (180 - age)</option>
            <option value="simple">% of max HR</option>
          </select>
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-5">
            <div className="text-xs uppercase tracking-wide text-emerald-700">Zone 2 target heart rate</div>
            <div className="text-3xl font-bold text-emerald-900">{result.z2Low} &ndash; {result.z2High} bpm</div>
            <div className="mt-1 text-sm text-emerald-800">Max HR estimate: {result.maxHR} bpm</div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <h4 className="mb-2 font-semibold">How to use it</h4>
            <ul className="list-disc space-y-1 pl-5">
              <li>Stay in this range for 30&ndash;90 min, 2&ndash;4&times;/week.</li>
              <li>Should feel easy: nasal breathing only, can hold a full conversation.</li>
              <li>Use heart-rate strap for accuracy (wrist optical undercounts during steady-state).</li>
              <li>Pace by HR, not by perceived effort &mdash; you&rsquo;ll go too fast.</li>
            </ul>
          </div>

          <div className="rounded border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            Zone 2 builds mitochondrial density and aerobic base. The 3 methods give slightly different ranges; Karvonen
            (which uses your resting HR) is most personalized; 180-minus-age is the conservative MAF method; %max is the
            classic textbook version. Pick one and stick with it.
          </div>
        </>
      )}
    </div>
  );
}
