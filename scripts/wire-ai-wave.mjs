// Wire 50 AI-agent guides + 50 new tools into registries + lib/pages.ts manifest
// + reciprocal related[] for guide CTAs.
import { readFileSync, writeFileSync } from "node:fs";

// --- 50 AI-agent guide definitions ---
// [slug, h1-title, description, keyword, ctaTarget]
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

// --- 50 tool definitions ---
// [slug, ClassName, h1-title, description, keyword, category, related[], explainer, howToUse[3]]
const tools = [
  ["llm-context-window-calculator", "LlmContextWindowCalculator", "LLM Context Window Calculator", "Check if your input + output tokens fit in any major LLM (GPT-4o, Claude, Gemini, Llama, Mistral) — see headroom and percent used.", "llm context window", "ai", ["ai-token-counter", "ai-cost-estimator", "ai-model-compare"], "Plan whether your prompt + expected reply fits inside a model's context window. Compares GPT-4o, Claude, Gemini, Llama, and Mistral side by side.", ["Enter input tokens.", "Enter expected output tokens.", "Read headroom per model."]],
  ["ai-cost-estimator", "AiCostEstimator", "AI Cost Estimator", "Estimate daily, monthly, and yearly API cost for GPT-4o, Claude, Gemini, and more based on your traffic and token usage.", "ai cost estimator", "ai", ["ai-token-counter", "llm-context-window-calculator", "embedding-cost-estimator"], "Plug in requests-per-day and token sizes to see your monthly LLM bill before it arrives.", ["Set requests per day.", "Set avg input and output tokens.", "Pick the model and read the monthly estimate."]],
  ["system-prompt-builder", "SystemPromptBuilder", "System Prompt Builder", "Compose a focused system prompt from a role, tone, constraints, and output format — copy-ready for any LLM.", "system prompt builder", "ai", ["ai-prompt-generator", "prompt-improver", "chain-of-thought-formatter"], "Fill role, tone, constraints, and format — get a copy-ready system prompt that works in any API.", ["Pick role and tone.", "List constraints and output format.", "Copy the generated prompt."]],
  ["agent-json-validator", "AgentJsonValidator", "Agent JSON Validator", "Paste tool-call or agent-output JSON — parse, pretty-print, highlight errors, and count keys and depth.", "agent json validator", "ai", ["json-formatter", "json-schema-to-ts", "http-header-explainer"], "Validate JSON emitted by agents and tool calls — with line numbers and key counts.", ["Paste the JSON.", "Read parse status and errors.", "Copy the pretty-printed output."]],
  ["ai-regex-generator", "AiRegexGenerator", "AI Regex Generator", "Describe what you want to match in plain English — get a canonical regex (email, URL, phone, UUID, etc.) plus a live test.", "ai regex generator", "ai", ["regex-tester", "regex-to-english", "agent-json-validator"], "Turn plain-English descriptions into battle-tested regex, with live testing against a sample string.", ["Describe the match.", "Pick a sample string.", "Copy the regex."]],
  ["jailbreak-risk-scorer", "JailbreakRiskScorer", "Jailbreak Risk Scorer", "Score an input prompt 0-10 for jailbreak risk — flags common prompt-injection patterns and DAN-style attempts.", "jailbreak risk scorer", "ai", ["system-prompt-builder", "ai-regex-generator", "ai-prompt-generator"], "Heuristic score for jailbreak and prompt-injection risk — fast smoke test before sending to a model.", ["Paste the input.", "Read the score and flagged terms.", "Harden your system prompt accordingly."]],
  ["ai-sampling-settings-helper", "AiSamplingSettingsHelper", "AI Sampling Settings Helper", "Recommended temperature, top_p, top_k, and penalties for different use cases — code, creative, factual, reasoning.", "ai sampling settings", "ai", ["system-prompt-builder", "ai-cost-estimator", "ai-model-compare"], "Get recommended temperature, top_p, top_k, and penalty settings for your use case — with a short reason why.", ["Pick your use case.", "Read the recommended settings.", "Apply them to your API call."]],
  ["chain-of-thought-formatter", "ChainOfThoughtFormatter", "Chain-of-Thought Formatter", "Wrap any question in a structured Understand → Plan → Execute → Verify CoT template to boost reasoning quality.", "chain of thought", "ai", ["system-prompt-builder", "ai-prompt-generator", "prompt-improver"], "Wrap a question in a Chain-of-Thought scaffold that consistently lifts reasoning quality.", ["Paste the question.", "Review the CoT template.", "Copy into your prompt."]],
  ["embedding-cost-estimator", "EmbeddingCostEstimator", "Embedding Cost Estimator", "Total tokens and cost for embedding a document corpus — compare OpenAI, Voyage, Cohere, and more at once.", "embedding cost", "ai", ["ai-cost-estimator", "ai-token-counter", "llm-context-window-calculator"], "Estimate embedding cost for a corpus — compare OpenAI, Voyage, Cohere side by side.", ["Enter document count and avg tokens.", "Pick embedding models.", "Read total cost per provider."]],
  ["ai-output-length-estimator", "AiOutputLengthEstimator", "AI Output Length Estimator", "Predict how many tokens an LLM will generate for summaries, rewrites, code, or essays — budget your max_tokens.", "ai output length", "ai", ["ai-token-counter", "ai-cost-estimator", "llm-context-window-calculator"], "Estimate how long an LLM response will be by task type — budget max_tokens without truncation.", ["Pick the task type.", "Enter input tokens.", "Read the output estimate."]],
  ["dockerfile-lint-helper", "DockerfileLintHelper", "Dockerfile Lint Helper", "Scan a Dockerfile for common smells — latest tag, no USER, ADD for URLs, secrets in RUN, missing HEALTHCHECK, and more.", "dockerfile lint", "dev", ["http-header-explainer", "env-file-parser", "json-formatter"], "Linter-grade check for Dockerfile smells before you ship an image.", ["Paste the Dockerfile.", "Read issue list with line numbers.", "Fix and re-check."]],
  ["git-commit-message-helper", "GitCommitMessageHelper", "Git Commit Message Helper", "Build a conventional-commit message from type/scope/subject/body — ready to paste into git commit.", "git commit message", "dev", ["semver-bumper", "slug-generator", "markdown-formatter"], "Compose a conventional-commit message with the right tags, scopes, and breaking-change signals.", ["Pick type and scope.", "Write a short subject.", "Copy the formatted message."]],
  ["semver-bumper", "SemverBumper", "Semver Bumper", "Bump a version across major/minor/patch — see exactly what changes and when to pick each.", "semver bumper", "dev", ["git-commit-message-helper", "semver-diff", "package-json-lint"], "Pick major, minor, or patch — and understand the compatibility contract behind each.", ["Enter current version.", "Pick the bump type.", "Copy the next version."]],
  ["bash-command-explainer", "BashCommandExplainer", "Bash Command Explainer", "Paste any bash pipeline — get a plain-English explanation of each command and its flags.", "bash command explainer", "dev", ["cron-expression-explainer", "curl-command-builder", "regex-tester"], "Decode any bash pipeline into a clear explanation with flag meanings.", ["Paste the command.", "Read the breakdown.", "Copy the annotations."]],
  ["api-rate-limit-calculator", "ApiRateLimitCalculator", "API Rate Limit Calculator", "Given req/sec limit, concurrency, and latency — compute effective throughput and when you'll saturate.", "api rate limit", "dev", ["bash-command-explainer", "api-cost-calculator", "load-time-calculator"], "Figure out effective throughput and saturation point for any rate-limited API.", ["Enter req/sec limit.", "Enter concurrency and latency.", "Read effective throughput."]],
  ["json-schema-to-ts", "JsonSchemaToTs", "JSON Schema to TypeScript", "Paste a JSON sample — get a clean TypeScript interface inferred automatically.", "json schema to typescript", "dev", ["json-formatter", "agent-json-validator", "yaml-to-json"], "Turn any JSON sample into a TypeScript interface — no build tools required.", ["Paste JSON.", "Review the interface.", "Copy into your .ts file."]],
  ["openapi-endpoint-counter", "OpenapiEndpointCounter", "OpenAPI Endpoint Counter", "Paste an OpenAPI 3 spec — see paths by method, operation IDs, and count endpoints at a glance.", "openapi endpoint counter", "dev", ["json-formatter", "json-schema-to-ts", "http-header-explainer"], "Get a fast inventory of any OpenAPI spec — paths, methods, and operation IDs.", ["Paste the spec.", "Read method counts.", "Scan the operation list."]],
  ["http-header-explainer", "HttpHeaderExplainer", "HTTP Header Explainer", "Paste raw headers — get plain-English meanings and security implications for each Cache-Control, CSP, HSTS.", "http header explainer", "dev", ["http-status-code-lookup", "mime-type-lookup", "curl-command-builder"], "Decode raw HTTP headers with security-relevant context for each.", ["Paste response headers.", "Read explanations.", "Fix risky settings."]],
  ["websocket-frame-parser", "WebsocketFrameParser", "WebSocket Frame Parser", "Decode raw WebSocket frame bytes — FIN, opcode, mask, payload length, masking key, and unmasked payload.", "websocket frame parser", "dev", ["hex-to-binary", "binary-text-encoder", "http-header-explainer"], "Parse WebSocket frames at the byte level — catch mask and payload bugs early.", ["Paste hex bytes.", "Read parsed fields.", "Verify the payload."]],
  ["dotenv-generator", "DotenvGenerator", "Dotenv Generator", "Turn a VAR=value list into a validated .env file — with auto-generated 32-hex secrets and duplicate detection.", "dotenv generator", "dev", ["env-file-parser", "hash-generator", "uuid-generator"], "Produce a clean .env with auto-generated secrets and duplicate warnings.", ["List your vars.", "Click generate secrets.", "Copy the .env."]],
  ["freelancer-tax-reserve-calculator", "FreelancerTaxReserveCalculator", "Freelancer Tax Reserve Calculator", "Set aside the right % of gross for federal, self-employment, and state taxes — monthly reserve amount in one click.", "freelancer tax reserve", "money", ["freelance-rate-calculator", "invoice-generator", "tax-calculator"], "Reserve the right tax % of every freelance dollar — federal, SE, and state in one view.", ["Enter gross income.", "Pick state and SE status.", "Read monthly reserve."]],
  ["home-equity-loan-calculator", "HomeEquityLoanCalculator", "Home Equity Loan Calculator", "Max borrowable against your home equity — monthly HELOC payment, total interest, and LTV check in one place.", "home equity loan", "money", ["mortgage-calculator", "refinance-calculator", "loan-calculator"], "See how much equity you can borrow and what it'll cost monthly.", ["Enter home value and mortgage balance.", "Set LTV cap and rate.", "Read payment and max draw."]],
  ["employer-401k-match-optimizer", "Employer401kMatchOptimizer", "401(k) Match Optimizer", "Pick a contribution % that captures the full employer match without over-contributing to an unmatched tier.", "401k match optimizer", "money", ["401k-calculator", "roth-ira-calculator", "retirement-calculator"], "Maximize your employer match without wasting unmatched contributions.", ["Enter salary.", "Enter match formula.", "Read optimal contribution %."]],
  ["roth-vs-traditional-breakeven", "RothVsTraditionalBreakeven", "Roth vs Traditional Breakeven", "Compare Roth and Traditional tax math — see the breakeven retirement tax rate and which wins for your scenario.", "roth vs traditional", "money", ["roth-ira-calculator", "401k-calculator", "retirement-calculator"], "Roth or Traditional? Compare on current and expected retirement rates side by side.", ["Enter current marginal rate.", "Enter expected retirement rate.", "Read the winner."]],
  ["annuity-payment-calculator", "AnnuityPaymentCalculator", "Annuity Payment Calculator", "Compute periodic payments for an annuity — principal, rate, term, and frequency all supported.", "annuity payment", "money", ["compound-interest-calculator", "loan-calculator", "savings-goal-calculator"], "Standard annuity math — monthly, quarterly, or annual payments on any principal and rate.", ["Enter principal and rate.", "Set term and frequency.", "Read the periodic payment."]],
  ["dividend-reinvestment-calculator", "DividendReinvestmentCalculator", "Dividend Reinvestment Calculator", "Project DRIP growth over years — yield, price growth, and monthly contributions all modeled.", "dividend reinvestment", "money", ["compound-interest-calculator", "savings-goal-calculator", "fire-number-calculator"], "See the long-run power of reinvested dividends with your own yield and contribution assumptions.", ["Enter starting balance.", "Set yield and growth rate.", "Read the ending balance."]],
  ["tax-bracket-visualizer", "TaxBracketVisualizer", "Tax Bracket Visualizer", "See exactly how much of your income falls into each 2025 federal bracket — effective and marginal rates in one view.", "tax bracket visualizer", "money", ["tax-calculator", "paycheck-calculator", "freelancer-tax-reserve-calculator"], "Stop guessing how brackets work — see your income slot into each tier with effective and marginal rates.", ["Enter taxable income.", "Pick filing status.", "Read per-bracket amounts."]],
  ["fire-number-calculator", "FireNumberCalculator", "FIRE Number Calculator", "Your financial-independence target — lean, regular, and fat FIRE numbers based on your annual expenses and SWR.", "fire number", "money", ["retirement-calculator", "savings-goal-calculator", "dividend-reinvestment-calculator"], "Calculate your FIRE number at lean, regular, and fat levels in one view.", ["Enter annual expenses.", "Set SWR.", "Read all three FIRE targets."]],
  ["net-salary-to-gross-calculator", "NetSalaryToGrossCalculator", "Net Salary to Gross Calculator", "Got a take-home number you need? Back-solve the gross salary that nets it after federal, FICA, and state.", "net to gross salary", "money", ["paycheck-calculator", "salary-to-hourly-calculator", "tax-bracket-visualizer"], "Work backwards from desired net pay to the gross salary you need to ask for.", ["Enter desired net.", "Pick filing status and state.", "Read required gross."]],
  ["cost-of-living-adjuster", "CostOfLivingAdjuster", "Cost of Living Adjuster", "Equivalent salary between two cities based on COL indices — plus the absolute and percent delta.", "cost of living adjuster", "money", ["paycheck-calculator", "apartment-affordability-calculator", "moving-cost-calculator"], "See what salary you'd need in a new city to keep your current lifestyle.", ["Enter current salary.", "Set both COL indices.", "Read equivalent salary."]],
  ["one-rep-max-calculator", "OneRepMaxCalculator", "One-Rep Max Calculator", "Estimate your 1RM from a set of N reps — Epley, Brzycki, Lombardi, Mayhew formulas side by side.", "one rep max", "health", ["strength-training-calculator", "calorie-calculator", "protein-intake-calculator"], "Get your 1RM across four formulas and load targets for every training % band.", ["Enter weight and reps.", "Read 1RM per formula.", "Use the % table for programming."]],
  ["ovulation-window-calculator", "OvulationWindowCalculator", "Ovulation Window Calculator", "Fertile window, likely ovulation day, and next period estimate from last period date and cycle length.", "ovulation window", "health", ["pregnancy-calculator", "menstrual-cycle-calculator", "conception-calculator"], "Find your fertile window, ovulation day, and next period estimate.", ["Enter last period date.", "Set cycle length.", "Read fertile window."]],
  ["electrolyte-replacement-calculator", "ElectrolyteReplacementCalculator", "Electrolyte Replacement Calculator", "Water, sodium, and potassium targets for endurance training — tuned to body weight, sweat rate, and climate.", "electrolyte replacement", "health", ["water-intake-calculator", "calorie-calculator", "running-pace-calculator"], "Dial in sodium, potassium, and water for any training length and climate.", ["Set body weight.", "Pick sweat rate and climate.", "Read per-hour targets."]],
  ["vitamin-d-dose-calculator", "VitaminDDoseCalculator", "Vitamin D Dose Calculator", "Suggested daily IU for maintenance or deficiency repletion — accounting for age and sun exposure.", "vitamin d dose", "health", ["calorie-calculator", "water-intake-calculator", "protein-intake-calculator"], "Get a starting IU recommendation — always confirm with your provider.", ["Enter age and level if known.", "Set sun exposure.", "Read suggested IU."]],
  ["calories-per-macro-estimator", "CaloriesPerMacroEstimator", "Calories Per Macro Estimator", "Total kcal from protein/carbs/fat/fiber plus percent breakdown — catches low-protein diets instantly.", "calories per macro", "health", ["macro-calculator", "calorie-calculator", "protein-intake-calculator"], "Totals and percentages for any macro split — protein flag built in.", ["Enter grams of each macro.", "Read kcal and split %.", "Adjust until balanced."]],
  ["paint-gallons-calculator", "PaintGallonsCalculator", "Paint Gallons Calculator", "Gallons of paint for any room — factors wall count, coats, door/window subtraction, and spread rate.", "paint gallons", "home", ["wallpaper-roll-calculator", "tile-count-calculator", "lawn-fertilizer-calculator"], "Buy the right number of gallons — no second trip to the store.", ["Enter room dimensions.", "Set coats and spread rate.", "Read gallons needed."]],
  ["wallpaper-roll-calculator", "WallpaperRollCalculator", "Wallpaper Roll Calculator", "Rolls needed for any room — factors roll width, length, pattern repeat, and waste allowance.", "wallpaper roll", "home", ["paint-gallons-calculator", "tile-count-calculator", "furniture-fit-calculator"], "Rolls and waste for any room — saves you from mid-project trips to the store.", ["Enter wall dimensions.", "Set roll size and repeat.", "Read rolls plus waste."]],
  ["lawn-fertilizer-calculator", "LawnFertilizerCalculator", "Lawn Fertilizer Calculator", "Pounds of fertilizer for any lawn — based on sqft, nitrogen target, and bag N percentage.", "lawn fertilizer", "home", ["paint-gallons-calculator", "wallpaper-roll-calculator", "tile-count-calculator"], "Apply the right nitrogen without over- or under-feeding.", ["Enter lawn sqft.", "Set N target and bag %.", "Read pounds needed."]],
  ["furniture-fit-calculator", "FurnitureFitCalculator", "Furniture Fit Calculator", "Does that sofa fit? Check clearance, walkway, and rotation options before the delivery truck arrives.", "furniture fit", "home", ["paint-gallons-calculator", "wallpaper-roll-calculator", "apartment-affordability-calculator"], "Check furniture clearance and walkway room before you buy.", ["Enter room dimensions.", "Enter piece dimensions.", "Read fit and walkway."]],
  ["tile-count-calculator", "TileCountCalculator", "Tile Count Calculator", "Tiles and boxes for any area — tile size, waste allowance, and per-box count all supported.", "tile count", "home", ["paint-gallons-calculator", "wallpaper-roll-calculator", "lawn-fertilizer-calculator"], "Figure out tiles and boxes needed — with a sane waste buffer.", ["Enter area to tile.", "Set tile size and waste %.", "Read tiles and boxes."]],
  ["email-subject-line-analyzer", "EmailSubjectLineAnalyzer", "Email Subject Line Analyzer", "Length, preview cutoff, spam-word flags, and all-caps % for any subject — before you hit send.", "email subject line", "writing", ["meta-description-length-checker", "call-to-action-analyzer", "word-counter"], "Score subject lines on length, spam risk, and caps before you send.", ["Paste the subject.", "Read the score and flags.", "Tweak until clean."]],
  ["call-to-action-analyzer", "CallToActionAnalyzer", "Call-to-Action Analyzer", "CTA clarity score — checks length, action verb, urgency, and returns a 0-100 copy rating with tips.", "call to action analyzer", "writing", ["email-subject-line-analyzer", "readability-score-checker", "word-counter"], "Rate your CTA on length, verb strength, urgency, and clarity.", ["Paste the CTA.", "Read the score.", "Apply the suggestions."]],
  ["meeting-time-suggester", "MeetingTimeSuggester", "Meeting Time Suggester", "Overlap working hours across three time zones — shows viable meeting windows in a single grid.", "meeting time suggester", "productivity", ["time-zone-converter", "meeting-cost-calculator", "pomodoro-timer"], "Find viable meeting times across three time zones in one view.", ["Pick three timezones.", "Set working hours.", "Read the overlap grid."]],
  ["daily-affirmation-generator", "DailyAffirmationGenerator", "Daily Affirmation Generator", "Pick a theme — confidence, calm, productivity, growth — get a fresh affirmation every tap. No network.", "daily affirmation", "productivity", ["pomodoro-timer", "habit-tracker", "gratitude-journal-prompts"], "Four themes of affirmations — curated, local, and refreshed per tap.", ["Pick a theme.", "Tap generate.", "Copy or save."]],
  ["reading-grade-estimator", "ReadingGradeEstimator", "Reading Grade Estimator", "Flesch-Kincaid grade and interpretation for any passage — syllable-aware, client-side, no network.", "reading grade", "writing", ["readability-score-checker", "word-counter", "character-counter"], "Get a Flesch-Kincaid grade and plain-English verdict for any passage.", ["Paste the text.", "Read the grade.", "Edit to hit your target."]],
  ["kanban-wip-calculator", "KanbanWipCalculator", "Kanban WIP Calculator", "Suggested WIP limits per column based on team size, cycle time, and focus factor — uses Little's Law.", "kanban wip limit", "productivity", ["pomodoro-timer", "time-block-planner", "meeting-cost-calculator"], "Size WIP limits correctly so work flows instead of piles up.", ["Enter team size.", "Set cycle time and focus.", "Read per-column caps."]],
  ["time-block-planner", "TimeBlockPlanner", "Time-Block Planner", "Generate a time-blocked day from start/end/block size/break cadence — tallies total focus hours.", "time block planner", "productivity", ["pomodoro-timer", "kanban-wip-calculator", "daily-affirmation-generator"], "Build a time-blocked day in seconds with auto-breaks and focus tally.", ["Set start and end.", "Pick block and break size.", "Fill in the table."]],
  ["email-greeting-picker", "EmailGreetingPicker", "Email Greeting Picker", "Pick 3 greetings and 3 sign-offs tuned to relationship, time of day, and formality — in one click.", "email greeting picker", "writing", ["email-subject-line-analyzer", "call-to-action-analyzer", "meta-description-length-checker"], "Never stare at a blank email again — get context-appropriate greetings and sign-offs.", ["Pick recipient type.", "Set formality.", "Copy greeting and sign-off."]],
  ["copy-paste-deduplicator", "CopyPasteDeduplicator", "Copy-Paste Deduplicator", "Strip duplicate lines from any list — with trim, case-sensitive, and preserve-order options.", "copy paste deduplicator", "text", ["remove-duplicate-lines", "text-sorter", "whitespace-remover"], "Clean up pasted lists — dedupe with control over trim, case, and order.", ["Paste the list.", "Pick the options.", "Copy the clean output."]],
  ["typing-wpm-to-words-per-hour", "TypingWpmToWordsPerHour", "Typing WPM to Words Per Hour", "Convert typing WPM into words, pages, chapters, and books per day, week, and year — factors productivity.", "words per hour", "productivity", ["typing-speed-test", "reading-time-estimator", "time-block-planner"], "Translate raw WPM into real-world writing output at your productivity factor.", ["Enter WPM.", "Set hours per day and productivity.", "Read daily and yearly output."]],
];

