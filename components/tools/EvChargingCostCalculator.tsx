"use client";

import { useMemo, useState } from "react";

const HOME_KW = 7; // Level 2 AC
const FAST_KW = 150; // DC fast charger average
const GAS_MPG = 30;
const GAS_PRICE = 3.5;
const MI_PER_KWH = 3.5; // typical EV efficiency

function currency(n: number): string {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function fmtTime(hours: number): string {
  if (!Number.isFinite(hours) || hours <= 0) return "0 min";
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export function EvChargingCostCalculator() {
  const [battery, setBattery] = useState("75");
  const [current, setCurrent] = useState("20");
  const [homeTarget, setHomeTarget] = useState("100");
  const [fastTarget, setFastTarget] = useState("80");
  const [homeEff, setHomeEff] = useState("90");
  const [fastEff, setFastEff] = useState("95");
  const [homeRate, setHomeRate] = useState("0.17");
  const [fastRate, setFastRate] = useState("0.43");

  const result = useMemo(() => {
    const bat = parseFloat(battery);
    const cur = parseFloat(current);
    const hTgt = parseFloat(homeTarget);
    const fTgt = parseFloat(fastTarget);
    const hEff = parseFloat(homeEff) / 100;
    const fEff = parseFloat(fastEff) / 100;
    const hRate = parseFloat(homeRate);
    const fRate = parseFloat(fastRate);

    if (![bat, cur, hTgt, fTgt, hEff, fEff, hRate, fRate].every(Number.isFinite)) return null;
    if (bat <= 0 || hTgt <= cur || fTgt <= cur || hEff <= 0 || fEff <= 0) return null;

    const homeKwhDelivered = ((hTgt - cur) / 100) * bat;
    const homeKwhDrawn = homeKwhDelivered / hEff;
    const homeCost = homeKwhDrawn * hRate;
    const homeHours = homeKwhDelivered / HOME_KW;
    const homeMiles = homeKwhDelivered * MI_PER_KWH;
    const homePerMile = homeMiles > 0 ? homeCost / homeMiles : 0;

    const fastKwhDelivered = ((fTgt - cur) / 100) * bat;
    const fastKwhDrawn = fastKwhDelivered / fEff;
    const fastCost = fastKwhDrawn * fRate;
    const fastHours = fastKwhDelivered / FAST_KW;
    const fastMiles = fastKwhDelivered * MI_PER_KWH;
    const fastPerMile = fastMiles > 0 ? fastCost / fastMiles : 0;

    const gasPerMile = GAS_PRICE / GAS_MPG;

    return {
      homeKwhDelivered,
      homeKwhDrawn,
      homeCost,
      homeHours,
      homeMiles,
      homePerMile,
      fastKwhDelivered,
      fastKwhDrawn,
      fastCost,
      fastHours,
      fastMiles,
      fastPerMile,
      gasPerMile,
    };
  }, [battery, current, homeTarget, fastTarget, homeEff, fastEff, homeRate, fastRate]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Battery size (kWh)</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            step={1}
            value={battery}
            onChange={(e) => setBattery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Current battery %</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step={1}
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Home target %</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step={1}
            value={homeTarget}
            onChange={(e) => setHomeTarget(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fast-charge target %</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            max={100}
            step={1}
            value={fastTarget}
            onChange={(e) => setFastTarget(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Home efficiency %</span>
          <input
            type="number"
            inputMode="decimal"
            min={50}
            max={100}
            step={1}
            value={homeEff}
            onChange={(e) => setHomeEff(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">DC fast efficiency %</span>
          <input
            type="number"
            inputMode="decimal"
            min={50}
            max={100}
            step={1}
            value={fastEff}
            onChange={(e) => setFastEff(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Home rate ($/kWh)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={homeRate}
            onChange={(e) => setHomeRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fast-charger rate ($/kWh)</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={fastRate}
            onChange={(e) => setFastRate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      {result ? (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-5 space-y-2">
              <p className="text-xs uppercase tracking-wide font-semibold text-emerald-700">Home (Level 2)</p>
              <p className="text-3xl font-bold text-emerald-900">{currency(result.homeCost)}</p>
              <p className="text-sm text-emerald-900">{result.homeKwhDelivered.toFixed(1)} kWh delivered &middot; {result.homeKwhDrawn.toFixed(1)} kWh drawn</p>
              <p className="text-sm text-emerald-900">Time: {fmtTime(result.homeHours)} @ {HOME_KW} kW</p>
              <p className="text-sm text-emerald-900">{currency(result.homePerMile)}/mi &middot; ~{Math.round(result.homeMiles)} mi added</p>
            </div>
            <div className="rounded-xl bg-orange-50 border border-orange-200 p-5 space-y-2">
              <p className="text-xs uppercase tracking-wide font-semibold text-orange-700">DC fast charging</p>
              <p className="text-3xl font-bold text-orange-900">{currency(result.fastCost)}</p>
              <p className="text-sm text-orange-900">{result.fastKwhDelivered.toFixed(1)} kWh delivered &middot; {result.fastKwhDrawn.toFixed(1)} kWh drawn</p>
              <p className="text-sm text-orange-900">Time: {fmtTime(result.fastHours)} @ {FAST_KW} kW</p>
              <p className="text-sm text-orange-900">{currency(result.fastPerMile)}/mi &middot; ~{Math.round(result.fastMiles)} mi added</p>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-5 space-y-2">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">Comparable gas car ({GAS_MPG} MPG at {currency(GAS_PRICE)}/gal)</p>
            <p className="text-xl font-bold text-slate-900">{currency(result.gasPerMile)}/mi</p>
            <p className="text-sm text-slate-700">
              Home charging saves {currency(Math.max(0, result.gasPerMile - result.homePerMile))}/mi &mdash; fast charging saves {currency(Math.max(0, result.gasPerMile - result.fastPerMile))}/mi.
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">Enter valid values &mdash; target percentages must exceed current.</div>
      )}

      <p className="text-xs text-slate-500">
        Time estimates assume sustained rates. Real DC fast charging tapers above 80% &mdash; that&rsquo;s why most road-trip stops cap at 80%. Home charging loss (~10%) comes from AC-to-DC conversion; DC fast is more efficient but grid demand charges raise the per-kWh price.
      </p>
    </div>
  );
}
