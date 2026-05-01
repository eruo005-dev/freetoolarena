// One-shot helper: add weak-inlink slugs to related[] of stronger pages.
import { readFileSync, writeFileSync } from "node:fs";

const FILE = "lib/pages.ts";
let src = readFileSync(FILE, "utf8");

const BOOSTS = {
  "dry-to-cooked-rice-converter": ["rice-to-water-ratio", "baking-conversion-calculator"],
  "gym-membership-roi-calculator": ["subscription-fatigue-auditor", "budget-calculator"],
  "multimodal-prompt-cost-estimator": ["ai-cost-estimator", "gemini-vs-chatgpt-cost-calculator"],
  "best-ai-for-data-analysis": ["best-ai-for-research", "best-ai-for-coding-2026"],
  "best-ai-for-customer-support": ["best-ai-for-marketing", "ai-feature-comparison-matrix"],
  "best-ai-for-pdfs": ["best-ai-for-research", "best-ai-for-students"],
  "best-ai-for-legal-research": ["best-ai-for-research", "best-ai-for-pdfs"],
  "how-to-pick-an-ai-for-research": ["best-ai-for-research", "how-to-pick-an-ai-coding-assistant"],
  "how-to-evaluate-an-ai-model": ["frontier-model-tracker", "ai-feature-comparison-matrix"],
  "prompt-injection-detector": ["system-prompt-generator", "ai-feature-comparison-matrix"],
  "ai-music-tool-comparison": ["ai-video-tool-tracker", "best-ai-for-creative-writing"],
  "ai-context-window-planner": ["llm-context-window-calculator", "ai-token-counter"],
  "ai-data-residency-checker": ["ai-rate-limit-tracker", "frontier-model-tracker"],
  "what-is-vibe-coding": ["best-ai-for-coding-2026", "how-to-pick-an-ai-coding-assistant"],
  "how-to-deploy-llama-locally": ["how-to-use-ollama", "open-source-llm-tracker"],
  "glp-1-medications-explained": ["protein-target-debunked", "macro-calculator"],
  "ai-resistant-careers": ["how-to-switch-careers", "ai-readiness-score"],
  "how-to-write-image-prompts-2026": ["best-ai-for-image-generation", "ai-image-prompt-helper"],
  "what-changed-in-gpt-5": ["chatgpt-pricing-explained", "best-ai-for-coding-2026"],
  "what-changed-in-claude-4": ["claude-pricing-explained", "best-ai-for-coding-2026"],
  "cgm-for-non-diabetics": ["macro-calculator", "protein-target-debunked"],
  "walking-vs-running-for-fat-loss": ["step-count-target-calculator", "calorie-calculator"],
  "heart-rate-variability-explained": ["oura-vs-whoop-vs-apple-watch", "zone-2-heart-rate-calculator"],
  "ai-search-vs-google-2026": ["ai-search-engine-comparison", "best-ai-for-research"],
  "third-place-revival": ["how-to-make-friends-as-an-adult", "small-talk-question-generator"],
  "creator-burnout-2026": ["how-to-beat-burnout", "subscription-fatigue-auditor"],
  "paper-planner-comeback": ["weekly-planner", "daily-planner"],
  "how-to-pick-an-mcp-server": ["mcp-server-picker", "what-is-mcp-protocol"],
  "kimi-k2-vs-deepseek-v3": ["open-source-llm-tracker", "frontier-model-tracker"],
  "anthropic-skills-explained": ["system-prompt-generator", "what-is-mcp-protocol"],
  "beginner-marathon-training": ["running-pace-calculator", "zone-2-heart-rate-calculator"],
  "induction-stove-conversion-2026": ["heat-pump-savings-calculator", "solar-panel-payback-calculator"],
  "electric-bike-commute-roi": ["ev-vs-hybrid-2026", "heat-pump-savings-calculator"],
  "return-to-office-2026": ["four-day-work-week-evidence", "how-to-work-from-home-productively"],
  "ai-fluency-skills-2026": ["ai-readiness-score", "prompt-rewriter"],
  "women-strength-training-2026": ["strength-training-over-50", "protein-target-debunked"],
  "fica-tax-calculator": ["paycheck-calculator", "tax-bracket-visualizer"],
  "vacation-payout-calculator": ["paycheck-calculator", "fica-tax-calculator"],
  "dog-treat-calorie-budget": ["dog-food-amount-calculator"],
  "how-to-write-a-dating-app-bio": ["dating-app-bio-rater", "small-talk-question-generator"],
  // second pass — push remaining 1-inlink slugs to 2+
  "how-to-feed-dog-treats-without-overdoing-it": ["dog-treat-calorie-budget", "dog-food-amount-calculator"],
  "embeddings-cost-comparison": ["batch-api-savings-calculator", "ai-cost-estimator"],
  "local-vs-api-breakeven-calculator": ["how-to-build-a-home-ai-cluster", "frontier-model-tracker"],
  "best-ai-for-emails": ["best-ai-for-meetings", "best-ai-for-marketing"],
  "how-to-pick-an-ai-coding-assistant": ["best-ai-for-coding-2026", "ai-coding-tool-cost-comparison"],
  "deepseek-pricing-explained": ["claude-pricing-explained", "claude-vs-deepseek-cost-calculator"],
  "how-to-choose-the-right-ai-for-your-team": ["ai-monthly-cost-budgeter", "ai-readiness-score"],
  "ai-readiness-score": ["how-to-choose-the-right-ai-for-your-team", "ai-monthly-cost-budgeter"],
  "ai-voice-mode-comparison": ["ai-transcription-tool-comparison", "ai-feature-comparison-matrix"],
  "ai-video-tool-tracker": ["ai-music-tool-comparison", "best-ai-for-video-generation"],
  "ai-transcription-tool-comparison": ["ai-voice-mode-comparison", "best-ai-for-meetings"],
  "pickleball-rating-calculator": ["run-club-distance-calculator", "vo2-max-estimator"],
  "low-buy-year-tracker": ["budget-calculator", "subscription-cost-calculator"],
  "dopamine-detox-planner": ["how-to-reduce-screen-time", "how-to-focus-better"],
  "how-to-use-chatgpt-atlas": ["agentic-browser-comparison", "best-ai-for-agents"],
  "why-zone-2-cardio-matters": ["zone-2-heart-rate-calculator", "vo2-max-estimator"],
  "10000-step-myth-explained": ["step-count-target-calculator", "calorie-calculator"],
  "how-to-start-a-low-buy-year": ["low-buy-year-tracker", "budget-calculator"],
  "heat-pump-worth-it-2026": ["heat-pump-savings-calculator", "solar-panel-payback-calculator"],
  "pickleball-vs-tennis-which-to-pick": ["pickleball-rating-calculator", "run-club-distance-calculator"],
  "dopamine-detox-myth": ["dopamine-detox-planner", "how-to-focus-better"],
  "oura-vs-whoop-vs-apple-watch": ["heart-rate-variability-explained", "zone-2-heart-rate-calculator"],
  "four-day-work-week-evidence": ["return-to-office-2026", "how-to-work-from-home-productively"],
  "mouth-tape-explained": ["bedtime-routine-2026", "sleep-cycle-calculator"],
  "fermented-foods-2026": ["fiber-target-2026", "macro-calculator"],
};

let added = 0;
for (const [target, hosts] of Object.entries(BOOSTS)) {
  for (const host of hosts) {
    const startIdx = src.indexOf(`slug: "${host}"`);
    if (startIdx === -1) continue;

    // Find the related: [...] within the next ~2000 chars (one entry block).
    const window = src.slice(startIdx, startIdx + 2000);
    const relMatch = window.match(/related:\s*\[([^\]]*)\]/);
    if (!relMatch) continue;

    const inner = relMatch[1];
    if (inner.includes(`"${target}"`)) continue; // already there

    const cleaned = inner.trim().replace(/,\s*$/, "");
    const newInner = cleaned.length > 0 ? cleaned + ", " + JSON.stringify(target) : JSON.stringify(target);
    const newRelated = `related: [${newInner}]`;

    const oldRelated = relMatch[0];
    const absStart = startIdx + window.indexOf(oldRelated);
    src = src.slice(0, absStart) + newRelated + src.slice(absStart + oldRelated.length);
    added++;
  }
}

writeFileSync(FILE, src);
console.log(`Added ${added} related-slug references`);
