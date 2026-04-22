import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The check lands in the middle of the table, someone pulls out a
      phone, and ten minutes later a group of grown adults is still
      arguing about whether the appetizers count. Splitting a restaurant
      bill fairly is a surprisingly rich math problem — tip before or
      after tax, per-item vs even split, how to handle a shared bottle of
      wine while one person drank water. This guide walks through the
      clean math and the social-math overlay that matters just as much.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The simplest case: even split</h2>
    <p>
      Four people, $120 food, $10 tax, $26 tip (20% pre-tax). Total $156
      ÷ 4 = $39 per person. Takes ten seconds, and — on a bill where
      everyone ate comparably — it&rsquo;s the fairest option. Getting
      precise to the penny wastes far more time than any $2 difference
      matters.
    </p>

    <h2>Tip before or after tax?</h2>
    <p>
      The common convention in the US is to tip on the <em>pre-tax</em>{" "}
      subtotal. Tax is a pass-through to the government; your server
      wasn&rsquo;t involved in generating it. On a $100 food subtotal
      plus $8 tax, 20% tip = $20, not $21.60. The difference is small
      per meal but meaningful over a year of eating out.
    </p>
    <p>
      In practice, the easy-to-compute shortcut of &ldquo;double the
      tax&rdquo; (which gives you tip in many US states) is tipping on
      post-tax numbers. It&rsquo;s fine — servers don&rsquo;t mind — but
      it&rsquo;s a slightly higher tip than 20% pre-tax.
    </p>

    <h2>By-item (itemized) splits</h2>
    <p>
      When the table has big spread — a steak, a salad, three people who
      shared an entrée, one person who ordered wine and another who drank
      water — even-splitting charges the water-drinker for everyone
      else&rsquo;s fun. Itemize.
    </p>
    <p>
      Each person pays for their own items, then tax and tip are allocated
      proportionally. Person A: $40 of food. Person B: $20 of food. On a
      $100 subtotal, Person A owes 40% of tax and tip, Person B owes 20%.
      Not equal shares — <em>proportional</em> shares. The{" "}
      <a href="/tools/bill-split-calculator">bill split calculator</a>{" "}
      handles this cleanly when you enter per-person subtotals.
    </p>

    <h2>Shared items, one person abstains</h2>
    <p>
      Classic case: a bottle of wine for the table, one person is
      pregnant or driving and had water. The socially-correct move is to
      exclude the wine from that person&rsquo;s share. Subtract the wine
      from the subtotal, split the remainder however is otherwise
      appropriate, then split the wine only among the drinkers.
    </p>
    <p>
      Doing this silently is the right move. The abstaining person
      shouldn&rsquo;t have to negotiate it out loud mid-dinner. One
      person at the table does the math and announces per-person totals
      that already bake in the correction.
    </p>

    <h2>Different tip rates per person</h2>
    <p>
      Sometimes one member of the group wants to leave 25% because the
      service was exceptional, and another thinks 18% is the ceiling.
      This gets awkward fast. The cleanest version: announce the group
      tip before splitting (typically 20%), and let the over-tipper drop
      extra cash on the table privately. Mixing tip rates in the per-item
      math is doable but stops being worth it on any bill under $500.
    </p>

    <h2>Credit card surcharges and split-payment friction</h2>
    <p>
      Many restaurants pass along a ~3% surcharge for credit-card
      payments. If the group is paying across cards, that surcharge
      applies to each transaction individually and compounds. Four cards,
      each hit with a 3% surcharge on their portion, is still 3% of the
      total — but if one person is picking up cash from others and
      putting the whole bill on their card, they eat 3% of the full total
      while the cash-payers got off clean. A $2 card-surcharge gap
      isn&rsquo;t worth fighting about, but it&rsquo;s worth understanding
      why the math feels off.
    </p>

    <h2>Rounding and the &ldquo;nobody has a penny&rdquo; problem</h2>
    <p>
      $39.47 per person is a terrible answer because nobody&rsquo;s going
      to hand over $0.47 and track which person gets the short stack of
      quarters. Round up. $40 per person on a $156.47 bill over-pays by
      $3.53, which becomes a slightly bigger tip for the server — a good
      problem to have. The calculator shows both the precise and
      rounded-up amounts so you can pick.
    </p>

    <h2>The social rule that makes it easier</h2>
    <p>
      If one person at the table is the &ldquo;bill math&rdquo; person,
      let them be. They enjoy it, they&rsquo;re faster, and they&rsquo;ll
      announce numbers instead of asking the group to deliberate. The
      worst outcome is seven people simultaneously opening calculator
      apps and three different answers emerging. Nominate one and trust
      the output.
    </p>

    <h2>The 30-second approach</h2>
    <p>
      Open the <a href="/tools/bill-split-calculator">bill split
      calculator</a>, enter the pre-tax subtotal, tax, tip percentage, and
      number of diners. If the meal was roughly even — everyone eating
      similarly — the even split is fine. If not, switch to per-person
      mode, enter each diner&rsquo;s pre-tax subtotal, and let the tool
      allocate tax/tip proportionally. Pair with the{" "}
      <a href="/tools/tip-calculator">tip calculator</a> for tip-only
      math on the same bill.
    </p>
  </>
);
