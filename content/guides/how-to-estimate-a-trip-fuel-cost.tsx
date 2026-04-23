import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Road trip fuel cost is one of the simplest calculations in personal finance, yet it&rsquo;s
      routinely off by 30-50% when people estimate by gut. The basic formula is three numbers
      multiplied together: distance, fuel price, and fuel economy. Getting each number right
      &mdash; and knowing when city MPG applies vs highway MPG, how elevation and headwinds
      affect consumption, and how to compare two different vehicles or routes &mdash; lets
      you make informed decisions about whether to drive, fly, or take the train. This guide
      lays out the formula, the realistic inputs, and the common-sense adjustments that
      make estimates actually match what shows up at the pump.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The basic formula</h2>
    <pre>{`fuel cost = (distance / MPG) × price per gallon

In metric:
fuel cost = (distance × L/100km / 100) × price per liter`}</pre>
    <p>
      A 1,200-mile road trip in a 30 MPG car at $3.50/gallon: <code>1200 / 30 × 3.50 =
      $140</code>. A 2,000-km trip at 8 L/100km and &euro;1.80/L:
      <code> 2000 × 8 / 100 × 1.80 = &euro;288</code>.
    </p>

    <h2>2. Which MPG number to use</h2>
    <p>
      Most cars publish three EPA numbers: city, highway, and combined. For road trips, use
      <strong> highway MPG</strong>; for city driving, use <strong>city MPG</strong>. For
      mixed, the combined is a good default. Real-world MPG is typically 10-15% below EPA
      window-sticker numbers because EPA tests are conducted under idealized conditions.
    </p>
    <p>
      Your own fuel logs are the best source of truth. After 3-5 fill-ups, you&rsquo;ll
      know your car&rsquo;s real MPG to within 1-2 MPG.
    </p>

    <h2>3. City vs highway: the gap can be huge</h2>
    <p>
      Typical modern car:
    </p>
    <ul>
      <li>City: 25-28 MPG</li>
      <li>Highway: 35-40 MPG</li>
      <li>Combined: 30-33 MPG</li>
    </ul>
    <p>
      Hybrids flip the gap: Priuses get <em>better</em> city MPG than highway because
      regenerative braking recaptures energy. Diesel trucks and large SUVs can have 40%+
      worse city MPG than highway. Always apply the right number.
    </p>

    <h2>4. Factors that reduce real-world MPG</h2>
    <ul>
      <li><strong>Speed above 60-65 mph</strong>: every 10 mph over 65 costs ~10% MPG</li>
      <li><strong>Headwinds / crosswinds</strong>: 5-15% penalty</li>
      <li><strong>Rain or snow</strong>: 5-20% penalty</li>
      <li><strong>Mountain driving uphill</strong>: 20-40% penalty on the climb</li>
      <li><strong>Cold weather</strong> (especially under 20°F): 15-30% penalty</li>
      <li><strong>AC on at high temps</strong>: 5-10% penalty</li>
      <li><strong>Roof box or bike rack</strong>: 10-25% penalty</li>
      <li><strong>Heavy cargo</strong>: ~1% per 100 lbs above curb weight</li>
      <li><strong>Low tire pressure</strong>: 0.2% per 1 psi under spec</li>
    </ul>
    <p>
      Stacking factors: a mountain road trip in winter with a roof box can cut MPG by
      40%+. Budget accordingly.
    </p>

    <h2>5. A worked trip example</h2>
    <p>
      Los Angeles to San Francisco, 380 miles, mostly highway, mostly flat, mid-size sedan
      rated 35 highway MPG, gas at $4.20/gal:
    </p>
    <pre>{`gallons needed = 380 / 35 = 10.86 gallons
fuel cost = 10.86 × $4.20 = $45.60`}</pre>
    <p>
      Apply 10% for headwinds and hills: ~$50 all-in. A pickup at 20 MPG highway: $80.
      An EV at 3.5 mi/kWh and $0.35/kWh charging: ~$38. An Amtrak coach ticket: $60-80.
      All competitive for a solo trip; EV wins with 2+ passengers.
    </p>

    <h2>6. Multi-leg trip math</h2>
    <p>
      Trips with mixed highway and urban driving need leg-by-leg breakdown:
    </p>
    <pre>{`LA → Phoenix (highway, 400 mi @ 35 MPG) = 11.4 gal
Phoenix city (3 days, 75 mi @ 25 MPG)    =  3.0 gal
Phoenix → LA (highway, 400 mi)           = 11.4 gal
Total: 25.8 gal × $4.00/gal              = $103`}</pre>
    <p>
      Don&rsquo;t average one MPG number across a whole trip if conditions vary. Split legs
      and use appropriate MPG per segment.
    </p>

    <h2>7. Elevation change</h2>
    <p>
      Climbing eats fuel; descending gives some back (but only if you coast). A trip from
      Denver (5,280 ft) to Aspen (7,908 ft) at moderate grade can reduce MPG by 20-30%
      going up. Coming back, you&rsquo;ll recover 10-15%. Net: ~10% penalty for round trip
      through mountains. One-way: ~25% penalty uphill, 10% gain downhill.
    </p>

    <h2>8. Price hunting along the route</h2>
    <p>
      Fuel prices vary by 40 cents/gallon within 50 miles in many regions. GasBuddy and
      Google Maps now show live prices. For a 12-gallon fill-up, a 30-cent savings is
      $3.60. Across a road trip with 5 fill-ups, that&rsquo;s $18. Worth a 2-minute check
      but not a 20-mile detour. State borders can be dramatic — Oregon to California, New
      Jersey to New York can swing $0.50+.
    </p>

    <h2>9. Diesel and premium considerations</h2>
    <p>
      Diesel runs $0.30-0.80 higher per gallon than regular. Premium (91+ octane) runs
      $0.30-0.60 higher. If your engine requires premium, don&rsquo;t downgrade &mdash;
      knock sensors will pull timing and hurt both MPG and power. If your car only
      &ldquo;recommends&rdquo; premium, regular is fine most of the time at a small MPG
      penalty (2-4%).
    </p>

    <h2>10. Comparing two vehicles</h2>
    <p>
      For the same 5,000 miles/year:
    </p>
    <pre>{`20 MPG SUV:     250 gallons × $3.50 = $875/year
30 MPG sedan:   167 gallons × $3.50 = $584/year
40 MPG hybrid:  125 gallons × $3.50 = $437/year
EV (3 mi/kWh):  1,667 kWh × $0.18   = $300/year`}</pre>
    <p>
      Over 10 years, the SUV costs $4,400 more than the hybrid in fuel alone. Weight that
      against purchase price, maintenance, and insurance differences.
    </p>

    <h2>11. EV road trip math</h2>
    <p>
      EVs are priced by kWh:
    </p>
    <pre>{`cost = (distance / mi per kWh) × price per kWh`}</pre>
    <p>
      At-home charging (off-peak): $0.08-0.15/kWh &mdash; far cheaper than gas. DC fast
      chargers on highways: $0.35-0.60/kWh &mdash; often close to gas cost per mile. Road
      trip EV costs vary wildly by charger network. Plan charger stops with ABRP (A Better
      Route Planner) before leaving.
    </p>

    <h2>12. Tolls, ferries, and non-fuel costs</h2>
    <p>
      A road trip budget should include:
    </p>
    <ul>
      <li>Tolls: look up by route ($0-100+ for interstate trips through northeast)</li>
      <li>Ferries: $10-100+ where applicable</li>
      <li>Parking at destination: often forgotten</li>
      <li>Wear and tear (IRS standard mileage is 67 cents/mile for a reason — fuel is less than half)</li>
    </ul>
    <p>
      For true road-trip total cost, apply the IRS rate for depreciation estimation on the
      vehicle side.
    </p>

    <h2>13. Fuel-saving driving habits</h2>
    <ul>
      <li>Steady speed: cruise control on flat highway</li>
      <li>Anticipate stops: coast rather than brake</li>
      <li>Drive 60-65 mph if time allows &mdash; saves 10-15% over 75 mph</li>
      <li>Avoid jackrabbit starts: 20-40% fuel penalty in city</li>
      <li>Check tire pressure monthly</li>
      <li>Remove roof boxes when not in use</li>
    </ul>

    <h2>14. Common mistakes</h2>
    <ul>
      <li>
        <strong>Using combined MPG for a pure highway trip.</strong> Understates MPG by
        15-20% and overstates fuel cost.
      </li>
      <li>
        <strong>Assuming EPA numbers.</strong> Most cars return 10-15% less in real world.
      </li>
      <li>
        <strong>Ignoring weather.</strong> A winter trip in a cold car can burn 25%+ more.
      </li>
      <li>
        <strong>Forgetting tolls.</strong> I-95 corridor tolls easily add $30-80 to a trip.
      </li>
      <li>
        <strong>Not logging your own MPG.</strong> Your car&rsquo;s real MPG is the only
        number that matters.
      </li>
    </ul>

    <h2>15. Run the numbers</h2>
    <p>
      Enter your distance, MPG, and fuel price below for a fast estimate, then layer on
      any of the adjustments from this guide for route-specific accuracy.
    </p>
    <p>
      <a href="/tools/fuel-cost-calculator">Fuel cost calculator</a>
      <a href="/tools/moving-cost-calculator">Moving cost calculator</a>
      <a href="/tools/trip-cost-calculator">Trip cost calculator</a>
    </p>
  </>
);
