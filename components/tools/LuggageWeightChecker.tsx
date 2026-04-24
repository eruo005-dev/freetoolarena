"use client";

import { useMemo, useState } from "react";

type AirlineKey =
  | "american"
  | "delta"
  | "united"
  | "southwest"
  | "jetblue"
  | "alaska"
  | "spirit"
  | "frontier"
  | "hawaiian"
  | "aircanada"
  | "britishairways"
  | "virgin"
  | "lufthansa"
  | "airfrance"
  | "klm"
  | "iberia"
  | "swiss"
  | "turkish"
  | "emirates"
  | "etihad"
  | "qatar"
  | "singapore"
  | "cathay"
  | "ana"
  | "jal"
  | "korean"
  | "qantas"
  | "ryanair"
  | "easyjet"
  | "wizzair";

type ClassKey = "economy" | "premium" | "business" | "first";
type TripKey = "domestic" | "shortHaul" | "longHaul";

type AirlineRule = {
  name: string;
  region: string;
  lowCost: boolean;
  carryOnKg: number;
  carryOnLbs: number;
  carryOnSize: string;
  checkedKgEcon: number;
  checkedLbsEcon: number;
  checkedSize: string;
  firstBagFee: string;
  excessFee: string;
  notes: string;
};

const AIRLINES: Record<AirlineKey, AirlineRule> = {
  american: {
    name: "American Airlines",
    region: "US",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "22 x 14 x 9 in (56 x 36 x 23 cm)",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in (158 cm)",
    firstBagFee: "$35 domestic (free in business/first)",
    excessFee: "$100-$200 overweight 51-70 lbs",
    notes: "Personal item always free. 2 free checked in business.",
  },
  delta: {
    name: "Delta Air Lines",
    region: "US",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "22 x 14 x 9 in (56 x 36 x 23 cm)",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in (158 cm)",
    firstBagFee: "$35 domestic (free with SkyMiles Amex)",
    excessFee: "$100 overweight 51-70 lbs, $200 71-100 lbs",
    notes: "No weight limit listed for carry-on on most routes.",
  },
  united: {
    name: "United Airlines",
    region: "US",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "22 x 14 x 9 in (56 x 35 x 22 cm)",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in (158 cm)",
    firstBagFee: "$35 domestic (Basic Economy: carry-on not included)",
    excessFee: "$100-$200 overweight",
    notes: "Basic Economy allows only personal item.",
  },
  southwest: {
    name: "Southwest Airlines",
    region: "US",
    lowCost: false,
    carryOnKg: 0,
    carryOnLbs: 0,
    carryOnSize: "24 x 16 x 10 in (no weight limit stated)",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in (158 cm)",
    firstBagFee: "FREE (2 bags)",
    excessFee: "$75-$125 for 51-100 lbs",
    notes: "Famous for 2 free checked bags for everyone.",
  },
  jetblue: {
    name: "JetBlue",
    region: "US",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "22 x 14 x 9 in",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in",
    firstBagFee: "$35 (Blue Basic: no carry-on)",
    excessFee: "$150 overweight 51-99 lbs",
    notes: "Blue Basic fares do not include a carry-on.",
  },
  alaska: {
    name: "Alaska Airlines",
    region: "US",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "22 x 14 x 9 in",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in",
    firstBagFee: "$35 first bag",
    excessFee: "$100 overweight, 20-min bag guarantee",
    notes: "Bag guarantee: free $25 discount if not out in 20 min.",
  },
  spirit: {
    name: "Spirit Airlines",
    region: "US",
    lowCost: true,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "22 x 18 x 10 in",
    checkedKgEcon: 18,
    checkedLbsEcon: 40,
    checkedSize: "62 linear in",
    firstBagFee: "Carry-on $35-$65, checked $35-$75",
    excessFee: "$49 overweight 41-50 lbs, $100 51-70 lbs",
    notes: "Personal item only is free. Pay for EVERYTHING else.",
  },
  frontier: {
    name: "Frontier Airlines",
    region: "US",
    lowCost: true,
    carryOnKg: 16,
    carryOnLbs: 35,
    carryOnSize: "24 x 16 x 10 in",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in",
    firstBagFee: "Carry-on $35-$60, checked $40-$60",
    excessFee: "$50 overweight 51-100 lbs",
    notes: "Ultra-low-cost; bundle fares are usually cheaper.",
  },
  hawaiian: {
    name: "Hawaiian Airlines",
    region: "US",
    lowCost: false,
    carryOnKg: 11.5,
    carryOnLbs: 25,
    carryOnSize: "22 x 14 x 9 in",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in",
    firstBagFee: "$25 interisland, $30 North America",
    excessFee: "$100 overweight 51-70 lbs",
    notes: "Carry-on weight limit of 25 lbs is unusual in the US.",
  },
  aircanada: {
    name: "Air Canada",
    region: "Canada",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "21.5 x 15.5 x 9 in (55 x 40 x 23 cm)",
    checkedKgEcon: 23,
    checkedLbsEcon: 50,
    checkedSize: "62 linear in",
    firstBagFee: "CA$35 first bag in economy",
    excessFee: "CA$100 overweight 51-70 lbs",
    notes: "Business class: 2 bags 32kg each.",
  },
  britishairways: {
    name: "British Airways",
    region: "UK/Europe",
    lowCost: false,
    carryOnKg: 23,
    carryOnLbs: 51,
    carryOnSize: "56 x 45 x 25 cm + personal 40 x 30 x 15",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "90 x 75 x 43 cm",
    firstBagFee: "Free in standard economy (Basic: no checked)",
    excessFee: "GBP 65 per extra bag, GBP 65 overweight",
    notes: "Generous 23kg carry-on (including handle/wheels).",
  },
  virgin: {
    name: "Virgin Atlantic",
    region: "UK",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "56 x 36 x 23 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "90 x 75 x 43 cm",
    firstBagFee: "Free 1 x 23kg in Economy Classic",
    excessFee: "GBP 65 extra bag, GBP 65 overweight",
    notes: "Upper Class: 3 bags of 32kg.",
  },
  lufthansa: {
    name: "Lufthansa",
    region: "Germany/Europe",
    lowCost: false,
    carryOnKg: 8,
    carryOnLbs: 18,
    carryOnSize: "55 x 40 x 23 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 1 x 23kg in economy (Light fare: none)",
    excessFee: "EUR 100 overweight 24-32kg",
    notes: "Light fares on short-haul do not include a checked bag.",
  },
  airfrance: {
    name: "Air France",
    region: "France/Europe",
    lowCost: false,
    carryOnKg: 12,
    carryOnLbs: 26,
    carryOnSize: "55 x 35 x 25 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 1 x 23kg (Light: none)",
    excessFee: "EUR 100 overweight 24-32kg",
    notes: "Mini fares on intra-Europe: carry-on only.",
  },
  klm: {
    name: "KLM",
    region: "Netherlands/Europe",
    lowCost: false,
    carryOnKg: 12,
    carryOnLbs: 26,
    carryOnSize: "55 x 35 x 25 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 1 x 23kg on most routes",
    excessFee: "EUR 75-150 overweight",
    notes: "Same rules as Air France.",
  },
  iberia: {
    name: "Iberia",
    region: "Spain/Europe",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "56 x 40 x 25 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free in Classic/Plus fares",
    excessFee: "EUR 60-150 overweight",
    notes: "Basic fares on short-haul: carry-on only.",
  },
  swiss: {
    name: "Swiss Intl Air Lines",
    region: "Switzerland/Europe",
    lowCost: false,
    carryOnKg: 8,
    carryOnLbs: 18,
    carryOnSize: "55 x 40 x 23 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free in Classic (Light fare: none)",
    excessFee: "CHF 100 overweight",
    notes: "Strict 8kg carry-on weight enforced on short-haul.",
  },
  turkish: {
    name: "Turkish Airlines",
    region: "Turkey/Intl",
    lowCost: false,
    carryOnKg: 8,
    carryOnLbs: 18,
    carryOnSize: "55 x 40 x 23 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 1 x 23kg most routes (2 x 23kg US/Canada)",
    excessFee: "Varies by route, ~EUR 50/kg",
    notes: "One of the most generous in economy.",
  },
  emirates: {
    name: "Emirates",
    region: "UAE/Intl",
    lowCost: false,
    carryOnKg: 7,
    carryOnLbs: 15,
    carryOnSize: "55 x 38 x 20 cm",
    checkedKgEcon: 30,
    checkedLbsEcon: 66,
    checkedSize: "300 cm linear",
    firstBagFee: "Free 30kg in Economy Flex/Special",
    excessFee: "$35-$70 per kg",
    notes: "Weight-based allowance on most routes; 30kg is generous.",
  },
  etihad: {
    name: "Etihad Airways",
    region: "UAE/Intl",
    lowCost: false,
    carryOnKg: 7,
    carryOnLbs: 15,
    carryOnSize: "56 x 36 x 23 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "208 cm linear",
    firstBagFee: "Free 23kg-30kg depending on fare",
    excessFee: "~$40 per kg",
    notes: "Business: 40kg. First: 50kg.",
  },
  qatar: {
    name: "Qatar Airways",
    region: "Qatar/Intl",
    lowCost: false,
    carryOnKg: 7,
    carryOnLbs: 15,
    carryOnSize: "50 x 37 x 25 cm",
    checkedKgEcon: 30,
    checkedLbsEcon: 66,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 30kg in economy",
    excessFee: "~$30-$60 per kg",
    notes: "Business: 40kg. First: 50kg. Skytrax top-rated.",
  },
  singapore: {
    name: "Singapore Airlines",
    region: "Singapore/Intl",
    lowCost: false,
    carryOnKg: 7,
    carryOnLbs: 15,
    carryOnSize: "115 cm linear total",
    checkedKgEcon: 30,
    checkedLbsEcon: 66,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 25-30kg in economy",
    excessFee: "~$30-$70 per kg",
    notes: "Lite fares in economy: 25kg. Standard: 30kg.",
  },
  cathay: {
    name: "Cathay Pacific",
    region: "Hong Kong/Intl",
    lowCost: false,
    carryOnKg: 7,
    carryOnLbs: 15,
    carryOnSize: "56 x 36 x 23 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "203 cm linear",
    firstBagFee: "Free 20-30kg depending on fare",
    excessFee: "HK$240 per kg",
    notes: "Light fares: 20kg. Standard: 30kg.",
  },
  ana: {
    name: "ANA",
    region: "Japan/Intl",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "55 x 40 x 25 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 2 x 23kg to/from North America",
    excessFee: "$200 per extra bag",
    notes: "Domestic Japan: 20kg free checked.",
  },
  jal: {
    name: "Japan Airlines",
    region: "Japan/Intl",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "55 x 40 x 25 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "203 cm linear",
    firstBagFee: "Free 2 x 23kg to/from North America",
    excessFee: "$200 per extra bag",
    notes: "Similar structure to ANA.",
  },
  korean: {
    name: "Korean Air",
    region: "Korea/Intl",
    lowCost: false,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "55 x 40 x 20 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "158 cm linear",
    firstBagFee: "Free 1 x 23kg (2 x 23kg to Americas)",
    excessFee: "$100-$200 per kg over",
    notes: "Prestige: 2 x 32kg. First: 3 x 32kg.",
  },
  qantas: {
    name: "Qantas",
    region: "Australia/Intl",
    lowCost: false,
    carryOnKg: 7,
    carryOnLbs: 15,
    carryOnSize: "56 x 36 x 23 cm",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "140 cm linear",
    firstBagFee: "Free 1 x 23kg international",
    excessFee: "AU$50-$165 per extra bag",
    notes: "Domestic: 23kg. Business: 2 x 32kg.",
  },
  ryanair: {
    name: "Ryanair",
    region: "Europe (low-cost)",
    lowCost: true,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "Small bag 40 x 20 x 25 cm free; 10kg bag extra",
    checkedKgEcon: 20,
    checkedLbsEcon: 44,
    checkedSize: "81 x 119 x 119 cm max",
    firstBagFee: "Priority+10kg bag EUR 12-25; checked 20kg EUR 25-45",
    excessFee: "EUR 11 per kg overweight",
    notes: "Strictest budget airline in Europe. Weigh bag before airport!",
  },
  easyjet: {
    name: "easyJet",
    region: "Europe (low-cost)",
    lowCost: true,
    carryOnKg: 15,
    carryOnLbs: 33,
    carryOnSize: "Small 45 x 36 x 20 cm free; larger needs Up Front/Plus",
    checkedKgEcon: 23,
    checkedLbsEcon: 51,
    checkedSize: "275 cm linear",
    firstBagFee: "Large cabin bag EUR 8-45; checked EUR 7-40",
    excessFee: "EUR 12 per kg overweight",
    notes: "Free small underseat bag for everyone.",
  },
  wizzair: {
    name: "Wizz Air",
    region: "Europe (low-cost)",
    lowCost: true,
    carryOnKg: 10,
    carryOnLbs: 22,
    carryOnSize: "40 x 30 x 20 cm free; 55 x 40 x 23 cm needs Priority",
    checkedKgEcon: 20,
    checkedLbsEcon: 44,
    checkedSize: "149 cm linear",
    firstBagFee: "Priority+trolley EUR 10-35; checked EUR 20-85",
    excessFee: "EUR 12 per kg overweight",
    notes: "Wizz Discount Club members get slight discounts.",
  },
};

