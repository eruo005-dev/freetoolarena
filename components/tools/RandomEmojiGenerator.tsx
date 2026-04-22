"use client";

import { useState } from "react";

const EMOJIS = {
  Faces: [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🥳",
  ],
  Animals: [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯",
    "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦆",
    "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋",
  ],
  Food: [
    "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒",
    "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬",
    "🥒", "🌶", "🌽", "🥕", "🧄", "🧅", "🥔", "🍠", "🥐", "🍞",
  ],
  Objects: [
    "⌚", "📱", "💻", "⌨", "🖥", "🖨", "🖱", "🖲", "🕹", "🗜",
    "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽",
    "🎞", "📞", "☎", "📟", "📠", "📺", "📻", "🎙", "🎚", "🎛",
  ],
};

function allEmojis(): string[] {
  return [
    ...EMOJIS.Faces,
    ...EMOJIS.Animals,
    ...EMOJIS.Food,
    ...EMOJIS.Objects,
  ];
}

export function RandomEmojiGenerator() {
  const [count, setCount] = useState(10);
  const [category, setCategory] = useState<"All" | "Faces" | "Animals" | "Food" | "Objects">("All");
  const [result, setResult] = useState<string[]>([]);

  const generate = () => {
    const pool = category === "All" ? allEmojis() : EMOJIS[category];
    const n = Math.max(1, Math.min(50, Math.floor(count)));
    const out: string[] = [];
    for (let i = 0; i < n; i++) {
      out.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    setResult(out);
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 mb-1 block">Count (1-50)</span>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 mb-1 block">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="All">All</option>
            <option value="Faces">Faces</option>
            <option value="Animals">Animals</option>
            <option value="Food">Food</option>
            <option value="Objects">Objects</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={generate}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Generate
      </button>

      {result.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex flex-wrap gap-2 text-3xl">
            {result.map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(result.join(""))}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark text-sm"
          >
            Copy all
          </button>
        </div>
      )}
    </div>
  );
}
