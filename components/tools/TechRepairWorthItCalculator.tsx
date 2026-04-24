"use client";

import { useMemo, useState } from "react";

type Device = "phone" | "laptop" | "tablet" | "desktop" | "console" | "tv";

const AGE_CEILING: Record<Device, number> = {
  phone: 5,
  laptop: 5,
  tablet: 5,
  desktop: 7,
  console: 7,
  tv: 7,
};

const POST_REPAIR_LIFE: Record<Device, string> = {
  phone: "2&ndash;3 years",
  laptop: "3&ndash;5 years",
  tablet: "2&ndash;4 years",
  desktop: "3&ndash;6 years",
  console: "3&ndash;5 years",
  tv: "4&ndash;7 years",
};

const DEVICE_LABEL: Record<Device, string> = {
  phone: "Phone",
  laptop: "Laptop",
  tablet: "Tablet",
  desktop: "Desktop",
  console: "Game console",
  tv: "TV",
};

export function TechRepairWorthItCalculator() {
  const [device, setDevice] = useState<Device>("laptop");
  const [repairCost, setRepairCost] = useState<number>(280);
  const [originalPrice, setOriginalPrice] = useState<number>(1200);
  const [age, setAge] = useState<number>(4);
  const [replacementCost, setReplacementCost] = useState<number>(1100);

  const result = useMemo(() => {
    const vals = [repairCost, originalPrice, age, replacementCost];
    if (!vals.every(Number.isFinite)) return null;
    if (replacementCost <= 0) return null;

    const ratio = repairCost / replacementCost;
    const ratioPct = ratio * 100;
    const ageCeiling = AGE_CEILING[device];
    const tooOld = age >= ageCeiling;

    let verdict: "repair" | "marginal" | "replace" = "repair";
    const rationale: string[] = [];

    if (ratio >= 0.75) {
      verdict = "replace";
      rationale.push(
        `Repair is ${ratioPct.toFixed(0)}% of replacement cost &mdash; above the 75% ceiling, almost always replace.`,
      );
    } else if (ratio >= 0.5) {
      verdict = "marginal";
      rationale.push(
        `Repair is ${ratioPct.toFixed(0)}% of replacement cost &mdash; in the 50&ndash;75% gray zone.`,
      );
    } else {
      verdict = "repair";
      rationale.push(
        `Repair is only ${ratioPct.toFixed(0)}% of replacement cost &mdash; clear win for repair.`,
      );
    }

    if (tooOld) {
      rationale.push(
        `${DEVICE_LABEL[device]} is ${age} years old &mdash; past the ${ageCeiling}-year threshold where components start becoming obsolete.`,
      );
      if (verdict === "repair") verdict = "marginal";
      else if (verdict === "marginal") verdict = "replace";
    } else if (age <= 2) {
      rationale.push(
        "Device is under 2 years old &mdash; repair almost always wins with so much useful life left.",
      );
    }

    if (originalPrice > 0 && repairCost / originalPrice > 0.4 && tooOld) {
      rationale.push(
        "Pouring 40%+ of original price into a device past its age ceiling is rarely worth it.",
      );
    }

    return {
      verdict,
      ratioPct,
      rationale,
      postLife: POST_REPAIR_LIFE[device],
      tooOld,
    };
  }, [device, repairCost, originalPrice, age, replacementCost]);

  const verdictStyle: Record<string, string> = {
    repair: "border-emerald-300 bg-emerald-50 text-emerald-900",
    marginal: "border-amber-300 bg-amber-50 text-amber-900",
    replace: "border-rose-300 bg-rose-50 text-rose-900",
  };
  const verdictLabel: Record<string, string> = {
    repair: "Repair it",
    marginal: "Marginal &mdash; your call",
    replace: "Replace it",
  };

  const fmt = (n: number) =>
    "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Device type</span>
          <select
            value={device}
            onChange={(e) => setDevice(e.target.value as Device)}
            className="w-full rounded border border-slate-300 px-3 py-2"
          >
            <option value="phone">Phone</option>
            <option value="laptop">Laptop</option>
            <option value="tablet">Tablet</option>
            <option value="desktop">Desktop</option>
            <option value="console">Game console</option>
            <option value="tv">TV</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Repair cost ($)</span>
          <input
            type="number"
            min={0}
            value={repairCost}
            onChange={(e) => setRepairCost(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Original purchase price ($)</span>
          <input
            type="number"
            min={0}
            value={originalPrice}
            onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Age (years)</span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={age}
            onChange={(e) => setAge(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Replacement cost today ($)</span>
          <input
            type="number"
            min={0}
            value={replacementCost}
            onChange={(e) => setReplacementCost(parseFloat(e.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      {result && (
        <>
          <div className={`rounded-lg border p-4 ${verdictStyle[result.verdict]}`}>
            <div className="text-xs uppercase tracking-wide opacity-70">Recommendation</div>
            <div
              className="text-2xl font-bold"
              dangerouslySetInnerHTML={{ __html: verdictLabel[result.verdict] }}
            />
            <div className="mt-1 text-xs opacity-80">
              Repair-to-replace ratio: {result.ratioPct.toFixed(0)}% &mdash;{" "}
              {result.ratioPct < 50
                ? "under 50% (repair zone)"
                : result.ratioPct < 75
                  ? "50&ndash;75% (gray zone)"
                  : "over 75% (replace zone)"}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h4 className="mb-2 text-sm font-semibold text-slate-700">Why</h4>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              {result.rationale.map((r, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: r }} />
              ))}
            </ul>
            <div
              className="mt-3 border-t border-slate-100 pt-3 text-sm text-slate-700"
              dangerouslySetInnerHTML={{
                __html: `<strong>Expected remaining life if repaired:</strong> ${result.postLife}.`,
              }}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">Cost if repair</div>
              <div className="text-lg font-bold text-slate-800">{fmt(repairCost)}</div>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">Cost if replace</div>
              <div className="text-lg font-bold text-slate-800">{fmt(replacementCost)}</div>
            </div>
            <div className="rounded border border-slate-200 bg-slate-50 p-3 text-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">You save by repairing</div>
              <div className="text-lg font-bold text-brand">
                {fmt(Math.max(0, replacementCost - repairCost))}
              </div>
            </div>
          </div>

          <div className="rounded border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
            <strong>Sustainability note:</strong> a repair is almost always greener than a
            replacement. Manufacturing a new phone or laptop produces 60&ndash;80 kg of CO&#8322;e
            &mdash; orders of magnitude more than its lifetime electricity use. When the ratio is
            marginal, the environment tips the scale toward repair.
          </div>
        </>
      )}
    </div>
  );
}
