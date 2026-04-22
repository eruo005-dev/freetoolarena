"use client";

import { useMemo, useState } from "react";

type Category = "volume" | "weight" | "temp" | "ingredient";

// Volume in mL
const VOLUME: Record<string, number> = {
  tsp: 4.92892,
  tbsp: 14.7868,
  "fl oz": 29.5735,
  cup: 236.588,
  mL: 1,
  L: 1000,
};

// Weight in g
const WEIGHT: Record<string, number> = {
  oz: 28.3495,
  lb: 453.592,
  g: 1,
  kg: 1000,
};

// g per cup (236.588 mL)
const INGREDIENT_G_PER_CUP: Record<string, number> = {
  "Flour (all-purpose)": 125,
  "Sugar (granulated)": 200,
  "Sugar (brown, packed)": 220,
  "Sugar (powdered)": 120,
  Butter: 227,
  "Rice (uncooked)": 185,
  "Milk (whole)": 244,
  Honey: 340,
};

function round(n: number, d = 3): number {
  if (!Number.isFinite(n)) return 0;
  const p = Math.pow(10, d);
  return Math.round(n * p) / p;
}

export function CookingConverter() {
  const [category, setCategory] = useState<Category>("volume");
  const [amount, setAmount] = useState("1");
  const [unit, setUnit] = useState("cup");
  const [tempFrom, setTempFrom] = useState<"F" | "C">("F");
  const [tempVal, setTempVal] = useState("350");
  const [ingredient, setIngredient] = useState("Flour (all-purpose)");
  const [ingredientUnit, setIngredientUnit] = useState<"cup" | "g">("cup");
  const [ingredientAmount, setIngredientAmount] = useState("1");

  const volumeResults = useMemo(() => {
    const a = parseFloat(amount) || 0;
    const mL = (VOLUME[unit] || 0) * a;
    return Object.keys(VOLUME).map((k) => ({ unit: k, value: round(mL / VOLUME[k], 4) }));
  }, [amount, unit]);

  const weightResults = useMemo(() => {
    const a = parseFloat(amount) || 0;
    const g = (WEIGHT[unit] || 0) * a;
    return Object.keys(WEIGHT).map((k) => ({ unit: k, value: round(g / WEIGHT[k], 4) }));
  }, [amount, unit]);

  const tempResults = useMemo(() => {
    const t = parseFloat(tempVal);
    if (!Number.isFinite(t)) return { F: 0, C: 0 };
    if (tempFrom === "F") return { F: t, C: round(((t - 32) * 5) / 9, 1) };
    return { F: round((t * 9) / 5 + 32, 1), C: t };
  }, [tempVal, tempFrom]);

  const ingredientResults = useMemo(() => {
    const gPerCup = INGREDIENT_G_PER_CUP[ingredient] || 0;
    const a = parseFloat(ingredientAmount) || 0;
    const grams = ingredientUnit === "cup" ? a * gPerCup : a;
    const cups = gPerCup > 0 ? grams / gPerCup : 0;
    return {
      grams: round(grams, 1),
      cups: round(cups, 3),
      oz: round(grams / 28.3495, 3),
      tbsp: round((cups * 236.588) / 14.7868, 2),
      tsp: round((cups * 236.588) / 4.92892, 1),
    };
  }, [ingredient, ingredientUnit, ingredientAmount]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {(["volume", "weight", "temp", "ingredient"] as Category[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => {
              setCategory(c);
              if (c === "volume") setUnit("cup");
              if (c === "weight") setUnit("oz");
            }}
            className={`rounded-lg border px-4 py-1.5 text-sm font-semibold capitalize ${
              category === c
                ? "bg-brand text-white border-brand"
                : "bg-white text-slate-700 border-slate-300 hover:border-brand"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {(category === "volume" || category === "weight") && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Amount</span>
              <input
                type="number"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Unit</span>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              >
                {Object.keys(category === "volume" ? VOLUME : WEIGHT).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-3">
              Equivalents
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {(category === "volume" ? volumeResults : weightResults).map((r) => (
                <div key={r.unit}>
                  <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{r.unit}</p>
                  <p className="text-xl font-bold text-slate-900 tabular-nums">{r.value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {category === "temp" && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Temperature</span>
              <input
                type="number"
                inputMode="decimal"
                value={tempVal}
                onChange={(e) => setTempVal(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">From</span>
              <select
                value={tempFrom}
                onChange={(e) => setTempFrom(e.target.value as "F" | "C")}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              >
                <option value="F">°F</option>
                <option value="C">°C</option>
              </select>
            </label>
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Fahrenheit</p>
                <p className="text-2xl font-bold text-brand">{tempResults.F}°F</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Celsius</p>
                <p className="text-2xl font-bold text-brand">{tempResults.C}°C</p>
              </div>
            </div>
          </div>
        </>
      )}

      {category === "ingredient" && (
        <>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700 mb-1">Ingredient</span>
            <select
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
            >
              {Object.keys(INGREDIENT_G_PER_CUP).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Amount</span>
              <input
                type="number"
                inputMode="decimal"
                value={ingredientAmount}
                onChange={(e) => setIngredientAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-slate-700 mb-1">Unit</span>
              <select
                value={ingredientUnit}
                onChange={(e) => setIngredientUnit(e.target.value as "cup" | "g")}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
              >
                <option value="cup">cups</option>
                <option value="g">grams</option>
              </select>
            </label>
          </div>
          <div className="rounded-xl bg-slate-50 p-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Grams</p>
                <p className="text-2xl font-bold text-brand">{ingredientResults.grams} g</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Cups</p>
                <p className="text-xl font-bold text-slate-900">{ingredientResults.cups}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Ounces</p>
                <p className="text-xl font-bold text-slate-900">{ingredientResults.oz} oz</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Tablespoons</p>
                <p className="text-xl font-bold text-slate-900">{ingredientResults.tbsp}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">Teaspoons</p>
                <p className="text-xl font-bold text-slate-900">{ingredientResults.tsp}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">
              Densities are approximations. Sifting, packing, and humidity will shift values slightly.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
