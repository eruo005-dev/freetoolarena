"use client";

import { useMemo, useState } from "react";

type Lifestyle = "indoor" | "outdoor";

export function CatAgeInHumanYears() {
  const [catAge, setCatAge] = useState("4");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("indoor");

  const result = useMemo(() => {
    const age = Number(catAge);
    if (!Number.isFinite(age) || age <= 0) return null;

    // Standard cat aging: year 1 = 15, year 2 = 24, each additional year = +4
    let humanAge: number;
    if (age <= 1) humanAge = age * 15;
    else if (age <= 2) humanAge = 15 + (age - 1) * 9;
    else humanAge = 24 + (age - 2) * 4;

    // Life stage
    let stage: string;
    let care: string;
    if (age < 0.5) {
      stage = "Kitten";
      care = "Feed kitten food 3&ndash;4x daily, socialize, schedule vaccinations.";
    } else if (age <= 2) {
      stage = "Junior";
      care = "Transition to adult food around 1yr, spay/neuter if not already done.";
    } else if (age <= 6) {
      stage = "Adult";
      care = "Annual checkups, maintain weight, keep up dental care.";
    } else if (age <= 10) {
      stage = "Mature";
      care = "Watch for weight gain, screen bloodwork yearly.";
    } else if (age <= 14) {
      stage = "Senior";
      care = "Semi-annual vet visits, monitor kidneys/thyroid, senior diet.";
    } else {
      stage = "Super-senior";
      care = "Comfort-focused care, arthritis support, frequent vet checks.";
    }

    // Life expectancy
    const baseLife = 15;
    const expected = lifestyle === "outdoor" ? baseLife - 5 : baseLife;
    const remaining = Math.max(0, expected - age);

    return {
      humanAge: Math.round(humanAge * 10) / 10,
      stage,
      care,
      expected,
      remaining: Math.round(remaining * 10) / 10,
    };
  }, [catAge, lifestyle]);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Cat age (years)</span>
          <input
            type="number"
            min={0}
            step={0.1}
            value={catAge}
            onChange={(e) => setCatAge(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium">Lifestyle</span>
          <select
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value as Lifestyle)}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          >
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor / indoor-outdoor</option>
          </select>
        </label>
      </div>

      {result ? (
        <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Human-age equivalent
              </div>
              <div className="text-3xl font-semibold text-brand">
                {result.humanAge} human years
              </div>
            </div>
            <div className="rounded-md bg-white px-3 py-2 text-sm shadow-sm">
              <span className="font-semibold">Life stage:</span> {result.stage}
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Typical life expectancy
              </div>
              <div className="text-lg font-semibold">{result.expected} years</div>
              <div className="text-xs text-slate-500">
                About {result.remaining} years remaining on average.
              </div>
            </div>
            <div className="rounded-md bg-white p-3 shadow-sm">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Care focus
              </div>
              <div
                className="text-sm text-slate-700"
                dangerouslySetInnerHTML={{ __html: result.care }}
              />
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Formula: year 1 = 15 human years, year 2 = 24, each additional year adds 4.
            Outdoor cats average 5 fewer years from predators, traffic, and infectious
            disease exposure.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter a cat age greater than zero.</p>
      )}
    </div>
  );
}
