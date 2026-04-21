"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Reference rates (relative to USD), used only if the live API fails or
 * the browser is offline. Refreshed in code during editorial passes —
 * good enough for offline sanity-check, never trust them for a transaction.
 */
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.93,
  GBP: 0.79,
  JPY: 153,
  CAD: 1.36,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.4,
  MXN: 17.1,
  BRL: 5.08,
  TRY: 32.5,
  KRW: 1340,
  SGD: 1.35,
  NZD: 1.65,
};

const CURRENCIES = Object.keys(FALLBACK_RATES);

type Status = "loading" | "live" | "fallback";

interface RateState {
  rates: Record<string, number>;
  date: string | null;
  status: Status;
}

/**
 * Fetches mid-market rates from Frankfurter (ECB data, CORS-enabled, no key,
 * no rate limit). Returns USD-based rates for every currency we display.
 */
async function fetchLiveRates(): Promise<RateState | null> {
  try {
    const symbols = CURRENCIES.filter((c) => c !== "USD").join(",");
    const res = await fetch(
      `https://api.frankfurter.app/latest?from=USD&to=${symbols}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      date: string;
      rates: Record<string, number>;
    };
    return {
      rates: { USD: 1, ...json.rates },
      date: json.date,
      status: "live",
    };
  } catch {
    return null;
  }
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [rateOverride, setRateOverride] = useState("");
  const [rateState, setRateState] = useState<RateState>({
    rates: FALLBACK_RATES,
    date: null,
    status: "loading",
  });

  useEffect(() => {
    let alive = true;
    fetchLiveRates().then((live) => {
      if (!alive) return;
      if (live) {
        setRateState(live);
      } else {
        setRateState({ rates: FALLBACK_RATES, date: null, status: "fallback" });
      }
    });
    return () => {
      alive = false;
    };
  }, []);

  const { rates, status, date } = rateState;

  const result = useMemo(() => {
    const baseRate = rates[to] / rates[from];
    const rate = rateOverride ? Number(rateOverride) : baseRate;
    return { value: amount * rate, rate };
  }, [amount, from, to, rateOverride, rates]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setRateOverride("");
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto_1fr] sm:items-end">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            Amount
          </span>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            From
          </span>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={swap}
          aria-label="Swap currencies"
          className="hidden h-10 w-10 shrink-0 items-center justify-center self-end rounded-lg border border-slate-300 bg-white text-slate-500 transition hover:border-brand hover:text-brand sm:flex"
        >
          ⇄
        </button>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">
            To
          </span>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-slate-700">
          Override rate (optional)
        </span>
        <input
          type="number"
          step="0.0001"
          value={rateOverride}
          onChange={(e) => setRateOverride(e.target.value)}
          placeholder={`default: ${(rates[to] / rates[from]).toFixed(4)}`}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand"
        />
      </label>

      <div className="rounded-lg bg-brand-dark p-5 text-white">
        <p className="text-xs uppercase tracking-wide text-white/70">
          Converted
        </p>
        <p className="text-3xl font-bold">
          {result.value.toLocaleString("en-US", { maximumFractionDigits: 2 })}{" "}
          <span className="text-base font-normal text-white/80">{to}</span>
        </p>
        <p className="mt-1 text-xs text-white/80">
          Rate: 1 {from} = {result.rate.toFixed(4)} {to}
        </p>
      </div>

      <RateStatus status={status} date={date} />
    </div>
  );
}

function RateStatus({ status, date }: { status: Status; date: string | null }) {
  if (status === "loading") {
    return (
      <p className="text-xs text-slate-500">Loading live rates…</p>
    );
  }
  if (status === "live" && date) {
    return (
      <p className="text-xs text-slate-500">
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 align-middle" />
        Live mid-market rates from the European Central Bank via{" "}
        <a
          href="https://www.frankfurter.app/"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-dotted underline-offset-2 hover:text-slate-700"
        >
          Frankfurter
        </a>{" "}
        · updated {date}. Not suitable for settling real transactions.
      </p>
    );
  }
  return (
    <p className="text-xs text-amber-700">
      Couldn&rsquo;t reach the live rate service — showing reference rates.
      Override the rate above for a real transaction.
    </p>
  );
}
