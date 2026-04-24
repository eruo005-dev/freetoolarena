"use client";

import { useState } from "react";

type Style = "Cool" | "Funny" | "Edgy" | "Gamer" | "Fantasy";
type Length = "Short" | "Medium" | "Long";

const WORDS: Record<Style, { adj: string[]; noun: string[] }> = {
  Cool: {
    adj: [
      "Frost", "Neon", "Swift", "Sleek", "Chrome", "Azure", "Crystal", "Vortex",
      "Blaze", "Storm", "Onyx", "Glacial", "Electric", "Cosmic", "Stellar",
      "Solar", "Lunar", "Nova", "Prism", "Shadow", "Arctic", "Crimson", "Ivory",
      "Mystic", "Radiant", "Velvet", "Thunder", "Silent", "Rapid", "Obsidian",
      "Polar", "Zenith", "Phantom", "Luminous",
    ],
    noun: [
      "Wave", "Pulse", "Rider", "Storm", "Ghost", "Falcon", "Comet", "Blade",
      "Wolf", "Tiger", "Panther", "Hawk", "Jet", "Bolt", "Fury", "Reign",
      "Flow", "Edge", "Star", "Drift", "Surge", "Reign", "Spark", "Raven",
      "Streak", "Pilot", "Knight", "Arrow", "Crown", "Runner", "Ghost",
      "Trail", "Beam", "Storm",
    ],
  },
  Funny: {
    adj: [
      "Wobbly", "Silly", "Fluffy", "Cheeky", "Bouncy", "Derpy", "Chunky",
      "Sneaky", "Zesty", "Grumpy", "Sassy", "Goofy", "Wacky", "Quirky",
      "Dizzy", "Jumpy", "Snazzy", "Soggy", "Cranky", "Fuzzy", "Noodly",
      "Crispy", "Potato", "Banana", "Pickle", "Muffin", "Waffle", "Turbo",
      "Mega", "Super", "Ultra", "Giga",
    ],
    noun: [
      "Noodle", "Potato", "Waffle", "Pickle", "Muffin", "Banana", "Pancake",
      "Biscuit", "Taco", "Burrito", "Llama", "Sloth", "Duck", "Goose",
      "Pigeon", "Penguin", "Hamster", "Toaster", "Couch", "Sock", "Spoon",
      "Blob", "Goblin", "Wizard", "Nugget", "Bean", "Cheese", "Dumpling",
      "Narwhal", "Panda", "Gremlin",
    ],
  },
  Edgy: {
    adj: [
      "Dark", "Grim", "Venom", "Toxic", "Savage", "Cursed", "Brutal", "Deadly",
      "Rogue", "Haunted", "Broken", "Fallen", "Rabid", "Wicked", "Vicious",
      "Sinister", "Feral", "Grave", "Bleak", "Raven", "Ashen", "Nightfall",
      "Iron", "Crimson", "Blight", "Ruin", "Wrath", "Hex", "Vile", "Dread",
      "Onyx", "Void",
    ],
    noun: [
      "Reaper", "Wraith", "Fang", "Venom", "Scar", "Hollow", "Wolf", "Dagger",
      "Ash", "Shade", "Hunter", "Grave", "Chain", "Crow", "Spine", "Rage",
      "Abyss", "Bane", "Curse", "Doom", "Ember", "Vein", "Razor", "Hex",
      "Relic", "Shard", "Omen", "Pyre", "Bone", "Rune", "Skull",
    ],
  },
  Gamer: {
    adj: [
      "Pro", "Epic", "Legit", "Clutch", "Sniper", "Noob", "Turbo", "Laggy",
      "Cracked", "Goated", "Tryhard", "Camper", "Rusher", "Meta", "Elite",
      "Hyper", "Loot", "Quick", "Wired", "Ranked", "Flick", "Scope", "Quad",
      "Prime", "Alpha", "Omega", "Frag", "Nade", "Combo", "Respawn", "Headshot",
    ],
    noun: [
      "Gamer", "Sniper", "Slayer", "Camper", "Rusher", "Boss", "Player", "Hero",
      "Ghost", "Legend", "Kid", "King", "Queen", "Lord", "Master", "Beast",
      "Killer", "Hunter", "Warrior", "Raider", "Saint", "Titan", "Ninja",
      "Samurai", "Pilot", "Scout", "Captain", "Rogue", "Mage", "Dealer",
    ],
  },
  Fantasy: {
    adj: [
      "Elven", "Dwarven", "Arcane", "Mystic", "Enchanted", "Ancient", "Eternal",
      "Sacred", "Runic", "Ethereal", "Celestial", "Divine", "Primal", "Fey",
      "Draconic", "Moonlit", "Starborn", "Ironclad", "Gilded", "Crystal",
      "Feral", "Woodland", "Stormborn", "Fireforged", "Silver", "Goldleaf",
      "Emerald", "Ruby", "Frosted", "Astral", "Shadow", "Hallowed",
    ],
    noun: [
      "Mage", "Rogue", "Druid", "Knight", "Paladin", "Bard", "Warlock", "Sorcerer",
      "Ranger", "Archer", "Monk", "Oracle", "Seer", "Sage", "Wyrm", "Griffin",
      "Phoenix", "Dragon", "Troll", "Ogre", "Giant", "Elf", "Dwarf", "Elder",
      "Warden", "Scribe", "Guardian", "Champion", "Hunter", "Shade", "Bard",
    ],
  },
};

