"use client";

import { useState, useMemo } from "react";

type Rgb = { r: number; g: number; b: number };
type Hsl = { h: number; s: number; l: number };

export function ColorConverter() {
  const [hex, setHex] = useState("#0f766e");

  const rgb = useMemo(() => hexToRgb(hex), [hex]);
  const hsl = useMemo(() => (rgb ? rgbToHsl(rgb) : null), [rgb]);
  const valid = rgb !== null;

  function updateFromRgb(next: Rgb) {
    setHex(rgbToHex(clampRgb(next)));
  }
  function updateFromHsl(next: Hsl) {
    setHex(rgbToHex(hslToRgb(clampHsl(next))));
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          HEX
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value.trim())}
            className={`flex-1 rounded-lg border px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-brand ${
              valid ? "border-slate-300" : "border-rose-400"
            }`}
            placeholder="#0f766e"
            maxLength={9}
          />
          <div
            className="h-11 w-11 rounded-lg border border-slate-300 shrink-0"
            style={{ backgroundColor: valid ? hex : "#fff" }}
            aria-label="Color preview"
          />
          <input
            type="color"
            value={valid ? normaliseHex(hex) : "#000000"}
            onChange={(e) => setHex(e.target.value)}
            className="h-11 w-11 rounded-lg border border-slate-300 cursor-pointer"
            aria-label="Color picker"
          />
        </div>
        {!valid && (
          <p className="text-xs text-rose-600 mt-1">
            Enter a valid 3, 6, or 8-digit hex color (e.g. #fff, #0f766e).
          </p>
        )}
      </div>

      {valid && rgb && hsl && (
        <>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              RGB
            </p>
            <div className="grid grid-cols-3 gap-3">
              <NumBox
                label="R"
                value={rgb.r}
                min={0}
                max={255}
                onChange={(n) => updateFromRgb({ ...rgb, r: n })}
              />
              <NumBox
                label="G"
                value={rgb.g}
                min={0}
                max={255}
                onChange={(n) => updateFromRgb({ ...rgb, g: n })}
              />
              <NumBox
                label="B"
                value={rgb.b}
                min={0}
                max={255}
                onChange={(n) => updateFromRgb({ ...rgb, b: n })}
              />
            </div>
            <CopyRow text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
              HSL
            </p>
            <div className="grid grid-cols-3 gap-3">
              <NumBox
                label="H"
                value={hsl.h}
                min={0}
                max={360}
                onChange={(n) => updateFromHsl({ ...hsl, h: n })}
              />
              <NumBox
                label="S"
                value={hsl.s}
                min={0}
                max={100}
                onChange={(n) => updateFromHsl({ ...hsl, s: n })}
                suffix="%"
              />
              <NumBox
                label="L"
                value={hsl.l}
                min={0}
                max={100}
                onChange={(n) => updateFromHsl({ ...hsl, l: n })}
                suffix="%"
              />
            </div>
            <CopyRow text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
          </div>
        </>
      )}
    </div>
  );
}

function NumBox({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix?: string;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-700 mb-1 block">
        {label}
      </span>
      <div className="relative">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) onChange(n);
          }}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-8 tabular-nums focus:outline-none focus:ring-2 focus:ring-brand"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function CopyRow({ text }: { text: string }) {
  return (
    <div className="flex gap-2 items-center">
      <code className="flex-1 rounded-lg bg-slate-50 border border-slate-200 px-3 py-2 text-sm font-mono text-slate-700 truncate">
        {text}
      </code>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(text)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        Copy
      </button>
    </div>
  );
}

// ---------- colour math ----------

function normaliseHex(h: string): string {
  const s = h.trim().replace(/^#/, "");
  if (s.length === 3) {
    return "#" + s.split("").map((c) => c + c).join("");
  }
  if (s.length === 8) return "#" + s.slice(0, 6);
  return "#" + s;
}

function hexToRgb(input: string): Rgb | null {
  const s = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]+$/.test(s)) return null;
  let r = 0,
    g = 0,
    b = 0;
  if (s.length === 3) {
    r = parseInt(s[0] + s[0], 16);
    g = parseInt(s[1] + s[1], 16);
    b = parseInt(s[2] + s[2], 16);
  } else if (s.length === 6 || s.length === 8) {
    r = parseInt(s.slice(0, 2), 16);
    g = parseInt(s.slice(2, 4), 16);
    b = parseInt(s.slice(4, 6), 16);
  } else {
    return null;
  }
  return { r, g, b };
}

function rgbToHex({ r, g, b }: Rgb): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return "#" + h(r) + h(g) + h(b);
}

function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb({ h, s, l }: Hsl): Rgb {
  const sn = s / 100,
    ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const m = ln - c / 2;
  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
  };
}

function clampRgb({ r, g, b }: Rgb): Rgb {
  return {
    r: Math.max(0, Math.min(255, Math.round(r))),
    g: Math.max(0, Math.min(255, Math.round(g))),
    b: Math.max(0, Math.min(255, Math.round(b))),
  };
}
function clampHsl({ h, s, l }: Hsl): Hsl {
  return {
    h: ((Math.round(h) % 360) + 360) % 360,
    s: Math.max(0, Math.min(100, Math.round(s))),
    l: Math.max(0, Math.min(100, Math.round(l))),
  };
}
