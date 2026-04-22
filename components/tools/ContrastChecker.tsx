"use client";

import { useMemo, useState } from "react";

export function ContrastChecker() {
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");

  const result = useMemo(() => {
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);
    if (!fgRgb || !bgRgb) return null;
    const l1 = relLum(fgRgb);
    const l2 = relLum(bgRgb);
    const light = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    const ratio = (light + 0.05) / (dark + 0.05);
    return {
      ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaNormal: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    };
  }, [fg, bg]);

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl border border-slate-200 p-8 min-h-[200px] flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: bg, color: fg }}
      >
        <p className="text-base">Normal text sample — The quick brown fox jumps over the lazy dog.</p>
        <p className="text-2xl font-bold">Large text sample — 24px bold</p>
        <p className="text-lg font-semibold">18.66px bold also counts as large</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
            Foreground
          </span>
          <div className="flex gap-2">
            <input
              type="color"
              value={normaliseHex(fg)}
              onChange={(e) => setFg(e.target.value)}
              className="h-10 w-14 rounded-lg border border-slate-300 bg-white px-1"
            />
            <input
              type="text"
              value={fg}
              onChange={(e) => setFg(e.target.value.trim())}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
            />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 block">
            Background
          </span>
          <div className="flex gap-2">
            <input
              type="color"
              value={normaliseHex(bg)}
              onChange={(e) => setBg(e.target.value)}
              className="h-10 w-14 rounded-lg border border-slate-300 bg-white px-1"
            />
            <input
              type="text"
              value={bg}
              onChange={(e) => setBg(e.target.value.trim())}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
            />
          </div>
        </div>
      </div>

      {result && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">
              {result.ratio.toFixed(2)}:1
            </span>
            <span className="text-sm text-slate-500">contrast ratio</span>
          </div>
          <table className="w-full text-sm">
            <tbody>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">WCAG AA — Normal (4.5:1)</td>
                <td className="py-2 px-3 text-right">
                  <Badge ok={result.aaNormal} />
                </td>
              </tr>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">WCAG AA — Large (3:1)</td>
                <td className="py-2 px-3 text-right">
                  <Badge ok={result.aaLarge} />
                </td>
              </tr>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">WCAG AAA — Normal (7:1)</td>
                <td className="py-2 px-3 text-right">
                  <Badge ok={result.aaaNormal} />
                </td>
              </tr>
              <tr className="even:bg-white odd:bg-slate-50">
                <td className="py-2 px-3 text-slate-500">WCAG AAA — Large (4.5:1)</td>
                <td className="py-2 px-3 text-right">
                  <Badge ok={result.aaaLarge} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Badge({ ok }: { ok: boolean }) {
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-semibold ${
        ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
      }`}
    >
      {ok ? "Pass" : "Fail"}
    </span>
  );
}

function normaliseHex(h: string): string {
  const s = h.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(s)) return "#" + s.split("").map((c) => c + c).join("");
  if (/^[0-9a-fA-F]{6}$/.test(s)) return "#" + s;
  return "#000000";
}

function hexToRgb(input: string): { r: number; g: number; b: number } | null {
  const s = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]+$/.test(s)) return null;
  if (s.length === 3) {
    return {
      r: parseInt(s[0] + s[0], 16),
      g: parseInt(s[1] + s[1], 16),
      b: parseInt(s[2] + s[2], 16),
    };
  }
  if (s.length === 6) {
    return {
      r: parseInt(s.slice(0, 2), 16),
      g: parseInt(s.slice(2, 4), 16),
      b: parseInt(s.slice(4, 6), 16),
    };
  }
  return null;
}

function relLum({ r, g, b }: { r: number; g: number; b: number }): number {
  const toLin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
}
