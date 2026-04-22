"use client";

import { useMemo, useState } from "react";

function money(n: number): string {
  if (!Number.isFinite(n)) return "$0.00";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });
}

export function MovingCostCalculator() {
  // Truck
  const [truckDays, setTruckDays] = useState("2");
  const [truckRate, setTruckRate] = useState("80");
  // Movers
  const [moverHours, setMoverHours] = useState("6");
  const [moverRate, setMoverRate] = useState("120");
  // Supplies
  const [supplies, setSupplies] = useState("150");
  // Housing move-in
  const [deposit, setDeposit] = useState("1500");
  const [firstLast, setFirstLast] = useState("3000");
  // Utilities & cleaning
  const [utilitySetup, setUtilitySetup] = useState("100");
  const [cleaning, setCleaning] = useState("200");
  // Storage
  const [storageMonthly, setStorageMonthly] = useState("0");
  const [storageMonths, setStorageMonths] = useState("0");

  const { truck, movers, suppliesNum, housing, utilsClean, storage, total } = useMemo(() => {
    const num = (s: string) => Math.max(0, parseFloat(s) || 0);
    const truckCost = num(truckDays) * num(truckRate);
    const moversCost = num(moverHours) * num(moverRate);
    const sup = num(supplies);
    const housingCost = num(deposit) + num(firstLast);
    const utilClean = num(utilitySetup) + num(cleaning);
    const storageCost = num(storageMonthly) * num(storageMonths);
    const tot = truckCost + moversCost + sup + housingCost + utilClean + storageCost;
    return {
      truck: truckCost,
      movers: moversCost,
      suppliesNum: sup,
      housing: housingCost,
      utilsClean: utilClean,
      storage: storageCost,
      total: tot,
    };
  }, [truckDays, truckRate, moverHours, moverRate, supplies, deposit, firstLast, utilitySetup, cleaning, storageMonthly, storageMonths]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl border border-slate-200 bg-white">
        <Field label="Truck rental days" value={truckDays} onChange={setTruckDays} step={1} />
        <Field label="Truck rate per day ($)" value={truckRate} onChange={setTruckRate} />
        <Field label="Movers hours" value={moverHours} onChange={setMoverHours} step={0.5} />
        <Field label="Movers rate per hour ($)" value={moverRate} onChange={setMoverRate} />
        <Field label="Boxes / supplies flat ($)" value={supplies} onChange={setSupplies} />
        <Field label="Security deposit ($)" value={deposit} onChange={setDeposit} />
        <Field label="First + last month rent ($)" value={firstLast} onChange={setFirstLast} />
        <Field label="Utility setup fees ($)" value={utilitySetup} onChange={setUtilitySetup} />
        <Field label="Cleaning fees ($)" value={cleaning} onChange={setCleaning} />
        <Field label="Storage monthly ($)" value={storageMonthly} onChange={setStorageMonthly} />
        <Field label="Storage months" value={storageMonths} onChange={setStorageMonths} step={1} />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2">
        <div className="flex justify-between"><span>Truck rental</span><span className="font-semibold">{money(truck)}</span></div>
        <div className="flex justify-between"><span>Movers labor</span><span className="font-semibold">{money(movers)}</span></div>
        <div className="flex justify-between"><span>Boxes / supplies</span><span className="font-semibold">{money(suppliesNum)}</span></div>
        <div className="flex justify-between"><span>Housing move-in (deposit + first/last)</span><span className="font-semibold">{money(housing)}</span></div>
        <div className="flex justify-between"><span>Utilities + cleaning</span><span className="font-semibold">{money(utilsClean)}</span></div>
        <div className="flex justify-between"><span>Storage</span><span className="font-semibold">{money(storage)}</span></div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-bold">Total move cost (estimate)</span>
          <span className="font-bold text-brand">{money(total)}</span>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Estimates only. Actual costs vary by region, season, tolls, insurance, tips, and distance. Consider
        padding by 10–15% for surprises.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}
