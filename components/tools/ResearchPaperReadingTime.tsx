"use client";

import { useMemo, useState } from "react";

type Density = "textbook" | "advanced" | "math" | "landmark";
type Method = "skim" | "moderate" | "deep";

const PAGES_PER_HOUR: Record<Density, Record<Method, number>> = {
  textbook: { skim: 10, moderate: 5, deep: 2 },
  advanced: { skim: 6, moderate: 3, deep: 1.5 },
  math: { skim: 3, moderate: 1, deep: 0.5 },
  landmark: { skim: 4, moderate: 1.5, deep: 0.75 },
};

const DENSITY_LABELS: Record<Density, string> = {
  textbook: "Intro textbook",
  advanced: "Advanced paper",
  math: "Dense math-heavy",
  landmark: "Landmark / deep-read",
};

const METHOD_LABELS: Record<Method, string> = {
  skim: "Skim (first pass)",
  moderate: "Moderate read",
  deep: "Deep study",
};

export function ResearchPaperReadingTime() {
  const [pages, setPages] = useState(20);
  const [density, setDensity] = useState<Density>("advanced");
  const [method, setMethod] = useState<Method>("moderate");

  const result = useMemo(() => {
    if (!Number.isFinite(pages) || pages <= 0) return null;
    const rate = PAGES_PER_HOUR[density][method];
    const hours = pages / rate;
    const minutes = Math.round(hours * 60);
    return { hours, minutes, rate };
  }, [pages, density, method]);

  const recommendedMethod: Method =
    density === "math" || density === "landmark" ? "deep" : density === "advanced" ? "moderate" : "skim";

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Page count</label>
          <input
            type="number"
            min={1}
            value={pages}
            onChange={(e) => setPages(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Paper density</label>
          <select
            value={density}
            onChange={(e) => setDensity(e.target.value as Density)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          >
            {(Object.keys(DENSITY_LABELS) as Density[]).map((d) => (
              <option key={d} value={d}>
                {DENSITY_LABELS[d]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Reading method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value as Method)}
            className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-brand"
          >
            {(Object.keys(METHOD_LABELS) as Method[]).map((m) => (
              <option key={m} value={m}>
                {METHOD_LABELS[m]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 space-y-3">
          <div>
            <p className="text-xs text-slate-500 uppercase font-semibold">Estimated time</p>
            <p className="text-3xl font-bold text-brand">
              {result.hours.toFixed(1)} hrs
              <span className="text-base font-normal text-slate-600 ml-2">
                ({result.minutes} min)
              </span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              At {result.rate} pages/hour for {DENSITY_LABELS[density].toLowerCase()}, {METHOD_LABELS[method].toLowerCase()}.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Recommended for this paper</p>
            <p className="text-sm text-slate-700">{METHOD_LABELS[recommendedMethod]}</p>
          </div>
          <div className="pt-3 border-t border-slate-200">
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">Three-pass strategy</p>
            <ol className="list-decimal list-inside text-sm text-slate-700 space-y-1">
              <li>First pass&nbsp;&mdash;&nbsp;skim for thesis, abstract, headings, and conclusion.</li>
              <li>Second pass&nbsp;&mdash;&nbsp;study method, figures, and key equations.</li>
              <li>Third pass&nbsp;&mdash;&nbsp;work through details and cited references.</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
