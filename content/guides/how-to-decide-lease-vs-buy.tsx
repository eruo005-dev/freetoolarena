import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Lease or buy is one of the most common and most mis-argued personal finance decisions.
      The loudest voices say &ldquo;leasing is a rip-off&rdquo; or &ldquo;buying is a waste
      of capital.&rdquo; Both statements are too simple. The actual answer depends on how
      long you&rsquo;ll keep the vehicle, how many miles you drive, how much you value new
      features, your tax situation, and where the car sits on its depreciation curve. This
      guide compares total cost of ownership for both options, explains residual values,
      mileage caps, business-use deductions, and walks through the specific scenarios where
      leasing beats buying &mdash; and the many more where buying (especially used) wins.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. What you&rsquo;re actually paying for</h2>
    <p>
      <strong>Buying</strong>: you pay for the whole vehicle (minus trade-in), keep it until
      you sell, and absorb all the depreciation.
    </p>
    <p>
      <strong>Leasing</strong>: you pay for the depreciation that happens during the lease
      term plus a financing charge (money factor), then hand the car back.
    </p>
    <pre>{`lease payment ≈ (cap cost - residual value) / term + money factor + tax`}</pre>
    <p>
      If a $45,000 car is worth $27,000 after 36 months, you&rsquo;re financing $18,000 of
      depreciation plus interest over 36 months = ~$550/month. Buying the same car with a
      loan would be $750/month, but you keep an asset worth $27k at the end.
    </p>

    <h2>2. Total cost of ownership over time</h2>
    <p>
      5-year comparison on a $40,000 sedan:
    </p>
    <pre>{`Buy (60-month loan, 6%):
  Payments:       $46,400
  After 5 years:  worth ~$18,000
  Net cost:       $28,400

Lease (3-year then new 3-year):
  Payments (6 yr): $42,000
  Residual at 6:   $0
  Net cost:        $42,000`}</pre>
    <p>
      Over 5-6 years, buying is typically $10k-20k cheaper. The gap widens the longer you
      keep the car.
    </p>

    <h2>3. The depreciation curve</h2>
    <p>
      A new car loses ~20% of value in year 1, another ~15% in year 2, then ~10% per year
      through year 5. Years 1-3 are the most expensive years of ownership per mile.
    </p>
    <ul>
      <li>Year 0-3: ~40-50% depreciation (lease sweet spot)</li>
      <li>Year 3-6: ~20% depreciation</li>
      <li>Year 6-10: ~10-15% depreciation</li>
    </ul>
    <p>
      Buying 2-3 year-old used captures the post-depreciation value phase. This is why
      buying used is the mathematically dominant option for most households.
    </p>

    <h2>4. Residual value explained</h2>
    <p>
      The residual is the manufacturer&rsquo;s guaranteed buyback price at lease end. High
      residuals = cheaper lease payments. Different models have very different residuals:
      Toyota and Honda hold value best, German luxury and most EVs depreciate fast. When
      comparing leases, look at residual as % of MSRP after 36 months &mdash; 55%+ is
      excellent, below 45% means steep lease payments.
    </p>

    <h2>5. Mileage caps</h2>
    <p>
      Standard leases allow 10,000, 12,000, or 15,000 miles per year. Excess mileage costs
      $0.15-0.30 per mile. A driver who logs 20,000 miles/year on a 12,000-mile lease faces
      $7,200-14,400 in overage over a 3-year lease. If you drive more than 15k/year,
      leasing is almost always wrong. Higher-mileage lease packages exist but price in the
      extra depreciation up front.
    </p>

    <h2>6. The money factor</h2>
    <p>
      Leases hide the interest rate as a &ldquo;money factor.&rdquo; To convert:
    </p>
    <pre>{`APR ≈ money factor × 2400`}</pre>
    <p>
      Money factor of 0.00250 = roughly 6% APR. Always ask for the money factor and compare
      it to a typical auto loan rate. Dealers mark up the money factor for profit just like
      they mark up loan rates.
    </p>

    <h2>7. When leasing actually makes sense</h2>
    <ul>
      <li>
        <strong>Business use with tax deductions.</strong> If the vehicle is primarily for
        business, lease payments (including the business-use %) are deductible, often more
        favorably than a purchase.
      </li>
      <li>
        <strong>You always want the newest model.</strong> Someone who would replace a car
        every 3 years regardless spends similar money either way, but leasing skips the
        sale hassle.
      </li>
      <li>
        <strong>You want warranty coverage for the whole period.</strong> Leases typically
        match the 3-year bumper-to-bumper warranty window.
      </li>
      <li>
        <strong>Electric vehicles with tech risk.</strong> EV tech is improving fast and
        batteries degrade. Leasing offloads that risk to the manufacturer.
      </li>
      <li>
        <strong>High residual + low money factor promos.</strong> Manufacturer incentives
        occasionally make a specific lease cheaper than equivalent financing.
      </li>
    </ul>

    <h2>8. When buying is obviously better</h2>
    <ul>
      <li>You keep cars for 6+ years</li>
      <li>You drive more than 15,000 miles/year</li>
      <li>You have kids, pets, or hobbies that wear interiors (lease damage fees)</li>
      <li>You want to modify the vehicle</li>
      <li>You have the cash or can afford the payment without stretching</li>
      <li>You can buy 2-3 year old used with low mileage</li>
    </ul>

    <h2>9. Buy used: the quiet win</h2>
    <p>
      A 3-year-old certified pre-owned (CPO) vehicle from a major brand:
    </p>
    <ul>
      <li>Costs ~60% of new MSRP</li>
      <li>Often has remaining factory warranty</li>
      <li>Has already weathered the steepest depreciation</li>
      <li>Continued ownership drives out TCO/year</li>
    </ul>
    <p>
      For most households, this is the financially optimal path. New-car leasing and new-car
      buying both lose to CPO on a 10-year cost basis.
    </p>

    <h2>10. Lease-end options</h2>
    <p>
      At lease end you can:
    </p>
    <ul>
      <li>Return the car (most common)</li>
      <li>Buy it at the residual value (sometimes a good deal if market value is higher)</li>
      <li>Trade in for another lease or purchase</li>
    </ul>
    <p>
      In 2021-2023, used car values spiked and residuals set in 2020 were suddenly below
      market &mdash; lease buyouts became the best auto deals available. Always check
      market value against residual before returning the car.
    </p>

    <h2>11. Gap insurance and wear-and-tear</h2>
    <p>
      Leases almost always require gap insurance (covers the gap between what you owe and
      what the car is worth if totaled). Often built into the lease. Wear-and-tear charges
      at return can be significant: dings, scratches beyond a credit-card-size, stained
      upholstery, excess mileage, even unusual tire wear. Budget for $500-2,000 at return.
    </p>

    <h2>12. The psychological trap</h2>
    <p>
      Lease marketing leans hard on monthly payment: &ldquo;Only $399/month!&rdquo; This
      anchors on payment, not total cost. A $399 lease on a $55k car that you replace every
      3 years is $143,600+ over 30 years with nothing to show. The same 30 years of
      buying-and-keeping-for-10 years costs $90-100k and leaves you with a working vehicle
      at year 30.
    </p>

    <h2>13. Common mistakes</h2>
    <ul>
      <li>
        <strong>Comparing lease payment to loan payment.</strong> Different products; compare
        total 6-year or 10-year cost.
      </li>
      <li>
        <strong>Ignoring mileage reality.</strong> &ldquo;I&rsquo;ll drive less next year.&rdquo;
        You won&rsquo;t.
      </li>
      <li>
        <strong>Signing a high money factor.</strong> Always negotiate the money factor —
        dealers rarely offer the best they can do.
      </li>
      <li>
        <strong>Treating lease as renting.</strong> You&rsquo;re still on the hook for
        maintenance, insurance, damage, and excess mileage.
      </li>
      <li>
        <strong>Leasing without doing the 5-year math.</strong> Run the numbers both ways,
        at least once.
      </li>
    </ul>

    <h2>14. Run the numbers</h2>
    <p>
      Enter the car price, loan terms, lease payment, residual, and expected annual mileage
      to see which comes out ahead over your planned ownership period.
    </p>
    <p>
      <a href="/tools/lease-vs-buy-calculator">Lease vs buy calculator</a>
      <a href="/tools/auto-loan-calculator">Auto loan calculator</a>
      <a href="/tools/loan-calculator">Loan calculator</a>
    </p>
  </>
);
