"use client";

import { useMemo, useState } from "react";

function tierFor(h: number): { label: string; color: string; description: string } {
  if (h < 65) return { label: "Stiff dough", color: "bg-amber-100 text-amber-800", description: "Bagels, pretzels, stiff-starter breads" };
  if (h < 70) return { label: "Low hydration", color: "bg-orange-100 text-orange-800", description: "Pizza, sandwich loaves, ciabatta base" };
  if (h < 76) return { label: "Classic sourdough", color: "bg-emerald-100 text-emerald-800", description: "Standard open-crumb country loaf" };
  if (h < 86) return { label: "High hydration", color: "bg-blue-100 text-blue-800", description: "Open crumb, requires skilled handling" };
  return { label: "Expert level", color: "bg-purple-100 text-purple-800", description: "Ciabatta, focaccia, very wet doughs" };
}

export function SourdoughHydrationCalculator() {
  const [flour, setFlour] = useState("500");
  const [water, setWater] = useState("350");
  const [starter, setStarter] = useState("100");
  const [starterHydration, setStarterHydration] = useState("100");
  const [saltPct, setSaltPct] = useState("2");
  const [targetWeight, setTargetWeight] = useState("950");

  const result = useMemo(() => {
    const f = parseFloat(flour);
    const w = parseFloat(water);
    const s = parseFloat(starter);
    const sh = parseFloat(starterHydration);
    const sp = parseFloat(saltPct);

    if (![f, w, s, sh, sp].every((v) => Number.isFinite(v) && v >= 0)) return null;
    if (f === 0) return null;

    // Starter composition: for 100% hydration, half is flour half is water
    const starterFlourRatio = 1 / (1 + sh / 100);
    const starterFlour = s * starterFlourRatio;
    const starterWater = s - starterFlour;

    const totalFlour = f + starterFlour;
    const totalWater = w + starterWater;
    const salt = (sp / 100) * totalFlour;

    const hydration = (totalWater / totalFlour) * 100;
    const totalDough = totalFlour + totalWater + salt;

    const tier = tierFor(hydration);

    // Scale to target weight
    const tw = parseFloat(targetWeight);
    let scaled = null;
    if (Number.isFinite(tw) && tw > 0) {
      const factor = tw / totalDough;
      scaled = {
        flour: f * factor,
        water: w * factor,
        starter: s * factor,
        salt: salt * factor,
        total: totalDough * factor,
      };
    }

    return {
      hydration,
      totalFlour,
      totalWater,
      salt,
      totalDough,
      starterFlour,
      starterWater,
      tier,
      scaled,
    };
  }, [flour, water, starter, starterHydration, saltPct, targetWeight]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Flour (g)</span>
          <input
            type="number"
            min="0"
            value={flour}
            onChange={(e) => setFlour(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Water (g)</span>
          <input
            type="number"
            min="0"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Starter (g)</span>
          <input
            type="number"
            min="0"
            value={starter}
            onChange={(e) => setStarter(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Starter hydration (%)</span>
          <input
            type="number"
            min="0"
            value={starterHydration}
            onChange={(e) => setStarterHydration(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Salt (% of flour)</span>
          <input
            type="number"
            min="0"
            step="0.1"
            value={saltPct}
            onChange={(e) => setSaltPct(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Target dough weight (g)</span>
          <input
            type="number"
            min="0"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm text-slate-600">Total hydration</div>
            <div className="mt-1 text-4xl font-bold text-brand">{result.hydration.toFixed(1)}%</div>
            <div className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${result.tier.color}`}>
              {result.tier.label}
            </div>
            <div className="mt-1 text-xs text-slate-500">{result.tier.description}</div>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <div className="rounded-lg bg-white border border-slate-200 p-3 text-sm">
              <div className="text-slate-500">Total flour</div>
              <div className="font-semibold text-slate-900">{result.totalFlour.toFixed(0)} g</div>
              <div className="text-xs text-slate-500">(incl. {result.starterFlour.toFixed(0)}g from starter)</div>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-3 text-sm">
              <div className="text-slate-500">Total water</div>
              <div className="font-semibold text-slate-900">{result.totalWater.toFixed(0)} g</div>
              <div className="text-xs text-slate-500">(incl. {result.starterWater.toFixed(0)}g from starter)</div>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-3 text-sm">
              <div className="text-slate-500">Salt</div>
              <div className="font-semibold text-slate-900">{result.salt.toFixed(1)} g</div>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-3 text-sm">
              <div className="text-slate-500">Total dough</div>
              <div className="font-semibold text-slate-900">{result.totalDough.toFixed(0)} g</div>
            </div>
          </div>

          {result.scaled && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="mb-2 text-sm font-semibold text-emerald-900">
                Scaled recipe to {parseFloat(targetWeight).toFixed(0)}g total
              </div>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <div className="flex justify-between"><span>Flour</span><span className="font-medium">{result.scaled.flour.toFixed(0)} g</span></div>
                <div className="flex justify-between"><span>Water</span><span className="font-medium">{result.scaled.water.toFixed(0)} g</span></div>
                <div className="flex justify-between"><span>Starter</span><span className="font-medium">{result.scaled.starter.toFixed(0)} g</span></div>
                <div className="flex justify-between"><span>Salt</span><span className="font-medium">{result.scaled.salt.toFixed(1)} g</span></div>
              </div>
            </div>
          )}
        </>
      )}

      <p className="text-xs text-slate-500">
        Hydration accounts for water contribution from your starter (half its weight at 100% hydration). Tiers:
        55&ndash;65% stiff, 70&ndash;75% classic, 80&ndash;85% high-hydration, 90%+ expert.
      </p>
    </div>
  );
}
