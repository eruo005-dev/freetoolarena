"use client";

import { useMemo, useState } from "react";

type PetType = "dog" | "cat";
type Size = "small" | "medium" | "large" | "xl";
type Tier = "budget" | "standard" | "premium" | "luxury";

const DOG_STD: Record<Size, number> = { small: 35, medium: 45, large: 55, xl: 65 };
const CAT_STD: Record<Size, number> = { small: 20, medium: 25, large: 30, xl: 35 };

const TIER_MULT: Record<Tier, number> = {
  budget: 0.8,
  standard: 1,
  premium: 1.5,
  luxury: 2,
};

const EXTRAS = [
  { id: "walk", label: "Daily walk", price: 10, perNight: true },
  { id: "play", label: "Group play session", price: 15, perNight: true },
  { id: "training", label: "Training session (one-time)", price: 25, perNight: false },
  { id: "meds", label: "Medication administration (daily)", price: 5, perNight: true },
  { id: "nails", label: "Nail trim (one-time)", price: 15, perNight: false },
  { id: "bath", label: "Bath (one-time)", price: 25, perNight: false },
] as const;

function money(n: number) {
  return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function KennelBoardingCostCalculator() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [size, setSize] = useState<Size>("medium");
  const [tier, setTier] = useState<Tier>("standard");
  const [nights, setNights] = useState(5);
  const [earlyCheckout, setEarlyCheckout] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({
    walk: true,
  });

  const result = useMemo(() => {
    const base = petType === "dog" ? DOG_STD[size] : CAT_STD[size];
    const nightly = base * TIER_MULT[tier];
    if (!Number.isFinite(nightly) || !Number.isFinite(nights) || nights < 1)
      return null;
    const billedNights = earlyCheckout ? Math.max(1, nights - 1) : nights;
    const lodging = nightly * billedNights;

    let extrasTotal = 0;
    const extraLines: { label: string; amount: number }[] = [];
    for (const ex of EXTRAS) {
      if (!selectedExtras[ex.id]) continue;
      const amount = ex.perNight ? ex.price * billedNights : ex.price;
      extrasTotal += amount;
      extraLines.push({ label: ex.label, amount });
    }
    return {
      nightly,
      billedNights,
      lodging,
      extrasTotal,
      extraLines,
      grand: lodging + extrasTotal,
    };
  }, [petType, size, tier, nights, earlyCheckout, selectedExtras]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Pet type</span>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value as PetType)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Size</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as Size)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="xl">Extra-large</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Kennel tier</span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="budget">Budget</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="luxury">Luxury</option>
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">Nights</span>
          <input
            type="number"
            min={1}
            value={nights}
            onChange={(e) => setNights(parseInt(e.target.value) || 0)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <fieldset className="rounded-md border border-gray-200 p-3">
        <legend className="px-2 text-sm font-medium text-gray-700">Add-on services</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {EXTRAS.map((ex) => (
            <label key={ex.id} className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={!!selectedExtras[ex.id]}
                onChange={(e) =>
                  setSelectedExtras((prev) => ({ ...prev, [ex.id]: e.target.checked }))
                }
              />
              <span>
                {ex.label} &mdash; ${ex.price}
                {ex.perNight ? "/night" : " flat"}
              </span>
            </label>
          ))}
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={earlyCheckout}
            onChange={(e) => setEarlyCheckout(e.target.checked)}
          />
          <span>Early checkout on pickup day (bill one fewer night)</span>
        </label>
      </fieldset>

      {result ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <Line label={`Nightly rate (${tier})`} value={money(result.nightly)} />
          <Line label={`Lodging (${result.billedNights} night${result.billedNights === 1 ? "" : "s"})`} value={money(result.lodging)} />
          {result.extraLines.map((x, i) => (
            <Line key={i} label={x.label} value={money(x.amount)} />
          ))}
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="text-sm font-medium text-gray-700">Grand total</span>
            <span className="text-2xl font-semibold text-brand">{money(result.grand)}</span>
          </div>
          <p className="text-xs text-gray-500">
            Daycare alternative &mdash; if your pet only needs care during business hours,
            doggy daycare runs roughly $20&ndash;$40/day and skips the overnight markup.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}
