"use client";

import { useState } from "react";

const WORDS = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
  "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry",
  "strawberry", "tangerine", "watermelon", "blueberry", "blackberry", "coconut",
  "cucumber", "pumpkin", "tomato", "carrot", "potato", "onion", "garlic", "pepper",
  "river", "mountain", "ocean", "forest", "desert", "valley", "canyon", "island",
  "beach", "meadow", "prairie", "glacier", "volcano", "tundra", "jungle", "swamp",
  "happy", "sad", "angry", "calm", "excited", "bored", "curious", "brave",
  "gentle", "kind", "clever", "wise", "silly", "lucky", "proud", "quiet",
  "run", "jump", "swim", "fly", "walk", "climb", "dance", "sing",
  "read", "write", "draw", "paint", "cook", "bake", "build", "create",
  "house", "castle", "bridge", "tower", "palace", "cottage", "cabin", "barn",
  "school", "library", "museum", "garden", "market", "harbor", "station", "airport",
  "dog", "cat", "horse", "rabbit", "squirrel", "dolphin", "whale", "eagle",
  "tiger", "elephant", "giraffe", "penguin", "octopus", "butterfly", "turtle", "sparrow",
  "red", "blue", "green", "yellow", "purple", "orange", "pink", "black",
  "white", "brown", "silver", "golden", "crimson", "azure", "emerald", "scarlet",
  "bright", "dark", "loud", "soft", "sharp", "smooth", "rough", "warm",
  "cold", "hot", "cool", "crisp", "fresh", "sweet", "sour", "bitter",
  "paper", "pencil", "candle", "mirror", "window", "door", "table", "chair",
  "lamp", "clock", "bottle", "basket", "ladder", "bucket", "shovel", "hammer",
  "music", "rhythm", "melody", "harmony", "silence", "whisper", "shout", "laugh",
  "dream", "hope", "fear", "love", "peace", "joy", "wonder", "magic",
  "journey", "adventure", "story", "legend", "myth", "secret", "mystery", "puzzle",
  "cloud", "star", "planet", "comet", "galaxy", "meteor", "eclipse", "aurora",
  "summer", "winter", "autumn", "spring", "morning", "evening", "midnight", "sunrise",
  "river", "stream", "pond", "lake", "waterfall", "fountain", "geyser", "rapids",
];

export function RandomWordGenerator() {
  const [count, setCount] = useState(10);
  const [minLen, setMinLen] = useState(1);
  const [maxLen, setMaxLen] = useState(20);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState("");

  const generate = () => {
    setError("");
    const pool = WORDS.filter((w) => w.length >= minLen && w.length <= maxLen);
    if (pool.length === 0) {
      setError("No words match the length filter.");
      setResult([]);
      return;
    }
    const n = Math.max(1, Math.min(50, Math.floor(count)));
    const out: string[] = [];
    if (n <= pool.length) {
      const copy = [...pool];
      for (let i = 0; i < n; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        out.push(copy[idx]);
        copy.splice(idx, 1);
      }
    } else {
      for (let i = 0; i < n; i++) {
        out.push(pool[Math.floor(Math.random() * pool.length)]);
      }
    }
    setResult(out);
  };

  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
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
          <span className="text-sm font-semibold text-slate-700 mb-1 block">Min length</span>
          <input
            type="number"
            min={1}
            max={30}
            value={minLen}
            onChange={(e) => setMinLen(Number(e.target.value) || 1)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700 mb-1 block">Max length</span>
          <input
            type="number"
            min={1}
            max={30}
            value={maxLen}
            onChange={(e) => setMaxLen(Number(e.target.value) || 20)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={generate}
        className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark"
      >
        Generate
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {result.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {result.map((w, i) => (
              <span
                key={i}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm font-mono"
              >
                {w}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(result.join(", "))}
            className="rounded-lg bg-brand text-white px-4 py-2 font-semibold hover:bg-brand-dark text-sm"
          >
            Copy
          </button>
        </div>
      )}
    </div>
  );
}
