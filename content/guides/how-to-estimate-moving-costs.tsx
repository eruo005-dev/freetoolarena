import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Moving always costs more than you think. The obvious line item is the truck or mover,
      but the hidden costs &mdash; packing supplies, insurance, utility transfers, cleaning,
      time off work, deposits, and moving tips &mdash; can easily double the sticker price.
      A local DIY move can run $500-1,500. A long-distance full-service move can run
      $3,000-12,000. Interstate moves of a whole house routinely hit $10,000+. This guide
      breaks down each cost category, compares DIY, hybrid, and full-service options, and
      gives you a methodology for getting accurate estimates that don&rsquo;t balloon on
      move day.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The three move types</h2>
    <ul>
      <li>
        <strong>DIY</strong>: you rent the truck, pack, load, drive, unload. Cheapest, most
        time-intensive, most physically demanding.
      </li>
      <li>
        <strong>Hybrid (&ldquo;you pack, they drive&rdquo;)</strong>: portable container
        services (PODS, U-Pack) or hired labor for loading only. Middle option.
      </li>
      <li>
        <strong>Full-service</strong>: professional movers pack, load, transport, unload,
        sometimes unpack. Easiest, most expensive.
      </li>
    </ul>

    <h2>2. DIY local move cost breakdown</h2>
    <p>
      Typical 2-bedroom local DIY move (under 50 miles):
    </p>
    <ul>
      <li>Truck rental (U-Haul 17&rsquo;, 1 day): $80-150</li>
      <li>Mileage: $0.70-1.20/mile (often included short-range)</li>
      <li>Fuel: $60-120 depending on truck size and distance</li>
      <li>Truck insurance: $25-60</li>
      <li>Packing supplies: $100-300</li>
      <li>Moving blankets/dolly rental: $30-60</li>
      <li>Friends and pizza: $50-100</li>
      <li>Cleaning supplies or cleaning service for old place: $0-200</li>
    </ul>
    <p>
      Total: <strong>$350-1,000</strong>. Add $200-500 if you hire loaders for 2-3 hours.
    </p>

    <h2>3. Full-service local move</h2>
    <p>
      Professional movers charge hourly for local moves, typically $100-200/hour for 2-3
      movers with a truck. A 2-bedroom typically takes 4-6 hours. Expect:
    </p>
    <ul>
      <li>Labor: $500-1,200</li>
      <li>Truck fee / travel fee: $50-150</li>
      <li>Packing service (optional): $200-500 per room</li>
      <li>Packing supplies if they provide: $50-150</li>
      <li>Tip: 15-20% of labor cost</li>
    </ul>
    <p>
      Total: <strong>$700-2,500</strong> for a 2BR local move.
    </p>

    <h2>4. Long-distance moves: weight and distance</h2>
    <p>
      Interstate moves are priced by weight of goods plus distance. Key formula:
    </p>
    <pre>{`interstate cost ≈ weight (lbs) × rate per lb × distance factor + services`}</pre>
    <p>
      A typical 2-bedroom home (5,000-7,000 lbs) moving 1,000 miles runs $3,000-6,000.
      3-bedroom (8,000-10,000 lbs) across country: $6,000-12,000. 4+ bedroom: $10,000-$20,000.
      The single biggest variable cost you can control: <strong>declutter before the
      weight inventory</strong>.
    </p>

    <h2>5. Declutter: the highest-leverage prep</h2>
    <p>
      Every pound you move costs money twice &mdash; the move, and later when you discard it
      anyway. Sell, donate, or toss:
    </p>
    <ul>
      <li>Furniture you haven&rsquo;t used in a year</li>
      <li>Anything you won&rsquo;t miss: old electronics, duplicate kitchenware, outgrown clothes</li>
      <li>Books you&rsquo;re not re-reading (books are heavy)</li>
      <li>Gym equipment that&rsquo;s been a clothes rack</li>
    </ul>
    <p>
      Reducing move weight by 2,000 lbs can save $1,000-2,000 on a long-distance move.
    </p>

    <h2>6. Packing supply budget</h2>
    <p>
      Typical 2-bedroom needs:
    </p>
    <ul>
      <li>30-50 boxes (small, medium, large mix): $80-200</li>
      <li>Tape (6-10 rolls): $25-50</li>
      <li>Bubble wrap: $25-50</li>
      <li>Packing paper (5 lb bundle): $20-40</li>
      <li>Markers, labels: $10-20</li>
      <li>Wardrobe boxes (3-5): $40-100</li>
      <li>Mattress bags, dish packs: $30-80</li>
    </ul>
    <p>
      Total new: $200-500. Save 50-70% by asking liquor stores for boxes, sourcing from
      local Buy Nothing groups, or using Home Depot&rsquo;s moving supply program.
    </p>

    <h2>7. Moving insurance</h2>
    <p>
      By federal law, interstate movers offer two tiers:
    </p>
    <ul>
      <li>Released value (free, 60 cents per pound): if they break your $3,000 TV, you get $6 per pound = maybe $30</li>
      <li>Full value protection (2-5% of declared value): actual replacement</li>
    </ul>
    <p>
      Full value on a $40,000 house of goods costs $800-2,000. Third-party movers insurance
      via your home or renters policy can be cheaper. Never decline coverage on a long-haul
      move — one bad accident can cost $5,000+ in damaged goods.
    </p>

    <h2>8. Hidden fees in full-service moves</h2>
    <ul>
      <li>Long carry fee: if truck can&rsquo;t park within 75 feet of door</li>
      <li>Stair fee: per flight above the first</li>
      <li>Elevator fee: if elevator must be reserved or used</li>
      <li>Shuttle fee: if a smaller truck is needed for narrow streets</li>
      <li>Piano/safe/hot tub fee: specialty items</li>
      <li>Storage in transit (SIT): $100-300/month if delivery is delayed</li>
      <li>Packing materials (if not quoted): $200-600</li>
    </ul>
    <p>
      Ask specifically about all of these in the quote. Reputable movers will list them
      up front; shady ones surprise you on delivery day with a higher bill to release goods.
    </p>

    <h2>9. Getting accurate estimates</h2>
    <p>
      Three types of estimates:
    </p>
    <ul>
      <li>
        <strong>Non-binding</strong>: rough guess; final bill can be higher. Avoid.
      </li>
      <li>
        <strong>Binding</strong>: fixed price based on inventory, no matter the actual weight.
      </li>
      <li>
        <strong>Binding not-to-exceed</strong>: caps the price; if actual weight is less,
        you pay less. Best option.
      </li>
    </ul>
    <p>
      Always get 3+ quotes with in-home (virtual or physical) inventory surveys. Avoid
      anyone quoting by phone alone — that&rsquo;s the classic hostage-freight scam setup.
    </p>

    <h2>10. Ancillary moving costs</h2>
    <ul>
      <li>Security deposit on new place: 1-2 months rent</li>
      <li>First + last month (common in tight markets)</li>
      <li>Pet fees, cleaning fees, key fees</li>
      <li>Utility transfer / deposit fees: $50-300 per utility</li>
      <li>Internet install: $0-200</li>
      <li>New driver&rsquo;s license, registration (across states): $50-400</li>
      <li>New plates, safety inspections: $50-200</li>
      <li>Restocking essentials in new kitchen/bathroom: $200-500</li>
    </ul>
    <p>
      These aren&rsquo;t technically &ldquo;moving&rdquo; but they hit in the same month and
      blow budgets. Add $1,000-3,000 in ancillaries for a cross-country move.
    </p>

    <h2>11. Time off work</h2>
    <p>
      Moving typically requires 1-3 days of PTO, plus some amount of remote-work disruption.
      For an hourly worker, that&rsquo;s real income. For salaried, it&rsquo;s vacation days
      you&rsquo;re burning. Include this in the total move cost comparison between DIY
      (more days) and full-service (fewer days).
    </p>

    <h2>12. Interstate and international scam flags</h2>
    <ul>
      <li>Lowball estimate over the phone</li>
      <li>Required large deposit up front</li>
      <li>No physical address or DOT number listed</li>
      <li>Demand for cash only</li>
      <li>Refusal to provide binding estimates</li>
      <li>Reviews mention hostage freight (holding goods for extra payment)</li>
    </ul>
    <p>
      Always verify the company&rsquo;s USDOT and MC numbers at <em>fmcsa.dot.gov</em>. For
      international moves, check the AMSA member list.
    </p>

    <h2>13. Common mistakes</h2>
    <ul>
      <li>
        <strong>Estimating off weight you haven&rsquo;t decluttered.</strong> Every pound
        kept costs twice.
      </li>
      <li>
        <strong>Taking the cheapest quote.</strong> Usually the scammer.
      </li>
      <li>
        <strong>Skipping insurance.</strong> 60 cents/pound coverage won&rsquo;t replace
        anything worth owning.
      </li>
      <li>
        <strong>Forgetting ancillary costs.</strong> Deposits and setup fees pile up to
        $1-3k.
      </li>
      <li>
        <strong>Booking late.</strong> Summer moves (May-August) book out and cost 20-30%
        more. Book 6-8 weeks ahead.
      </li>
    </ul>

    <h2>14. Run the numbers</h2>
    <p>
      Plug in your home size, distance, and service level to get an estimated all-in cost,
      then compare against your rent-to-income and relocation budget.
    </p>
    <p>
      <a href="/tools/moving-cost-calculator">Moving cost calculator</a>
      <a href="/tools/apartment-affordability-calculator">Apartment affordability calculator</a>
      <a href="/tools/trip-cost-calculator">Trip cost calculator</a>
    </p>
  </>
);