const leet = (s: string) =>
  s
    .replace(/e/g, "3")
    .replace(/a/g, "4")
    .replace(/i/g, "1")
    .replace(/o/g, "0")
    .replace(/s/g, "5")
    .replace(/E/g, "3")
    .replace(/A/g, "4")
    .replace(/I/g, "1")
    .replace(/O/g, "0")
    .replace(/S/g, "5");

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function GamertagGenerator() {
  const [style, setStyle] = useState<Style>("Cool");
  const [length, setLength] = useState<Length>("Medium");
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLeet, setUseLeet] = useState(false);
  const [count, setCount] = useState(10);
  const [tags, setTags] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    const pool = WORDS[style];
    const out: string[] = [];
    for (let i = 0; i < Math.max(1, Math.min(50, count)); i++) {
      let tag = "";
      if (length === "Short") {
        tag = pick(pool.noun);
      } else if (length === "Medium") {
        tag = `${pick(pool.adj)}${pick(pool.noun)}`;
      } else {
        tag = `${pick(pool.adj)}${pick(pool.adj)}${pick(pool.noun)}`;
      }
      if (useNumbers) {
        tag += String(Math.floor(Math.random() * 100));
      }
      if (useLeet) tag = leet(tag);
      out.push(tag);
    }
    setTags(out);
  };

  const copy = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
      setCopied(tag);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-2 text-sm">
            <span className="w-20 text-slate-700">Style</span>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value as Style)}
              className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              {(["Cool", "Funny", "Edgy", "Gamer", "Fantasy"] as Style[]).map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ),
              )}
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="w-20 text-slate-700">Length</span>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value as Length)}
              className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-sm"
            >
              <option value="Short">Short</option>
              <option value="Medium">Medium</option>
              <option value="Long">Long</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-slate-700">Include numbers</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={useLeet}
              onChange={(e) => setUseLeet(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span className="text-slate-700">Leet speak</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-700">Count</span>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) => setCount(Number(e.target.value) || 10)}
              className="w-20 rounded-lg border border-slate-300 px-2 py-1 text-sm"
            />
          </label>
        </div>

        <button
          onClick={generate}
          className="bg-brand text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-brand-dark"
        >
          Generate
        </button>
      </div>

      {tags.length > 0 && (
        <div className="rounded-xl bg-slate-50 p-4 font-mono space-y-2">
          {tags.map((t, i) => (
            <div
              key={`${t}-${i}`}
              className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm"
            >
              <span className="truncate">{t}</span>
              <button
                onClick={() => copy(t)}
                className="text-xs text-brand hover:underline whitespace-nowrap"
              >
                {copied === t ? "Copied!" : "Copy"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