const CLASS_LABEL: Record<ClassKey, string> = {
  economy: "Economy",
  premium: "Premium Economy",
  business: "Business",
  first: "First",
};

const TRIP_LABEL: Record<TripKey, string> = {
  domestic: "Domestic",
  shortHaul: "International short-haul",
  longHaul: "International long-haul",
};

function classMultiplier(klass: ClassKey): { carryOn: number; checkedCount: number; checkedKg: number } {
  if (klass === "economy") return { carryOn: 1, checkedCount: 1, checkedKg: 23 };
  if (klass === "premium") return { carryOn: 1, checkedCount: 2, checkedKg: 23 };
  if (klass === "business") return { carryOn: 2, checkedCount: 2, checkedKg: 32 };
  return { carryOn: 2, checkedCount: 3, checkedKg: 32 };
}

function tripAdj(trip: TripKey): string {
  if (trip === "domestic") return "Domestic rules apply &mdash; fees typically charged for 1st checked bag.";
  if (trip === "shortHaul") return "Short-haul international &mdash; often 1 free checked bag in economy, strict on low-cost carriers.";
  return "Long-haul international &mdash; typically 1 free checked bag in economy, 2 in business/first.";
}

export function LuggageWeightChecker() {
  const [airline, setAirline] = useState<AirlineKey>("american");
  const [klass, setKlass] = useState<ClassKey>("economy");
  const [trip, setTrip] = useState<TripKey>("domestic");

  const rule = AIRLINES[airline];
  const mult = classMultiplier(klass);

  const summary = useMemo(() => {
    const carryOnKg = rule.carryOnKg || 0;
    const checkedKg = Math.max(rule.checkedKgEcon, mult.checkedKg);
    const target = Math.max(0, checkedKg - 2);
    const ok = Number.isFinite(target) && target > 0;
    return { carryOnKg, checkedKg, target, ok };
  }, [rule, mult]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Airline</span>
          <select
            value={airline}
            onChange={(e) => setAirline(e.target.value as AirlineKey)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {(Object.keys(AIRLINES) as AirlineKey[]).map((k) => (
              <option key={k} value={k}>
                {AIRLINES[k].name} &mdash; {AIRLINES[k].region}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Flight class</span>
          <select
            value={klass}
            onChange={(e) => setKlass(e.target.value as ClassKey)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {(Object.keys(CLASS_LABEL) as ClassKey[]).map((k) => (
              <option key={k} value={k}>
                {CLASS_LABEL[k]}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Trip type</span>
          <select
            value={trip}
            onChange={(e) => setTrip(e.target.value as TripKey)}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
          >
            {(Object.keys(TRIP_LABEL) as TripKey[]).map((k) => (
              <option key={k} value={k}>
                {TRIP_LABEL[k]}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Carry-on</div>
          <div className="mt-2 text-2xl font-semibold text-brand">
            {summary.carryOnKg ? `${summary.carryOnKg} kg / ${rule.carryOnLbs} lbs` : "No weight limit stated"}
          </div>
          <div className="mt-1 text-sm text-slate-600">{rule.carryOnSize}</div>
          {klass !== "economy" && (
            <div className="mt-2 text-xs text-slate-500">{CLASS_LABEL[klass]} typically allows {mult.carryOn} carry-on pieces.</div>
          )}
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Checked bag</div>
          <div className="mt-2 text-2xl font-semibold text-brand">
            {summary.checkedKg} kg / {Math.round(summary.checkedKg * 2.205)} lbs
          </div>
          <div className="mt-1 text-sm text-slate-600">{rule.checkedSize}</div>
          <div className="mt-2 text-xs text-slate-500">
            {CLASS_LABEL[klass]}: typically {mult.checkedCount} checked {mult.checkedCount === 1 ? "bag" : "bags"} included.
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Pack within this</div>
        {summary.ok ? (
          <div className="mt-1 text-lg font-semibold text-emerald-900">
            Target ~{summary.target} kg / {Math.round(summary.target * 2.205)} lbs
          </div>
        ) : (
          <div className="mt-1 text-sm text-emerald-900">Weigh your bag at home &mdash; airport scales often read 0.5-1 kg higher.</div>
        )}
        <div className="mt-1 text-xs text-emerald-800">Leave ~2 kg of headroom for souvenirs and scale variance.</div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="text-sm font-semibold text-slate-800">Fees &amp; notes</div>
        <ul className="mt-2 space-y-1 text-sm text-slate-700">
          <li><span className="font-medium">First checked bag:</span> {rule.firstBagFee}</li>
          <li><span className="font-medium">Overweight/excess:</span> {rule.excessFee}</li>
          <li><span className="font-medium">Notes:</span> {rule.notes}</li>
          <li
            className="text-xs text-slate-500"
            dangerouslySetInnerHTML={{ __html: tripAdj(trip) }}
          />
        </ul>
      </div>

      <p className="text-xs text-slate-500">
        Airline policies change often and route/fare-specific exceptions apply. Always confirm on the airline&rsquo;s
        official site before flying, especially for low-cost carriers.
      </p>
    </div>
  );
}
