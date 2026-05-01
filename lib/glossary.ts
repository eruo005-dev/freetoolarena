/**
 * Glossary entries at /learn/[slug]. Each entry is a focused definition
 * page (400-700 words) for a single term. Ranks for "what is X" / "X
 * definition" / "X meaning" queries, which are high volume and extremely
 * top-of-funnel — the user often has no other intent than to understand
 * the term, which is perfect for internal linking to tools and guides.
 *
 * Each entry includes:
 * - tldr — 1-2 sentence definition (shown prominently)
 * - longDefinition — paragraph expanding the definition in context
 * - whyItMatters — paragraph on when/why you'd care
 * - relatedTerms — sibling glossary slugs
 * - relatedToolSlugs — tools (or guides) the reader should open next
 * - tags — category tags used for grouping on the /learn index
 *
 * DefinedTerm JSON-LD is emitted on each page for rich result eligibility.
 */

export interface GlossaryEntry {
  slug: string;
  /** The term itself — "APR", "Compound interest", etc. */
  term: string;
  /** SEO title. */
  title: string;
  /** Meta description (140-160 chars). */
  description: string;
  /** Primary keyword. */
  keyword: string;
  /** Short 1-2 sentence definition shown as the lead. */
  tldr: string;
  /** 1-3 paragraph expanded definition. */
  longDefinition: string;
  /** Paragraph on when the reader actually cares about this term. */
  whyItMatters: string;
  /** Optional example paragraph. */
  example?: string;
  /** Optional formula (rendered in monospace). */
  formula?: string;
  /** Short Q&A pairs for FAQ schema (3-5 ideal). */
  faq?: { q: string; a: string }[];
  /** Related glossary slugs — appear at the bottom. */
  relatedTerms?: string[];
  /** Tool / guide slugs to cross-link. Must be live in pages.ts. */
  relatedToolSlugs?: string[];
  /** Tags for grouping on /learn index. */
  tags: ("finance" | "seo" | "dev" | "web-perf" | "ai" | "health" | "lifestyle")[];
}

