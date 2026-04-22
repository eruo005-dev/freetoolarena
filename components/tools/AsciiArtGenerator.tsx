"use client";

import { useMemo, useState } from "react";

// Tiny 5x5 font covering uppercase letters, digits, space.
const FONT: Record<string, string[]> = {
  A: [" ### ", "#   #", "#####", "#   #", "#   #"],
  B: ["#### ", "#   #", "#### ", "#   #", "#### "],
  C: [" ### ", "#    ", "#    ", "#    ", " ### "],
  D: ["#### ", "#   #", "#   #", "#   #", "#### "],
  E: ["#####", "#    ", "#### ", "#    ", "#####"],
  F: ["#####", "#    ", "#### ", "#    ", "#    "],
  G: [" ### ", "#    ", "#  ##", "#   #", " ### "],
  H: ["#   #", "#   #", "#####", "#   #", "#   #"],
  I: ["#####", "  #  ", "  #  ", "  #  ", "#####"],
  J: ["    #", "    #", "    #", "#   #", " ### "],
  K: ["#   #", "#  # ", "###  ", "#  # ", "#   #"],
  L: ["#    ", "#    ", "#    ", "#    ", "#####"],
  M: ["#   #", "## ##", "# # #", "#   #", "#   #"],
  N: ["#   #", "##  #", "# # #", "#  ##", "#   #"],
  O: [" ### ", "#   #", "#   #", "#   #", " ### "],
  P: ["#### ", "#   #", "#### ", "#    ", "#    "],
  Q: [" ### ", "#   #", "# # #", "#  # ", " ## #"],
  R: ["#### ", "#   #", "#### ", "#  # ", "#   #"],
  S: [" ####", "#    ", " ### ", "    #", "#### "],
  T: ["#####", "  #  ", "  #  ", "  #  ", "  #  "],
  U: ["#   #", "#   #", "#   #", "#   #", " ### "],
  V: ["#   #", "#   #", "#   #", " # # ", "  #  "],
  W: ["#   #", "#   #", "# # #", "## ##", "#   #"],
  X: ["#   #", " # # ", "  #  ", " # # ", "#   #"],
  Y: ["#   #", " # # ", "  #  ", "  #  ", "  #  "],
  Z: ["#####", "   # ", "  #  ", " #   ", "#####"],
  "0": [" ### ", "#   #", "#   #", "#   #", " ### "],
  "1": ["  #  ", " ##  ", "  #  ", "  #  ", "#####"],
  "2": [" ### ", "#   #", "   # ", "  #  ", "#####"],
  "3": [" ### ", "#   #", "  ## ", "#   #", " ### "],
  "4": ["#   #", "#   #", "#####", "    #", "    #"],
  "5": ["#####", "#    ", "#### ", "    #", "#### "],
  "6": [" ### ", "#    ", "#### ", "#   #", " ### "],
  "7": ["#####", "    #", "   # ", "  #  ", "  #  "],
  "8": [" ### ", "#   #", " ### ", "#   #", " ### "],
  "9": [" ### ", "#   #", " ####", "    #", " ### "],
  " ": ["     ", "     ", "     ", "     ", "     "],
  "!": ["  #  ", "  #  ", "  #  ", "     ", "  #  "],
  "?": [" ### ", "#   #", "  ## ", "     ", "  #  "],
};

function render(text: string, style: "block" | "shadow" | "outline"): string {
  const up = text.toUpperCase();
  const chars = Array.from(up).map((c) => FONT[c] || FONT[" "]);
  const rows: string[] = [];
  for (let row = 0; row < 5; row++) {
    const line = chars.map((g) => g[row]).join(" ");
    if (style === "block") rows.push(line.replace(/#/g, "█").replace(/ /g, " "));
    else if (style === "shadow") rows.push(line.replace(/#/g, "▓").replace(/ /g, "░"));
    else rows.push(line);
  }
  return rows.join("\n");
}

export function AsciiArtGenerator() {
  const [text, setText] = useState("HELLO");
  const [style, setStyle] = useState<"block" | "shadow" | "outline">("block");
  const [copied, setCopied] = useState(false);
  const out = useMemo(() => render(text, style), [text, style]);

  function copy() {
    navigator.clipboard?.writeText(out);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Text</span>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
      </label>

      <div className="flex gap-2">
        {(["block", "shadow", "outline"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStyle(s)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium border ${style === s ? "bg-brand text-white border-brand" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"}`}
          >
            {s}
          </button>
        ))}
        <button onClick={copy} className="ml-auto rounded-lg bg-slate-900 text-white px-3 py-1.5 text-sm font-medium hover:bg-slate-800">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <pre className="rounded-xl bg-slate-50 p-4 font-mono text-xs leading-tight whitespace-pre overflow-x-auto">
        {out}
      </pre>
    </div>
  );
}
