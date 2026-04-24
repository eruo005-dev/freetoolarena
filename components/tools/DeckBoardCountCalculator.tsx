"use client";

import { useMemo, useState } from "react";

export interface DeckBoardCountCalculatorProps {
  initialLength?: number;
  initialWidth?: number;
}

export function DeckBoardCountCalculator({
  initialLength = 16,
  initialWidth = 12,
}: DeckBoardCountCalculatorProps = {}) {
  const [deckLen, setDeckLen] = useState(String(initialLength)); // ft
  const [deckWid, setDeckWid] = useState(String(initialWidth)); // ft
  const [boardWid, setBoardWid] = useState("5.5"); // in
  const [spacing, setSpacing] = useState("0.125"); // in
  const [boardLen, setBoardLen] = useState("16"); // ft option
  const [pricePerBoard, setPricePerBoard] = useState("25"); // $ per 16 ft cedar
  const [joistSize, setJoistSize] = useState<"2x8" | "2x10">("2x8");

  const result = useMemo(() => {
    const L = parseFloat(deckLen);
    const W = parseFloat(deckWid);
    const bw = parseFloat(boardWid);
    const sp = parseFloat(spacing);
    const bl = parseFloat(boardLen);
    const price = parseFloat(pricePerBoard);
    if (
      !Number.isFinite(L) ||
      !Number.isFinite(W) ||
      !Number.isFinite(bw) ||
      !Number.isFinite(sp) ||
      !Number.isFinite(bl) ||
      L <= 0 ||
      W <= 0 ||
      bw <= 0 ||
      bl <= 0
    )
      return null;

    // boards laid across width, run along length
    const rowsNeeded = Math.ceil((W * 12) / (bw + sp));
    // each row needs coverage of L feet; one board = bl ft
    const boardsPerRow = Math.ceil(L / bl);
    const totalBoards = rowsNeeded * boardsPerRow;
    const linearFt = totalBoards * bl;

    // Suggest best board length (minimize cut waste)
    const options = [8, 10, 12, 16];
    const suggestions = options.map((opt) => {
      const perRow = Math.ceil(L / opt);
      const totalLF = rowsNeeded * perRow * opt;
      const waste = totalLF - rowsNeeded * L;
      return { len: opt, totalLF, waste, boards: rowsNeeded * perRow };
    });
    const best = suggestions.reduce((a, b) => (a.waste <= b.waste ? a : b));

    // Joist count: 16" OC for 2x8, 24" OC for 2x10
    const jointSpacing = joistSize === "2x8" ? 16 : 24;
    const joists = Math.ceil((L * 12) / jointSpacing) + 1;

    const cost = totalBoards * (Number.isFinite(price) ? price : 25);

    return {
      rowsNeeded,
      boardsPerRow,
      totalBoards,
      linearFt,
      suggestions,
      best,
      joists,
      jointSpacing,
      cost,
    };
  }, [deckLen, deckWid, boardWid, spacing, boardLen, pricePerBoard, joistSize]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Deck length (ft)" value={deckLen} onChange={setDeckLen} />
        <Field label="Deck width (ft)" value={deckWid} onChange={setDeckWid} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field
          label={`Board width (in, typ 5.5")`}
          value={boardWid}
          onChange={setBoardWid}
        />
        <Field label={`Spacing (in, typ 1/8")`} value={spacing} onChange={setSpacing} />
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Board length (ft)</span>
          <select
            value={boardLen}
            onChange={(e) => setBoardLen(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="8">8 ft</option>
            <option value="10">10 ft</option>
            <option value="12">12 ft</option>
            <option value="16">16 ft</option>
          </select>
        </label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Joist size</span>
          <select
            value={joistSize}
            onChange={(e) => setJoistSize(e.target.value as "2x8" | "2x10")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          >
            <option value="2x8">2x8 (16&quot; on-center)</option>
            <option value="2x10">2x10 (24&quot; on-center)</option>
          </select>
        </label>
        <Field
          label="Board price ($)"
          value={pricePerBoard}
          onChange={setPricePerBoard}
        />
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Boards needed" value={result.totalBoards.toLocaleString()} />
            <Stat label="Linear feet" value={result.linearFt.toLocaleString()} />
            <Stat label="Joists" value={String(result.joists)} />
            <Stat
              label="Board cost"
              value={`$${result.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
            />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">
              Least-waste board length
            </p>
            <p className="text-sm text-slate-700">
              <span className="font-semibold text-brand">{result.best.len} ft boards</span>
              {" "}&mdash; {result.best.boards} boards, {result.best.waste.toFixed(1)} ft cut waste.
            </p>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {result.suggestions.map((s) => (
                <div
                  key={s.len}
                  className={`rounded-lg border p-2 ${
                    s.len === result.best.len
                      ? "border-brand bg-slate-50"
                      : "border-slate-200"
                  }`}
                >
                  <p className="font-semibold">{s.len} ft</p>
                  <p className="text-slate-600">{s.boards} boards</p>
                  <p className="text-slate-500">{s.waste.toFixed(1)} ft waste</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Joists at {result.jointSpacing}&quot; on-center across {deckLen} ft run. Board count
            assumes boards run parallel to deck length with {spacing}&quot; gap.
          </p>
        </>
      ) : (
        <p className="text-sm text-red-600">Enter valid deck dimensions.</p>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-1">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">{label}</p>
      <p className="text-2xl font-semibold tabular-nums text-brand">{value}</p>
    </div>
  );
}
