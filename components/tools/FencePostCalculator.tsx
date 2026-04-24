"use client";

import { useMemo, useState } from "react";

type PanelType = "privacy6" | "picket4" | "shadowbox5" | "chainlink6";

const PANELS: Record<
  PanelType,
  { label: string; postCost: number; panelCost: number }
> = {
  privacy6: { label: "6 ft privacy (wood)", postCost: 25, panelCost: 75 },
  picket4: { label: "4 ft picket (wood)", postCost: 15, panelCost: 45 },
  shadowbox5: { label: "5 ft shadowbox", postCost: 22, panelCost: 65 },
  chainlink6: { label: "6 ft chain-link", postCost: 30, panelCost: 40 }
};

export function FencePostCalculator() {
  const [length, setLength] = useState(100);
  const [spacing, setSpacing] = useState(8);
  const [panel, setPanel] = useState<PanelType>("privacy6");
  const [gates, setGates] = useState(1);

  const result = useMemo(() => {
    if (
      !Number.isFinite(length) ||
      !Number.isFinite(spacing) ||
      !Number.isFinite(gates) ||
      length <= 0 ||
      spacing <= 0 ||
      gates < 0
    ) {
      return null;
    }

    const basePosts = Math.ceil(length / spacing) + 1;
    const gatePosts = gates * 2;
    const totalPosts = basePosts + gatePosts;

    const panelCount = Math.ceil(length / spacing);

    const concreteBagsPerPost = 1.5;
    const totalConcreteBags = Math.ceil(totalPosts * concreteBagsPerPost);

    const spec = PANELS[panel];
    const postMaterial = totalPosts * spec.postCost;
    const panelMaterial = panelCount * spec.panelCost;
    const concreteCost = totalConcreteBags * 5;

    const totalCost = postMaterial + panelMaterial + concreteCost;

    return {
      totalPosts,
      basePosts,
      gatePosts,
      panelCount,
      totalConcreteBags,
      postMaterial,
      panelMaterial,
      concreteCost,
      totalCost
    };
  }, [length, spacing, panel, gates]);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-brand">Fence Post Calculator</h2>
        <p className="text-sm text-gray-600 mt-1">
          Plan posts, panels, concrete, and budget for a fence run.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Total fence length (ft)
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={1}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Post spacing on-center (ft)
          </label>
          <input
            type="number"
            value={spacing}
            onChange={(e) => setSpacing(parseFloat(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={4}
            max={10}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Panel type</label>
          <select
            value={panel}
            onChange={(e) => setPanel(e.target.value as PanelType)}
            className="w-full border rounded px-3 py-2"
          >
            {Object.entries(PANELS).map(([key, v]) => (
              <option key={key} value={key}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of gates</label>
          <input
            type="number"
            value={gates}
            onChange={(e) => setGates(parseInt(e.target.value))}
            className="w-full border rounded px-3 py-2"
            min={0}
            max={10}
          />
        </div>
      </div>

      {result && (
        <>
          <div className="bg-gray-50 border rounded p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Line posts</span>
              <span className="font-semibold">{result.basePosts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Extra gate posts</span>
              <span className="font-semibold">{result.gatePosts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total posts</span>
              <span className="font-semibold">{result.totalPosts}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Panels / sections</span>
              <span className="font-semibold">{result.panelCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">
                Concrete bags (60 lb, ~1.5/post)
              </span>
              <span className="font-semibold">{result.totalConcreteBags}</span>
            </div>
          </div>

          <div className="bg-gray-50 border rounded p-4 space-y-2">
            <div className="font-semibold text-brand">Estimated material cost</div>
            <div className="flex justify-between text-sm">
              <span>Posts</span>
              <span>${result.postMaterial}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Panels</span>
              <span>${result.panelMaterial}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Concrete</span>
              <span>${result.concreteCost}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-semibold">
              <span>Total</span>
              <span className="text-brand">${result.totalCost}</span>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            Assumes 3 ft deep post holes and 8 in diameter. Add 10% for cuts, breakage,
            and end/corner posts. Check local codes: frost line depth can require deeper
            footings in cold climates.
          </div>
        </>
      )}
    </div>
  );
}
