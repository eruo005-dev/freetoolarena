import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Alcohol math matters more than most drinkers realize. A &ldquo;glass of wine&rdquo; can
      mean 125ml at 11% ABV or 250ml at 14.5% — nearly triple the alcohol for the same name.
      If you want to stay inside health guidelines, track your tolerance, or just know what
      you&rsquo;re actually drinking, you need a consistent unit. The UK uses &ldquo;units&rdquo;
      (10ml of pure alcohol), the US uses &ldquo;standard drinks&rdquo; (14g of pure alcohol),
      and bartenders use neither. This guide gives you the formulas, the thresholds, and the
      quick mental shortcuts so you can count accurately no matter what&rsquo;s in your glass.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>1. The UK unit formula</h2>
    <p>
      One UK unit = 10ml (8g) of pure ethanol. The formula is simple:
    </p>
    <pre>{`units = (ABV% × volume in ml) / 1000`}</pre>
    <p>
      A 175ml glass of 13% wine: <code>13 × 175 / 1000 = 2.275 units</code>. A pint (568ml)
      of 5% lager: <code>5 × 568 / 1000 = 2.84 units</code>. A 25ml shot of 40% spirits:
      <code> 40 × 25 / 1000 = 1.0 unit</code>. The math is the same for every drink — only
      the ABV and volume change.
    </p>

    <h2>2. The US &ldquo;standard drink&rdquo;</h2>
    <p>
      The US defines one standard drink as 14g (17.7ml) of pure alcohol. That&rsquo;s roughly
      1.75 UK units. The typical US rules of thumb:
    </p>
    <ul>
      <li>12 oz (355ml) of 5% beer = 1 standard drink</li>
      <li>5 oz (148ml) of 12% wine = 1 standard drink</li>
      <li>1.5 oz (44ml) of 40% spirits = 1 standard drink</li>
    </ul>
    <p>
      These are designed to roughly match. In reality, a craft IPA at 7.5% ABV in a 16oz
      pour is closer to <strong>2 standard drinks</strong>, not one.
    </p>

    <h2>3. Weekly guidelines</h2>
    <p>
      The UK Chief Medical Officers recommend <strong>no more than 14 units per week</strong>,
      spread over 3+ days, with several alcohol-free days. The US Dietary Guidelines suggest
      no more than 2 standard drinks per day for men and 1 for women — roughly 14 and 7 per
      week respectively. The WHO position is blunter: <em>no level of alcohol is safe</em> for
      health. These numbers are ceilings, not targets.
    </p>

    <h2>4. Wine math is where most people lose count</h2>
    <p>
      Wine bottles come in 750ml. At 13% ABV that&rsquo;s <code>13 × 750 / 1000 = 9.75 UK
      units</code> per bottle, or ~5.5 US standard drinks. A &ldquo;large&rdquo; 250ml
      restaurant pour of 14% wine is 3.5 units — a quarter of your weekly cap in one glass.
      New World reds and whites routinely hit 14-15% ABV; older European wines sit closer to
      11-12%. Always check the label.
    </p>

    <h2>5. Beer math by strength tier</h2>
    <p>
      Beer ABV ranges from ~3% (light lager) to 12%+ (imperial stouts). Quick table for a
      UK pint (568ml):
    </p>
    <ul>
      <li>3.5% session bitter: 2.0 units</li>
      <li>4.5% standard lager: 2.6 units</li>
      <li>5.5% craft pale ale: 3.1 units</li>
      <li>7.5% IPA: 4.3 units</li>
      <li>10% imperial stout: 5.7 units</li>
    </ul>
    <p>
      A single strong IPA pint can exceed a full glass of wine. &ldquo;Just one pint&rdquo;
      isn&rsquo;t a fixed dose.
    </p>

    <h2>6. Spirits and cocktails</h2>
    <p>
      A UK pub measure is 25ml (some pubs pour 35ml). A US shot is typically 1.5oz (44ml).
      Most spirits sit at 37-40% ABV. A gin &amp; tonic with a 25ml gin pour is 1 unit; a
      double is 2. Cocktails often contain 50-90ml of spirits across multiple ingredients —
      a Long Island Iced Tea can hit <strong>4-5 units in a single glass</strong>. When you
      can&rsquo;t see the pour, assume more.
    </p>

    <h2>7. Shortcut mental math</h2>
    <p>
      For fast estimation, memorize these:
    </p>
    <ul>
      <li>Pint of 4% beer = 2.3 units</li>
      <li>Small (125ml) 12% wine = 1.5 units</li>
      <li>Medium (175ml) 13% wine = 2.3 units</li>
      <li>Large (250ml) 14% wine = 3.5 units</li>
      <li>Single spirit (25ml, 40%) = 1 unit</li>
    </ul>
    <p>
      Round up when you&rsquo;re unsure. Underestimating is the default failure mode.
    </p>

    <h2>8. Converting UK units to US drinks</h2>
    <p>
      One US standard drink = 1.75 UK units. To convert:
    </p>
    <pre>{`US drinks = UK units / 1.75
UK units = US drinks × 1.75`}</pre>
    <p>
      UK weekly cap of 14 units = roughly 8 US standard drinks. US daily cap of 2 drinks =
      3.5 UK units. Same ethanol, different packaging.
    </p>

    <h2>9. Time and blood alcohol</h2>
    <p>
      Your liver processes about one unit per hour (one US standard drink every ~90
      minutes). If you drink 4 units in an hour, you&rsquo;re carrying 3 units&rsquo; worth
      of alcohol into the next hour. Food slows absorption but doesn&rsquo;t reduce the total.
      Coffee doesn&rsquo;t sober you up — only time does.
    </p>

    <h2>10. Common mistakes</h2>
    <ul>
      <li>
        <strong>Using &ldquo;glasses&rdquo; instead of ml.</strong> Home pours are 30-50%
        bigger than restaurant pours. Measure once to calibrate your eye.
      </li>
      <li>
        <strong>Ignoring ABV creep.</strong> Craft beer and New World wine have drifted
        stronger over the last decade. A 2015 IPA and a 2026 IPA are not the same drink.
      </li>
      <li>
        <strong>Counting cocktails as &ldquo;one drink.&rdquo;</strong> Count the spirits in
        each cocktail and add them up. A margarita is usually 2 units, not 1.
      </li>
      <li>
        <strong>Forgetting non-drinking days.</strong> The UK guideline is 14 units
        <em> spread over 3+ days</em>. Ten units on Saturday is not the same as 2 per day.
      </li>
      <li>
        <strong>Trusting &ldquo;low-cal&rdquo; labels.</strong> A low-calorie beer can still
        be 5% ABV. Calorie count and alcohol content are independent.
      </li>
    </ul>

    <h2>11. Run the numbers</h2>
    <p>
      Plug in the ABV and volume of your actual drink rather than guessing. Then pair it with
      your daily calorie math — alcohol is 7 kcal/g, second only to fat.
    </p>
    <p>
      <a href="/tools/alcohol-unit-calculator">Alcohol unit calculator</a>
      <a href="/tools/caffeine-intake-calculator">Caffeine intake calculator</a>
      <a href="/tools/calorie-calculator">Calorie calculator</a>
    </p>
  </>
);
