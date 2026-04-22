import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Marketing ROI is the arithmetic of whether a campaign made money
      or lost money — a surprisingly contested number, because what
      counts as &ldquo;cost&rdquo; and what counts as &ldquo;return&rdquo;
      can be defined a dozen ways. This guide walks through the base
      formula, the three most common ways teams calculate it, why
      attribution ruins everything, and how to report an ROI number
      that&rsquo;s honest enough to survive a CFO&rsquo;s questions.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The base formula</h2>
    <p>
      <code>ROI = (Gain − Cost) / Cost × 100%</code>
    </p>
    <p>
      Spend $10k on a campaign, generate $40k in attributable revenue:
      ROI = ($40k − $10k) / $10k × 100% = <strong>300%</strong>. For
      every dollar spent, you got three dollars in profit back on top
      of recovering your spend.
    </p>

    <h2>Marketing ROI vs ROAS — don&rsquo;t confuse them</h2>
    <p>
      <strong>ROAS (Return on Ad Spend)</strong> is revenue ÷ ad spend. The
      same campaign above: $40k / $10k = 4.0x ROAS. ROAS ignores profit
      margin. If your gross margin is 20%, that $40k of revenue
      actually generated $8k in gross profit — and you spent $10k to
      get it. ROAS says you&rsquo;re winning; true ROI says you&rsquo;re
      losing money.
    </p>
    <p>
      <code>Actual ROI = (Revenue × Gross margin − Marketing cost) / Marketing cost</code>.
      Always do the margin step when reporting ROI to anyone above the
      marketing team, or you&rsquo;ll get caught lighting money on fire
      while the dashboard says everything&rsquo;s great.
    </p>

    <h2>Three common flavors of Marketing ROI</h2>
    <p>
      <strong>(1) Revenue ROI.</strong> (Revenue − Marketing cost) ÷
      Marketing cost. Ignores margin. Inflated. Marketing teams often
      report this. Fine internally, misleading externally.
    </p>
    <p>
      <strong>(2) Gross-profit ROI.</strong> (Revenue × Gross margin −
      Marketing cost) ÷ Marketing cost. The honest version. CFOs expect
      this.
    </p>
    <p>
      <strong>(3) Contribution-margin ROI.</strong> Accounts for all
      variable costs (gross margin + customer service + shipping +
      payment processing). Used in unit-economics-focused companies and
      venture-backed growth modeling.
    </p>

    <h2>The time-horizon problem</h2>
    <p>
      Acquisition marketing pays off over the customer&rsquo;s lifetime,
      not on first purchase. A SaaS business that spends $1,000 to
      acquire a customer who pays $100/month for 36 months shouldn&rsquo;t
      report a negative ROI after month one. Use{" "}
      <strong>payback period</strong> and <strong>LTV:CAC ratio</strong>{" "}
      alongside ROI:
    </p>
    <p>
      <strong>LTV</strong> (lifetime value) = average customer revenue ×
      average margin × average lifespan.{" "}
      <strong>CAC</strong> (customer acquisition cost) = marketing spend
      ÷ customers acquired. LTV:CAC ratio of 3:1 or higher is the SaaS
      benchmark. Under 2:1 usually means unit economics are broken.
    </p>
    <p>
      Annualize it when comparing campaigns: see the{" "}
      <a href="/tools/roi-calculator">ROI calculator</a> for
      single-period ROI and annualized ROI (CAGR) side-by-side.
    </p>

    <h2>Attribution — where ROI claims go to die</h2>
    <p>
      Attribution is the question &ldquo;which campaign caused this
      purchase?&rdquo; Most conversions involve 3–8 touchpoints — a
      Google ad, a retargeting display, an email, an organic search,
      a podcast mention — and attribution models assign credit
      differently:
    </p>
    <p>
      <strong>Last-click:</strong> 100% credit to the final touchpoint.
      Favors bottom-funnel campaigns. The iOS 14.5 tracking changes
      broke this model for most mobile apps.
    </p>
    <p>
      <strong>First-click:</strong> 100% credit to the first touchpoint.
      Favors top-funnel brand campaigns. Rarely used alone.
    </p>
    <p>
      <strong>Linear:</strong> Equal credit across all touchpoints.
      Simple and defensible, but treats a brand-awareness impression the
      same as a checkout-page retargeting ad.
    </p>
    <p>
      <strong>Data-driven / algorithmic:</strong> GA4&rsquo;s default,
      and similar models in HubSpot and Salesforce. Uses your own
      historical conversion paths to assign weights. Usually the most
      defensible, but requires enough data volume (thousands of
      conversions) to produce a meaningful model.
    </p>
    <p>
      The honest version of ROI always names the attribution model
      alongside the number. &ldquo;Campaign ROI: 240% (last-click)&rdquo;
      is truthful. &ldquo;Campaign ROI: 240%&rdquo; alone is a number
      someone will disagree with the second it shows up in the
      monthly review.
    </p>

    <h2>Incrementality — the harder question</h2>
    <p>
      Even with perfect attribution, some of the conversions you paid
      for would have happened anyway. This is the <em>incrementality</em>{" "}
      problem. The only reliable way to measure it is holdout tests:
      withhold advertising from a random 10% of your audience, compare
      conversion rates, and the delta is your true incremental
      contribution.
    </p>
    <p>
      Most teams skip this because it feels like losing conversions on
      purpose. The ones that run holdouts routinely find that 20–50%
      of &ldquo;attributed&rdquo; conversions are non-incremental. If
      you haven&rsquo;t run a holdout test, your reported ROI is
      optimistic by an unknown amount.
    </p>

    <h2>A campaign-level ROI worked example</h2>
    <p>
      LinkedIn ads for an enterprise SaaS. Spend: $15,000. Attributed
      revenue (last-click, GA): $180,000 in first-year contract value.
      Gross margin: 75%. Ad-ops labor (10% of media cost allocated):
      $1,500.
    </p>
    <p>
      Full cost: $15,000 + $1,500 = $16,500. Gross profit from attributed
      revenue: $180,000 × 0.75 = $135,000. ROI = ($135,000 − $16,500) /
      $16,500 = <strong>718%</strong> on a gross-profit basis.
    </p>
    <p>
      Now discount for attribution model risk. If an incrementality test
      would show 60% of those conversions were non-incremental,
      real-world ROI = ($135,000 × 0.40 − $16,500) / $16,500 = 227%. Still
      profitable, but dramatically different, and only one is going to
      be defensible six months later.
    </p>

    <h2>The shortcut for small campaigns</h2>
    <p>
      For campaigns under $10k in spend and under 100 conversions, skip
      the attribution modeling. Just look at spend and revenue from
      matching time periods, accept last-click attribution as
      good-enough, and calculate gross-profit ROI. The variance is too
      high for precision modeling to beat back-of-envelope at that
      scale.
    </p>
    <p>
      For the core math, use the{" "}
      <a href="/tools/roi-calculator">ROI calculator</a> (handles both
      simple and annualized). Pair with the{" "}
      <a href="/tools/break-even-calculator">break-even calculator</a>{" "}
      when deciding whether a campaign cost is recoverable, and the{" "}
      <a href="/tools/profit-margin-calculator">profit margin
      calculator</a> to convert revenue inputs to the gross-profit
      version of ROI.
    </p>
  </>
);
