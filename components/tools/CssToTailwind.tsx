"use client";

import { useMemo, useState } from "react";

const SPACE: Record<string, string> = {
  "0": "0", "1px": "px", "2px": "0.5", "4px": "1", "6px": "1.5", "8px": "2", "10px": "2.5",
  "12px": "3", "14px": "3.5", "16px": "4", "20px": "5", "24px": "6", "28px": "7", "32px": "8",
  "36px": "9", "40px": "10", "48px": "12", "56px": "14", "64px": "16", "80px": "20", "96px": "24",
};

const FONT_SIZE: Record<string, string> = {
  "12px": "text-xs", "14px": "text-sm", "16px": "text-base", "18px": "text-lg",
  "20px": "text-xl", "24px": "text-2xl", "30px": "text-3xl", "36px": "text-4xl",
  "48px": "text-5xl", "60px": "text-6xl",
};

const FONT_WEIGHT: Record<string, string> = {
  "100": "font-thin", "200": "font-extralight", "300": "font-light", "400": "font-normal",
  "500": "font-medium", "600": "font-semibold", "700": "font-bold", "800": "font-extrabold", "900": "font-black",
  "normal": "font-normal", "bold": "font-bold",
};

const DISPLAY: Record<string, string> = {
  "block": "block", "inline-block": "inline-block", "inline": "inline", "flex": "flex",
  "inline-flex": "inline-flex", "grid": "grid", "inline-grid": "inline-grid", "none": "hidden",
};

const COLORS: Record<string, string> = {
  "#000": "black", "#000000": "black", "#fff": "white", "#ffffff": "white",
  "red": "red-500", "blue": "blue-500", "green": "green-500", "yellow": "yellow-400",
  "gray": "gray-500", "grey": "gray-500", "transparent": "transparent",
};

function space(v: string, prefix: string): string | null {
  const key = v.trim().toLowerCase();
  if (SPACE[key]) return `${prefix}-${SPACE[key]}`;
  const m = key.match(/^(\d+)px$/);
  if (m) return `${prefix}-[${m[1]}px]`;
  return `${prefix}-[${key}]`;
}

function color(v: string, prefix: string): string | null {
  const key = v.trim().toLowerCase();
  if (COLORS[key]) return `${prefix}-${COLORS[key]}`;
  if (/^#[0-9a-f]{3,8}$/i.test(key)) return `${prefix}-[${key}]`;
  return `${prefix}-[${key}]`;
}

function convertDecl(prop: string, value: string): string[] {
  const p = prop.trim().toLowerCase();
  const v = value.trim();
  const classes: string[] = [];
  if (p === "display" && DISPLAY[v]) classes.push(DISPLAY[v]);
  else if (p === "padding") {
    const parts = v.split(/\s+/);
    if (parts.length === 1) { const c = space(parts[0], "p"); if (c) classes.push(c); }
    else {
      const c1 = space(parts[0], "py"); const c2 = space(parts[1] || parts[0], "px");
      if (c1) classes.push(c1); if (c2) classes.push(c2);
    }
  } else if (p === "margin") {
    const parts = v.split(/\s+/);
    if (parts.length === 1) { const c = space(parts[0], "m"); if (c) classes.push(c); }
    else {
      const c1 = space(parts[0], "my"); const c2 = space(parts[1] || parts[0], "mx");
      if (c1) classes.push(c1); if (c2) classes.push(c2);
    }
  } else if (p === "padding-top") { const c = space(v, "pt"); if (c) classes.push(c); }
  else if (p === "padding-bottom") { const c = space(v, "pb"); if (c) classes.push(c); }
  else if (p === "padding-left") { const c = space(v, "pl"); if (c) classes.push(c); }
  else if (p === "padding-right") { const c = space(v, "pr"); if (c) classes.push(c); }
  else if (p === "margin-top") { const c = space(v, "mt"); if (c) classes.push(c); }
  else if (p === "margin-bottom") { const c = space(v, "mb"); if (c) classes.push(c); }
  else if (p === "margin-left") { const c = space(v, "ml"); if (c) classes.push(c); }
  else if (p === "margin-right") { const c = space(v, "mr"); if (c) classes.push(c); }
  else if (p === "width") { const c = space(v, "w"); if (c) classes.push(c); }
  else if (p === "height") { const c = space(v, "h"); if (c) classes.push(c); }
  else if (p === "font-size" && FONT_SIZE[v]) classes.push(FONT_SIZE[v]);
  else if (p === "font-size") classes.push(`text-[${v}]`);
  else if (p === "font-weight" && FONT_WEIGHT[v]) classes.push(FONT_WEIGHT[v]);
  else if (p === "color") { const c = color(v, "text"); if (c) classes.push(c); }
  else if (p === "background" || p === "background-color") { const c = color(v, "bg"); if (c) classes.push(c); }
  else if (p === "border-radius") {
    if (v === "9999px" || v === "50%") classes.push("rounded-full");
    else if (v === "0") classes.push("rounded-none");
    else classes.push(`rounded-[${v}]`);
  } else if (p === "text-align") classes.push(`text-${v}`);
  else if (p === "flex-direction") classes.push(`flex-${v === "column" ? "col" : "row"}`);
  else if (p === "justify-content") classes.push(`justify-${v.replace("flex-", "").replace("space-", "")}`);
  else if (p === "align-items") classes.push(`items-${v.replace("flex-", "")}`);
  else if (p === "gap") { const c = space(v, "gap"); if (c) classes.push(c); }
  else if (p === "opacity") classes.push(`opacity-${Math.round(parseFloat(v) * 100)}`);
  else classes.push(`[${p}:${v.replace(/\s+/g, "_")}]`);
  return classes;
}

function parse(css: string): string {
  const body = css.replace(/\/\*[\s\S]*?\*\//g, "").trim();
  const inner = body.includes("{") ? body.slice(body.indexOf("{") + 1, body.lastIndexOf("}")) : body;
  const decls = inner.split(";").map((s) => s.trim()).filter(Boolean);
  const classes: string[] = [];
  for (const d of decls) {
    const idx = d.indexOf(":");
    if (idx === -1) continue;
    classes.push(...convertDecl(d.slice(0, idx), d.slice(idx + 1)));
  }
  return classes.join(" ");
}

export function CssToTailwind() {
  const [input, setInput] = useState(`.card {\n  display: flex;\n  padding: 16px 24px;\n  background: #fff;\n  border-radius: 12px;\n  font-size: 14px;\n  color: #111827;\n}`);
  const [copied, setCopied] = useState(false);
  const out = useMemo(() => parse(input), [input]);

  function copy() {
    navigator.clipboard?.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">CSS</span>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={10} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-2">Tailwind classes</div>
        <code className="font-mono text-sm block break-all">{out || "—"}</code>
      </div>
      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
        {copied ? "Copied" : "Copy classes"}
      </button>
    </div>
  );
}
