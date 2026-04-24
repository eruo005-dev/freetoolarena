"use client";

import { useMemo, useState } from "react";

const MPH_AVG = 55;

export function RoadTripPlanner() {
  const [miles, setMiles] = useState(1200);
  const [mpg, setMpg] = useState(28);
  const [gasPrice, setGasPrice] = useState(3.75);
  const [hoursPerDay, setHoursPerDay] = useState(6);
  const [hotelRate, setHotelRate] = useState(140);
  const [foodPerDay, setFoodPerDay] = useState(45);
  const [attractionsPerDay, setAttractionsPerDay] = useState(30);
  const [travelers, setTravelers] = useState(2);

  const result = useMemo(() => {
    const nums = [miles, mpg, gasPrice, hoursPerDay, hotelRate, foodPerDay, attractionsPerDay, travelers];
    if (!nums.every(Number.isFinite) || mpg <= 0 || hoursPerDay <= 0 || travelers <= 0) return null;

    const rawDays = miles / (MPH_AVG * hoursPerDay);
    const days = Math.max(1, Math.ceil(rawDays));
    const fuel = (miles / mpg) * gasPrice;
    const hotel = Math.max(0, days - 1) * hotelRate;
    const food = days * foodPerDay * travelers;
    const attractions = days * attractionsPerDay;
    const total = fuel + hotel + food + attractions;
    const perPerson = total / travelers;

    return { days, rawDays, fuel, hotel, food, attractions, total, perPerson };
  }, [miles, mpg, gasPrice, hoursPerDay, hotelRate, foodPerDay, attractionsPerDay, travelers]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Total distance (miles)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={miles}
            onChange={(e) => setMiles(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Average MPG</span>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={mpg}
            onChange={(e) => setMpg(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Gas price ($/gallon)</span>
          <input
            type="number"
            min={0}
            step={0.01}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={gasPrice}
            onChange={(e) => setGasPrice(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Driving hours per day</span>
          <input
            type="number"
            min={1}
            max={16}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Hotel rate ($/night)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={hotelRate}
            onChange={(e) => setHotelRate(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Food ($/day/person)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={foodPerDay}
            onChange={(e) => setFoodPerDay(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Attractions ($/day total)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={attractionsPerDay}
            onChange={(e) => setAttractionsPerDay(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Number of travelers</span>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
          />
        </label>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Grand total</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.total)}</div>
              <div className="text-xs text-slate-500">
                {result.days} day{result.days === 1 ? "" : "s"} on the road &mdash; {fmt(result.perPerson)} per person
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Fuel</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.fuel)}</div>
              <div className="text-xs text-slate-500">
                {(miles / mpg).toFixed(1)} gallons at {fmt(gasPrice)}/gal
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-right">Cost</th>
                  <th className="px-3 py-2 text-right">% of total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-2">Fuel</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(result.fuel)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {((result.fuel / result.total) * 100).toFixed(0)}%
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Hotels ({Math.max(0, result.days - 1)} nights)</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(result.hotel)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {((result.hotel / result.total) * 100).toFixed(0)}%
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Food ({travelers} &times; {result.days} days)</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(result.food)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {((result.food / result.total) * 100).toFixed(0)}%
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-2">Attractions</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(result.attractions)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {((result.attractions / result.total) * 100).toFixed(0)}%
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 font-semibold">
                <tr>
                  <td className="px-3 py-2">Total</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(result.total)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">100%</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <p className="text-xs text-slate-500">
            Day count assumes ~{MPH_AVG} mph rolling average including stops. Hotel cost uses days &minus; 1 nights since you
            arrive home on the final day.
          </p>
        </>
      )}
    </div>
  );
}
