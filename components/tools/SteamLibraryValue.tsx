"use client";

import { useMemo, useState } from "react";

type Game = {
  name: string;
  price: number;
  hours: number | null;
};

const CURRENCIES: Record<string, { symbol: string; code: string }> = {
  USD: { symbol: "$", code: "USD" },
  EUR: { symbol: "\u20AC", code: "EUR" },
  GBP: { symbol: "\u00A3", code: "GBP" },
  CAD: { symbol: "C$", code: "CAD" },
  AUD: { symbol: "A$", code: "AUD" },
};

const SAMPLE = `The Witcher 3 | 29.99 | 86
Hades | 24.99 | 42
Cyberpunk 2077 | 59.99 | 1.5
Stardew Valley | 14.99 | 120
Elden Ring | 59.99 | 0
Baldur's Gate 3 | 59.99 | 60
Hollow Knight | 14.99 | 0.5
Disco Elysium | 39.99 | 22
Slay the Spire | 24.99 | 75
Factorio | 34.99 | 0`;

function parseLine(line: string): Game | null {
  const raw = line.trim();
  if (!raw || raw.startsWith("#")) return null;

  // Prefer pipe-separated: name | price | hours
  if (raw.includes("|")) {
    const parts = raw.split("|").map((p) => p.trim());
    if (parts.length < 2) return null;
    const name = parts[0];
    const price = parseFloat(parts[1].replace(/[^0-9.]/g, ""));
    const hours =
      parts[2] !== undefined && parts[2] !== ""
        ? parseFloat(parts[2].replace(/[^0-9.]/g, ""))
        : null;
    if (!name || isNaN(price)) return null;
    return { name, price, hours: isNaN(hours as number) ? null : hours };
  }

  // Space-separated: trailing number is price
  const match = raw.match(/^(.+?)\s+(\d+(?:\.\d+)?)\s*$/);
  if (!match) return null;
  const name = match[1].trim();
  const price = parseFloat(match[2]);
  if (!name || isNaN(price)) return null;
  return { name, price, hours: null };
}

export function SteamLibraryValue() {
  const [input, setInput] = useState(SAMPLE);
  const [currency, setCurrency] = useState<keyof typeof CURRENCIES>("USD");

  const games = useMemo(() => {
    return input
      .split("\n")
      .map(parseLine)
      .filter((g): g is Game => g !== null);
  }, [input]);

  const stats = useMemo(() => {
    const total = games.reduce((sum, g) => sum + g.price, 0);
    const avg = games.length > 0 ? total / games.length : 0;
    const top5 = [...games].sort((a, b) => b.price - a.price).slice(0, 5);
    const unplayed = games.filter((g) => g.hours !== null && g.hours < 2);
    const regret = unplayed.reduce((sum, g) => sum + g.price, 0);
    return { total, avg, top5, unplayed, regret };
  }, [games]);

  const sym = CURRENCIES[currency].symbol;
  const fmt = (n: number) => `${sym}${n.toFixed(2)}`;

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Paste your Steam library</h3>
        <p className="mt-1 text-xs text-zinc-500">
          Export from{" "}
          <a
            href="https://steamdb.info/calculator/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            steamdb.info/calculator
          </a>{" "}
          or list manually. Format:{" "}
          <code>Name | Price | Hours</code> or <code>Name Price</code>. Hours column is optional.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            spellCheck={false}
            className="block w-full rounded-md border border-zinc-300 bg-white p-3 font-mono text-xs"
          />
          <label className="block sm:w-40">
            <span className="text-xs font-medium text-zinc-700">Currency</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as keyof typeof CURRENCIES)}
              className="mt-1 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
            >
              {Object.keys(CURRENCIES).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Total value</div>
          <div className="mt-1 text-2xl font-semibold text-brand">{fmt(stats.total)}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Games</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">{games.length}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Average price</div>
          <div className="mt-1 text-2xl font-semibold text-zinc-900">{fmt(stats.avg)}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500">Cost of regret</div>
          <div className="mt-1 text-2xl font-semibold text-rose-600">{fmt(stats.regret)}</div>
          <div className="text-xs text-zinc-500">{stats.unplayed.length} unplayed</div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-zinc-900">Most expensive 5</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-3 py-2 text-left">Game</th>
                <th className="px-3 py-2 text-right">Price</th>
                <th className="px-3 py-2 text-right">Hours</th>
              </tr>
            </thead>
            <tbody>
              {stats.top5.map((g, i) => (
                <tr key={i} className="odd:bg-white even:bg-zinc-50">
                  <td className="px-3 py-2">{g.name}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{fmt(g.price)}</td>
                  <td className="px-3 py-2 text-right tabular-nums text-zinc-500">
                    {g.hours === null ? "\u2014" : g.hours}
                  </td>
                </tr>
              ))}
              {stats.top5.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-4 text-center text-zinc-500">
                    No games parsed yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {stats.unplayed.length > 0 && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <h3 className="text-sm font-semibold text-rose-900">
            Paid for but never played ({stats.unplayed.length})
          </h3>
          <p className="mt-1 text-xs text-rose-800">
            Games with under 2 hours played &mdash; you spent {fmt(stats.regret)} on these.
          </p>
          <ul className="mt-2 space-y-1 text-sm text-rose-900">
            {stats.unplayed.map((g, i) => (
              <li key={i} className="flex justify-between">
                <span>{g.name}</span>
                <span className="tabular-nums">
                  {fmt(g.price)} &middot; {g.hours}h
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