export const GLOSSARY: GlossaryEntry[] = [
  // --------------------------------- Finance
  {
    slug: "apr",
    term: "APR",
    title: "APR (Annual Percentage Rate) — Definition and Example",
    description:
      "APR is the yearly cost of borrowing expressed as a percentage, including interest plus most fees. Complete definition, example, and how APR differs from APY and interest rate.",
    keyword: "apr definition",
    tldr: "APR (Annual Percentage Rate) is the total yearly cost of borrowing money, expressed as a percentage — including the interest rate plus most fees. It's the number you should compare between loans, not the 'interest rate'.",
    longDefinition:
      "The Annual Percentage Rate standardizes how lenders disclose borrowing costs, so that borrowers can compare offers on an apples-to-apples basis. The US Truth in Lending Act requires lenders to show APR on every consumer loan — mortgage, auto, credit card, personal — exactly because raw interest rates don't include fees, points, and other charges that make a loan cost more. For a mortgage, APR includes the base rate plus origination fees, discount points, and most closing costs spread across the life of the loan. For a credit card, APR is essentially the interest rate itself (card APRs rarely have 'fees' in the APR sense, with cash-advance APR being the exception).",
    whyItMatters:
      "Two loans with the same interest rate can have very different APRs — a loan with $4,000 in origination fees will carry a meaningfully higher APR than a fee-free loan at the same headline rate. When you're comparing mortgages, auto loans, or personal loans, the APR is the fair comparison. The one catch: APR assumes you hold the loan to term. If you plan to refinance in 5 years, the upfront-fee loan might have a higher APR but be the cheaper real choice, since fewer years of the loan actually happen.",
    example:
      "A $200,000, 30-year mortgage at a 6.5% interest rate with $4,000 in closing costs has an APR of about 6.68%. A competing mortgage at 6.6% interest with $800 closing costs might have an APR of 6.63% — a lower true cost despite the higher headline rate.",
    faq: [
      {
        q: "What's the difference between APR and interest rate?",
        a: "Interest rate is just the cost of the money; APR adds in fees and is therefore a more complete picture of the loan's cost.",
      },
      {
        q: "What's the difference between APR and APY?",
        a: "APR ignores compounding; APY includes it. For borrowing, APR is the standard; for savings accounts, APY is — because compounding increases your return.",
      },
      {
        q: "Is a lower APR always better?",
        a: "Usually, but not always — a loan with higher APR but lower upfront fees can be the better choice if you plan to pay it off or refinance early.",
      },
    ],
    relatedTerms: ["apy", "compound-interest", "amortization"],
    relatedToolSlugs: ["loan-calculator", "mortgage-calculator"],
    tags: ["finance"],
  },
  {
    slug: "apy",
    term: "APY",
    title: "APY (Annual Percentage Yield) — Definition and Formula",
    description:
      "APY is the yearly return on a savings or investment product, including compounding. Definition, formula, worked example, and APY vs APR explained.",
    keyword: "apy definition",
    tldr: "APY (Annual Percentage Yield) is the total yearly return on a savings account, CD, or investment — expressed as a percentage and including the effect of compounding. When comparing savings products, APY is the fair number.",
    longDefinition:
      "APY captures the reality that money in a savings product earns returns on its own earnings — the compounding effect. A savings account paying 5.00% nominal interest but compounding daily actually earns about 5.12% APY over a year. When banks and credit unions advertise savings products, US regulation (the Truth in Savings Act) requires them to show APY, precisely because raw interest rates don't reflect compounding frequency. A 5% interest rate compounded monthly is a lower real return than the same 5% compounded daily — APY makes that difference visible.",
    formula: "APY = (1 + r/n)^n − 1   where r = nominal rate, n = compounding periods per year",
    whyItMatters:
      "APY is the number to shop with for savings accounts, CDs, money-market accounts, and bonds. A bank offering '5.25% APY' vs another offering '5.20% interest rate compounded monthly' (APY ≈ 5.33%) — the second is actually the better deal despite the lower headline. Always compare APY to APY.",
    example:
      "$10,000 in an account paying 5.00% interest compounded daily earns 5.13% APY, or $513, over a year. The same 5.00% compounded annually earns 5.00% APY, or $500. Small spread — but over 30 years on a retirement account, that difference compounds into thousands.",
    faq: [
      {
        q: "Why is APY higher than the nominal rate?",
        a: "Because compounding earns interest on interest. The more frequently an account compounds (daily > monthly > annually), the larger the gap between the nominal rate and APY.",
      },
      {
        q: "Is APY always positive?",
        a: "For savings products, yes. For investments with variable returns (stocks, crypto), 'APY' is sometimes used loosely to mean projected return — which can be negative.",
      },
    ],
    relatedTerms: ["apr", "compound-interest"],
    relatedToolSlugs: ["compound-interest-calculator", "savings-goal-calculator"],
    tags: ["finance"],
  },
  {
    slug: "compound-interest",
    term: "Compound interest",
    title: "Compound Interest — Definition, Formula and Calculator",
    description:
      "Compound interest is interest earned on both the original principal and accumulated interest. Formula, worked examples, and how small contributions become large over decades.",
    keyword: "compound interest definition",
    tldr: "Compound interest is interest earned on both your original money AND the interest it's already earned. Over long periods, this 'interest on interest' effect is what turns modest monthly contributions into retirement-level balances.",
    longDefinition:
      "Simple interest is linear — if you deposit $10,000 at 5% simple interest, you earn $500 per year, every year, forever. Compound interest is exponential — you earn $500 in year one, but now you have $10,500, so in year two you earn $525 (5% of the new balance), then $551 in year three, and so on. Over 40 years at 5% compounding annually, $10,000 grows to about $70,400. At 8% (typical stock-market average return), it grows to about $217,000. The gap between 5% and 8% doesn't look like much in year one ($300 difference) but over 40 years it's the difference between $70k and $217k — compounding rewards both time and rate.",
    formula: "A = P(1 + r/n)^(nt)   where A = end balance, P = principal, r = annual rate, n = compounds/year, t = years",
    whyItMatters:
      "Compound interest is the single most important concept in personal finance. It's why starting retirement contributions at 25 instead of 35 matters far more than the raw $10 × 12 × 10 = $1,200/mo math suggests. A 25-year-old investing $500/month at 8% has $1.75M at 65. The same person starting at 35 has only $746K — less than half. The extra decade of compounding, not the extra dollars, does most of the work.",
    example:
      "A $200/month contribution from age 22 to 65, at 8% compounding monthly, grows to approximately $930,000. The same contribution starting at age 32 grows to only $402,000. That 10-year head start is worth $528,000 of retirement money.",
    faq: [
      {
        q: "How often should my account compound?",
        a: "More frequently is better, but the difference between daily and monthly compounding is tiny (<0.05% APY). Focus on the underlying rate and consistency of contributions, not compounding frequency.",
      },
      {
        q: "Can compound interest work against me?",
        a: "Yes — credit card debt is compound interest in reverse. A $5,000 balance at 24% APR that you make minimum payments on can take 20+ years to pay off, costing 2-3× the original balance.",
      },
      {
        q: "What's the 'rule of 72'?",
        a: "A shortcut: divide 72 by the interest rate to estimate how many years it takes money to double. At 8%, money doubles in about 9 years; at 6%, about 12 years.",
      },
    ],
    relatedTerms: ["apy", "apr", "amortization"],
    relatedToolSlugs: ["compound-interest-calculator", "retirement-calculator"],
    tags: ["finance"],
  },
  {
    slug: "amortization",
    term: "Amortization",
    title: "Amortization — Definition and Mortgage Schedule Example",
    description:
      "Amortization is the process of paying off a loan with equal periodic payments, where each payment covers interest plus principal. Definition, schedule example, and why early payments are mostly interest.",
    keyword: "amortization definition",
    tldr: "Amortization is the process of paying off a loan with equal periodic payments that are split between interest and principal. In the early months, most of your payment goes to interest; as the balance shrinks, more goes to principal.",
    longDefinition:
      "An amortized loan has a fixed payment for its entire life — the total dollar amount you send the lender each month never changes. What changes is the split. On a $300,000 30-year mortgage at 6.5%, the first monthly payment of $1,896 is about $1,625 interest and only $271 principal. By the final payment 30 years later, it's flipped — $1,886 principal, $10 interest. The amortization schedule is the month-by-month table of this split. Most mortgage lenders will give you a full amortization schedule at closing, and most mortgage calculators can generate one.",
    whyItMatters:
      "Understanding amortization changes two financial decisions. First, why 'extra principal' payments are so powerful: if your early payment is 86% interest, adding $100 of principal means you skip ~$380 of future interest. Second, why buying down your rate is almost always worth it: a 0.25% rate reduction on a 30-year mortgage can save $20,000+ over the life of the loan, even though it looks like only $40/mo in savings.",
    example:
      "A $250,000 30-year mortgage at 7% has a monthly payment of about $1,663. After 60 payments (5 years), you've paid $99,780 total — and still owe about $235,000. Only $15,000 of that $99,780 went to principal. After 120 payments (10 years), you still owe about $215,000.",
    faq: [
      {
        q: "How do extra principal payments work?",
        a: "Any dollar you send beyond the required payment goes entirely to principal, shrinking the balance immediately. On a mortgage, one extra payment per year turns a 30-year loan into roughly a 26-year loan.",
      },
      {
        q: "Do all loans amortize?",
        a: "Most consumer loans do — mortgages, auto, student, personal loans. Interest-only loans and balloon loans don't amortize normally; you pay only interest for a period, then owe the full principal.",
      },
      {
        q: "Can amortization go negative?",
        a: "Yes — 'negative amortization' loans, where the monthly payment doesn't even cover interest, so the balance grows. These are rare now but were common in the 2007-era subprime boom.",
      },
    ],
    relatedTerms: ["apr", "compound-interest", "roi"],
    relatedToolSlugs: ["mortgage-calculator", "loan-calculator"],
    tags: ["finance"],
  },
  {
    slug: "roi",
    term: "ROI",
    title: "ROI (Return on Investment) — Definition and Formula",
    description:
      "ROI is a percentage measure of how much profit an investment produces relative to its cost. Formula, examples, and when ROI is the right metric (and when it isn't).",
    keyword: "roi definition",
    tldr: "ROI (Return on Investment) is a percentage that measures profit relative to the cost of an investment. It answers 'how much did I make for every dollar I put in?'",
    longDefinition:
      "ROI is the most common shorthand for investment performance — in business, finance, real estate, and marketing. It's calculated as (Gain − Cost) / Cost, expressed as a percentage. A $10,000 investment that returns $13,000 has a 30% ROI; the same investment returning $9,000 has a −10% ROI. ROI is beloved because it's simple to calculate and easy to communicate, but it has blind spots: it ignores time, risk, and alternative uses of capital. A 30% ROI in one year is totally different from a 30% ROI over ten years, but the raw ROI number doesn't distinguish.",
    formula: "ROI = (Net Gain / Cost) × 100%",
    whyItMatters:
      "ROI is useful for quick sanity checks — does this marketing campaign, software purchase, or business initiative pay back more than it costs? For longer-horizon decisions, prefer annualized ROI (CAGR) or NPV (net present value), which account for time. For comparing two investments of equal duration, ROI is perfectly fine.",
    example:
      "A $50,000 website redesign generates $85,000 of additional net revenue in its first year. ROI = ($85,000 − $50,000) / $50,000 × 100% = 70%. Same redesign, $95,000 of revenue over three years = 90% ROI total, but only ~24% annualized — a much less impressive picture.",
    faq: [
      {
        q: "What counts as a good ROI?",
        a: "Depends entirely on the asset class. Public stocks average ~7-10% annual ROI historically; real estate 8-12%; small-business investments can exceed 20%; Treasury bonds 3-5%. The right ROI is whichever beats your cost of capital.",
      },
      {
        q: "What's ROI vs IRR?",
        a: "ROI is a single-point percentage; IRR (Internal Rate of Return) is the annualized rate that accounts for when each cash flow hits. For multi-year investments, IRR is more accurate.",
      },
    ],
    relatedTerms: ["apr", "apy", "compound-interest"],
    relatedToolSlugs: ["roi-calculator", "break-even-calculator"],
    tags: ["finance"],
  },

  // --------------------------------- SEO
  {
    slug: "canonical-url",
    term: "Canonical URL",
    title: "Canonical URL — Definition and rel=canonical Example",
    description:
      "A canonical URL is the preferred version of a page when duplicate or near-duplicate versions exist. Definition, rel=canonical syntax, and when it matters for SEO.",
    keyword: "canonical url",
    tldr: "A canonical URL is the one 'official' URL for a piece of content, declared to search engines via a <link rel=\"canonical\"> tag. It tells Google 'if you find this page at multiple URLs, treat this one as the main version.'",
    longDefinition:
      "Duplicate content is ubiquitous — the same page can be reached via example.com/page, www.example.com/page, example.com/page/, example.com/page?ref=email, and many other URLs. Without guidance, Google might split ranking signals across all versions, or pick the 'wrong' one as canonical. The rel=canonical tag solves this by explicitly telling search engines which URL to prefer. It goes in the <head>: <link rel=\"canonical\" href=\"https://example.com/page\" />. Google treats this as a strong hint, not a directive — in extreme cases it may still pick a different canonical, but respecting your declaration is the default.",
    whyItMatters:
      "Canonical URLs matter for any site with tracking parameters, pagination, filters, or multiple site versions (HTTP/HTTPS, www/non-www). Without them, PageRank gets diluted across duplicates and the 'wrong' version can rank — or none at all, as Google hedges. Setting canonical tags correctly is a 30-minute fix that often unlocks meaningful traffic on medium-sized sites.",
    example:
      "An e-commerce product page at /shoes/nike-air?color=red&size=10 should have a canonical pointing at /shoes/nike-air — so Google consolidates ranking signals onto the one product URL, not scattering them across dozens of color/size variants.",
    faq: [
      {
        q: "Is a self-referencing canonical useful?",
        a: "Yes — always set canonical to the page's own URL, even on unique pages. It's explicit self-declaration and handles any stray query strings.",
      },
      {
        q: "Does canonical affect indexing?",
        a: "Google generally only indexes the canonical version. Non-canonical duplicates are crawled but rarely ranked.",
      },
      {
        q: "What about 301 redirects?",
        a: "Redirects are stronger than canonical — they consolidate URLs at the HTTP level. Use 301s when you genuinely want one URL to replace another; canonical when both URLs legitimately exist but one is preferred.",
      },
    ],
    relatedTerms: ["meta-description", "sitemap-xml", "robots-txt"],
    relatedToolSlugs: ["meta-tag-generator", "schema-markup-generator"],
    tags: ["seo"],
  },
  {
    slug: "meta-description",
    term: "Meta description",
    title: "Meta Description — Definition, Length and Example",
    description:
      "A meta description is a short HTML snippet that summarizes a page for search engines. Definition, ideal length, and examples of high-CTR meta descriptions.",
    keyword: "meta description",
    tldr: "A meta description is a 150-160 character HTML tag that summarizes a web page. Google often uses it as the search-result snippet beneath the blue title — which directly affects click-through rate.",
    longDefinition:
      "The meta description sits in a page's <head>: <meta name=\"description\" content=\"...\">. It's not directly a ranking factor in modern Google, but it heavily influences how many people click your result once it ranks. A compelling meta description can lift CTR by 20-40% vs an auto-generated one, which in turn lifts rankings over time (CTR is an indirect signal). Keep it under 160 characters so Google doesn't truncate it on desktop and under 130 for mobile. Write it like a tiny ad: include the primary keyword, make a specific promise, and imply an action.",
    whyItMatters:
      "Rankings are the hard part — getting into the top 10 for a keyword. But CTR is the quick win. A page ranking #5 with a strong meta description often outperforms a #3 page with a weak one. For established content, rewriting meta descriptions is often the highest-ROI SEO task you can do in a week.",
    example:
      "Weak: 'This page talks about mortgage calculators and helps you calculate your mortgage payment.' Strong: '30-year and 15-year mortgage calculator. Free, no signup. See monthly payment, total interest, and a full amortization table instantly.'",
    faq: [
      {
        q: "Does meta description affect ranking?",
        a: "Not directly. Google has said it's not a ranking factor. But it affects CTR, which is an indirect signal and directly affects traffic.",
      },
      {
        q: "What if I don't write one?",
        a: "Google auto-generates a snippet from the page content — usually from the opening paragraph. Results are often fine but occasionally poor (pulling a navigation menu, for example). Writing your own is always safer.",
      },
      {
        q: "Will Google always show my meta description?",
        a: "No — for about 60-70% of queries, Google shows your meta description; for the rest, it generates a snippet tailored to the specific query. You can't force the behavior.",
      },
    ],
    relatedTerms: ["canonical-url", "json-ld", "schema"],
    relatedToolSlugs: ["meta-tag-generator", "meta-description-length-checker"],
    tags: ["seo"],
  },
  {
    slug: "json-ld",
    term: "JSON-LD",
    title: "JSON-LD — Definition and Schema.org Example",
    description:
      "JSON-LD is the Google-preferred format for structured data on web pages. Definition, example markup, and which schema types unlock which rich results.",
    keyword: "json-ld",
    tldr: "JSON-LD (JSON for Linked Data) is the format Google prefers for structured data on web pages. It embeds Schema.org markup as a <script type=\"application/ld+json\"> block, telling search engines exactly what kind of content a page contains.",
    longDefinition:
      "Search engines need help understanding pages — they can parse text, but they can't always tell if '$29.99' is a product price or a shipping cost, or whether 'April 15, 2026' is a recipe's publish date or an event date. JSON-LD solves this by letting authors declare content types explicitly. Common types include Article, Product, FAQPage, HowTo, Recipe, LocalBusiness, Event, and Organization. Google, Bing, and Yandex all consume JSON-LD. JSON-LD is preferred over the older Microdata and RDFa formats because it's decoupled from the visible HTML — you can add it without changing your layout.",
    whyItMatters:
      "Structured data is the difference between a plain blue-link search result and a rich result with star ratings, FAQ expansions, image thumbnails, or price badges. Rich results have dramatically higher CTR — often 2-3× a plain result. For content pages, adding FAQPage, Article, and BreadcrumbList JSON-LD is a 30-minute task that meaningfully lifts traffic.",
    example:
      '<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Article",\n  "headline": "How to pick a mortgage",\n  "author": {"@type": "Person", "name": "Jane Doe"},\n  "datePublished": "2026-04-15"\n}\n</script>',
    faq: [
      {
        q: "Is JSON-LD the same as Schema.org?",
        a: "JSON-LD is a format; Schema.org is a vocabulary. You use JSON-LD syntax to express Schema.org types. They're complementary.",
      },
      {
        q: "Can I have multiple JSON-LD blocks on one page?",
        a: "Yes — common patterns include Article + BreadcrumbList + FAQPage on a single post. Each block is parsed independently.",
      },
      {
        q: "How do I test my JSON-LD?",
        a: "Use Google's Rich Results Test (search.google.com/test/rich-results) — it validates markup and shows which rich results are eligible.",
      },
    ],
    relatedTerms: ["schema", "canonical-url", "meta-description"],
    relatedToolSlugs: ["schema-markup-generator", "faq-schema-generator"],
    tags: ["seo"],
  },
  {
    slug: "schema",
    term: "Schema (Schema.org)",
    title: "Schema (Schema.org) — Definition and Common Types",
    description:
      "Schema.org is a shared vocabulary of structured-data types used across the web to describe content. Definition, common types, and how to pick the right one.",
    keyword: "schema.org",
    tldr: "Schema.org is a shared vocabulary of types (Article, Product, Event, FAQPage, etc.) that websites use to describe their content in a machine-readable way. Google and Bing use Schema.org to generate rich results.",
    longDefinition:
      "Schema.org was created in 2011 by Google, Microsoft, Yahoo, and Yandex to standardize how webmasters describe content to search engines. Before Schema.org, each search engine had its own markup vocabulary — a mess. Today, Schema.org has 800+ types covering almost every conceivable content form: Product, Article, Recipe, LocalBusiness, Person, Organization, Event, JobPosting, FAQPage, HowTo, Course, Movie, Book, and dozens of domain-specific types. Each type has properties (an Article has headline, author, datePublished; a Product has name, price, brand, review). Properly-typed content is eligible for rich results in search.",
    whyItMatters:
      "The difference between 'has Schema' and 'no Schema' is often the difference between a boring blue-link result and a visually prominent result with ratings, images, prices, or FAQ expansions. On e-commerce, missing Product schema means missing star ratings in search — a direct CTR loss. On blogs, missing Article + FAQPage schema misses the AI Overviews and People Also Ask inclusion that drives meaningful traffic in 2026.",
    faq: [
      {
        q: "How do I know which Schema.org type to use?",
        a: "Start with what the page actually is — a blog post is Article, a product page is Product, a how-to guide is HowTo, etc. If in doubt, pick the most specific type that fits.",
      },
      {
        q: "Can I use multiple types on one page?",
        a: "Yes — a blog post might be Article + FAQPage + BreadcrumbList. Nesting is common and encouraged.",
      },
      {
        q: "Does adding Schema guarantee rich results?",
        a: "No — Google decides case-by-case based on quality, site reputation, and query intent. Schema is necessary but not sufficient.",
      },
    ],
    relatedTerms: ["json-ld", "meta-description", "canonical-url"],
    relatedToolSlugs: ["schema-markup-generator", "faq-schema-generator"],
    tags: ["seo"],
  },
  {
    slug: "robots-txt",
    term: "robots.txt",
    title: "robots.txt — Definition and Example",
    description:
      "robots.txt is a plain-text file at the root of a website that tells crawlers which paths to allow or disallow. Definition, example syntax, and common mistakes.",
    keyword: "robots.txt",
    tldr: "robots.txt is a small text file served at /robots.txt that instructs search-engine crawlers which parts of a site they can and can't crawl. It's a suggestion, not a lock — well-behaved bots honor it.",
    longDefinition:
      "The robots.txt file has been a web standard since 1994. It supports a few directives: User-agent (which bot the rule applies to), Allow, Disallow (path patterns), and Sitemap (URL of a sitemap file). Example: 'User-agent: * / Disallow: /admin/ / Allow: / / Sitemap: https://example.com/sitemap.xml'. Note that robots.txt is public — anyone can read it. It should NEVER be used to 'hide' sensitive paths. Use auth for security; use robots.txt for crawl efficiency and de-duplication.",
    whyItMatters:
      "A misconfigured robots.txt can accidentally de-index your entire site ('Disallow: /' is a classic launch-day disaster). A properly-configured one helps search engines spend their crawl budget on pages that matter, blocking staging, filters, and parameter-heavy URLs. Most small sites don't need much in robots.txt — just allow everything and point to a sitemap.",
    example:
      "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /_next/\nDisallow: /api/\n\nSitemap: https://example.com/sitemap.xml",
    faq: [
      {
        q: "Does Disallow remove pages from Google's index?",
        a: "Not directly — it prevents crawling, but if a page is already indexed, it stays. Use a <meta name='robots' content='noindex'> tag to remove a specific page from the index.",
      },
      {
        q: "What's the difference between robots.txt and noindex?",
        a: "robots.txt controls crawling (can the bot visit this URL?); noindex controls indexing (should this URL appear in search results?). They solve different problems.",
      },
      {
        q: "Do all bots respect robots.txt?",
        a: "Major search engines do (Googlebot, Bingbot, etc.). Scrapers and malicious bots often ignore it.",
      },
    ],
    relatedTerms: ["sitemap-xml", "canonical-url"],
    relatedToolSlugs: ["robots-txt-generator"],
    tags: ["seo"],
  },
  {
    slug: "sitemap-xml",
    term: "XML sitemap",
    title: "XML Sitemap — Definition and Example",
    description:
      "An XML sitemap is a file that lists a site's URLs for search engines. Definition, example structure, and how sitemaps affect SEO.",
    keyword: "xml sitemap",
    tldr: "An XML sitemap is an XML file that lists every URL you want search engines to crawl and (usually) index. It's not a ranking factor, but it helps Google discover and re-crawl your pages faster.",
    longDefinition:
      "A sitemap follows the Sitemaps.org spec: an XML file with a root <urlset> containing one <url> per page, with optional <lastmod>, <changefreq>, and <priority> tags. Modern sitemaps can be up to 50,000 URLs or 50MB per file — beyond that, use a sitemap index that points to multiple sub-sitemaps (common pattern: one per section). Submit your sitemap via Google Search Console and Bing Webmaster Tools, and reference it in robots.txt. For large sites, per-section sitemaps (products, posts, categories) are better than one giant file — easier to debug and faster to update.",
    whyItMatters:
      "For a new site, a sitemap dramatically speeds up initial indexing. For a large site, it ensures deep pages don't get missed. For a fast-changing site, <lastmod> helps Google re-crawl just the pages that changed. Missing a sitemap won't stop Google from finding your content, but it slows discovery meaningfully — especially for deep content.",
    example:
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://example.com/</loc>\n    <lastmod>2026-04-20</lastmod>\n    <priority>1.0</priority>\n  </url>\n</urlset>',
    faq: [
      {
        q: "Do priority and changefreq matter?",
        a: "Google mostly ignores them. The essential fields are <loc> and <lastmod>. Don't spend time fine-tuning the other fields.",
      },
      {
        q: "Should I submit sitemap to Google?",
        a: "Yes — via Google Search Console. This is the fastest way to get new URLs discovered.",
      },
      {
        q: "What if my site has more than 50,000 URLs?",
        a: "Use a sitemap index — a small XML file that lists multiple sitemaps. Most CMS and frameworks support this out of the box.",
      },
    ],
    relatedTerms: ["robots-txt", "canonical-url"],
    relatedToolSlugs: ["robots-txt-generator"],
    tags: ["seo"],
  },

  // --------------------------------- Web performance
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    title: "Core Web Vitals — Definition of LCP, INP, CLS",
    description:
      "Core Web Vitals are Google's three web-performance metrics: LCP, INP, and CLS. Definition of each, targets, and how they affect SEO.",
    keyword: "core web vitals",
    tldr: "Core Web Vitals are three Google-defined metrics that measure the real-user experience of a web page: LCP (loading), INP (interactivity), and CLS (visual stability). They're a direct ranking signal as of 2021.",
    longDefinition:
      "Google introduced Core Web Vitals as part of Page Experience — the acknowledgment that fast, stable pages should rank better than slow, janky ones. The three metrics are measured on real user sessions (via CrUX, the Chrome User Experience Report) and summarized into 'Good', 'Needs Improvement', and 'Poor' categories. LCP (Largest Contentful Paint) measures loading — the time until the largest visible element renders. INP (Interaction to Next Paint, replacing FID in 2024) measures interactivity — how quickly the page responds to taps and clicks. CLS (Cumulative Layout Shift) measures visual stability — how much the page jumps around as it loads.",
    whyItMatters:
      "Core Web Vitals directly influence rankings, especially as a tiebreaker between pages of similar topical quality. More importantly, they correlate with bounce rate — slow pages lose users regardless of ranking. Hitting 'Good' on all three is a competitive table stake. Falling into 'Poor' on any one can tank rankings for pages that otherwise should perform well.",
    formula: "LCP target: ≤ 2.5s (75th percentile)\nINP target: ≤ 200ms (75th percentile)\nCLS target: ≤ 0.1 (75th percentile)",
    faq: [
      {
        q: "Are Core Web Vitals desktop or mobile?",
        a: "Both are measured, but mobile is the primary signal — Google's index has been mobile-first since 2019.",
      },
      {
        q: "How is this measured?",
        a: "On real user sessions, aggregated into the Chrome User Experience Report (CrUX). Synthetic tests like Lighthouse estimate the same metrics but don't replace CrUX for ranking.",
      },
      {
        q: "What replaced FID?",
        a: "INP (Interaction to Next Paint) replaced FID (First Input Delay) in March 2024. INP measures interaction latency across the whole session, not just the first input.",
      },
    ],
    relatedTerms: ["lcp", "cls"],
    relatedToolSlugs: [],
    tags: ["web-perf", "seo"],
  },
  {
    slug: "lcp",
    term: "LCP",
    title: "LCP (Largest Contentful Paint) — Definition and Target",
    description:
      "LCP is the time from page load start until the largest visible element finishes rendering. Definition, target (≤ 2.5s), and how to improve it.",
    keyword: "lcp",
    tldr: "LCP (Largest Contentful Paint) is the time from when a page starts loading to when the largest visible content element finishes rendering. Google's target is 2.5 seconds or less on the 75th percentile.",
    longDefinition:
      "LCP replaced older 'page load time' metrics because total load time isn't what users perceive — they care when the page looks loaded, which is usually when the biggest image, headline, or hero element has painted. LCP is measured in milliseconds and bucketed: ≤2.5s = Good, 2.5-4s = Needs Improvement, >4s = Poor. The usual LCP element is a hero image, a large heading, or a primary card. Identifying the LCP element for your page is the first step to optimization — tools like Chrome DevTools and Lighthouse will name it explicitly.",
    whyItMatters:
      "LCP is the Core Web Vital that's most often in the Poor bucket for unoptimized sites. A site with a 6-second LCP is losing rankings AND losing users who bounce before the page finishes. Fortunately, it's also the most improvable — preload the LCP image, optimize image format (WebP), size, and compression, remove render-blocking resources, and most sites move from 4s+ to under 2.5s with a day of work.",
    faq: [
      {
        q: "What counts as an LCP element?",
        a: "Images, videos, background images, and block-level text nodes. The largest visible one during page load is the LCP element.",
      },
      {
        q: "How do I improve LCP?",
        a: "The biggest wins: optimize the LCP image (WebP format, correct size, preload), reduce render-blocking JS/CSS, eliminate layout thrashing before the LCP renders, and use a CDN for static assets.",
      },
      {
        q: "Does LCP include JavaScript?",
        a: "LCP is the first render of the largest element — if JS is blocking that render, yes, JS affects LCP. But the metric itself is purely visual.",
      },
    ],
    relatedTerms: ["core-web-vitals", "cls"],
    relatedToolSlugs: [],
    tags: ["web-perf"],
  },
  {
    slug: "cls",
    term: "CLS",
    title: "CLS (Cumulative Layout Shift) — Definition and Target",
    description:
      "CLS measures unexpected layout shifts during page load. Definition, target (≤ 0.1), common causes, and how to fix them.",
    keyword: "cumulative layout shift",
    tldr: "CLS (Cumulative Layout Shift) measures how much visible content jumps around unexpectedly as a page loads. Google's target is 0.1 or less. It's the metric that scores how 'janky' a page feels.",
    longDefinition:
      "Every web user has had the experience: you're about to tap a button, an ad loads above it, the button shifts down, and you tap the ad by accident. CLS measures exactly this. Each 'shift' is scored by how much of the viewport moved and how far. Sum all shifts during the session (up to a 5-second window) and you get the CLS score. Values: ≤0.1 = Good, 0.1-0.25 = Needs Improvement, >0.25 = Poor. The most common causes are images without width/height attributes, ads and embeds injected after initial render, and custom fonts that reflow text when they load.",
    whyItMatters:
      "A bad CLS makes users distrust your page — they stop reading because content keeps moving, or they leave entirely after a mistap. Beyond UX, it's a Core Web Vital and affects rankings. Fortunately, most CLS issues have mechanical fixes: always set width/height on images and videos, reserve space for ads with a min-height, use font-display: optional or swap with fallbacks of matching metrics.",
    faq: [
      {
        q: "Do user-initiated shifts count?",
        a: "No — shifts within 500ms of a user interaction are excluded. Only unexpected shifts count.",
      },
      {
        q: "How do I fix CLS from ads?",
        a: "Always reserve space for ad units with a fixed or min-height container. An ad that loads into pre-reserved space doesn't shift anything.",
      },
      {
        q: "Does CLS include shifts below the fold?",
        a: "Yes — any shift in the viewport during the session counts. Scrolling changes what's 'in the viewport'.",
      },
    ],
    relatedTerms: ["core-web-vitals", "lcp"],
    relatedToolSlugs: [],
    tags: ["web-perf"],
  },

  // --------------------------------- Ad metrics
  {
    slug: "ctr",
    term: "CTR",
    title: "CTR (Click-Through Rate) — Definition and Formula",
    description:
      "CTR is the percentage of people who click a search result or ad relative to how many see it. Definition, formula, and what a 'good' CTR looks like.",
    keyword: "ctr",
    tldr: "CTR (Click-Through Rate) is the percentage of people who click a search result, ad, or link after seeing it. CTR = clicks / impressions × 100%. Higher CTR usually means your title and description are working.",
    longDefinition:
      "CTR is the single most important engagement metric in search and advertising. In SEO, CTR on your Google result (from Search Console data) is a leading indicator of rankings — Google treats low CTR as a signal the result doesn't match intent. In paid ads, CTR directly affects Quality Score, which determines ad cost. A position-1 search result typically has 25-35% CTR; position 10 has 1-3% CTR. Above-average CTR for your position is a strong signal you're winning clicks from higher-ranked competitors.",
    formula: "CTR = (Clicks / Impressions) × 100%",
    whyItMatters:
      "Rankings without clicks are vanity — you can rank #1 and still get nothing if your title/description aren't compelling. Monitoring CTR by query in Search Console lets you spot pages where ranking is good but snippet is weak, and a 30-minute rewrite can often lift traffic 20-50%. For ads, low CTR drives up CPC — improving CTR is often the fastest way to lower ad costs.",
    faq: [
      {
        q: "What's a good CTR for search?",
        a: "Depends on position. Top-1 averages ~30%, top-3 averages ~15%, top-10 averages ~3%. Compare to your specific position, not a universal benchmark.",
      },
      {
        q: "Does low CTR hurt rankings?",
        a: "Over time, yes — Google treats CTR as a relevance signal and can drop a low-CTR result. It's not a hard de-rank; just a nudge.",
      },
      {
        q: "How do I improve CTR?",
        a: "Rewrite meta descriptions to match query intent, add numbers and specifics to titles ('10 ways' > 'Some ways'), and add schema markup to get rich results (star ratings, FAQ expansions).",
      },
    ],
    relatedTerms: ["meta-description", "canonical-url"],
    relatedToolSlugs: ["headline-analyzer"],
    tags: ["seo"],
  },

  // ---------------------------------- AI / LLM (20)
  {
    slug: "context-window",
    term: "Context window",
    title: "Context Window — AI Definition + Why It Matters",
    description: "An AI context window is the maximum number of tokens a model can process at once — system prompt + conversation + output combined. Definition + 2026 model sizes.",
    keyword: "context window",
    tldr: "The context window is the maximum amount of text (in tokens) an AI model can process in a single request — combining your system prompt, conversation history, and output. Past the limit, the model can't 'see' earlier content.",
    longDefinition: "Context windows are measured in tokens (~4 characters or ~0.75 words each). Claude Sonnet 4.6 and Opus 4.7 have 1M tokens; Gemini 2.5/3 Pro have 2M; GPT-5 has 400k; DeepSeek V3.2 has 128k. The window includes EVERY token: system prompt + chat history + user message + tool definitions + the model's response. Models also degrade in quality near the max — most pros operate at 50-70% of rated context for production reliability.",
    whyItMatters: "Picking a model with too small a context window forces you to chunk documents, lose RAG context, or break agent loops. Conversely, paying for a 2M context model when you use 50k is wasted spend. Right-sizing the window to your actual workload is one of the bigger AI-cost levers.",
    faq: [
      { q: "How big is 1M tokens?", a: "About 750,000 words — roughly 7-8 average books, or a full medium-sized codebase." },
      { q: "What happens when I exceed the window?", a: "The provider truncates the oldest content (most APIs) or refuses the request. Either way, content past the limit is invisible to the model." },
    ],
    relatedTerms: ["token", "prompt-caching", "rag"],
    relatedToolSlugs: ["ai-context-window-planner", "llm-context-window-calculator"],
    tags: ["ai"],
  },
  {
    slug: "token",
    term: "Token",
    title: "Token (AI) — Definition + Why Token Count Matters",
    description: "An AI token is the unit AI models read and produce — roughly 4 characters or 0.75 words. Why token count matters for context, cost, and speed.",
    keyword: "ai token definition",
    tldr: "A token is the basic unit of text an LLM reads and produces. Roughly 4 characters or 0.75 words on average for English; longer for code, shorter for languages with lots of subword tokens. APIs bill by token.",
    longDefinition: "Tokenization is the first step of every LLM request. The text is split into subword pieces using BPE (byte-pair encoding) or similar. 'Hello world' is 2 tokens. 'antidisestablishmentarianism' is 4-5. Different model families use different tokenizers — GPT, Claude, Gemini, Llama all differ by 10-30% on the same text. The OpenAI tiktoken library is the most-used reference.",
    whyItMatters: "Token count drives cost, context window utilization, and (sometimes) speed. Reducing tokens by 30% via prompt compression or caching saves real money on large-scale workloads. Most users undercount their token usage because they ignore tool definitions, system prompts, and reasoning traces.",
    faq: [
      { q: "How many tokens in 1000 words?", a: "About 1,300-1,400 tokens for English. Varies by tokenizer." },
      { q: "Are output tokens billed differently?", a: "Yes — output is typically 4-5x more expensive than input across major providers." },
    ],
    relatedTerms: ["context-window", "prompt-caching"],
    relatedToolSlugs: ["ai-token-counter", "ai-context-window-planner"],
    tags: ["ai"],
  },
  {
    slug: "rag",
    term: "RAG (Retrieval-Augmented Generation)",
    title: "RAG — Retrieval Augmented Generation Definition",
    description: "RAG (Retrieval Augmented Generation) is an AI pattern that fetches relevant docs at query time and feeds them to an LLM. Definition + when to use vs fine-tuning.",
    keyword: "rag retrieval augmented generation",
    tldr: "RAG (Retrieval Augmented Generation) augments an LLM with documents retrieved at query time — typically from a vector database. The LLM grounds its answer in the retrieved text instead of relying purely on training data.",
    longDefinition: "A RAG system has three components: an embedding model that converts documents + queries to vectors, a vector database (Pinecone, Weaviate, pgvector, etc.) that stores + retrieves the most-similar documents, and an LLM that synthesizes the retrieved context into an answer. The chunking strategy (500-1500 tokens with overlap) and reranking (often via Cohere Rerank or BM25 hybrid) heavily affect quality.",
    whyItMatters: "RAG is how most production AI products use private data without retraining the model. It's cheaper than fine-tuning, easier to update, and the retrieved sources are auditable. The downside: poorly tuned RAG retrieves irrelevant chunks, leading to hallucinations.",
    faq: [
      { q: "RAG vs fine-tuning?", a: "RAG: retrieve at query time, easy to update, sources auditable. Fine-tuning: bake knowledge into model weights, faster inference, but expensive and hard to update. Most production systems start with RAG and add fine-tuning only when retrieval quality plateaus." },
      { q: "Which vector database?", a: "pgvector for most teams (just Postgres). Pinecone for managed scale. Weaviate for hybrid + multi-modal. Qdrant for self-host + speed." },
    ],
    relatedTerms: ["embeddings", "context-window"],
    relatedToolSlugs: ["embeddings-cost-comparison"],
    tags: ["ai"],
  },
  {
    slug: "embeddings",
    term: "Embeddings",
    title: "Embeddings (AI) — Definition + Use in RAG / Search",
    description: "AI embeddings are dense numerical vectors representing text meaning. Used for semantic search, RAG, recommendation. Definition + 2026 provider comparison.",
    keyword: "ai embeddings",
    tldr: "Embeddings are dense numerical vectors that represent the meaning of text (or images, audio) in a way that semantic similarity = vector closeness. They're the foundation of RAG, semantic search, recommendation, and clustering.",
    longDefinition: "An embedding model takes input (usually text) and outputs a vector of typically 512-3,072 floats. Two pieces of text with similar meaning produce vectors close together (by cosine distance). OpenAI text-embedding-3-large produces 3,072-dim vectors and dominates US production deployments. Voyage 3 and Cohere embed-v4 are competitive; BGE-M3 is the leading open-weight option.",
    whyItMatters: "Embeddings are how RAG, semantic search, and most personalization systems actually work under the hood. Embedding quality directly determines RAG retrieval quality. The model + dimension choice has cost implications (storage cost scales with dimension; inference cost scales with model size).",
    faq: [
      { q: "Best embedding model in 2026?", a: "For English: OpenAI text-embedding-3-large (highest MTEB) or Voyage 3 large. For self-host: BGE-M3 (multilingual + free). For cost: text-embedding-3-small at $0.02/1M tokens." },
      { q: "How do I use them?", a: "Embed your documents into a vector DB. At query time, embed the query and retrieve the top-k most-similar documents. Pass to LLM as context (RAG)." },
    ],
    relatedTerms: ["rag", "vector-database"],
    relatedToolSlugs: ["embeddings-cost-comparison"],
    tags: ["ai"],
  },
  {
    slug: "prompt-caching",
    term: "Prompt caching",
    title: "Prompt Caching (AI) — Save 90% on Repeated Inputs",
    description: "Prompt caching stores frequently reused parts of an AI prompt and bills cached reads at ~10% of normal input. Anthropic, OpenAI, Gemini all support it.",
    keyword: "prompt caching",
    tldr: "Prompt caching is a feature where the AI provider stores frequently reused prompt prefixes (system messages, RAG context, few-shot examples) and bills cached reads at ~10% of normal input cost.",
    longDefinition: "Anthropic, OpenAI, and Google Gemini all support prompt caching as of 2026. Implementation differs slightly: Anthropic uses explicit cache_control breakpoints with 5-min default TTL (1-hour optional). OpenAI auto-caches prefixes ≥1024 tokens for 5-10 min. Gemini has explicit context caching with 1-hour TTL. Cache hits cost roughly 10% of normal input tokens — sometimes 25% on Gemini.",
    whyItMatters: "For agentic workloads, RAG, and any app with stable system prompts, prompt caching can cut input costs 80-90%. It's the single biggest cost lever most teams miss. The fix is structural: keep stable parts (system prompt, examples, RAG context) at the start; put dynamic per-request content at the end.",
    faq: [
      { q: "How much does it save?", a: "On cache-friendly workloads (agent loops, RAG, repeated few-shot prompts), 70-90% off the input bill. Use the prompt cache savings calculator to estimate yours." },
      { q: "Does it work cross-provider?", a: "No — each provider's cache is separate. If you switch from Claude to GPT, you start fresh." },
    ],
    relatedTerms: ["token", "context-window"],
    relatedToolSlugs: ["prompt-cache-savings-calculator"],
    tags: ["ai"],
  },
  {
    slug: "fine-tuning",
    term: "Fine-tuning",
    title: "Fine-Tuning (AI) — When To Train vs Prompt vs RAG",
    description: "Fine-tuning specializes an AI model on your data via additional training. Definition + when fine-tuning beats prompting or RAG. 2026 provider options.",
    keyword: "fine tuning ai",
    tldr: "Fine-tuning is the process of further training a pretrained model on your specific data, baking in style, format, or domain knowledge that's hard to achieve with prompting alone.",
    longDefinition: "Three categories matter in 2026: full fine-tuning (rare for foundation models — too expensive), LoRA / PEFT (parameter-efficient, the standard), and RLHF / DPO (alignment fine-tuning). OpenAI, Anthropic, and Google all offer hosted fine-tuning APIs at $25-100 per million training tokens. Open-weight models (Llama, Qwen, DeepSeek) can be fine-tuned anywhere using libraries like Unsloth, Axolotl, or Hugging Face PEFT.",
    whyItMatters: "Most production teams skip fine-tuning until prompting and RAG hit a quality ceiling. Fine-tuning is the right move when: you need consistent format/style not achievable with examples, your domain has terminology the base model doesn't know well, or you're optimizing inference cost (smaller fine-tuned model > prompt-engineered larger one).",
    faq: [
      { q: "Fine-tuning vs RAG?", a: "RAG: retrieve facts at query time. Fine-tuning: bake style/format/terminology into model. They complement; you use both for serious products." },
      { q: "Cost?", a: "$25-100 per million training tokens on hosted APIs. Open-weight LoRA fine-tuning runs $50-500 of GPU time depending on model size + dataset." },
    ],
    relatedTerms: ["rag", "context-window"],
    relatedToolSlugs: ["ai-cost-estimator"],
    tags: ["ai"],
  },
  {
    slug: "agent",
    term: "AI agent",
    title: "AI Agent — Definition + What Makes One Reliable",
    description: "An AI agent is an LLM in a loop with tools — think, act, observe, repeat. Definition + what 2026 reliable-agent design looks like.",
    keyword: "ai agent definition",
    tldr: "An AI agent is an LLM running in a loop: think → call a tool → observe the result → think again. The loop continues until the task is done or a stopping condition is hit.",
    longDefinition: "A minimal agent has: an LLM (Claude Sonnet, GPT-5, etc.), a set of tools the LLM can call (web search, file edit, code execution, MCP servers), and a control loop. Modern frameworks (Claude Agent SDK, OpenAI Agents SDK, LangGraph) handle the orchestration. The hard part is reliability over long horizons — by step 30, the model is reading 80k tokens of accumulated context and prior tool outputs, which most models start to drift on.",
    whyItMatters: "Agents are the post-chatbot interface for AI. Coding agents (Claude Code, Cursor Background, Devin), research agents (Perplexity Pro Search), and operator agents (ChatGPT Operator) all use the same loop pattern. Reliability differences between models compound across 30+ steps — 95% per-step accuracy = 22% end-to-end at 30 steps.",
    faq: [
      { q: "Best model for agents?", a: "Claude Opus 4.7 leads on long-horizon agentic reliability. Sonnet 4.6 is the cost-effective default. GPT-5 is competitive but drifts sooner past ~30 steps." },
      { q: "Cost?", a: "Agent costs explode with horizon length because context accumulates. Use prompt caching aggressively. Estimate yours with the AI agent loop cost estimator." },
    ],
    relatedTerms: ["mcp", "context-window", "prompt-caching"],
    relatedToolSlugs: ["ai-agent-loop-cost-estimator", "ai-agent-platform-comparison"],
    tags: ["ai"],
  },
  {
    slug: "mcp",
    term: "MCP (Model Context Protocol)",
    title: "MCP — Model Context Protocol Definition",
    description: "MCP (Model Context Protocol) is the open standard for connecting AI assistants to tools and data sources. Anthropic-launched, supported by Claude, ChatGPT, Cursor, more.",
    keyword: "mcp model context protocol",
    tldr: "MCP (Model Context Protocol) is an open standard for connecting AI assistants to external tools and data sources. Think USB-C for AI integrations: write a server once, it works in Claude, ChatGPT, Cursor, Zed, Goose, etc.",
    longDefinition: "Anthropic launched MCP in late 2024. Servers expose three primitives: resources (read-only data), tools (callable functions), prompts (templates). Clients connect over JSON-RPC — stdio for local, HTTP/SSE for remote. Authentication is the server's responsibility. By 2026 there are hundreds of MCP servers — official ones for filesystem, GitHub, Postgres, Slack, plus vendor-published ones from Notion, Linear, Stripe, etc.",
    whyItMatters: "Before MCP, every AI integration was custom — your Slack-Claude bot couldn't be reused for Cursor. MCP unified this. If you're building with AI in 2026, learning MCP is essential — it's how you wire up 'agent + my company data + my external services' without writing N integrations.",
    faq: [
      { q: "Where do I find MCP servers?", a: "github.com/modelcontextprotocol/servers (official), or browse community MCP marketplaces. Use our MCP server picker for workflow-based recommendations." },
      { q: "Can I write my own?", a: "Yes — the protocol is well-documented at modelcontextprotocol.io. Python and TypeScript SDKs available." },
    ],
    relatedTerms: ["agent"],
    relatedToolSlugs: ["mcp-server-picker"],
    tags: ["ai"],
  },
  {
    slug: "hallucination",
    term: "Hallucination (AI)",
    title: "AI Hallucination — Definition + How to Reduce It",
    description: "An AI hallucination is when an LLM generates content that's plausible but factually wrong. Definition + 5 ways to reduce hallucinations in production.",
    keyword: "ai hallucination",
    tldr: "An AI hallucination is when an LLM generates content that's confident-sounding but factually wrong — invented citations, fake quotes, made-up APIs. The model doesn't 'know' it's wrong.",
    longDefinition: "Hallucinations stem from how LLMs work: they predict the next token based on statistical patterns, not facts. When a fact wasn't represented strongly in training, the model fills with whatever pattern feels most plausible. Common types: invented citations (legal AI horror stories), wrong dates/numbers, fake API endpoints, plausible-sounding wrong code, made-up historical events. Frontier models hallucinate less than smaller ones but still do.",
    whyItMatters: "Production AI systems must mitigate hallucinations or they fail at scale. Fix patterns: ground outputs in retrieved sources (RAG), use structured outputs (JSON mode), require citations and verify them, prefer extraction over generation when possible, and have a 'I don't know' fallback. NEVER trust uncited dates, numbers, or quotes from any LLM.",
    faq: [
      { q: "Which models hallucinate least?", a: "In 2026: Claude Opus 4.7 + Sonnet 4.6 lead on faithfulness benchmarks. GPT-5 is competitive. Gemini 2.5/3 Pro is solid. All hallucinate to some degree." },
      { q: "Does RAG fix it?", a: "It dramatically reduces hallucinations on factual questions but doesn't eliminate them. The model can still misinterpret retrieved context or fall back to training data when retrieval fails." },
    ],
    relatedTerms: ["rag", "agent"],
    relatedToolSlugs: ["prompt-injection-detector"],
    tags: ["ai"],
  },
  {
    slug: "vibe-coding",
    term: "Vibe coding",
    title: "Vibe Coding — Definition (Andrej Karpathy, 2025)",
    description: "Vibe coding (Andrej Karpathy's term) is writing software by describing intent in natural language and letting AI build + run it. Definition + 2026 toolchain.",
    keyword: "vibe coding",
    tldr: "Vibe coding is writing software by describing intent in natural language and letting AI generate, run, and debug the code — barely looking at it yourself. Coined by Andrej Karpathy in early 2025.",
    longDefinition: "Vibe coding emerged with the late-2024 wave of AI app generators: Cursor's Composer mode, Bolt.new, v0 (Vercel), Lovable, Replit Agent. The pattern: describe what you want, the AI builds it, you iterate by asking for changes ('make the buttons rounded', 'add login'). You barely read the code — you check whether the running app works.",
    whyItMatters: "Vibe coding democratizes software creation: marketers ship internal tools without engineering queues, founders prototype products in an afternoon, hobbyists scratch itches that wouldn't have been worth starting. It's NOT a substitute for craft on production / mission-critical / large-codebase work — but for prototypes and internal tools, it's transformative.",
    faq: [
      { q: "Best vibe-coding tools?", a: "Bolt.new for full-stack speed, Lovable for polished SaaS apps, v0 for UI components, Cursor + Claude Code for vibe-coding INTO existing codebases, Replit Agent for build + host." },
      { q: "Is it for production?", a: "Mostly no, in 2026. Code quality issues compound; security/perf/edge-cases need human review. Use it for prototypes; harden before production." },
    ],
    relatedTerms: ["agent"],
    relatedToolSlugs: ["ai-agent-platform-comparison"],
    tags: ["ai"],
  },
  {
    slug: "system-prompt",
    term: "System prompt",
    title: "System Prompt — Definition + Best Practices",
    description: "A system prompt is the instructions sent to an AI before user messages — defines role, style, constraints. Definition + structure that works.",
    keyword: "system prompt",
    tldr: "A system prompt is the persistent instruction sent to an LLM before user messages. It defines the AI's role, style, behavior, and constraints. Cached on most providers, so investing in a good one is cheap.",
    longDefinition: "Every modern API supports a separate system role for setup instructions. Best system prompts include: role + domain ('You are a senior engineer specializing in TypeScript'), audience ('the user is a mid-level dev'), style ('concise, no preamble'), must/never lists, and 1-2 examples of desired output. Length: 200-2,000 tokens is typical. Cached on Anthropic / Gemini / OpenAI at ~10% of normal input — keep stable.",
    whyItMatters: "A good system prompt = consistent output without repeating instructions every message. It's the highest-leverage prompt-engineering investment. With prompt caching, you pay ~10% of full price for system tokens after the first request — making longer, more detailed system prompts genuinely affordable.",
    faq: [
      { q: "How long should it be?", a: "200-2,000 tokens for most use cases. Custom GPT instructions max at 8,000 tokens. Above that, returns diminish quickly and you risk model drift." },
      { q: "Should I include examples?", a: "Yes — 1-3 examples of ideal Q&A pairs anchor the style better than abstract instructions alone." },
    ],
    relatedTerms: ["prompt-caching", "context-window"],
    relatedToolSlugs: ["system-prompt-generator", "prompt-rewriter"],
    tags: ["ai"],
  },
  {
    slug: "tool-use",
    term: "Tool use (AI)",
    title: "AI Tool Use / Function Calling — Definition",
    description: "Tool use lets an LLM call external functions (web search, code, APIs) instead of just generating text. Definition + how it works in 2026.",
    keyword: "ai tool use",
    tldr: "Tool use (also called function calling) is the ability of an LLM to invoke external functions — web search, calculator, code execution, API calls — instead of just generating text. Returns the result for the model to incorporate.",
    longDefinition: "All major LLM APIs (Anthropic, OpenAI, Google, Mistral, DeepSeek) support tool use. The pattern: define tools as JSON schemas (name + description + params). The model decides whether to call a tool, what args to pass. The runtime executes, returns the result. The model continues the conversation. Most agent frameworks layer their abstractions on top of tool use.",
    whyItMatters: "Tool use is what turns an LLM from 'text generator' into 'agent that can do things.' Without tool use, the model can only produce text from its training data. With tool use, it can search the web, query databases, run code, send emails. Reliability depends on how well-described your tools are and whether the model can choose correctly.",
    faq: [
      { q: "Which provider has best tool use?", a: "Claude Sonnet 4.6 + Opus 4.7 are most reliable on long tool-using loops. GPT-5 is competitive. Gemini 2.5 Pro improved a lot in 2025-2026." },
      { q: "MCP vs tool use?", a: "MCP is a protocol layer ON TOP of tool use that makes tools portable across clients. Native tool use is provider-specific; MCP is shared." },
    ],
    relatedTerms: ["agent", "mcp"],
    relatedToolSlugs: ["mcp-server-picker"],
    tags: ["ai"],
  },
  {
    slug: "moe",
    term: "MoE (Mixture of Experts)",
    title: "MoE (Mixture of Experts) — AI Architecture Definition",
    description: "Mixture of Experts is an AI architecture that routes inputs to a subset of expert sub-networks. Used by DeepSeek V3, Mixtral, Llama 4 Maverick.",
    keyword: "mixture of experts",
    tldr: "MoE (Mixture of Experts) is an AI architecture where the model has many specialized sub-networks ('experts') and only activates a few per token. Lets the model be huge in total parameters but cheap to run.",
    longDefinition: "Standard 'dense' models activate every parameter for every token. MoE models route each token through only a fraction (typically 2-8 of 32-256 experts). This means: total params can be 671B (DeepSeek V3.2) or 1T+ (Kimi K2), but actually-active params per token are much smaller (~20-40B), so inference cost ≈ a 30B model. Mixtral 8x7B was the model that popularized MoE; DeepSeek V3, Llama 4 Maverick, and Kimi K2 are major 2026 examples.",
    whyItMatters: "MoE is why open-weight models suddenly leaped ahead in 2025-2026. Frontier-quality models that used to require dense 70-200B dense models now run as MoE at much lower inference cost. The catch: VRAM still needs to fit all the experts (high memory floor), even though compute is cheap.",
    faq: [
      { q: "Best MoE model?", a: "For coding + agents: DeepSeek V3.2 (671B MoE). For long context: Kimi K2 (1T MoE, 1M context). For open + Western: Llama 4 Maverick (402B MoE)." },
      { q: "Can I run MoE locally?", a: "Yes if you have the VRAM. Hyperspace pods (multi-machine) make it practical without a single huge GPU." },
    ],
    relatedTerms: ["fine-tuning", "context-window"],
    relatedToolSlugs: ["open-source-llm-tracker"],
    tags: ["ai"],
  },
  {
    slug: "quantization",
    term: "Quantization",
    title: "Quantization — How AI Models Get Smaller (Q4, Q5, Q8)",
    description: "Quantization compresses AI model weights to lower bit-widths (Q4, Q5, Q8) to fit larger models on consumer hardware. Quality vs memory tradeoff explained.",
    keyword: "ai quantization",
    tldr: "Quantization compresses AI model weights from 16-bit floats (FP16) to lower bit-widths — Q8, Q5, Q4, Q3 — letting larger models fit on smaller hardware at modest quality cost.",
    longDefinition: "FP16 is the default training precision (16 bits per weight). Quantization formats reduce this: Q8_0 (8 bits, ~99.5% quality), Q5_K_M (5 bits, ~98%), Q4_K_M (4 bits, ~96%), Q3_K_M (3 bits, ~93%), IQ2_XS (2 bits, ~88%). The most popular format is Q4_K_M — sweet spot for size vs quality. GGUF (llama.cpp) and AWQ (vLLM) are the main quantization frameworks.",
    whyItMatters: "Quantization is the key reason consumer hardware can run frontier-class models. Llama 70B at FP16 = 140 GB (won't fit anywhere consumer). At Q4_K_M = 42 GB (fits a Mac Studio Ultra or pooled across 4 laptops). The 4% quality loss is rarely noticeable in practice for most workloads.",
    faq: [
      { q: "Best quantization?", a: "Q4_K_M for almost everyone — best size/quality tradeoff. Step up to Q5_K_M if you have memory headroom. Avoid below Q3 unless desperate for size." },
      { q: "Does it slow down inference?", a: "Slightly faster than FP16 in many cases (less memory bandwidth needed). Only marginal." },
    ],
    relatedTerms: ["moe"],
    relatedToolSlugs: ["local-vs-api-breakeven-calculator"],
    tags: ["ai"],
  },
  {
    slug: "vector-database",
    term: "Vector database",
    title: "Vector Database — Definition + 2026 Picks",
    description: "A vector database stores high-dimensional embeddings and supports nearest-neighbor search. Used for RAG, semantic search, recommendation. 2026 leaders.",
    keyword: "vector database",
    tldr: "A vector database stores high-dimensional embedding vectors and supports fast nearest-neighbor search (find vectors similar to a query). Foundation of RAG, semantic search, and recommendation systems.",
    longDefinition: "Two patterns: dedicated vector DBs (Pinecone, Weaviate, Qdrant, Milvus) and SQL extensions (pgvector for Postgres, sqlite-vec for SQLite). Dedicated DBs scale to billions of vectors with sub-100ms p99 query times via HNSW or IVF indexes. SQL extensions are simpler and 'good enough' for under 100M vectors.",
    whyItMatters: "Vector search is the bottleneck of most RAG systems. Choose wrong and your system either scales poorly or you pay for capacity you don't need. For most teams: pgvector (you already have Postgres) is the right starting point. Move to Pinecone or Qdrant when you outgrow it.",
    faq: [
      { q: "pgvector vs Pinecone?", a: "pgvector: free, just-Postgres, fine to ~100M vectors. Pinecone: managed, scales to billions, $0.40-1+ per million vectors/mo. Start with pgvector." },
      { q: "Open-source self-host?", a: "Qdrant or Weaviate. Both production-grade. Qdrant tends to be faster; Weaviate has better hybrid + multi-modal support." },
    ],
    relatedTerms: ["embeddings", "rag"],
    relatedToolSlugs: ["embeddings-cost-comparison"],
    tags: ["ai"],
  },
  {
    slug: "llm",
    term: "LLM (Large Language Model)",
    title: "LLM — What Large Language Model Means",
    description: "LLM (Large Language Model) is a transformer-based AI model trained on text to predict the next token. Definition + 2026 frontier lineup.",
    keyword: "what is llm",
    tldr: "An LLM (Large Language Model) is a transformer-based neural network trained on huge text datasets to predict the next token. ChatGPT, Claude, Gemini, DeepSeek — all are LLMs.",
    longDefinition: "All modern LLMs use the transformer architecture introduced in 2017. They're trained in two main phases: pretraining on web-scale text (predicting the next token), then post-training (RLHF, DPO, instruction tuning) to make them helpful, harmless, and honest. Frontier models in 2026 have 100B-2T+ parameters and are trained on trillions of tokens.",
    whyItMatters: "LLMs underlie nearly all of generative AI in 2026 — chatbots, coding agents, search, customer support bots, summarization tools. Understanding what they are (and aren't — they're statistical patterns, not reasoning engines) helps you set realistic expectations and avoid hallucination-related failures.",
    faq: [
      { q: "Frontier LLMs in 2026?", a: "Closed: Claude Opus 4.7, GPT-5, Gemini 3 Pro, Grok 4. Open-weight: DeepSeek V3.2, Kimi K2, Llama 4 Maverick, Qwen 3.5." },
      { q: "Are LLMs the same as 'AI'?", a: "No — LLMs are one type of AI. Image gen (diffusion models), video gen (different transformer variants), and traditional ML (random forests, gradient boosting) are also AI." },
    ],
    relatedTerms: ["agent", "context-window"],
    relatedToolSlugs: ["frontier-model-tracker"],
    tags: ["ai"],
  },
  {
    slug: "temperature-ai",
    term: "Temperature (AI sampling)",
    title: "Temperature (AI) — Definition + When to Tune It",
    description: "Temperature controls AI output randomness — lower for deterministic / factual, higher for creative. Definition + practical setting guide.",
    keyword: "ai temperature setting",
    tldr: "Temperature is a sampling parameter that controls the randomness of an LLM's output. Lower (0-0.3) = deterministic, factual, focused. Higher (0.7-1.2) = creative, varied, exploratory.",
    longDefinition: "Mathematically, temperature divides the logits before softmax — lower temp sharpens the probability distribution toward the most-likely token; higher temp flattens it. Most models default to 0.7-1.0 for chat. For factual tasks (extraction, classification, code), lower temp (0.0-0.3) reduces variance and hallucinations. For creative tasks (brainstorming, fiction), higher (1.0-1.5) helps.",
    whyItMatters: "Wrong temperature is one of the most common prompt-engineering mistakes. Devs running data extraction at temp 1.0 get inconsistent outputs and chase phantom bugs. Writers at temp 0.3 get repetitive, boring prose. Match temp to task.",
    faq: [
      { q: "What's a good default?", a: "Most chat: 0.7. Factual extraction: 0.0-0.2. Code generation: 0.0-0.3. Creative writing: 0.9-1.2." },
      { q: "Temp 0 = deterministic?", a: "Almost — but not exactly across all providers. Some still have implementation noise. For exact reproducibility, also set seed (where supported)." },
    ],
    relatedTerms: ["system-prompt"],
    relatedToolSlugs: ["frontier-model-tracker"],
    tags: ["ai"],
  },
  {
    slug: "few-shot",
    term: "Few-shot prompting",
    title: "Few-Shot Prompting — Definition + When It Helps",
    description: "Few-shot prompting includes 1-5 examples of desired output in the prompt to guide the AI. Definition + when it beats zero-shot or fine-tuning.",
    keyword: "few shot prompting",
    tldr: "Few-shot prompting includes 1-5 examples of desired input-output pairs in your prompt to guide the AI's response style or format. Beats zero-shot for tasks where format matters.",
    longDefinition: "Zero-shot: just the task description. Few-shot: task description + 1-5 examples + your input. Examples should be representative and diverse — not just easy cases. Frontier models in 2026 are zero-shot capable on most tasks but few-shot still wins on: format-specific output (JSON schemas, custom formats), domain-specific style (legal memos, technical writing), and edge-case behavior.",
    whyItMatters: "Few-shot examples are one of the cheapest ways to dramatically improve output quality. They're cached on most providers (~10% of input cost), so investing in 3 great examples is essentially free after the first call. The biggest mistake: using only easy examples — include hard / edge cases too.",
    faq: [
      { q: "How many examples?", a: "1-3 for most tasks; 5-7 for complex format requirements. Past 10, returns plateau and you should consider fine-tuning." },
      { q: "Few-shot vs fine-tuning?", a: "Few-shot for style/format control (5-min experimentation). Fine-tuning when you've maxed out few-shot or need to bake in domain knowledge." },
    ],
    relatedTerms: ["system-prompt", "fine-tuning"],
    relatedToolSlugs: ["system-prompt-generator", "prompt-rewriter"],
    tags: ["ai"],
  },
  {
    slug: "chain-of-thought",
    term: "Chain of thought (CoT)",
    title: "Chain of Thought — AI Reasoning Pattern Definition",
    description: "Chain of thought prompting asks the AI to reason step-by-step before answering. Improves accuracy on math, logic, multi-step problems.",
    keyword: "chain of thought",
    tldr: "Chain of thought (CoT) is a prompting technique that asks the AI to reason step-by-step before giving the final answer. Dramatically improves accuracy on math, logic, and multi-step reasoning tasks.",
    longDefinition: "Original CoT (2022 Wei et al.) showed adding 'Let's think step by step' to prompts improved accuracy by 20+ percentage points on math benchmarks. Modern reasoning models (OpenAI o-pro, DeepSeek R1, Claude with extended thinking) bake CoT into the model itself — generating internal 'thinking' tokens before the visible answer. You can also explicitly request step-by-step reasoning at the prompt level for any model.",
    whyItMatters: "CoT is the cheapest prompt-engineering trick that produces real quality gains. For any task involving math, logic, multi-step planning, or complex extraction, requesting step-by-step reasoning improves accuracy meaningfully. The 'thinking' tokens cost extra but the accuracy gain is usually worth it.",
    faq: [
      { q: "Should I always use it?", a: "For math, logic, planning — yes. For simple Q&A or stylistic generation — usually overkill, just adds cost." },
      { q: "Reasoning models vs CoT prompting?", a: "Reasoning models do CoT internally, more reliably. For non-reasoning models (GPT-4o, Claude Sonnet), CoT prompting is a simple way to get most of the benefit." },
    ],
    relatedTerms: ["system-prompt", "few-shot"],
    relatedToolSlugs: ["prompt-rewriter"],
    tags: ["ai"],
  },
  {
    slug: "rlhf",
    term: "RLHF",
    title: "RLHF — Reinforcement Learning from Human Feedback",
    description: "RLHF (Reinforcement Learning from Human Feedback) is the post-training method that makes LLMs helpful, honest, and harmless. Definition + alternatives.",
    keyword: "rlhf",
    tldr: "RLHF (Reinforcement Learning from Human Feedback) is a post-training method where humans rank model outputs and the model is fine-tuned to prefer the highest-ranked outputs. The reason ChatGPT was useful at launch.",
    longDefinition: "Pretrained LLMs are great at predicting tokens but not at being helpful. RLHF closes the gap: collect prompt + response pairs, have humans rank responses, train a reward model to predict the rankings, fine-tune the LLM via reinforcement learning to maximize the reward. DPO (Direct Preference Optimization) is a 2023 simplification that achieves similar results without the explicit RL phase. RLAIF replaces human ranking with AI ranking for scale.",
    whyItMatters: "RLHF is why post-2022 LLMs feel useful instead of weird. Pre-RLHF GPT-3 was technically capable but bad at instruction-following. Post-RLHF, the same base capability becomes a usable assistant. All major labs now invest heavily in this phase — the labs with best RLHF (Anthropic, OpenAI) ship the most-aligned products.",
    faq: [
      { q: "RLHF vs RLAIF?", a: "RLHF uses humans to rank; RLAIF uses an AI to rank. RLAIF scales better but requires a strong reward model." },
      { q: "Can I do RLHF myself?", a: "DPO (the simpler alternative) is feasible on consumer hardware for smaller models with libraries like Unsloth + TRL. Full RLHF is expensive but possible." },
    ],
    relatedTerms: ["fine-tuning"],
    relatedToolSlugs: ["frontier-model-tracker"],
    tags: ["ai"],
  },

  // ---------------------------------- Health (10)
  {
    slug: "vo2-max",
    term: "VO2 max",
    title: "VO2 Max — Definition + Why It's the Mortality Marker",
    description: "VO2 max is the maximum oxygen your body can use during exercise. Strongest correlate of all-cause mortality. Definition + how to estimate + improve.",
    keyword: "vo2 max",
    tldr: "VO&#8322; max is the maximum oxygen your body can use during exercise, in ml/kg/min. The strongest single fitness correlate of all-cause mortality — going from 'poor' to 'average' is the biggest single health investment most adults can make.",
    longDefinition: "Measured directly via a metabolic cart in a lab; estimated via the Cooper 12-minute run, Rockport 1-mile walk test, or resting heart rate proxies. Typical adult ranges: 35-45 (average), 45-55 (good), 55+ (excellent). Genetics + age set the ceiling; training moves you 15-25% within that ceiling. Decline after 30 is roughly 1% per year without training.",
    whyItMatters: "Mandsager et al. (2018, JAMA): VO&#8322; max correlated with all-cause mortality more strongly than smoking, diabetes, or hypertension. The fitness investment with highest payoff. Build it via Zone 2 cardio (4-5 hrs/wk) + 1-2 high-intensity intervals/wk.",
    faq: [
      { q: "How fast can I improve it?", a: "10-20% improvement in 8-12 weeks of structured training. Plateau is typical after 6-12 months unless you keep adding stimulus." },
      { q: "Wearable VO&#8322; max vs lab?", a: "Apple Watch / Garmin VO&#8322; max estimates are within 5-10% of lab measurements for most users. Useful for tracking trends, not for absolute precision." },
    ],
    relatedTerms: ["zone-2"],
    relatedToolSlugs: ["vo2-max-estimator", "zone-2-heart-rate-calculator"],
    tags: ["health"],
  },
  {
    slug: "zone-2",
    term: "Zone 2 cardio",
    title: "Zone 2 — Cardio Definition + Why It Dominates Longevity",
    description: "Zone 2 is sustained low-intensity cardio at 60-70% of max heart rate. The longevity-research-backed cardio zone. Definition + how to do it.",
    keyword: "zone 2",
    tldr: "Zone 2 is sustained low-intensity cardio at roughly 60-70% of max heart rate or heart-rate reserve. Builds mitochondrial density and aerobic base. The cardio zone with the strongest longevity-research backing.",
    longDefinition: "Three definitional methods: Karvonen (uses your resting HR, most personalized), Maffetone (180 - age, conservative), or %max (60-70%). All produce similar zones. The test: you should be able to hold a full conversation in nasal-only breathing while in Zone 2. If you can't, you're going too fast.",
    whyItMatters: "Builds mitochondrial density (the cellular engines that determine how well you burn fat at any intensity), lowers resting HR + BP + HbA1c, sustains for 60-90 minutes without crashing recovery. Combined with VO2 max work, Zone 2 is the most-recommended longevity-focused cardio strategy in 2026.",
    faq: [
      { q: "How much per week?", a: "30-90 min, 2-4&times;/week. Less than 30 min isn't the same dose." },
      { q: "Walking, running, cycling?", a: "Any modality. Walking only counts if it actually gets you into the heart rate zone." },
    ],
    relatedTerms: ["vo2-max"],
    relatedToolSlugs: ["zone-2-heart-rate-calculator", "vo2-max-estimator"],
    tags: ["health"],
  },
  {
    slug: "hrv",
    term: "HRV (Heart rate variability)",
    title: "HRV (Heart Rate Variability) — Definition + What Moves It",
    description: "HRV is the variation in time between heartbeats. Higher = better adapted. Surfaced by Whoop, Oura, Apple Watch. Definition + ranges + what raises it.",
    keyword: "heart rate variability",
    tldr: "HRV (Heart Rate Variability) is the variation in milliseconds between consecutive heartbeats. Higher = better adapted, more parasympathetic tone, generally fitter.",
    longDefinition: "Measured in milliseconds, typically as rMSSD (root mean square of successive differences). Genetics + age set baseline; lifestyle moves it 10-20%. Typical adult ranges: 20s = 60-90 ms, 30s = 50-80, 40s = 40-70, 50+ = 30-60. Athletes typically run 20-30% above peers. Compare to YOUR baseline, not absolute numbers.",
    whyItMatters: "HRV is a useful proxy for recovery + readiness — it drops with overtraining, illness, alcohol, poor sleep, and chronic stress. Used to time hard workouts vs recovery days. The biggest single intervention that raises HRV is consistently good sleep; the biggest single drop is alcohol within 3 hours of bed.",
    faq: [
      { q: "Best wearable for HRV?", a: "Oura Ring 4 (most accurate consumer HRV at the wrist/finger). Whoop is close. Apple Watch Series 9+ shows HRV trends but less granular." },
      { q: "How do I raise it?", a: "Sleep quality, Zone 2 cardio, strength training, hydration, lower alcohol. Avoid late meals + alcohol within 3h of bed." },
    ],
    relatedTerms: ["zone-2"],
    relatedToolSlugs: ["zone-2-heart-rate-calculator"],
    tags: ["health"],
  },
  {
    slug: "glp-1",
    term: "GLP-1 receptor agonist",
    title: "GLP-1 Receptor Agonist — Definition (Ozempic, Mounjaro)",
    description: "GLP-1 receptor agonists mimic the gut hormone GLP-1. Used for type 2 diabetes + chronic weight management. Ozempic, Wegovy, Mounjaro, Zepbound.",
    keyword: "glp 1 receptor agonist",
    tldr: "GLP-1 receptor agonists are synthetic versions of the gut hormone GLP-1, taken weekly (or daily). They slow gastric emptying and reduce appetite signaling. Originally type-2 diabetes drugs; weight loss became the headline use.",
    longDefinition: "Major drugs: semaglutide (Ozempic for diabetes, Wegovy for weight management, Rybelsus oral), tirzepatide (Mounjaro / Zepbound — also targets GIP receptors, more potent), liraglutide (Saxenda / Victoza, daily, older). Average weight loss in trials: ~15% on semaglutide, ~22% on tirzepatide. Side effects: nausea, fatigue, possible muscle loss without strength training. Not medical advice — talk to your doctor.",
    whyItMatters: "GLP-1s are reshaping how Western medicine treats obesity + cardiometabolic disease. They produce weight loss outcomes far above behavioral interventions alone. Trade-offs: long-term medication (regain typical when stopped), substantial cost, potential muscle loss without resistance training. NOT a quick fix.",
    faq: [
      { q: "Cost?", a: "$900-1,500/mo US retail, varying insurance coverage. Compounded versions cheaper but less reliable." },
      { q: "Are they safe long-term?", a: "Long-term safety data is still maturing (most drugs have <10 years of broad use). Pancreatitis + thyroid risk warnings exist; talk to your doctor." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["macro-calculator"],
    tags: ["health"],
  },
  {
    slug: "resting-metabolic-rate",
    term: "RMR (Resting Metabolic Rate)",
    title: "RMR — Resting Metabolic Rate Definition",
    description: "RMR (Resting Metabolic Rate) is the calories your body burns at rest. Used to set calorie targets for cut/maintain/bulk. Mifflin-St Jeor formula.",
    keyword: "resting metabolic rate",
    tldr: "RMR (Resting Metabolic Rate) is the calories your body burns at rest in 24 hours just to maintain basic functions — heart, brain, organs. Foundation for setting weight-loss or weight-gain calorie targets.",
    longDefinition: "Most-used estimate is the Mifflin-St Jeor equation: men = 10×weight(kg) + 6.25×height(cm) - 5×age + 5; women = same minus 161. Adult RMR typically 1,400-2,000 kcal/day depending on body size + composition. To get total daily energy expenditure (TDEE), multiply RMR by an activity factor (1.2 sedentary to 1.9 very active).",
    whyItMatters: "RMR is the floor for calorie planning. To lose weight, eat below TDEE; to gain, eat above. Most weight-loss plans target a 500 kcal/day deficit, producing roughly 1 lb/week loss. RMR drops during prolonged caloric deficit (adaptive thermogenesis) — the body adapts.",
    faq: [
      { q: "How accurate is the formula?", a: "Within ±15% for most people. Body composition heavily affects accuracy — high muscle = higher RMR than the formula predicts; high fat % = lower." },
      { q: "How do I measure RMR directly?", a: "Indirect calorimetry (a metabolic cart, ~$100-200 at sports clinics). Most accurate; not necessary for most people." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["calorie-calculator", "macro-calculator"],
    tags: ["health"],
  },
  {
    slug: "creatine",
    term: "Creatine",
    title: "Creatine — Why It's the Most-Studied Sport Supplement",
    description: "Creatine is a naturally-occurring compound that improves anaerobic performance + muscle gain + cognitive function. Most-studied sport supplement.",
    keyword: "creatine supplement",
    tldr: "Creatine is a naturally-occurring compound stored in muscle. Supplementing 3-5g/day raises muscle creatine stores by 20-30%, improving short-burst performance + slightly increasing muscle gain. The most-studied sport supplement, with strong safety data.",
    longDefinition: "Found naturally in red meat + fish (~1-2g per pound). Supplementation reaches saturation at 3-5g/day after 2-4 weeks (or faster with a 'loading' phase of 20g/day for 5 days). Effects: 5-10% improvement in short anaerobic efforts (sprint, lifting), 1-2 extra pounds of muscle in trained populations over months, modest cognitive benefits in sleep-deprived states. Safety profile is excellent — no major side effects in 30+ years of research.",
    whyItMatters: "If you do any anaerobic training (lifting, HIIT, sprint sports), creatine is the cheapest tier-one supplement. Costs $10-15/month, well-supported by hundreds of studies. The 'water weight' concern is real (water retention in muscle, ~2-4 lbs) — that's part of how it works, not a side effect. Creatine monohydrate is the gold standard form.",
    faq: [
      { q: "Loading phase necessary?", a: "No — same end state in 2-4 weeks via 3-5g/day. Loading just gets there faster." },
      { q: "Does it cause hair loss?", a: "Repeatedly studied, no consistent evidence. The original 2009 rugby study showing DHT increase has not been replicated." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["macro-calculator"],
    tags: ["health"],
  },
  {
    slug: "circadian-rhythm",
    term: "Circadian rhythm",
    title: "Circadian Rhythm — Definition + Why Light Timing Matters",
    description: "Circadian rhythm is the body's ~24-hr internal clock. Light is the dominant signal. Disruption affects sleep, mood, metabolism, immunity.",
    keyword: "circadian rhythm",
    tldr: "Circadian rhythm is the body's roughly-24-hour internal clock that regulates sleep, hormones, alertness, body temperature, digestion, and more. Light (especially morning sunlight) is the dominant zeitgeber — the signal that sets the clock.",
    longDefinition: "Driven by the suprachiasmatic nucleus (SCN) in the hypothalamus, the master clock receives light signals via the eyes (specifically melanopsin-containing retinal ganglion cells). Cortisol peaks 30 min after waking; melatonin starts rising 2-3 hours before sleep onset; core body temperature drops in the late evening. Disruptions (shift work, jet lag, late-night screens) push the entire orchestra out of sync.",
    whyItMatters: "Circadian disruption is associated with increased risk of obesity, type 2 diabetes, cardiovascular disease, and depression. The most-actionable fix is morning sunlight (5-10 min within 30 min of waking) and dimming evening light. These two interventions reliably improve sleep onset by 15-30 min and overall sleep quality.",
    faq: [
      { q: "Does blue light from screens really disrupt sleep?", a: "Yes, but less than commonly believed for moderate evening screen use. The bigger lever is bright OVERHEAD light close to bed, not phone screens." },
      { q: "Can I shift my circadian rhythm?", a: "About 1-2 hours per day if motivated, via timed light exposure + meal timing. Faster than that produces jet-lag-like symptoms." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["sleep-cycle-calculator"],
    tags: ["health"],
  },
  {
    slug: "sleep-debt",
    term: "Sleep debt",
    title: "Sleep Debt — Definition + Whether You Can 'Catch Up'",
    description: "Sleep debt is the accumulated deficit between needed sleep and actual sleep. Cognitive deficits compound. Definition + recovery realities.",
    keyword: "sleep debt",
    tldr: "Sleep debt is the accumulated difference between sleep your body needs and actual sleep. Cognitive performance, mood, immune function, and metabolism all suffer roughly proportional to the debt.",
    longDefinition: "If you need 8h/night and average 6.5h, you accumulate 1.5h debt per night. Effects appear after just 2-3 nights of deficit: 20-30% reduction in vigilance + reaction time (equivalent to 0.05% blood alcohol), worse decision-making, blunted glucose tolerance, suppressed immune function. Most adults underestimate their sleep need by 30-60 min.",
    whyItMatters: "You CAN partially recover sleep debt — but not as much or as fast as the 'catch up on the weekend' culture suggests. Walker et al. (2019, Sleep) showed that even after 3 weeks of catch-up, cognitive performance hadn't fully returned in chronically-deprived participants. Better strategy: prioritize consistent 7-9h on weeknights, not heroic recovery on weekends.",
    faq: [
      { q: "How much can I 'catch up'?", a: "Modest amounts. One extra hour of sleep on the weekend recovers some glucose tolerance + mood, but not cognitive performance. Chronic debt requires weeks of consistent, sufficient sleep to fully reverse." },
      { q: "Naps?", a: "Yes — 20-30 min naps can claw back some performance without disrupting nighttime sleep. Avoid 60+ min naps after 3pm." },
    ],
    relatedTerms: ["circadian-rhythm"],
    relatedToolSlugs: ["sleep-cycle-calculator"],
    tags: ["health"],
  },
  {
    slug: "protein-synthesis",
    term: "Muscle protein synthesis",
    title: "Muscle Protein Synthesis — Definition + Per-Meal Threshold",
    description: "Muscle protein synthesis is the process of building muscle protein from amino acids. Triggered by 25-40g protein per meal + resistance training.",
    keyword: "muscle protein synthesis",
    tldr: "Muscle protein synthesis (MPS) is the process by which muscle tissue is built from amino acids. Triggered most strongly by resistance training + a meal containing 25-40g of high-quality protein within 2 hours.",
    longDefinition: "MPS is regulated by mTOR signaling, which responds primarily to leucine concentration. The 'leucine threshold' for stimulating MPS is roughly 2.5-3g per meal — achieved by 25-40g of complete protein (whey, eggs, meat, fish, dairy, soy). Multiple meals/day beat one big protein bolus. The post-workout 'anabolic window' is real but wider than originally thought (2-4 hours).",
    whyItMatters: "Spreading protein across 3-4 meals optimizes daily MPS more than concentrating it. People who eat all their protein at dinner don't get the same muscle-building stimulus as people who hit 25-40g at each meal. This is the actual reason for protein-distribution recommendations — not a vague 'metabolism' story.",
    faq: [
      { q: "How much protein per meal?", a: "25-40g of complete protein for most adults; 40-50g for those over 60 (anabolic resistance increases with age)." },
      { q: "Plant proteins enough?", a: "Yes if you combine sources (rice + beans, soy + grains) to get a complete amino-acid profile, or use a single complete plant source like soy, quinoa, or buckwheat." },
    ],
    relatedTerms: ["resting-metabolic-rate"],
    relatedToolSlugs: ["macro-calculator", "vegan-protein-calculator"],
    tags: ["health"],
  },
  {
    slug: "apolipoprotein-b",
    term: "ApoB (Apolipoprotein B)",
    title: "ApoB — Why It Beats LDL for Heart Disease Risk",
    description: "ApoB (Apolipoprotein B) counts atherogenic particles. Better predictor of heart disease risk than LDL cholesterol. Definition + targets.",
    keyword: "apob cholesterol",
    tldr: "ApoB (Apolipoprotein B) measures the count of atherogenic particles in your blood — the particles that drive atherosclerosis. Better predictor of cardiovascular disease risk than LDL cholesterol.",
    longDefinition: "Every atherogenic particle (LDL, VLDL, IDL, lipoprotein(a)) carries exactly one ApoB. So measuring ApoB tells you the COUNT of particles, while LDL-C tells you the cholesterol carried inside them. Two people with identical LDL-C can have very different particle counts and very different CV risk. ApoB is more predictive — the European Society of Cardiology and many US lipidologists now prefer it.",
    whyItMatters: "If you've had a 'normal LDL' but a family history of heart disease, ask for an ApoB test. It's a simple add-on to your standard lipid panel ($25-50). Targets: under 90 mg/dL for general population, under 80 for people with CV risk factors, under 60 for active CV disease.",
    faq: [
      { q: "Is it covered by insurance?", a: "Often yes if your doctor orders it. Worth asking — Quest and Labcorp both offer it routinely. Costs ~$25-50 self-pay." },
      { q: "What lowers ApoB?", a: "Same things that lower LDL: diet (less saturated fat, more fiber), exercise, weight loss, statins, PCSK9 inhibitors. ApoB tracks closely with LDL but adds precision." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["bmi-calculator"],
    tags: ["health"],
  },

  // ---------------------------------- Lifestyle / Dev (10 more)
  {
    slug: "fire-movement",
    term: "FIRE (Financial Independence Retire Early)",
    title: "FIRE — Financial Independence Retire Early Definition",
    description: "FIRE (Financial Independence Retire Early) is a movement to achieve financial independence and optionally retire decades earlier than traditional age.",
    keyword: "fire movement",
    tldr: "FIRE (Financial Independence Retire Early) is a movement built around aggressive saving (50-70% of income) and investment to reach financial independence — often by age 40-50, sometimes earlier.",
    longDefinition: "Three flavors: lean FIRE (target $25-30k/yr expenses; ~$750k-1M nest egg), regular FIRE ($40-60k/yr; ~$1-1.5M), fat FIRE ($100k+/yr; $2.5M+). The math: save 50%+ of income, invest in low-cost index funds, hit your number when 4% withdrawal sustainably covers expenses. Coast FIRE is a variant — keep working but stop saving once compounding will get you there.",
    whyItMatters: "FIRE shifts the conversation about money from 'how much can I spend' to 'how soon can I have a choice.' Even partial-FIRE thinking (saving 30-40% instead of the 5-10% American median) compresses the decades to financial independence by half or more.",
    faq: [
      { q: "Is the 4% rule still valid in 2026?", a: "Mostly. The Trinity Study used 30-yr horizons; for 50-yr early retirement, 3.5% is more conservative. Higher equity allocation (75-80%) still works historically." },
      { q: "How much do I need?", a: "Annual expenses × 25 (the 4% rule inversion). $40k/yr expenses = $1M target. Adjust for healthcare in early-retirement scenarios." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["fire-number-calculator", "compound-interest-calculator"],
    tags: ["finance"],
  },
  {
    slug: "lifestyle-creep",
    term: "Lifestyle creep",
    title: "Lifestyle Creep — Definition + How to Avoid It",
    description: "Lifestyle creep is when increased income leads to increased spending, leaving you with no extra savings. Definition + the 50% raise rule.",
    keyword: "lifestyle creep",
    tldr: "Lifestyle creep (or 'lifestyle inflation') is when increased income leads to increased spending instead of increased savings. The reason high earners often have low net worth.",
    longDefinition: "The pattern: 10% raise → 10% more spending. The pattern compounds: small upgrades at each promotion (nicer apartment, nicer car, nicer vacations, nicer everything) reset the 'normal' lifestyle. Within 5 years, the high-earner saves the same $ amount as before. The 50% raise rule: bank 50% of every raise, allow 50% lifestyle inflation. Compromises feel tolerable; savings rate climbs.",
    whyItMatters: "Lifestyle creep is the largest reason that high-income professionals don't retire wealthy. Every 'small' upgrade locks in fixed costs that compound; harder to undo than to never adopt.",
    faq: [
      { q: "Best defense?", a: "Automate savings before raises hit your account. Then you don't 'feel' the income increase — your future self captures it." },
      { q: "What about quality-of-life upgrades?", a: "Some are real value (better mattress, time-saving tools, health investments). The dangerous ones are recurring lifestyle commitments — a $200/mo gym, $500/mo car payment, $1,000/mo apartment upgrade." },
    ],
    relatedTerms: ["fire-movement"],
    relatedToolSlugs: ["budget-calculator", "low-buy-year-tracker", "subscription-fatigue-auditor"],
    tags: ["finance"],
  },
  {
    slug: "deep-work",
    term: "Deep work",
    title: "Deep Work — Cal Newport's Term Defined",
    description: "Deep work is professional activity in distraction-free concentration. Cal Newport's term. Definition + how to engineer time for it.",
    keyword: "deep work",
    tldr: "Deep work is professional activity performed in a state of distraction-free concentration that pushes your cognitive abilities to their limit. Cal Newport's term, popularized in his 2016 book 'Deep Work.'",
    longDefinition: "The opposite of 'shallow work' (email, meetings, Slack, context-switching). Most people produce 1-2 hours of deep work daily even at 8-10-hour workdays — the rest is shallow. The 4-hour-a-day cap is a hard limit for most knowledge workers (Cal Newport, Anders Ericsson). To engineer it: schedule blocks (90 min minimum), eliminate distractions during them (phone in another room, focus mode on), train the muscle (it's harder at first).",
    whyItMatters: "In an attention economy, deep-work capacity is the rarest professional skill. The people who can sit for 90 minutes on one hard problem produce disproportionate value. Cultivating it isn't about heroic willpower — it's about scheduling + environment design.",
    faq: [
      { q: "Can I really only do 4 hours?", a: "For pure deep work, yes — diminishing returns set in beyond ~4 hours/day. The other workday hours can still be productive on shallow tasks." },
      { q: "How do I start?", a: "Block 90 minutes daily, no notifications, one task. Build the habit before increasing duration. Add a second 90-min block after 2-3 weeks." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["pomodoro-timer", "dopamine-detox-planner"],
    tags: ["lifestyle"],
  },
  {
    slug: "second-brain",
    term: "Second brain",
    title: "Second Brain — Tiago Forte's Term Defined",
    description: "Second brain is a digital knowledge management system that captures + connects what you read and think. Tiago Forte's PARA + CODE system.",
    keyword: "second brain",
    tldr: "A 'second brain' is a digital system for capturing, organizing, and resurfacing what you read, think, and learn. Tiago Forte's term, popularized in his 2022 book + course.",
    longDefinition: "The CODE workflow: Capture (highlights, notes, web clips), Organize (PARA: Projects, Areas, Resources, Archives), Distill (progressive summarization), Express (output: writing, slides, decisions). Tools: Obsidian, Notion, Capacities, Tana, Roam, Logseq. The point isn't to capture everything — it's to capture WITH INTENT and resurface relevant material later when you're working on something where it matters.",
    whyItMatters: "Knowledge workers process 10-100x more information than they can retain. Without a system, that information is lost. A second brain shifts the question from 'do I remember this?' to 'is it in my system?' — much higher hit rate.",
    faq: [
      { q: "Best tool?", a: "Obsidian (free, local) for solo + privacy-conscious. Notion for collaborative + databases. The system matters more than the tool." },
      { q: "Time investment?", a: "30-60 min/week to curate. The mistake is over-organizing — capture loosely, organize lightly, only deeply structure when working on a specific output." },
    ],
    relatedTerms: ["deep-work"],
    relatedToolSlugs: ["paper-planner-comeback" as string],
    tags: ["lifestyle"],
  },
  {
    slug: "stoicism",
    term: "Stoicism",
    title: "Stoicism — Modern Practical Definition",
    description: "Stoicism is the ancient Greek-Roman philosophy focused on virtue + accepting what you can't control. Modern practical interpretation.",
    keyword: "stoicism modern",
    tldr: "Stoicism is the ancient philosophy founded by Zeno (~300 BC), focused on virtue, controlling your responses to events (rather than the events themselves), and acceptance of what's outside your control.",
    longDefinition: "Three Roman Stoics dominate modern practice: Marcus Aurelius (Meditations), Epictetus (Discourses, Enchiridion), Seneca (Letters). Core ideas: dichotomy of control (focus only on what you can change — your judgments, actions), negative visualization (imagine losing what you have, builds gratitude), memento mori (remember death), virtue is sufficient for happiness, you control your reactions even when you don't control events.",
    whyItMatters: "Stoicism had a major comeback in 2010-2025 via Ryan Holiday, Tim Ferriss, and the broader self-improvement world. It's a working framework for handling stress, setbacks, and uncertainty without therapy or religion. Practical, evidence-aligned, requires daily practice rather than weekly belief.",
    faq: [
      { q: "Best entry book?", a: "Marcus Aurelius's Meditations (Hays translation). Personal journal format, easy to read in chunks. Or Ryan Holiday's 'The Daily Stoic' for a year of one-page-a-day practice." },
      { q: "Stoicism vs CBT?", a: "Cognitive Behavioral Therapy borrows directly from Stoicism — the framing of 'it's not events, it's our judgments of events that disturb us' is straight from Epictetus." },
    ],
    relatedTerms: [],
    relatedToolSlugs: ["dopamine-detox-planner"],
    tags: ["lifestyle"],
  },
  {
    slug: "ssr",
    term: "SSR (Server-Side Rendering)",
    title: "SSR — Server-Side Rendering Definition",
    description: "SSR (Server-Side Rendering) renders web pages on the server before sending to the browser. Used for SEO + initial-load performance.",
    keyword: "server side rendering",
    tldr: "SSR (Server-Side Rendering) is a pattern where web pages are rendered to HTML on the server (per-request) and sent fully-formed to the browser. Improves initial-load + SEO vs purely client-rendered apps.",
    longDefinition: "Three patterns: SSR renders fresh on each request (Next.js getServerSideProps), SSG renders at build time (most static sites), ISR renders at build but updates on demand. Modern frameworks (Next.js 14+, Remix, SvelteKit, Nuxt) make SSR the default for marketing pages + dashboards that need both interactivity and SEO.",
    whyItMatters: "Pure client-side React apps have terrible SEO and slow initial loads. SSR fixes both — Google sees real HTML, users see content faster. The cost is server complexity + per-request compute. For most marketing + content sites, SSG or ISR is more efficient than full SSR.",
    faq: [
      { q: "SSR vs SSG?", a: "SSR re-renders per request (always fresh). SSG renders once at build (faster + cheaper). Pick SSG if your content doesn't change often per user; SSR if it does (logged-in dashboards, etc.)." },
      { q: "Best framework in 2026?", a: "Next.js (most-used), Remix (data-fetching focused), SvelteKit (smaller bundle), Astro (content-heavy)." },
    ],
    relatedTerms: ["ttfb"],
    relatedToolSlugs: [],
    tags: ["dev"],
  },
  {
    slug: "ttfb",
    term: "TTFB (Time to First Byte)",
    title: "TTFB — Time to First Byte Definition",
    description: "TTFB is the time from request start until the first byte of response arrives. Key metric for backend + CDN performance. Targets + how to lower.",
    keyword: "ttfb time to first byte",
    tldr: "TTFB (Time to First Byte) is the time from when the browser sends a request until it receives the first byte of the server's response. Measures backend + network latency, not rendering speed.",
    longDefinition: "Includes: DNS lookup + TCP handshake + TLS handshake + server processing + first byte sent. Google's Core Web Vitals indirectly cares about TTFB (it's the floor for LCP). Good TTFB: under 200ms (excellent), under 600ms (acceptable), over 1.5s (poor). Improved by: CDN caching, server-side rendering optimization, database query tuning, edge functions, geographic distribution of servers.",
    whyItMatters: "TTFB is the foundation under all other web performance metrics. If your TTFB is 1500ms, your LCP can't be better than 1500ms regardless of how fast your assets are. Many performance issues that look like 'slow rendering' are actually slow TTFB.",
    faq: [
      { q: "How do I measure?", a: "Chrome DevTools Network panel. Or PageSpeed Insights. Real-user monitoring (RUM) with WebPageTest, Cloudflare Analytics, or Vercel Analytics gives field data." },
      { q: "How do I lower it?", a: "CDN edge caching (biggest win), database query optimization, lighter middleware, geographic origin shielding." },
    ],
    relatedTerms: ["ssr"],
    relatedToolSlugs: [],
    tags: ["web-perf"],
  },
  {
    slug: "lcp",
    term: "LCP (Largest Contentful Paint)",
    title: "LCP — Largest Contentful Paint Definition",
    description: "LCP measures the time from page-start until the largest visible element renders. Core Web Vital. Targets + how to improve.",
    keyword: "largest contentful paint",
    tldr: "LCP (Largest Contentful Paint) is one of Google's three Core Web Vitals. It measures how long until the largest visible content element (usually a hero image or heading) is rendered.",
    longDefinition: "Targets: under 2.5s = good, 2.5-4s = needs improvement, over 4s = poor. Most slow LCPs are caused by: slow TTFB (server-side bottleneck), unoptimized hero images (no compression, wrong format, no lazy loading exception for above-the-fold), render-blocking JS or CSS, heavy webfonts. Fast LCP requires both fast network delivery and fast rendering.",
    whyItMatters: "LCP is a confirmed Google ranking factor since 2021 (Page Experience update) and one of three Core Web Vitals. Bad LCP correlates with high bounce rates regardless of SEO impact. Fixing it usually delivers both ranking lift + conversion improvement.",
    faq: [
      { q: "How do I find what element is the LCP?", a: "Chrome DevTools Performance panel → record a load → see the LCP marker. Or use PageSpeed Insights which shows the LCP element directly." },
      { q: "Fastest fix for image-heavy sites?", a: "Serve the hero in modern formats (AVIF, WebP), preload it via &lt;link rel='preload'&gt;, ensure it's not lazy-loaded above the fold, and use a CDN." },
    ],
    relatedTerms: ["ttfb"],
    relatedToolSlugs: [],
    tags: ["web-perf"],
  },
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    title: "Core Web Vitals — Google's 3 Performance Metrics",
    description: "Core Web Vitals are Google's 3 metrics for page experience: LCP (loading), INP (interactivity), CLS (visual stability). Definition + targets.",
    keyword: "core web vitals",
    tldr: "Core Web Vitals are Google's three measurable user-experience metrics: LCP (loading speed), INP (interactivity), CLS (visual stability). Confirmed ranking factors since 2021.",
    longDefinition: "LCP (Largest Contentful Paint): under 2.5s. INP (Interaction to Next Paint, replaced FID in March 2024): under 200ms. CLS (Cumulative Layout Shift): under 0.1. Google measures from real Chrome users (CrUX) at the 75th percentile. Pass all three = 'good' page experience designation.",
    whyItMatters: "Core Web Vitals are part of Google's ranking algorithm. Poor scores tend to compound: same content, same backlinks, the page with better Web Vitals usually outranks the slower one. Plus the user-experience benefit is real — fast, stable pages convert better.",
    faq: [
      { q: "Where do I check mine?", a: "Google Search Console → Page Experience report. Or PageSpeed Insights for individual page audits with field + lab data." },
      { q: "Mobile or desktop?", a: "Both matter. Google primarily uses mobile for indexing (mobile-first), so prioritize mobile if you have to choose." },
    ],
    relatedTerms: ["lcp", "ttfb"],
    relatedToolSlugs: [],
    tags: ["web-perf"],
  },
  {
    slug: "minimalism",
    term: "Minimalism (lifestyle)",
    title: "Minimalism — Lifestyle Definition + Practical Path",
    description: "Minimalism is the practice of intentionally living with less — fewer possessions, fewer commitments, more meaning. Definition + practical entry.",
    keyword: "minimalism lifestyle",
    tldr: "Minimalism is the practice of intentionally owning less — fewer possessions, fewer commitments, fewer subscriptions — to make room for what matters most. Not about white walls + empty rooms; about removing what doesn't earn its place.",
    longDefinition: "Modern minimalism (Marie Kondo, The Minimalists, Joshua Becker) emphasizes joy + utility over aesthetics. Three practical entry points: (1) the 'one in, one out' rule (every new acquisition replaces one you remove), (2) the 90/90 rule (if you haven't used it in 90 days and won't in next 90, donate it), (3) the 30-day declutter (remove a number of items equal to the day — day 1 = 1 item, day 30 = 30 items, total ~465 items in a month).",
    whyItMatters: "Minimalism solves real problems: clutter + decision fatigue, lifestyle creep, environmental waste, the 'paying to store stuff I don't use' loop. The benefits are usually larger than people expect — most who try it for 3-6 months don't go back.",
    faq: [
      { q: "What about kids / families?", a: "Family minimalism is harder but works — reduce by category, model the behavior, give kids agency over their own space (with limits)." },
      { q: "Best book?", a: "'The Life-Changing Magic of Tidying Up' (Marie Kondo) for emotional approach. 'Goodbye, Things' (Fumio Sasaki) for extreme version. 'Essentialism' (Greg McKeown) for the work + commitments side." },
    ],
    relatedTerms: ["lifestyle-creep", "lifestyle"],
    relatedToolSlugs: ["low-buy-year-tracker", "subscription-fatigue-auditor"],
    tags: ["lifestyle"],
  },
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((g) => g.slug === slug);
}

export function glossaryHref(entry: GlossaryEntry): string {
  return `/learn/${entry.slug}`;
}
