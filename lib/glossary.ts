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
  tags: ("finance" | "seo" | "dev" | "web-perf")[];
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
];

export function getGlossaryEntryBySlug(slug: string): GlossaryEntry | undefined {
  return GLOSSARY.find((g) => g.slug === slug);
}

export function glossaryHref(entry: GlossaryEntry): string {
  return `/learn/${entry.slug}`;
}
