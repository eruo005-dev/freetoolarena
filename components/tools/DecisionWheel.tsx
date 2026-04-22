"use client";

import { useState } from "react";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#f43f5e", "#3b82f6", "#8b5cf6", "#ec4899", "#64748b"];

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

export function DecisionWheel() {
  const [options, setOptions] = useState<string[]>(["Pizza", "Sushi", "Tacos", "Salad", "Burger", "Pasta"]);
  const [draft, setDraft] = useState("");
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const addOption = () => {
    const t = draft.trim();
    if (!t) return;
    setOptions((o) => [...o, t]);
    setDraft("");
  };
  const removeOption = (i: number) => setOptions((o) => o.filter((_, idx) => idx !== i));

  const reset = () => {
    setOptions([]);
    setRotation(0);
    setWinner(null);
  };

  const spin = () => {
    if (options.length === 0 || spinning) return;
    const idx = Math.floor(Math.random() * options.length);
    const sliceAngle = 360 / options.length;
    const targetMid = idx * sliceAngle + sliceAngle / 2;
    const spins = 5;
    const finalRotation = rotation + spins * 360 + (360 - targetMid);
    setRotation(finalRotation);
    setSpinning(true);
    setWinner(null);
    setTimeout(() => {
      setSpinning(false);
      setWinner(options[idx]);
    }, 3100);
  };

  const cx = 150, cy = 150, r = 140;
  const sliceAngle = options.length > 0 ? 360 / options.length : 0;

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <input value={draft} onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addOption()} placeholder="Add option"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        <button type="button" onClick={addOption}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark">Add</button>
      </div>

      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <span key={i} className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700">
            {o}
            <button type="button" onClick={() => removeOption(i)} className="text-rose-600 hover:underline">x</button>
          </span>
        ))}
      </div>

      <div className="flex justify-center">
        <div className="relative">
          <svg viewBox="0 0 300 300" className="w-72 h-72">
            <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "150px 150px" }}
               className="transition-transform duration-[3000ms] ease-out">
              {options.length === 1 ? (
                <circle cx={cx} cy={cy} r={r} fill={COLORS[0]} />
              ) : (
                options.map((o, i) => {
                  const start = i * sliceAngle;
                  const end = (i + 1) * sliceAngle;
                  const mid = (start + end) / 2;
                  const labelPos = polarToCartesian(cx, cy, r * 0.65, mid);
                  return (
                    <g key={i}>
                      <path d={arcPath(cx, cy, r, start, end)} fill={COLORS[i % COLORS.length]} />
                      <text x={labelPos.x} y={labelPos.y} textAnchor="middle" dominantBaseline="middle"
                        fill="white" fontSize="12" fontWeight="bold"
                        transform={`rotate(${mid} ${labelPos.x} ${labelPos.y})`}>
                        {o.length > 10 ? o.slice(0, 10) + "…" : o}
                      </text>
                    </g>
                  );
                })
              )}
            </g>
            <polygon points="150,5 140,25 160,25" fill="#1e293b" />
            <circle cx={cx} cy={cy} r="10" fill="#1e293b" />
          </svg>
        </div>
      </div>

      <div className="flex gap-2">
        <button type="button" onClick={spin} disabled={spinning || options.length === 0}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark disabled:opacity-50">
          {spinning ? "Spinning…" : "Spin"}
        </button>
        <button type="button" onClick={reset}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Reset</button>
      </div>

      {winner && (
        <div className="text-center">
          <div className="text-xs uppercase text-slate-500 mb-1">Winner</div>
          <div className="text-3xl text-brand font-bold">{winner}</div>
        </div>
      )}
    </div>
  );
}
