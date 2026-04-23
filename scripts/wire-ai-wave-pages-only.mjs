// Only patch lib/pages.ts (registries already patched by wire-ai-wave.mjs)
import { readFileSync, writeFileSync } from "node:fs";

const guides = [
  ["how-to-use-ollama", "How to Use Ollama — Local LLMs with One Command", "Installing Ollama, pulling models (llama3.1, qwen, mistral), running via CLI and REST API, GPU acceleration, and Modelfiles.", "use ollama", "llm-context-window-calculator"],
  ["how-to-use-lm-studio", "How to Use LM Studio — GUI for Local LLMs", "Downloading models from the catalog, chatting in the UI, exposing an OpenAI-compatible server on port 1234, GPU offload.", "use lm studio", "llm-context-window-calculator"],
  ["how-to-use-llama-cpp", "How to Use llama.cpp — Bare-Metal LLM Inference", "Building llama.cpp, downloading GGUF models, running llama-cli and llama-server, quantization tradeoffs, Metal/CUDA.", "use llama cpp", "llm-context-window-calculator"],
  ["how-to-use-jan-ai", "How to Use Jan — Open-Source ChatGPT Alternative", "Installing Jan, connecting local and remote model providers, extensions, keyboard shortcuts, and offline use.", "use jan ai", "ai-cost-estimator"],
  ["how-to-use-gpt4all", "How to Use GPT4All — Local LLMs + LocalDocs RAG", "Installing GPT4All, downloading models, using LocalDocs for private RAG over your files, embedding with SBert.", "use gpt4all", "embedding-cost-estimator"],
  ["how-to-use-hermes-models", "How to Use Hermes Models — Nous Research Function Calling", "Running Hermes 3, system prompt tricks, function calling JSON format, getting the most out of the Llama-based tune.", "use hermes models", "system-prompt-builder"],
  ["how-to-use-smolagents", "How to Use smolagents — Hugging Face Code Agents", "Installing smolagents, CodeAgent vs ToolCallingAgent, HfApiEngine, adding custom tools, sandboxed code execution.", "use smolagents", "system-prompt-builder"],
  ["how-to-use-swe-agent", "How to Use SWE-agent — Autonomous Repo Engineering", "Installing SWE-agent, the agent-computer interface (ACI), running on SWE-bench, configuring models, cost control.", "use swe agent", "ai-cost-estimator"],
  ["how-to-use-opencode", "How to Use OpenCode — Open-Source Terminal Agent", "Installing opencode by sst, connecting providers (Claude, OpenAI, local), the TUI basics, plan mode, tool permissions.", "use opencode", "system-prompt-builder"],
  ["how-to-use-aider", "How to Use Aider — AI Pair Programming in Terminal", "Installing aider, --model flag, /add and /drop, edit formats (diff, whole, udiff), git integration, and voice coding.", "use aider", "system-prompt-builder"],
  ["how-to-use-cline", "How to Use Cline — Autonomous Agent in VS Code", "Installing the Cline extension, task-based workflows, tool permissions, browser use, terminal commands, approval modes.", "use cline", "system-prompt-builder"],
  ["how-to-use-continue-dev", "How to Use Continue.dev — Open-Source Copilot", "Installing Continue in VS Code/JetBrains, config.json, choosing models, custom context providers, slash commands.", "use continue dev", "system-prompt-builder"],
  ["how-to-use-windsurf", "How to Use Windsurf — Codeium's AI IDE", "Installing Windsurf, Cascade agent flows, tab-to-complete, inline chat, multi-file edits, memory system.", "use windsurf", "system-prompt-builder"],
  ["how-to-use-goose-agent", "How to Use Goose — Block's Open-Source Agent", "Installing goose, provider configuration, sessions, extensions (toolkits), custom instructions, headless mode.", "use goose agent", "system-prompt-builder"],
  ["how-to-use-gemini-cli", "How to Use Gemini CLI — Google's Terminal Agent", "Installing the gemini CLI, free tier access, Gemini 2.5 Pro, 1M context, tool use, and comparing to other CLIs.", "use gemini cli", "ai-cost-estimator"],
  ["how-to-use-codex-cli", "How to Use Codex CLI — OpenAI's Terminal Agent", "Installing codex, running sandboxed commands, multimodal inputs, approval modes, config file, and gotchas.", "use codex cli", "system-prompt-builder"],
  ["how-to-use-openhands", "How to Use OpenHands — Open-Source Software Engineer", "Running OpenHands (formerly OpenDevin) via Docker, the web UI, sandbox container, LLM provider setup, task delegation.", "use openhands", "ai-cost-estimator"],
  ["how-to-use-devin", "How to Use Devin — Cognition's Autonomous Engineer", "Signing up for Devin, creating sessions, Slack integration, planning mode, the Devin API, pricing and gotchas.", "use devin", "ai-cost-estimator"],
  ["how-to-use-replit-agent", "How to Use Replit Agent — App Building From a Prompt", "Starting a project with Agent, checkpoints, rolling back, deploying instantly, database setup, and auth.", "use replit agent", "system-prompt-builder"],
  ["how-to-use-bolt-new", "How to Use Bolt.new — Full-Stack AI Apps in the Browser", "Prompting Bolt.new, WebContainer runtime, iterating on generated code, connecting GitHub, deploying to Netlify.", "use bolt new", "system-prompt-builder"],
  ["how-to-use-v0-by-vercel", "How to Use v0 by Vercel — AI UI Generation", "Prompting v0, shadcn/ui + Tailwind output, iterating on components, shipping to Next.js, using reference images.", "use v0", "system-prompt-builder"],
  ["how-to-use-lovable-dev", "How to Use Lovable — Prompt-to-App Builder", "Starting a Lovable project, GitHub sync, chat-based editing, Supabase integration, and deployment.", "use lovable", "system-prompt-builder"],
  ["how-to-use-autogen", "How to Use AutoGen — Microsoft's Multi-Agent Framework", "Installing pyautogen, AssistantAgent + UserProxyAgent, group chat, termination conditions, code execution sandbox.", "use autogen", "ai-cost-estimator"],
  ["how-to-use-pydantic-ai", "How to Use Pydantic AI — Type-Safe Agents", "Installing pydantic-ai, Agent class, result_type, dependencies, tools, streaming, and OpenTelemetry tracing.", "use pydantic ai", "agent-json-validator"],
  ["how-to-use-agno-framework", "How to Use Agno (Phidata) — Multimodal AI Agents", "Installing agno, Agent + Teams, knowledge/RAG, tools, Playground UI, running in production with monitoring.", "use agno", "system-prompt-builder"],
  ["how-to-use-dspy", "How to Use DSPy — Programmatic Prompting by Stanford", "Installing dspy-ai, Signatures, Modules (Predict, ChainOfThought, ReAct), MIPROv2 optimizer, metric-driven prompts.", "use dspy", "system-prompt-builder"],
  ["how-to-use-mastra", "How to Use Mastra — TypeScript AI Framework", "Installing mastra, agents, workflows, memory, evals, deployer, integrating with Next.js and shipping to prod.", "use mastra", "system-prompt-builder"],
  ["how-to-use-vercel-ai-sdk", "How to Use Vercel AI SDK — Unified LLM Interface", "Installing the ai SDK, generateText + streamText, tools, useChat hook, multi-step, edge runtime, provider flexibility.", "use vercel ai sdk", "ai-cost-estimator"],
  ["how-to-use-langchain", "How to Use LangChain — LCEL Chains and Retrievers", "Installing langchain, LCEL runnables, retrievers, memory, output parsers, and when to pick LangGraph instead.", "use langchain", "system-prompt-builder"],
  ["how-to-use-llamaindex", "How to Use LlamaIndex — RAG-First AI Framework", "Installing llama-index, VectorStoreIndex, ingestion pipelines, Workflows, LlamaParse, and observability.", "use llamaindex", "embedding-cost-estimator"],
  ["how-to-use-zed-agent", "How to Use Zed's AI Agent", "Turning on the Agent Panel in Zed, configuring providers, Edit Predictions, agent mode vs ask, and Zed's collab flow.", "use zed agent", "system-prompt-builder"],
  ["how-to-use-warp-ai", "How to Use Warp AI — Agent Mode in the Terminal", "Installing Warp, Agent Mode vs AI command search, workflows, code review in terminal, block-based UX, privacy controls.", "use warp ai", "system-prompt-builder"],
  ["how-to-use-amazon-q-developer", "How to Use Amazon Q Developer", "Installing Q Developer in VS Code/JetBrains, inline completions, agent tasks, security scans, AWS integration.", "use amazon q developer", "system-prompt-builder"],
  ["how-to-use-tabby", "How to Use Tabby — Self-Hosted Open-Source Copilot", "Deploying Tabby via Docker, model selection, GPU inference, Code Browser, IDE extensions, team setup.", "use tabby", "system-prompt-builder"],
  ["how-to-use-phind", "How to Use Phind — AI Search for Developers", "Using Phind for web-grounded technical answers, Phind-70B, Quick vs Thorough modes, pair-programming tips.", "use phind", "system-prompt-builder"],
  ["how-to-use-mentat", "How to Use Mentat AI — Open-Source Coding Assistant", "Installing mentat, CLI usage, context control (/include, /exclude), diff-based edits, and git workflows.", "use mentat", "system-prompt-builder"],
  ["how-to-use-semantic-kernel", "How to Use Semantic Kernel — Microsoft's AI SDK", "Installing Semantic Kernel in C#/Python/Java, Kernel, plugins, planners, memory, and agent framework.", "use semantic kernel", "system-prompt-builder"],
  ["how-to-use-letta-memgpt", "How to Use Letta (MemGPT) — Stateful Agents", "Installing Letta, server vs cloud, ADE visual tool, building agents with long-term memory, archival storage.", "use letta memgpt", "agent-json-validator"],
  ["how-to-use-haystack", "How to Use Haystack — deepset's LLM Framework", "Installing haystack-ai, Pipelines, DocumentStore, retrievers, LLM generators, and running in production.", "use haystack", "embedding-cost-estimator"],
  ["how-to-use-griptape", "How to Use Griptape — Python AI Agent Framework", "Installing griptape, Agents, Pipelines, off-prompt data, rules, tasks, tools, memory, and observability.", "use griptape", "system-prompt-builder"],
  ["how-to-use-marvin-ai", "How to Use Marvin AI — AI Primitives for Python", "Installing marvin, classify/extract/generate, ai_fn decorator, Pydantic schemas, and backends.", "use marvin ai", "agent-json-validator"],
  ["how-to-use-open-webui", "How to Use Open WebUI — Self-Hosted ChatGPT UI", "Deploying Open WebUI via Docker, Ollama integration, RAG with documents, MCP tool support, user management.", "use open webui", "ai-cost-estimator"],
  ["how-to-use-anythingllm", "How to Use AnythingLLM — Private RAG Chat", "Installing AnythingLLM desktop or docker, workspaces, embedding providers, vector DB choices, agents.", "use anythingllm", "embedding-cost-estimator"],
  ["how-to-use-flowise", "How to Use Flowise — Visual LLM Flow Builder", "Installing Flowise, drag-drop chain building, templates, API deployment, credentials, and analytics.", "use flowise", "system-prompt-builder"],
  ["how-to-use-dify", "How to Use Dify — Open-Source LLMOps Platform", "Self-hosting Dify, visual workflows, agents, datasets, apps (chatbot/completion), API keys, monitoring.", "use dify", "system-prompt-builder"],
  ["how-to-use-librechat", "How to Use LibreChat — Self-Hosted ChatGPT Clone", "Deploying LibreChat with Docker, multi-provider config, plugins, assistants API, MongoDB setup, auth.", "use librechat", "ai-cost-estimator"],
  ["how-to-use-n8n-ai-agent", "How to Use n8n's AI Agent Node", "Using the AI Agent node in n8n, connecting tools, memory, LangChain backends, and production flows.", "use n8n ai agent", "system-prompt-builder"],
  ["how-to-use-langfuse", "How to Use Langfuse — LLM Observability", "Installing Langfuse self-hosted or cloud, tracing prompts, scores, evals, SDK for Python/JS, dashboards.", "use langfuse", "ai-cost-estimator"],
  ["how-to-use-promptfoo", "How to Use Promptfoo — Prompt Testing CLI", "Installing promptfoo, writing promptfooconfig.yaml, assertions, red-teaming, CI integration, web UI.", "use promptfoo", "system-prompt-builder"],
  ["how-to-use-rivet-ai", "How to Use Rivet — Visual LLM IDE", "Installing Rivet, graph-based prompt engineering, nodes, embedding in JS/TS apps via @ironclad/rivet-core.", "use rivet", "system-prompt-builder"],
];

