"use client";

import { useMemo, useState } from "react";

type Rgb = { r: number; g: number; b: number };
type Hsl = { h: number; s: number; l: number };
type Hsv = { h: number; s: number; v: number };
type Cmyk = { c: number; m: number; y: number; k: number };

export function ColorPicker({ initialColor = "#0f766e" }: { initialColor?: string } = {}) {
  const [hex, setHex] = useState<string>(initialColor);
  const [copied, setCopied] = useState<string | null>(null);

  const rgb = useMemo<Rgb>(() => hexToRgb(hex) ?? { r: 15, g: 118, b: 110 }, [hex]);
  const hsl = useMemo<Hsl>(() => rgbToHsl(rgb), [rgb]);
  const hsv = useMemo<Hsv>(() => rgbToHsv(rgb), [rgb]);
  const cmyk = useMemo<Cmyk>(() => rgbToCmyk(rgb), [rgb]);

  function setFromRgb(next: Rgb) {
    setHex(rgbToHex(clampRgb(next)));
  }
  function setFromHsl(next: Hsl) {
    setHex(rgbToHex(hslToRgb(clampHsl(next))));
  }

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  const hexOut = hex.toUpperCase();
  const rgbOut = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslOut = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hsvOut = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  const cmykOut = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  const values: Array<{ label: string; value: string; key: string }> = [
    { label: "HEX", value: hexOut, key: "hex" },
    { label: "RGB", value: rgbOut, key: "rgb" },
    { label: "HSL", value: hslOut, key: "hsl" },
    { label: "HSV", value: hsvOut, key: "hsv" },
    { label: "CMYK", value: cmykOut, key: "cmyk" },
  ];

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl border border-slate-200 h-32"
        style={{ backgroundColor: hex }}
        aria-label="Color preview"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Pick
          </span>
          <input
            type="color"
            value={normaliseHex(hex)}
            onChange={(e) => setHex(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-300 bg-white px-1"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            Hex
          </span>
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value.trim())}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
          />
        </label>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          RGB sliders
        </p>
        <Slider
          label={`R · ${rgb.r}`}
          min={0}
          max={255}
          value={rgb.r}
          onChange={(n) => setFromRgb({ ...rgb, r: n })}
        />
        <Slider
          label={`G · ${rgb.g}`}
          min={0}
          max={255}
          value={rgb.g}
          onChange={(n) => setFromRgb({ ...rgb, g: n })}
        />
        <Slider
          label={`B · ${rgb.b}`}
          min={0}
          max={255}
          value={rgb.b}
          onChange={(n) => setFromRgb({ ...rgb, b: n })}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          HSL sliders
        </p>
        <Slider
          label={`H · ${hsl.h}`}
          min={0}
          max={360}
          value={hsl.h}
          onChange={(n) => setFromHsl({ ...hsl, h: n })}
        />
        <Slider
          label={`S · ${hsl.s}%`}
          min={0}
          max={100}
          value={hsl.s}
          onChange={(n) => setFromHsl({ ...hsl, s: n })}
        />
        <Slider
          label={`L · ${hsl.l}%`}
          min={0}
          max={100}
          value={hsl.l}
          onChange={(n) => setFromHsl({ ...hsl, l: n })}
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2">
        <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
          Values
        </p>
        {values.map((v) => (
          <div key={v.key} className="flex gap-2 items-center">
            <span className="text-xs font-semibold text-slate-500 w-14 shrink-0">
              {v.label}
            </span>
            <code className="flex-1 rounded-lg bg-white border border-slate-200 px-3 py-2 text-sm font-mono text-slate-700 truncate">
              {v.value}
            </code>
            <button
              type="button"
              onClick={() => copy(v.value, v.key)}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              {copied === v.key ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slider({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
        {label}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </label>
  );
}

// ---------- color math ----------

function normaliseHex(h: string): string {
  const s = h.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(s)) {
    return "#" + s.split("").map((c) => c + c).join("");
  }
  if (/^[0-9a-fA-F]{6}$/.test(s)) return "#" + s;
  return "#000000";
}

function hexToRgb(input: string): Rgb | null {
  const s = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]+$/.test(s)) return null;
  if (s.length === 3) {
    return {
      r: parseInt(s[0] + s[0], 16),
      g: parseInt(s[1] + s[1], 16),
      b: parseInt(s[2] + s[2], 16),
    };
  }
  if (s.length === 6 || s.length === 8) {
    return {
      r: parseInt(s.slice(0, 2), 16),
      g: parseInt(s.slice(2, 4), 16),
      b: parseInt(s.slice(4, 6), 16),
    };
  }
  return null;
}

function rgbToHex({ r, g, b }: Rgb): string {
  const h = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
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
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
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

function rgbToHsv({ r, g, b }: Rgb): Hsv {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h: Math.round(h), s: Math.round(s * 100), v: Math.round(max * 100) };
}

function rgbToCmyk({ r, g, b }: Rgb): Cmyk {
  const rn = r / 255,
    gn = g / 255,
    bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
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
