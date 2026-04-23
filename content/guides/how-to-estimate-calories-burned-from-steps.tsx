import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Step counters tell you one thing &mdash; how many steps &mdash; but
      people want to know calories, distance, and whether their day was
      actually active. Converting steps to calories is possible, but
      it&rsquo;s approximate: the math depends on stride length, body
      weight, walking pace, and terrain, and every step counter quietly
      guesses at several of those. This guide walks through the steps-to-
      distance conversion, the MET-based calorie formula that actually
      drives the estimate, how body weight scales the result, the limits
      of wrist and phone step counts, and the practical rules for turning
      a daily step total into a useful number on the calorie ledger.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Steps to distance</h2>
    <p>
      Average stride length is roughly 41% of height for men and 40% for
      women. Practical estimates:
    </p>
    <pre>{`Walking stride ~= 0.414 x height (m)
Running stride ~= 0.495 x height (m)

5'10" (178cm) person, walking:
Stride = 0.414 * 1.78 = 0.74 m
Steps per mile = 1609 / 0.74 = ~2,175 steps`}</pre>
    <p>
      Rough rule of thumb: <strong>2,000&ndash;2,500 steps per mile</strong>{" "}
      at walking pace, 1,500 per mile at running pace. 10,000 steps =
      ~4&ndash;5 miles walking or ~6&ndash;7 miles running.
    </p>

    <h2>MET values by pace</h2>
    <p>
      MET = metabolic equivalent of task. One MET = the energy cost of
      sitting still (~1 kcal/kg/hour). Walking and running METs from the
      Compendium of Physical Activities:
    </p>
    <pre>{`Activity                         Pace            MET
Slow stroll                      2.0 mph         2.5
Moderate walk                    2.5-3.0 mph     3.0-3.5
Brisk walk                       3.5 mph         4.3
Very brisk walk                  4.0 mph         5.0
Jogging                          5.0 mph         8.3
Running                          6.0 mph         9.8
Running                          8.0 mph         11.8
Running                          10.0 mph        14.5`}</pre>
    <p>
      Energy cost scales roughly linearly with pace for walking and
      somewhat steeper for running. Uphill adds substantially &mdash;
      5% incline adds ~30&ndash;50% to calorie burn.
    </p>

    <h2>The calorie formula</h2>
    <pre>{`calories = MET x weight(kg) x hours

Example: 80kg person, brisk walk (4.3 MET) for 60 minutes:
calories = 4.3 * 80 * 1 = 344 kcal`}</pre>
    <p>
      Plug in your number of hours of walking rather than minutes. For
      a 45-minute walk, hours = 0.75.
    </p>

    <h2>Steps straight to calories (shortcut)</h2>
    <p>
      Most step trackers use some version of this simplification:
    </p>
    <pre>{`calories per step = 0.04 to 0.05 for an average walker
                    scaled by body weight and pace

Roughly:
10,000 steps walking for 150 lb person:  ~400 kcal
10,000 steps walking for 220 lb person:  ~560 kcal`}</pre>
    <p>
      A cleaner formula:
    </p>
    <pre>{`kcal per step = 0.57 * weight(kg) / 1000
              (for brisk walking pace)`}</pre>

    <h2>Body-weight scaling</h2>
    <p>
      Calorie cost is proportional to body weight. A 200-lb person
      walking the same distance burns about 33% more calories than a
      150-lb person. Two scales matter:
    </p>
    <ul>
      <li>Moving your body weight costs energy &mdash; linear with weight</li>
      <li>
        Heavier people also tend to have larger strides but slower pace,
        partially compensating
      </li>
    </ul>
    <p>
      Generic &ldquo;5,000 steps = 250 kcal&rdquo; claims ignore this
      and can be off by 30%.
    </p>

    <h2>Pace matters more than you&rsquo;d think</h2>
    <p>
      10,000 steps at 2.0 mph (2.5 MET) ≠ 10,000 steps at 4.0 mph (5.0
      MET). Pace doubles the calorie count for the same distance. Your
      tracker often doesn&rsquo;t know pace unless it&rsquo;s GPS-
      backed; it guesses.
    </p>

    <h2>Terrain and incline</h2>
    <pre>{`Flat ground           base MET
5% incline            +25-40% kcal
10% incline           +50-80% kcal
Trail / grass         +10-15% (softer surface = more work)
Sand / snow           +30-50%
Downhill              -10-15% but eccentric load on joints`}</pre>
    <p>
      Step counters have no incline awareness unless you pair them with
      a barometric altimeter (many smartwatches have this).
    </p>

    <h2>Accuracy of step counters</h2>
    <p>
      How well your device counts steps:
    </p>
    <ul>
      <li>
        <strong>Chest / waist-mounted pedometers:</strong> 95&ndash;99%
        accurate at walking pace. Best option.
      </li>
      <li>
        <strong>Wrist trackers:</strong> 90&ndash;97% at walking, can
        drop to 80% at slow pace (arms barely swing) or miss strollers /
        carts / desk work.
      </li>
      <li>
        <strong>Phone in pocket:</strong> 85&ndash;95% &mdash; can miss
        steps if phone is stable or gain steps from car vibration.
      </li>
      <li>
        <strong>Phone on desk:</strong> 0%. If the phone is not on you,
        steps aren&rsquo;t counted.
      </li>
    </ul>
    <p>
      At running pace, all devices converge to ~99% accuracy.
    </p>

    <h2>Common over-counts and under-counts</h2>
    <p>
      <strong>Phantom steps:</strong> typing, clapping, cooking, hair
      drying, manual tasks. Wrist trackers can add 500&ndash;2,000
      phantom steps per day.
    </p>
    <p>
      <strong>Missed steps:</strong> pushing a stroller or shopping
      cart, hands in pockets, riding a bike (your legs turn but
      don&rsquo;t count as steps).
    </p>
    <p>
      Net bias depends on your activity pattern. Most wearers
      slightly over-count.
    </p>

    <h2>Step goals in context</h2>
    <pre>{`5,000     sedentary baseline
7,500     somewhat active
10,000    active (popularized in Japan for pedometer marketing)
12,500    very active
15,000+   highly active lifestyle`}</pre>
    <p>
      The 10,000-step goal came from a 1960s Japanese pedometer brand,
      not from research. Current research: benefits accrue starting
      around 4,400 steps, with additional returns flattening around
      7,500&ndash;8,000. 10,000 is fine but not magic.
    </p>

    <h2>Steps vs structured exercise</h2>
    <p>
      Walking steps are low-intensity aerobic work &mdash; great for
      daily energy expenditure, cardiovascular health, and recovery.
      They don&rsquo;t replace:
    </p>
    <ul>
      <li>Resistance training (muscle, bone)</li>
      <li>Higher-intensity cardio (VO2max)</li>
      <li>Mobility work</li>
    </ul>
    <p>
      10,000 steps plus two lifts a week is a better week than 20,000
      steps alone.
    </p>

    <h2>Using steps for a calorie deficit</h2>
    <p>
      Steps add to your TDEE, which lets you eat slightly more at the
      same deficit, or lose slightly faster at the same intake. A
      150-lb person walking 8,000 extra steps a day burns ~320 kcal
      extra, enough to produce ~2/3 lb/week weight loss if diet is
      constant.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Assuming all steps are the same calories.</strong> Pace,
      weight, and terrain all matter. A slow stroll costs half what a
      brisk walk does.
    </p>
    <p>
      <strong>Trusting tracker calorie estimates to the kcal.</strong>{" "}
      Most are 20&ndash;30% optimistic. Use as relative, not absolute.
    </p>
    <p>
      <strong>Counting only exercise steps.</strong> Daily incidental
      steps (errands, walking around the house) add up to more than
      gym sessions for most people.
    </p>
    <p>
      <strong>Comparing step counts between devices.</strong> They use
      different algorithms. Same-device trend matters, not
      cross-device numbers.
    </p>
    <p>
      <strong>Ignoring the wrist-for-slow-walking gap.</strong> Older
      adults walking slowly with arms steady can be under-counted by
      thousands of steps.
    </p>
    <p>
      <strong>Eating back the tracker&rsquo;s &ldquo;burn.&rdquo;</strong>{" "}
      Over-counts compound. If your tracker says 2,800 kcal burned,
      2,500 is probably closer.
    </p>
    <p>
      <strong>Using phone steps without carrying the phone.</strong> If
      the phone spent 4 hours on the desk, those 4 hours of walking
      weren&rsquo;t captured.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert a step count into a calorie estimate with the{" "}
      <a href="/tools/steps-to-calories-calculator">steps to calories calculator</a>.
      Tie it into your daily total with the{" "}
      <a href="/tools/calorie-calculator">calorie calculator</a> and
      sanity-check cardio effort by cross-referencing your heart rate
      during walks with the{" "}
      <a href="/tools/heart-rate-zone-calculator">heart rate zone calculator</a>.
    </p>
  </>
);
