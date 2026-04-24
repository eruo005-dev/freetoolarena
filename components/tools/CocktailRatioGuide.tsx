"use client";

import { useMemo, useState } from "react";

interface Ingredient {
  name: string;
  oz: number;
  note?: string;
}

interface Cocktail {
  key: string;
  label: string;
  glass: string;
  method: string;
  garnish: string;
  ingredients: Ingredient[];
}

const COCKTAILS: Cocktail[] = [
  {
    key: "old-fashioned",
    label: "Old Fashioned",
    glass: "Rocks",
    method: "Stir with ice",
    garnish: "Orange peel",
    ingredients: [
      { name: "Bourbon or rye whiskey", oz: 2 },
      { name: "Simple syrup", oz: 0.25 },
      { name: "Angostura bitters", oz: 0.05, note: "2 dashes" },
    ],
  },
  {
    key: "manhattan",
    label: "Manhattan",
    glass: "Coupe",
    method: "Stir, strain",
    garnish: "Maraschino cherry",
    ingredients: [
      { name: "Rye whiskey", oz: 2 },
      { name: "Sweet vermouth", oz: 1 },
      { name: "Angostura bitters", oz: 0.05, note: "2 dashes" },
    ],
  },
  {
    key: "martini",
    label: "Martini (dry)",
    glass: "Coupe",
    method: "Stir, strain",
    garnish: "Olive or lemon twist",
    ingredients: [
      { name: "Gin (or vodka)", oz: 3 },
      { name: "Dry vermouth", oz: 0.5 },
    ],
  },
  {
    key: "negroni",
    label: "Negroni",
    glass: "Rocks",
    method: "Stir, build over ice",
    garnish: "Orange peel",
    ingredients: [
      { name: "Gin", oz: 1 },
      { name: "Campari", oz: 1 },
      { name: "Sweet vermouth", oz: 1 },
    ],
  },
  {
    key: "margarita",
    label: "Margarita",
    glass: "Rocks (salt rim)",
    method: "Shake, strain",
    garnish: "Lime wheel",
    ingredients: [
      { name: "Blanco tequila", oz: 2 },
      { name: "Cointreau (triple sec)", oz: 1 },
      { name: "Fresh lime juice", oz: 1 },
    ],
  },
  {
    key: "mojito",
    label: "Mojito",
    glass: "Highball",
    method: "Muddle mint, build",
    garnish: "Mint sprig, lime",
    ingredients: [
      { name: "White rum", oz: 2 },
      { name: "Fresh lime juice", oz: 0.75 },
      { name: "Simple syrup", oz: 0.5 },
      { name: "Soda water", oz: 2 },
      { name: "Fresh mint leaves", oz: 0.25, note: "8\u201310 leaves" },
    ],
  },
  {
    key: "daiquiri",
    label: "Daiquiri",
    glass: "Coupe",
    method: "Shake, strain",
    garnish: "Lime wheel",
    ingredients: [
      { name: "White rum", oz: 2 },
      { name: "Fresh lime juice", oz: 1 },
      { name: "Simple syrup", oz: 0.75 },
    ],
  },
  {
    key: "sidecar",
    label: "Sidecar",
    glass: "Coupe (sugar rim)",
    method: "Shake, strain",
    garnish: "Orange peel",
    ingredients: [
      { name: "Cognac", oz: 2 },
      { name: "Cointreau", oz: 1 },
      { name: "Fresh lemon juice", oz: 0.75 },
    ],
  },
  {
    key: "cosmopolitan",
    label: "Cosmopolitan",
    glass: "Coupe",
    method: "Shake, strain",
    garnish: "Lime wheel",
    ingredients: [
      { name: "Citrus vodka", oz: 1.5 },
      { name: "Cointreau", oz: 0.5 },
      { name: "Cranberry juice", oz: 0.5 },
      { name: "Fresh lime juice", oz: 0.5 },
    ],
  },
  {
    key: "whiskey-sour",
    label: "Whiskey Sour",
    glass: "Rocks",
    method: "Shake, strain",
    garnish: "Cherry, orange",
    ingredients: [
      { name: "Bourbon", oz: 2 },
      { name: "Fresh lemon juice", oz: 0.75 },
      { name: "Simple syrup", oz: 0.75 },
      { name: "Egg white (optional)", oz: 0.5 },
    ],
  },
  {
    key: "gin-tonic",
    label: "Gin and Tonic",
    glass: "Highball",
    method: "Build over ice",
    garnish: "Lime wedge",
    ingredients: [
      { name: "Gin", oz: 2 },
      { name: "Tonic water", oz: 4 },
    ],
  },
  {
    key: "paloma",
    label: "Paloma",
    glass: "Highball (salt rim)",
    method: "Build over ice",
    garnish: "Lime wedge",
    ingredients: [
      { name: "Blanco tequila", oz: 2 },
      { name: "Fresh lime juice", oz: 0.5 },
      { name: "Grapefruit soda", oz: 4 },
    ],
  },
  {
    key: "aperol-spritz",
    label: "Aperol Spritz",
    glass: "Wine glass",
    method: "Build over ice",
    garnish: "Orange slice",
    ingredients: [
      { name: "Prosecco", oz: 3 },
      { name: "Aperol", oz: 2 },
      { name: "Soda water", oz: 1 },
    ],
  },
  {
    key: "moscow-mule",
    label: "Moscow Mule",
    glass: "Copper mug",
    method: "Build over ice",
    garnish: "Lime wedge, mint",
    ingredients: [
      { name: "Vodka", oz: 2 },
      { name: "Fresh lime juice", oz: 0.5 },
      { name: "Ginger beer", oz: 4 },
    ],
  },
  {
    key: "bloody-mary",
    label: "Bloody Mary",
    glass: "Highball",
    method: "Roll, build over ice",
    garnish: "Celery, lemon, olive",
    ingredients: [
      { name: "Vodka", oz: 1.5 },
      { name: "Tomato juice", oz: 4 },
      { name: "Fresh lemon juice", oz: 0.5 },
      { name: "Worcestershire", oz: 0.1, note: "4 dashes" },
      { name: "Hot sauce", oz: 0.05, note: "to taste" },
    ],
  },
];

