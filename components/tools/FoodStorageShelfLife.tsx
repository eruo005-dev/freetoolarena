"use client";

import { useMemo, useState } from "react";

interface FoodItem {
  key: string;
  label: string;
  fridgeDays: [number, number];
  freezerMonths: [number, number] | null;
  tip: string;
}

const FOODS: FoodItem[] = [
  { key: "cooked-chicken", label: "Cooked chicken", fridgeDays: [3, 4], freezerMonths: [2, 6], tip: "Store in airtight container; reheat to 165°F." },
  { key: "raw-chicken", label: "Raw chicken", fridgeDays: [1, 2], freezerMonths: [9, 12], tip: "Keep in original packaging; place on bottom shelf." },
  { key: "raw-ground-meat", label: "Raw ground meat", fridgeDays: [1, 2], freezerMonths: [3, 4], tip: "Use quickly — ground meat spoils faster than whole cuts." },
  { key: "raw-steak", label: "Raw steak/roast", fridgeDays: [3, 5], freezerMonths: [4, 12], tip: "Wrap tightly in butcher paper or vacuum-seal." },
  { key: "cooked-beef", label: "Cooked beef", fridgeDays: [3, 4], freezerMonths: [2, 3], tip: "Cool to room temp within 2 hrs before refrigerating." },
  { key: "raw-pork", label: "Raw pork", fridgeDays: [3, 5], freezerMonths: [4, 6], tip: "Chops freeze better than whole roasts." },
  { key: "bacon", label: "Bacon (unopened)", fridgeDays: [7, 14], freezerMonths: [1, 1], tip: "Opened bacon: 1 week fridge only." },
  { key: "hot-dogs", label: "Hot dogs (opened)", fridgeDays: [7, 7], freezerMonths: [1, 2], tip: "Unopened: 2 weeks refrigerated." },
  { key: "lunch-meat", label: "Lunch meat (opened)", fridgeDays: [3, 5], freezerMonths: [1, 2], tip: "Unopened deli packs: 2 weeks." },
  { key: "raw-fish", label: "Raw fish (lean)", fridgeDays: [1, 2], freezerMonths: [6, 8], tip: "Fatty fish (salmon): freeze 2\u20133 months only." },
  { key: "cooked-fish", label: "Cooked fish/seafood", fridgeDays: [3, 4], freezerMonths: [1, 2], tip: "Flavor degrades fast — eat sooner than stated." },
  { key: "shrimp", label: "Raw shrimp", fridgeDays: [1, 2], freezerMonths: [3, 6], tip: "Frozen shrimp thaws in 10 min under cold water." },
  { key: "eggs-shell", label: "Eggs (in shell)", fridgeDays: [21, 35], freezerMonths: null, tip: "Can\u2019t freeze whole. Beat eggs can be frozen 12 months." },
  { key: "hard-boiled-eggs", label: "Hard-boiled eggs", fridgeDays: [7, 7], freezerMonths: null, tip: "Don\u2019t freeze — whites turn rubbery." },
  { key: "milk", label: "Milk (opened)", fridgeDays: [5, 7], freezerMonths: [3, 3], tip: "Frozen milk separates — shake well after thawing." },
  { key: "hard-cheese", label: "Hard cheese (cheddar, parmesan)", fridgeDays: [21, 28], freezerMonths: [6, 6], tip: "Freezing changes texture — best for cooking use." },
  { key: "soft-cheese", label: "Soft cheese (brie, feta)", fridgeDays: [7, 7], freezerMonths: [6, 6], tip: "Wrap in wax paper, then plastic." },
  { key: "yogurt", label: "Yogurt", fridgeDays: [7, 14], freezerMonths: [1, 2], tip: "Freezing ok but texture becomes grainy." },
  { key: "butter", label: "Butter", fridgeDays: [30, 90], freezerMonths: [6, 9], tip: "Wrap tightly to prevent absorbing fridge odors." },

  { key: "cooked-pasta", label: "Cooked pasta", fridgeDays: [3, 5], freezerMonths: [1, 2], tip: "Toss with oil before freezing to prevent clumping." },
  { key: "cooked-rice", label: "Cooked rice", fridgeDays: [3, 5], freezerMonths: [1, 2], tip: "Cool quickly; bacillus cereus grows at room temp." },
  { key: "leftovers", label: "Leftovers (mixed)", fridgeDays: [3, 4], freezerMonths: [2, 6], tip: "Label with date; reheat to 165°F." },
  { key: "soup-stew", label: "Soup/stew", fridgeDays: [3, 4], freezerMonths: [2, 3], tip: "Freeze flat in zip bags for fast thawing." },
  { key: "bread", label: "Bread (bakery)", fridgeDays: [3, 5], freezerMonths: [3, 6], tip: "Fridge dries bread out — freeze instead." },
  { key: "fresh-berries", label: "Fresh berries", fridgeDays: [3, 7], freezerMonths: [8, 12], tip: "Don\u2019t wash until ready to eat." },
  { key: "leafy-greens", label: "Leafy greens", fridgeDays: [5, 7], freezerMonths: null, tip: "Wrap in paper towel to absorb moisture." },
  { key: "cooked-veggies", label: "Cooked vegetables", fridgeDays: [3, 5], freezerMonths: [2, 3], tip: "Blanch before freezing raw." },
  { key: "salsa-opened", label: "Salsa (opened jar)", fridgeDays: [14, 30], freezerMonths: [2, 2], tip: "Fresh pico: 3\u20134 days only." },
  { key: "hummus", label: "Hummus (opened)", fridgeDays: [5, 7], freezerMonths: [4, 4], tip: "Drizzle oil on top to extend freshness." },
  { key: "tofu-opened", label: "Tofu (opened)", fridgeDays: [3, 5], freezerMonths: [3, 5], tip: "Change water daily if storing submerged." },
  { key: "cooked-beans", label: "Cooked beans", fridgeDays: [3, 5], freezerMonths: [2, 3], tip: "Freeze in cooking liquid for better texture." },
];

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

