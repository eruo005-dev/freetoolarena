"use client";

import { useState, useMemo } from "react";

type Match = { a: string; b: string };

export function TournamentBracketGenerator() {
  const [teamsText, setTeamsText] = useState(
    "Red Dragons\nBlue Knights\nGreen Vipers\nYellow Hawks\nBlack Wolves\nWhite Tigers\nSilver Sharks\nGolden Eagles",
  );
  const [format, setFormat] = useState<"single" | "double">("single");
  const [seeding, setSeeding] = useState<"as-listed" | "random" | "snake">(
    "as-listed",
  );
  const [generateKey, setGenerateKey] = useState(0);

  const teams = useMemo(
    () =>
      teamsText
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
    [teamsText],
  );

  const padded = useMemo(() => {
    let size = 2;
    while (size < Math.max(teams.length, 2)) size *= 2;
    size = Math.min(size, 32);
    const arr = [...teams];
    while (arr.length < size) arr.push("BYE");
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teams, generateKey]);

  const seeded = useMemo(() => {
    let list = [...padded];
    if (seeding === "random") {
      list = list.sort(() => Math.random() - 0.5);
    }
    if (seeding === "snake") {
      // Snake seeding: 1 vs N, 2 vs N-1, etc.
      const n = list.length;
      const out: string[] = [];
      for (let i = 0; i < n / 2; i++) {
        out.push(list[i]);
        out.push(list[n - 1 - i]);
      }
      list = out;
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [padded, seeding, generateKey]);

  const rounds = useMemo(() => {
    const result: Match[][] = [];
    let current: string[] = [...seeded];
    while (current.length >= 2) {
      const matches: Match[] = [];
      for (let i = 0; i < current.length; i += 2) {
        matches.push({ a: current[i], b: current[i + 1] ?? "BYE" });
      }
      result.push(matches);
      current = matches.map(() => "TBD");
    }
    return result;
  }, [seeded]);

  const loserRounds = useMemo(() => {
    if (format !== "double") return [];
    const result: Match[][] = [];
    let remaining = Math.floor(seeded.length / 2);
    let round = 1;
    while (remaining >= 1) {
      const matches: Match[] = [];
      const matchCount = Math.max(1, Math.floor(remaining / 2));
      for (let i = 0; i < matchCount; i++) {
        matches.push({
          a: `Loser R${round} M${i * 2 + 1}`,
          b: `Loser R${round} M${i * 2 + 2}`,
        });
      }
      result.push(matches);
      remaining = Math.floor(remaining / 2);
      round++;
      if (result.length > 6) break;
    }
    return result;
  }, [seeded, format]);

  const print = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="space-y-5">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .bracket-grid { page-break-inside: avoid; }
        }
      `}</style>

      <div className="space-y-3 no-print">
        <label className="block text-sm font-medium text-slate-700">
          Teams (one per line &mdash; pads to 4, 8, 16, or 32)
        </label>
        <textarea
          value={teamsText}
          onChange={(e) => setTeamsText(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-brand focus:outline-none"
        />

        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-700">Format</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as "single" | "double")}
              className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              <option value="single">Single elimination</option>
              <option value="double">Double elimination</option>
            </select>
          </label>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-700">Seeding</span>
            <select
              value={seeding}
              onChange={(e) =>
                setSeeding(e.target.value as "as-listed" | "random" | "snake")
              }
              className="rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              <option value="as-listed">As listed</option>
              <option value="random">Random</option>
              <option value="snake">Snake (1 vs N)</option>
            </select>
          </label>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setGenerateKey((k) => k + 1)}
            className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            Generate
          </button>
          <button
            onClick={print}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Print bracket
          </button>
        </div>
      </div>

      <div className="bracket-grid space-y-4">
        <h3 className="text-sm font-semibold text-slate-800">
          {format === "double" ? "Winners bracket" : "Bracket"} &mdash;{" "}
          {seeded.length} teams
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {rounds.map((round, ri) => (
            <div key={ri} className="flex-shrink-0 space-y-2 min-w-[180px]">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {ri === rounds.length - 1
                  ? "Final"
                  : ri === rounds.length - 2
                    ? "Semifinal"
                    : `Round ${ri + 1}`}
              </p>
              {round.map((m, mi) => (
                <div
                  key={mi}
                  className="rounded-xl bg-slate-50 p-4 font-mono text-sm"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1">
                    <span className="truncate">{m.a}</span>
                    <span className="text-xs text-slate-400">vs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="truncate">{m.b}</span>
                    <span className="text-xs text-slate-400">___</span>
                  </div>
                  <div className="mt-2 border-t border-dashed border-slate-300 pt-1 text-xs text-slate-500">
                    Winner: _______
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {format === "double" && loserRounds.length > 0 && (
          <>
            <h3 className="text-sm font-semibold text-slate-800 pt-4">
              Losers bracket
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {loserRounds.map((round, ri) => (
                <div key={ri} className="flex-shrink-0 space-y-2 min-w-[180px]">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Losers R{ri + 1}
                  </p>
                  {round.map((m, mi) => (
                    <div
                      key={mi}
                      className="rounded-xl bg-slate-50 p-4 font-mono text-sm"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-1">
                        <span className="truncate">{m.a}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="truncate">{m.b}</span>
                      </div>
                      <div className="mt-2 border-t border-dashed border-slate-300 pt-1 text-xs text-slate-500">
                        Winner: _______
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-slate-50 p-4 font-mono text-sm max-w-xs">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Grand final
              </p>
              <p>Winners champion vs Losers champion</p>
              <p className="mt-2 text-xs text-slate-500">Winner: _______</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
