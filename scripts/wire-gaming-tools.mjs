// Wire 20 gaming tools into components/tools/registry.tsx + lib/pages.ts
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  ["sensitivity-converter", "SensitivityConverter", "Mouse Sensitivity Converter", "Convert mouse sensitivity between CS2, Valorant, Apex, Overwatch, Fortnite, COD, R6, PUBG, and Rocket League. Shows cm/360 in one click.", "sensitivity converter", "gaming", ["edpi-calculator", "fov-calculator", "fps-to-frame-time"], "Move your sens between games without losing muscle memory. Supports 9 titles with real yaw values &mdash; paste your current sens, pick the target game, done.", ["Pick your current game + sens + DPI.", "Pick the target game.", "Copy the target sens and cm/360."]],
  ["edpi-calculator", "EdpiCalculator", "eDPI Calculator", "Effective DPI calculator with tier labels and cm/360 reference. Compare against pro player averages.", "edpi calculator", "gaming", ["sensitivity-converter", "fov-calculator", "fps-to-frame-time"], "eDPI = sens * DPI &mdash; the only number that matters when comparing mouse settings across players. With tier label and pro-player reference table.", ["Enter in-game sens and mouse DPI.", "Read eDPI and cm/360.", "Compare to the pro reference."]],
  ["fov-calculator", "FovCalculator", "FOV Calculator", "Convert field of view between aspect ratios and games. Horizontal + vertical FOV using Hor+ formula.", "fov calculator", "gaming", ["sensitivity-converter", "edpi-calculator", "fps-to-frame-time"], "Keep the same visual field when switching monitors or aspect ratios. Hor+ formula with 5 aspect-ratio presets and game defaults.", ["Enter current FOV and aspect ratio.", "Pick the target aspect ratio.", "Read horizontal + vertical FOV."]],
  ["fps-to-frame-time", "FpsToFrameTime", "FPS to Frame Time Calculator", "Convert FPS to milliseconds per frame. Monitor refresh-rate comparison table from 30 Hz to 500 Hz.", "fps to ms", "gaming", ["ping-latency-tier", "edpi-calculator", "fov-calculator"], "Every frame above your monitor refresh rate still helps input lag &mdash; this shows exactly how many ms each frame costs.", ["Enter target FPS.", "Read the frame time in ms.", "Compare against common refresh rates."]],
  ["ping-latency-tier", "PingLatencyTier", "Ping Latency Tier Checker", "Ping ms to tier (Excellent, Great, Good, Bad) with competitive thresholds and distance estimate.", "ping latency tier", "gaming", ["fps-to-frame-time", "sensitivity-converter", "edpi-calculator"], "Know whether your ping is pro-level or tilting you. Tier labels, competitive thresholds for FPS and MOBAs, and a rough distance estimate.", ["Enter your ping in ms.", "Read the tier and explainer.", "Check distance and jitter."]],
  ["gaming-dps-calculator", "GamingDpsCalculator", "Gaming DPS Calculator", "Raw, sustained, and effective DPS with crit chance + multiplier. Works for any shooter weapon.", "gaming dps calculator", "gaming", ["kd-ratio-calculator", "win-rate-calculator", "loot-drop-probability"], "Raw DPS vs sustained DPS (with reload) vs effective DPS (with crits). Paste weapon stats, compare loadouts instantly.", ["Enter damage, RPM, mag, reload.", "Add crit chance + multiplier.", "Compare DPS values."]],
  ["kd-ratio-calculator", "KdRatioCalculator", "K/D Ratio Calculator", "K/D ratio with tier labels and a target projection &mdash; see how many kills or fewer deaths you need to hit a target K/D.", "kd ratio calculator", "gaming", ["win-rate-calculator", "gaming-dps-calculator", "xp-to-level-calculator"], "K/D isn&rsquo;t just kills over deaths &mdash; it&rsquo;s a target you can project toward. Enter current stats, set your goal, see exactly what&rsquo;s needed.", ["Enter kills and deaths.", "Read K/D and tier.", "Set a target and see the gap."]],
  ["win-rate-calculator", "WinRateCalculator", "Win Rate Calculator", "Win rate % with target projection &mdash; wins needed in a row or losses you can absorb to hit a goal.", "win rate calculator", "gaming", ["kd-ratio-calculator", "gaming-dps-calculator", "xp-to-level-calculator"], "Plan a climb instead of guessing. Enter your record, pick a target win rate, see exactly how many wins-in-a-row or losses-absorbed it takes.", ["Enter wins and losses.", "Read win rate and tier.", "Set a target, read the path."]],
  ["xp-to-level-calculator", "XpToLevelCalculator", "XP to Level Calculator", "Generic XP grind-time estimator. Works for any RPG &mdash; enter current XP, target XP, and XP/hour for a time estimate.", "xp to level calculator", "gaming", ["minecraft-enchantment-level", "kd-ratio-calculator", "loot-drop-probability"], "How long until max level? Enter your XP rate and target, get hours and minutes.", ["Enter current XP and target.", "Enter XP per hour.", "Read time to target."]],
  ["loot-drop-probability", "LootDropProbability", "Loot Drop Probability Calculator", "Probability of at least one rare drop in N attempts. Median, 95%-guaranteed, and mean attempts.", "loot drop probability", "gaming", ["xp-to-level-calculator", "gaming-dps-calculator", "dice-notation-roller"], "0.5% drop rate? How many runs until 50% chance? Until 95%? The real probability math for farming, in four numbers.", ["Enter the drop rate %.", "Enter attempts per session.", "Read all four probability stats."]],
  ["team-randomizer", "TeamRandomizer", "Team Randomizer", "Split a player list into balanced teams. Random shuffle or greedy-balanced by skill ratings.", "team randomizer", "gaming", ["tournament-bracket-generator", "gamertag-generator", "clan-tag-generator"], "Random or greedy-balanced team split. Paste names (optionally with skill ratings) and get fair teams in one click.", ["Paste one player per line.", "Pick team count and balancing.", "Shuffle until you&rsquo;re happy."]],
  ["tournament-bracket-generator", "TournamentBracketGenerator", "Tournament Bracket Generator", "Single or double-elimination bracket. Seed by list order, random, or snake. Printable.", "tournament bracket generator", "gaming", ["team-randomizer", "gamertag-generator", "clan-tag-generator"], "Single or double elimination with three seeding modes. BYEs padded automatically for non-power-of-two entries. Prints clean on one page.", ["Paste one team per line.", "Pick format and seeding.", "Print the bracket."]],
  ["gamertag-generator", "GamertagGenerator", "Gamertag Generator", "Random gamertag generator with style themes (cool, funny, edgy, gamer, fantasy), length control, and optional leet speak.", "gamertag generator", "gaming", ["clan-tag-generator", "team-randomizer", "tournament-bracket-generator"], "Out of ideas? Five style themes, length control, numbers and leet speak on demand. Generate a fresh list as often as you want.", ["Pick style and length.", "Toggle numbers + leet.", "Copy a tag you like."]],
  ["clan-tag-generator", "ClanTagGenerator", "Clan Tag Generator", "Short 2-4 letter clan tags. Random pronounceable CVC or seed-phrase derived. Caps / mixed / leet styles.", "clan tag generator", "gaming", ["gamertag-generator", "team-randomizer", "tournament-bracket-generator"], "Pronounceable 2-4 letter clan tags from a seed phrase or random. Leet and mixed-case variants included.", ["Pick length and style.", "Add a seed phrase for themed tags.", "Copy the tag you pick."]],
  ["dice-notation-roller", "DiceNotationRoller", "Dice Notation Roller", "Parse D&D-style dice notation: `4d6+2`, `2d20kh1` (advantage), `3d6!` (exploding). Shows individual rolls and stats.", "dice notation roller", "gaming", ["dnd-encounter-difficulty", "loot-drop-probability", "xp-to-level-calculator"], "Real dice notation support &mdash; kh/kl for advantage / disadvantage, exploding dice, modifiers, chained expressions. Plus expected value and variance.", ["Enter dice notation.", "Click Roll.", "Read individual rolls + total."]],
  ["minecraft-food-calculator", "MinecraftFoodCalculator", "Minecraft Food Calculator", "Minecraft hunger and saturation values for every food. Best saturation-per-hunger picks and meal planner.", "minecraft food calculator", "gaming", ["minecraft-enchantment-level", "xp-to-level-calculator", "loot-drop-probability"], "Golden Carrot wins saturation-per-hunger every time. Plan your food stack, see total hunger + saturation, stop wasting cookies.", ["Pick foods and quantities.", "Read hunger + saturation totals.", "Find the best ratio pick."]],
  ["minecraft-enchantment-level", "MinecraftEnchantmentLevel", "Minecraft Enchantment XP Calculator", "Total XP needed to reach any enchantment level. Uses Minecraft&rsquo;s three-tier XP formula (0-15, 16-30, 31+).", "minecraft enchantment xp", "gaming", ["minecraft-food-calculator", "xp-to-level-calculator", "loot-drop-probability"], "Three XP tiers mean level 30 costs way more than level 15 * 2. Plan your grind with real numbers.", ["Enter current level.", "Enter target level.", "Read total XP and mob equivalents."]],
  ["dnd-encounter-difficulty", "DndEncounterDifficulty", "D&D Encounter Difficulty Calculator", "5e encounter XP budget for Easy / Medium / Hard / Deadly based on party size and level. Multiplier-adjusted.", "dnd encounter difficulty", "gaming", ["dice-notation-roller", "minecraft-enchantment-level", "xp-to-level-calculator"], "The DMG XP-threshold table made usable. Enter party config + monster XP, see which tier the fight lands in.", ["Enter party size and average level.", "Enter monster count + total XP.", "Read the encounter tier."]],
  ["mtg-mana-curve-analyzer", "MtgManaCurveAnalyzer", "MTG Mana Curve Analyzer", "Magic the Gathering deck mana-curve visualizer. Paste a decklist, see average CMC and suggested land count.", "mtg mana curve analyzer", "gaming", ["dice-notation-roller", "dnd-encounter-difficulty", "minecraft-enchantment-level"], "Paste a decklist, see the curve. Average CMC, top-heavy warnings, suggested land count from the classic nonland / 60 * 24 rule of thumb.", ["Paste decklist with counts.", "Read curve chart and average CMC.", "Check suggested land count."]],
  ["steam-library-value", "SteamLibraryValue", "Steam Library Value Calculator", "Manual-entry Steam library value estimator. Total spent, cost-of-regret on unplayed games, most-expensive list.", "steam library value", "gaming", ["gaming-dps-calculator", "kd-ratio-calculator", "win-rate-calculator"], "How much have you actually spent on Steam? Paste your library, flag games with &lt;2h played, see your cost-of-regret.", ["Paste your library list.", "Pick currency.", "Read total + cost-of-regret."]],
];