const tools = [
  ["llm-context-window-calculator", "LLM Context Window Calculator", "Check if your input + output tokens fit in any major LLM (GPT-4o, Claude, Gemini, Llama, Mistral) — see headroom and percent used.", "llm context window", "ai", ["ai-token-counter", "ai-cost-estimator", "ai-model-compare"]],
  ["ai-cost-estimator", "AI Cost Estimator", "Estimate daily, monthly, and yearly API cost for GPT-4o, Claude, Gemini, and more based on your traffic and token usage.", "ai cost estimator", "ai", ["ai-token-counter", "llm-context-window-calculator", "embedding-cost-estimator"]],
  ["system-prompt-builder", "System Prompt Builder", "Compose a focused system prompt from a role, tone, constraints, and output format — copy-ready for any LLM.", "system prompt builder", "ai", ["ai-prompt-generator", "prompt-improver", "chain-of-thought-formatter"]],
  ["agent-json-validator", "Agent JSON Validator", "Paste tool-call or agent-output JSON — parse, pretty-print, highlight errors, and count keys and depth.", "agent json validator", "ai", ["json-formatter", "json-schema-to-ts", "http-header-explainer"]],
  ["ai-regex-generator", "AI Regex Generator", "Describe what you want to match in plain English — get a canonical regex (email, URL, phone, UUID, etc.) plus a live test.", "ai regex generator", "ai", ["regex-tester", "regex-to-english", "agent-json-validator"]],
  ["jailbreak-risk-scorer", "Jailbreak Risk Scorer", "Score an input prompt 0-10 for jailbreak risk — flags common prompt-injection patterns and DAN-style attempts.", "jailbreak risk scorer", "ai", ["system-prompt-builder", "ai-regex-generator", "ai-prompt-generator"]],
  ["ai-sampling-settings-helper", "AI Sampling Settings Helper", "Recommended temperature, top_p, top_k, and penalties for different use cases — code, creative, factual, reasoning.", "ai sampling settings", "ai", ["system-prompt-builder", "ai-cost-estimator", "ai-model-compare"]],
  ["chain-of-thought-formatter", "Chain-of-Thought Formatter", "Wrap any question in a structured Understand → Plan → Execute → Verify CoT template to boost reasoning quality.", "chain of thought", "ai", ["system-prompt-builder", "ai-prompt-generator", "prompt-improver"]],
  ["embedding-cost-estimator", "Embedding Cost Estimator", "Total tokens and cost for embedding a document corpus — compare OpenAI, Voyage, Cohere, and more at once.", "embedding cost", "ai", ["ai-cost-estimator", "ai-token-counter", "llm-context-window-calculator"]],
  ["ai-output-length-estimator", "AI Output Length Estimator", "Predict how many tokens an LLM will generate for summaries, rewrites, code, or essays — budget your max_tokens.", "ai output length", "ai", ["ai-token-counter", "ai-cost-estimator", "llm-context-window-calculator"]],
  ["dockerfile-lint-helper", "Dockerfile Lint Helper", "Scan a Dockerfile for common smells — latest tag, no USER, ADD for URLs, secrets in RUN, missing HEALTHCHECK, and more.", "dockerfile lint", "dev", ["json-formatter", "yaml-formatter", "http-header-explainer"]],
  ["git-commit-message-helper", "Git Commit Message Helper", "Build a conventional-commit message from type/scope/subject/body — ready to paste into git commit.", "git commit message", "dev", ["semver-bumper", "slug-generator", "markdown-table-generator"]],
  ["semver-bumper", "Semver Bumper", "Bump a version across major/minor/patch — see exactly what changes and when to pick each.", "semver bumper", "dev", ["git-commit-message-helper", "json-formatter", "uuid-generator"]],
  ["bash-command-explainer", "Bash Command Explainer", "Paste any bash pipeline — get a plain-English explanation of each command and its flags.", "bash command explainer", "dev", ["cron-expression-explainer", "curl-command-builder", "regex-tester"]],
  ["api-rate-limit-calculator", "API Rate Limit Calculator", "Given req/sec limit, concurrency, and latency — compute effective throughput and when you'll saturate.", "api rate limit", "dev", ["bash-command-explainer", "http-header-explainer", "dotenv-generator"]],
  ["json-schema-to-ts", "JSON Schema to TypeScript", "Paste a JSON sample — get a clean TypeScript interface inferred automatically.", "json schema to typescript", "dev", ["json-formatter", "agent-json-validator", "yaml-formatter"]],
  ["openapi-endpoint-counter", "OpenAPI Endpoint Counter", "Paste an OpenAPI 3 spec — see paths by method, operation IDs, and count endpoints at a glance.", "openapi endpoint counter", "dev", ["json-formatter", "json-schema-to-ts", "http-header-explainer"]],
  ["http-header-explainer", "HTTP Header Explainer", "Paste raw headers — get plain-English meanings and security implications for each Cache-Control, CSP, HSTS.", "http header explainer", "dev", ["http-status-code-lookup", "mime-type-lookup", "curl-command-builder"]],
  ["websocket-frame-parser", "WebSocket Frame Parser", "Decode raw WebSocket frame bytes — FIN, opcode, mask, payload length, masking key, and unmasked payload.", "websocket frame parser", "dev", ["binary-text-encoder", "hash-generator", "http-header-explainer"]],
  ["dotenv-generator", "Dotenv Generator", "Turn a VAR=value list into a validated .env file — with auto-generated 32-hex secrets and duplicate detection.", "dotenv generator", "dev", ["env-file-parser", "hash-generator", "uuid-generator"]],
  ["freelancer-tax-reserve-calculator", "Freelancer Tax Reserve Calculator", "Set aside the right % of gross for federal, self-employment, and state taxes — monthly reserve amount in one click.", "freelancer tax reserve", "money", ["freelance-rate-calculator", "invoice-generator", "tax-calculator"]],
  ["home-equity-loan-calculator", "Home Equity Loan Calculator", "Max borrowable against your home equity — monthly HELOC payment, total interest, and LTV check in one place.", "home equity loan", "money", ["mortgage-calculator", "refinance-calculator", "loan-calculator"]],
  ["employer-401k-match-optimizer", "401(k) Match Optimizer", "Pick a contribution % that captures the full employer match without over-contributing to an unmatched tier.", "401k match optimizer", "money", ["401k-calculator", "roth-ira-calculator", "retirement-calculator"]],
  ["roth-vs-traditional-breakeven", "Roth vs Traditional Breakeven", "Compare Roth and Traditional tax math — see the breakeven retirement tax rate and which wins for your scenario.", "roth vs traditional", "money", ["roth-ira-calculator", "401k-calculator", "retirement-calculator"]],
  ["annuity-payment-calculator", "Annuity Payment Calculator", "Compute periodic payments for an annuity — principal, rate, term, and frequency all supported.", "annuity payment", "money", ["compound-interest-calculator", "loan-calculator", "savings-goal-calculator"]],
  ["dividend-reinvestment-calculator", "Dividend Reinvestment Calculator", "Project DRIP growth over years — yield, price growth, and monthly contributions all modeled.", "dividend reinvestment", "money", ["compound-interest-calculator", "savings-goal-calculator", "fire-number-calculator"]],
  ["tax-bracket-visualizer", "Tax Bracket Visualizer", "See exactly how much of your income falls into each 2025 federal bracket — effective and marginal rates in one view.", "tax bracket visualizer", "money", ["tax-calculator", "paycheck-calculator", "freelancer-tax-reserve-calculator"]],
  ["fire-number-calculator", "FIRE Number Calculator", "Your financial-independence target — lean, regular, and fat FIRE numbers based on your annual expenses and SWR.", "fire number", "money", ["retirement-calculator", "savings-goal-calculator", "dividend-reinvestment-calculator"]],
  ["net-salary-to-gross-calculator", "Net Salary to Gross Calculator", "Got a take-home number you need? Back-solve the gross salary that nets it after federal, FICA, and state.", "net to gross salary", "money", ["paycheck-calculator", "salary-to-hourly-calculator", "tax-bracket-visualizer"]],
  ["cost-of-living-adjuster", "Cost of Living Adjuster", "Equivalent salary between two cities based on COL indices — plus the absolute and percent delta.", "cost of living adjuster", "money", ["paycheck-calculator", "apartment-affordability-calculator", "moving-cost-calculator"]],
  ["one-rep-max-calculator", "One-Rep Max Calculator", "Estimate your 1RM from a set of N reps — Epley, Brzycki, Lombardi, Mayhew formulas side by side.", "one rep max", "health", ["calorie-calculator", "protein-intake-calculator", "running-pace-calculator"]],
  ["ovulation-window-calculator", "Ovulation Window Calculator", "Fertile window, likely ovulation day, and next period estimate from last period date and cycle length.", "ovulation window", "health", ["pregnancy-calculator", "age-calculator", "date-calculator"]],
  ["electrolyte-replacement-calculator", "Electrolyte Replacement Calculator", "Water, sodium, and potassium targets for endurance training — tuned to body weight, sweat rate, and climate.", "electrolyte replacement", "health", ["water-intake-calculator", "calorie-calculator", "running-pace-calculator"]],
  ["vitamin-d-dose-calculator", "Vitamin D Dose Calculator", "Suggested daily IU for maintenance or deficiency repletion — accounting for age and sun exposure.", "vitamin d dose", "health", ["calorie-calculator", "water-intake-calculator", "protein-intake-calculator"]],
  ["calories-per-macro-estimator", "Calories Per Macro Estimator", "Total kcal from protein/carbs/fat/fiber plus percent breakdown — catches low-protein diets instantly.", "calories per macro", "health", ["macro-calculator", "calorie-calculator", "protein-intake-calculator"]],
  ["paint-gallons-calculator", "Paint Gallons Calculator", "Gallons of paint for any room — factors wall count, coats, door/window subtraction, and spread rate.", "paint gallons", "home", ["wallpaper-roll-calculator", "tile-count-calculator", "lawn-fertilizer-calculator"]],
  ["wallpaper-roll-calculator", "Wallpaper Roll Calculator", "Rolls needed for any room — factors roll width, length, pattern repeat, and waste allowance.", "wallpaper roll", "home", ["paint-gallons-calculator", "tile-count-calculator", "furniture-fit-calculator"]],
  ["lawn-fertilizer-calculator", "Lawn Fertilizer Calculator", "Pounds of fertilizer for any lawn — based on sqft, nitrogen target, and bag N percentage.", "lawn fertilizer", "home", ["paint-gallons-calculator", "wallpaper-roll-calculator", "tile-count-calculator"]],
  ["furniture-fit-calculator", "Furniture Fit Calculator", "Does that sofa fit? Check clearance, walkway, and rotation options before the delivery truck arrives.", "furniture fit", "home", ["paint-gallons-calculator", "wallpaper-roll-calculator", "apartment-affordability-calculator"]],
  ["tile-count-calculator", "Tile Count Calculator", "Tiles and boxes for any area — tile size, waste allowance, and per-box count all supported.", "tile count", "home", ["paint-gallons-calculator", "wallpaper-roll-calculator", "lawn-fertilizer-calculator"]],
  ["email-subject-line-analyzer", "Email Subject Line Analyzer", "Length, preview cutoff, spam-word flags, and all-caps % for any subject — before you hit send.", "email subject line", "writing", ["meta-description-length-checker", "call-to-action-analyzer", "word-counter"]],
  ["call-to-action-analyzer", "Call-to-Action Analyzer", "CTA clarity score — checks length, action verb, urgency, and returns a 0-100 copy rating with tips.", "call to action analyzer", "writing", ["email-subject-line-analyzer", "readability-score-checker", "word-counter"]],
  ["meeting-time-suggester", "Meeting Time Suggester", "Overlap working hours across three time zones — shows viable meeting windows in a single grid.", "meeting time suggester", "productivity", ["time-zone-converter", "meeting-cost-calculator", "pomodoro-timer"]],
  ["daily-affirmation-generator", "Daily Affirmation Generator", "Pick a theme — confidence, calm, productivity, growth — get a fresh affirmation every tap. No network.", "daily affirmation", "productivity", ["pomodoro-timer", "habit-tracker", "time-block-planner"]],
  ["reading-grade-estimator", "Reading Grade Estimator", "Flesch-Kincaid grade and interpretation for any passage — syllable-aware, client-side, no network.", "reading grade", "writing", ["readability-score-checker", "word-counter", "character-counter"]],
  ["kanban-wip-calculator", "Kanban WIP Calculator", "Suggested WIP limits per column based on team size, cycle time, and focus factor — uses Little's Law.", "kanban wip limit", "productivity", ["pomodoro-timer", "time-block-planner", "meeting-cost-calculator"]],
  ["time-block-planner", "Time-Block Planner", "Generate a time-blocked day from start/end/block size/break cadence — tallies total focus hours.", "time block planner", "productivity", ["pomodoro-timer", "kanban-wip-calculator", "daily-affirmation-generator"]],
  ["email-greeting-picker", "Email Greeting Picker", "Pick 3 greetings and 3 sign-offs tuned to relationship, time of day, and formality — in one click.", "email greeting picker", "writing", ["email-subject-line-analyzer", "call-to-action-analyzer", "meta-description-length-checker"]],
  ["copy-paste-deduplicator", "Copy-Paste Deduplicator", "Strip duplicate lines from any list — with trim, case-sensitive, and preserve-order options.", "copy paste deduplicator", "text", ["remove-duplicate-lines", "text-sorter", "whitespace-remover"]],
  ["typing-wpm-to-words-per-hour", "Typing WPM to Words Per Hour", "Convert typing WPM into words, pages, chapters, and books per day, week, and year — factors productivity.", "words per hour", "productivity", ["typing-speed-test", "reading-time-estimator", "time-block-planner"]],
];

