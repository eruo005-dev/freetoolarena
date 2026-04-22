"use client";

import { useEffect, useMemo, useState } from "react";

type Climate = "hot" | "mild" | "cold" | "tropical";
type Trip = "leisure" | "business" | "adventure" | "beach";
type Season = "spring" | "summer" | "fall" | "winter";

interface Item {
  id: number;
  category: string;
  text: string;
  checked: boolean;
}

const CATEGORIES = ["Clothing", "Toiletries", "Tech", "Documents", "Miscellaneous"] as const;

function buildList(days: number, climate: Climate, trip: Trip, season: Season): Item[] {
  const n = Math.max(1, Math.round(days));
  const list: { category: string; text: string }[] = [];

  // Clothing — scales with duration
  const underwearCount = Math.min(n + 1, 10);
  const socksCount = Math.min(n + 1, 10);
  const shirtsCount = Math.min(Math.ceil(n * 0.8) + 1, 8);
  list.push({ category: "Clothing", text: `Underwear ×${underwearCount}` });
  list.push({ category: "Clothing", text: `Socks ×${socksCount}` });
  list.push({ category: "Clothing", text: `T-shirts / tops ×${shirtsCount}` });
  list.push({ category: "Clothing", text: `Pants / trousers ×${Math.min(Math.ceil(n / 3) + 1, 4)}` });
  list.push({ category: "Clothing", text: "Pajamas / sleepwear" });

  if (climate === "hot" || climate === "tropical") {
    list.push({ category: "Clothing", text: "Shorts ×2" });
    list.push({ category: "Clothing", text: "Sun hat" });
    list.push({ category: "Clothing", text: "Sunglasses" });
    list.push({ category: "Clothing", text: "Light jacket for AC" });
  }
  if (climate === "cold") {
    list.push({ category: "Clothing", text: "Heavy coat" });
    list.push({ category: "Clothing", text: "Thermal layers" });
    list.push({ category: "Clothing", text: "Gloves, hat, scarf" });
    list.push({ category: "Clothing", text: "Warm boots" });
  }
  if (climate === "mild") {
    list.push({ category: "Clothing", text: "Light jacket or sweater" });
    list.push({ category: "Clothing", text: "Umbrella" });
  }

  if (trip === "business") {
    list.push({ category: "Clothing", text: "Business outfits ×" + Math.min(n, 5) });
    list.push({ category: "Clothing", text: "Dress shoes" });
    list.push({ category: "Clothing", text: "Belt" });
  }
  if (trip === "beach" || climate === "tropical") {
    list.push({ category: "Clothing", text: "Swimsuit ×2" });
    list.push({ category: "Clothing", text: "Flip-flops / sandals" });
    list.push({ category: "Clothing", text: "Beach cover-up" });
  }
  if (trip === "adventure") {
    list.push({ category: "Clothing", text: "Hiking boots" });
    list.push({ category: "Clothing", text: "Quick-dry pants" });
    list.push({ category: "Clothing", text: "Moisture-wicking base layers" });
  }

  // Toiletries
  list.push({ category: "Toiletries", text: "Toothbrush + toothpaste" });
  list.push({ category: "Toiletries", text: "Deodorant" });
  list.push({ category: "Toiletries", text: "Shampoo + conditioner" });
  list.push({ category: "Toiletries", text: "Body wash / soap" });
  list.push({ category: "Toiletries", text: "Razor" });
  list.push({ category: "Toiletries", text: "Skincare / moisturizer" });
  list.push({ category: "Toiletries", text: "Medications" });
  if (climate === "hot" || climate === "tropical" || trip === "beach" || season === "summer") {
    list.push({ category: "Toiletries", text: "Sunscreen SPF 30+" });
    list.push({ category: "Toiletries", text: "Insect repellent" });
    list.push({ category: "Toiletries", text: "After-sun lotion" });
  }
  if (climate === "cold" || season === "winter") {
    list.push({ category: "Toiletries", text: "Lip balm" });
    list.push({ category: "Toiletries", text: "Hand cream" });
  }

  // Tech
  list.push({ category: "Tech", text: "Phone + charger" });
  list.push({ category: "Tech", text: "Power bank" });
  list.push({ category: "Tech", text: "Travel adapter" });
  list.push({ category: "Tech", text: "Headphones" });
  if (trip === "business") {
    list.push({ category: "Tech", text: "Laptop + charger" });
    list.push({ category: "Tech", text: "Presentation adapter (HDMI/USB-C)" });
  }
  if (trip === "adventure") {
    list.push({ category: "Tech", text: "GPS / offline maps" });
    list.push({ category: "Tech", text: "Action camera (optional)" });
  }

  // Documents
  list.push({ category: "Documents", text: "Passport / ID" });
  list.push({ category: "Documents", text: "Boarding pass / tickets" });
  list.push({ category: "Documents", text: "Hotel confirmations" });
  list.push({ category: "Documents", text: "Travel insurance info" });
  list.push({ category: "Documents", text: "Credit cards + some cash" });
  list.push({ category: "Documents", text: "Emergency contacts list" });
  if (trip === "business") list.push({ category: "Documents", text: "Business cards" });

  // Miscellaneous
  list.push({ category: "Miscellaneous", text: "Reusable water bottle" });
  list.push({ category: "Miscellaneous", text: "Snacks" });
  list.push({ category: "Miscellaneous", text: "Book / Kindle" });
  list.push({ category: "Miscellaneous", text: "Laundry bag" });
  list.push({ category: "Miscellaneous", text: "Small first-aid kit" });
  if (n >= 5) list.push({ category: "Miscellaneous", text: "Travel-size laundry detergent" });
  if (trip === "beach") list.push({ category: "Miscellaneous", text: "Beach towel" });
  if (trip === "adventure") {
    list.push({ category: "Miscellaneous", text: "Daypack / backpack" });
    list.push({ category: "Miscellaneous", text: "Reusable cutlery" });
  }

  return list.map((x, i) => ({ id: i + 1, category: x.category, text: x.text, checked: false }));
}

