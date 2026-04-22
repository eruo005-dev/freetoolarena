"use client";

import { useMemo, useState } from "react";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function TripCostCalculator() {
  const [transport, setTransport] = useState("450");
  const [lodgingPerNight, setLodgingPerNight] = useState("120");
  const [nights, setNights] = useState("5");
  const [foodPerDay, setFoodPerDay] = useState("60");
  const [days, setDays] = useState("6");
  const [activities, setActivities] = useState("200");
  const [localTransport, setLocalTransport] = useState("80");
  const [buffer, setBuffer] = useState("10");
  const [travelers, setTravelers] = useState("2");

  const { subtotal, bufferAmt, total, perDay, perPerson, lodging, food } = useMemo(() => {
    const t = Math.max(0, parseFloat(transport) || 0);
    const ln = Math.max(0, parseFloat(lodgingPerNight) || 0);
    const n = Math.max(0, parseFloat(nights) || 0);
    const fd = Math.max(0, parseFloat(foodPerDay) || 0);
    const d = Math.max(0, parseFloat(days) || 0);
    const a = Math.max(0, parseFloat(activities) || 0);
    const lt = Math.max(0, parseFloat(localTransport) || 0);
    const b = Math.max(0, parseFloat(buffer) || 0);
    const p = Math.max(1, parseFloat(travelers) || 1);

    const lod = ln * n;
    const fo = fd * d;
    const sub = t + lod + fo + a + lt;
    const buf = sub * (b / 100);
    const tot = sub + buf;
    return {
      subtotal: sub,
      bufferAmt: buf,
      total: tot,
      perDay: d > 0 ? tot / d : 0,
      perPerson: tot / p,
      lodging: lod,
      food: fo,
    };
  }, [transport, lodgingPerNight, nights, foodPerDay, days, activities, localTransport, buffer, travelers]);

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Flights / fuel (round-trip)" value={transport} onChange={setTransport} />
        <Field label="Travelers" value={travelers} onChange={setTravelers} step={1} />
        <Field label="Lodging per night ($)" value={lodgingPerNight} onChange={setLodgingPerNight} />
        <Field label="Nights" value={nights} onChange={setNights} step={1} />
        <Field label="Food per day ($)" value={foodPerDay} onChange={setFoodPerDay} />
        <Field label="Days" value={days} onChange={setDays} step={1} />
        <Field label="Activities total ($)" value={activities} onChange={setActivities} />
        <Field label="Local transport ($)" value={localTransport} onChange={setLocalTransport} />
        <Field label="Misc buffer (%)" value={buffer} onChange={setBuffer} step={1} />
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <Stat label="Lodging total" value={fmt.format(lodging)} />
        <Stat label="Food total" value={fmt.format(food)} />
        <Stat label="Subtotal" value={fmt.format(subtotal)} />
        <Stat label={`Buffer (${buffer}%)`} value={fmt.format(bufferAmt)} />
        <Stat label="Per day" value={fmt.format(perDay)} />
        <Stat label="Per person" value={fmt.format(perPerson)} />
        <div className="sm:col-span-2 border-t border-slate-200 pt-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">Grand total</p>
          <p className="text-3xl font-bold text-brand">{fmt.format(total)}</p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 0.01,
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
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1">{label}</p>
      <p className="text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
