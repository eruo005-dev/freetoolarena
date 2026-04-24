"use client";

import { useMemo, useState } from "react";

type Unit = "cm" | "in";

interface Recommendation {
  caseRange: string;
  strap: string;
  thickness: string;
  balance: string;
  note: string;
}

function recommend(wristCm: number): Recommendation | null {
  if (!Number.isFinite(wristCm) || wristCm <= 0) return null;
  if (wristCm < 16) {
    return {
      caseRange: "34-38 mm",
      strap: "18-20 mm",
      thickness: "6-10 mm",
      balance: "Short lug-to-lug (&lt;46 mm). Avoid oversized crowns and chunky bezels.",
      note: "Smaller wrist &mdash; a 36 mm dress or field watch sits cleanly.",
    };
  }
  if (wristCm < 18) {
    return {
      caseRange: "38-42 mm",
      strap: "20-22 mm",
      thickness: "8-12 mm",
      balance: "Lug-to-lug 46-50 mm is most versatile. The sweet spot for most watches.",
      note: "Average wrist &mdash; nearly any modern watch works here.",
    };
  }
  if (wristCm < 20) {
    return {
      caseRange: "42-46 mm",
      strap: "22-24 mm",
      thickness: "10-14 mm",
      balance: "Lug-to-lug up to 52 mm is fine. Larger dials read better.",
      note: "Larger wrist &mdash; divers, chronographs, and GMTs wear well.",
    };
  }
  return {
    caseRange: "44 mm+",
    strap: "22-26 mm",
    thickness: "12-16 mm",
    balance: "Lug-to-lug 52 mm+ keeps proportions right. Heavier bracelets balance the case.",
    note: "Big wrist &mdash; tool watches and oversized divers look proportional.",
  };
}

export function WatchCaseSizeGuide() {
  const [unit, setUnit] = useState<Unit>("cm");
  const [value, setValue] = useState("17");

  const wristCm = useMemo(() => {
    const n = Number(value);
    if (!Number.isFinite(n)) return NaN;
    return unit === "cm" ? n : n * 2.54;
  }, [unit, value]);

  const rec = useMemo(() => recommend(wristCm), [wristCm]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Unit
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as Unit)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
          >
            <option value="cm">Centimeters</option>
            <option value="in">Inches</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 md:col-span-2">
          Wrist circumference
          <input
            type="number"
            step="0.1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
            placeholder={unit === "cm" ? "e.g. 17" : "e.g. 6.7"}
          />
        </label>
      </div>

      {rec ? (
        <div className="rounded-lg border border-brand/30 bg-brand/5 p-4 space-y-3">
          <div className="text-sm font-semibold text-brand">
            For a {Number.isFinite(wristCm) ? wristCm.toFixed(1) : "\u2014"} cm wrist
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">Recommended case size</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{rec.caseRange}</div>
            </div>
            <div className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">Strap / lug width</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{rec.strap}</div>
            </div>
            <div className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
              <div className="text-xs text-gray-500 dark:text-gray-400">Case thickness</div>
              <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{rec.thickness}</div>
            </div>
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Balance:</strong>{" "}
            <span dangerouslySetInnerHTML={{ __html: rec.balance }} />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: rec.note }} />
        </div>
      ) : (
        <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-800 dark:text-amber-200">
          Enter a positive wrist measurement to see a recommendation.
        </div>
      )}

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Quick sizing table</div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">Wrist</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">Case size</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">Strap</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 dark:text-gray-200">
              <tr><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">14-16 cm (5.5-6.3&quot;)</td><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">34-38 mm</td><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">18-20 mm</td></tr>
              <tr><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">16-18 cm (6.3-7&quot;)</td><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">38-42 mm (most versatile)</td><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">20-22 mm</td></tr>
              <tr><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">18-20 cm (7-7.9&quot;)</td><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">42-46 mm</td><td className="px-3 py-2 border-b border-gray-100 dark:border-gray-800">22-24 mm</td></tr>
              <tr><td className="px-3 py-2">20 cm+ (7.9&quot;+)</td><td className="px-3 py-2">44 mm+</td><td className="px-3 py-2">22-26 mm</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Rules of thumb</div>
        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li><strong>Strap/bracelet width &asymp; case diameter &divide; 2</strong> &mdash; a 40 mm case pairs with a 20 mm strap.</li>
          <li><strong>Lug-to-lug matters more than diameter</strong> &mdash; if lugs overhang your wrist edges, the watch is too big.</li>
          <li>Case thickness of <strong>6-12 mm</strong> is typical; over 14 mm reads as a chunky tool watch.</li>
          <li>Bracelets wear heavier and feel larger than leather or rubber of the same case size.</li>
          <li>Dress watches trend small (34-40 mm); sport and dive watches trend larger (40-44 mm+).</li>
        </ul>
      </div>
    </div>
  );
}
