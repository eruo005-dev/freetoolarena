"use client";

import { useMemo, useState } from "react";

type Crop = {
  name: string;
  startIndoorsWeeks: number | null; // weeks BEFORE last frost
  sowOrTransplantWeeks: number; // negative = before last frost, positive = after
  method: "direct-sow" | "transplant" | "fall-plant";
  daysToHarvest: number;
  notes?: string;
};

const CROPS: Crop[] = [
  { name: "Tomatoes", startIndoorsWeeks: 7, sowOrTransplantWeeks: 2, method: "transplant", daysToHarvest: 75 },
  { name: "Peppers", startIndoorsWeeks: 9, sowOrTransplantWeeks: 3, method: "transplant", daysToHarvest: 80 },
  { name: "Bush beans", startIndoorsWeeks: null, sowOrTransplantWeeks: 1, method: "direct-sow", daysToHarvest: 55 },
  { name: "Pole beans", startIndoorsWeeks: null, sowOrTransplantWeeks: 2, method: "direct-sow", daysToHarvest: 65 },
  { name: "Carrots", startIndoorsWeeks: null, sowOrTransplantWeeks: -3, method: "direct-sow", daysToHarvest: 70 },
  { name: "Lettuce", startIndoorsWeeks: null, sowOrTransplantWeeks: -5, method: "direct-sow", daysToHarvest: 45, notes: "Cool-season" },
  { name: "Kale", startIndoorsWeeks: null, sowOrTransplantWeeks: -5, method: "direct-sow", daysToHarvest: 55, notes: "Cool-season; also fall" },
  { name: "Zucchini / squash", startIndoorsWeeks: null, sowOrTransplantWeeks: 2, method: "direct-sow", daysToHarvest: 50 },
  { name: "Corn", startIndoorsWeeks: null, sowOrTransplantWeeks: 2, method: "direct-sow", daysToHarvest: 80 },
  { name: "Peas", startIndoorsWeeks: null, sowOrTransplantWeeks: -5, method: "direct-sow", daysToHarvest: 65 },
  { name: "Radishes", startIndoorsWeeks: null, sowOrTransplantWeeks: -4, method: "direct-sow", daysToHarvest: 28 },
  { name: "Broccoli", startIndoorsWeeks: 8, sowOrTransplantWeeks: -4, method: "transplant", daysToHarvest: 70 },
  { name: "Cucumbers", startIndoorsWeeks: null, sowOrTransplantWeeks: 2, method: "direct-sow", daysToHarvest: 55 },
  { name: "Onions", startIndoorsWeeks: 11, sowOrTransplantWeeks: -4, method: "transplant", daysToHarvest: 110 },
  { name: "Garlic", startIndoorsWeeks: null, sowOrTransplantWeeks: 0, method: "fall-plant", daysToHarvest: 240, notes: "Plant 6 wks before first fall frost" },
  { name: "Spinach", startIndoorsWeeks: null, sowOrTransplantWeeks: -5, method: "direct-sow", daysToHarvest: 40 },
  { name: "Cabbage", startIndoorsWeeks: 8, sowOrTransplantWeeks: -3, method: "transplant", daysToHarvest: 85 },
  { name: "Eggplant", startIndoorsWeeks: 8, sowOrTransplantWeeks: 3, method: "transplant", daysToHarvest: 80 },
  { name: "Beets", startIndoorsWeeks: null, sowOrTransplantWeeks: -3, method: "direct-sow", daysToHarvest: 55 },
  { name: "Swiss chard", startIndoorsWeeks: null, sowOrTransplantWeeks: -3, method: "direct-sow", daysToHarvest: 55 },
];

const ZONE_FROST: Record<string, { lastM: number; lastD: number; firstM: number; firstD: number }> = {
  "3": { lastM: 4, lastD: 15, firstM: 8, firstD: 15 },
  "4": { lastM: 4, lastD: 5, firstM: 8, firstD: 25 },
  "5": { lastM: 3, lastD: 25, firstM: 9, firstD: 5 },
  "6": { lastM: 3, lastD: 15, firstM: 9, firstD: 15 },
  "7": { lastM: 3, lastD: 5, firstM: 9, firstD: 25 },
  "8": { lastM: 2, lastD: 25, firstM: 10, firstD: 5 },
  "9": { lastM: 2, lastD: 15, firstM: 10, firstD: 15 },
  "10": { lastM: 2, lastD: 1, firstM: 10, firstD: 30 },
};

const ZONE_OPTIONS = ["3", "4", "5", "6", "7", "8", "9", "10"];

function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}
function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function PlantingCalendarByZone() {
  const [zone, setZone] = useState("6");

  const rows = useMemo(() => {
    const frost = ZONE_FROST[zone];
    if (!frost) return [];
    const year = new Date().getFullYear();
    const last = new Date(year, frost.lastM, frost.lastD);
    const first = new Date(year, frost.firstM, frost.firstD);
    return CROPS.map((c) => {
      let startIndoors = "\u2014";
      if (c.startIndoorsWeeks !== null) {
        startIndoors = fmt(addDays(last, -c.startIndoorsWeeks * 7));
      }
      let plantDate: string;
      if (c.method === "fall-plant") {
        plantDate = fmt(addDays(first, -42));
      } else {
        plantDate = fmt(addDays(last, c.sowOrTransplantWeeks * 7));
      }
      const harvestBase = c.method === "fall-plant" ? addDays(first, -42) : addDays(last, c.sowOrTransplantWeeks * 7);
      const harvest = fmt(addDays(harvestBase, c.daysToHarvest));
      const methodLabel =
        c.method === "direct-sow" ? "Direct sow" : c.method === "transplant" ? "Transplant" : "Fall plant";
      return {
        name: c.name,
        startIndoors,
        plantDate: `${methodLabel} ${plantDate}`,
        harvest,
        notes: c.notes ?? "",
      };
    });
  }, [zone]);

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">USDA hardiness zone</label>
        <select
          value={zone}
          onChange={(e) => setZone(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        >
          {ZONE_OPTIONS.map((z) => (
            <option key={z} value={z}>
              Zone {z}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">Zone {zone} planting calendar</div>
        <div className="text-2xl font-semibold tabular-nums text-brand">{rows.length} crops</div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
            <tr>
              <th className="px-3 py-2">Crop</th>
              <th className="px-3 py-2">Start indoors</th>
              <th className="px-3 py-2">Sow / transplant</th>
              <th className="px-3 py-2">Expected harvest</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((r) => (
              <tr key={r.name}>
                <td className="px-3 py-2 font-medium text-slate-800">
                  {r.name}
                  {r.notes && <div className="text-xs text-slate-500">{r.notes}</div>}
                </td>
                <td className="px-3 py-2 font-mono text-slate-700">{r.startIndoors}</td>
                <td className="px-3 py-2 font-mono text-slate-700">{r.plantDate}</td>
                <td className="px-3 py-2 font-mono text-slate-700">{r.harvest}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">
        Dates use typical frost averages for the zone &mdash; adjust 1&ndash;2 weeks based on your specific microclimate
        and current weather forecast.
      </p>
    </div>
  );
}
