"use client";

import { useMemo, useState } from "react";

type Shape = "slab" | "footing" | "column" | "stairs";

export interface ConcreteCubicYardsCalculatorProps {
  initialShape?: Shape;
}

export function ConcreteCubicYardsCalculator({
  initialShape = "slab",
}: ConcreteCubicYardsCalculatorProps = {}) {
  const [shape, setShape] = useState<Shape>(initialShape);
  const [length, setLength] = useState("20"); // feet
  const [width, setWidth] = useState("12"); // feet
  const [depth, setDepth] = useState("4"); // inches
  const [diameter, setDiameter] = useState("12"); // inches (column)
  const [height, setHeight] = useState("8"); // feet (column)
  const [steps, setSteps] = useState("4"); // stairs step count
  const [stepRun, setStepRun] = useState("11"); // inches
  const [stepRise, setStepRise] = useState("7"); // inches
  const [stepWidth, setStepWidth] = useState("4"); // feet
  const [bulkPrice, setBulkPrice] = useState("150"); // $/cu yd
  const [bagPrice, setBagPrice] = useState("5"); // $/bag
  const [wastePct, setWastePct] = useState("10");

  const result = useMemo(() => {
    const L = parseFloat(length);
    const W = parseFloat(width);
    const D = parseFloat(depth);
    const dia = parseFloat(diameter);
    const H = parseFloat(height);
    const n = parseFloat(steps);
    const sr = parseFloat(stepRun);
    const srise = parseFloat(stepRise);
    const sw = parseFloat(stepWidth);
    const bulk = parseFloat(bulkPrice);
    const bag = parseFloat(bagPrice);
    const waste = parseFloat(wastePct);

    let cuFt = 0;

    if (shape === "slab") {
      if (!Number.isFinite(L) || !Number.isFinite(W) || !Number.isFinite(D)) return null;
      cuFt = L * W * (D / 12);
    } else if (shape === "footing") {
      if (!Number.isFinite(L) || !Number.isFinite(W) || !Number.isFinite(D)) return null;
      cuFt = L * (W / 12) * (D / 12);
    } else if (shape === "column") {
      if (!Number.isFinite(dia) || !Number.isFinite(H)) return null;
      const r = dia / 2 / 12;
      cuFt = Math.PI * r * r * H;
    } else {
      if (
        !Number.isFinite(n) ||
        !Number.isFinite(sr) ||
        !Number.isFinite(srise) ||
        !Number.isFinite(sw)
      )
        return null;
      // approximate stair concrete = sum of prism volumes
      let stairFt = 0;
      for (let i = 1; i <= n; i += 1) {
        stairFt += (i * srise * sr) / 144; // sq ft face
      }
      cuFt = stairFt * sw;
    }

    if (!Number.isFinite(cuFt) || cuFt <= 0) return null;
    if (!Number.isFinite(waste)) return null;

    const wasteMult = 1 + waste / 100;
    const cuFtWaste = cuFt * wasteMult;
    const cuYd = cuFtWaste / 27;
    const bagsNeeded = Math.ceil(cuFtWaste / 0.6); // 80 lb bag = 0.6 cu ft
    const bulkCost = cuYd * (Number.isFinite(bulk) ? bulk : 150);
    const bagCost = bagsNeeded * (Number.isFinite(bag) ? bag : 5);
    const cheaper = bulkCost < bagCost ? "bulk" : "bags";

    return {
      cuFt,
      cuFtWaste,
      cuYd,
      bagsNeeded,
      bulkCost,
      bagCost,
      cheaper,
    };
  }, [
    shape,
    length,
    width,
    depth,
    diameter,
    height,
    steps,
    stepRun,
    stepRise,
    stepWidth,
    bulkPrice,
    bagPrice,
    wastePct,
  ]);

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="block text-sm font-medium text-slate-700 mb-1">Shape</span>
        <select
          value={shape}
          onChange={(e) => setShape(e.target.value as Shape)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        >
          <option value="slab">Slab (L &times; W &times; thickness)</option>
          <option value="footing">Footing (linear ft &times; W &times; D)</option>
          <option value="column">Column (round, diameter &times; height)</option>
          <option value="stairs">Stairs (steps + dimensions)</option>
        </select>
      </label>

      {shape === "slab" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Length (ft)" value={length} onChange={setLength} />
          <Field label="Width (ft)" value={width} onChange={setWidth} />
          <Field label="Thickness (in)" value={depth} onChange={setDepth} />
        </div>
      )}
      {shape === "footing" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Linear length (ft)" value={length} onChange={setLength} />
          <Field label="Width (in)" value={width} onChange={setWidth} />
          <Field label="Depth (in)" value={depth} onChange={setDepth} />
        </div>
      )}
      {shape === "column" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Diameter (in)" value={diameter} onChange={setDiameter} />
          <Field label="Height (ft)" value={height} onChange={setHeight} />
        </div>
      )}
      {shape === "stairs" && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <Field label="Steps" value={steps} onChange={setSteps} />
          <Field label="Run (in)" value={stepRun} onChange={setStepRun} />
          <Field label="Rise (in)" value={stepRise} onChange={setStepRise} />
          <Field label="Width (ft)" value={stepWidth} onChange={setStepWidth} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Waste (%)" value={wastePct} onChange={setWastePct} />
        <Field label="Ready-mix $/cu yd" value={bulkPrice} onChange={setBulkPrice} />
        <Field label="Bag price ($/80 lb)" value={bagPrice} onChange={setBagPrice} />
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Cubic feet" value={result.cuFtWaste.toFixed(1)} />
            <Stat label="Cubic yards" value={result.cuYd.toFixed(2)} />
            <Stat label="80 lb bags" value={result.bagsNeeded.toLocaleString()} />
            <Stat
              label="Cheaper"
              value={result.cheaper === "bulk" ? "Bulk" : "Bags"}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Ready-mix delivery
              </p>
              <p className="text-2xl font-semibold tabular-nums text-brand">
                ${result.bulkCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
                Bag method ({result.bagsNeeded} bags)
              </p>
              <p className="text-2xl font-semibold tabular-nums text-brand">
                ${result.bagCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Includes {wastePct}% waste. Bulk ready-mix typically beats bags above ~1 cu yd &mdash;
            at smaller volumes, the delivery minimum makes bags cheaper.
          </p>
        </>
      ) : (
        <p className="text-sm text-red-600">Enter valid dimensions.</p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-2xl font-semibold tabular-nums text-brand">{value}</p>
    </div>
  );
}
