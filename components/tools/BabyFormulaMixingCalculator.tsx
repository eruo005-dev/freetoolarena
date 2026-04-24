"use client";

import { useMemo, useState } from "react";

type FormulaType = "powder" | "concentrate" | "ready";

export function BabyFormulaMixingCalculator() {
  const [formulaType, setFormulaType] = useState<FormulaType>("powder");
  const [ounces, setOunces] = useState<number>(4);

  const result = useMemo(() => {
    const oz = Number.isFinite(ounces) ? Math.max(0, ounces) : 0;
    if (formulaType === "powder") {
      // 1 scoop per 2 oz of water. Mixed volume is ~oz requested (powder displaces very little).
      const scoops = oz / 2;
      const water = oz;
      return {
        scoops: scoops.toFixed(1),
        water: water.toFixed(1),
        direction:
          "Add the water to the bottle first, then add the scoops of powder. Cap &amp; shake until fully dissolved.",
      };
    }
    if (formulaType === "concentrate") {
      // 1:1 ratio concentrate to water. Total volume = oz requested.
      const concentrate = oz / 2;
      const water = oz / 2;
      return {
        scoops: `${concentrate.toFixed(1)} oz concentrate`,
        water: water.toFixed(1),
        direction:
          "Pour the water in first, then add an equal amount of liquid concentrate. Cap &amp; shake gently.",
      };
    }
    return {
      scoops: "No mixing required",
      water: "0.0",
      direction: "Pour ready-to-feed formula directly into the bottle. Do not add water.",
    };
  }, [formulaType, ounces]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Formula type</span>
            <select
              value={formulaType}
              onChange={(event) => setFormulaType(event.target.value as FormulaType)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            >
              <option value="powder">Powder &mdash; 1 scoop per 2 oz water</option>
              <option value="concentrate">Liquid concentrate &mdash; 1:1 with water</option>
              <option value="ready">Ready-to-feed &mdash; no mixing</option>
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Desired bottle size (oz)</span>
            <input
              type="number"
              min={0}
              step={0.5}
              value={ounces}
              onChange={(event) => setOunces(Number(event.target.value))}
              className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
            />
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-brand/5 p-5">
        <p className="text-xs uppercase tracking-wide text-brand">Mixing recipe</p>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Powder / concentrate</dt>
            <dd className="text-lg font-semibold text-slate-900">
              {formulaType === "powder" ? `${result.scoops} scoops` : result.scoops}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Water to add</dt>
            <dd className="text-lg font-semibold text-slate-900">{result.water} oz</dd>
          </div>
        </dl>
        <p
          className="mt-3 text-sm text-slate-700"
          dangerouslySetInnerHTML={{ __html: result.direction }}
        />
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
        <p className="font-semibold">Important safety warnings</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Always add the water first, then the formula &mdash; this keeps the ratio accurate.</li>
          <li>Never dilute standard ratios or add extra water to stretch formula. Over-diluted formula can cause water intoxication (hyponatremia) and is a medical emergency in infants.</li>
          <li>Use safe drinking water. Boil and cool tap water for babies under 3 months or if advised by your pediatrician.</li>
          <li>Never microwave bottles &mdash; hot spots can burn a baby&rsquo;s mouth.</li>
        </ul>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Storage rules</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Mixed formula at room temperature: use within 1 hour.</li>
          <li>Mixed formula sealed in the fridge: use within 24 hours.</li>
          <li>Bottle the baby has started drinking: use within 1 hour &mdash; then discard.</li>
          <li>Check the formula can&rsquo;s printed instructions &mdash; concentrations vary by brand. Ask your pediatrician if anything looks off.</li>
        </ul>
      </div>
    </div>
  );
}