// ---- Patch components/tools/registry.tsx ----
let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");

const toolImports = tools
  .map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`)
  .join("\n");

const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
if (!toolSrc.includes(registryAnchor)) throw new Error("Missing TOOL_REGISTRY anchor");
toolSrc = toolSrc.replace(registryAnchor, `// Gaming wave (20 new tools)\n${toolImports}\n\n${registryAnchor}`);

const lastRegEnd = toolSrc.lastIndexOf("};");
if (lastRegEnd === -1) throw new Error("Missing registry close");

const toolEntries = tools
  .map(([slug, cls, , , , , , explainer, howToUse]) => {
    const howToStr = howToUse.map((s) => `      "${s.replace(/"/g, '\\"')}",`).join("\n");
    return `  "${slug}": {
    render: () => <${cls} />,
    explainer: (
      <>
        <p>${explainer}</p>
        <p>
          Runs entirely in your browser — no upload, no account, no watermark.
          For more tools in this category see the{" "}
          <a href="/tools">full tools index</a>.
        </p>
      </>
    ),
    howToUse: [
${howToStr}
    ],
  },`;
  })
  .join("\n");

toolSrc = toolSrc.slice(0, lastRegEnd) + toolEntries + "\n" + toolSrc.slice(lastRegEnd);
writeFileSync("components/tools/registry.tsx", toolSrc);
console.log("tools registry patched:", tools.length);

