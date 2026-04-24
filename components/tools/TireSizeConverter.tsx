"use client";

import { useMemo, useState } from "react";

function parseMetric(input: string): { width: number; aspect: number; rim: number } | null {
  const clean = input.trim().toUpperCase().replace(/\s+/g, "");
  // Accept forms like 225/65R17, P225/65R17, 225/65ZR17
  const m = clean.match(/^[A-Z]?(\d{3})\/(\d{2,3})(?:Z)?R(\d{2})$/);
  if (!m) return null;
  const width = Number(m[1]);
  const aspect = Number(m[2]);
  const rim = Number(m[3]);
  if (![width, aspect, rim].every(Number.isFinite)) return null;
  return { width, aspect, rim };
}

export function TireSizeConverter() {
  const [notation, setNotation] = useState("225/65R17");

  const result = useMemo(() => {
    const parsed = parseMetric(notation);
    if (!parsed) return null;
    const { width, aspect, rim } = parsed;
    const sidewallIn = (width * (aspect / 100)) / 25.4;
    const overallDiameterIn = rim + 2 * sidewallIn;
    const sectionWidthIn = width / 25.4;
    const circumferenceIn = overallDiameterIn * Math.PI;
    const revsPerMile = 63360 / circumferenceIn;
    const imperial = `${overallDiameterIn.toFixed(1)} x ${sectionWidthIn.toFixed(1)} R${rim}`;
    if (![sidewallIn, overallDiameterIn, sectionWidthIn, circumferenceIn, revsPerMile].every(Number.isFinite)) {
      return null;
    }
    return {
      width,
      aspect,
      rim,
      sidewallIn,
      overallDiameterIn,
      sectionWidthIn,
      circumferenceIn,
      revsPerMile,
      imperial,
    };
  }, [notation]);

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Metric tire size</span>
        <input
          type="text"
          value={notation}
          onChange={(e) => setNotation(e.target.value)}
          placeholder="225/65R17"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
        <span className="mt-1 block text-xs text-slate-500">
          Format: width(mm)/aspect(%)R rim(in) &mdash; e.g. 225/65R17
        </span>
      </label>

      {!result && (
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          Enter a valid metric tire size to see the conversion.
        </div>
      )}

      {result && (
        <>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Equivalent imperial size</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{result.imperial}</div>
            <div className="mt-1 text-sm text-slate-600">
              Parsed: {result.width} mm width / {result.aspect}% aspect / {result.rim}&quot; rim
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Overall diameter</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.overallDiameterIn.toFixed(2)} in
              </div>
              <div className="text-xs text-slate-500">
                {(result.overallDiameterIn * 25.4).toFixed(0)} mm
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Section width</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.sectionWidthIn.toFixed(2)} in
              </div>
              <div className="text-xs text-slate-500">{result.width} mm</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Circumference</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.circumferenceIn.toFixed(2)} in
              </div>
              <div className="text-xs text-slate-500">{(result.circumferenceIn / 12).toFixed(2)} ft</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Revolutions per mile</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.revsPerMile.toFixed(0)}
              </div>
              <div className="text-xs text-slate-500">63,360 in &divide; circumference</div>
            </div>
          </div>
        </>
      )}

      <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
        <div className="mb-1 font-medium text-slate-700">Reading a tire sidewall</div>
        In <span className="font-mono">225/65R17</span>: 225 is the section width in mm, 65 is the aspect
        ratio (sidewall height as % of width), R means radial construction, and 17 is the rim diameter in
        inches. Replacement tires should match overall diameter within ~3% to keep speedometer &amp; ABS
        calibration correct.
      </div>
    </div>
  );
}
