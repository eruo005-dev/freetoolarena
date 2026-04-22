"use client";

import { useMemo, useState } from "react";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type JustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type Child = { grow: number; shrink: number; basis: string };

const DIRECTIONS: FlexDirection[] = ["row", "row-reverse", "column", "column-reverse"];
const JUSTIFY: JustifyContent[] = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];
const ALIGN: AlignItems[] = ["stretch", "flex-start", "center", "flex-end", "baseline"];
const WRAP: FlexWrap[] = ["nowrap", "wrap", "wrap-reverse"];

export function FlexboxPlayground() {
  const [direction, setDirection] = useState<FlexDirection>("row");
  const [justify, setJustify] = useState<JustifyContent>("flex-start");
  const [align, setAlign] = useState<AlignItems>("stretch");
  const [wrap, setWrap] = useState<FlexWrap>("nowrap");
  const [gap, setGap] = useState(12);
  const [children, setChildren] = useState<Child[]>([
    { grow: 0, shrink: 1, basis: "auto" },
    { grow: 0, shrink: 1, basis: "auto" },
    { grow: 0, shrink: 1, basis: "auto" },
  ]);
  const [copied, setCopied] = useState(false);

  const css = useMemo(() => buildCss(direction, justify, align, wrap, gap, children), [
    direction,
    justify,
    align,
    wrap,
    gap,
    children,
  ]);

  function addChild() {
    if (children.length >= 8) return;
    setChildren([...children, { grow: 0, shrink: 1, basis: "auto" }]);
  }

  function removeChild(idx: number) {
    if (children.length <= 1) return;
    setChildren(children.filter((_, i) => i !== idx));
  }

  function updateChild(idx: number, patch: Partial<Child>) {
    setChildren(children.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-5">
      <div
        className="rounded-xl border border-slate-200 bg-slate-50 p-8 min-h-[200px]"
        style={{
          display: "flex",
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          flexWrap: wrap,
          gap: `${gap}px`,
          minHeight: 240,
        }}
      >
        {children.map((c, i) => (
          <div
            key={i}
            className="rounded-lg bg-brand/10 border border-brand text-brand-dark text-sm font-semibold flex items-center justify-center h-16"
            style={{
              flexGrow: c.grow,
              flexShrink: c.shrink,
              flexBasis: c.basis,
              minWidth: 48,
              padding: "0 16px",
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            flex-direction
          </span>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as FlexDirection)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {DIRECTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            justify-content
          </span>
          <select
            value={justify}
            onChange={(e) => setJustify(e.target.value as JustifyContent)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {JUSTIFY.map((j) => (
              <option key={j} value={j}>
                {j}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            align-items
          </span>
          <select
            value={align}
            onChange={(e) => setAlign(e.target.value as AlignItems)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {ALIGN.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
            flex-wrap
          </span>
          <select
            value={wrap}
            onChange={(e) => setWrap(e.target.value as FlexWrap)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          >
            {WRAP.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">
          gap · {gap}px
        </span>
        <input
          type="range"
          min={0}
          max={64}
          value={gap}
          onChange={(e) => setGap(Number(e.target.value))}
          className="w-full accent-brand"
        />
      </label>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Children ({children.length}/8)
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={addChild}
              disabled={children.length >= 8}
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              + Add
            </button>
          </div>
        </div>
        {children.map((c, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2 items-center">
            <span className="col-span-1 text-xs font-semibold text-slate-500">#{idx + 1}</span>
            <label className="col-span-3 block">
              <span className="text-[10px] uppercase tracking-wide font-semibold text-slate-500 block">
                grow
              </span>
              <input
                type="number"
                min={0}
                value={c.grow}
                onChange={(e) => updateChild(idx, { grow: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <label className="col-span-3 block">
              <span className="text-[10px] uppercase tracking-wide font-semibold text-slate-500 block">
                shrink
              </span>
              <input
                type="number"
                min={0}
                value={c.shrink}
                onChange={(e) => updateChild(idx, { shrink: Number(e.target.value) })}
                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
            </label>
            <label className="col-span-3 block">
              <span className="text-[10px] uppercase tracking-wide font-semibold text-slate-500 block">
                basis
              </span>
              <input
                type="text"
                value={c.basis}
                onChange={(e) => updateChild(idx, { basis: e.target.value })}
                className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 font-mono"
              />
            </label>
            <button
              type="button"
              onClick={() => removeChild(idx)}
              disabled={children.length <= 1}
              className="col-span-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">CSS</p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="rounded-lg bg-slate-900 text-slate-100 p-4 text-sm overflow-x-auto font-mono">{css}</pre>
      </div>
    </div>
  );
}

function buildCss(
  direction: FlexDirection,
  justify: JustifyContent,
  align: AlignItems,
  wrap: FlexWrap,
  gap: number,
  children: Child[],
): string {
  const container = `.container {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;
  const items = children
    .map(
      (c, i) => `.container > :nth-child(${i + 1}) {
  flex: ${c.grow} ${c.shrink} ${c.basis};
}`,
    )
    .join("\n");
  return `${container}\n${items}`;
}
