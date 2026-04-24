"use client";

import { useMemo, useState } from "react";

export interface StairCalculatorProps {
  initialRise?: number;
}

export function StairCalculator({ initialRise = 108 }: StairCalculatorProps = {}) {
  const [totalRise, setTotalRise] = useState(String(initialRise)); // inches
  const [runPerStep, setRunPerStep] = useState("10.5"); // inches
  const [preferredRiser, setPreferredRiser] = useState("7.5"); // inches

  const result = useMemo(() => {
    const rise = parseFloat(totalRise);
    const run = parseFloat(runPerStep);
    const pref = parseFloat(preferredRiser);
    if (
      !Number.isFinite(rise) ||
      !Number.isFinite(run) ||
      !Number.isFinite(pref) ||
      rise <= 0 ||
      run <= 0 ||
      pref <= 0
    )
      return null;

    const stepCount = Math.ceil(rise / pref);
    const actualRiser = rise / stepCount;
    const totalRun = (stepCount - 1) * run;
    const stringerLen = Math.sqrt(rise * rise + totalRun * totalRun);
    const riseRunSum = actualRiser + run;

    const warnings: string[] = [];
    if (actualRiser > 7.75) warnings.push(`Riser ${actualRiser.toFixed(2)}" exceeds IRC max 7.75"`);
    if (actualRiser < 4) warnings.push(`Riser ${actualRiser.toFixed(2)}" below IRC min 4"`);
    if (run < 10) warnings.push(`Run ${run}" below IRC min 10"`);
    if (riseRunSum < 17 || riseRunSum > 18)
      warnings.push(
        `Rise+Run ${riseRunSum.toFixed(2)}" outside comfortable 17-18" range`
      );

    return {
      stepCount,
      actualRiser,
      totalRun,
      stringerLen,
      riseRunSum,
      warnings,
    };
  }, [totalRise, runPerStep, preferredRiser]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field
          label="Total rise (in, floor-to-floor)"
          value={totalRise}
          onChange={setTotalRise}
        />
        <Field label={`Run per step (in, min 10")`} value={runPerStep} onChange={setRunPerStep} />
        <Field
          label={`Preferred riser (in, 6.5-7.75")`}
          value={preferredRiser}
          onChange={setPreferredRiser}
        />
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Steps" value={String(result.stepCount)} />
            <Stat label="Actual riser" value={`${result.actualRiser.toFixed(2)}"`} />
            <Stat label="Total run" value={`${result.totalRun.toFixed(1)}"`} />
            <Stat label="Stringer" value={`${result.stringerLen.toFixed(1)}"`} />
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              Rise + Run check (target 17&ndash;18&quot;)
            </p>
            <p className="text-2xl font-semibold tabular-nums text-brand">
              {result.riseRunSum.toFixed(2)}&quot;
            </p>
          </div>
          {result.warnings.length > 0 ? (
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-900 mb-1">IRC code warnings</p>
              <ul className="list-disc pl-5 text-xs text-amber-900 space-y-1">
                {result.warnings.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-900">
                Stair dimensions meet IRC R311.7 limits.
              </p>
            </div>
          )}
          <p className="text-xs text-slate-500">
            IRC: max riser 7.75&quot;, min run 10&quot;. Stringer length = &radic;(rise&sup2; +
            run&sup2;). Cut stringer from 2x12 lumber; add extra for top/bottom connections.
          </p>
        </>
      ) : (
        <p className="text-sm text-red-600">Enter valid rise/run values.</p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-2xl font-semibold tabular-nums text-brand">{value}</p>
    </div>
  );
}
