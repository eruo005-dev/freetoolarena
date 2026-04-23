import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The monthly cost of a pack-a-day habit is quietly one of the
      largest line items in a smoker&rsquo;s budget, and almost nobody
      adds it up. The daily purchase feels trivial; the annual total
      is life-changing. The true cost goes beyond the pack price:
      health insurance surcharges, dental work, home insurance, and
      opportunity cost if that money had been invested instead. This
      guide runs the simple pack-a-day math, then layers in the
      compounding, secondary costs, and motivational framing that
      makes the numbers concrete. The goal isn&rsquo;t guilt &mdash;
      it&rsquo;s showing what quitting unlocks financially so the
      decision becomes easier to make.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Pack-a-day arithmetic</h2>
    <pre>{`Pack price (US average 2025):     ~$8.50
Pack-a-day:                       $8.50 x 365 = $3,102/yr
10 years:                         ~$31,000
20 years:                         ~$62,000
30 years:                         ~$93,000`}</pre>
    <p>
      That&rsquo;s nominal dollars, not inflation-adjusted. Tobacco
      excise taxes keep rising, so the forward cost is higher still.
    </p>

    <h2>Regional price variation</h2>
    <pre>{`New York City:     $14-16/pack   ($5,100-5,800/yr)
Chicago:           $12-13/pack   ($4,380-4,745/yr)
California:        $9-10/pack    ($3,285-3,650/yr)
Virginia:          $6-7/pack     ($2,190-2,555/yr)
Kentucky:          $6-7/pack     ($2,190-2,555/yr)
UK (20-stick):     ~&pound;14 (~$17)   (&pound;5,110/yr)
Australia:         ~AUD 45/pack  (AUD 16,425/yr)`}</pre>
    <p>
      Where you live matters hugely. A New Yorker smokes the equivalent
      of a new used car every two years; a Kentuckian, every four.

    </p>

    <h2>Half-pack, two-pack, and vape</h2>
    <pre>{`Half-pack/day at $8.50:   $1,551/yr
Two-pack/day at $8.50:    $6,205/yr

Vape/e-cig:
Disposables:              $6-8/unit, one per 1-3 days = $900-2,900/yr
Refillable + juice:       $30-60/month = $360-720/yr
Cartridge systems:        $15-25/week = $780-1,300/yr`}</pre>
    <p>
      Vaping is cheaper per session but addiction and frequency often
      drive total spend close to pack-a-day cigarette rates. The
      &ldquo;I&rsquo;ll save money on vape&rdquo; argument rarely
      survives twelve months.
    </p>

    <h2>Compounded opportunity cost</h2>
    <p>
      The real number is what those dollars would have been if
      invested instead. Assume 7% average real return:
    </p>
    <pre>{`$3,102/yr invested at 7% real:
10 years:   $42,900     (vs $31,000 spent)
20 years:   $127,000    (vs $62,000 spent)
30 years:   $293,000    (vs $93,000 spent)
40 years:   $620,000    (vs $124,000 spent)`}</pre>
    <p>
      A pack-a-day smoker in their 20s who quits and invests the
      savings is looking at a quarter-million-dollar retirement
      differential over a working life. At two packs a day, the
      numbers double.
    </p>

    <h2>Secondary costs: insurance</h2>
    <p>
      Smokers pay more for almost every insurance product:
    </p>
    <pre>{`Health insurance (ACA):    up to 50% surcharge allowed
                           typical: $1,000-2,500/yr extra
Life insurance:            2-3x non-smoker premiums
                           $500-2,000/yr extra for similar coverage
Disability:                15-30% higher
Home insurance:            5-15% higher (fire risk)
Auto (in some states):     slight increase`}</pre>
    <p>
      A 35-year-old smoker with modest life cover often pays
      $1,500&ndash;2,500 more per year across policies, entirely
      separate from the packs themselves.
    </p>

    <h2>Secondary costs: dental</h2>
    <p>
      Smoking is one of the largest risk factors for periodontal
      disease, tooth loss, and staining. Typical smoker-specific
      dental costs over a decade:
    </p>
    <ul>
      <li>Teeth whitening: $200&ndash;500 per session, often every 6&ndash;12 months</li>
      <li>Extra cleanings for stain removal: $100&ndash;150 extra per year</li>
      <li>Gum disease treatment (scaling/root planing): $1,000&ndash;4,000</li>
      <li>Implants for lost teeth: $3,000&ndash;5,000 each</li>
    </ul>

    <h2>Secondary costs: medical</h2>
    <p>
      Even before catastrophic illness, smokers have higher baseline
      medical costs:
    </p>
    <ul>
      <li>More respiratory infections, more doctor visits</li>
      <li>Higher prescription costs</li>
      <li>More sick days (~3&ndash;5 extra/yr) with lost wages</li>
      <li>Earlier onset of chronic conditions that compound through life</li>
    </ul>
    <p>
      The CDC estimates smoking-attributable health care spending at
      ~$170 billion/yr in the US &mdash; averaged across smokers,
      about $5,800 per smoker per year. Even discounted for
      attribution uncertainty, the per-person burden is real.
    </p>

    <h2>Home and property costs</h2>
    <p>
      Smoking indoors reduces home resale value ($10,000&ndash;30,000
      at typical prices), requires paint and carpet replacement at
      move-out, and often voids rental security deposits. If you smoke
      in a car, resale value drops $500&ndash;2,000.
    </p>

    <h2>Time cost</h2>
    <p>
      A pack-a-day smoker spends ~30 min/day actively smoking, and
      another 30 min/day on smoke breaks at work, buying packs, etc.
    </p>
    <pre>{`1 hour/day =  365 hours/year  =  15 days/year  =  one work-month`}</pre>
    <p>
      This isn&rsquo;t a scolding &mdash; it&rsquo;s a realistic
      accounting of what quitting returns to your schedule.
    </p>

    <h2>Total annual cost, all-in</h2>
    <pre>{`Pack-a-day in a mid-cost US city, smoker for 10 years:
Cigarettes:             $3,100
Insurance surcharges:   $1,800
Dental extras:          $400
Medical extras:         $400
Opportunity cost:       $4,000/yr (lost compounding, smoothed over 10 yr)
                        --------
True annual cost:       ~$9,700

30-year cumulative:     ~$291,000 in real spending & foregone wealth`}</pre>

    <h2>Savings if you quit today</h2>
    <p>
      Immediate:
    </p>
    <ul>
      <li>Every pack not bought goes to savings/debt/future</li>
      <li>Health/life insurance can re-rate after 12 months smoke-free (up to 50% savings)</li>
      <li>Grocery, gas, and small-purchase savings from fewer convenience-store stops</li>
    </ul>
    <p>
      Future, if invested: compound return of the pack money over
      working life &mdash; often the difference between adequate
      retirement and early retirement.
    </p>

    <h2>Motivation framing</h2>
    <p>
      &ldquo;Quit to save $3,000/year&rdquo; is abstract.
      &ldquo;Each pack you don&rsquo;t buy is $12 toward your vacation
      fund&rdquo; is concrete. Translating to something you want:
    </p>
    <pre>{`Pack not bought  =  $8.50  =  coffee for three days
Week not smoking =  $60    =  night out
Month quit       =  $255   =  weekend trip
Year quit        =  $3,100 =  used car / plane tickets to Asia
Decade quit      =  $40K+  =  down payment / car / fellowship`}</pre>
    <p>
      Auto-transfer the exact pack money to a savings account the
      morning you quit. Within a month the balance makes the
      decision self-reinforcing.
    </p>

    <h2>Quit-aid cost</h2>
    <p>
      Patches, gum, lozenges, Zyban, Chantix: $200&ndash;800 for a
      12-week program. Compared to continued smoking, this pays back
      within 1&ndash;3 months &mdash; a trivial investment against
      annual savings.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Only counting the pack price.</strong> Misses insurance,
      dental, medical, and opportunity cost &mdash; which often
      double or triple the real number.
    </p>
    <p>
      <strong>Assuming vape/nicotine-alternatives are cheap.</strong>{" "}
      The convenience and availability can push spend even higher
      once use frequency increases.
    </p>
    <p>
      <strong>Ignoring inflation.</strong> Tobacco prices rise faster
      than general inflation. Forward cost is understated by today&rsquo;s
      numbers.
    </p>
    <p>
      <strong>Forgetting the time tax.</strong> An hour a day is real
      and never comes back.
    </p>
    <p>
      <strong>Underestimating compounding.</strong> The
      quarter-million-dollar retirement differential isn&rsquo;t
      hyperbole &mdash; it&rsquo;s the math on modest returns over
      30 years.
    </p>
    <p>
      <strong>Not auto-saving the pack money.</strong> Without a
      visible balance, quitting feels like loss, not gain. Automate
      the transfer.
    </p>
    <p>
      <strong>Treating cutbacks as sunk cost.</strong> Even reducing
      half-a-pack still saves $1,500/yr. Don&rsquo;t wait for the
      perfect quit.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Plug daily usage and pack price into the{" "}
      <a href="/tools/smoking-cost-calculator">smoking cost calculator</a>{" "}
      for decade and lifetime totals. Compare against other recurring
      spends in the{" "}
      <a href="/tools/subscription-cost-calculator">subscription cost calculator</a>{" "}
      and model what the same money compounds into with the{" "}
      <a href="/tools/compound-interest-calculator">compound interest calculator</a>{" "}
      &mdash; that&rsquo;s the number that turns a pack into a
      retirement decision.
    </p>
  </>
);
