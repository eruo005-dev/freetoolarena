"use client";

import { useMemo, useState } from "react";

type PetType = "dog" | "cat";
type TravelMode = "car" | "cabin" | "cargo";
type Tier = "budget" | "mid" | "luxury";

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function PetTravelCostEstimator() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [mode, setMode] = useState<TravelMode>("cabin");
  const [tripDays, setTripDays] = useState("7");
  const [hotelNights, setHotelNights] = useState("6");
  const [tier, setTier] = useState<Tier>("mid");

  const result = useMemo(() => {
    const days = Number(tripDays);
    const nights = Number(hotelNights);
    if (!Number.isFinite(days) || days <= 0) return null;
    if (!Number.isFinite(nights) || nights < 0) return null;

    // Transport (round trip)
    let transport = 0;
    if (mode === "car") {
      transport = petType === "dog" ? 40 : 25; // carrier, pee pads, gear
    } else if (mode === "cabin") {
      // avg $140 one-way
      transport = 140 * 2;
    } else {
      // cargo avg $300 one-way
      transport = 300 * 2;
    }

    // Hotel surcharge per night by tier
    const perNight = tier === "budget" ? 20 : tier === "mid" ? 35 : 75;
    let hotelFees = perNight * nights;
    // Many luxury hotels do a flat fee instead of per-night
    if (tier === "luxury") {
      hotelFees = Math.min(hotelFees, 150 + 25 * nights);
    }

    // Supplies buffer
    const supplies = 50;

    const total = transport + hotelFees + supplies;

    // Boarding alternative
    const boardingPerNight = petType === "dog" ? 55 : 35;
    const boardingCost = boardingPerNight * days;

    const savings = boardingCost - total;
    // Break-even days: at what trip length does bringing equal boarding?
    // Fixed bring cost = transport + supplies; variable hotel = perNight * d
    // Boarding = boardingPerNight * d
    // Solve boardingPerNight * d = transport + supplies + perNight * d
    const denom = boardingPerNight - perNight;
    const breakEven =
      denom > 0 ? (transport + supplies) / denom : null;

    return {
      transport,
      hotelFees,
      supplies,
      total,
      boardingCost,
      boardingPerNight,
      savings,
      breakEven:
        breakEven === null || !Number.isFinite(breakEven)
          ? null
          : Math.ceil(breakEven),
    };
  }, [petType, mode, tripDays, hotelNights, tier]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Pet type</span>
          <select
            value={petType}
            onChange={(e) => setPetType(e.target.value as PetType)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Travel mode</span>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as TravelMode)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="car">Car (drive)</option>
            <option value="cabin">Plane &mdash; in-cabin carrier</option>
            <option value="cargo">Plane &mdash; cargo hold</option>
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Trip length (days)</span>
          <input
            type="number"
            min={1}
            step={1}
            value={tripDays}
            onChange={(e) => setTripDays(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Hotel nights with pet</span>
          <input
            type="number"
            min={0}
            step={1}
            value={hotelNights}
            onChange={(e) => setHotelNights(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm sm:col-span-2">
          <span className="font-medium">Destination cost tier</span>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as Tier)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="budget">Budget (~$20/night pet fee)</option>
            <option value="mid">Mid-range (~$35/night)</option>
            <option value="luxury">Luxury (flat fee $150 + $25/night)</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div>
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Estimated trip cost (bring pet)
            </div>
            <div className="text-3xl font-semibold text-brand">
              {currency(result.total)}
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Transport
              </div>
              <div className="text-lg font-semibold">{currency(result.transport)}</div>
            </div>
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Hotel pet fees
              </div>
              <div className="text-lg font-semibold">{currency(result.hotelFees)}</div>
            </div>
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Gear &amp; supplies
              </div>
              <div className="text-lg font-semibold">{currency(result.supplies)}</div>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-3 text-sm shadow-sm">
            <div className="font-semibold">Boarding comparison</div>
            <div className="mt-1 text-slate-700">
              Leaving your pet at a kennel (~{currency(result.boardingPerNight)}/night):{" "}
              <span className="font-semibold">{currency(result.boardingCost)}</span>
            </div>
            <div className="mt-1 text-slate-700">
              {result.savings > 0 ? (
                <>
                  Bringing your pet saves{" "}
                  <span className="font-semibold">{currency(result.savings)}</span> over
                  boarding.
                </>
              ) : (
                <>
                  Boarding is cheaper by{" "}
                  <span className="font-semibold">
                    {currency(Math.abs(result.savings))}
                  </span>{" "}
                  on this trip.
                </>
              )}
            </div>
            {result.breakEven !== null && (
              <div className="mt-1 text-xs text-slate-500">
                Break-even: trips of {result.breakEven}+ days tend to favor bringing your
                pet over boarding, given these inputs.
              </div>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Cabin fees: Delta ~$95, United ~$125, American ~$200 each way. Cargo
            (unaccompanied) runs $200&ndash;$400 per leg. Always confirm airline and
            hotel policies before booking.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter valid trip length and nights.</p>
      )}
    </div>
  );
}
