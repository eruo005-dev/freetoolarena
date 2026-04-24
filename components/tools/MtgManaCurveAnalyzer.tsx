"use client";

import { useMemo, useState } from "react";

type Card = {
  count: number;
  name: string;
  cmc: number;
  isLand: boolean;
};

function parseManaCost(token: string): number | null {
  const trimmed = token.trim();
  if (!trimmed) return null;
  // Plain number shorthand
  if (/^\d+$/.test(trimmed)) return parseInt(trimmed, 10);
  // Curly brace notation: {2}{R}{R}
  if (trimmed.includes("{")) {
    const symbols = trimmed.match(/\{[^}]+\}/g);
    if (!symbols) return null;
    let cmc = 0;
    for (const s of symbols) {
      const inner = s.slice(1, -1);
      if (/^\d+$/.test(inner)) cmc += parseInt(inner, 10);
      else if (/^X$/i.test(inner)) cmc += 0;
      else cmc += 1; // colored symbol
    }
    return cmc;
  }
  return null;
}

function parseLine(line: string): Card | null {
  const raw = line.trim();
  if (!raw || raw.startsWith("#") || raw.startsWith("//")) return null;

  // Match count + rest
  const countMatch = raw.match(/^(\d+)\s*x?\s+(.+)$/i);
  if (!countMatch) return null;
  const count = parseInt(countMatch[1], 10);
  const rest = countMatch[2];

  const isLand = /\bland\b/i.test(rest) || /^Land\b/i.test(rest);

  // Try to find mana cost at the end of the line
  // Pattern: last token is either {...}{...} or a plain number
  const manaMatch =
    rest.match(/\s((?:\{[^}]+\})+)\s*$/) || rest.match(/\s(\d+)\s*$/);

  let cmc = 0;
  let name = rest;
  if (manaMatch) {
    const parsed = parseManaCost(manaMatch[1]);
    if (parsed !== null) {
      cmc = parsed;
      name = rest.slice(0, manaMatch.index).trim();
    }
  } else if (isLand) {
    cmc = 0;
    name = rest.replace(/\bland\b/i, "").trim() || rest;
  }

  return { count, name: name || rest, cmc, isLand };
}

const SAMPLE = `4 Lightning Bolt {R}
4 Goblin Guide {R}
4 Monastery Swiftspear {R}
4 Eidolon of the Great Revel {R}{R}
4 Lava Spike {R}
4 Rift Bolt {2}{R}
4 Searing Blaze {R}{R}
2 Skewer the Critics {2}{R}
2 Light Up the Stage {2}{R}
4 Boros Charm {R}{W}
20 Mountain Land
4 Inspiring Vantage Land`;

export function MtgManaCurveAnalyzer() {
  const [input, setInput] = useState(SAMPLE);

  const parsed = useMemo(() => {
    return input
      .split("\n")
      .map(parseLine)
      .filter((c): c is Card => c !== null);
  }, [input]);

  const stats = useMemo(() => {
    const buckets = [0, 0, 0, 0, 0, 0, 0, 0]; // 0..7+
    let totalCards = 0;
    let nonLand = 0;
    let lands = 0;
    let weightedCmc = 0;

    for (const c of parsed) {
      totalCards += c.count;
      if (c.isLand) {
        lands += c.count;
        continue;
      }
      nonLand += c.count;
      weightedCmc += c.cmc * c.count;
      const idx = Math.min(7, Math.max(0, c.cmc));
      buckets[idx] += c.count;
    }

    const avgCmc = nonLand > 0 ? weightedCmc / nonLand : 0;
    const suggestedLands = Math.round((nonLand / 60) * 24);
    const topHeavy = buckets[5] + buckets[6] + buckets[7];
    const oneDrop = buckets[1];

    return {
      buckets,
      totalCards,
      nonLand,
      lands,
      avgCmc,
      suggestedLands,
      topHeavy,
      oneDrop,
    };
  }, [parsed]);

  const maxBucket = Math.max(1, ...stats.buckets);

  const warnings: string[] = [];
  if (stats.topHeavy > 12)
    warnings.push(
      `Top-heavy: ${stats.topHeavy} cards at 5+ CMC. Consider trimming finishers or adding ramp.`,
    );
  if (stats.oneDrop < 4 && stats.nonLand >= 40)
    warnings.push(
      `Only ${stats.oneDrop} one-drops. Aggro decks usually want 8+ plays on turn 1.`,
    );
  if (stats.lands > 0 && Math.abs(stats.lands - stats.suggestedLands) >= 4)
    warnings.push(
      `Land count (${stats.lands}) is ${stats.lands > stats.suggestedLands ? "higher" : "lower"} than suggested (${stats.suggestedLands}).`,
    );

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Paste your decklist</h3>
        <p className="mt-1 text-xs text-zinc-500">
          One card per line. Format: <code>4 Lightning Bolt {"{R}"}</code> or{" "}
          <code>4 Counterspell 2</code>. Mark lands with &ldquo;Land&rdquo; in the name.
        </p>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={10}
          spellCheck={false}
          className="mt-3 block w-full rounded-md border border-zinc-300 bg-white p-3 font-mono text-xs"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Total cards</div>
          <div className="mt-1 text-2xl font-semibold text-brand">{stats.totalCards}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Avg CMC</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">
            {stats.avgCmc.toFixed(2)}
          </div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Lands</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">{stats.lands}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Suggested lands</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">{stats.suggestedLands}</div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Mana curve</h3>
        <div className="mt-4 space-y-2">
          {stats.buckets.map((count, idx) => {
            const label = idx === 7 ? "7+" : String(idx);
            const pct = (count / maxBucket) * 100;
            return (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-8 text-xs font-medium text-zinc-500">{label}</span>
                <div className="flex-1 rounded-md bg-zinc-100">
                  <div
                    className="h-6 rounded-md bg-brand/80 text-right"
                    style={{ width: `${Math.max(pct, count > 0 ? 4 : 0)}%` }}
                  />
                </div>
                <span className="w-8 text-right text-xs tabular-nums text-zinc-700">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {warnings.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="text-sm font-semibold text-amber-900">Warnings</h3>
          <ul className="mt-2 space-y-1 text-sm text-amber-900">
            {warnings.map((w, i) => (
              <li key={i}>&bull; {w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
