"use client";

import { useState, useMemo } from "react";

export function TeamRandomizer() {
  const [namesText, setNamesText] = useState(
    "Alex\nJordan\nSam\nTaylor\nMorgan\nCasey\nRiley\nJamie\nQuinn\nAvery",
  );
  const [teamCount, setTeamCount] = useState(2);
  const [useRatings, setUseRatings] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [shuffleKey, setShuffleKey] = useState(0);

  const names = useMemo(
    () =>
      namesText
        .split("\n")
        .map((n) => n.trim())
        .filter(Boolean),
    [namesText],
  );

  const getRating = (name: string) => ratings[name] ?? 5;

  const setRating = (name: string, value: number) => {
    setRatings((prev) => ({ ...prev, [name]: value }));
  };

  const teams = useMemo(() => {
    // shuffleKey referenced to trigger recompute
    void shuffleKey;
    const count = Math.max(2, Math.min(8, teamCount));
    const buckets: { players: string[]; total: number }[] = Array.from(
      { length: count },
      () => ({ players: [], total: 0 }),
    );

    if (useRatings) {
      const sorted = [...names].sort(
        (a, b) => getRating(b) - getRating(a),
      );
      for (const name of sorted) {
        const lowest = buckets.reduce(
          (minIdx, b, i, arr) =>
            b.total < arr[minIdx].total ? i : minIdx,
          0,
        );
        buckets[lowest].players.push(name);
        buckets[lowest].total += getRating(name);
      }
    } else {
      const shuffled = [...names].sort(() => Math.random() - 0.5);
      shuffled.forEach((name, i) => {
        buckets[i % count].players.push(name);
      });
    }

    return buckets;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names, teamCount, useRatings, ratings, shuffleKey]);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          Players (one per line)
        </label>
        <textarea
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono focus:border-brand focus:outline-none"
          placeholder="Enter one name per line"
        />

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-700">Number of teams</span>
            <input
              type="number"
              min={2}
              max={8}
              value={teamCount}
              onChange={(e) => setTeamCount(Number(e.target.value) || 2)}
              className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useRatings}
              onChange={(e) => setUseRatings(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-slate-700">Include skill ratings (greedy balance)</span>
          </label>
        </div>

        {useRatings && names.length > 0 && (
          <div className="rounded-xl border border-slate-200 p-4 space-y-2">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Skill ratings (1&ndash;10)
            </p>
            {names.map((name) => (
              <div key={name} className="flex items-center gap-3">
                <span className="w-28 text-sm text-slate-700 truncate">{name}</span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={getRating(name)}
                  onChange={(e) => setRating(name, Number(e.target.value))}
                  className="flex-1"
                />
                <span className="w-8 text-right text-sm font-mono">{getRating(name)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => setShuffleKey((k) => k + 1)}
            className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark"
          >
            Generate
          </button>
          <button
            onClick={() => setShuffleKey((k) => k + 1)}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Shuffle again
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {teams.map((team, i) => (
          <div key={i} className="rounded-xl bg-slate-50 p-4 font-mono">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-800">
                Team {i + 1}
              </span>
              {useRatings && (
                <span className="text-xs text-slate-500">
                  total: {team.total}
                </span>
              )}
            </div>
            {team.players.length === 0 ? (
              <p className="text-xs text-slate-400">No players</p>
            ) : (
              <ul className="space-y-1 text-sm text-slate-700">
                {team.players.map((p) => (
                  <li key={p} className="flex justify-between">
                    <span>{p}</span>
                    {useRatings && (
                      <span className="text-xs text-slate-500">
                        {getRating(p)}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
