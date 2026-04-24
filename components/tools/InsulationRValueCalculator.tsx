"use client";

import { useMemo, useState } from "react";

type Zone = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
type Area = "attic" | "walls" | "floor" | "basement";

const ZONE_LABELS: Record<Zone, string> = {
  "1": "Zone 1 (hot - Miami, Honolulu)",
  "2": "Zone 2 (hot - Houston, Phoenix)",
  "3": "Zone 3 (warm - Atlanta, LA)",
  "4": "Zone 4 (mixed - DC, Nashville)",
  "5": "Zone 5 (cold - Chicago, Boston)",
  "6": "Zone 6 (cold - Burlington, Minneapolis)",
  "7": "Zone 7 (very cold - Duluth)",
  "8": "Zone 8 (subarctic - Fairbanks)"
};

const R_VALUES: Record<Zone, Record<Area, number>> = {
  "1": { attic: 30, walls: 13, floor: 13, basement: 0 },
  "2": { attic: 30, walls: 13, floor: 13, basement: 0 },
  "3": { attic: 30, walls: 13, floor: 19, basement: 5 },
  "4": { attic: 38, walls: 15, floor: 19, basement: 10 },
  "5": { attic: 49, walls: 20, floor: 30, basement: 15 },
  "6": { attic: 49, walls: 20, floor: 30, basement: 15 },
  "7": { attic: 55, walls: 20, floor: 30, basement: 15 },
  "8": { attic: 60, walls: 20, floor: 38, basement: 15 }
};

const MATERIALS = [
  { name: "Fiberglass batt", rPerInch: 3.0 },
  { name: "Blown cellulose", rPerInch: 3.7 },
  { name: "Closed-cell spray foam", rPerInch: 6.5 },
  { name: "Rigid foam board (XPS)", rPerInch: 5.0 },
  { name: "Mineral wool batt", rPerInch: 3.3 }
];

export function InsulationRValueCalculator() {
  const [zone, setZone] = useState<Zone>("4");
  const [area, setArea] = useState<Area>("attic");
  const [currentR, setCurrentR] = useState(0);

  const result = useMemo(() => {
    if (!Number.isFinite(currentR) || currentR < 0) return null;

    const target = R_VALUES[zone][area];
    const deltaR = Math.max(0, target - currentR);

    const thicknesses = MATERIALS.map((m) => ({
      name: m.name,
      rPerInch: m.rPerInch,
      totalInches: +(target / m.rPerInch).toFixed(1),
      addInches: +(deltaR / m.rPerInch).toFixed(1)
    }));

    return { target, deltaR, thicknesses };
  }, [zone, area, currentR]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-brand">Insulation R-Value Calculator</h2>
        <p className="text-sm text-gray-600 mt-1">
          Find the IECC-recommended R-value for your climate zone and the thickness
          needed in common insulation materials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Climate zone</label>
          <select
            value={zone}
            onChange={(e) => setZone(e.target.value as Zone)}
            className="w-full border rounded px-3 py-2"
          >
            {(Object.keys(ZONE_LABELS) as Zone[]).map((z) => (
              <option key={z} value={z}>
                {ZONE_LABELS[z]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Area to insulate</label>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value as Area)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="attic">Attic / ceiling</option>
            <option value="walls">Exterior walls</option>
            <option value="floor">Floor over crawl space</option>
            <option value="basement">Basement walls</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Current R-value (estimate from existing thickness, or 0 if none)
          </label>
          <input
            type="number"
            value={currentR}
            onChange={(e) => setCurrentR(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
          />
        </div>
      </div>

      {result && (
        <>
          <div className="bg-gray-50 border rounded p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Recommended R-value</span>
              <span className="font-semibold text-brand">R-{result.target}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">You currently have</span>
              <span className="font-semibold">R-{currentR || 0}</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm text-gray-600">Gap to close</span>
              <span className="font-semibold">
                {result.deltaR > 0 ? `R-${result.deltaR}` : "Already meets target"}
              </span>
            </div>
          </div>

          <div className="border rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2">Material</th>
                  <th className="text-right p-2">R/inch</th>
                  <th className="text-right p-2">Total thickness</th>
                  <th className="text-right p-2">Add to reach target</th>
                </tr>
              </thead>
              <tbody>
                {result.thicknesses.map((t) => (
                  <tr key={t.name} className="border-t">
                    <td className="p-2">{t.name}</td>
                    <td className="p-2 text-right">{t.rPerInch}</td>
                    <td className="p-2 text-right">{t.totalInches}&quot;</td>
                    <td className="p-2 text-right font-semibold">
                      {t.addInches > 0 ? `${t.addInches}"` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-gray-500">
            Target values reflect 2021 IECC residential recommendations. Ensure proper
            air sealing and vapor retarder placement before adding insulation &mdash; a
            leaky envelope undermines R-value gains.
          </div>
        </>
      )}
    </div>
  );
}