let src = readFileSync("lib/pages.ts", "utf8");

// Walk PAGES array to find its TRUE closing `];` (after depth returns to 0 from opening `[`).
const pagesStartMarker = "export const PAGES: Page[] = [";
const markerStart = src.indexOf(pagesStartMarker);
if (markerStart === -1) throw new Error("PAGES start marker missing");
// openBracket is the LAST char of the marker (the `[`)
const openBracket = markerStart + pagesStartMarker.length - 1;
let depth = 1, i = openBracket + 1, inStr = false, q = "", esc = false;
while (i < src.length && depth > 0) {
  const c = src[i];
  if (inStr) {
    if (esc) esc = false;
    else if (c === "\\") esc = true;
    else if (c === q) inStr = false;
  } else if (c === '"' || c === "'" || c === "`") { inStr = true; q = c; }
  else if (c === "[") depth++;
  else if (c === "]") depth--;
  i++;
}
if (depth !== 0) throw new Error("Unbalanced PAGES brackets");
const closeBracket = i - 1; // position of the `]` that closes PAGES
console.log("PAGES closes at offset:", closeBracket, "(next 3:", JSON.stringify(src.slice(closeBracket, closeBracket + 3)), ")");

const esc2 = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const guideManifest = guides
  .map(([slug, title, description, keyword, ctaTarget]) => {
    const related = [ctaTarget, "ai-prompt-generator", "ai-token-counter"].filter((s, idx, a) => a.indexOf(s) === idx).slice(0, 3);
    const relatedArr = related.map((s) => `"${s}"`).join(", ");
    const h1 = title.split(" — ")[0];
    return `  { slug: "${slug}", type: "article", category: "ai",
    title: "${esc2(title)}",
    h1: "${esc2(h1)}",
    description: "${esc2(description)}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    guideCategory: "ai",
    published: true },`;
  })
  .join("\n");

const toolManifest = tools
  .map(([slug, title, description, keyword, category, related]) => {
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

const insertBlock = "\n" + guideManifest + "\n" + toolManifest + "\n";
src = src.slice(0, closeBracket) + insertBlock + src.slice(closeBracket);
writeFileSync("lib/pages.ts", src);
console.log("pages.ts patched:", guides.length, "guides +", tools.length, "tools");
