import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      US sales tax is a layer cake. There&rsquo;s a state rate, sometimes a
      county rate, often a city rate, occasionally a transit-district or
      special-purpose rate, and a list of exemptions that vary by category
      and by state. The &ldquo;8.25%&rdquo; you pay at checkout is usually
      four or five rates stacked together. Getting this math right matters
      when you&rsquo;re budgeting large purchases, comparing cross-border
      buys, running a small business, or figuring out whether a tax-free
      weekend actually saves you anything. This guide covers the stacking
      math, the service-versus-goods split, inclusive-versus-exclusive
      pricing, and the most common places the number goes wrong.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The core formula</h2>
    <p>
      Tax amount equals pre-tax price times combined tax rate. Total equals
      pre-tax plus tax.
    </p>
    <pre>{`tax   = price * rate
total = price * (1 + rate)

price = 100.00, rate = 8.25%
tax   = 100 * 0.0825 = 8.25
total = 108.25`}</pre>
    <p>
      Everything else is just figuring out the right rate.
    </p>

    <h2>State + local rate stacking</h2>
    <p>
      Combined rates in the US commonly include:
    </p>
    <ul>
      <li>State rate (0% to ~7.25%)</li>
      <li>County rate</li>
      <li>City rate</li>
      <li>Special district rate (transit, tourism, stadium, etc.)</li>
    </ul>
    <p>
      These add, not multiply. California&rsquo;s 7.25% state + 1% local +
      up to 2.5% district = up to 10.75% in some cities. The right rate
      depends on the ship-to or point-of-sale address, which is why
      cross-town purchases can have different tax.
    </p>
    <pre>{`combined = state + county + city + district

CA base + LA county + LA city + transit
= 6.00% + 0.25% + 0.75% + 2.25%
= 9.25%`}</pre>

    <h2>Origin-based vs destination-based</h2>
    <p>
      States are split on whether tax uses the seller&rsquo;s location
      (origin) or the buyer&rsquo;s (destination). Most are destination-based,
      which is why online orders charge tax based on your shipping address,
      not the warehouse&rsquo;s. A handful &mdash; Texas, Arizona, Illinois
      for intrastate sales, for example &mdash; use origin for certain
      transactions. If you&rsquo;re a seller, this affects which rate to
      collect.
    </p>

    <h2>Goods vs services: not everything is taxed</h2>
    <p>
      Most states tax tangible goods but not services &mdash; haircuts, legal
      advice, consulting. Exceptions multiply fast:
    </p>
    <ul>
      <li>Groceries: exempt in many states, taxed at reduced rate in others, fully taxed in a few</li>
      <li>Clothing: exempt in NJ, PA (non-luxury), taxed elsewhere</li>
      <li>Prepared food: almost always taxed, even where groceries aren&rsquo;t</li>
      <li>SaaS: taxed in ~20 states, increasing every year</li>
      <li>Digital downloads: varies widely</li>
      <li>Shipping: taxed if it&rsquo;s not separately stated in some states</li>
    </ul>

    <h2>Tax-free weekends &mdash; do the math</h2>
    <p>
      Back-to-school tax holidays typically exempt clothing under $100 and
      school supplies under $50. On a $300 purchase of qualifying items at
      8% tax, you save $24 &mdash; real money but usually smaller than the
      2&ndash;3% retailer markups added for the weekend. If you were going to
      buy anyway, the holiday is a small win. If you&rsquo;re driving an
      hour and fighting crowds for 8% savings, the gas and time cost
      probably exceed the tax savings.
    </p>

    <h2>Inclusive vs exclusive pricing</h2>
    <p>
      US pricing is <strong>exclusive</strong> &mdash; sticker price
      doesn&rsquo;t include tax, tax is added at the register. European
      and most international pricing is <strong>inclusive</strong> &mdash;
      VAT is baked in. To convert between them:
    </p>
    <pre>{`exclusive_to_inclusive: price * (1 + rate)
inclusive_to_exclusive: inclusive / (1 + rate)

$100 sticker + 8% tax = $108 inclusive
&euro;120 inclusive / 1.20 VAT = &euro;100 ex-VAT`}</pre>

    <h2>Use tax &mdash; the obligation you didn&rsquo;t know about</h2>
    <p>
      If you buy something out of state and no sales tax is collected, most
      states require you to remit <em>use tax</em> when you file your
      income taxes. It&rsquo;s at the same rate as sales tax. Historically
      unenforced for small purchases, but states now require online
      marketplaces to collect and remit, which mostly resolves this for
      consumers. For big cross-state buys &mdash; a car, furniture, art
      &mdash; use tax is real and audited.
    </p>

    <h2>Discounted-price calculation</h2>
    <p>
      Tax is applied after percent-off discounts. Store coupons reduce the
      taxable base. Manufacturer coupons in most states do <em>not</em>
      &mdash; tax is on the pre-coupon price because the manufacturer
      reimburses the store.
    </p>
    <pre>{`store coupon:  tax on (price - coupon)
mfg coupon:    tax on full price
rebate:        tax on full price (you get rebate later)`}</pre>

    <h2>Rounding rules</h2>
    <p>
      Tax is usually calculated to the penny on the total invoice, not
      line-by-line. A few systems still round per line, which creates
      small discrepancies. If a $3.33 item shows $0.27 tax instead of $0.28
      under 8.25%, it&rsquo;s because 3.33 &times; 0.0825 = 0.2747
      &mdash; rounded down to $0.27.
    </p>

    <h2>Reverse-calculating from a receipt</h2>
    <p>
      If you only have the total and know the rate, back out the subtotal:
    </p>
    <pre>{`subtotal = total / (1 + rate)
tax      = total - subtotal

total = 108.25, rate = 8.25%
subtotal = 108.25 / 1.0825 = 100.00
tax      = 8.25`}</pre>

    <h2>Common mistakes</h2>
    <p>
      Using the state rate and missing the local stack &mdash; you can be
      off by 3%+. Applying tax to the full price when a store coupon was
      used. Forgetting tax-exempt categories (groceries, clothing in some
      states). Mis-converting inclusive to exclusive by subtracting the
      rate instead of dividing. And assuming online purchases are
      tax-free &mdash; post-2018, nearly all major sellers collect.
    </p>

    <h2>Run the numbers</h2>
    <p>
      <a href="/tools/sales-tax-calculator">Sales tax calculator</a>
      <a href="/tools/tip-calculator">Tip calculator</a>
      <a href="/tools/discount-calculator">Discount calculator</a>
    </p>
  </>
);
