"use client";

import { useMemo, useState } from "react";

type IngredientKey =
  | "all-purpose-flour"
  | "bread-flour"
  | "cake-flour"
  | "whole-wheat-flour"
  | "granulated-sugar"
  | "brown-sugar-packed"
  | "powdered-sugar"
  | "butter"
  | "cocoa-powder"
  | "rolled-oats"
  | "water"
  | "milk"
  | "honey"
  | "olive-oil"
  | "salt"
  | "baking-powder";

type UnitKey = "cups" | "tbsp" | "tsp" | "ml" | "g" | "oz";

interface Ingredient {
  label: string;
  gramsPerCup: number;
  gramsPerMl: number; // density in g/ml (for volume-to-ml conversion of liquids)
  isLiquid: boolean;
}

const INGREDIENTS: Record<IngredientKey, Ingredient> = {
  "all-purpose-flour": { label: "All-Purpose Flour", gramsPerCup: 125, gramsPerMl: 0.53, isLiquid: false },
  "bread-flour": { label: "Bread Flour", gramsPerCup: 127, gramsPerMl: 0.54, isLiquid: false },
  "cake-flour": { label: "Cake Flour", gramsPerCup: 114, gramsPerMl: 0.48, isLiquid: false },
  "whole-wheat-flour": { label: "Whole Wheat Flour", gramsPerCup: 120, gramsPerMl: 0.51, isLiquid: false },
  "granulated-sugar": { label: "Granulated Sugar", gramsPerCup: 200, gramsPerMl: 0.85, isLiquid: false },
  "brown-sugar-packed": { label: "Brown Sugar (packed)", gramsPerCup: 213, gramsPerMl: 0.9, isLiquid: false },
  "powdered-sugar": { label: "Powdered Sugar", gramsPerCup: 120, gramsPerMl: 0.51, isLiquid: false },
  butter: { label: "Butter", gramsPerCup: 227, gramsPerMl: 0.96, isLiquid: false },
  "cocoa-powder": { label: "Cocoa Powder", gramsPerCup: 84, gramsPerMl: 0.35, isLiquid: false },
  "rolled-oats": { label: "Rolled Oats", gramsPerCup: 85, gramsPerMl: 0.36, isLiquid: false },
  water: { label: "Water", gramsPerCup: 237, gramsPerMl: 1, isLiquid: true },
  milk: { label: "Milk", gramsPerCup: 240, gramsPerMl: 1.03, isLiquid: true },
  honey: { label: "Honey", gramsPerCup: 340, gramsPerMl: 1.42, isLiquid: true },
  "olive-oil": { label: "Olive Oil", gramsPerCup: 216, gramsPerMl: 0.91, isLiquid: true },
  salt: { label: "Salt", gramsPerCup: 288, gramsPerMl: 1.22, isLiquid: false },
  "baking-powder": { label: "Baking Powder", gramsPerCup: 192, gramsPerMl: 0.81, isLiquid: false },
};

const UNITS: { key: UnitKey; label: string }[] = [
  { key: "cups", label: "Cups (US)" },
  { key: "tbsp", label: "Tablespoons" },
  { key: "tsp", label: "Teaspoons" },
  { key: "ml", label: "Milliliters" },
  { key: "g", label: "Grams" },
  { key: "oz", label: "Ounces" },
];

// Volume constants (US)
const ML_PER_CUP = 236.588;
const ML_PER_TBSP = 14.787;
const ML_PER_TSP = 4.929;
const G_PER_OZ = 28.3495;

function toGrams(amount: number, unit: UnitKey, ing: Ingredient): number {
  switch (unit) {
    case "cups":
      return amount * ing.gramsPerCup;
    case "tbsp":
      return amount * (ing.gramsPerCup / 16);
    case "tsp":
      return amount * (ing.gramsPerCup / 48);
    case "ml":
      return amount * ing.gramsPerMl;
    case "g":
      return amount;
    case "oz":
      return amount * G_PER_OZ;
  }
}

function fromGrams(grams: number, unit: UnitKey, ing: Ingredient): number {
  switch (unit) {
    case "cups":
      return grams / ing.gramsPerCup;
    case "tbsp":
      return grams / (ing.gramsPerCup / 16);
    case "tsp":
      return grams / (ing.gramsPerCup / 48);
    case "ml":
      return grams / ing.gramsPerMl;
    case "g":
      return grams;
    case "oz":
      return grams / G_PER_OZ;
  }
}

function fmt(n: number): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "0";
  if (Math.abs(n) < 0.01) return n.toExponential(2);
  if (Math.abs(n) < 1) return n.toFixed(3);
  if (Math.abs(n) < 10) return n.toFixed(2);
  return n.toFixed(1);
}

export function BakingConversionCalculator() {
  const [ingredient, setIngredient] = useState<IngredientKey>("all-purpose-flour");
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState<UnitKey>("cups");
  const [toUnit, setToUnit] = useState<UnitKey>("g");

  const result = useMemo(() => {
    const n = parseFloat(amount);
    if (!Number.isFinite(n) || n < 0) return null;
    const ing = INGREDIENTS[ingredient];
    const grams = toGrams(n, fromUnit, ing);
    const converted = fromGrams(grams, toUnit, ing);

    const table = UNITS.map((u) => ({
      key: u.key,
      label: u.label,
      value: fromGrams(grams, u.key, ing),
    }));

    return { converted, grams, table };
  }, [amount, fromUnit, toUnit, ingredient]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Ingredient</span>
          <select
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value as IngredientKey)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {Object.entries(INGREDIENTS).map(([key, ing]) => (
              <option key={key} value={key}>
                {ing.label} ({ing.gramsPerCup}g/cup)
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Amount</span>
          <input
            type="number"
            min="0"
            step="0.25"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">From unit</span>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as UnitKey)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {UNITS.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">To unit</span>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as UnitKey)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {UNITS.map((u) => (
              <option key={u.key} value={u.key}>
                {u.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {result && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-sm text-slate-600">
            {amount} {UNITS.find((u) => u.key === fromUnit)?.label} of {INGREDIENTS[ingredient].label} equals
          </div>
          <div className="mt-1 text-3xl font-bold text-brand">
            {fmt(result.converted)} {UNITS.find((u) => u.key === toUnit)?.label}
          </div>
          <div className="mt-1 text-xs text-slate-500">({fmt(result.grams)} g total weight)</div>
        </div>
      )}

      {result && (
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-2 text-sm font-semibold text-slate-700">All equivalents</div>
          <div className="grid gap-2 sm:grid-cols-2">
            {result.table.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="text-slate-600">{row.label}</span>
                <span className="font-medium text-slate-900">{fmt(row.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-slate-500">
        Gram weights follow King Arthur &amp; USDA reference values. Flour measured by dip-and-sweep may be
        15&ndash;20% heavier&mdash;weigh for accuracy.
      </p>
    </div>
  );
}
