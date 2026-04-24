"use client";

import { useMemo, useState } from "react";

export function TravelBudgetCalculator() {
  const [flightPerPerson, setFlightPerPerson] = useState(650);
  const [travelers, setTravelers] = useState(2);
  const [hotelRate, setHotelRate] = useState(180);
  const [nights, setNights] = useState(7);
  const [foodPerDay, setFoodPerDay] = useState(55);
  const [transportPerDay, setTransportPerDay] = useState(20);
  const [activitiesPerDay, setActivitiesPerDay] = useState(40);
  const [oneTime, setOneTime] = useState(250);

  const result = useMemo(() => {
    const nums = [flightPerPerson, travelers, hotelRate, nights, foodPerDay, transportPerDay, activitiesPerDay, oneTime];
    if (!nums.every(Number.isFinite) || travelers <= 0 || nights <= 0) return null;

    const flights = flightPerPerson * travelers;
    const hotel = hotelRate * nights;
    const food = foodPerDay * nights * travelers;
    const transport = transportPerDay * nights * travelers;
    const activities = activitiesPerDay * nights * travelers;
    const subtotal = flights + hotel + food + transport + activities + oneTime;
    const buffer = subtotal * 0.1;
    const total = subtotal + buffer;
    const perPerson = total / travelers;
    const perDay = total / nights;

    const rows = [
      { label: "Flights", value: flights },
      { label: "Hotel", value: hotel },
      { label: "Food", value: food },
      { label: "Transportation", value: transport },
      { label: "Activities", value: activities },
      { label: "One-time (gear/visas/insurance)", value: oneTime },
      { label: "10% buffer", value: buffer },
    ];

    return { total, perPerson, perDay, buffer, subtotal, rows };
  }, [flightPerPerson, travelers, hotelRate, nights, foodPerDay, transportPerDay, activitiesPerDay, oneTime]);

  const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Flight cost per person</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={flightPerPerson}
            onChange={(e) => setFlightPerPerson(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Travelers</span>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={travelers}
            onChange={(e) => setTravelers(Number(e.target.value))}
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
          <span className="mb-1 block text-slate-700">Nights</span>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={nights}
            onChange={(e) => setNights(Number(e.target.value))}
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
          <span className="mb-1 block text-slate-700">Transport ($/day/person)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={transportPerDay}
            onChange={(e) => setTransportPerDay(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">Activities ($/day/person)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={activitiesPerDay}
            onChange={(e) => setActivitiesPerDay(Number(e.target.value))}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-700">One-time costs ($)</span>
          <input
            type="number"
            min={0}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={oneTime}
            onChange={(e) => setOneTime(Number(e.target.value))}
          />
        </label>
      </div>

      {result && (
        <>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Grand total (with buffer)</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.total)}</div>
              <div className="text-xs text-slate-500">10% cushion included</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Per person</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.perPerson)}</div>
              <div className="text-xs text-slate-500">{travelers} traveler{travelers === 1 ? "" : "s"}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-sm text-slate-600">Per day</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{fmt(result.perDay)}</div>
              <div className="text-xs text-slate-500">across {nights} night{nights === 1 ? "" : "s"}</div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-2 text-left">Category</th>
                  <th className="px-3 py-2 text-right">Amount</th>
                  <th className="px-3 py-2 text-right">% of total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.rows.map((r) => (
                  <tr key={r.label}>
                    <td className="px-3 py-2">{r.label}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{fmt(r.value)}</td>
                    <td className="px-3 py-2 text-right tabular-nums">
                      {((r.value / result.total) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
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
            The 10% buffer covers the things you can&rsquo;t forecast &mdash; cab to the airport, a nicer dinner, a
            forgotten charger. Most trips come in 8&ndash;15% over plan, so this keeps you honest.
          </p>
        </>
      )}
    </div>
  );
}
