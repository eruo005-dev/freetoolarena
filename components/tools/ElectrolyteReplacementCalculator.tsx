"use client";
import { useMemo, useState } from "react";

export function ElectrolyteReplacementCalculator() {
  const [weight, setWeight] = useState("165");
  const [sweat, setSweat] = useState<"moderate" | "heavy">("moderate");
  const [hours, setHours] = useState("1.5");
  const [climate, setClimate] = useState<"warm" | "hot">("warm");

  const lbs = useMemo(() => {
    const x = Number(weight);
    return Number.isFinite(x) && x > 0 ? x : 0;
  }, [weight]);
  const dur = useMemo(() => {
    const x = Number(hours);
    return Number.isFinite(x) && x > 0 ? x : 0;
  }, [hours]);

  const out = useMemo(() => {
    const sweatRate = sweat === "heavy" ? 32 : 20;
    const climateMult = climate === "hot" ? 1.2 : 1.0;
    const waterOz = sweatRate * dur * climateMult;
    const sodiumMgPerHr = sweat === "heavy" ? 900 : 600;
    const sodiumMg = sodiumMgPerHr * dur * climateMult;
    const potassiumMgPerHr = sweat === "heavy" ? 200 : 150;
    const potassiumMg = potassiumMgPerHr * dur * climateMult;
    const note = lbs > 200 ? "+10% for larger body mass" : "";
    const mult = lbs > 200 ? 1.1 : 1.0;
    return {
      water: Math.round(waterOz * mult),
      sodium: Math.round(sodiumMg * mult / 10) * 10,
      potassium: Math.round(potassiumMg * mult / 10) * 10,
      note,
    };
  }, [sweat, climate, dur, lbs]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Body weight (lbs)</span>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Duration (hrs)</span>
          <input type="number" step="0.25" value={hours} onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono" />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Sweat rate</span>
          <select value={sweat} onChange={(e) => setSweat(e.target.value as "moderate" | "heavy")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="moderate">Moderate</option>
            <option value="heavy">Heavy</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Climate</span>
          <select value={climate} onChange={(e) => setClimate(e.target.value as "warm" | "hot")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="warm">Warm</option>
            <option value="hot">Hot / humid</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-4 space-y-3">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Water target</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{out.water} oz</div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Sodium</div>
            <div className="text-lg font-semibold tabular-nums">{out.sodium} mg</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Potassium</div>
            <div className="text-lg font-semibold tabular-nums">{out.potassium} mg</div>
          </div>
        </div>
        {out.note ? <div className="text-xs text-slate-500">{out.note}</div> : null}
      </div>

      <p className="text-xs text-slate-500">Not medical advice &mdash; consult a provider, especially if you have kidney, heart, or blood pressure conditions.</p>
    </div>
  );
}
