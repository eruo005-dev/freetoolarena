"use client";

import { useMemo, useState } from "react";

type DistUnit = "mi" | "km";
type EconUnit = "mpg_us" | "mpg_uk" | "l_100km" | "km_l";
type PriceUnit = "gal_us" | "gal_uk" | "liter";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const KM_PER_MI = 1.609344;
const L_PER_GAL_US = 3.785411784;
const L_PER_GAL_UK = 4.54609;

export function FuelCostCalculator() {
  const [distance, setDistance] = useState("300");
  const [distUnit, setDistUnit] = useState<DistUnit>("mi");
  const [economy, setEconomy] = useState("28");
  const [econUnit, setEconUnit] = useState<EconUnit>("mpg_us");
  const [price, setPrice] = useState("3.50");
  const [priceUnit, setPriceUnit] = useState<PriceUnit>("gal_us");

  const { fuelLiters, cost, costPerDistUnit, distKm } = useMemo(() => {
    const dist = Math.max(0, parseFloat(distance) || 0);
    const econ = Math.max(0.0001, parseFloat(economy) || 0.0001);
    const pr = Math.max(0, parseFloat(price) || 0);
    const km = distUnit === "mi" ? dist * KM_PER_MI : dist;

    let liters = 0;
    if (econUnit === "mpg_us") {
      const gallons = (km / KM_PER_MI) / econ;
      liters = gallons * L_PER_GAL_US;
    } else if (econUnit === "mpg_uk") {
      const gallons = (km / KM_PER_MI) / econ;
      liters = gallons * L_PER_GAL_UK;
    } else if (econUnit === "l_100km") {
      liters = (km / 100) * econ;
    } else {
      liters = km / econ;
    }

    let pricePerL = 0;
    if (priceUnit === "gal_us") pricePerL = pr / L_PER_GAL_US;
    else if (priceUnit === "gal_uk") pricePerL = pr / L_PER_GAL_UK;
    else pricePerL = pr;

    const c = liters * pricePerL;
    const perUnit = dist > 0 ? c / dist : 0;
    return { fuelLiters: liters, cost: c, costPerDistUnit: perUnit, distKm: km };
  }, [distance, distUnit, economy, econUnit, price, priceUnit]);

  const fuelGalUs = fuelLiters / L_PER_GAL_US;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Distance</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={1}
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Distance unit</span>
          <select
            value={distUnit}
            onChange={(e) => setDistUnit(e.target.value as DistUnit)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="mi">miles</option>
            <option value="km">kilometers</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fuel economy</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.1}
            value={economy}
            onChange={(e) => setEconomy(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Economy unit</span>
          <select
            value={econUnit}
            onChange={(e) => setEconUnit(e.target.value as EconUnit)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="mpg_us">MPG (US)</option>
            <option value="mpg_uk">MPG (UK)</option>
            <option value="l_100km">L / 100km</option>
            <option value="km_l">km / L</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Fuel price</span>
          <input
            type="number"
            inputMode="decimal"
            min={0}
            step={0.01}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Price unit</span>
          <select
            value={priceUnit}
            onChange={(e) => setPriceUnit(e.target.value as PriceUnit)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="gal_us">$ / gallon (US)</option>
            <option value="gal_uk">$ / gallon (UK)</option>
            <option value="liter">$ / liter</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Fuel needed</p>
          <p className="text-xl font-bold text-slate-900">
            {fuelLiters.toFixed(2)} L <span className="text-slate-500 text-sm">({fuelGalUs.toFixed(2)} gal US)</span>
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">
            Cost per {distUnit}
          </p>
          <p className="text-xl font-bold text-slate-900">{fmt.format(costPerDistUnit)}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Total trip cost</p>
          <p className="text-3xl font-bold text-brand">{fmt.format(cost)}</p>
          <p className="text-xs text-slate-500 mt-1">Distance: {distKm.toFixed(1)} km equivalent</p>
        </div>
      </div>
    </div>
  );
}
