"use client";

import { useMemo, useState } from "react";

type DogSize = "small" | "medium" | "large" | "giant";

export function DogAgeInHumanYears() {
  const [dogAge, setDogAge] = useState("5");
  const [size, setSize] = useState<DogSize>("medium");

  const result = useMemo(() => {
    const age = Number(dogAge);
    if (!Number.isFinite(age) || age <= 0) return null;

    // 2019 UCSD epigenetic study: human age = 16 * ln(dog age) + 31
    // Only valid for dogs at least ~4 weeks (0.08 yr). For very young puppies fallback linearly.
    let epigenetic = age < 0.5 ? age * 31 : 16 * Math.log(age) + 31;

    // Size modifier applied after year 5 (larger dogs age faster)
    if (age > 5) {
      const extraYears = age - 5;
      const modifier =
        size === "giant" ? 0.18 : size === "large" ? 0.1 : size === "small" ? -0.1 : 0;
      epigenetic += extraYears * modifier * 7;
    }

    // Old ×7 rule (actually: year 1 = 15, year 2 = 24, then +5/yr)
    let oldRule: number;
    if (age <= 1) oldRule = age * 15;
    else if (age <= 2) oldRule = 15 + (age - 1) * 9;
    else oldRule = 24 + (age - 2) * 5;

    // Life stage
    let stage: string;
    if (age < 1) stage = "Puppy";
    else if (age < 2) stage = "Junior";
    else if (age < 7) stage = "Adult";
    else if (age < 10) stage = "Senior";
    else stage = "Geriatric";

    // Typical total life expectancy by size
    const lifeExpectancy: Record<DogSize, number> = {
      small: 14,
      medium: 12,
      large: 10,
      giant: 8,
    };
    const remaining = Math.max(0, lifeExpectancy[size] - age);

    return {
      epigenetic: Math.round(epigenetic * 10) / 10,
      oldRule: Math.round(oldRule * 10) / 10,
      stage,
      lifeExpectancy: lifeExpectancy[size],
      remaining: Math.round(remaining * 10) / 10,
    };
  }, [dogAge, size]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Dog age (years)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={dogAge}
            onChange={(e) => setDogAge(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Size</span>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as DogSize)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="small">Small (under 20 lbs)</option>
            <option value="medium">Medium (21&ndash;50 lbs)</option>
            <option value="large">Large (51&ndash;90 lbs)</option>
            <option value="giant">Giant (over 90 lbs)</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Human-age equivalent (modern formula)
              </div>
              <div className="text-3xl font-semibold text-brand">
                {result.epigenetic} human years
              </div>
            </div>
            <div className="rounded-md bg-white px-3 py-2 text-sm shadow-sm">
              <span className="font-semibold">Life stage:</span> {result.stage}
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Old &times;7 rule
              </div>
              <div className="text-lg font-semibold">{result.oldRule} human years</div>
              <div className="text-xs text-slate-500">
                Outdated &mdash; overestimates early years, underestimates later.
              </div>
            </div>
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Typical life expectancy ({size})
              </div>
              <div className="text-lg font-semibold">{result.lifeExpectancy} years</div>
              <div className="text-xs text-slate-500">
                About {result.remaining} years remaining on average.
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Based on the 2019 UCSD epigenetic study: human age = 16 &times; ln(dog age) + 31,
            with a size adjustment applied after age 5. Individual dogs vary &mdash; diet,
            exercise, and breed genetics all matter.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter a dog age greater than zero.</p>
      )}
    </div>
  );
}
