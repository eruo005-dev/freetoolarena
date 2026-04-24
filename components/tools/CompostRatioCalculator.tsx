"use client";

import { useMemo, useState } from "react";

const GREEN_MATERIALS = [
  "Grass clippings (fresh)",
  "Fruit &amp; vegetable scraps",
  "Coffee grounds &amp; filters",
  "Tea bags",
  "Eggshells (crushed)",
  "Fresh garden trimmings",
  "Manure (herbivore only)",
  "Seaweed",
];

const BROWN_MATERIALS = [
  "Dry fall leaves",
  "Shredded cardboard",
  "Straw &amp; hay",
  "Sawdust (untreated)",
  "Pine needles",
  "Wood chips",
  "Shredded newspaper",
  "Dryer lint (natural fibers)",
];

const DO_NOT_ADD = [
  "Meat, fish, bones",
  "Dairy products",
  "Oils &amp; fats",
  "Diseased plants",
  "Pet waste (dog/cat)",
  "Treated wood or sawdust",
  "Coal/charcoal ash",
  "Weeds with mature seeds",
];

export function CompostRatioCalculator() {
  const [greenGal, setGreenGal] = useState(5);
  const [brownGal, setBrownGal] = useState(10);

  const result = useMemo(() => {
    const g = Number.isFinite(greenGal) && greenGal > 0 ? greenGal : 0;
    const b = Number.isFinite(brownGal) && brownGal > 0 ? brownGal : 0;
    if (g === 0 && b === 0) {
      return { ratio: "0:0", numeric: 0, tier: "empty", advice: "Add materials to start." };
    }
    if (g === 0) {
      return { ratio: `0:${(b / Math.max(g, 1)).toFixed(1)}`, numeric: Infinity, tier: "too dry", advice: "All brown, no green. Add greens to start microbial activity." };
    }
    const numeric = b / g; // brown per 1 green
    const target = 3; // target 1:3 green:brown
    let tier: "too wet" | "balanced" | "too dry";
    let advice = "";

    if (numeric < 2) {
      tier = "too wet";
      const needed = g * target - b;
      advice = `Too green/wet &mdash; add about ${needed.toFixed(1)} gal of brown material to reach 1:3.`;
    } else if (numeric > 4) {
      tier = "too dry";
      const neededGreen = b / target - g;
      advice = `Too brown/dry &mdash; add about ${neededGreen.toFixed(1)} gal of green material to reach 1:3.`;
    } else {
      tier = "balanced";
      advice = "Ratio is within the healthy 1:2 to 1:4 range. Turn weekly and keep moisture like a wrung-out sponge.";
    }

    return {
      ratio: `1:${numeric.toFixed(1)}`,
      numeric,
      tier,
      advice,
    };
  }, [greenGal, brownGal]);

  const tierColor =
    result.tier === "balanced"
      ? "border-emerald-200 bg-emerald-50 text-emerald-900"
      : result.tier === "too wet"
      ? "border-sky-200 bg-sky-50 text-sky-900"
      : "border-amber-200 bg-amber-50 text-amber-900";

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Green material (gallons)</span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={greenGal}
            onChange={(e) => setGreenGal(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <span className="text-xs text-slate-500">Grass, scraps, coffee grounds</span>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Brown material (gallons)</span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={brownGal}
            onChange={(e) => setBrownGal(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
          />
          <span className="text-xs text-slate-500">Dry leaves, cardboard, straw</span>
        </label>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs text-slate-500 uppercase tracking-wide">Current ratio (green:brown)</div>
          <div className="text-3xl font-semibold text-brand mt-1">{result.ratio}</div>
          <div className="text-sm text-slate-600">Target: 1:3 by volume (&asymp;30:1 C:N by mass)</div>
        </div>
        <div className={`rounded-xl border p-4 ${tierColor}`}>
          <div className="text-xs uppercase tracking-wide opacity-75">Pile health</div>
          <div className="text-2xl font-semibold mt-1 capitalize">{result.tier}</div>
          <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: result.advice }} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 text-sm">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
          <div className="font-semibold mb-1">Green (nitrogen)</div>
          <ul className="list-disc ml-5 space-y-0.5 text-xs">
            {GREEN_MATERIALS.map((m) => (
              <li key={m} dangerouslySetInnerHTML={{ __html: m }} />
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900">
          <div className="font-semibold mb-1">Brown (carbon)</div>
          <ul className="list-disc ml-5 space-y-0.5 text-xs">
            {BROWN_MATERIALS.map((m) => (
              <li key={m} dangerouslySetInnerHTML={{ __html: m }} />
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900">
          <div className="font-semibold mb-1">Do not add</div>
          <ul className="list-disc ml-5 space-y-0.5 text-xs">
            {DO_NOT_ADD.map((m) => (
              <li key={m} dangerouslySetInnerHTML={{ __html: m }} />
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>How it works:</strong> Compost microbes need a carbon-to-nitrogen balance around 30:1 by mass, which translates to roughly 1:3 greens-to-browns by volume since browns are bulkier. Too much green &rarr; slimy, ammonia smell. Too much brown &rarr; pile won&rsquo;t heat up.
      </div>
    </div>
  );
}
