import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Break-even is the point where revenue exactly covers cost —
      below it you&rsquo;re losing money on every sale, above it
      you&rsquo;re making it. Most new businesses mis-price because
      they don&rsquo;t know their break-even volume, and most
      products get launched at margins that make scaling impossible.
      This guide walks through the formula, the cost categories you
      have to separate correctly, and the three questions the
      break-even number answers immediately.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The formula in plain language</h2>
    <p>
      <strong>Break-even units = Fixed costs / (Price per unit −
      Variable cost per unit)</strong>
    </p>
    <p>
      The denominator — <strong>price minus variable cost</strong> —
      is called the <strong>contribution margin</strong>. It&rsquo;s
      the dollars each sale contributes toward covering your fixed
      costs.
    </p>
    <p>
      Example: You sell a subscription at $29/month. Your variable
      cost per customer per month (hosting, payment processing, CS
      minutes) is $6. Contribution margin = $23/month per customer.
      Fixed costs (salaries, rent, software) are $50,000/month.
      Break-even = 50,000 / 23 ≈ <strong>2,174 paying
      customers</strong>.
    </p>
    <p>
      That number answers a question strategy decks usually
      don&rsquo;t: &ldquo;How many customers do we need just to not
      lose money?&rdquo; If it&rsquo;s far larger than your realistic
      12-month sales target, your unit economics or cost base are
      broken.
    </p>

    <h2>Step 1 — classify costs correctly</h2>
    <p>
      Most founders put costs in the wrong bucket and get a useless
      answer. The clean rule:
    </p>
    <p>
      <strong>Fixed costs</strong> are costs that don&rsquo;t move with
      the next sale. Rent, salaries, accounting retainer, insurance,
      most software subscriptions. Constant whether you sell 10 or
      1,000.
    </p>
    <p>
      <strong>Variable costs</strong> move with every unit you sell.
      Cost of goods sold (COGS), shipping, payment processing fees
      (2.9% + $0.30), direct labor per unit, commissions per sale.
    </p>
    <p>
      Trap: marketing spend is usually variable-ish (step-function),
      not truly fixed. If break-even is sensitive to marketing, model
      it as a cost per acquisition rather than a line item.
    </p>

    <h2>Step 2 — find your actual unit price</h2>
    <p>
      &ldquo;Price&rdquo; on the invoice is usually not the price
      you keep. Subtract:
    </p>
    <p>
      <strong>Discounts.</strong> If 30% of orders use a 20% discount
      code, effective price is 6% lower than sticker.
    </p>
    <p>
      <strong>Returns and refunds.</strong> 8–15% typical for
      ecommerce. Subtract proportionally.
    </p>
    <p>
      <strong>Payment processing.</strong> ~3% on cards.
    </p>
    <p>
      <strong>Platform fees.</strong> 15–30% on marketplaces (Amazon,
      App Store, Etsy).
    </p>
    <p>
      A product with a $100 MSRP sold through Amazon (15% fee) with
      10% average discounts and 10% returns might net you $72 — and
      that&rsquo;s the number that goes into break-even math.
    </p>

    <h2>Step 3 — run the math three ways</h2>
    <p>
      <strong>Break-even units</strong> (answered above): how many
      sales to cover costs.
    </p>
    <p>
      <strong>Break-even revenue</strong> = Fixed costs / Contribution
      margin ratio, where ratio = (Price − Variable cost) / Price. For
      the subscription example: 50,000 / (23/29) = 50,000 / 0.793 ≈{" "}
      <strong>$63,070/month in revenue</strong>.
    </p>
    <p>
      <strong>Break-even price</strong> (given a target volume): At
      1,000 customers, what price makes you break even? 50,000 /
      1,000 + 6 = <strong>$56/month</strong>. Anything below that and
      you lose money.
    </p>

    <h2>The three decisions break-even unlocks</h2>
    <p>
      <strong>(1) Should we launch this product?</strong> If break-even
      volume is 10× your realistic year-1 sales forecast, the economics
      don&rsquo;t work. Either price is too low, cost is too high, or
      you&rsquo;re chasing a market too small for your cost base.
    </p>
    <p>
      <strong>(2) Can we absorb a discount promotion?</strong> A 20%
      discount cuts contribution margin by more than 20% (because
      fixed costs don&rsquo;t move). If CM drops below fixed-cost
      coverage at your current volume, the promotion loses money even
      if it ships more units.
    </p>
    <p>
      <strong>(3) Can we afford this new hire?</strong> A $120k
      engineer adds $10k/month to fixed costs. At $23 CM per
      subscription, you need 435 more paying customers just to
      neutralize. Does the hire create that incremental demand? If
      not, the hire deepens your hole.
    </p>

    <h2>Multi-product break-even (weighted average)</h2>
    <p>
      If you sell multiple products with different contribution
      margins, use a weighted average CM based on sales mix:
    </p>
    <p>
      Product A: 60% of sales, $20 CM. Product B: 40% of sales, $35
      CM. Weighted CM = (0.60 × 20) + (0.40 × 35) = $26. Break-even =
      Fixed costs / $26.
    </p>
    <p>
      Important: if sales mix shifts toward lower-CM products,
      break-even volume rises even at the same total revenue. This
      is why SaaS businesses monitor average revenue per account
      (ARPA) — a lower ARPA at the same customer count means the
      break-even point moved up.
    </p>

    <h2>Time-to-break-even (the other break-even)</h2>
    <p>
      For a business with upfront investment — inventory, software
      build, marketing blitz — break-even has a <em>time</em>{" "}
      dimension: how many months until cumulative profit covers the
      upfront cost?
    </p>
    <p>
      Month 1: −$100k (launch costs). Monthly CM × 200 customers =
      $5,000/month profit after fixed costs. Time to break-even: 20
      months.
    </p>
    <p>
      Critical test: does your cash runway last that long? If the
      startup runway calculator says you have 14 months of cash and
      break-even takes 20, you need to either reduce launch costs,
      raise more, grow faster, or kill the product before you&rsquo;re
      forced to.
    </p>

    <h2>Break-even in service businesses</h2>
    <p>
      Services replace &ldquo;units&rdquo; with &ldquo;billable
      hours&rdquo; or &ldquo;clients.&rdquo; A consulting firm with
      $30k/month fixed costs and a $150/hour rate (80% billable after
      cost-of-delivery) needs $30,000 / $120 = 250 billable hours/month
      to break even. At 30 billable hrs/week per consultant, that&rsquo;s
      ~2 full-time consultants billing full weeks.
    </p>
    <p>
      Service-business break-even collapses fast when utilization
      drops — which is why agency burn looks sharp during slow months.
    </p>

    <h2>Break-even sensitivity — the real question</h2>
    <p>
      A single break-even number is less useful than a sensitivity
      table. Vary each input ±20% and see how break-even moves:
    </p>
    <p>
      <strong>Price −10%:</strong> break-even volume typically jumps
      20–40% because CM shrinks faster than price.
    </p>
    <p>
      <strong>Variable cost +10%:</strong> similar hit to CM,
      similar jump in break-even volume.
    </p>
    <p>
      <strong>Fixed cost +10%:</strong> break-even volume rises
      proportionally.
    </p>
    <p>
      The inputs with the biggest leverage are price and variable
      cost, because they affect every unit. Focus optimization there
      first.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plug your fixed costs, price, and variable cost into the{" "}
      <a href="/tools/break-even-calculator">break-even calculator</a>
      {" "}for units, revenue, and price views. Pair with the{" "}
      <a href="/tools/profit-margin-calculator">profit margin
      calculator</a> for the &ldquo;is CM healthy&rdquo; check, and
      the <a href="/tools/startup-runway-calculator">startup runway
      calculator</a> to see whether your cash lasts long enough to
      reach break-even.
    </p>
  </>
);
