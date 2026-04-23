import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Unit conversion sounds trivial — multiply by a factor — until
      you trip on Fahrenheit-to-Celsius (which needs an offset, not
      just a ratio), US vs Imperial gallons (20% different), or the
      international ambiguity of &ldquo;ton.&rdquo; This guide covers
      the conversion factors that matter, the ones that catch people
      out, and a mental-math toolkit for the conversions you&rsquo;ll
      do most often.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The two types of conversions</h2>
    <p>
      <strong>Multiplicative:</strong> most conversions. Multiply by
      a constant factor. Meters → feet: × 3.281. Kilograms →
      pounds: × 2.205. Same formula both ways, with the reciprocal.
    </p>
    <p>
      <strong>Linear (with offset):</strong> Fahrenheit ↔ Celsius
      needs both a ratio and an offset. You can&rsquo;t &ldquo;multiply
      by one number.&rdquo;
    </p>

    <h2>Temperature — the one with the offset</h2>
    <p>
      <strong>C → F:</strong> F = (C × 9/5) + 32. Or approximately:
      double C, subtract 10%, add 32.
    </p>
    <p>
      <strong>F → C:</strong> C = (F − 32) × 5/9. Or approximately:
      subtract 32, multiply by 0.56.
    </p>
    <p>
      <strong>C → K (Kelvin):</strong> K = C + 273.15. No ratio,
      just an offset.
    </p>
    <p>
      Anchors worth memorizing:
    </p>
    <p>
      0°C = 32°F (freezing)
    </p>
    <p>
      20°C = 68°F (room temperature)
    </p>
    <p>
      37°C = 98.6°F (body temperature)
    </p>
    <p>
      100°C = 212°F (boiling)
    </p>
    <p>
      −40°C = −40°F (the only point where they match)
    </p>

    <h2>Length — metric vs imperial</h2>
    <p>
      <strong>1 inch = 2.54 cm</strong> (exact, by definition).
    </p>
    <p>
      <strong>1 foot = 30.48 cm</strong> (exact).
    </p>
    <p>
      <strong>1 yard = 0.9144 m</strong> (exact).
    </p>
    <p>
      <strong>1 mile = 1.609344 km</strong>. Approximation: km ≈
      miles × 1.6. Or: miles ≈ km × 0.62.
    </p>
    <p>
      <strong>1 m = 3.281 ft = 39.37 in</strong>.
    </p>
    <p>
      Mental math: for cm → inches, divide by 2.5 (or multiply by 0.4).
      10 cm ≈ 4 in. For m → yards, they&rsquo;re roughly equivalent
      (1 m ≈ 1.09 yd). Close enough for estimation.
    </p>

    <h2>Weight / mass</h2>
    <p>
      <strong>1 lb = 0.4536 kg</strong>. Approximation: lb × 0.45
      or kg × 2.2.
    </p>
    <p>
      <strong>1 kg = 2.2046 lb</strong>.
    </p>
    <p>
      <strong>1 oz = 28.35 g</strong>.
    </p>
    <p>
      <strong>Ton</strong> — three different values. US &ldquo;short
      ton&rdquo; = 2,000 lb = 907 kg. UK &ldquo;long ton&rdquo; =
      2,240 lb = 1,016 kg. Metric ton (tonne) = 1,000 kg = 2,205 lb.
      Always clarify which.
    </p>
    <p>
      Mental math: kg → lb, double and add 10%. 50 kg × 2 = 100,
      + 10 = 110 lb (actual: 110.23).
    </p>

    <h2>Volume — where US and UK diverge</h2>
    <p>
      <strong>1 US gallon = 3.785 L = 4 US quarts = 128 US fl oz</strong>.
    </p>
    <p>
      <strong>1 Imperial (UK) gallon = 4.546 L</strong> — about 20%
      larger than US.
    </p>
    <p>
      <strong>1 US fluid ounce = 29.57 mL</strong>.
    </p>
    <p>
      <strong>1 Imperial fluid ounce = 28.41 mL</strong>. Slightly
      smaller than US fl oz, despite the gallon being larger.
    </p>
    <p>
      <strong>1 cup (US) = 236.6 mL</strong>. Note: cup is US-specific;
      the UK uses &ldquo;Imperial cup&rdquo; (284 mL) rarely. UK
      recipes usually specify grams or mL.
    </p>
    <p>
      <strong>1 cubic meter = 1,000 L</strong>.
    </p>
    <p>
      Recipe-conversion gotcha: a US cup of butter ≈ 227 g; a UK
      &ldquo;cup&rdquo; of butter could mean 240 mL ≈ 230 g or 284 mL
      ≈ 270 g. Always weigh if precision matters.
    </p>

    <h2>Area</h2>
    <p>
      <strong>1 sq ft = 0.0929 m²</strong>.
    </p>
    <p>
      <strong>1 m² = 10.764 sq ft</strong>. Approximation: m² × 10.8
      for sq ft.
    </p>
    <p>
      <strong>1 acre = 4,047 m² = 0.4047 hectare = 43,560 sq ft</strong>.
    </p>
    <p>
      <strong>1 hectare = 10,000 m² = 2.471 acres</strong>.
    </p>
    <p>
      <strong>1 sq mile = 640 acres = 2.59 km²</strong>.
    </p>

    <h2>Speed</h2>
    <p>
      <strong>mph → km/h:</strong> × 1.609. A US 65 mph speed limit
      = ~105 km/h.
    </p>
    <p>
      <strong>km/h → mph:</strong> × 0.621. German autobahn at 130
      km/h = ~81 mph.
    </p>
    <p>
      <strong>Knots → mph:</strong> × 1.151. Knots → km/h: × 1.852.
    </p>
    <p>
      <strong>m/s → km/h:</strong> × 3.6. Usain Bolt&rsquo;s peak
      ~12 m/s = ~43 km/h.
    </p>

    <h2>Energy and power</h2>
    <p>
      <strong>1 calorie (small)</strong> = 4.184 J. But food
      &ldquo;calories&rdquo; are kilocalories (kcal) = 4,184 J.
      Confusing but entrenched.
    </p>
    <p>
      <strong>1 kWh = 3,600,000 J = 3.6 MJ</strong>.
    </p>
    <p>
      <strong>1 BTU = 1,055 J</strong>. 1,000 BTU/h = ~293 W.
    </p>
    <p>
      <strong>1 horsepower (mechanical) = 745.7 W</strong>. 1
      horsepower (metric) = 735.5 W. Yes, two different horsepowers.
    </p>

    <h2>Data sizes — base-10 vs base-2</h2>
    <p>
      Historically &ldquo;MB&rdquo; meant 2^20 = 1,048,576 bytes
      (binary). Now officially:
    </p>
    <p>
      <strong>MB (megabyte) = 10^6 = 1,000,000 bytes</strong> (decimal,
      used by storage manufacturers).
    </p>
    <p>
      <strong>MiB (mebibyte) = 2^20 = 1,048,576 bytes</strong>
      (binary, used by OS / RAM).
    </p>
    <p>
      A &ldquo;1 TB&rdquo; hard drive shows as ~931 GiB in your OS.
      Not a scam — just the decimal-vs-binary mismatch. Same at
      every scale: KB/KiB, GB/GiB, TB/TiB.
    </p>

    <h2>Angle, pressure, and other niches</h2>
    <p>
      <strong>1 radian = 180/π degrees ≈ 57.296°</strong>. π radians
      = 180°.
    </p>
    <p>
      <strong>1 atm = 101,325 Pa = 14.7 psi = 760 mmHg = 1.013 bar</strong>.
      Tire pressure 32 psi = 220 kPa = 2.2 bar.
    </p>
    <p>
      <strong>Fuel economy:</strong> mpg (US) × 0.425 = km/L. Or
      235.21 / mpg_US = L/100km. 30 mpg ≈ 7.8 L/100km.
    </p>
    <p>
      <strong>UK mpg ≠ US mpg.</strong> UK uses Imperial gallons. 30
      UK mpg = 25 US mpg. Always clarify.
    </p>

    <h2>Common conversion errors</h2>
    <p>
      <strong>1. Applying ratio where offset is needed.</strong>
      Especially temperatures. 20°C is not &ldquo;20 × 1.8 = 36°F.&rdquo;
      It&rsquo;s 68°F. You need the +32 offset.
    </p>
    <p>
      <strong>2. Losing track of US vs UK gallons.</strong> 20%
      difference — big in fuel economy and cooking.
    </p>
    <p>
      <strong>3. Confusing &ldquo;calories&rdquo; with &ldquo;kcal.&rdquo;</strong>
      A 200-&ldquo;calorie&rdquo; cookie is 200 kcal = 200,000 small
      calories.
    </p>
    <p>
      <strong>4. Using the wrong &ldquo;ton.&rdquo;</strong> US
      short ton, UK long ton, metric tonne — up to 12% differences.
    </p>
    <p>
      <strong>5. Rounding too early.</strong> Chain conversions lose
      precision fast if each step rounds to 2 significant digits.
      Keep more digits in intermediate steps; round the final
      answer.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert any unit with the{" "}
      <a href="/tools/unit-converter">unit converter</a>. Pair with
      the <a href="/tools/temperature-converter">temperature converter</a>
      {" "}for the offset-aware temperature conversions, and the{" "}
      <a href="/tools/currency-converter">currency converter</a> when
      you need cross-currency values alongside unit math.
    </p>
  </>
);