const ML_PER_OZ = 29.574;

export function CocktailRatioGuide() {
  const [cocktailKey, setCocktailKey] = useState("old-fashioned");
  const [servings, setServings] = useState("1");

  const result = useMemo(() => {
    const c = COCKTAILS.find((x) => x.key === cocktailKey);
    if (!c) return null;
    const n = parseFloat(servings);
    if (!Number.isFinite(n) || n <= 0) return null;

    const scaled = c.ingredients.map((ing) => ({
      ...ing,
      totalOz: ing.oz * n,
      totalMl: ing.oz * n * ML_PER_OZ,
    }));
    const totalOz = scaled.reduce((s, i) => s + i.totalOz, 0);

    return { cocktail: c, scaled, totalOz };
  }, [cocktailKey, servings]);

  const formatOz = (oz: number): string => {
    if (oz < 0.1) {
      // very small: describe as dashes
      const dashes = Math.round(oz / 0.025);
      return `${dashes} dash${dashes === 1 ? "" : "es"}`;
    }
    if (oz < 0.5) return oz.toFixed(2);
    return oz.toFixed(2);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Cocktail</span>
          <select
            value={cocktailKey}
            onChange={(e) => setCocktailKey(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {COCKTAILS.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Number of servings</span>
          <input
            type="number"
            min="1"
            step="1"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-sm text-slate-600">Recipe for {servings} drink{parseFloat(servings) === 1 ? "" : "s"}</div>
                <div className="mt-1 text-2xl font-bold text-brand">{result.cocktail.label}</div>
              </div>
              <div className="text-right text-xs text-slate-600">
                <div>Glass: <span className="font-medium">{result.cocktail.glass}</span></div>
                <div>Method: <span className="font-medium">{result.cocktail.method}</span></div>
                <div>Garnish: <span className="font-medium">{result.cocktail.garnish}</span></div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 text-sm font-semibold text-slate-700">Ingredients</div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                  <th className="py-2 text-left">Ingredient</th>
                  <th className="py-2 text-right">Oz</th>
                  <th className="py-2 text-right">mL</th>
                </tr>
              </thead>
              <tbody>
                {result.scaled.map((ing, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-2">
                      <div className="text-slate-900">{ing.name}</div>
                      {ing.note && <div className="text-xs text-slate-500">{ing.note}</div>}
                    </td>
                    <td className="py-2 text-right font-mono text-slate-900">{formatOz(ing.totalOz)}</td>
                    <td className="py-2 text-right font-mono text-slate-900">{ing.totalMl.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <p className="text-xs text-slate-500">
        Classic ratios per IBA &amp; Death &amp; Co. Adjust sweet/sour to taste&mdash;fresh citrus varies. Always use
        fresh-squeezed juice and quality spirits. Drink responsibly.
      </p>
    </div>
  );
}