export function PackingListGenerator() {
  const [days, setDays] = useState("5");
  const [climate, setClimate] = useState<Climate>("mild");
  const [trip, setTrip] = useState<Trip>("leisure");
  const [season, setSeason] = useState<Season>("summer");

  const generated = useMemo(
    () => buildList(parseFloat(days) || 1, climate, trip, season),
    [days, climate, trip, season],
  );

  const [items, setItems] = useState<Item[]>(generated);
  const [draft, setDraft] = useState("");
  const [draftCat, setDraftCat] = useState<string>("Miscellaneous");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setItems(generated);
  }, [generated]);

  const toggle = (id: number) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const add = () => {
    const t = draft.trim();
    if (!t) return;
    setItems((prev) => [...prev, { id: Date.now(), category: draftCat, text: t, checked: false }]);
    setDraft("");
  };

  const copy = async () => {
    const text = CATEGORIES.flatMap((c) => {
      const chunk = items.filter((i) => i.category === c);
      if (chunk.length === 0) return [];
      return [`## ${c}`, ...chunk.map((i) => `- [ ] ${i.text}`), ""];
    }).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Duration (days)</span>
          <input
            type="number"
            inputMode="decimal"
            min={1}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Climate</span>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as Climate)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="hot">Hot / Desert</option>
            <option value="mild">Mild / Temperate</option>
            <option value="cold">Cold</option>
            <option value="tropical">Tropical / Humid</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Trip type</span>
          <select
            value={trip}
            onChange={(e) => setTrip(e.target.value as Trip)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="leisure">Leisure</option>
            <option value="business">Business</option>
            <option value="adventure">Adventure</option>
            <option value="beach">Beach</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Season</span>
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value as Season)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
          >
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="fall">Fall</option>
            <option value="winter">Winter</option>
          </select>
        </label>
      </div>

      <div className="flex gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add custom item…"
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        />
        <select
          value={draftCat}
          onChange={(e) => setDraftCat(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={add}
          className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
        >
          Add
        </button>
      </div>

      <div className="rounded-xl bg-slate-50 p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-slate-500">
            Your list ({items.length} items)
          </p>
          <button
            type="button"
            onClick={copy}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="space-y-4">
          {CATEGORIES.map((c) => {
            const chunk = items.filter((i) => i.category === c);
            if (chunk.length === 0) return null;
            return (
              <div key={c}>
                <p className="text-sm font-semibold text-slate-800 mb-2">{c}</p>
                <ul className="space-y-1">
                  {chunk.map((i) => (
                    <li key={i.id} className="flex items-start gap-2">
                      <label className="flex items-start gap-2 flex-1">
                        <input
                          type="checkbox"
                          checked={i.checked}
                          onChange={() => toggle(i.id)}
                          className="mt-0.5 accent-brand"
                        />
                        <span
                          className={`text-sm ${
                            i.checked ? "line-through text-slate-400" : "text-slate-800"
                          }`}
                        >
                          {i.text}
                        </span>
                      </label>
                      <button
                        type="button"
                        onClick={() => remove(i.id)}
                        className="text-xs text-slate-400 hover:text-rose-600"
                      >
                        remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
