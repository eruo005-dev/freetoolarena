"use client";

import { useMemo, useState } from "react";

const CROPS = [
  "tomato",
  "basil",
  "carrot",
  "corn",
  "brassicas",
  "beans",
  "squash",
  "onions",
  "cucumbers",
  "potatoes",
  "lettuce",
  "peppers",
  "garlic",
  "strawberries",
  "radish",
  "spinach",
  "peas",
  "dill",
  "marigold",
  "nasturtium",
];

type Tier = "excellent" | "good" | "neutral" | "bad";

type Pair = {
  a: string;
  b: string;
  tier: Tier;
  reason: string;
};

const PAIRS: Pair[] = [
  { a: "tomato", b: "basil", tier: "excellent", reason: "Basil enhances tomato flavor and repels aphids, whiteflies, and hornworms." },
  { a: "tomato", b: "carrot", tier: "good", reason: "Carrots loosen soil for tomato roots; keep tomatoes from fully shading carrot rows." },
  { a: "tomato", b: "corn", tier: "bad", reason: "Both are heavy feeders and share the corn earworm / tomato fruitworm pest." },
  { a: "tomato", b: "brassicas", tier: "bad", reason: "Growth conflicts and mutual allelopathy &mdash; both compete heavily for the same nutrients." },
  { a: "beans", b: "corn", tier: "excellent", reason: "Three Sisters: beans fix nitrogen for corn; corn stalks support climbing beans." },
  { a: "beans", b: "squash", tier: "excellent", reason: "Three Sisters: squash leaves shade soil and deter raccoons from bean patches." },
  { a: "beans", b: "onions", tier: "bad", reason: "Onions release sulfur compounds that stunt bean growth." },
  { a: "carrot", b: "onions", tier: "excellent", reason: "Onions repel carrot fly; carrots repel onion fly. Mutual pest protection." },
  { a: "cucumbers", b: "beans", tier: "excellent", reason: "Beans fix nitrogen that cucumbers crave; no shared pests." },
  { a: "cucumbers", b: "potatoes", tier: "bad", reason: "Both are highly susceptible to blight and can cross-infect each other." },
  { a: "lettuce", b: "carrot", tier: "excellent", reason: "Shallow lettuce roots and deep carrot roots share space well; lettuce shades soil." },
  { a: "peppers", b: "basil", tier: "excellent", reason: "Basil deters aphids and spider mites that plague peppers; improves yield." },
  { a: "garlic", b: "strawberries", tier: "excellent", reason: "Garlic repels spider mites and aphids common to strawberry beds." },
  { a: "garlic", b: "beans", tier: "bad", reason: "Allium sulfur compounds stunt legume growth and disrupt nitrogen fixation." },
  { a: "tomato", b: "onions", tier: "good", reason: "Onions deter aphids and some beetles; no major conflicts." },
  { a: "tomato", b: "marigold", tier: "excellent", reason: "Marigolds suppress root-knot nematodes and repel hornworms." },
  { a: "brassicas", b: "dill", tier: "excellent", reason: "Dill attracts parasitic wasps that prey on cabbage worms." },
  { a: "brassicas", b: "nasturtium", tier: "excellent", reason: "Nasturtium is a trap crop for aphids and cabbage moths." },
  { a: "corn", b: "squash", tier: "excellent", reason: "Three Sisters: squash vines spread at corn base, conserving moisture." },
  { a: "cucumbers", b: "radish", tier: "excellent", reason: "Radishes repel cucumber beetles when interplanted." },
  { a: "lettuce", b: "radish", tier: "good", reason: "Radishes mature fast and break up soil for lettuce." },
  { a: "peas", b: "carrot", tier: "excellent", reason: "Peas fix nitrogen; carrots benefit without competing for the same root zone." },
  { a: "peas", b: "onions", tier: "bad", reason: "Onions stunt legume nitrogen fixation (same as beans)." },
  { a: "potatoes", b: "beans", tier: "excellent", reason: "Beans deter Colorado potato beetles; potatoes protect beans from Mexican bean beetles." },
  { a: "potatoes", b: "tomato", tier: "bad", reason: "Share blight and Colorado potato beetle; never plant near each other." },
  { a: "spinach", b: "strawberries", tier: "excellent", reason: "Spinach shades strawberry roots and shares moisture needs." },
  { a: "squash", b: "nasturtium", tier: "excellent", reason: "Nasturtium repels squash bugs and cucumber beetles." },
  { a: "peppers", b: "onions", tier: "good", reason: "Onions repel pepper maggots and aphids." },
  { a: "peppers", b: "beans", tier: "bad", reason: "Beans can smother young pepper plants and compete for sun." },
];

