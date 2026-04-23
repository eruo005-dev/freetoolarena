import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Discount math looks obvious &mdash; 20% off $50 is $10 off, right? Yes,
      but retailers layer discounts, add taxes on discounted prices, swap
      percent-off for dollar-off, run BOGOs that aren&rsquo;t actually BOGOs,
      and anchor prices against MSRPs that never existed. Getting this math
      fluent protects you from &ldquo;savings&rdquo; that cost you money and
      helps you spot the rare genuinely good deal. This guide covers the
      formulas you need for every common discount structure, plus the
      psychological traps baked into how sale prices are presented. The
      difference between &ldquo;30% off&rdquo; and &ldquo;30% off plus 20%
      off&rdquo; is not 50%, and that gap is where most people leave money
      on the table.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The percent-off formula</h2>
    <p>
      Sale price equals original price times (1 minus discount rate). So a
      $80 item at 25% off:
    </p>
    <pre>{`sale = original * (1 - discount)
sale = 80 * (1 - 0.25) = 80 * 0.75 = 60.00`}</pre>
    <p>
      For discount <em>amount</em>: <code>discount_amount = original * discount_rate</code>.
      Simple, but the errors creep in when you stack.
    </p>

    <h2>Stacked discounts don&rsquo;t add &mdash; they multiply</h2>
    <p>
      The most misunderstood rule in retail math: 30% off, then an
      additional 20% off at checkout, does <strong>not</strong> equal 50%
      off. It equals 44% off.
    </p>
    <pre>{`stacked = original * (1 - d1) * (1 - d2)
       = 100 * 0.70 * 0.80
       = 56.00

savings = 44%  (not 50%)`}</pre>
    <p>
      The order doesn&rsquo;t matter &mdash; multiplication is commutative.
      But every additional percentage discount gets applied to a smaller
      base, so the marginal savings shrinks.
    </p>

    <h2>Dollar-off vs percent-off</h2>
    <p>
      $20 off a $40 item is 50% off. $20 off a $400 item is 5% off. Dollar
      discounts feel bigger on cheap items and smaller on expensive ones,
      while percent discounts feel the opposite. Retailers pick the framing
      that sounds larger. When you see both, convert to the same unit.
    </p>
    <pre>{`percent_equivalent = dollar_off / original

$25 off $125 = 20% off
$25 off $500 = 5% off`}</pre>

    <h2>BOGO math &mdash; usually 25%, not 50%</h2>
    <p>
      &ldquo;Buy one get one 50% off&rdquo; sounds like half price. It&rsquo;s
      not. You&rsquo;re paying full price for one item and half price for
      the other &mdash; blended rate is 25% off.
    </p>
    <pre>{`BOGO 50%: 2 items, pay 1.0 + 0.5 = 1.5
          blended = 1.5 / 2 = 0.75 per item
          = 25% off each

BOGO free: 2 items, pay 1.0 + 0.0 = 1.0
           blended = 50% off each`}</pre>
    <p>
      BOGO only works if you actually want two. Buying a second item you
      don&rsquo;t need at 50% off is not a discount &mdash; it&rsquo;s a
      purchase.
    </p>

    <h2>Tax is applied after discount</h2>
    <p>
      In most US states, sales tax applies to the <em>discounted</em> price
      (the price you actually paid), not the original. That means a
      discount also saves you tax.
    </p>
    <pre>{`original = 100.00
discount = 25%
tax      = 8%

sale       = 100 * 0.75 = 75.00
tax amount = 75 * 0.08  = 6.00
total      = 81.00`}</pre>
    <p>
      A few states with coupon-specific rules treat manufacturer coupons
      differently from store discounts. Check your state.
    </p>

    <h2>Reverse-calculating the original price</h2>
    <p>
      When you see only the sale price and the percent off, work backwards:
    </p>
    <pre>{`original = sale / (1 - discount)

sale = 48, discount = 20%
original = 48 / 0.80 = 60.00`}</pre>
    <p>
      Useful for checking advertised &ldquo;save $X&rdquo; claims &mdash;
      does the math actually work?
    </p>

    <h2>MSRP psychology and fake anchors</h2>
    <p>
      &ldquo;Was $200, now $120&rdquo; feels like a deal. But if nothing
      ever sold at $200 &mdash; the MSRP was a phantom anchor &mdash; the
      $120 price is just the price. Retailers have been sued for this, and
      many states now require the MSRP to have been a genuine selling price
      within the past 90 days. Always check the item&rsquo;s price history
      via browser extensions or price-tracking sites before trusting the
      anchor.
    </p>

    <h2>Clearance tiers and markdowns</h2>
    <p>
      Retail clearance usually runs through predictable tiers: 25% off,
      then 40%, then 50%, then 60%, then final. Each week the markdown
      deepens but inventory thins. The game is guessing how many weeks the
      item will survive at your size. A good rule: if you&rsquo;d pay
      today&rsquo;s price without regret, buy; if you&rsquo;re gambling on
      another markdown, assume it sells out first.
    </p>

    <h2>Coupon codes: site-wide vs category vs item</h2>
    <p>
      Coupon codes apply in a specific order set by the retailer. Typical
      order:
    </p>
    <ul>
      <li>Item-level markdowns (already shown)</li>
      <li>Category discounts (e.g., 20% off shoes)</li>
      <li>Site-wide percent codes</li>
      <li>Dollar-off codes (applied last, on smallest base)</li>
      <li>Tax applied to the resulting subtotal</li>
    </ul>
    <p>
      Most retailers allow only one percent-off code per order, so
      stacking codes from different browser extensions usually fails.
    </p>

    <h2>The &ldquo;loss-leader&rdquo; trap</h2>
    <p>
      Doorbusters and front-page deals are often legitimate discounts
      &mdash; on items priced specifically to draw you in so you&rsquo;ll
      buy full-price items alongside. If you buy only the loss-leader,
      you win. If you add a $60 sweatshirt at full price to a $10
      doorbuster, the retailer wins. Shopping lists beat impulse.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Adding percent-off discounts instead of multiplying them; tipping or
      tax-calculating on pre-discount total; buying something you
      didn&rsquo;t plan to buy because of the &ldquo;savings&rdquo;;
      comparing a sale price to a fake MSRP; and forgetting that a 40%
      markdown on a $200 impulse purchase is still a $120 expense, not
      $80 of savings.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/discount-calculator">Discount calculator</a>
      <a href="/tools/sales-tax-calculator">Sales tax calculator</a>
      <a href="/tools/percentage-calculator">Percentage calculator</a>
    </p>
  </>
);
