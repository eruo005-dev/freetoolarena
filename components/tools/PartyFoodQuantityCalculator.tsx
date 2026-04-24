"use client";

import { useMemo, useState } from "react";

const fmtUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type Meal = "apps" | "full" | "dessert" | "bbq";

const MEAL_LABEL: Record<Meal, string> = {
  apps: "Appetizers only",
  full: "Full sit-down meal",
  dessert: "Dessert / cocktail reception",
  bbq: "BBQ / casual cookout",
};

export function PartyFoodQuantityCalculator() {
  const [guests, setGuests] = useState(30);
  const [meal, setMeal] = useState<Meal>("full");
  const [hours, setHours] = useState(3);

  const result = useMemo(() => {
    if (
      !Number.isFinite(guests) ||
      !Number.isFinite(hours) ||
      guests <= 0 ||
      hours <= 0
    ) {
      return null;
    }

    const appsBitesPer = meal === "apps" ? 7 : meal === "dessert" ? 5 : 2.5;
    const appBites = Math.ceil(guests * appsBitesPer * hours);

    const proteinOz = meal === "apps" ? 0 : meal === "dessert" ? 0 : 7;
    const proteinLbs = +(guests * proteinOz / 16).toFixed(1);

    const sideServings = meal === "full" || meal === "bbq" ? guests * 2.5 : 0;
    const sideLbs = +(sideServings * 4 / 16).toFixed(1);

    const saladCups = meal === "full" || meal === "bbq" ? guests : 0;
    const breadPieces = meal === "full" || meal === "bbq" ? Math.ceil(guests * 1.5) : 0;

    const dessertPortions = meal === "dessert" ? guests * 2 : guests;

    const waterOz = guests * (16 + 8 * hours);
    const waterBottles = Math.ceil(waterOz / 16.9);
    const softDrinks = Math.ceil(guests * hours);

    const costFood =
      appBites * 0.75 +
      proteinLbs * 8 +
      sideLbs * 4 +
      saladCups * 1.5 +
      breadPieces * 0.6 +
      dessertPortions * 3;
    const costDrinks = waterBottles * 0.5 + softDrinks * 0.75;
    const costTotal = costFood + costDrinks;

    return {
      appBites,
      proteinLbs,
      sideLbs,
      saladCups,
      breadPieces,
      dessertPortions,
      waterBottles,
      softDrinks,
      costFood,
      costDrinks,
      costTotal,
      costPerGuest: costTotal / guests,
    };
  }, [guests, meal, hours]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-slate-700">Guests</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Meal type</label>
          <select
            value={meal}
            onChange={(e) => setMeal(e.target.value as Meal)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            {(Object.keys(MEAL_LABEL) as Meal[]).map((m) => (
              <option key={m} value={m}>
                {MEAL_LABEL[m]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Duration (hours)</label>
          <input
            type="number"
            min="1"
            max="12"
            value={hours}
            onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-xs uppercase tracking-wide text-slate-500">Estimated grocery cost</div>
            <div className="mt-1 text-3xl font-semibold text-brand">{fmtUSD(result.costTotal)}</div>
            <div className="mt-1 text-sm text-slate-600">
              {fmtUSD(result.costPerGuest)} per guest &mdash; food {fmtUSD(result.costFood)}, drinks {fmtUSD(result.costDrinks)}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="text-sm font-semibold text-slate-800">Shopping checklist</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {result.appBites > 0 && (
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Appetizer bites</span>
                  <span className="font-medium">{result.appBites} pieces</span>
                </li>
              )}
              {result.proteinLbs > 0 && (
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Main protein (raw)</span>
                  <span className="font-medium">{result.proteinLbs} lbs</span>
                </li>
              )}
              {result.sideLbs > 0 && (
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Sides (2&ndash;3 varieties, 4 oz each)</span>
                  <span className="font-medium">{result.sideLbs} lbs total</span>
                </li>
              )}
              {result.saladCups > 0 && (
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Salad</span>
                  <span className="font-medium">{result.saladCups} cups</span>
                </li>
              )}
              {result.breadPieces > 0 && (
                <li className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Bread / rolls</span>
                  <span className="font-medium">{result.breadPieces} pieces</span>
                </li>
              )}
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span>Dessert portions</span>
                <span className="font-medium">{result.dessertPortions}</span>
              </li>
              <li className="flex justify-between border-b border-slate-100 pb-2">
                <span>Water (16.9 oz bottles)</span>
                <span className="font-medium">{result.waterBottles}</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Soft drinks (cans)</span>
                <span className="font-medium">{result.softDrinks}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
            Rule of thumb: plan for 6&ndash;8 oz protein, 4 oz per side, and 1 drink per hour per adult.
            Add 10% buffer for big eaters and unexpected guests.
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
          Enter guests and duration to calculate quantities.
        </div>
      )}
    </div>
  );
}
