"use client";

import { useMemo, useState } from "react";

type VehicleType =
  | "compact"
  | "mid_sedan"
  | "full_sedan"
  | "small_suv"
  | "large_suv"
  | "pickup"
  | "minivan"
  | "sports";

const DATA: Record<VehicleType, { label: string; front: number; rear: number; note: string }> = {
  compact: {
    label: "Compact car (e.g. Civic, Corolla)",
    front: 32,
    rear: 30,
    note: "Cold reading. Light loads. Raise 2&ndash;3 PSI for highway or loaded trips.",
  },
  mid_sedan: {
    label: "Mid-size sedan (e.g. Camry, Accord)",
    front: 33,
    rear: 32,
    note: "Cold reading. Balanced front/rear keeps wear even.",
  },
  full_sedan: {
    label: "Full-size sedan (e.g. Charger, Maxima)",
    front: 35,
    rear: 33,
    note: "Cold reading. Heavier nose often needs ~2 PSI more up front.",
  },
  small_suv: {
    label: "Small SUV (e.g. RAV4, CR-V)",
    front: 33,
    rear: 33,
    note: "Cold reading. Check spare too &mdash; full-size and compact spares deflate fast.",
  },
  large_suv: {
    label: "Large SUV (e.g. Tahoe, Expedition)",
    front: 35,
    rear: 35,
    note: "Cold reading. Raise rear 3&ndash;5 PSI when towing or hauling.",
  },
  pickup: {
    label: "Pickup truck (half-ton, e.g. F-150, Silverado)",
    front: 35,
    rear: 38,
    note: "Cold reading. Loaded beds commonly want 45+ PSI at rear &mdash; follow door sticker.",
  },
  minivan: {
    label: "Minivan (e.g. Odyssey, Sienna)",
    front: 35,
    rear: 35,
    note: "Cold reading. Family loads are heavy &mdash; err on the higher end of the sticker.",
  },
  sports: {
    label: "Sports car (e.g. Mustang, 911)",
    front: 32,
    rear: 36,
    note: "Cold reading. Staggered setups often run higher rear pressures.",
  },
};

export function TirePressureLookup() {
  const [vehicle, setVehicle] = useState<VehicleType>("mid_sedan");

  const row = useMemo(() => DATA[vehicle], [vehicle]);
  const front = row.front;
  const rear = row.rear;
  const valid = Number.isFinite(front) && Number.isFinite(rear);

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">Vehicle type</span>
        <select
          value={vehicle}
          onChange={(e) => setVehicle(e.target.value as VehicleType)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        >
          {(Object.keys(DATA) as VehicleType[]).map((k) => (
            <option key={k} value={k}>{DATA[k].label}</option>
          ))}
        </select>
      </label>

      {valid && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Typical front PSI</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{front} psi</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Typical rear PSI</div>
            <div className="text-2xl font-semibold tabular-nums text-brand">{rear} psi</div>
          </div>
        </div>
      )}

      <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
        <div className="mb-1 font-medium">Note</div>
        <span dangerouslySetInnerHTML={{ __html: row.note }} />
        {" "}Check the door jamb sticker &mdash; that&rsquo;s the truth for your vehicle.
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <div className="mb-1 font-medium text-slate-800">When to check</div>
          <ul className="list-disc space-y-1 pl-5">
            <li>Every month, cold (before driving or after 3+ hours parked)</li>
            <li>Before any long trip</li>
            <li>After big temperature swings</li>
            <li>Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec &mdash; yes, all twelve</li>
          </ul>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <div className="mb-1 font-medium text-slate-800">Why it matters</div>
          <ul className="list-disc space-y-1 pl-5">
            <li>Under-inflation: fuel economy drops, shoulders wear, heat buildup risks blowout</li>
            <li>Over-inflation: harsh ride, less grip, center-of-tread wear</li>
            <li>Temperature: PSI drops ~1 psi per 10&deg;F cooler &mdash; re-check when seasons change</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