// ---- Patch lib/pages.ts manifest (inside PAGES array) ----
let pages = readFileSync("lib/pages.ts", "utf8");

const marker = "export const PAGES: Page[] = [";
const markerStart = pages.indexOf(marker);
if (markerStart === -1) throw new Error("PAGES start missing");
const openBracket = markerStart + marker.length - 1;
let depth = 1, i = openBracket + 1, inStr = false, q = "", esc = false;
while (i < pages.length && depth > 0) {
  const c = pages[i];
  if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) inStr = false; }
  else if (c === '"' || c === "'" || c === "`") { inStr = true; q = c; }
  else if (c === "[") depth++;
  else if (c === "]") depth--;
  i++;
}
if (depth !== 0) throw new Error("Unbalanced PAGES brackets");
const closeBracket = i - 1;

const esc2 = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const manifestEntries = tools
  .map(([slug, , title, description, keyword, category, related]) => {
    const relatedArr = related.map((s) => `"${s}"`).join(", ");
    return `  { slug: "${slug}", type: "tool", category: "${category}",
    title: "${esc2(title)}",
    h1: "${esc2(title)}",
    description: "${esc2(description)}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    published: true },`;
  })
  .join("\n");

pages = pages.slice(0, closeBracket) + "\n" + manifestEntries + "\n" + pages.slice(closeBracket);
writeFileSync("lib/pages.ts", pages);
console.log("pages.ts patched:", tools.length, "entries");
