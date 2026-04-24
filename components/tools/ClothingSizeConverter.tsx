"use client";

import { useMemo, useState } from "react";

type Gender = "women" | "men" | "unisex";
type Category = "shirts-tops" | "dresses" | "pants-jeans" | "outerwear";
type Country = "US" | "UK" | "EU" | "JP" | "AU";

type Row = Partial<Record<Country, string>>;

const womensTable: Row[] = [
  { US: "0", UK: "4", EU: "32", JP: "5", AU: "4" },
  { US: "2", UK: "6", EU: "34", JP: "7", AU: "6" },
  { US: "4", UK: "8", EU: "36", JP: "9", AU: "8" },
  { US: "6", UK: "10", EU: "38", JP: "11", AU: "10" },
  { US: "8", UK: "12", EU: "40", JP: "13", AU: "12" },
  { US: "10", UK: "14", EU: "42", JP: "15", AU: "14" },
  { US: "12", UK: "16", EU: "44", JP: "17", AU: "16" },
  { US: "14", UK: "18", EU: "46", JP: "19", AU: "18" },
  { US: "16", UK: "20", EU: "48", JP: "21", AU: "20" },
  { US: "18", UK: "22", EU: "50", JP: "23", AU: "22" },
];

const mensShirtTable: Row[] = [
  { US: "S (35-37)", UK: "S (35-37)", EU: "46", JP: "S", AU: "S" },
  { US: "M (38-40)", UK: "M (38-40)", EU: "48-50", JP: "M", AU: "M" },
  { US: "L (41-43)", UK: "L (41-43)", EU: "52", JP: "L", AU: "L" },
  { US: "XL (44-46)", UK: "XL (44-46)", EU: "54", JP: "XL", AU: "XL" },
  { US: "2XL (47-49)", UK: "2XL (47-49)", EU: "56", JP: "2XL", AU: "2XL" },
  { US: "3XL (50-52)", UK: "3XL (50-52)", EU: "58", JP: "3XL", AU: "3XL" },
];

const mensPantsTable: Row[] = [
  { US: "28", UK: "28", EU: "44", JP: "S", AU: "28" },
  { US: "30", UK: "30", EU: "46", JP: "M", AU: "30" },
  { US: "32", UK: "32", EU: "48", JP: "L", AU: "32" },
  { US: "34", UK: "34", EU: "50", JP: "LL", AU: "34" },
  { US: "36", UK: "36", EU: "52", JP: "3L", AU: "36" },
  { US: "38", UK: "38", EU: "54", JP: "4L", AU: "38" },
  { US: "40", UK: "40", EU: "56", JP: "5L", AU: "40" },
];

const countries: Country[] = ["US", "UK", "EU", "JP", "AU"];

function pickTable(gender: Gender, category: Category): Row[] {
  if (gender === "men") {
    if (category === "pants-jeans") return mensPantsTable;
    return mensShirtTable;
  }
  return womensTable;
}

export function ClothingSizeConverter() {
  const [gender, setGender] = useState<Gender>("women");
  const [category, setCategory] = useState<Category>("shirts-tops");
  const [source, setSource] = useState<Country>("US");
  const [size, setSize] = useState("8");

  const table = useMemo(() => pickTable(gender, category), [gender, category]);

  const match = useMemo(() => {
    const needle = size.trim().toLowerCase();
    if (!needle) return null;
    return (
      table.find((row) => {
        const val = row[source];
        if (!val) return false;
        return val.toLowerCase().startsWith(needle) || val.toLowerCase() === needle;
      }) ?? null
    );
  }, [table, source, size]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Gender
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
          >
            <option value="women">Women&rsquo;s</option>
            <option value="men">Men&rsquo;s</option>
            <option value="unisex">Unisex</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
          >
            <option value="shirts-tops">Shirts / Tops</option>
            <option value="dresses">Dresses</option>
            <option value="pants-jeans">Pants / Jeans</option>
            <option value="outerwear">Outerwear</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Source country
          <select
            value={source}
            onChange={(e) => setSource(e.target.value as Country)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Size
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 shadow-sm focus:border-brand focus:ring-brand"
            placeholder="e.g. 8 or M"
          />
        </label>
      </div>

      {match ? (
        <div className="rounded-lg border border-brand/30 bg-brand/5 p-4">
          <div className="text-sm font-semibold text-brand mb-2">Your equivalents</div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {countries.map((c) => (
              <div key={c} className="rounded-md bg-white dark:bg-gray-800 p-3 shadow-sm">
                <div className="text-xs text-gray-500 dark:text-gray-400">{c}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{match[c] ?? "\u2014"}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-amber-300 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-800 dark:text-amber-200">
          No exact match &mdash; try a standard value from the chart below.
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {countries.map((c) => (
                <th key={c} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800/50">
                {countries.map((c) => (
                  <td key={c} className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 text-gray-800 dark:text-gray-200">
                    {row[c] ?? "\u2014"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Charts vary by brand &mdash; always check the retailer&rsquo;s size guide before ordering.
      </p>
    </div>
  );
}
