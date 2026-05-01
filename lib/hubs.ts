/**
 * Curated "Best X for Y" hub pages. Each hub is a landing page at
 * /best/[slug] that groups existing tools around a persona or intent
 * (freelancers, students, devs, SEO, finance). Hubs are critical for
 * long-tail SEO because they rank for "free tools for freelancers",
 * "best seo tools free", etc. — high-intent queries the individual
 * tool pages can't target.
 *
 * Each hub references live tool slugs from lib/pages.ts. If a slug is
 * removed there, build will fail loudly (dynamicParams = false blocks
 * unknown pages), which is the desired behavior.
 */

export interface HubPick {
  slug: string;
  /** One-sentence pitch for this tool, in the context of this hub. */
  pitch: string;
}

export interface Hub {
  slug: string;            // URL segment under /best
  title: string;           // <title>
  h1: string;              // visible H1
  description: string;     // meta description (140–160 chars)
  keyword: string;         // primary keyword
  eyebrow: string;         // small uppercase label above H1
  intro: string;           // 2–3 sentences of intro prose
  picks: HubPick[];        // curated tool slugs with pitches
  sections?: { heading: string; body: string }[]; // optional explainer sections
  relatedHubs?: string[];  // slugs of other hubs to cross-link
}

export const HUBS: Hub[] = [
  {
    slug: "free-tools-for-freelancers",
    title: "Best Free Tools for Freelancers — Invoicing, Pricing & Productivity",
    h1: "Best Free Tools for Freelancers",
    description:
      "Free tools for freelancers: invoice generator, freelance rate calculator, tax estimator, cash-flow tracker, and more. No signup, browser-based, works offline.",
    keyword: "free tools for freelancers",
    eyebrow: "Curated list · 12 tools",
    intro:
      "Running a freelance business means wearing every hat: sales, accounting, scheduling, and delivery. These twelve tools cover the money side (rates, invoices, taxes, cash flow), the client side (pricing quotes, QR-coded payment links, UTM-tracked proposals), and the focus side (pomodoro, deadline math). Every tool runs in your browser, saves nothing to a server, and costs nothing.",
    picks: [
      { slug: "freelance-rate-calculator", pitch: "Work out the hourly rate you actually need to charge to hit your income target — factoring in taxes, benefits, and unpaid admin time." },
      { slug: "hourly-rate-calculator", pitch: "Convert between hourly, daily, and annual pay in both directions, so you can quote confidently on any contract length." },
      { slug: "invoice-generator", pitch: "Generate a clean, professional invoice PDF in your browser — no Zoho, no FreshBooks, no monthly fee." },
      { slug: "pricing-calculator", pitch: "Price a fixed-scope project by combining cost, margin, and complexity multipliers. Useful for quoting clients without underselling." },
      { slug: "tax-calculator", pitch: "Estimate your quarterly self-employment tax so the April surprise doesn't wreck your cash flow." },
      { slug: "cash-flow-calculator", pitch: "Track money in vs. money out over 12 weeks, so you see the crunch before it arrives — not after." },
      { slug: "startup-runway-calculator", pitch: "If you're transitioning to full-time freelance, this tells you exactly how many months your savings last at your current burn." },
      { slug: "subscription-cost-calculator", pitch: "Add up every recurring SaaS tool on your card. Most freelancers discover $200–$400/mo in forgotten subscriptions." },
      { slug: "pomodoro-timer", pitch: "25/5 focus cycles with a silent in-browser timer. Stops the 'email-every-10-minutes' pattern that quietly kills your hourly rate." },
      { slug: "deadline-calculator", pitch: "Counts real working days to a deadline, skipping weekends. Useful for quoting turnaround on contracts." },
      { slug: "qr-code-generator", pitch: "Generate a QR code pointing at your Stripe link, PayPal.me, or Wise invoice — stick it on a printable invoice for instant payment." },
      { slug: "utm-builder", pitch: "Build tracked links for every channel you pitch on — so you can tell which outreach actually books calls." },
    ],
    sections: [
      {
        heading: "The three tools every new freelancer needs on day one",
        body: "If you're just starting out, skip the fancy stack. Open the Freelance Rate Calculator, set a number you can live on, work backward to an hourly rate, and use the Invoice Generator to send your first bill. Everything else — time trackers, Asana, QuickBooks — is optional for the first twelve months. Revenue first, then infrastructure.",
      },
      {
        heading: "Tax, savings, and the 30-percent rule",
        body: "A common rule of thumb for US freelancers is to move 30 percent of every invoice straight into a separate tax account. Use the Tax Calculator to refine that number for your state, filing status, and deductions. If the 30 percent feels tight, that's a pricing signal — raise your rates until it isn't.",
      },
    ],
    relatedHubs: ["free-finance-calculators", "free-tools-for-students"],
  },
  {
    slug: "free-tools-for-students",
    title: "Best Free Tools for Students — Study, Writing, Time & Budget",
    h1: "Best Free Tools for Students",
    description:
      "Free tools for students: Pomodoro timer, word counter, GPA calculator, weekly planner, readability checker, and more. No account, no ads, just the tools.",
    keyword: "free tools for students",
    eyebrow: "Curated list · 13 tools",
    intro:
      "School rewards consistency: small, repeated blocks of study, on-time assignments, essays that hit the word count and read cleanly. These thirteen tools make the boring mechanics faster so you can spend more time actually learning. No signup, no upsell, works on a Chromebook as well as a phone.",
    picks: [
      { slug: "pomodoro-timer", pitch: "The 25-minute focus block that most study YouTubers swear by. Open a tab, press start, learn more in one hour than three." },
      { slug: "word-counter", pitch: "Paste an essay, see words, characters, reading time. Essential when the rubric says 'between 1,200 and 1,500 words'." },
      { slug: "gpa-calculator", pitch: "Calculate your GPA using a 4.0 scale (including weighted honors/AP) to know exactly what grade you need next semester." },
      { slug: "grade-calculator", pitch: "Given your current grade and upcoming weights, work out the minimum score you need on the final to keep an A." },
      { slug: "daily-planner", pitch: "Time-block a single day — classes, study, breaks, sleep — in a printable browser-based sheet." },
      { slug: "weekly-planner", pitch: "A seven-day view with assignment slots, perfect for planning a study week around due dates." },
      { slug: "deadline-calculator", pitch: "Counts business days between 'today' and the paper due date, so a Sunday-night panic becomes a Tuesday-morning outline." },
      { slug: "readability-score-checker", pitch: "Paste a draft, see its Flesch-Kincaid grade level. Target 10–12 for most college essays, lower for AP exam responses." },
      { slug: "text-summarizer", pitch: "Paste a chapter or article, get a short summary you can use to jog your memory the night before the exam." },
      { slug: "typing-speed-test", pitch: "Speed up your typing and note-taking with a 60-second browser test that measures WPM and accuracy." },
      { slug: "to-do-list", pitch: "A dead-simple task list that lives in your browser — no Notion, no signup, no lost assignments." },
      { slug: "time-zone-converter", pitch: "If you're on an exchange semester or doing group work across time zones, this makes meeting math trivial." },
      { slug: "age-calculator", pitch: "Calculate exact age between two dates in years, months, and days — handy for history timelines or psychology papers." },
    ],
    sections: [
      {
        heading: "The single highest-leverage habit in college",
        body: "If you can only change one thing, change how you plan the week. Open the Weekly Planner every Sunday evening, block out every class, every deadline, and every social thing you've already committed to. The empty slots are your study time. This takes ten minutes and saves you dozens of hours a semester.",
      },
      {
        heading: "Essays: write first, edit second",
        body: "Most college writing gets graded on clarity more than vocabulary. Write your first draft without editing, then run it through the Readability Checker. If it's grade 13+, rewrite the longest sentences until it drops to 10–12. This single step often moves a B paper to an A.",
      },
    ],
    relatedHubs: ["free-tools-for-freelancers", "free-dev-tools"],
  },
  {
    slug: "free-dev-tools",
    title: "Best Free Developer Tools — Formatters, Generators & Debug Utilities",
    h1: "Best Free Developer Tools",
    description:
      "Free developer tools: JSON formatter, regex tester, JWT decoder, hash generator, UUID generator, cron builder, and more. No signup, all in-browser.",
    keyword: "free developer tools",
    eyebrow: "Curated list · 18 tools",
    intro:
      "Every developer keeps an open tab of one-off utilities: formatters, decoders, generators, cheat-sheet lookups. These eighteen cover 95 percent of daily 'just check this one thing' needs. Everything runs client-side so you can paste a JWT, a JSON blob, or a password without worrying about what leaves your laptop.",
    picks: [
      { slug: "json-formatter", pitch: "Paste ugly JSON, get pretty JSON — with syntax errors highlighted. The workhorse of every backend dev's bookmarks bar." },
      { slug: "regex-tester", pitch: "Test regex against real input, see matches highlighted, export to JavaScript, Python, or PHP syntax." },
      { slug: "password-generator", pitch: "Generate a strong random password with configurable length and character classes — never use the 'admin123' default again." },
      { slug: "uuid-generator", pitch: "Generate UUID v4 in bulk — useful when seeding test data or stubbing IDs in a fixture file." },
      { slug: "base64-encoder-decoder", pitch: "Encode/decode Base64 in both directions. Handles URL-safe variants and file uploads." },
      { slug: "jwt-decoder", pitch: "Paste a JWT, see the header and payload decoded — without sending the token to someone else's server." },
      { slug: "html-formatter", pitch: "Pretty-print an HTML blob, including inline CSS and JS, with configurable indent." },
      { slug: "sql-formatter", pitch: "Format a SQL query across multiple dialects (Postgres, MySQL, SQLite, SQL Server). Makes code review readable." },
      { slug: "hash-generator", pitch: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes of any input string — in your browser, no round-trip." },
      { slug: "cron-expression-builder", pitch: "Build a cron expression with a visual picker, see the next five runs, copy into crontab or a scheduler config." },
      { slug: "url-encoder-decoder", pitch: "URL-encode or decode any string, including special characters and Unicode. Useful when debugging redirects." },
      { slug: "diff-checker", pitch: "Paste two blobs of text, see a side-by-side diff. No git required, no repo, just the diff." },
      { slug: "http-status-code-lookup", pitch: "Look up any HTTP status code with a plain-English meaning and a 'what to do about it' note." },
      { slug: "mime-type-lookup", pitch: "Look up the MIME type for any file extension, or the reverse — what extension fits a MIME type." },
      { slug: "gitignore-generator", pitch: "Build a .gitignore from common stacks (Node, Python, macOS, Windows, JetBrains) in two clicks." },
      { slug: "json-to-typescript", pitch: "Paste a JSON blob, get a TypeScript interface — saves ten minutes every time you integrate a new API." },
      { slug: "regex-builder", pitch: "Build a regex by checking off what you want to match — no memorizing lookaheads and character classes." },
      { slug: "css-to-tailwind", pitch: "Paste raw CSS, get the equivalent Tailwind utility classes. Useful when converting a legacy stylesheet." },
    ],
    sections: [
      {
        heading: "Keep this tab open",
        body: "Most of these tools are keyboard-first and single-purpose by design. Pin the JSON Formatter, Regex Tester, and JWT Decoder tabs in your browser and you'll save several minutes every day — across a year, that's dozens of hours you get back.",
      },
      {
        heading: "Why client-side matters for developer tools",
        body: "A lot of online formatters and decoders proxy your input through their server. That's fine for a Lorem Ipsum generator, catastrophic for a production JWT. Every tool on this site runs entirely in the browser. Paste a token, a password, or an auth header, and nothing leaves the device.",
      },
    ],
    relatedHubs: ["free-seo-tools", "free-tools-for-freelancers"],
  },
  {
    slug: "free-seo-tools",
    title: "Best Free SEO Tools — Meta, Schema, Keywords & Snippet Preview",
    h1: "Best Free SEO Tools",
    description:
      "Free SEO tools: SERP snippet preview, schema markup generator, FAQ schema, meta tag generator, headline analyzer, keyword density checker, and more.",
    keyword: "free seo tools",
    eyebrow: "Curated list · 13 tools",
    intro:
      "On-page SEO is mostly about getting the same ten details right on every page: title length, meta description, canonical, schema, image alt text, internal links. These thirteen tools cover those details without the $99/mo Semrush-adjacent spyglass. Use them as you write, not as a post-launch audit.",
    picks: [
      { slug: "serp-snippet-preview", pitch: "See exactly how your page will appear in Google search results — truncated title, description, URL — before you publish." },
      { slug: "meta-tag-generator", pitch: "Generate a full set of meta tags (title, description, OG, Twitter, canonical) with one form. Paste into your <head>." },
      { slug: "schema-markup-generator", pitch: "Build JSON-LD schema for Article, Product, LocalBusiness, FAQ, Event, and more — the rich-result coverage most blogs skip." },
      { slug: "faq-schema-generator", pitch: "Turn a Q&A block into FAQPage JSON-LD. Google often shows a 'people also ask' style expansion for these in mobile results." },
      { slug: "open-graph-generator", pitch: "Build the og:title, og:description, og:image tags that control how your page looks when shared on Facebook, LinkedIn, or Slack." },
      { slug: "robots-txt-generator", pitch: "Generate a sensible robots.txt with common disallows for admin, staging, and tracking parameters — plus a sitemap pointer." },
      { slug: "title-tag-length-checker", pitch: "Check whether your <title> is under Google's ~60-character display limit, in pixels not characters (accounts for wide letters)." },
      { slug: "meta-description-length-checker", pitch: "Check meta description pixel-width against Google's truncation point. Better than character counts because 'm' and 'i' are not the same width." },
      { slug: "headline-analyzer", pitch: "Score a blog headline on word balance, length, and power-word usage — an emotion-based heuristic that correlates with CTR." },
      { slug: "keyword-density-checker", pitch: "Count how often a keyword appears in your page vs. the total word count, to avoid over-stuffing (or under-targeting)." },
      { slug: "utm-builder", pitch: "Build properly formatted UTM links so Analytics actually attributes traffic to the right campaign and medium." },
      { slug: "alt-text-helper", pitch: "Draft alt text for an image using a structured prompt — descriptive, short, and not stuffed with the focus keyword." },
      { slug: "readability-score-checker", pitch: "Check Flesch reading ease on your post. Google doesn't use this directly, but lower grade level usually wins on mobile." },
    ],
    sections: [
      {
        heading: "On-page SEO as a 10-minute checklist",
        body: "Before you publish any post, spend ten minutes running through this tool list. Meta Tag Generator for the <head>, SERP Snippet Preview to check how it reads in results, Schema Markup Generator for Article JSON-LD, Keyword Density Checker so you're between 0.5 and 2 percent on the focus term, and Headline Analyzer for the <h1>. Skipping this costs you CTR for the lifetime of the page.",
      },
      {
        heading: "Schema is the highest-leverage five-minute task",
        body: "Article schema, FAQ schema, and BreadcrumbList schema together unlock rich-result eligibility on basically any content page. Run your page through the Schema Markup Generator and FAQ Schema Generator — then test it at search.google.com/test/rich-results. If it passes, you've just given Google three more surfaces to show your page.",
      },
    ],
    relatedHubs: ["free-dev-tools", "free-finance-calculators"],
  },
  {
    slug: "free-finance-calculators",
    title: "Best Free Finance Calculators — Loans, Taxes, Retirement & Budget",
    h1: "Best Free Finance Calculators",
    description:
      "Free finance calculators: mortgage, loan, compound interest, budget, tax, 401(k), Roth IRA, retirement, debt payoff. No signup, in-browser, mobile-friendly.",
    keyword: "free finance calculators",
    eyebrow: "Curated list · 13 tools",
    intro:
      "Most life-changing money decisions are also basic math with a calculator: how much house, how much retirement, how much a loan really costs, how fast a credit card gets paid off. These thirteen calculators cover the ones that matter. None of them asks for an email, none of them sells your data to a mortgage broker.",
    picks: [
      { slug: "loan-calculator", pitch: "Monthly payment and total interest on any loan — car, personal, student, or business. Three inputs, instant math." },
      { slug: "mortgage-calculator", pitch: "Full mortgage payment breakdown including principal, interest, taxes, and insurance — with an amortization preview." },
      { slug: "compound-interest-calculator", pitch: "The most important calculator in investing: see what monthly contributions grow into over 10, 20, 30 years." },
      { slug: "budget-calculator", pitch: "50/30/20 budget split — needs, wants, savings — with live percentages from your monthly income." },
      { slug: "tax-calculator", pitch: "Estimate your federal income tax given filing status, income, and standard deduction. No IRS login required." },
      { slug: "401k-calculator", pitch: "Project your 401(k) balance at retirement, including employer match and realistic return assumptions." },
      { slug: "roth-ira-calculator", pitch: "Tax-free growth projection on Roth IRA contributions — the calculator that nudges most people to actually open one." },
      { slug: "retirement-calculator", pitch: "Are you on track? Enter current balance, monthly savings, and target age to see the answer without spreadsheet math." },
      { slug: "debt-payoff-calculator", pitch: "Compare avalanche vs. snowball payoff strategies on your actual balances — and see how fast extra payments change the finish line." },
      { slug: "paycheck-calculator", pitch: "Work out take-home pay from gross salary, accounting for federal tax, FICA, and retirement deductions." },
      { slug: "savings-goal-calculator", pitch: "Given a target ($20k emergency fund, $50k down payment), see how much to save per month to hit a date." },
      { slug: "net-worth-calculator", pitch: "Assets minus liabilities, with a worksheet to fill in. Track it quarterly and you'll see whether your financial life is actually improving." },
      { slug: "tip-calculator", pitch: "Bill total, tip percent, and split between people — the one you'll actually use most weeks of the year." },
    ],
    sections: [
      {
        heading: "The three numbers most people never calculate",
        body: "If you do nothing else, calculate three things: your net worth today (Net Worth Calculator), your monthly take-home pay (Paycheck Calculator), and the compound growth on contributing 10 percent of that for 30 years (Compound Interest Calculator). Those three numbers reframe most money decisions. A $400 monthly subscription habit looks different when you can see it as $490,000 of foregone retirement.",
      },
      {
        heading: "Order of operations for a financial plan",
        body: "A rough order that works for most people: build a one-month emergency fund, pay off anything above 8 percent APR (Debt Payoff Calculator), capture the full 401(k) match, build three to six months of expenses (Savings Goal Calculator), then max a Roth IRA (Roth IRA Calculator), then increase 401(k) contributions. Every step after 'capture the match' is optional, but running the compound interest math will make step-six feel urgent.",
      },
    ],
    relatedHubs: ["free-tools-for-freelancers", "free-seo-tools"],
  },
  {
    slug: "best-ai-tools-2026",
    title: "Best AI Tools (2026): Free + Paid Picks for Real Workflows",
    h1: "Best AI Tools (2026)",
    description:
      "The 2026 AI tool stack: cost calculators, model trackers, comparison tools, and budgeters for ChatGPT, Claude, Gemini, DeepSeek, Kimi, Perplexity. All free.",
    keyword: "best ai tools",
    eyebrow: "Curated list · 12 tools",
    intro:
      "Picking the right AI in 2026 is a real spending decision. These 12 tools help you compare costs across Anthropic, OpenAI, Google, DeepSeek; calculate what prompt caching and batch APIs save; track frontier model releases; and budget your AI subscriptions before they balloon. Every tool runs in your browser, no signup, no data stored.",
    picks: [
      { slug: "frontier-model-tracker", pitch: "Live tracker of every frontier AI model: Claude 4.7/4.6/4.5, GPT-5/mini, Gemini 3 Pro, DeepSeek R1/V3.2, Kimi K2, Grok 4, Llama 4. Filter by capability." },
      { slug: "ai-feature-comparison-matrix", pitch: "Vision, voice, video, tools, agents, memory — every feature × every major AI tool in one matrix." },
      { slug: "ai-rate-limit-tracker", pitch: "Current RPM, TPM, and daily quota limits across Anthropic, OpenAI, Google, DeepSeek, Perplexity, xAI." },
      { slug: "gemini-vs-chatgpt-cost-calculator", pitch: "Compare per-token API pricing across Gemini 3 Pro/2.5 Pro/Flash and GPT-5/mini/nano at your real volume." },
      { slug: "claude-vs-deepseek-cost-calculator", pitch: "DeepSeek is 10x cheaper than Claude at ~95% the quality. See your savings switching at your real volume." },
      { slug: "prompt-cache-savings-calculator", pitch: "Anthropic, OpenAI, and Gemini all give 90% off cached input tokens. Calculate your monthly savings." },
      { slug: "batch-api-savings-calculator", pitch: "Batch APIs from Anthropic, OpenAI, Google, DeepSeek give 50% off for async work. Calculate the savings." },
      { slug: "ai-agent-loop-cost-estimator", pitch: "Agent loops accumulate context every step. Triangular-sum cost across 7 frontier models." },
      { slug: "ai-coding-tool-cost-comparison", pitch: "9 AI coding plans compared by team size: GitHub Copilot, Cursor Pro/Ultra, Windsurf, Claude Pro/Max, Cody, Continue.dev." },
      { slug: "embeddings-cost-comparison", pitch: "8 embedding providers compared by cost-per-million-tokens, dimensions, and MTEB benchmark scores." },
      { slug: "multimodal-prompt-cost-estimator", pitch: "Estimate cost when prompts include images, video frames, or audio. Standard token-per-image conversions." },
      { slug: "ai-monthly-cost-budgeter", pitch: "Track every AI subscription and API spend in one place. Set a monthly budget, see your over/under at a glance." },
    ],
    sections: [
      {
        heading: "The 5 levers that cut your AI bill",
        body: "Prompt caching (90% off cached input). Batch API (50% off for async). Right-sized model (Haiku not Sonnet, Sonnet not Opus for routine work). Off-peak DeepSeek (50% off again). Self-host for sustained workloads. Most teams underutilize all five and end up paying 3-5x what they need to. Run your numbers through the calculators above before signing any annual contract.",
      },
      {
        heading: "Picking the right model in 2026",
        body: "Default to Claude Sonnet 4.6 or GPT-5 for general use; reach for Opus / o-pro only when you've measured a real quality gap. Use DeepSeek V3.2 for high-volume agent loops where total cost dominates. Use Gemini 2.5/3 Pro for native multimodal or 2M context. Self-host Qwen 3.5 or Llama 3.3 if privacy or cost matters more than latency. The frontier-model-tracker above keeps the lineup current.",
      },
    ],
    relatedHubs: ["free-dev-tools", "free-seo-tools"],
  },
  {
    slug: "best-fitness-tools-2026",
    title: "Best Fitness Tools (2026): Zone 2, VO2 Max, Pickleball + More",
    h1: "Best Fitness Tools (2026)",
    description:
      "Free fitness tools for 2026 trends: zone 2 heart rate, VO2 max, sauna, cold plunge, pickleball rating, run club distance, step count, BMI, calorie + macro calculators.",
    keyword: "best fitness tools 2026",
    eyebrow: "Curated list · 12 tools",
    intro:
      "The 2026 fitness conversation moved from gym programming to longevity science. Zone 2 cardio, VO2 max, sauna protocols, cold plunge, pickleball, and step targets all dominate the discourse. These twelve free tools cover the math behind each, with no pseudoscience and no $20 monthly subscription.",
    picks: [
      { slug: "zone-2-heart-rate-calculator", pitch: "Personalized zone 2 cardio range (Karvonen / Maffetone / %max). The longevity-research-backed cardio zone." },
      { slug: "vo2-max-estimator", pitch: "Three field tests (Cooper / Rockport / resting HR) plus age + sex norms. VO2 max correlates with all-cause mortality more than most other markers." },
      { slug: "sauna-protocol-calculator", pitch: "Build a sauna protocol from goal + experience. Based on the Finnish KIHD longevity data — 40% mortality reduction at 4-7 sessions/week." },
      { slug: "cold-plunge-protocol-builder", pitch: "Goal-tuned cold plunge protocol with safety + execution notes. Strength athletes: never within 4h of lifting." },
      { slug: "pickleball-rating-calculator", pitch: "DUPR-style 2.0–7.0 rating from your recent results. With level descriptions for benchmarking." },
      { slug: "run-club-distance-calculator", pitch: "Distance + pace + energy by level + target pace. Plus etiquette tips for the 2026 run-club explosion." },
      { slug: "step-count-target-calculator", pitch: "Personalized daily step target by age + goal. Beyond the 10,000-step myth (which was a 1965 marketing campaign)." },
      { slug: "bmi-calculator", pitch: "BMI in metric and imperial with healthy-range context. Imperfect but a useful starting point." },
      { slug: "calorie-calculator", pitch: "Daily calorie target for maintenance, cut, or bulk based on activity level + goals." },
      { slug: "macro-calculator", pitch: "Protein / carbs / fat split by goal. Pair with the protein-target debunking article." },
      { slug: "running-pace-calculator", pitch: "Convert pace, time, and distance any direction. For beginners through marathon training." },
      { slug: "ideal-weight-calculator", pitch: "Ideal weight by height + frame size, multiple formulas. Useful for setting realistic targets." },
    ],
    sections: [
      {
        heading: "The 2026 longevity stack",
        body: "Three things move the needle most for adults: sustained zone 2 cardio (4-5 hr/wk), strength training (2-3&times;/wk), and walking volume (8-10K steps/day). Sauna (4-7 sessions/wk) is the cherry on top with the strongest single-intervention mortality data. Cold plunges add mood + recovery benefits but don't substitute for the fundamentals.",
      },
      {
        heading: "What's overhyped",
        body: "Mouth tape, blue-light glasses, melatonin, fasted cardio, expensive supplement stacks. Most of the longevity needle moves with: zone 2 + lifting + sleep + protein + fiber + hydration. That stack is boring and free. Don't replace it with $40/mo subscriptions.",
      },
    ],
    relatedHubs: ["free-finance-calculators", "free-tools-for-students"],
  },
  {
    slug: "best-tools-for-remote-workers",
    title: "Best Tools for Remote Workers (2026): AI, Productivity, Health",
    h1: "Best Tools for Remote Workers (2026)",
    description:
      "Free tools for remote workers in 2026: AI cost calculators, ergonomic desk checker, eye strain timer, dopamine detox planner, focus tools, time-zone converter.",
    keyword: "best tools for remote workers",
    eyebrow: "Curated list · 11 tools",
    intro:
      "Remote work is settled territory in 2026 — most knowledge workers are hybrid 3-2 or fully remote. The constraints are different than they were in 2020: AI is part of the daily stack, the home office matters more, and screen-time hygiene is a real performance variable. These eleven free tools cover the practical math.",
    picks: [
      { slug: "ergonomic-desk-setup-checker", pitch: "Target desk, chair, monitor heights for your body. Fixes 80% of common pain patterns." },
      { slug: "eye-strain-break-calculator", pitch: "20-20-20 rule timer with screen-hours planning. Tiny investment for big returns." },
      { slug: "pomodoro-timer", pitch: "25/5 focus cycles. Stops the 'check email every 10 minutes' pattern that quietly kills your output." },
      { slug: "time-zone-converter", pitch: "Schedule across teams without DST mistakes. Returns ambiguity-free meeting times." },
      { slug: "ai-monthly-cost-budgeter", pitch: "Track every ChatGPT / Claude / Cursor / Perplexity subscription before it balloons." },
      { slug: "ai-coding-tool-cost-comparison", pitch: "9 AI coding plans compared — Copilot, Cursor, Claude Code, Windsurf — at any team size." },
      { slug: "subscription-fatigue-auditor", pitch: "Kill-list builder with annual savings. Most households cut $400-1200/year." },
      { slug: "dopamine-detox-planner", pitch: "Stimuli-reset by length + strictness. Honest framing without pseudoscience." },
      { slug: "to-do-list", pitch: "Tab-based to-do that survives reloads. No login, no sync to a server." },
      { slug: "habit-tracker", pitch: "Weekly habit grid for the 1% improvements that compound." },
      { slug: "weekly-planner", pitch: "Time-blocked weekly view, browser-based. Print or use on screen." },
    ],
    sections: [
      {
        heading: "The 4-day work week + flexibility",
        body: "Most companies landed on hybrid 3-2 by 2026, but flexibility (compressed schedules, 4-day weeks, async-first norms) is a real lever. Read the 4-day work week evidence guide for what actually moves productivity vs status-quo bias.",
      },
      {
        heading: "AI fluency is the differentiator",
        body: "Going from 'uses ChatGPT once a week' to 'uses 3 frontier models daily, knows when each wins, uses prompt caching' is the productivity gap that matters in 2026. The AI fluency skills guide breaks down the 8 sub-skills.",
      },
    ],
    relatedHubs: ["best-ai-tools-2026", "free-tools-for-freelancers"],
  },
  {
    slug: "best-money-tools-2026",
    title: "Best Money Tools (2026): Low-Buy, Subscriptions, Budget, Tax",
    h1: "Best Money Tools (2026)",
    description:
      "Free money tools for 2026 trends: low-buy year tracker, subscription auditor, AI cost budgeter, budget calculator, tax bracket visualizer, FICA, vacation payout, more.",
    keyword: "best money tools 2026",
    eyebrow: "Curated list · 12 tools",
    intro:
      "Money in 2026 is dominated by two themes: subscription bloat (especially AI tools) and lifestyle creep. These twelve tools tackle both, plus the boring fundamentals (taxes, retirement, paycheck) that haven't changed but most people still skip running the numbers on.",
    picks: [
      { slug: "low-buy-year-tracker", pitch: "Log discretionary purchases, mark needed vs want. The 2026 cultural answer to lifestyle creep." },
      { slug: "subscription-fatigue-auditor", pitch: "Build a kill list with annual savings. Most households cut $400-1200/year." },
      { slug: "ai-monthly-cost-budgeter", pitch: "Track every AI subscription + API spend in one place. Set a budget." },
      { slug: "budget-calculator", pitch: "50/30/20 split with live percentages. Sustainable monthly framework." },
      { slug: "tax-bracket-visualizer", pitch: "See exactly how much income falls in each 2026 federal bracket. Marginal + effective rate." },
      { slug: "fica-tax-calculator", pitch: "Social Security + Medicare withholding for W-2 or self-employed. Including additional Medicare." },
      { slug: "vacation-payout-calculator", pitch: "PTO payout after federal supplemental + FICA + state withholding." },
      { slug: "compound-interest-calculator", pitch: "What monthly contributions become over 10, 20, 30 years. The most important calculator in investing." },
      { slug: "401k-calculator", pitch: "Project 401(k) balance at retirement with employer match + return assumptions." },
      { slug: "debt-payoff-calculator", pitch: "Avalanche vs snowball comparison on your actual balances. Extra payment math." },
      { slug: "net-worth-calculator", pitch: "Assets - liabilities. Track quarterly to see whether your financial life is actually improving." },
      { slug: "savings-goal-calculator", pitch: "Given a target ($20K emergency, $50K down payment), how much to save monthly to hit a date." },
    ],
    sections: [
      {
        heading: "The subscription audit playbook",
        body: "Average US household: 12 paid subscriptions, uses 6. The audit takes 30 minutes — pull receipts from your card, Apple ID, Google Play, PayPal, Amazon. Mark cost-per-use. Anything over $5/use with under 4 uses/month → cancel today. Average savings: $400-1200/year.",
      },
      {
        heading: "The low-buy mindset",
        body: "Low-buy ≠ no-buy. Low-buy: monthly budget for wants ($25-100), strict need-vs-want filter, 30-day cooling rule on purchases over $50. Sustainable for a year. Logging IS the intervention — most people cut 30-50% of category spending without feeling deprived.",
      },
    ],
    relatedHubs: ["free-finance-calculators", "best-tools-for-remote-workers"],
  },
];

export function getHubBySlug(slug: string): Hub | undefined {
  return HUBS.find((h) => h.slug === slug);
}

export function hubHref(hub: Hub): string {
  return `/best/${hub.slug}`;
}
