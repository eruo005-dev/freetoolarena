"use client";

import { useMemo, useState } from "react";

type DrinkerType = "light" | "moderate" | "heavy";

const MULT: Record<DrinkerType, { label: string; factor: number }> = {
  light: { label: "Light (0.75x)", factor: 0.75 },
  moderate: { label: "Moderate (1.0x)", factor: 1.0 },
  heavy: { label: "Heavy (1.5x)", factor: 1.5 },
};

function usd(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export interface BarQuantityCalculatorProps {
  initialGuests?: number;
  initialHours?: number;
  initialType?: DrinkerType;
  initialBeer?: number;
  initialWine?: number;
  initialCocktail?: number;
}

export function BarQuantityCalculator({
  initialGuests = 50,
  initialHours = 4,
  initialType = "moderate",
  initialBeer = 40,
  initialWine = 30,
  initialCocktail = 30,
}: BarQuantityCalculatorProps = {}) {
  const [guests, setGuests] = useState(String(initialGuests));
  const [hours, setHours] = useState(String(initialHours));
  const [type, setType] = useState<DrinkerType>(initialType);
  const [beerPct, setBeerPct] = useState(initialBeer);
  const [winePct, setWinePct] = useState(initialWine);
  const [cocktailPct, setCocktailPct] = useState(initialCocktail);

  const adjustPct = (which: "beer" | "wine" | "cocktail", val: number) => {
    const v = Math.max(0, Math.min(100, val));
    if (which === "beer") {
      const remaining = 100 - v;
      const wPrev = winePct;
      const cPrev = cocktailPct;
      const sum = wPrev + cPrev;
      if (sum === 0) {
        setWinePct(Math.round(remaining / 2));
        setCocktailPct(remaining - Math.round(remaining / 2));
      } else {
        const nw = Math.round(remaining * (wPrev / sum));
        setWinePct(nw);
        setCocktailPct(remaining - nw);
      }
      setBeerPct(v);
    } else if (which === "wine") {
      const remaining = 100 - v;
      const bPrev = beerPct;
      const cPrev = cocktailPct;
      const sum = bPrev + cPrev;
      if (sum === 0) {
        setBeerPct(Math.round(remaining / 2));
        setCocktailPct(remaining - Math.round(remaining / 2));
      } else {
        const nb = Math.round(remaining * (bPrev / sum));
        setBeerPct(nb);
        setCocktailPct(remaining - nb);
      }
      setWinePct(v);
    } else {
      const remaining = 100 - v;
      const bPrev = beerPct;
      const wPrev = winePct;
      const sum = bPrev + wPrev;
      if (sum === 0) {
        setBeerPct(Math.round(remaining / 2));
        setWinePct(remaining - Math.round(remaining / 2));
      } else {
        const nb = Math.round(remaining * (bPrev / sum));
        setBeerPct(nb);
        setWinePct(remaining - nb);
      }
      setCocktailPct(v);
    }
  };

  const result = useMemo(() => {
    const g = Math.max(0, parseFloat(guests) || 0);
    const h = Math.max(0, parseFloat(hours) || 0);
    const gNum = Number.isFinite(g) ? g : 0;
    const hNum = Number.isFinite(h) ? h : 0;
    const factor = MULT[type].factor;

    const totalDrinks = Math.ceil(gNum * hNum * factor);
    const beerDrinks = Math.ceil(totalDrinks * (beerPct / 100));
    const wineDrinks = Math.ceil(totalDrinks * (winePct / 100));
    const cocktailDrinks = Math.ceil(totalDrinks * (cocktailPct / 100));

    const beerCans = beerDrinks;
    const beerCases = Math.ceil(beerCans / 24);

    const wineBottles = Math.ceil(wineDrinks / 5);

    const spiritsOz = cocktailDrinks * 1.5;
    const spirits750 = Math.ceil(cocktailDrinks / 17);
    const spirits1L = Math.ceil(cocktailDrinks / 22);

    // mixer estimates — roughly 1 mixer per cocktail, 1L per 10 cocktails typical
    const mixerLiters = Math.ceil(cocktailDrinks / 10);
    const tonicLiters = Math.ceil(mixerLiters * 0.4);
    const sodaLiters = Math.ceil(mixerLiters * 0.4);
    const juiceLiters = Math.ceil(mixerLiters * 0.3);

    return {
      totalDrinks,
      beerDrinks,
      wineDrinks,
      cocktailDrinks,
      beerCans,
      beerCases,
      wineBottles,
      spiritsOz,
      spirits750,
      spirits1L,
      tonicLiters,
      sodaLiters,
      juiceLiters,
    };
  }, [guests, hours, type, beerPct, winePct, cocktailPct]);

  const totalPct = beerPct + winePct + cocktailPct;

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Guest count</span>
          <input
            type="number"
            min={0}
            step={1}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Event hours</span>
          <input
            type="number"
            min={0}
            step={0.5}
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Drinker type</span>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as DrinkerType)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand bg-white"
          >
            {Object.entries(MULT).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 space-y-4">
        <h3 className="font-semibold text-slate-900">Drink preferences (must sum to 100%)</h3>
        <Slider label="Beer" value={beerPct} onChange={(v) => adjustPct("beer", v)} />
        <Slider label="Wine" value={winePct} onChange={(v) => adjustPct("wine", v)} />
        <Slider label="Cocktails" value={cocktailPct} onChange={(v) => adjustPct("cocktail", v)} />
        <p className={`text-xs ${totalPct === 100 ? "text-emerald-600" : "text-rose-600"}`}>
          Total: {totalPct}%
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 p-5 grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide font-semibold mb-1 text-slate-500">Total drinks needed</p>
          <p className="text-3xl font-bold text-brand">{result.totalDrinks}</p>
          <p className="text-xs text-slate-500 mt-1">1 drink per guest per hour &times; {MULT[type].factor}x</p>
        </div>
        <div className="text-sm text-slate-700 space-y-1">
          <div className="flex justify-between"><span>Beer drinks</span><span className="font-medium">{result.beerDrinks}</span></div>
          <div className="flex justify-between"><span>Wine drinks</span><span className="font-medium">{result.wineDrinks}</span></div>
          <div className="flex justify-between"><span>Cocktails</span><span className="font-medium">{result.cocktailDrinks}</span></div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Beer" highlight={`${result.beerCases} cases`}>
          <Row label="Cans (12 oz)">{result.beerCans}</Row>
          <Row label="Cases (24-pack)">{result.beerCases}</Row>
          <Row label="Cost @ $25/case">{usd(result.beerCases * 25)}</Row>
        </Card>
        <Card title="Wine" highlight={`${result.wineBottles} bottles`}>
          <Row label="5 oz pours">{result.wineDrinks}</Row>
          <Row label="Bottles (750ml)">{result.wineBottles}</Row>
          <Row label="Cost @ $15/bottle">{usd(result.wineBottles * 15)}</Row>
        </Card>
        <Card title="Liquor" highlight={`${result.spirits750} (750ml)`}>
          <Row label="1.5 oz pours">{result.cocktailDrinks}</Row>
          <Row label="Total oz">{result.spiritsOz.toFixed(1)}</Row>
          <Row label="750ml bottles">{result.spirits750}</Row>
          <Row label="1L bottles (alt)">{result.spirits1L}</Row>
          <Row label="Cost @ $25/bottle">{usd(result.spirits750 * 25)}</Row>
        </Card>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 bg-white">
        <h3 className="font-semibold text-slate-900 mb-2">Mixer estimates</h3>
        <div className="grid sm:grid-cols-3 gap-3 text-sm text-slate-700">
          <div className="flex justify-between"><span>Tonic water</span><span className="font-medium">{result.tonicLiters} L</span></div>
          <div className="flex justify-between"><span>Club soda</span><span className="font-medium">{result.sodaLiters} L</span></div>
          <div className="flex justify-between"><span>Juices</span><span className="font-medium">{result.juiceLiters} L</span></div>
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Rough rule: 1 L of mixer per 10 cocktails. Add ice &mdash; about 1 lb per guest.
        </p>
      </div>
    </div>
  );
}

function Slider({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-slate-700 mb-1">
        <span className="font-medium">{label}</span>
        <span>{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-full accent-brand"
      />
    </div>
  );
}

function Card({ title, highlight, children }: { title: string; highlight: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4 space-y-2">
      <div className="flex items-baseline justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="text-sm font-bold text-brand">{highlight}</span>
      </div>
      <div className="text-sm text-slate-700 space-y-1">{children}</div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-medium">{children}</span>
    </div>
  );
}
