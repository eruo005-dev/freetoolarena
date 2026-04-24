"use client";

import { useMemo, useState } from "react";

type CropSpec = {
  name: string;
  inRow: number; // inches between plants in-row
  rowSpacing: number; // inches between rows
  sqFtPer: number; // square-foot garden: plants per sq ft
};

const CROPS: Record<string, CropSpec> = {
  tomatoes: { name: "Tomatoes", inRow: 24, rowSpacing: 24, sqFtPer: 1 },
  peppers: { name: "Peppers", inRow: 18, rowSpacing: 18, sqFtPer: 1 },
  lettuce: { name: "Lettuce", inRow: 10, rowSpacing: 10, sqFtPer: 4 },
  carrots: { name: "Carrots", inRow: 3, rowSpacing: 12, sqFtPer: 16 },
  bushBeans: { name: "Bush beans", inRow: 4, rowSpacing: 18, sqFtPer: 9 },
  cucumbers: { name: "Cucumbers (trellis)", inRow: 12, rowSpacing: 60, sqFtPer: 2 },
  corn: { name: "Corn", inRow: 8, rowSpacing: 30, sqFtPer: 1 },
  zucchini: { name: "Zucchini", inRow: 24, rowSpacing: 36, sqFtPer: 1 },
  broccoli: { name: "Broccoli", inRow: 18, rowSpacing: 24, sqFtPer: 1 },
  spinach: { name: "Spinach", inRow: 4, rowSpacing: 12, sqFtPer: 9 },
  onions: { name: "Onions", inRow: 4, rowSpacing: 12, sqFtPer: 9 },
  garlic: { name: "Garlic", inRow: 6, rowSpacing: 12, sqFtPer: 4 },
  strawberries: { name: "Strawberries", inRow: 12, rowSpacing: 18, sqFtPer: 4 },
};

export function SeedSpacingCalculator() {
  const [lengthFt, setLengthFt] = useState("8");
  const [widthFt, setWidthFt] = useState("4");
  const [cropKey, setCropKey] = useState("tomatoes");
  const [layout, setLayout] = useState<"rows" | "sqft">("rows");

  const result = useMemo(() => {
    const L = parseFloat(lengthFt);
    const W = parseFloat(widthFt);
    if (!Number.isFinite(L) || !Number.isFinite(W) || L <= 0 || W <= 0) return null;
    const spec = CROPS[cropKey];
    if (!spec) return null;

    const bedArea = L * W; // sq ft
    let plants: number;
    if (layout === "sqft") {
      plants = Math.floor(bedArea * spec.sqFtPer);
    } else {
      const lengthInches = L * 12;
      const widthInches = W * 12;
      const numRows = Math.max(1, Math.floor(widthInches / spec.rowSpacing));
      const perRow = Math.max(1, Math.floor(lengthInches / spec.inRow));
      plants = numRows * perRow;
    }
    const seedsToBuy = plants * 2;
    return { spec, plants, seedsToBuy, bedArea };
  }, [lengthFt, widthFt, cropKey, layout]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Bed length (ft)</label>
          <input
            type="number"
            min="1"
            step="0.5"
            value={lengthFt}
            onChange={(e) => setLengthFt(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Bed width (ft)</label>
          <input
            type="number"
            min="1"
            step="0.5"
            value={widthFt}
            onChange={(e) => setWidthFt(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Crop</label>
          <select
            value={cropKey}
            onChange={(e) => setCropKey(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            {Object.entries(CROPS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.name} ({v.inRow}&quot; / {v.rowSpacing}&quot;)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Layout</label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value as "rows" | "sqft")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="rows">Traditional rows</option>
            <option value="sqft">Square-foot garden</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Plants that fit</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.plants}</div>
              <div className="mt-1 text-xs text-slate-500">{result.bedArea} sq ft bed</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Seeds to buy (2x for thinning)</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">{result.seedsToBuy}</div>
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Spacing reference</div>
            <div className="mt-1 text-sm text-slate-700">
              {result.spec.name}: {result.spec.inRow}&quot; between plants, {result.spec.rowSpacing}&quot; between rows
              &mdash; or {result.spec.sqFtPer} plant{result.spec.sqFtPer > 1 ? "s" : ""} per square foot (SFG method).
            </div>
          </div>
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wide text-slate-500">Diagram (approximate)</div>
            <pre className="mt-2 overflow-x-auto text-xs font-mono text-slate-700">
{`Bed: ${lengthFt}ft x ${widthFt}ft  |  ${result.plants} ${result.spec.name.toLowerCase()}
` +
  Array.from({ length: Math.min(4, Math.ceil(Math.sqrt(result.plants))) })
    .map(
      () =>
        Array.from({ length: Math.min(10, Math.ceil(result.plants / 4)) })
          .map(() => "x")
          .join(" "),
    )
    .join("\n")}
            </pre>
          </div>
          <p className="text-xs text-slate-500">
            SFG (square-foot garden) packs more in a small bed but needs rich soil. Traditional rows are easier to weed
            with a hoe. Seed counts assume 50% germination &mdash; buy more if your seed is old.
          </p>
        </div>
      )}
    </div>
  );
}
