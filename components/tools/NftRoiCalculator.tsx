"use client";

import { useMemo, useState } from "react";

const currency = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export function NftRoiCalculator() {
  const [buyEth, setBuyEth] = useState("1.5");
  const [sellEth, setSellEth] = useState("2.0");
  const [ethUsd, setEthUsd] = useState("3000");
  const [buyGas, setBuyGas] = useState("0.01");
  const [sellGas, setSellGas] = useState("0.01");
  const [platformFee, setPlatformFee] = useState("2.5");
  const [royalty, setRoyalty] = useState("5");

  const result = useMemo(() => {
    const buy = Number(buyEth);
    const sell = Number(sellEth);
    const rate = Number(ethUsd);
    const gasBuy = Number(buyGas);
    const gasSell = Number(sellGas);
    const pf = Number(platformFee) / 100;
    const roy = Number(royalty) / 100;

    if (
      !Number.isFinite(buy) ||
      !Number.isFinite(sell) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(gasBuy) ||
      !Number.isFinite(gasSell) ||
      !Number.isFinite(pf) ||
      !Number.isFinite(roy) ||
      buy < 0 ||
      sell < 0 ||
      rate <= 0 ||
      pf < 0 ||
      roy < 0
    ) {
      return null;
    }

    const totalCostEth = buy + gasBuy;
    const feeFactor = 1 - pf - roy;
    const netProceedsEth = sell * feeFactor - gasSell;
    const profitEth = netProceedsEth - totalCostEth;
    const profitUsd = profitEth * rate;
    const roi = totalCostEth > 0 ? (profitEth / totalCostEth) * 100 : 0;

    // breakeven: solve sell * feeFactor - gasSell - totalCost = 0
    const breakeven = feeFactor > 0 ? (totalCostEth + gasSell) / feeFactor : Infinity;

    return {
      totalCostEth,
      netProceedsEth,
      profitEth,
      profitUsd,
      roi,
      breakeven,
      totalCostUsd: totalCostEth * rate,
      netProceedsUsd: netProceedsEth * rate,
    };
  }, [buyEth, sellEth, ethUsd, buyGas, sellGas, platformFee, royalty]);

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Buy price (ETH)</span>
          <input
            type="number"
            value={buyEth}
            min={0}
            step="any"
            onChange={(e) => setBuyEth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Sell price (ETH)</span>
          <input
            type="number"
            value={sellEth}
            min={0}
            step="any"
            onChange={(e) => setSellEth(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">ETH to USD rate</span>
          <input
            type="number"
            value={ethUsd}
            min={0}
            step="any"
            onChange={(e) => setEthUsd(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Gas on buy (ETH)</span>
          <input
            type="number"
            value={buyGas}
            min={0}
            step="any"
            onChange={(e) => setBuyGas(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Gas on sell (ETH)</span>
          <input
            type="number"
            value={sellGas}
            min={0}
            step="any"
            onChange={(e) => setSellGas(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700">Platform fee % (OpenSea ~2.5)</span>
          <input
            type="number"
            value={platformFee}
            min={0}
            step="any"
            onChange={(e) => setPlatformFee(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block font-medium text-slate-700">Creator royalty % (often 5)</span>
          <input
            type="number"
            value={royalty}
            min={0}
            step="any"
            onChange={(e) => setRoyalty(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-mono"
          />
        </label>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Profit / loss</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.profitEth.toFixed(4)} ETH
              </div>
              <div className="mt-1 text-xs text-slate-500">{currency(result.profitUsd)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">ROI</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.roi.toFixed(1)}%
              </div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Total cost</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.totalCostEth.toFixed(4)} ETH
              </div>
              <div className="mt-1 text-xs text-slate-500">{currency(result.totalCostUsd)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">Net proceeds</div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {result.netProceedsEth.toFixed(4)} ETH
              </div>
              <div className="mt-1 text-xs text-slate-500">{currency(result.netProceedsUsd)}</div>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 sm:col-span-2">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Breakeven sell price
              </div>
              <div className="text-2xl font-semibold tabular-nums text-brand">
                {Number.isFinite(result.breakeven) ? result.breakeven.toFixed(4) : "-"} ETH
              </div>
              <div className="mt-1 text-xs text-slate-500">
                Minimum listing needed to recover buy price, gas, platform fee and royalty.
              </div>
            </div>
          </div>

          <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
            Reality check: the NFT market is deeply illiquid. Most tokens sell for near 0, many never
            sell at all, and floor prices can collapse overnight. Treat any projection as best-case.
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">Enter valid numeric values to compute ROI.</p>
      )}
    </div>
  );
}
