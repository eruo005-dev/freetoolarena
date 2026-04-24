"use client";

import { useMemo, useState } from "react";

type Rice = {
  key: string;
  name: string;
  ratio: number;
  stovetopMin: string;
  cookerMin: string;
  note: string;
};

const RICE: Rice[] = [
  { key: "white-long", name: "White long-grain", ratio: 2, stovetopMin: "18", cookerMin: "20-25", note: "Rinse once to remove surface starch." },
  { key: "white-short", name: "White short-grain", ratio: 1.25, stovetopMin: "18", cookerMin: "20-25", note: "Sticky, ideal for bowls." },
  { key: "basmati", name: "Basmati", ratio: 1.75, stovetopMin: "15", cookerMin: "20", note: "Rinse until water runs clear; 20 min soak improves texture." },
  { key: "jasmine", name: "Jasmine", ratio: 1.5, stovetopMin: "15", cookerMin: "20", note: "Fragrant; do not stir while cooking." },
  { key: "brown", name: "Brown rice", ratio: 2.5, stovetopMin: "45", cookerMin: "40-50", note: "Longer cook due to bran layer." },
  { key: "wild", name: "Wild rice", ratio: 3, stovetopMin: "45-60", cookerMin: "50-60", note: "Grains split open when fully cooked." },
  { key: "arborio", name: "Arborio (risotto)", ratio: 3, stovetopMin: "18-22", cookerMin: "n/a", note: "Cooked by gradual stock addition, not absorption boil." },
  { key: "sushi", name: "Sushi", ratio: 1.1, stovetopMin: "18", cookerMin: "20", note: "Season cooked rice with vinegar-sugar-salt mix." },
];

export function RiceToWaterRatio() {
  const [riceKey, setRiceKey] = useState("white-long");
  const [cups, setCups] = useState(1);

  const rice = RICE.find((r) => r.key === riceKey) ?? RICE[0];

  const out = useMemo(() => {
    const c = Number.isFinite(cups) && cups > 0 ? cups : 0;
    const waterCups = c * rice.ratio;
    const waterMl = waterCups * 236.588;
    return {
      waterCups,
      waterMl,
    };
  }, [cups, rice]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Rice type</span>
          <select
            value={riceKey}
            onChange={(e) => setRiceKey(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white"
          >
            {RICE.map((r) => (
              <option key={r.key} value={r.key}>{r.name} (1:{r.ratio})</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Cups of rice</span>
          <input
            type="number"
            step="0.25"
            min={0.25}
            value={cups}
            onChange={(e) => setCups(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Water</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{out.waterCups.toFixed(2)} cups</div>
          <div className="text-sm text-slate-600">{Math.round(out.waterMl)} ml</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Stovetop time</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{rice.stovetopMin} min</div>
          <div className="text-sm text-slate-600">Simmer covered, low heat</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Rice cooker</div>
          <div className="text-2xl font-semibold text-slate-900 mt-1">{rice.cookerMin} min</div>
          <div className="text-sm text-slate-600">Plus 10 min rest</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
        <strong>Note:</strong> {rice.note}
      </div>

      <div className="grid md:grid-cols-2 gap-3 text-xs">
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-blue-900">
          <strong>Stovetop:</strong> Bring to boil uncovered, then cover, reduce to lowest heat, don&rsquo;t lift lid. Rest 10 min off heat before fluffing.
        </div>
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
          <strong>Rice cooker:</strong> Use the manufacturer&rsquo;s line for that specific rice type if available &mdash; some cookers over-steam brown rice with standard ratios.
        </div>
      </div>
    </div>
  );
}
