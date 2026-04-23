import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      &ldquo;The average&rdquo; is doing a lot of work in most sentences, and people usually
      mean the arithmetic mean&mdash;add everything up, divide by the count. But the median and
      the mode are also averages, and in skewed data they often describe the typical case
      better than the mean does. The average household income in the United States is higher
      than the median household income because a handful of billionaires pull the mean upward;
      report the mean and you&rsquo;ll mislead people about the &ldquo;middle&rdquo; household.
      Weighted averages appear everywhere grades are calculated, geometric means show up in
      finance and biology, and harmonic means matter when averaging rates. This guide covers
      the three main averages and when to use each, weighted averages, how outliers distort the
      mean, and when geometric or harmonic means are the right choice.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The arithmetic mean</h2>
    <p>
      Sum the values, divide by the count. For test scores 80, 90, 70, 100: sum = 340, count =
      4, mean = 85. This is what most people call &ldquo;the average.&rdquo; It&rsquo;s the
      balance point of the data&mdash;if you placed weights at each value on a number line,
      the mean is where the line balances.
    </p>
    <pre>{`values: 80, 90, 70, 100
sum:    340
count:  4
mean:   340 / 4 = 85`}</pre>

    <h2>The median</h2>
    <p>
      Sort the values and pick the middle one. For an even count, take the mean of the two
      middle values. The median is insensitive to outliers&mdash;changing the largest value
      from 100 to 1,000,000 doesn&rsquo;t move the median at all. This makes it the right
      choice for skewed distributions like income, house prices, and web page load times.
    </p>
    <pre>{`sorted: 70, 80, 90, 100
even count → median = (80 + 90) / 2 = 85

sorted: 70, 80, 90, 100, 1000000
odd count → median = 90 (unchanged by the outlier)
mean would be 200,148 — wildly unrepresentative`}</pre>

    <h2>The mode</h2>
    <p>
      The value that appears most often. There can be zero modes (all values unique), one mode
      (unimodal), or multiple modes (bimodal, multimodal). Mode is useful for categorical data
      (&ldquo;most common shirt size&rdquo;) where mean and median don&rsquo;t make sense, and
      for spotting clustering in numeric data.
    </p>
    <pre>{`values: 2, 3, 3, 5, 7, 7, 7, 9
mode: 7 (appears three times)

values: 4, 4, 6, 8, 8, 10
modes: 4 and 8 (bimodal)`}</pre>

    <h2>Mean vs. median vs. mode: when to use each</h2>
    <p>
      Use the <strong>mean</strong> when data is roughly symmetric and you care about the total
      (grades, dice rolls, heights). Use the <strong>median</strong> when data is skewed or has
      outliers (income, home prices, response times). Use the <strong>mode</strong> for
      categorical data or when you want to describe &ldquo;the typical choice.&rdquo;
    </p>

    <h2>Weighted averages</h2>
    <p>
      When some values count more than others, multiply each by its weight, sum, then divide by
      the total weight. Course grades are classic: homework 20%, midterm 30%, final 50%. A
      student with 85/100/70 on those gets (85&times;0.2 + 100&times;0.3 + 70&times;0.5) /
      1 = (17 + 30 + 35) = 82.
    </p>
    <pre>{`Weights: 20, 30, 50  (must sum to 100)
Scores:  85, 100, 70

Weighted mean = (85×20 + 100×30 + 70×50) / 100
              = (1700 + 3000 + 3500) / 100
              = 8200 / 100
              = 82`}</pre>

    <h2>The effect of outliers</h2>
    <p>
      A single extreme value can wildly distort the mean. Consider seven salaries: six at
      $50,000 and one CEO at $2,000,000. The mean salary is $328,571. The median is $50,000.
      The mean is mathematically correct but communicatively misleading. When reporting
      averages to humans, check the shape of the distribution first&mdash;if there&rsquo;s a
      long tail, the median is more honest.
    </p>

    <h2>Geometric mean</h2>
    <p>
      For <em>n</em> values, the geometric mean is the <em>n</em>-th root of their product. It
      is the right tool for averaging ratios, growth rates, and multiplicative quantities.
      Annual investment returns of +20%, &minus;10%, +30% have a geometric mean of
      <code>&radic;[3]{`(1.20 × 0.90 × 1.30)`}</code> &minus; 1 &asymp; 12.0%, which matches the
      actual compound growth. Taking the arithmetic mean (13.3%) overstates your returns.
    </p>
    <pre>{`Returns: +20%, −10%, +30%
As multipliers: 1.20, 0.90, 1.30

Arithmetic mean: (0.20 + (−0.10) + 0.30) / 3 = 13.3%  ← WRONG
Geometric mean: (1.20 × 0.90 × 1.30)^(1/3) − 1 ≈ 12.0%  ← correct`}</pre>

    <h2>Harmonic mean</h2>
    <p>
      The harmonic mean of <em>n</em> values is <em>n</em> divided by the sum of reciprocals.
      It&rsquo;s the right average for rates when the base unit is the same. If you drive 60
      miles at 30 mph and 60 miles at 60 mph, your average speed is NOT 45 mph. Using the
      harmonic mean: <code>2 / (1/30 + 1/60) = 2 / (3/60) = 40 mph</code>, which matches the
      total distance (120 miles) over total time (3 hours).
    </p>

    <h2>When to use geometric or harmonic</h2>
    <p>
      Use the <strong>geometric mean</strong> when averaging rates of change, growth rates,
      investment returns, or any multiplicative process. Use the <strong>harmonic mean</strong>
      when averaging rates where you&rsquo;re holding the numerator constant (speeds over equal
      distances, prices per item). The arithmetic mean is almost always wrong for these cases.
    </p>

    <h2>Range and spread don&rsquo;t disappear</h2>
    <p>
      An average alone is usually insufficient. Two datasets can have identical means with
      wildly different spreads: {`{49, 50, 51}`} and {`{0, 50, 100}`} both average 50, but
      you&rsquo;d prefer to know you&rsquo;re walking into the first one. Report an average
      alongside a measure of spread&mdash;standard deviation, interquartile range, or min/max.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Reporting a mean for skewed data.</strong> Income, housing costs, load times,
      and viral popularity are heavily right-skewed. The mean drifts upward with the tail;
      the median stays with the typical case. Use the median.
    </p>
    <p>
      <strong>Averaging averages without weights.</strong> If class A has 30 students with a
      mean of 80 and class B has 10 students with a mean of 90, the combined mean is NOT 85.
      It&rsquo;s <code>(30&times;80 + 10&times;90) / 40 = 82.5</code>. You have to weight by
      group size.
    </p>
    <p>
      <strong>Using arithmetic mean on growth rates.</strong> Compounding is multiplicative;
      arithmetic mean overstates returns. Geometric mean is the correct average.
    </p>
    <p>
      <strong>Using arithmetic mean on rates.</strong> Average speed over fixed distances,
      average price per fixed quantity, and similar problems call for the harmonic mean, not
      the arithmetic mean.
    </p>
    <p>
      <strong>Ignoring the mode for categorical data.</strong> You can&rsquo;t take the mean of
      &ldquo;red, blue, blue, green.&rdquo; Mode is the only average that makes sense for
      non-numeric categories.
    </p>
    <p>
      <strong>Treating the mean as &ldquo;the answer.&rdquo;</strong> Always check min, max,
      and spread. A mean of 50 with range 0&ndash;100 is very different from a mean of 50 with
      range 49&ndash;51.
    </p>
    <p>
      <strong>Forgetting that median can equal mean.</strong> For symmetric distributions like
      the normal distribution, mean, median, and mode all coincide. The difference only shows
      up in skewed data, which is why people get sloppy with them on test scores and then
      mislead themselves on salaries.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Drop your dataset into our <a href="/tools/average-calculator">average calculator</a> and
      get mean, median, mode, range, and standard deviation in one pass. Pair it with the{" "}
      <a href="/tools/percentage-calculator">percentage calculator</a> for expressing
      differences from the average as percentages, and the{" "}
      <a href="/tools/ratio-calculator">ratio calculator</a> when you&rsquo;re comparing
      averages across groups.
    </p>
  </>
);