function findPair(a: string, b: string): Pair | null {
  return (
    PAIRS.find((p) => (p.a === a && p.b === b) || (p.a === b && p.b === a)) ?? null
  );
}

const TIER_ALTERNATIVES: Record<string, string[]> = {
  tomato: ["basil", "carrot", "marigold"],
  corn: ["beans", "squash"],
  beans: ["corn", "squash", "cucumbers"],
  potatoes: ["beans"],
  onions: ["carrot", "tomato", "peppers"],
  cucumbers: ["beans", "radish"],
  brassicas: ["dill", "nasturtium"],
};

export function CompanionPlantChecker() {
  const [cropA, setCropA] = useState("tomato");
  const [cropB, setCropB] = useState("basil");

  const result = useMemo(() => {
    if (cropA === cropB) {
      return {
        tier: "neutral" as Tier,
        reason: "Same crop selected &mdash; choose two different plants to compare companion compatibility.",
      };
    }
    const pair = findPair(cropA, cropB);
    if (pair) return { tier: pair.tier, reason: pair.reason };
    return {
      tier: "neutral" as Tier,
      reason: "No strong companion relationship documented. Generally safe to plant near each other with normal spacing.",
    };
  }, [cropA, cropB]);

  const tierStyle: Record<Tier, string> = {
    excellent: "border-emerald-300 bg-emerald-50 text-emerald-900",
    good: "border-sky-300 bg-sky-50 text-sky-900",
    neutral: "border-slate-300 bg-slate-50 text-slate-800",
    bad: "border-rose-300 bg-rose-50 text-rose-900",
  };

  const showAlts = result.tier === "bad";
  const alts = showAlts ? TIER_ALTERNATIVES[cropA] ?? [] : [];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block text-sm">
          <span className="text-slate-700">Crop A</span>
          <select
            value={cropA}
            onChange={(e) => setCropA(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white capitalize"
          >
            {CROPS.map((c) => (
              <option key={c} value={c} className="capitalize">{c}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-slate-700">Crop B</span>
          <select
            value={cropB}
            onChange={(e) => setCropB(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 bg-white capitalize"
          >
            {CROPS.map((c) => (
              <option key={c} value={c} className="capitalize">{c}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={`rounded-xl border p-4 ${tierStyle[result.tier]}`}>
        <div className="text-xs uppercase tracking-wide opacity-75">Compatibility</div>
        <div className="text-2xl font-semibold mt-1 capitalize">{result.tier}</div>
        <div className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: result.reason }} />
        {showAlts && alts.length > 0 && (
          <div className="mt-3 text-sm">
            <strong>Better companions for {cropA}:</strong>{" "}
            <span className="capitalize">{alts.filter((a) => a !== cropB).join(", ")}</span>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
        <div className="font-semibold mb-1">&ldquo;Three Sisters&rdquo; callout</div>
        <div className="text-sm">
          The classic Indigenous North American planting: <strong>corn + beans + squash</strong>. Corn provides a trellis for beans, beans fix nitrogen for all three, and squash leaves shade the soil and deter pests. Plant corn first, add beans 2 weeks later when corn is 6 inches tall, then squash around the perimeter.
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <strong>Note:</strong> Companion planting is a combination of scientific findings (allelopathy, trap crops, nitrogen fixation) and tradition. Results vary by climate, soil, and season &mdash; treat these as starting points, not guarantees.
      </div>
    </div>
  );
}
