"use client";

import { useMemo, useState } from "react";

type AssetClass = "index" | "stock" | "crypto";

const INDEX_TICKERS = new Set([
  "VTI", "VOO", "VT", "VXUS", "VEA", "VWO", "BND", "BNDX", "AGG",
  "SPY", "IVV", "QQQ", "SCHB", "SCHX", "SCHD", "SCHF", "SCHG",
  "ITOT", "IXUS", "IEFA", "IEMG", "IJR", "IJH", "VB", "VO", "VTV", "VUG",
  "VIG", "VYM", "VNQ", "VGT", "FXAIX", "FSKAX", "FTIHX", "FZROX", "FZILX",
  "SWTSX", "VTSAX", "VFIAX", "VTIAX",
]);

const CRYPTO_TICKERS = new Set([
  "BTC", "ETH", "SOL", "ADA", "XRP", "DOGE", "DOT", "AVAX", "MATIC",
  "LINK", "UNI", "LTC", "BCH", "ATOM", "NEAR", "APT", "ARB", "OP",
  "SHIB", "USDC", "USDT", "DAI", "BNB", "TRX", "TON",
]);

function classify(ticker: string): AssetClass {
  const t = ticker.toUpperCase().trim();
  if (CRYPTO_TICKERS.has(t)) return "crypto";
  if (INDEX_TICKERS.has(t)) return "index";
  return "stock";
}

const currency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

type Position = { ticker: string; amount: number; cls: AssetClass };

export function StockPortfolioDiversification() {
  const [input, setInput] = useState(
    "AAPL 10000\nMSFT 5000\nVTI 30000\nVXUS 8000\nBTC 2000",
  );

  const result = useMemo(() => {
    const lines = input.split("\n").map((l) => l.trim()).filter(Boolean);
    const positions: Position[] = [];
    for (const line of lines) {
      const parts = line.split(/\s+/);
      if (parts.length < 2) continue;
      const ticker = parts[0];
      const raw = parts[1].replace(/[$,]/g, "");
      const amount = Number(raw);
      if (!Number.isFinite(amount) || amount <= 0) continue;
      positions.push({ ticker: ticker.toUpperCase(), amount, cls: classify(ticker) });
    }

    const total = positions.reduce((s, p) => s + p.amount, 0);
    if (total <= 0) return null;

    const byClass: Record<AssetClass, number> = { index: 0, stock: 0, crypto: 0 };
    positions.forEach((p) => (byClass[p.cls] += p.amount));

    const allocations = positions
      .map((p) => ({ ...p, pct: (p.amount / total) * 100 }))
      .sort((a, b) => b.pct - a.pct);

    const classPct = {
      index: (byClass.index / total) * 100,
      stock: (byClass.stock / total) * 100,
      crypto: (byClass.crypto / total) * 100,
    };

    const warnings: string[] = [];
    const over10 = allocations.filter((a) => a.pct > 10);
    over10.forEach((a) =>
      warnings.push(
        `${a.ticker} is ${a.pct.toFixed(1)}% of the portfolio &mdash; concentration risk.`,
      ),
    );
    if (classPct.stock > 50) {
      warnings.push(
        `Individual stocks are ${classPct.stock.toFixed(1)}% of the portfolio &mdash; undiversified.`,
      );
    }
    if (classPct.crypto > 5) {
      warnings.push(
        `Crypto is ${classPct.crypto.toFixed(1)}% of the portfolio &mdash; high volatility exposure.`,
      );
    }

    return { allocations, classPct, total, warnings };
  }, [input]);

  return (
    <div className="space-y-5">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-slate-700">
          Paste positions, one per line &mdash; format: TICKER $amount
        </span>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={7}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
        />
        <span className="mt-1 block text-xs text-slate-500">
          Example: AAPL 10000 &middot; VTI 30000 &middot; BTC 2000
        </span>
      </label>

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Total value</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {currency(result.total)}
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Index funds</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.classPct.index.toFixed(1)}%
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Stocks / Crypto
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.classPct.stock.toFixed(0)}% / {result.classPct.crypto.toFixed(0)}%
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="mb-2 text-sm font-medium text-slate-800">Allocation</div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="py-1 pr-3">Ticker</th>
                    <th className="py-1 pr-3">Class</th>
                    <th className="py-1 pr-3 text-right">Amount</th>
                    <th className="py-1 text-right">%</th>
                  </tr>
                </thead>
                <tbody>
                  {result.allocations.map((p) => (
                    <tr key={p.ticker} className="border-t border-slate-200">
                      <td className="py-1 pr-3 font-mono">{p.ticker}</td>
                      <td className="py-1 pr-3 capitalize text-slate-600">
                        {p.cls === "index" ? "Index fund" : p.cls}
                      </td>
                      <td className="py-1 pr-3 text-right tabular-nums">{currency(p.amount)}</td>
                      <td
                        className={`py-1 text-right tabular-nums ${
                          p.pct > 10 ? "font-semibold text-brand" : ""
                        }`}
                      >
                        {p.pct.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {result.warnings.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              <div className="mb-1 font-medium">Concentration warnings</div>
              <ul className="list-inside list-disc space-y-1">
                {result.warnings.map((w, i) => (
                  <li key={i} dangerouslySetInnerHTML={{ __html: w }} />
                ))}
              </ul>
            </div>
          )}

          <p className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
            Target for most investors: 80%+ in low-cost index funds, a small satellite in individual
            stocks, and crypto &le; 5% if held at all. Rebalance once a year so winners don&rsquo;t
            silently drift into concentration risk.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">
          Add at least one &ldquo;TICKER amount&rdquo; line to see the breakdown.
        </p>
      )}
    </div>
  );
}
