"use client";

import { useState } from "react";

const FIRST_M = ["James", "Noah", "Liam", "Oliver", "Elijah", "Lucas", "Mason", "Logan", "Ethan", "Aiden", "Alexander", "Daniel", "Matthew", "Henry", "Jackson", "Sebastian", "Jack", "Owen", "Leo", "Theodore"];
const FIRST_F = ["Olivia", "Emma", "Charlotte", "Amelia", "Ava", "Sophia", "Isabella", "Mia", "Evelyn", "Harper", "Luna", "Camila", "Gianna", "Elizabeth", "Eleanor", "Ella", "Abigail", "Sofia", "Avery", "Scarlett"];
const LAST = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function RandomNameGenerator() {
  const [gender, setGender] = useState<"any" | "male" | "female">("any");
  const [count, setCount] = useState(5);
  const [names, setNames] = useState<string[]>([]);

  const gen = () => {
    const n: string[] = [];
    for (let i = 0; i < count; i++) {
      const g = gender === "any" ? (Math.random() < 0.5 ? "male" : "female") : gender;
      const first = g === "male" ? pick(FIRST_M) : pick(FIRST_F);
      n.push(`${first} ${pick(LAST)}`);
    }
    setNames(n);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Gender</span>
          <select value={gender} onChange={(e) => setGender(e.target.value as "any" | "male" | "female")}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand">
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-slate-700 mb-1">Count</span>
          <input type="number" min={1} max={100} value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
        </label>
      </div>
      <button type="button" onClick={gen}
        className="rounded-lg bg-brand-dark text-white px-4 py-2 text-sm font-semibold hover:bg-brand">
        Generate
      </button>
      {names.length > 0 && (
        <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-slate-50">
          {names.map((n, i) => <li key={i} className="px-3 py-2 text-sm">{n}</li>)}
        </ul>
      )}
    </div>
  );
}
