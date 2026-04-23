import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The &ldquo;exchange rate&rdquo; most travelers think they&rsquo;re
      getting isn&rsquo;t the one they actually get. Between airport
      kiosk markups, ATM fees, card foreign-transaction fees, and
      dynamic currency conversion tricks, the spread between the
      interbank rate and what hits your account can run 3-8% per
      transaction. Over a 2-week trip that&rsquo;s hundreds of
      dollars. This guide walks through the rate types, the cheapest
      ways to get local currency, the traps at point of sale, and
      how to think about hedging for a major purchase abroad.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three exchange rates you&rsquo;ll encounter</h2>
    <p>
      <strong>Interbank / mid-market rate:</strong> the &ldquo;real&rdquo;
      rate. What banks use with each other, what Google and XE show.
      Never what you personally get.
    </p>
    <p>
      <strong>Retail rate:</strong> interbank + a markup that the
      bank or exchange keeps. Typical retail markup: 0.5-3% for card
      networks (Visa/Mastercard), 3-6% for banks, 5-12% for airport
      kiosks and hotels.
    </p>
    <p>
      <strong>Dynamic currency conversion (DCC) rate:</strong> when
      a foreign merchant offers to charge you in your home currency
      instead of theirs. Nearly always 3-8% worse than your card
      network&rsquo;s native rate. Always decline.
    </p>
    <p>
      Rule: compare any offered rate to the mid-market rate on
      Google, not to the rate of another retail service. &ldquo;Only
      2% worse than the bank&rdquo; still means 2% more expensive
      than it should be.
    </p>

    <h2>Best-to-worst ways to get local currency</h2>
    <p>
      <strong>1. Local ATM with a fee-free debit card.</strong>
      Cards like Charles Schwab Investor Checking (US), Starling /
      Revolut / Wise (UK/EU), Chime refund ATM fees. You get the
      interbank rate with minimal markup. Typical total cost:
      0.1-0.5%.
    </p>
    <p>
      <strong>2. Credit card with no foreign transaction fee.</strong>
      Most travel cards (Chase Sapphire, Capital One Venture, etc.)
      give you the network rate with 0% FX fee. Typical cost:
      0.5-1% above interbank.
    </p>
    <p>
      <strong>3. Wise / Revolut / Currencies Direct multi-currency
      accounts.</strong> Hold balances in multiple currencies at
      near-mid-market rates. Good for recurring travelers or
      remote workers with foreign income.
    </p>
    <p>
      <strong>4. Regular bank ATM abroad with a standard debit
      card.</strong> Typical cost: 2-4% FX markup + $3-5 ATM fee.
      Not terrible for occasional use.
    </p>
    <p>
      <strong>5. Local bank exchange (walk-in).</strong> Variable
      rates; usually 1.5-3% above interbank. OK for small amounts.
    </p>
    <p>
      <strong>6. Exchange bureaus in tourist areas.</strong> Usually
      3-6% above interbank. Avoid unless no alternative.
    </p>
    <p>
      <strong>7. Airport currency exchange.</strong> 8-12% above
      interbank. Avoid except for $50-100 of &ldquo;arrival money&rdquo;
      if no other option.
    </p>
    <p>
      <strong>8. Hotel front desk exchange.</strong> Often 10-15%
      above interbank. Emergency only.
    </p>

    <h2>DCC — the trap at the terminal</h2>
    <p>
      At restaurants, shops, and hotels abroad, the card terminal
      may ask: &ldquo;Would you like to pay in USD (your home
      currency) or EUR (local)?&rdquo; This is DCC.
    </p>
    <p>
      The USD option applies a rate set by the merchant or their
      processor — nearly always 3-8% worse than your card
      network&rsquo;s rate. You see the USD number on the receipt
      and think you got clarity; what you got was a markup.
    </p>
    <p>
      <strong>Always choose the local currency.</strong> Your card
      network converts at its own (much better) rate, and you see
      the home-currency number on your statement anyway.
    </p>
    <p>
      DCC is sometimes presented as a &ldquo;service&rdquo; or
      &ldquo;convenience.&rdquo; It is, in fact, a hidden markup.
    </p>

    <h2>Card fees you should know</h2>
    <p>
      <strong>Foreign transaction fee:</strong> a percentage (typically
      1-3%) your bank adds on top of the network rate for any
      transaction in a foreign currency. Travel cards waive this.
    </p>
    <p>
      <strong>Cash advance fee:</strong> using a credit card for an
      ATM withdrawal abroad incurs a cash advance (3-5% + interest
      from day 1). Use debit for ATMs, credit for purchases.
    </p>
    <p>
      <strong>ATM operator fee:</strong> the foreign ATM&rsquo;s own
      fee, independent of your card. $2-5 typical. Some cards (like
      Schwab&rsquo;s) refund these.
    </p>
    <p>
      <strong>Network fee:</strong> Visa and Mastercard add a small
      fee (0.2-1%) even on &ldquo;no FX fee&rdquo; cards. Built into
      the rate; unavoidable.
    </p>

    <h2>Cash vs card strategy</h2>
    <p>
      <strong>Cash still matters</strong> in: rural areas, small
      markets, tipping, taxi drivers, some European countries
      (Germany is surprisingly cash-heavy), emergencies.
    </p>
    <p>
      <strong>Card is better</strong> for: large purchases (better
      rate, fraud protection, built-in travel insurance on many
      cards), restaurants, hotels, transport, online bookings.
    </p>
    <p>
      <strong>Rough allocation:</strong> carry 10-20% of daily
      budget in cash; use card for everything else. Withdraw larger
      ATM amounts (fewer fee events) but don&rsquo;t carry huge
      cash balances.
    </p>

    <h2>Before the trip — preparation checklist</h2>
    <p>
      <strong>Notify your bank and card issuers</strong> of travel
      dates and countries. Reduces fraud blocks on first transaction.
      Many banks now auto-detect travel and this is less critical.
    </p>
    <p>
      <strong>Get a no-FX-fee card</strong> at least a month ahead
      if you don&rsquo;t have one.
    </p>
    <p>
      <strong>Know your ATM PIN as digits.</strong> Many foreign
      ATMs are numeric-only; letter-to-number conversion doesn&rsquo;t
      work.
    </p>
    <p>
      <strong>Check for chip-and-PIN compatibility.</strong> Most
      modern cards work; some still default to signature, which
      doesn&rsquo;t work at automated European train stations and
      toll booths.
    </p>
    <p>
      <strong>Carry a backup card</strong> from a different network.
      If the primary is lost, frozen, or blocked, the trip
      doesn&rsquo;t end.
    </p>

    <h2>Hedging for large purchases abroad</h2>
    <p>
      Buying something expensive in a foreign currency (car, property,
      tuition, wedding venue): exchange-rate moves between agreement
      and payment can cost thousands.
    </p>
    <p>
      <strong>Option 1: lock in with a forward contract.</strong>
      Services like Wise, Currencies Direct, OFX offer forward rates
      — agree today, settle in 30/60/90 days. Eliminates FX risk.
    </p>
    <p>
      <strong>Option 2: buy the currency early.</strong> Convert
      when rate is favorable, park in a multi-currency account.
      Trade-off: opportunity cost on the cash balance.
    </p>
    <p>
      <strong>Option 3: accept the risk.</strong> For &lt;$10k
      purchases, hedging complexity often isn&rsquo;t worth it.
    </p>
    <p>
      Check the 5-year range of the currency pair — if you&rsquo;re
      at a favorable point (e.g., strong home currency), lock in.
    </p>

    <h2>Mental math for quick conversions</h2>
    <p>
      Memorize one anchor. EUR ≈ USD × 1.1 (varies). GBP ≈ USD × 1.25.
      JPY: rough USD × 150. Then round for mental math.
    </p>
    <p>
      For 20 EUR, quick conversion: 20 × 1.1 = 22. That&rsquo;s USD.
    </p>
    <p>
      For a €65 dinner: 65 × 1.1 ≈ 72 USD.
    </p>
    <p>
      Good enough for menus and street pricing. Pull up the exact
      rate for big purchases.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Get live cross-currency rates with the{" "}
      <a href="/tools/currency-converter">currency converter</a>.
      Pair with the{" "}
      <a href="/tools/budget-calculator">budget calculator</a> to
      plan a trip budget in home currency, and the{" "}
      <a href="/tools/tip-calculator">tip calculator</a> for the
      local-custom tip math after you&rsquo;ve converted.
    </p>
  </>
);
