"use client";

import { useMemo, useState } from "react";

function xpToNextLevel(level: number): number {
  if (level < 16) return 2 * level + 7;
  if (level < 31) return 5 * level - 38;
  return 9 * level - 158;
}

function totalXpBetween(current: number, target: number): number {
  if (target <= current) return 0;
  let total = 0;
  for (let l = current; l < target; l++) {
    total += xpToNextLevel(l);
  }
  return total;
}

export function MinecraftEnchantmentLevel() {
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState(30);

  const totalXp = useMemo(() => totalXpBetween(current, target), [current, target]);

  const mobEquivs = useMemo(() => {
    return {
      zombies: Math.ceil(totalXp / 5),
      endermen: Math.ceil(totalXp / 5),
      pearlTrades: Math.ceil(totalXp / 3),
      breedings: Math.ceil(totalXp / 4),
      blazes: Math.ceil(totalXp / 10),
    };
  }, [totalXp]);

  const levelTable = useMemo(() => {
    const rows: { level: number; next: number; cumulative: number }[] = [];
    let cum = 0;
    for (let l = 0; l < 40; l++) {
      const next = xpToNextLevel(l);
      cum += next;
      rows.push({ level: l + 1, next, cumulative: cum });
    }
    return rows;
  }, []);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Calculate XP needed</h3>
        <p className="mt-1 text-xs text-zinc-500">
          Level 30 is the enchantment-table max. Grinding past 30 gets expensive fast.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-medium text-zinc-700">Current level</span>
            <input
              type="number"
              min={0}
              max={200}
              value={current}
              onChange={(e) => setCurrent(Math.max(0, parseInt(e.target.value || "0", 10)))}
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            />
          </label>
          <label className="block">
            <span className="text-xs font-medium text-zinc-700">Target level</span>
            <input
              type="number"
              min={0}
              max={200}
              value={target}
              onChange={(e) => setTarget(Math.max(0, parseInt(e.target.value || "0", 10)))}
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Total XP needed</div>
          <div className="mt-1 text-2xl font-semibold text-brand">{totalXp.toLocaleString()}</div>
          <div className="text-xs text-zinc-500">
            {target - current} level{target - current === 1 ? "" : "s"} to gain
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Zombies / Endermen</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">
            {mobEquivs.zombies.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-500">~5 XP each</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Pearl trades</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">
            {mobEquivs.pearlTrades.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-500">~3 XP per trade</div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Other ways to get there</h3>
        <ul className="mt-2 space-y-1 text-sm text-zinc-700">
          <li>Breeding animals: ~{mobEquivs.breedings.toLocaleString()} pairs (1&ndash;7 XP each)</li>
          <li>Blazes in a fortress: ~{mobEquivs.blazes.toLocaleString()} kills (10 XP each)</li>
          <li>Smelting / cooking: steady trickle, good for AFK furnace arrays</li>
          <li>Bottles o&rsquo; Enchanting: 3&ndash;11 XP each, great for burst grinds</li>
        </ul>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">XP-per-level reference (1&ndash;40)</h3>
        <div className="mt-2 max-h-72 overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-3 py-2 text-left">Level</th>
                <th className="px-3 py-2 text-right">XP to reach</th>
                <th className="px-3 py-2 text-right">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {levelTable.map((r) => (
                <tr
                  key={r.level}
                  className={
                    r.level === 30
                      ? "bg-amber-50 font-medium text-amber-900"
                      : "odd:bg-white even:bg-zinc-50"
                  }
                >
                  <td className="px-3 py-1.5">{r.level}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">{r.next}</td>
                  <td className="px-3 py-1.5 text-right tabular-nums">
                    {r.cumulative.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
