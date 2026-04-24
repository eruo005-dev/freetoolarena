"use client";

import { useMemo, useState } from "react";

type Game = {
  id: string;
  label: string;
  yaw: number;
  note?: string;
};

const GAMES: Game[] = [
  { id: "cs2", label: "CS2 / CS:GO", yaw: 0.022 },
  { id: "valorant", label: "Valorant", yaw: 0.07 },
  { id: "apex", label: "Apex Legends", yaw: 0.022 },
  { id: "ow2", label: "Overwatch 2", yaw: 0.0066 },
  { id: "fortnite", label: "Fortnite", yaw: 0.5, note: "Uses a different sensitivity system \u2014 conversion is approximate." },
  { id: "cod", label: "Call of Duty (MW / Warzone)", yaw: 0.0066 },
  { id: "r6", label: "Rainbow Six Siege", yaw: 0.00572958 },
  { id: "pubg", label: "PUBG", yaw: 0.03 },
  { id: "rl", label: "Rocket League", yaw: 0.666, note: "Rocket League sensitivity is a camera multiplier \u2014 conversion is rough." },
];

function cm360(sens: number, yaw: number, dpi: number): number {
  if (!Number.isFinite(sens) || !Number.isFinite(yaw) || !Number.isFinite(dpi) || sens <= 0 || yaw <= 0 || dpi <= 0) return 0;
  return (360 / (sens * yaw)) * (2.54 / dpi);
}

export function SensitivityConverter() {
  const [fromId, setFromId] = useState("cs2");
  const [toId, setToId] = useState("valorant");
  const [sensStr, setSensStr] = useState("2.0");
  const [dpiStr, setDpiStr] = useState("800");

  const sens = Number(sensStr);
  const dpi = Number(dpiStr);
  const sensOk = Number.isFinite(sens) && sens > 0;
  const dpiOk = Number.isFinite(dpi) && dpi > 0;

  const fromGame = useMemo(() => GAMES.find((g) => g.id === fromId) ?? GAMES[0], [fromId]);
  const toGame = useMemo(() => GAMES.find((g) => g.id === toId) ?? GAMES[1], [toId]);

  const sourceCm = useMemo(() => (sensOk && dpiOk ? cm360(sens, fromGame.yaw, dpi) : 0), [sens, dpi, fromGame, sensOk, dpiOk]);
  const targetSens = useMemo(() => {
    if (!sensOk || !dpiOk) return 0;
    return (sens * fromGame.yaw) / toGame.yaw;
  }, [sens, dpi, fromGame, toGame, sensOk, dpiOk]);
  const targetCm = useMemo(() => (sensOk && dpiOk ? cm360(targetSens, toGame.yaw, dpi) : 0), [targetSens, dpi, toGame, sensOk, dpiOk]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">From game</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={fromId}
            onChange={(e) => setFromId(e.target.value)}
          >
            {GAMES.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">To game</span>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            value={toId}
            onChange={(e) => setToId(e.target.value)}
          >
            {GAMES.map((g) => (
              <option key={g.id} value={g.id}>{g.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">In-game sensitivity</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            inputMode="decimal"
            value={sensStr}
            onChange={(e) => setSensStr(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Mouse DPI</span>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
            inputMode="numeric"
            value={dpiStr}
            onChange={(e) => setDpiStr(e.target.value)}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Target sens ({toGame.label})</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{targetSens ? targetSens.toFixed(4) : "\u2014"}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">cm/360 (identical in both)</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{targetCm ? targetCm.toFixed(2) + " cm" : "\u2014"}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">{fromGame.label} cm/360</div>
          <div className="text-2xl font-semibold tabular-nums text-brand">{sourceCm ? sourceCm.toFixed(2) + " cm" : "\u2014"}</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Yaw constants</div>
          <div className="text-sm font-mono text-slate-700 mt-1">
            {fromGame.label}: {fromGame.yaw}<br />
            {toGame.label}: {toGame.yaw}
          </div>
        </div>
      </div>

      {(fromGame.note || toGame.note) && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <div className="font-semibold mb-1">Note</div>
          {fromGame.note && <div>{fromGame.label}: {fromGame.note}</div>}
          {toGame.note && <div>{toGame.label}: {toGame.note}</div>}
        </div>
      )}

      <p className="text-xs text-slate-500">
        Formula: cm/360 = (360 / (sens &times; yaw)) &times; (2.54 / DPI). Matching cm/360 means identical muscle memory between games.
      </p>
    </div>
  );
}