// ---- ID helpers ----
const toIdent = (slug) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

// ---- 1. Patch content/guides/registry.tsx ----
let regSrc = readFileSync("content/guides/registry.tsx", "utf8");

const lastImportAnchor = `import * as ConnectAgentMcp from "./how-to-connect-an-agent-to-mcp-tools";`;
if (!regSrc.includes(lastImportAnchor)) throw new Error("Missing guide import anchor");
const guideImports = guides.map(([slug]) => `import * as ${toIdent(slug)} from "./${slug}";`).join("\n");
regSrc = regSrc.replace(lastImportAnchor, `${lastImportAnchor}\n${guideImports}`);

const lastMapAnchor = `  "how-to-connect-an-agent-to-mcp-tools": {
    intro: ConnectAgentMcp.intro,
    body: ConnectAgentMcp.body,
    cta: {
      label: "Compare models before wiring MCP tools — free AI model compare.",
      targetSlug: "ai-model-compare",
    },
  },`;
if (!regSrc.includes(lastMapAnchor)) throw new Error("Missing guide map anchor");

const guideMap = guides
  .map(([slug, , , , ctaTarget]) => `  "${slug}": {
    intro: ${toIdent(slug)}.intro,
    body: ${toIdent(slug)}.body,
    cta: {
      label: "Try our companion tool — free and private.",
      targetSlug: "${ctaTarget}",
    },
  },`)
  .join("\n");

