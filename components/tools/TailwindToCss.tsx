"use client";

import { useMemo, useState } from "react";

const SPACE_SCALE: Record<string, string> = {
  "0": "0", "px": "1px", "0.5": "2px", "1": "4px", "1.5": "6px", "2": "8px", "2.5": "10px",
  "3": "12px", "3.5": "14px", "4": "16px", "5": "20px", "6": "24px", "7": "28px", "8": "32px",
  "9": "36px", "10": "40px", "11": "44px", "12": "48px", "14": "56px", "16": "64px",
  "20": "80px", "24": "96px", "28": "112px", "32": "128px", "40": "160px", "48": "192px",
  "56": "224px", "64": "256px", "72": "288px", "80": "320px", "96": "384px",
};

const FONT_SIZE: Record<string, string> = {
  "xs": "12px", "sm": "14px", "base": "16px", "lg": "18px", "xl": "20px",
  "2xl": "24px", "3xl": "30px", "4xl": "36px", "5xl": "48px", "6xl": "60px", "7xl": "72px",
};

const FONT_WEIGHT: Record<string, string> = {
  "thin": "100", "extralight": "200", "light": "300", "normal": "400",
  "medium": "500", "semibold": "600", "bold": "700", "extrabold": "800", "black": "900",
};

const DISPLAY: Record<string, string> = { "block": "block", "inline-block": "inline-block", "inline": "inline", "flex": "flex", "inline-flex": "inline-flex", "grid": "grid", "hidden": "none" };

function sp(v: string) { return SPACE_SCALE[v] ?? v; }
function arbitrary(cls: string, prefix: string): string | null {
  if (cls.startsWith(`${prefix}-[`) && cls.endsWith("]")) return cls.slice(prefix.length + 2, -1);
  return null;
}

function convert(cls: string): [string, string] | null {
  const arb = (p: string) => arbitrary(cls, p);
  if (cls === "flex") return ["display", "flex"];
  if (cls === "grid") return ["display", "grid"];
  if (cls === "block") return ["display", "block"];
  if (cls === "hidden") return ["display", "none"];
  if (cls === "inline-block") return ["display", "inline-block"];
  if (DISPLAY[cls]) return ["display", DISPLAY[cls]];

  if (cls === "flex-row") return ["flex-direction", "row"];
  if (cls === "flex-col") return ["flex-direction", "column"];

  if (cls.startsWith("justify-")) return ["justify-content", cls.replace("justify-", "").replace("between", "space-between").replace("around", "space-around").replace("evenly", "space-evenly")];
  if (cls.startsWith("items-")) return ["align-items", cls.replace("items-", "").replace("start", "flex-start").replace("end", "flex-end")];

  const maps: Array<[string, string]> = [["p-", "padding"], ["pt-", "padding-top"], ["pb-", "padding-bottom"], ["pl-", "padding-left"], ["pr-", "padding-right"], ["m-", "margin"], ["mt-", "margin-top"], ["mb-", "margin-bottom"], ["ml-", "margin-left"], ["mr-", "margin-right"], ["w-", "width"], ["h-", "height"], ["gap-", "gap"]];
  for (const [pre, p] of maps) {
    if (cls.startsWith(pre)) {
      const a = arb(pre.slice(0, -1));
      return [p, a ?? sp(cls.slice(pre.length))];
    }
  }
  if (cls.startsWith("px-")) { const a = arb("px"); const v = a ?? sp(cls.slice(3)); return ["padding", `0 ${v}`]; }
  if (cls.startsWith("py-")) { const a = arb("py"); const v = a ?? sp(cls.slice(3)); return ["padding", `${v} 0`]; }
  if (cls.startsWith("mx-")) { const a = arb("mx"); const v = a ?? sp(cls.slice(3)); return ["margin", `0 ${v}`]; }
  if (cls.startsWith("my-")) { const a = arb("my"); const v = a ?? sp(cls.slice(3)); return ["margin", `${v} 0`]; }

  if (cls.startsWith("text-") && FONT_SIZE[cls.slice(5)]) return ["font-size", FONT_SIZE[cls.slice(5)]];
  if (cls.startsWith("font-") && FONT_WEIGHT[cls.slice(5)]) return ["font-weight", FONT_WEIGHT[cls.slice(5)]];
  if (cls.startsWith("text-")) {
    const a = arb("text");
    if (a) return ["color", a];
    const rest = cls.slice(5);
    if (rest === "center" || rest === "left" || rest === "right" || rest === "justify") return ["text-align", rest];
    return ["color", rest];
  }
  if (cls.startsWith("bg-")) { const a = arb("bg"); return ["background-color", a ?? cls.slice(3)]; }
  if (cls === "rounded") return ["border-radius", "4px"];
  if (cls === "rounded-full") return ["border-radius", "9999px"];
  if (cls === "rounded-none") return ["border-radius", "0"];
  if (cls.startsWith("rounded-")) { const a = arb("rounded"); return ["border-radius", a ?? cls.slice(8)]; }
  if (cls.startsWith("opacity-")) return ["opacity", String(parseInt(cls.slice(8)) / 100)];

  if (cls.startsWith("[") && cls.endsWith("]")) {
    const inside = cls.slice(1, -1);
    const idx = inside.indexOf(":");
    if (idx > -1) return [inside.slice(0, idx), inside.slice(idx + 1).replace(/_/g, " ")];
  }
  return null;
}

export function TailwindToCss() {
  const [input, setInput] = useState("flex items-center justify-between px-4 py-2 bg-white rounded-lg text-sm font-semibold");
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => {
    const classes = input.split(/\s+/).filter(Boolean);
    const decls: Array<[string, string]> = [];
    for (const c of classes) {
      const r = convert(c);
      if (r) decls.push(r);
    }
    if (!decls.length) return "";
    return `.element {\n${decls.map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`;
  }, [input]);

  function copy() {
    navigator.clipboard?.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Tailwind classes</span>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={4} className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-xs" />
      </label>
      <pre className="rounded-xl bg-slate-900 text-slate-100 p-4 text-xs font-mono overflow-auto">{css || "/* paste Tailwind classes */"}</pre>
      <button onClick={copy} className="bg-brand text-white font-semibold rounded-lg px-4 py-2 text-sm hover:bg-brand-dark">
        {copied ? "Copied" : "Copy CSS"}
      </button>
    </div>
  );
}
