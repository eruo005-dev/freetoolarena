import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Temperature conversion is one of those skills that feels trivial until you need to do it
      correctly in your head at a grocery store in Europe, or your oven is calibrated in one
      scale and the recipe in another, or a lab protocol specifies Kelvin and your instrument
      reads Celsius. Four scales show up in practice&mdash;Celsius, Fahrenheit, Kelvin,
      Rankine&mdash;and each has a reason to exist. Kelvin and Celsius share a step size but
      different zeros. Fahrenheit has a smaller step and a weirder zero point. Rankine is just
      Kelvin expressed with Fahrenheit steps. Mixing them up in engineering or medical
      contexts can kill people, so it pays to know the formulas cold and to carry a mental
      sanity check for the answer. This guide covers the four scales, the conversion formulas,
      absolute zero, human body temperature as a calibration point, and when each scale is the
      professional standard.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The four scales</h2>
    <p>
      <strong>Celsius</strong> (&deg;C) sets water&rsquo;s freezing point at 0 and boiling at
      100 at standard atmospheric pressure. <strong>Fahrenheit</strong> (&deg;F) sets them at
      32 and 212. <strong>Kelvin</strong> (K, no degree sign) shares Celsius&rsquo;s step size
      but starts at absolute zero: 0 K = &minus;273.15 &deg;C. <strong>Rankine</strong>
      (&deg;R) shares Fahrenheit&rsquo;s step size and starts at absolute zero: 0 &deg;R =
      &minus;459.67 &deg;F.
    </p>
    <pre>{`                Freeze  Boil   Absolute zero
Celsius      C  0       100    −273.15
Fahrenheit   F  32      212    −459.67
Kelvin       K  273.15  373.15 0
Rankine      R  491.67  671.67 0`}</pre>

    <h2>Celsius to Fahrenheit and back</h2>
    <p>
      <code>F = C &times; 9/5 + 32</code>. Equivalently, <code>F = C &times; 1.8 + 32</code>.
      Going the other way: <code>C = (F &minus; 32) &times; 5/9</code>. The subtraction happens
      first&mdash;that&rsquo;s the common arithmetic trap.
    </p>
    <pre>{`20 °C → 20 × 1.8 + 32 = 68 °F
0 °C → 32 °F
100 °C → 212 °F
37 °C (body temp) → 98.6 °F

68 °F → (68 − 32) × 5/9 = 20 °C
32 °F → 0 °C
−40 °F → −40 °C  (the scales cross here)`}</pre>

    <h2>Mental shortcuts</h2>
    <p>
      To estimate C from F quickly: subtract 30, divide by 2. &ldquo;86 &deg;F&rdquo; &rarr; 56
      / 2 = 28 &deg;C (actual: 30). Accurate enough for weather conversation. For F from C,
      double and add 30: 20 &deg;C &rarr; 40 + 30 = 70 &deg;F (actual: 68). These shortcuts
      lose accuracy at extremes but work for the range humans normally encounter.
    </p>

    <h2>Celsius and Kelvin</h2>
    <p>
      <code>K = C + 273.15</code>. The 0.15 matters for precision work; a rounded 273 is fine
      for weather but wrong for thermodynamics homework. Kelvin differences and Celsius
      differences are identical&mdash;a change of 10 K equals a change of 10 &deg;C. This is
      why temperature coefficients in physics are always in Kelvin even when the starting
      temperature was in Celsius.
    </p>

    <h2>Fahrenheit and Rankine</h2>
    <p>
      <code>R = F + 459.67</code>. Rankine is used in some US thermodynamics and aerospace
      contexts because it preserves Fahrenheit steps while giving an absolute scale. Outside
      those fields, you&rsquo;ll rarely encounter it.
    </p>

    <h2>Absolute zero</h2>
    <p>
      0 K = 0 &deg;R = &minus;273.15 &deg;C = &minus;459.67 &deg;F. This is the temperature at
      which classical molecular motion stops. You cannot reach it (third law of thermodynamics);
      you can only asymptotically approach it. The coldest temperatures ever achieved in labs
      are a few billionths of a Kelvin above zero. Negative Kelvin or Rankine values are
      nonsensical in the normal sense.
    </p>

    <h2>Human body as a sanity check</h2>
    <p>
      Normal body temperature is ~37 &deg;C = 98.6 &deg;F = 310.15 K. A fever is 38 &deg;C
      (100.4 &deg;F) and above. Hypothermia begins below 35 &deg;C (95 &deg;F). If your
      conversion produces a body temperature of 200 or 30, you slipped a digit. Also useful:
      room temperature is ~20&ndash;22 &deg;C = 68&ndash;72 &deg;F. An ice bath is 0 &deg;C.
      Boiling water is 100 &deg;C. Keep these in mind as guardrails.
    </p>

    <h2>Cooking temperatures</h2>
    <p>
      Oven recipes collide with scale differences. Key conversions:
    </p>
    <pre>{`350 °F = 177 °C   (classic cookies, casseroles)
400 °F = 204 °C   (roasting vegetables)
425 °F = 218 °C   (pizza, browning)
450 °F = 232 °C   (high-heat roasting)
500 °F = 260 °C   (flatbreads, some pizza stones)
180 °C = 356 °F   (gentle baking)
200 °C = 392 °F
220 °C = 428 °F`}</pre>
    <p>
      Most ovens round to 5 &deg;C or 25 &deg;F increments, so a recipe&rsquo;s exact value
      matters less than the range. A recipe calling for 177 &deg;C will do fine at 175 &deg;C
      or 180 &deg;C.
    </p>

    <h2>Scientific conventions</h2>
    <p>
      Physics and chemistry default to Kelvin because thermodynamic equations require an
      absolute scale. Ideal gas law <code>PV = nRT</code> only works with Kelvin&mdash;plug in
      Celsius and you get wrong answers. Climate science uses Celsius because the deltas are
      small and Kelvin steps are identical. Biology and medicine use Celsius almost everywhere
      except the US consumer market.
    </p>

    <h2>When each scale is the standard</h2>
    <p>
      Celsius: most of the world, weather, cooking outside the US, biology, meteorology.
      Fahrenheit: US consumer weather, US home cooking, US medical charts. Kelvin: physics,
      chemistry, engineering thermodynamics, astronomy. Rankine: some US aerospace and HVAC
      calculations.
    </p>

    <h2>Precision and rounding</h2>
    <p>
      For weather reports, one decimal is usually enough. For body temperature, tenths of a
      degree matter clinically. For scientific work, use the full formula and carry as many
      significant figures as your input. When reporting, round to match the precision of your
      measurement&mdash;saying 98.6001 &deg;F when your thermometer reads to 0.1 is fake
      precision.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Doing the arithmetic in the wrong order.</strong> <code>F = C &times; 9/5 + 32</code>
      means multiply first, then add. If you add 32 first, you get a wrong answer by a
      multiplicative factor.
    </p>
    <p>
      <strong>Using the offset for deltas.</strong> A temperature <em>difference</em> of 10
      &deg;C is 18 &deg;F (just multiply by 9/5), not 50 &deg;F. Offsets only apply to absolute
      temperatures, not differences.
    </p>
    <p>
      <strong>Rounding 273.15 to 273 in precision work.</strong> The 0.15 offset matters for
      physics and thermodynamics. Only drop it in casual weather conversion.
    </p>
    <p>
      <strong>Forgetting Kelvin omits the degree sign.</strong> It&rsquo;s &ldquo;300 K,&rdquo;
      not &ldquo;300 &deg;K.&rdquo; Celsius and Fahrenheit keep the degree sign, Kelvin does
      not. Small formatting, big credibility cost.
    </p>
    <p>
      <strong>Running ideal-gas calculations in Celsius.</strong> Gas laws require absolute
      temperature. Using Celsius gives wildly wrong answers, especially near 0 &deg;C where
      the error is largest relative to the value.
    </p>
    <p>
      <strong>Misreading thermometer units.</strong> A US thermometer showing 37 is probably
      Celsius (it&rsquo;s a medical thermometer); a weather app showing 37 in the UK is
      unusual; in the US it&rsquo;s probably Fahrenheit. Always check the unit before trusting
      a number.
    </p>
    <p>
      <strong>Assuming &ldquo;negative&rdquo; means dangerously cold in Fahrenheit.</strong>
      Zero &deg;F (&minus;18 &deg;C) is cold, not catastrophic. &minus;40 in either scale is
      seriously cold. Context matters.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Stop doing the 9/5 multiplication under pressure; paste your value into our{" "}
      <a href="/tools/temperature-converter">temperature converter</a> and get all four scales
      at once. Pair it with the <a href="/tools/unit-converter">unit converter</a> for the full
      set of measurement conversions, and the{" "}
      <a href="/tools/cooking-converter">cooking converter</a> when the temperature conversion
      is paired with volume or weight in a recipe.
    </p>
  </>
);