regSrc = regSrc.replace(lastMapAnchor, `${lastMapAnchor}\n${guideMap}`);
writeFileSync("content/guides/registry.tsx", regSrc);
console.log("guides registry patched:", guides.length, "entries");

// ---- 2. Patch components/tools/registry.tsx ----
let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");

// Insert dynamic imports right before `export const TOOL_REGISTRY`
const toolImports = tools
  .map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`)
  .join("\n");
const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
if (!toolSrc.includes(registryAnchor)) throw new Error("Missing TOOL_REGISTRY anchor");
toolSrc = toolSrc.replace(registryAnchor, `// Wave 12 — AI agents + utilities wave (100 new pages)\n${toolImports}\n\n${registryAnchor}`);

// Insert registry entries before final `};` — need the LAST `};` at file end
// Find final `};` (last occurrence) by searching backwards
const lastRegEnd = toolSrc.lastIndexOf("};");
if (lastRegEnd === -1) throw new Error("Missing registry close");
const toolEntries = tools
  .map(([slug, cls, , , , , , explainer, howToUse]) => {
    const howToStr = howToUse.map((s) => `      "${s.replace(/"/g, '\\"')}",`).join("\n");
    return `  "${slug}": {
    render: () => <${cls} />,
    explainer: (
      <>
        <p>${explainer.replace(/"/g, '&quot;')}</p>
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
console.log("tools registry patched:", tools.length, "entries");

// ---- 3. Patch lib/pages.ts manifest (both guides and tools) ----
let pages = readFileSync("lib/pages.ts", "utf8");

// Find closing `];` of PAGES array (last `];` before module end — simplest: last `];`)
// Actually, look for `];\n` — then insert before that.
const pagesClose = pages.lastIndexOf("];");
if (pagesClose === -1) throw new Error("Missing PAGES close");

const guideManifest = guides
  .map(([slug, title, description, keyword, ctaTarget]) => {
    const related = [ctaTarget, "ai-prompt-generator", "system-prompt-builder"].filter((s, i, a) => a.indexOf(s) === i).slice(0, 3);
    const relatedArr = related.map((s) => `"${s}"`).join(", ");
    const h1 = title.split(" — ")[0];
    return `  { slug: "${slug}", type: "article", category: "ai",
    title: "${title.replace(/"/g, '\\"')}",
    h1: "${h1.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    guideCategory: "ai",
    published: true },`;
  })
  .join("\n");

const toolManifest = tools
  .map(([slug, , title, description, keyword, category, related]) => {
    const relatedArr = related.map((s) => `"${s}"`).join(", ");
    return `  { slug: "${slug}", type: "tool", category: "${category}",
    title: "${title.replace(/"/g, '\\"')}",
    h1: "${title.replace(/"/g, '\\"')}",
    description: "${description.replace(/"/g, '\\"')}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    published: true },`;
  })
  .join("\n");

pages = pages.slice(0, pagesClose) + guideManifest + "\n" + toolManifest + "\n" + pages.slice(pagesClose);
writeFileSync("lib/pages.ts", pages);
console.log("manifest patched:", guides.length, "guides +", tools.length, "tools");
