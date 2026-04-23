import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The &ldquo;eight glasses a day&rdquo; rule is what everyone remembers
      and what almost no research supports. Actual water needs swing by a
      factor of three depending on body weight, climate, activity, and diet,
      and much of the intake that keeps you hydrated comes from food rather
      than a glass. Drink too little and cognition, kidney function, and
      athletic output all drop; drink too much and you can genuinely land in
      the hospital with hyponatremia. This guide covers where the 8x8 rule
      came from, the body-weight formulas that are a better starting point,
      how climate and exercise adjust the number, how to tell if you&rsquo;re
      actually hydrated, and the real limits of how much water is too much.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Where &ldquo;8 glasses a day&rdquo; came from</h2>
    <p>
      Often misattributed to a 1945 National Research Council report. The
      actual recommendation was &ldquo;about 1 mL of water for each calorie
      consumed,&rdquo; which for a 2,000-calorie diet is 2 liters. But then
      the same report noted: &ldquo;most of this quantity is contained in
      prepared foods.&rdquo; That second sentence got lost. The 8x8 rule is
      decent shorthand but not based on a hydration study.
    </p>

    <h2>By body weight (the better baseline)</h2>
    <p>
      A body-weight formula is closer to what your body actually needs,
      because bigger bodies have more tissue to hydrate.
    </p>
    <pre>{`Baseline:  weight(lb) * 0.5 to 0.7  =  daily ounces
           or  weight(kg) * 30 to 40  =  daily milliliters

150 lb person:  75 to 105 oz/day  =  2.2 to 3.1 L
80 kg person:   2.4 to 3.2 L/day`}</pre>
    <p>
      &ldquo;Daily&rdquo; here means total fluid intake from all sources, not
      plain water only. Fruit, soup, coffee, milk, tea all count.
    </p>

    <h2>Food contributes ~20% of water intake</h2>
    <p>
      Fruits and vegetables are mostly water: watermelon 92%, cucumber 96%,
      strawberries 91%, orange 86%. Even bread is ~35% water, meat ~60%. A
      typical Western diet contributes ~20% of daily water; Mediterranean or
      fruit-heavy diets can push that to 30%+.
    </p>
    <p>
      Practical upshot: if your baseline says 2.5 L/day, you need to
      <em> drink</em> more like 2 L &mdash; food covers the rest.
    </p>

    <h2>Climate adjustment</h2>
    <p>
      Heat and humidity both increase fluid needs; cold and dry conditions
      usually need slightly less but can still dehydrate via respiration.
    </p>
    <pre>{`Hot humid  (30 C, 70% RH)         +500-1000 mL/day
Hot dry    (35 C, low humidity)   +500-1500 mL/day
Cold dry   (sub-zero, altitude)   +250-500 mL/day (easy to underestimate)
AC office  (21 C, 40% RH)         baseline`}</pre>
    <p>
      At altitude (&gt;2,500 m / 8,000 ft) you lose water through faster
      breathing and increased urine output. Add 500&ndash;1000 mL for the
      first 48 hours, then taper.
    </p>

    <h2>Exercise adjustment</h2>
    <p>
      Roughly 400&ndash;800 mL per hour of exercise at moderate intensity,
      more in heat. Serious endurance sport can lose 1.5 L/hour through
      sweat.
    </p>
    <pre>{`Light (walking, yoga):     200-400 mL/hr extra
Moderate (gym, running):   400-600 mL/hr
Vigorous (soccer, HIIT):   600-1000 mL/hr
Endurance race in heat:    up to 1500 mL/hr`}</pre>
    <p>
      For anything past 60 minutes, add electrolytes. Water alone replaces
      volume but not sodium, and long sweaty sessions on plain water trend
      toward hyponatremia.
    </p>

    <h2>Caffeine, alcohol, and diuretics</h2>
    <p>
      Old wisdom: caffeine dehydrates you, so coffee doesn&rsquo;t count.
      Current evidence: caffeine has a mild diuretic effect that is largely
      offset by the water in the coffee. For habitual drinkers (daily
      coffee), the net effect is near-zero. Your morning cup counts.
    </p>
    <p>
      Alcohol is genuinely dehydrating &mdash; ethanol suppresses
      vasopressin, causing more urine output than fluid input. Each standard
      drink needs ~250 mL of water to net neutral.
    </p>

    <h2>Hydration markers</h2>
    <p>
      You don&rsquo;t need an app to know if you&rsquo;re hydrated. Your body
      tells you:
    </p>
    <p>
      <strong>Urine color.</strong> Pale straw = hydrated. Apple-juice or
      darker = drink up. Completely clear = slightly overhydrated. Morning
      urine is naturally darker and not a good marker.
    </p>
    <p>
      <strong>Thirst.</strong> Underrated in fitness culture. Thirst responds
      before dehydration impairs performance, unless you&rsquo;re an older
      adult (thirst response blunts with age).
    </p>
    <p>
      <strong>Urine frequency.</strong> Roughly every 2&ndash;4 hours during
      waking hours. Much less = dry; much more = excessive intake.
    </p>
    <p>
      <strong>Weight change across a workout.</strong> Loss of &gt;2% of
      body weight indicates dehydration for that session. Replace 1.5 L per
      kg lost.
    </p>

    <h2>Can you drink too much water?</h2>
    <p>
      Yes. Water intoxication (hyponatremia) happens when blood sodium drops
      critically low because you&rsquo;ve diluted it faster than your
      kidneys can dump the excess water. Symptoms: nausea, headache,
      confusion, seizures. Cases include marathoners who over-hydrated and
      hazing-style water-drinking contests.
    </p>
    <pre>{`Healthy kidneys can process ~800-1000 mL/hour.
Drinking 1.5+ L/hour for several hours risks hyponatremia.`}</pre>
    <p>
      For everyday life this is hard to hit by accident. For endurance
      athletes on plain water, it&rsquo;s a real risk. Electrolyte mixes on
      long efforts are the fix.
    </p>

    <h2>When to drink</h2>
    <p>
      Spread across the day rather than slamming glasses:
    </p>
    <ul>
      <li>1 glass on waking (you dehydrated overnight)</li>
      <li>1 glass before each meal (helps satiety too)</li>
      <li>Sip during work hours</li>
      <li>1 glass 1&ndash;2 hours before bed; avoid chugging right before</li>
      <li>Pre-/intra-/post-workout: 200&ndash;400 mL each phase</li>
    </ul>

    <h2>Kidneys, hormones, and special cases</h2>
    <p>
      Chronic kidney disease, heart failure, and some medications change
      optimal intake. If you have a medical condition that involves fluid
      restriction or potassium/sodium balance, the formulas here
      don&rsquo;t apply &mdash; follow your clinician&rsquo;s plan.
    </p>
    <p>
      Pregnancy: ~+300 mL/day. Breastfeeding: ~+700 mL/day.
    </p>

    <h2>Practical targets</h2>
    <pre>{`Sedentary 70kg adult, temperate climate:
  ~2.5 L total fluid (food + drinks)
  ~2.0 L from drinks (water, coffee, tea, etc.)

Active 90kg adult, hot climate, 1hr training:
  ~4.0 L total fluid
  ~3.2 L from drinks, of which ~1L during/around training`}</pre>

    <h2>Common mistakes</h2>
    <p>
      <strong>Treating 8x8 as gospel.</strong> It&rsquo;s a rule of thumb
      for sedentary temperate-climate adults. Adjust for your body and
      conditions.
    </p>
    <p>
      <strong>Ignoring food as a water source.</strong> Tracking only water
      bottles means overestimating what you need to drink.
    </p>
    <p>
      <strong>Chugging a liter at once.</strong> Your kidneys can&rsquo;t
      process it that fast; most of it goes straight out. Sip throughout
      the day.
    </p>
    <p>
      <strong>Drinking only plain water during long efforts.</strong> Risk
      of hyponatremia. Use electrolytes for anything past an hour.
    </p>
    <p>
      <strong>Using urine color first thing in the morning.</strong> Always
      dark; not a useful marker. Check mid-morning.
    </p>
    <p>
      <strong>Drinking to a number rather than to thirst.</strong> Thirst
      plus a urine-color check is more accurate than any spreadsheet.
    </p>
    <p>
      <strong>Drinking huge amounts before bed.</strong> Sleep disruption
      from bathroom trips. Front-load earlier in the day.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Enter weight, activity, and climate into the{" "}
      <a href="/tools/water-intake-calculator">water intake calculator</a> for
      a personalized liters-per-day target. Watch your caffeine total with the{" "}
      <a href="/tools/caffeine-intake-calculator">caffeine intake calculator</a>{" "}
      (coffee contributes both fluid and stimulant) and balance against your
      eating pattern with the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> so the
      food-water contribution isn&rsquo;t a mystery.
    </p>
  </>
);
