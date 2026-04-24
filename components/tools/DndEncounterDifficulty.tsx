"use client";

import { useMemo, useState } from "react";

type Thresholds = {
  easy: number;
  medium: number;
  hard: number;
  deadly: number;
};

const XP_THRESHOLDS: Record<number, Thresholds> = {
  1: { easy: 25, medium: 50, hard: 75, deadly: 100 },
  2: { easy: 50, medium: 100, hard: 150, deadly: 200 },
  3: { easy: 75, medium: 150, hard: 225, deadly: 400 },
  4: { easy: 125, medium: 250, hard: 375, deadly: 500 },
  5: { easy: 250, medium: 500, hard: 750, deadly: 1100 },
  6: { easy: 300, medium: 600, hard: 900, deadly: 1400 },
  7: { easy: 350, medium: 750, hard: 1100, deadly: 1700 },
  8: { easy: 450, medium: 900, hard: 1400, deadly: 2100 },
  9: { easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
  10: { easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
  11: { easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
  12: { easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
  13: { easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
  14: { easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
  15: { easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
  16: { easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
  17: { easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
  18: { easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
  19: { easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
  20: { easy: 2800, medium: 5700, hard: 8500, deadly: 12700 },
};

function encounterMultiplier(count: number): number {
  if (count <= 1) return 1.0;
  if (count === 2) return 1.5;
  if (count <= 6) return 2.0;
  if (count <= 10) return 2.5;
  if (count <= 14) return 3.0;
  return 4.0;
}

export function DndEncounterDifficulty() {
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(5);
  const [monsterCount, setMonsterCount] = useState(3);
  const [monsterXp, setMonsterXp] = useState(1500);

  const data = useMemo(() => {
    const t = XP_THRESHOLDS[partyLevel] ?? XP_THRESHOLDS[1];
    const mult = encounterMultiplier(monsterCount);
    const party = {
      easy: t.easy * partySize,
      medium: t.medium * partySize,
      hard: t.hard * partySize,
      deadly: t.deadly * partySize,
    };
    const adjusted = {
      easy: Math.floor(party.easy / mult),
      medium: Math.floor(party.medium / mult),
      hard: Math.floor(party.hard / mult),
      deadly: Math.floor(party.deadly / mult),
    };
    return { party, adjusted, mult };
  }, [partySize, partyLevel, monsterCount]);

  const tier = useMemo(() => {
    const raw = monsterXp * data.mult;
    if (raw >= data.party.deadly) return { label: "Deadly+", color: "bg-rose-100 text-rose-900" };
    if (raw >= data.party.hard) return { label: "Deadly", color: "bg-red-100 text-red-900" };
    if (raw >= data.party.medium) return { label: "Hard", color: "bg-orange-100 text-orange-900" };
    if (raw >= data.party.easy) return { label: "Medium", color: "bg-amber-100 text-amber-900" };
    return { label: "Easy", color: "bg-emerald-100 text-emerald-900" };
  }, [monsterXp, data]);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Party &amp; encounter setup</h3>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="block">
            <span className="text-xs font-medium text-zinc-700">Party size</span>
            <input
              type="number"
              min={1}
              max={8}
              value={partySize}
              onChange={(e) =>
                setPartySize(Math.min(8, Math.max(1, parseInt(e.target.value || "1", 10))))
              }
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-zinc-700">Average party level</span>
            <input
              type="number"
              min={1}
              max={20}
              value={partyLevel}
              onChange={(e) =>
                setPartyLevel(Math.min(20, Math.max(1, parseInt(e.target.value || "1", 10))))
              }
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-zinc-700">Monster count</span>
            <input
              type="number"
              min={1}
              max={20}
              value={monsterCount}
              onChange={(e) =>
                setMonsterCount(Math.min(20, Math.max(1, parseInt(e.target.value || "1", 10))))
              }
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            />
          </label>
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          Encounter multiplier: &times;{data.mult.toFixed(1)} (applied because groups of monsters
          punch harder than their raw XP suggests).
        </p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">XP budget by difficulty</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-3 py-2 text-left">Tier</th>
                <th className="px-3 py-2 text-right">Raw XP budget</th>
                <th className="px-3 py-2 text-right">Adjusted (&divide;{data.mult.toFixed(1)})</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-zinc-50">
                <td className="px-3 py-2 font-medium text-emerald-700">Easy</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.party.easy.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.adjusted.easy.toLocaleString()}
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-zinc-50">
                <td className="px-3 py-2 font-medium text-amber-700">Medium</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.party.medium.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.adjusted.medium.toLocaleString()}
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-zinc-50">
                <td className="px-3 py-2 font-medium text-orange-700">Hard</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.party.hard.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.adjusted.hard.toLocaleString()}
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-zinc-50">
                <td className="px-3 py-2 font-medium text-rose-700">Deadly</td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.party.deadly.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {data.adjusted.deadly.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Check your encounter</h3>
        <label className="mt-3 block">
          <span className="text-xs font-medium text-zinc-700">
            Total monster XP (sum of every creature&rsquo;s XP value)
          </span>
          <input
            type="number"
            min={0}
            value={monsterXp}
            onChange={(e) => setMonsterXp(Math.max(0, parseInt(e.target.value || "0", 10)))}
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
          />
        </label>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm text-zinc-700">
            Adjusted encounter XP:{" "}
            <span className="font-semibold tabular-nums">
              {(monsterXp * data.mult).toLocaleString()}
            </span>
          </span>
          <span
            className={`rounded-md px-2 py-1 text-xs font-semibold ${tier.color}`}
          >
            {tier.label}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-brand/30 bg-brand/5 p-4 text-xs text-zinc-700">
        The DMG assumes 6&ndash;8 medium/hard encounters per adventuring day. A single Deadly
        fight can still be survivable &mdash; Deadly doesn&rsquo;t mean &ldquo;TPK,&rdquo; it means
        &ldquo;at least one PC might drop.&rdquo;
      </div>
    </div>
  );
}
