import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Tipping is straightforward math wrapped in a pile of social
      convention that changes by country, by industry, and by whether
      you&rsquo;re in a booth or at the counter. This guide covers the
      quick mental math for 15/18/20%, how tipping differs country by
      country, when to tip on pre-tax vs post-tax, how to handle
      split checks, and the edge cases most people get wrong.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The quick mental math</h2>
    <p>
      <strong>10%:</strong> move the decimal left one place. $47.80
      bill → $4.78 tip.
    </p>
    <p>
      <strong>20%:</strong> double the 10%. $47.80 → $9.56.
    </p>
    <p>
      <strong>15%:</strong> 10% + half of 10%. $47.80 → $4.78 +
      $2.39 = $7.17.
    </p>
    <p>
      <strong>18%:</strong> 20% minus 10% of 20% (i.e., 20% × 0.9).
      Or just split the difference between 15% and 20%. $47.80 →
      about $8.60.
    </p>
    <p>
      For faster mental math on the fly: round the bill up to the
      nearest $5, take 20%, and you&rsquo;re typically within $0.50
      of the actual 18-20%.
    </p>

    <h2>Pre-tax vs post-tax</h2>
    <p>
      In the US: tradition is to tip on the pre-tax subtotal,
      especially in states with high sales tax (California at 7.25%+,
      Tennessee at 9.5%+). Tipping post-tax inflates your effective
      tip by ~1-2 percentage points.
    </p>
    <p>
      In practice most people tip on the total shown, because the
      subtotal requires mental work. Not a huge deal — pick a
      convention and stick with it.
    </p>
    <p>
      Most card readers default to tip on the post-tax total
      (&ldquo;Total including tax&rdquo;). If you want to tip on
      pre-tax, you may need to enter a dollar amount rather than a
      percentage.
    </p>

    <h2>US tipping standards by industry</h2>
    <p>
      <strong>Sit-down restaurant:</strong> 18-22% standard. 15% is
      the bare minimum for adequate service and is read as
      dissatisfaction.
    </p>
    <p>
      <strong>Counter service / coffee shop:</strong> 10-15% if
      tipping; $1-2 per drink is fine. The card-reader prompt for
      20-25% at a coffee shop is aggressive — feel free to use
      &ldquo;custom&rdquo; or &ldquo;no tip.&rdquo;
    </p>
    <p>
      <strong>Delivery driver:</strong> 15-20%, minimum $5 on small
      orders. Delivery apps often separate this from the &ldquo;delivery
      fee&rdquo; — that fee does not go to the driver.
    </p>
    <p>
      <strong>Taxi / rideshare:</strong> 15-20%. Round up for short
      trips.
    </p>
    <p>
      <strong>Bartender:</strong> $1-2 per drink, or 15-20% of the
      tab if running one.
    </p>
    <p>
      <strong>Hairdresser / barber:</strong> 15-20%.
    </p>
    <p>
      <strong>Hotel housekeeping:</strong> $3-5 per night, left
      daily. Leaving a lump sum on the last day typically goes to
      whoever cleans that day, not the person who cleaned the rest
      of the week.
    </p>
    <p>
      <strong>Hotel bellhop / valet:</strong> $2-5 per bag or car.
    </p>

    <h2>Tipping abroad — the rules change</h2>
    <p>
      <strong>Europe (general):</strong> service is often included
      (&ldquo;service compris&rdquo;). A round-up or 5-10% is
      generous. 20% is wildly excessive in most of continental
      Europe.
    </p>
    <p>
      <strong>UK:</strong> 10-12.5% at sit-down restaurants; often
      added as &ldquo;optional service charge&rdquo; on the bill
      (check before tipping again).
    </p>
    <p>
      <strong>Japan:</strong> no tipping. Attempting to tip can be
      confusing or mildly rude — the service culture treats it as
      &ldquo;your price already includes good service.&rdquo;
    </p>
    <p>
      <strong>Australia / New Zealand:</strong> not expected. Round
      up or leave a small amount for exceptional service; not a
      percentage.
    </p>
    <p>
      <strong>China:</strong> historically not customary; changing
      in upscale international hotels but still uncommon in most
      restaurants.
    </p>
    <p>
      <strong>South Korea:</strong> not customary. Tip jars at coffee
      shops exist but are for loose change.
    </p>
    <p>
      <strong>Middle East (UAE, Saudi):</strong> 10% often included
      as service charge; an additional 5-10% for good service.
    </p>
    <p>
      <strong>Latin America (Mexico, Argentina):</strong> 10-15%
      typical, often on pre-tax; check if &ldquo;propina&rdquo; is
      already on the bill.
    </p>

    <h2>Splitting the check — the right way</h2>
    <p>
      Even split: take the total (including tip), divide by number
      of people. Fastest at the table.
    </p>
    <p>
      Itemized split: each person pays their own items + a pro-rata
      share of tax and tip. Fairer when orders differ
      significantly. Apps like Tab or Splitwise handle this; so
      does <a href="/tools/tip-calculator">our tip calculator</a>
      {" "}with a split field.
    </p>
    <p>
      If one person is clearly ordering much more (steak vs salad,
      multiple drinks vs water), itemized is fair. If orders are
      similar, even-split is faster and avoids nickel-and-diming.
    </p>
    <p>
      When paying by card with multiple cards: waitstaff can usually
      split evenly but dislike splitting by item. Do itemized
      calculations yourself and tell them the per-card amount.
    </p>

    <h2>Large-party auto-gratuity</h2>
    <p>
      Parties of 6 or 8+ often see an automatic 18-20% gratuity
      already added to the bill. This should be disclosed on the
      menu. If it&rsquo;s included:
    </p>
    <p>
      You don&rsquo;t need to tip additionally unless service was
      exceptional. Adding another 20% on top effectively doubles the
      tip.
    </p>
    <p>
      The amount shown on the tip line of the receipt should be $0
      or blank (not re-tipped). Some card readers still prompt for
      an additional tip — it&rsquo;s OK to leave it blank.
    </p>

    <h2>When to tip more (or less)</h2>
    <p>
      <strong>Tip more:</strong> exceptional service, difficult
      requests accommodated, holidays, end-of-year for regular
      staff, bad weather for delivery, large parties without
      auto-gratuity.
    </p>
    <p>
      <strong>Tip less:</strong> genuinely bad service. Standard
      guidance is to still leave 10% and speak to the manager, not
      zero out — the person may not control kitchen speed, etc.
    </p>
    <p>
      Never tip 0% as a silent protest — it reads as forgetting,
      not as a message. If service was unacceptable, say so (kindly)
      and tip 10% or use management.
    </p>

    <h2>Cash vs card</h2>
    <p>
      Cash tips typically reach the worker faster (same shift) and
      in full. Card tips go through payroll and may take 1-2 weeks
      to hit their account; in some systems, a percentage is withheld
      for processing fees.
    </p>
    <p>
      If the bill is on card and you&rsquo;d like to tip in cash:
      write &ldquo;Cash&rdquo; or zero on the tip line and leave
      cash on the table.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compute tip + per-person split with the{" "}
      <a href="/tools/tip-calculator">tip calculator</a>. Pair with
      the <a href="/tools/budget-calculator">budget calculator</a>
      {" "}if dining out is a regular line item, and the{" "}
      <a href="/tools/currency-converter">currency converter</a> when
      calculating tips in a foreign currency.
    </p>
  </>
);
