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
];

export function getHubBySlug(slug: string): Hub | undefined {
  return HUBS.find((h) => h.slug === slug);
}

export function hubHref(hub: Hub): string {
  return `/best/${hub.slug}`;
}
