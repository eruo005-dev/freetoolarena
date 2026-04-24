"use client";

import { useMemo, useState } from "react";

type RebarSize = "#3" | "#4" | "#5";

const REBAR: Record<
  RebarSize,
  { diameter: number; weightPerFt: number; pricePer20ft: number }
> = {
  "#3": { diameter: 0.375, weightPerFt: 0.376, pricePer20ft: 10 },
  "#4": { diameter: 0.5, weightPerFt: 0.668, pricePer20ft: 15 },
  "#5": { diameter: 0.625, weightPerFt: 1.043, pricePer20ft: 22 }
};

export function RebarSpacingCalculator() {
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(12);
  const [size, setSize] = useState<RebarSize>("#4");
  const [spacing, setSpacing] = useState(16);

  const result = useMemo(() => {
    if (
      !Number.isFinite(length) ||
      !Number.isFinite(width) ||
      !Number.isFinite(spacing) ||
      length <= 0 ||
      width <= 0 ||
      spacing <= 0
    ) {
      return null;
    }

    const lengthBars = Math.ceil((width * 12) / spacing + 1);
    const widthBars = Math.ceil((length * 12) / spacing + 1);

    const totalLinearFeet = lengthBars * length + widthBars * width;

    const piecesNeeded = Math.ceil(totalLinearFeet / 20);

    const intersections = lengthBars * widthBars;
    const tieWireFeet = Math.ceil(intersections * 0.75);

    const bar = REBAR[size];
    const cost = piecesNeeded * bar.pricePer20ft;
    const lapSplice = Math.ceil(bar.diameter * 40);

    return {
      lengthBars,
      widthBars,
      totalLinearFeet,
      piecesNeeded,
      tieWireFeet,
      cost,
      lapSplice,
      weight: Math.round(totalLinearFeet * bar.weightPerFt)
    };
  }, [length, width, size, spacing]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-brand">Rebar Spacing Calculator</h2>
        <p className="text-sm text-gray-600 mt-1">
          Estimate rebar quantity, tie wire, and cost for a concrete slab.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Slab length (ft)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Slab width (ft)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rebar size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as RebarSize)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="#3">#3 (3/8&quot;)</option>
            <option value="#4">#4 (1/2&quot;)</option>
            <option value="#5">#5 (5/8&quot;)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Spacing on-center (in)
          </label>
          <input
            type="number"
            value={spacing}
            onChange={(e) => setSpacing(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={4}
            max={24}
          />
        </div>
      </div>

      {result && (
        <>
          <div className="bg-gray-50 border rounded p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Bars along length</span>
              <span className="font-semibold">{result.widthBars}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Bars along width</span>
              <span className="font-semibold">{result.lengthBars}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total linear feet</span>
              <span className="font-semibold">{result.totalLinearFeet} ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">20 ft sticks needed</span>
              <span className="font-semibold">{result.piecesNeeded}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Approx weight</span>
              <span className="font-semibold">{result.weight} lb</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Tie wire</span>
              <span className="font-semibold">~{result.tieWireFeet} ft</span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-sm text-gray-600">Estimated rebar cost</span>
              <span className="font-semibold text-brand">${result.cost}</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-900 space-y-1">
            <div>
              <strong>Edge clearance:</strong> keep rebar at least 3&quot; from slab
              edges and 2&quot; from the bottom.
            </div>
            <div>
              <strong>Lap splice:</strong> overlap continuous bars by at least{" "}
              {result.lapSplice}&quot; (40&times; bar diameter) at splices.
            </div>
            <div>
              <strong>Support:</strong> use chairs or dobies to hold bars off the ground
              during pour.
            </div>
          </div>
        </>
      )}
    </div>
  );
}
