"use client";

import { useMemo, useState } from "react";

type Food = {
  name: string;
  hunger: number;
  saturation: number;
};

const FOODS: Food[] = [
  { name: "Cooked Porkchop", hunger: 8, saturation: 12.8 },
  { name: "Steak", hunger: 8, saturation: 12.8 },
  { name: "Golden Apple", hunger: 4, saturation: 9.6 },
  { name: "Enchanted Golden Apple", hunger: 4, saturation: 9.6 },
  { name: "Bread", hunger: 5, saturation: 6 },
  { name: "Cooked Chicken", hunger: 6, saturation: 7.2 },
  { name: "Raw Chicken", hunger: 2, saturation: 1.2 },
  { name: "Carrot", hunger: 3, saturation: 3.6 },
  { name: "Baked Potato", hunger: 5, saturation: 6 },
  { name: "Apple", hunger: 4, saturation: 2.4 },
  { name: "Melon Slice", hunger: 2, saturation: 1.2 },
  { name: "Cookie", hunger: 2, saturation: 0.4 },
  { name: "Golden Carrot", hunger: 6, saturation: 14.4 },
  { name: "Rabbit Stew", hunger: 10, saturation: 12 },
  { name: "Mushroom Stew", hunger: 6, saturation: 7.2 },
  { name: "Cooked Salmon", hunger: 6, saturation: 9.6 },
  { name: "Cooked Cod", hunger: 5, saturation: 6 },
  { name: "Cake Slice", hunger: 2, saturation: 0.4 },
  { name: "Pumpkin Pie", hunger: 8, saturation: 4.8 },
  { name: "Beetroot Soup", hunger: 6, saturation: 7.2 },
  { name: "Cooked Rabbit", hunger: 5, saturation: 6 },
  { name: "Cooked Mutton", hunger: 6, saturation: 9.6 },
  { name: "Sweet Berries", hunger: 2, saturation: 0.4 },
  { name: "Glow Berries", hunger: 2, saturation: 0.4 },
  { name: "Dried Kelp", hunger: 1, saturation: 0.6 },
  { name: "Honey Bottle", hunger: 6, saturation: 1.2 },
];

export function MinecraftFoodCalculator() {
  const [selected, setSelected] = useState<Record<string, number>>({
    "Steak": 1,
    "Bread": 1,
  });

  const addFood = (name: string) => {
    setSelected((s) => ({ ...s, [name]: (s[name] ?? 0) + 1 }));
  };

  const removeFood = (name: string) => {
    setSelected((s) => {
      const next = { ...s };
      if (!next[name]) return next;
      next[name] -= 1;
      if (next[name] <= 0) delete next[name];
      return next;
    });
  };

  const totals = useMemo(() => {
    let hunger = 0;
    let saturation = 0;
    Object.entries(selected).forEach(([name, count]) => {
      const f = FOODS.find((x) => x.name === name);
      if (!f) return;
      hunger += f.hunger * count;
      saturation += f.saturation * count;
    });
    return { hunger, saturation };
  }, [selected]);

  const best = useMemo(() => {
    return [...FOODS].sort((a, b) => b.saturation / b.hunger - a.saturation / a.hunger)[0];
  }, []);

  const cappedSaturation = Math.min(totals.saturation, 20);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Pick foods to eat</h3>
        <p className="mt-1 text-xs text-zinc-500">
          Each half-shank = 1 hunger point. Max hunger &amp; saturation are both capped at 20.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {FOODS.map((f) => (
            <div
              key={f.name}
              className="flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2"
            >
              <div>
                <div className="text-sm font-medium text-zinc-900">{f.name}</div>
                <div className="text-xs text-zinc-500">
                  {f.hunger} hunger &middot; {f.saturation} sat
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => removeFood(f.name)}
                  className="h-7 w-7 rounded-md border border-zinc-300 text-sm text-zinc-700 hover:bg-white"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm tabular-nums">
                  {selected[f.name] ?? 0}
                </span>
                <button
                  type="button"
                  onClick={() => addFood(f.name)}
                  className="h-7 w-7 rounded-md border border-zinc-300 text-sm text-zinc-700 hover:bg-white"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Total hunger restored</div>
          <div className="mt-1 text-2xl font-semibold text-brand">{totals.hunger}</div>
          <div className="text-xs text-zinc-500">
            {totals.hunger >= 20 ? "Full bar covered" : `${20 - totals.hunger} to fill bar`}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Total saturation</div>
          <div className="mt-1 text-2xl font-semibold text-brand">
            {totals.saturation.toFixed(1)}
          </div>
          <div className="text-xs text-zinc-500">
            Capped in-game at {cappedSaturation.toFixed(1)}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Best sat / hunger</div>
          <div className="mt-1 text-lg font-semibold text-zinc-900">{best.name}</div>
          <div className="text-xs text-zinc-500">
            {(best.saturation / best.hunger).toFixed(2)} saturation per hunger point
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900">
        Pro tip: Golden Carrots give the highest saturation-per-hunger ratio in the game &mdash;
        ideal for long mining or exploration trips where you don&rsquo;t want to keep eating.
      </div>
    </div>
  );
}
