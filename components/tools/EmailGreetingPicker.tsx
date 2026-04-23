"use client";
import { useMemo, useState } from "react";

type Relationship = "colleague" | "manager" | "stranger" | "client" | "friend";
type TimeOfDay = "morning" | "afternoon" | "evening";

export function EmailGreetingPicker() {
  const [rel, setRel] = useState<Relationship>("colleague");
  const [tod, setTod] = useState<TimeOfDay>("morning");
  const [formality, setFormality] = useState(50);

  const result = useMemo(() => pick(rel, tod, formality), [rel, tod, formality]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Recipient</span>
          <select value={rel} onChange={(e) => setRel(e.target.value as Relationship)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="colleague">Colleague</option>
            <option value="manager">Manager</option>
            <option value="stranger">Stranger / cold</option>
            <option value="client">Client</option>
            <option value="friend">Friend</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Time of day</span>
          <select value={tod} onChange={(e) => setTod(e.target.value as TimeOfDay)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white">
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 block">Formality ({formality})</span>
          <input type="range" min={0} max={100} value={formality} onChange={(e) => setFormality(Number(e.target.value))}
            className="w-full" />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Greetings</div>
          <ul className="text-sm mt-1 space-y-1">
            {result.greetings.map((g, i) => <li key={i}>&ldquo;{g}&rdquo;</li>)}
          </ul>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <div className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Sign-offs</div>
          <ul className="text-sm mt-1 space-y-1">
            {result.signoffs.map((s, i) => <li key={i}>&ldquo;{s}&rdquo;</li>)}
          </ul>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Tip: match the recipient&rsquo;s formality in their last email to you &mdash; when in doubt, go one notch more formal.
      </div>
    </div>
  );
}

type Picked = { greetings: string[]; signoffs: string[] };

function pick(rel: Relationship, tod: TimeOfDay, formality: number): Picked {
  const timePhrase = tod === "morning" ? "Good morning" : tod === "afternoon" ? "Good afternoon" : "Good evening";

  const banks: Record<Relationship, { low: string[]; mid: string[]; high: string[]; offLow: string[]; offMid: string[]; offHigh: string[] }> = {
    colleague: {
      low: ["Hey Alex", "Yo", `${timePhrase}!`],
      mid: ["Hi Alex", `${timePhrase}, Alex`, "Hey there"],
      high: ["Hello Alex", `${timePhrase}, Alex`, "Dear Alex"],
      offLow: ["Cheers", "Thanks!", "Later"],
      offMid: ["Thanks", "Best", "Appreciate it"],
      offHigh: ["Kind regards", "Best regards", "With thanks"],
    },
    manager: {
      low: ["Hi Alex", `${timePhrase}`, "Hey Alex"],
      mid: [`${timePhrase}, Alex`, "Hi Alex", "Hello Alex"],
      high: ["Dear Alex", `${timePhrase}, Alex`, "Hello Alex"],
      offLow: ["Thanks", "Best", "Cheers"],
      offMid: ["Best regards", "Thanks again", "With thanks"],
      offHigh: ["Kind regards", "Respectfully", "Sincerely"],
    },
    stranger: {
      low: ["Hi there", "Hello", `${timePhrase}`],
      mid: ["Hi Alex", `${timePhrase}, Alex`, "Hello Alex"],
      high: ["Dear Alex", "Dear Ms. Smith", "To whom it may concern"],
      offLow: ["Thanks", "Best", "Appreciate your time"],
      offMid: ["Best regards", "Kind regards", "Sincerely"],
      offHigh: ["Sincerely", "Yours sincerely", "Respectfully"],
    },
    client: {
      low: ["Hi Alex", `${timePhrase}`, "Hey Alex"],
      mid: [`${timePhrase}, Alex`, "Hello Alex", "Hi Alex"],
      high: ["Dear Alex", `${timePhrase}, Alex`, "Hello Alex"],
      offLow: ["Thanks", "Cheers", "Best"],
      offMid: ["Best regards", "Thanks for your time", "With thanks"],
      offHigh: ["Kind regards", "Sincerely", "Respectfully"],
    },
    friend: {
      low: ["Hey!", "Yo Alex", `${timePhrase}!`],
      mid: ["Hi Alex", "Hey Alex", `${timePhrase}, Alex`],
      high: ["Hello Alex", `${timePhrase}, Alex`, "Hi Alex"],
      offLow: ["xo", "Later!", "Cheers"],
      offMid: ["Talk soon", "Take care", "Cheers"],
      offHigh: ["Warmly", "All the best", "Take care"],
    },
  };

  const bank = banks[rel];
  const tier: "low" | "mid" | "high" = formality < 34 ? "low" : formality < 67 ? "mid" : "high";
  const greetings = bank[tier];
  const signoffs = bank[tier === "low" ? "offLow" : tier === "mid" ? "offMid" : "offHigh"];
  return { greetings, signoffs };
}
