import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Pricing is the single highest-leverage lever most founders
      ignore. A 10% price increase usually moves bottom-line profit
      20–50%, while a 10% volume increase might move it 5%. Yet most
      first-time founders set price by looking at competitors and
      shaving 20% — the fastest way to underprice a good product.
      This guide walks through the four pricing methods, when each
      fits, and the common traps that cost real money.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The four pricing methods</h2>
    <p>
      <strong>Cost-plus (markup)</strong> — calculate unit cost, add a
      margin. Simple, math-safe, but ignores what customers will pay.
      Example: unit cost $15, 60% markup → $24 price. Works when costs
      are well-understood and you&rsquo;re not trying to capture the
      full value of what you&rsquo;re selling.
    </p>
    <p>
      <strong>Competitor-based</strong> — price relative to market
      comps. Fine for commodity products where customers compare
      specs. Dangerous for differentiated products because you&rsquo;re
      anchoring to someone else&rsquo;s cost structure, not your own
      value.
    </p>
    <p>
      <strong>Value-based</strong> — price based on the dollar value
      created for the customer. Requires understanding their ROI.
      Example: SaaS that saves 20 hours/week of a $60/hour employee
      creates $62k/year of value. Charging $12k/year for it is ~20%
      of value created — a reasonable capture rate.
    </p>
    <p>
      <strong>Dynamic / tiered</strong> — different prices for
      different segments or usage levels. The SaaS standard: three
      tiers with 10:1 price ratio (Starter, Team, Enterprise). Lets
      price-sensitive and price-insensitive buyers self-select.
    </p>

    <h2>Step 1 — know your unit economics</h2>
    <p>
      Before picking a method, know your floor:
    </p>
    <p>
      <strong>COGS</strong> (cost of goods sold) — direct cost to
      deliver one unit. For physical products: materials + manufacturing
      + shipping + fulfillment. For SaaS: hosting + support + payment
      processing per customer.
    </p>
    <p>
      <strong>Variable CAC</strong> — cost to acquire one customer
      (ads, affiliate fees, sales commissions).
    </p>
    <p>
      <strong>Contribution margin</strong> = Price − COGS − Variable CAC.
      Must be positive. Ideally, covers fixed costs at reasonable
      volume.
    </p>
    <p>
      <strong>Target margin</strong> — by business type:
    </p>
    <p>
      Ecommerce / DTC: 40–60% gross margin.
    </p>
    <p>
      SaaS: 70–85% gross margin.
    </p>
    <p>
      Services: 50–70% gross margin, depending on leverage.
    </p>
    <p>
      Below these, you&rsquo;re almost always underpricing.
    </p>

    <h2>Step 2 — triangulate with willingness-to-pay data</h2>
    <p>
      Even for value-based pricing, you need customer-side evidence.
      Three cheap methods:
    </p>
    <p>
      <strong>Van Westendorp Price Sensitivity Meter.</strong> 4
      questions: &ldquo;At what price is it so cheap you&rsquo;d
      question quality? cheap but still acceptable? expensive but
      worth it? too expensive to consider?&rdquo; Intersection of
      curves reveals a price range most customers accept.
    </p>
    <p>
      <strong>Conjoint analysis</strong> (for feature-price tradeoffs).
      Show customers pairs of price/feature bundles; see which they
      pick. Reveals how much each feature is &ldquo;worth.&rdquo; More
      work but gives the clearest data.
    </p>
    <p>
      <strong>A/B price test</strong> on landing pages. Show half of
      visitors $29/mo, half $49/mo. If conversion at $49 is less than
      59% of conversion at $29 (29/49), you&rsquo;re making less
      money at $49 and should price lower. Otherwise, price higher.
    </p>

    <h2>The 10%-up experiment</h2>
    <p>
      If your prices have been stable and you have no hard data, this
      tells you a lot cheaply: raise prices 10% on new customers, watch
      conversion for 4–6 weeks. Three outcomes:
    </p>
    <p>
      <strong>Conversion unchanged</strong> → you were underpriced.
      Keep the new price. Plan another 10% test in 3 months.
    </p>
    <p>
      <strong>Conversion dropped &lt;10%</strong> → still worth it.
      Higher revenue/visitor despite fewer conversions. Keep the
      new price.
    </p>
    <p>
      <strong>Conversion dropped &gt;10%</strong> → you&rsquo;ve hit
      or crossed your ceiling. Roll back, optimize value message, or
      retry in 6 months with better positioning.
    </p>

    <h2>The tiered-pricing playbook (SaaS)</h2>
    <p>
      Three tiers, 10:1 price ratio. Standard structure:
    </p>
    <p>
      <strong>Starter / Solo:</strong> $15–30/month. Individuals or
      tiny teams. Feature-limited. Purpose: low-friction entry,
      word-of-mouth amplification.
    </p>
    <p>
      <strong>Team / Pro:</strong> $50–200/month. SMBs. Core features
      + collaboration. The workhorse tier where most revenue comes
      from.
    </p>
    <p>
      <strong>Enterprise / Business:</strong> $500–5000+/month. Custom
      pricing. SSO, audit logs, SLA, dedicated support. Often closed
      by sales team, priced per-engagement.
    </p>
    <p>
      Common mistake: too many tiers. More than 4 tiers creates
      decision paralysis and reduces conversion. Even 3 tiers work
      best with clear feature differentiators (e.g., seats, API
      calls, storage).
    </p>

    <h2>Anchoring and decoy pricing</h2>
    <p>
      Show the highest tier first. The $5,000/mo Enterprise tier
      makes the $200/mo Pro tier look reasonable. Without the anchor,
      $200 looks expensive.
    </p>
    <p>
      Decoy effect: a $89 middle tier that&rsquo;s &ldquo;only
      slightly worse&rdquo; than $99 top tier drives customers to
      the $99 because it looks like a better deal. Apple used this
      heavily with iPhone storage tiers.
    </p>

    <h2>Discounts and promotions — the margin killers</h2>
    <p>
      <strong>A 20% discount</strong> on a product with 50% margin
      requires <strong>67% more volume</strong> just to keep the
      same total profit. Because fixed costs don&rsquo;t drop with
      price, the math of discounting is usually worse than founders
      expect.
    </p>
    <p>
      Cleaner alternatives to discounting:
    </p>
    <p>
      <strong>Value-add bundles</strong> — add something to the
      offer instead of cutting price. Protects the price point.
    </p>
    <p>
      <strong>Annual prepay</strong> — give 2 months free (17%
      discount) for annual upfront. Locks revenue, reduces churn,
      price anchor stays intact.
    </p>
    <p>
      <strong>Segmented pricing</strong> — student / nonprofit /
      small-business discounts don&rsquo;t cannibalize your main
      segment.
    </p>

    <h2>Price increases — on existing customers</h2>
    <p>
      At some point you&rsquo;ll raise prices on existing customers.
      The playbook that minimizes churn:
    </p>
    <p>
      <strong>(1) Grandfather</strong> customers on old pricing for a
      defined window (6–12 months). They keep their rate during
      that window; new customers see the new rate immediately.
    </p>
    <p>
      <strong>(2) Pre-announce</strong> the increase with 30–60
      days&rsquo; notice, in direct email from a founder or
      executive. Explain why.
    </p>
    <p>
      <strong>(3) Tie to value improvements.</strong> New features,
      SLA, integrations shipped since last price. Bundle the
      increase with something customers actually want.
    </p>
    <p>
      Typical churn from a well-executed 10–20% increase: 2–5% of
      accounts. Revenue impact is almost always net positive.
    </p>

    <h2>The &ldquo;you can always come down&rdquo; rule</h2>
    <p>
      You can always lower a price. Raising one is much harder.
      Launch 10–20% higher than you&rsquo;re comfortable with. If it
      doesn&rsquo;t convert, drop. If it does, you&rsquo;ve captured
      more value and signaled higher quality.
    </p>
    <p>
      Founder underpricing is so common that seasoned investors
      often push portfolio companies to raise prices as their first
      piece of advice. The upside is usually there; the downside
      (some churn) is almost always smaller than expected.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plug cost, target margin, and fees into the{" "}
      <a href="/tools/pricing-calculator">pricing calculator</a> for a
      margin-accurate price. Pair with the{" "}
      <a href="/tools/break-even-calculator">break-even calculator</a>
      {" "}to validate volume assumptions, and the{" "}
      <a href="/tools/profit-margin-calculator">profit margin
      calculator</a> for the margin view across your product line.
    </p>
  </>
);