export function FoodStorageShelfLife() {
  const today = new Date().toISOString().slice(0, 10);
  const [foodKey, setFoodKey] = useState("cooked-chicken");
  const [startDate, setStartDate] = useState(today);

  const result = useMemo(() => {
    const food = FOODS.find((f) => f.key === foodKey);
    if (!food) return null;
    const start = new Date(startDate + "T00:00:00");
    if (!Number.isFinite(start.getTime())) return null;

    const fridgeBest = addDays(start, food.fridgeDays[0]);
    const fridgeLatest = addDays(start, food.fridgeDays[1]);
    const freezerBest = food.freezerMonths ? addMonths(start, food.freezerMonths[0]) : null;
    const freezerLatest = food.freezerMonths ? addMonths(start, food.freezerMonths[1]) : null;

    return { food, fridgeBest, fridgeLatest, freezerBest, freezerLatest };
  }, [foodKey, startDate]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Food item</span>
          <select
            value={foodKey}
            onChange={(e) => setFoodKey(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {FOODS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="font-medium text-slate-700">Date cooked/purchased</span>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </label>
      </div>

      {result && (
        <>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">Refrigerator (40&deg;F)</div>
              <div className="mt-1 text-2xl font-bold text-blue-900">
                {result.food.fridgeDays[0]}&ndash;{result.food.fridgeDays[1]} days
              </div>
              <div className="mt-2 text-sm text-slate-700">
                <div>Best by: <span className="font-medium">{formatDate(result.fridgeBest)}</span></div>
                <div>Latest: <span className="font-medium">{formatDate(result.fridgeLatest)}</span></div>
              </div>
            </div>

            <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Freezer (0&deg;F)</div>
              {result.freezerBest && result.freezerLatest && result.food.freezerMonths ? (
                <>
                  <div className="mt-1 text-2xl font-bold text-cyan-900">
                    {result.food.freezerMonths[0]}
                    {result.food.freezerMonths[0] !== result.food.freezerMonths[1] && `\u2013${result.food.freezerMonths[1]}`} months
                  </div>
                  <div className="mt-2 text-sm text-slate-700">
                    <div>Best by: <span className="font-medium">{formatDate(result.freezerBest)}</span></div>
                    <div>Latest: <span className="font-medium">{formatDate(result.freezerLatest)}</span></div>
                  </div>
                </>
              ) : (
                <div className="mt-1 text-sm text-slate-600">Not recommended to freeze</div>
              )}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
            <span className="font-semibold text-brand">Tip:</span> {result.food.tip}
          </div>
        </>
      )}

      <p className="text-xs text-slate-500">
        Estimates based on USDA FoodSafety.gov guidelines. &ldquo;When in doubt, throw it out&rdquo;&mdash;trust your
        nose and eyes over any chart.
      </p>
    </div>
  );
}
