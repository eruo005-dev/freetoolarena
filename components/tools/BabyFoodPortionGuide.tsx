"use client";

import { useMemo, useState } from "react";

type AgeBucket = "6-8" | "9-11" | "12+";

type Portion = {
  label: string;
  cereal: string;
  fruits: string;
  vegetables: string;
  protein: string;
  dairy: string;
  milk: string;
  texture: string;
};

const DATA: Record<AgeBucket, Portion> = {
  "6-8": {
    label: "6&ndash;8 months",
    cereal: "2&ndash;4 tbsp / day (iron-fortified)",
    fruits: "2&ndash;4 tbsp / day",
    vegetables: "2&ndash;4 tbsp / day",
    protein: "1&ndash;2 tbsp / day (pureed meat, beans, egg yolk)",
    dairy: "1&ndash;2 tbsp plain yogurt / day (no added sugar)",
    milk: "24&ndash;32 oz breast milk or formula / day",
    texture: "Thin purees progressing to thicker mash",
  },
  "9-11": {
    label: "9&ndash;11 months",
    cereal: "4&ndash;8 tbsp / day",
    fruits: "4&ndash;8 tbsp / day",
    vegetables: "4&ndash;8 tbsp / day",
    protein: "2&ndash;4 tbsp / day (shredded meat, beans, whole egg)",
    dairy: "2&ndash;4 tbsp plain yogurt or ~1 oz cheese / day",
    milk: "20&ndash;28 oz breast milk or formula / day",
    texture: "Soft finger foods, lumpy mash, small diced pieces",
  },
  "12+": {
    label: "12+ months (toddler)",
    cereal: "~1/2 cup / day",
    fruits: "~1 cup / day",
    vegetables: "~1 cup / day",
    protein: "2&ndash;4 tbsp / meal (chopped meat, beans, egg, fish)",
    dairy: "2&ndash;3 servings / day (whole milk, yogurt, cheese)",
    milk: "16&ndash;24 oz whole milk / day (breast milk optional &amp; still great)",
    texture: "Table foods cut into small, safe pieces",
  },
};

export function BabyFoodPortionGuide() {
  const [bucket, setBucket] = useState<AgeBucket>("6-8");

  const portion = useMemo(() => DATA[bucket], [bucket]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Baby age</span>
          <select
            value={bucket}
            onChange={(event) => setBucket(event.target.value as AgeBucket)}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none"
          >
            <option value="6-8">6&ndash;8 months</option>
            <option value="9-11">9&ndash;11 months</option>
            <option value="12+">12+ months</option>
          </select>
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-brand/5 p-5">
        <p className="text-xs uppercase tracking-wide text-brand">Daily portion guide</p>
        <p
          className="mt-1 text-lg font-semibold text-slate-900"
          dangerouslySetInnerHTML={{ __html: portion.label }}
        />
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Cereal / grains</dt>
            <dd
              className="text-sm font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: portion.cereal }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Fruits</dt>
            <dd
              className="text-sm font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: portion.fruits }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Vegetables</dt>
            <dd
              className="text-sm font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: portion.vegetables }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Protein</dt>
            <dd
              className="text-sm font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: portion.protein }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Dairy</dt>
            <dd
              className="text-sm font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: portion.dairy }}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3">
            <dt className="text-xs uppercase tracking-wide text-slate-500">Breast milk / formula</dt>
            <dd
              className="text-sm font-semibold text-slate-900"
              dangerouslySetInnerHTML={{ __html: portion.milk }}
            />
          </div>
        </dl>
        <p
          className="mt-3 text-sm text-slate-700"
          dangerouslySetInnerHTML={{ __html: `<span class='font-semibold'>Texture:</span> ${portion.texture}` }}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Allergen introduction checklist</p>
        <p className="mt-2">
          Recent guidelines recommend introducing common allergens early (around 4&ndash;6 months once
          solids begin) to reduce later allergy risk. Introduce one at a time, 3&ndash;5 days apart:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Peanut (smooth peanut butter thinned with water, or peanut puff)</li>
          <li>Egg (well-cooked, mashed yolk + white)</li>
          <li>Dairy (plain whole-milk yogurt, small amounts of cheese)</li>
          <li>Wheat, soy, tree nuts, sesame, fish, shellfish</li>
        </ul>
        <p className="mt-3">Ask your pediatrician first if there&rsquo;s severe family allergy history.</p>
      </div>

      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-900">
        <p className="font-semibold">Wait-list: do not give before age 1</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Honey &mdash; botulism risk in infants</li>
          <li>Cow&rsquo;s milk as a main drink &mdash; OK in yogurt and cheese, but not a bottle</li>
          <li>Added salt, added sugar, and heavily processed foods</li>
          <li>Choking hazards &mdash; whole grapes, hot dog rounds, whole nuts, popcorn, hard raw veg</li>
        </ul>
      </div>
    </div>
  );
}
