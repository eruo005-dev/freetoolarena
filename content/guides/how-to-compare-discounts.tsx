import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      &ldquo;40% off plus an extra 20%&rdquo; is not 60% off. &ldquo;Buy one
      get one free&rdquo; is not a 50% discount on two items unless you
      wanted both. Retail discount language is optimized to sound larger
      than the real savings, and the math that reveals the actual price is
      almost never shown on the sticker. This guide covers how to price
      out stacked discounts, BOGO deals, and percent-off-plus-coupon
      combinations so you can tell a real bargain from a rounded one.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The single-discount baseline</h2>
    <p>
      Easy case first. 30% off a $120 item:{" "}
      <code>$120 × (1 − 0.30) = $84</code>. You saved $36. Every other
      discount scenario is built from this primitive, applied more than
      once.
    </p>

    <h2>Stacked discounts don&rsquo;t add — they compound</h2>
    <p>
      &ldquo;40% off, plus an extra 20% at checkout&rdquo; looks like 60%,
      feels like 60%, and is not 60%. Discounts stack multiplicatively, not
      additively.
    </p>
    <p>
      Start with $100. 40% off → $60. Then 20% off that → $60 × 0.80 =
      $48. You paid $48, not $40. The effective discount is{" "}
      <code>1 − (0.60 × 0.80) = 1 − 0.48 = 52%</code>.
    </p>
    <p>
      General formula for stacked percent-off discounts:{" "}
      <code>Effective discount = 1 − (1 − d₁)(1 − d₂)(1 − d₃)…</code>.
      Order doesn&rsquo;t matter mathematically — $100 × 0.80 × 0.60 is the
      same as $100 × 0.60 × 0.80 — but register systems often apply them
      in a specific order, so the <em>displayed</em> intermediate price
      depends on sequence even though the final total doesn&rsquo;t.
    </p>

    <h2>Percent-off vs dollar-off — when to prefer which</h2>
    <p>
      $20 off a $50 item is a 40% discount. $20 off a $200 item is 10%.
      Dollar-off coupons are more valuable on cheaper items, percent-off
      more valuable on expensive ones. If a store lets you choose one,
      the breakeven is where <code>dollar_off / sticker_price =
      percent_off</code>. Below that, take the dollar-off; above, take
      the percent-off.
    </p>

    <h2>BOGO and quantity-based deals</h2>
    <p>
      &ldquo;Buy one get one 50% off&rdquo; on a $40 item: you pay $40 +
      $20 = $60 for two. Effective per-item price is $30, or 25% off each.
      Not 50%.
    </p>
    <p>
      &ldquo;Buy one get one free&rdquo; on a $30 item: $30 for two =
      $15/each, a 50% effective discount — but only if you were going to
      buy two. If you only wanted one, the effective discount on what you
      needed is 0%; you just paid sticker.
    </p>
    <p>
      &ldquo;Buy 3 for $30&rdquo; when the sticker is $12.99 each: normally
      $38.97, now $30, a 23% effective discount. This format is usually a
      weaker deal than it feels, because the sticker anchors high.
    </p>

    <h2>Pre-tax vs post-tax discount order</h2>
    <p>
      Most US sales tax is applied <em>after</em> discounts, not before.
      $100 item, 20% off, 8% sales tax: $100 × 0.80 = $80, then $80 × 1.08
      = $86.40. A coupon reduces your tax bill proportionally.
    </p>
    <p>
      Gift cards are the opposite — applied <em>after</em> tax, because
      they&rsquo;re treated like payment, not like a price reduction. $100
      item, 8% tax = $108, minus a $20 gift card = $88 out of pocket.
      You still paid the full tax on $100.
    </p>

    <h2>Clearance math — &ldquo;final sale&rdquo; still deserves math</h2>
    <p>
      An item marked &ldquo;$89.99, now $49.99, take an additional 40%
      off&rdquo; ends at <code>$49.99 × 0.60 = $29.99</code>. That&rsquo;s
      a 67% effective discount off the original $89.99. Worth it if you
      wanted it at $60; not worth it if the impulse is driven by the
      percent-off itself.
    </p>
    <p>
      The trap: anchoring. Stores set initial prices high specifically so
      later &ldquo;70% off&rdquo; looks heroic. The number to trust is the{" "}
      <em>out-the-door price</em>, not the percent off.
    </p>

    <h2>Price-per-unit comparisons</h2>
    <p>
      A 16 oz bottle at $4.49 vs a 24 oz at $5.99: per-oz prices are
      $0.281 and $0.250. The larger is 11% cheaper per oz. Grocery-store
      shelf tags often show this already; for online shopping it&rsquo;s
      usually not displayed, so compute it yourself. The{" "}
      <a href="/tools/discount-calculator">discount calculator</a> includes
      a per-unit mode for exactly this comparison.
    </p>

    <h2>Subscription and bundle math</h2>
    <p>
      &ldquo;Save 20% with annual billing&rdquo; on a $10/mo service: $120
      nominal, $96 with the discount — a $24/year saving. Real-world
      value of that saving depends on how likely you are to still use it
      in month 12. If service churn is 30%/year, the expected saving is
      $24 × 0.7 = $16.80 annualized, not the full $24.
    </p>
    <p>
      Bundle pricing (&ldquo;package 3 items for $50, individually $20
      each&rdquo;) is worth the bundle discount (17% here) only if you
      wanted all 3. Buying the third only because of the bundle is a 0%
      saving on things you wouldn&rsquo;t have otherwise bought.
    </p>

    <h2>A 30-second discount audit</h2>
    <p>
      Before checkout: add up what&rsquo;s in the cart at sticker. Write
      down your out-the-door price (after all discounts and tax). Divide
      to get the effective percent off. If it&rsquo;s less than the
      advertised headline number, you&rsquo;re paying for the marketing
      fog. If it matches, the deal is what it says.
    </p>
    <p>
      The <a href="/tools/discount-calculator">discount calculator</a>{" "}
      handles stacked percent-off, dollar-off coupons, BOGO ratios,
      pre/post-tax ordering, and unit-price comparisons in one pass — pair
      it with the{" "}
      <a href="/tools/percentage-calculator">percentage calculator</a> for
      quick sanity checks and the{" "}
      <a href="/tools/sales-tax-calculator">sales tax calculator</a> when
      you&rsquo;re shopping across multiple states.
    </p>
  </>
);
