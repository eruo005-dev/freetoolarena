import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Most businesses work on revenue growth because it&rsquo;s the
      headline number. But a 5-point margin improvement usually
      outperforms a 20% revenue increase — faster, without scaling
      headcount, and with real cash hitting the bank. This guide
      walks through the three margin numbers (gross, operating, net),
      the levers that actually move them, and the industry benchmarks
      that tell you whether a margin is healthy or a structural
      problem.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three margins, and what each tells you</h2>
    <p>
      <strong>Gross margin</strong> = (Revenue − COGS) / Revenue. The
      efficiency of delivering the product or service. A SaaS with
      80% gross margin has a $0.20 cost to deliver each $1 of
      revenue. A physical product with 40% gross margin has $0.60
      cost.
    </p>
    <p>
      <strong>Operating margin</strong> = (Revenue − COGS − OpEx) /
      Revenue. Includes all operating costs — sales, marketing, R&amp;D,
      admin. The profitability of the actual business, ignoring taxes
      and one-time items.
    </p>
    <p>
      <strong>Net margin</strong> = Net income / Revenue. After
      everything — taxes, interest, non-recurring. The number that
      hits the bank account.
    </p>
    <p>
      Each reveals a different problem. Weak gross margin = product
      cost structure issue. Gross margin healthy but operating margin
      weak = you&rsquo;re overspending on SG&amp;A. Both healthy but net
      weak = tax or debt issue.
    </p>

    <h2>Industry benchmarks — what &ldquo;healthy&rdquo; looks like</h2>
    <p>
      Gross margin varies massively by industry:
    </p>
    <p>
      <strong>SaaS:</strong> 70–85% gross; 10–25% operating (at
      scale); 10–20% net.
    </p>
    <p>
      <strong>Ecommerce / DTC:</strong> 40–60% gross; 5–15%
      operating; 5–10% net.
    </p>
    <p>
      <strong>Service / consulting:</strong> 50–70% gross; 10–20%
      operating; 8–15% net.
    </p>
    <p>
      <strong>Physical retail:</strong> 25–50% gross; 3–8% operating;
      2–5% net.
    </p>
    <p>
      <strong>Restaurants:</strong> 30–40% gross on food; 5–15%
      operating at best.
    </p>
    <p>
      <strong>Manufacturing:</strong> 25–45% gross; 8–15% operating.
    </p>
    <p>
      Below the low end of your industry range, your business has a
      structural problem. Above the high end, you&rsquo;re either
      finding real leverage or — careful — underinvesting in growth.
    </p>

    <h2>Lever 1: Raise prices (highest leverage)</h2>
    <p>
      A 5% price increase at 40% gross margin flows almost entirely
      to bottom line — it&rsquo;s the single highest-leverage move in
      most businesses. Discussed fully in our pricing guide, but the
      margin math:
    </p>
    <p>
      $100 sale at 40% gross margin = $40 contribution. Raise price to
      $105 (5% increase), contribution becomes $45 (12.5% increase in
      gross profit on unchanged volume). If you lose 5% of customers
      to the price increase, contribution per customer is 12.5% higher
      on 95% of the customers = 6.9% net increase in gross profit.
    </p>
    <p>
      Most businesses underestimate customer price tolerance by a
      factor of 2–4x. The margin gains from price are almost always
      available; they&rsquo;re just uncomfortable to pursue.
    </p>

    <h2>Lever 2: Reduce unit cost (COGS)</h2>
    <p>
      Options depend on business type:
    </p>
    <p>
      <strong>Physical goods.</strong> Negotiate with suppliers at
      volume thresholds, consolidate to fewer vendors, switch to
      alternative materials or components, reduce packaging weight
      (shipping cost), increase order quantities for bulk pricing,
      eliminate unnecessary SKU variants.
    </p>
    <p>
      <strong>SaaS.</strong> Re-architect expensive features,
      negotiate infrastructure contracts (AWS/GCP commit discounts
      40–60% off list), replace 3rd-party APIs with in-house
      alternatives when volume justifies, right-size compute.
    </p>
    <p>
      <strong>Services.</strong> Productize repetitive work, use
      juniors leveraged by seniors instead of senior-only delivery,
      standardize templates and processes, eliminate custom scope
      that doesn&rsquo;t earn premium price.
    </p>

    <h2>Lever 3: Improve product mix</h2>
    <p>
      If product A has 30% margin and product B has 55% margin, shift
      effort toward B. Without changing price or cost of any product,
      you improve blended margin.
    </p>
    <p>
      Tactics:
    </p>
    <p>
      <strong>Feature high-margin products</strong> in your catalog,
      website, sales conversations.
    </p>
    <p>
      <strong>De-emphasize or discontinue</strong> lowest-margin
      products if they&rsquo;re not strategic. Carrying them has a
      real cost (SKU management, support, inventory).
    </p>
    <p>
      <strong>Bundle</strong> low-margin products with high-margin
      attachments — printer + recurring ink, car + warranty, meal + drink.
    </p>
    <p>
      <strong>Tiered upsells</strong> — push customers toward higher
      tiers with differentially higher margin.
    </p>

    <h2>Lever 4: Reduce operating costs (SG&amp;A)</h2>
    <p>
      Gross margin rules unit economics; operating margin reflects
      overhead efficiency. Main cost categories:
    </p>
    <p>
      <strong>Marketing.</strong> Cut bottom-quartile channels,
      reallocate to top performers. Measure CAC by channel; kill
      channels with CAC/LTV &gt; 0.3.
    </p>
    <p>
      <strong>Sales.</strong> Sales productivity varies 3–5x across
      reps. Fire the bottom 20% every year; upgrade.
    </p>
    <p>
      <strong>Software stack.</strong> Audit annually. Typical
      company has 20–40% SaaS waste (unused seats, overlapping tools,
      features you don&rsquo;t need the upper tier for).
    </p>
    <p>
      <strong>Real estate.</strong> Remote/hybrid has flipped this —
      downsize offices, sublease unused space.
    </p>
    <p>
      <strong>Professional services.</strong> Review legal,
      accounting, consulting spend. Fixed retainers drift up without
      corresponding value.
    </p>

    <h2>Lever 5: Increase customer lifetime value (LTV)</h2>
    <p>
      Margin-per-customer is the deeper number. Two customers paying
      $1,000 where one churns in month 3 and the other stays 3 years
      have vastly different contribution margins even at identical
      pricing.
    </p>
    <p>
      <strong>Reduce churn</strong> — easier than new acquisition.
      A 5-point reduction in annual churn often increases LTV 20–40%.
    </p>
    <p>
      <strong>Upsell existing</strong> — expansion revenue at very
      low CAC. Enterprise SaaS routinely generates &gt;100% net
      revenue retention this way.
    </p>
    <p>
      <strong>Cross-sell</strong> — additional product categories to
      existing customers. Leverages the acquisition you already paid
      for.
    </p>

    <h2>Margin traps that look like growth</h2>
    <p>
      <strong>Trap 1: Discounting for volume.</strong> Bulk discounts
      can make revenue look great while destroying margin. Sometimes
      necessary; often not.
    </p>
    <p>
      <strong>Trap 2: Channel expansion.</strong> Adding Amazon or
      Walmart can 3x volume at 40% lower margin (take rates +
      advertising costs). Net profit may fall despite revenue rising.
    </p>
    <p>
      <strong>Trap 3: Feature bloat.</strong> Building everything
      customers ask for adds COGS (support, ops, maintenance) without
      corresponding price increases. Margin silently erodes.
    </p>
    <p>
      <strong>Trap 4: Unit-economics negative customer segments.</strong>
      A segment where CAC &gt; LTV is destroying value with every new
      customer. Scaling a negative-margin segment looks like growth
      but is actually accelerating losses.
    </p>

    <h2>The 90-day margin sprint</h2>
    <p>
      If margin needs fast improvement, a focused sprint:
    </p>
    <p>
      <strong>Week 1-2: Audit.</strong> P&amp;L by product line, gross
      margin by SKU, vendor spend analysis, SaaS tool inventory.
    </p>
    <p>
      <strong>Week 3-4: Price test.</strong> Identify 2–3 products
      for 10%+ price increase. Test on new-customer pricing.
    </p>
    <p>
      <strong>Week 5-6: Cost negotiation.</strong> Top 10 vendors.
      Renegotiate or shop alternatives.
    </p>
    <p>
      <strong>Week 7-8: Mix shift.</strong> Promote high-margin
      products, pull back on low-margin. Sales comp adjustments if
      needed.
    </p>
    <p>
      <strong>Week 9-12: Measure.</strong> Recompute margins. Real
      improvement from a focused sprint: 3–8 percentage points.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Check your margins line by line with the{" "}
      <a href="/tools/profit-margin-calculator">profit margin
      calculator</a>. Pair with the{" "}
      <a href="/tools/break-even-calculator">break-even calculator</a>
      {" "}to see how margin improvements change the volume needed,
      and the <a href="/tools/pricing-calculator">pricing calculator</a>
      {" "}for the price-setting side of the margin equation.
    </p>
  </>
);
