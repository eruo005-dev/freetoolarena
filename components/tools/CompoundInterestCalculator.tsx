"use client";

import { useEffect, useMemo, useState } from "react";
import { ExportData } from "@/components/ExportData";

function formatMoney(n: number): string {
  if (!Number.isFinite(n)) return "$0";
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export interface CompoundInterestCalculatorProps {
  initialPrincipal?: number;
  initialContribution?: number;
  initialRate?: number;
  initialYears?: number;
}

interface YearPoint {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

/**
 * Simulate year-by-year growth with monthly compounding and monthly
 * contributions. Returns a series with one point per year-end, plus
 * a zeroth point representing the starting state so charts line up.
 */
function simulate(
  start: number,
  monthly: number,
  annualRate: number,
  years: number,
): YearPoint[] {
  const r = annualRate / 100 / 12;
  const series: YearPoint[] = [
    { year: 0, balance: start, contributions: start, interest: 0 },
  ];
  let balance = start;
  let contributed = start;
  for (let y = 1; y <= Math.max(0, Math.floor(years)); y++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + r) + monthly;
      contributed += monthly;
    }
    series.push({
      year: y,
      balance,
      contributions: contributed,
      interest: Math.max(0, balance - contributed),
    });
  }
  return series;
}

function downloadCsv(filename: string, rows: YearPoint[]) {
  const header = ["Year", "Balance", "Contributions", "Interest earned"].join(
    ",",
  );
  const body = rows
    .map((r) =>
      [
        r.year,
        r.balance.toFixed(2),
        r.contributions.toFixed(2),
        r.interest.toFixed(2),
      ].join(","),
    )
    .join("\n");
  const csv = `${header}\n${body}\n`;
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function CompoundInterestCalculator({
  initialPrincipal = 1000,
  initialContribution = 250,
  initialRate = 7,
  initialYears = 20,
}: CompoundInterestCalculatorProps = {}) {
  const [start, setStart] = useState(initialPrincipal);
  const [monthly, setMonthly] = useState(initialContribution);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);

  // Sync to URL for the share button.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const u = new URL(window.location.href);
    u.searchParams.set("principal", String(start));
    u.searchParams.set("monthly", String(monthly));
    u.searchParams.set("rate", String(rate));
    u.searchParams.set("years", String(years));
    if (u.toString() !== window.location.href) {
      window.history.replaceState(null, "", u.toString());
    }
  }, [start, monthly, rate, years]);

  const series = useMemo(
    () => simulate(start, monthly, rate, years),
    [start, monthly, rate, years],
  );
  const last = series[series.length - 1] ?? {
    year: 0,
    balance: start,
    contributions: start,
    interest: 0,
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Starting balance ($)
          </span>
          <input
            type="number"
            value={start}
            min={0}
            step={100}
            onChange={(e) => setStart(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Monthly deposit ($)
          </span>
          <input
            type="number"
            value={monthly}
            min={0}
            step={25}
            onChange={(e) => setMonthly(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Annual return (%)
          </span>
          <input
            type="number"
            value={rate}
            min={0}
            max={30}
            step={0.1}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">
            Years
          </span>
          <input
            type="number"
            value={years}
            min={1}
            max={60}
            step={1}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
      </div>

      <div className="rounded-lg bg-brand-dark text-white p-5">
        <p className="text-xs uppercase tracking-wide text-white/70">
          Final balance
        </p>
        <p className="text-3xl font-bold">{formatMoney(last.balance)}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            You contributed
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {formatMoney(last.contributions)}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Interest earned
          </p>
          <p className="text-lg font-semibold text-brand-dark">
            {formatMoney(last.interest)}
          </p>
        </div>
      </div>

      <GrowthChart series={series} />

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() =>
            downloadCsv(
              `compound-interest-${start}-${rate}pct-${years}y.csv`,
              series,
            )
          }
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:border-brand hover:text-brand"
        >
          Export year-by-year CSV
        </button>
        <span className="text-xs text-slate-500">
          {series.length} rows — one per year plus the starting balance
        </span>
      </div>
    </div>
  );
}

/**
 * Inline SVG stacked bar chart — one stack per year, green is money you
 * contributed and amber-brand is compound interest earned. No chart
 * library needed: this is the only chart on the page and keeps the
 * bundle under ~2KB gzipped.
 */
function GrowthChart({ series }: { series: YearPoint[] }) {
  const rows = series.length <= 1 ? series : series.slice(1); // skip year 0
  if (rows.length === 0) return null;
  const max = Math.max(...rows.map((r) => r.balance), 1);
  const W = 640;
  const H = 220;
  const padL = 44;
  const padR = 12;
  const padT = 10;
  const padB = 28;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const gap = 2;
  const barW = Math.max(2, plotW / rows.length - gap);

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    y: padT + plotH * (1 - t),
    label: formatMoney(max * t),
  }));

  // Label every year for short spans, every 5 for longer ones.
  const labelEvery = rows.length <= 12 ? 1 : rows.length <= 30 ? 5 : 10;

  return (
    <figure className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <figcaption className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">
        <span className="font-semibold uppercase tracking-wide">
          Year-by-year growth
        </span>
        <span className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-sm bg-emerald-500"
            />
            <span>Contributions</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span
              aria-hidden
              className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-500"
            />
            <span>Interest</span>
          </span>
        </span>
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block w-full"
        role="img"
        aria-label="Year-by-year growth chart"
      >
        {yTicks.map((t, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={W - padR}
              y1={t.y}
              y2={t.y}
              stroke="#e2e8f0"
              strokeDasharray={i === 0 ? "0" : "2 3"}
            />
            <text
              x={padL - 6}
              y={t.y + 3}
              textAnchor="end"
              fontSize="10"
              fill="#64748b"
            >
              {t.label}
            </text>
          </g>
        ))}
        {rows.map((r, i) => {
          const x = padL + i * (barW + gap);
          const totalH = plotH * (r.balance / max);
          const contribH = plotH * (r.contributions / max);
          const interestH = Math.max(0, totalH - contribH);
          const yInterest = padT + plotH - totalH;
          const yContrib = yInterest + interestH;
          return (
            <g key={r.year}>
              <rect
                x={x}
                y={yInterest}
                width={barW}
                height={interestH}
                fill="#f59e0b"
              >
                <title>
                  Year {r.year}: {formatMoney(r.interest)} interest
                </title>
              </rect>
              <rect
                x={x}
                y={yContrib}
                width={barW}
                height={contribH}
                fill="#10b981"
              >
                <title>
                  Year {r.year}: {formatMoney(r.contributions)} contributed
                </title>
              </rect>
              {r.year % labelEvery === 0 && (
                <text
                  x={x + barW / 2}
                  y={H - 10}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#64748b"
                >
                  {r.year}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
