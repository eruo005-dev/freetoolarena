import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      HEX, RGB, HSL, HSB, OKLCH, CMYK — the same color has many
      representations, and each one makes sense in a specific
      context. HEX is compact and copy-friendly. HSL is intuitive
      for tweaking. OKLCH is perceptually uniform. CMYK is for
      print. Converting between them is mechanical, but picking the
      right one for the job and avoiding gamut clipping / precision
      loss is where most confusion lives. This guide covers the color
      models, how conversions actually work, sRGB vs wide gamut, the
      new CSS Color 4 formats (oklch, color(), display-p3), print
      considerations, and how to avoid losing fidelity in round-trips.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The common formats</h2>
    <p>
      <strong>HEX:</strong> <code>#ff5733</code>. Six hex digits for
      RGB, or eight for RGBA. Compact, copy-paste friendly, the
      default for design tokens.
    </p>
    <p>
      <strong>RGB / RGBA:</strong> <code>rgb(255, 87, 51)</code>. Red,
      green, blue as 0-255 integers (or 0-100% or 0-1 float). Alpha
      channel as 0-1. Direct representation of display output.
    </p>
    <p>
      <strong>HSL / HSLA:</strong>{" "}
      <code>hsl(12, 100%, 60%)</code>. Hue (0-360), saturation (%),
      lightness (%). Easier to tweak than RGB — want a darker red?
      Lower lightness, keep hue.
    </p>
    <p>
      <strong>HSB / HSV:</strong> Hue, saturation, value. Like HSL but
      with different lightness semantics. Photoshop uses HSB. Not
      supported directly in CSS.
    </p>
    <p>
      <strong>OKLCH / OKLAB:</strong>{" "}
      <code>oklch(67% 0.18 34)</code>. Lightness, chroma, hue in a
      perceptually uniform color space. Interpolates smoothly without
      muddy midpoints. CSS Color 4.
    </p>
    <p>
      <strong>CMYK:</strong>{" "}
      <code>cmyk(0%, 66%, 80%, 0%)</code>. Cyan, magenta, yellow,
      key (black). For print. Not supported in CSS; used in design
      tools and print workflows.
    </p>

    <h2>HEX ↔ RGB conversion</h2>
    <p>
      Purely mechanical. HEX is base-16 encoding of 0-255 integers,
      two digits per channel:
    </p>
    <pre>
{`#ff5733
  ff → 255 → R
  57 → 87  → G
  33 → 51  → B
= rgb(255, 87, 51)`}
    </pre>
    <p>
      <strong>3-digit HEX:</strong> <code>#f53</code> is shorthand
      for <code>#ff5533</code> — each digit is duplicated. Handy but
      limits you to 4096 colors (16³).
    </p>
    <p>
      <strong>8-digit HEX with alpha:</strong> <code>#ff573380</code>
      {" "}— last two digits are alpha as 0-255 (80 = 128 = ~50%).
      CSS Color 4 supports this.
    </p>

    <h2>RGB ↔ HSL conversion</h2>
    <p>
      Not mechanical — involves min/max math to find hue and
      lightness. The formula:
    </p>
    <pre>
{`R' = R/255, G' = G/255, B' = B/255
max = max(R', G', B'), min = min(R', G', B')

L = (max + min) / 2
S = (max-min) / (1 - |2L-1|)   // or 0 if max=min
H = depends on which is max:
  if R max: H = 60 * ((G'-B')/(max-min) mod 6)
  if G max: H = 60 * ((B'-R')/(max-min) + 2)
  if B max: H = 60 * ((R'-G')/(max-min) + 4)`}
    </pre>
    <p>
      You don&rsquo;t need to memorize this — libraries and converter
      tools handle it. But knowing the math helps you understand why{" "}
      <code>hsl(0, 0%, 50%)</code> is gray (saturation 0 makes hue
      irrelevant).
    </p>

    <h2>sRGB vs wide gamut</h2>
    <p>
      Traditional HEX / RGB / HSL assume sRGB — the web&rsquo;s
      default gamut, covers ~35% of visible colors. Modern displays
      (iPhone, MacBook, high-end monitors) can show Display P3 (~45%)
      or Rec2020 (~75%).
    </p>
    <p>
      HEX can&rsquo;t represent P3 colors. If your brand has a vivid
      red that looks dull on your phone, you&rsquo;re probably
      clipping to sRGB:
    </p>
    <pre>
{`/* sRGB only */
.brand { color: #ff0000; }

/* P3 capable, sRGB fallback */
.brand {
  color: #ff0000;
  color: color(display-p3 1 0 0);
}`}
    </pre>
    <p>
      CSS Color 4 <code>color(display-p3 r g b)</code> opens up the
      wider gamut. Browsers ignore it on sRGB displays and use the
      fallback.
    </p>

    <h2>OKLCH — perceptually uniform</h2>
    <p>
      Mixing HSL colors linearly produces muddy midpoints: midpoint
      of <code>hsl(240, 100%, 50%)</code> (blue) and{" "}
      <code>hsl(0, 100%, 50%)</code> (red) is gray-purple, not a
      pleasant transition.
    </p>
    <p>
      OKLCH fixes this by using a color space where equal numeric
      steps look equally different to the eye. Transitions in OKLCH
      stay vivid and smooth. Recommended for gradients, chart color
      scales, and theme token generation.
    </p>
    <pre>
{`/* Gradient in sRGB — may look muddy */
background: linear-gradient(#ff0000, #0000ff);

/* Gradient in OKLCH — perceptually smooth */
background: linear-gradient(in oklch, #ff0000, #0000ff);`}
    </pre>

    <h2>CMYK conversion — and why it&rsquo;s lossy</h2>
    <p>
      Monitor colors come from emitted light (additive RGB); print
      comes from absorbed light (subtractive CMYK). The conversion
      is fundamentally imperfect — CMYK can&rsquo;t reproduce all
      sRGB colors (especially bright blues, greens), and sRGB
      can&rsquo;t reproduce all CMYK colors (especially deep browns,
      some yellows).
    </p>
    <p>
      <strong>The simple formula:</strong>
    </p>
    <pre>
{`K = 1 - max(R, G, B)
C = (1 - R - K) / (1 - K)
M = (1 - G - K) / (1 - K)
Y = (1 - B - K) / (1 - K)`}
    </pre>
    <p>
      This works for basic conversion but ignores ink characteristics,
      paper, press calibration. Real print workflows use ICC profiles
      (GRACoL 2013, Fogra 51) for accurate conversion. Design tools
      (Illustrator, InDesign) do this automatically.
    </p>
    <p>
      <strong>Practical tip:</strong> don&rsquo;t design in CMYK for
      screens. Design in sRGB (or Display P3 with care), and hand
      off to print with ICC-profile conversion in the design tool.
    </p>

    <h2>Precision and round-tripping</h2>
    <p>
      HEX → RGB is exact (1-to-1 mapping). RGB → HSL → RGB can lose
      a tiny amount of precision due to floating-point math, but
      it&rsquo;s usually &lt;1% per channel. Safe for most uses.
    </p>
    <p>
      sRGB → P3 → sRGB is lossless <em>if</em> the original was in
      sRGB gamut. Otherwise, the P3 → sRGB step clips.
    </p>
    <p>
      sRGB → CMYK → sRGB is lossy. Don&rsquo;t round-trip unless you
      have to.
    </p>

    <h2>Accessibility and contrast</h2>
    <p>
      Strength of a color isn&rsquo;t the same as its contrast
      against a background. WCAG contrast ratios (4.5:1 for body
      text) are calculated from luminance (a weighted combination of
      R, G, B — not straight brightness).
    </p>
    <p>
      Converting to HSL and matching lightness doesn&rsquo;t
      guarantee matched contrast. Always verify with a contrast
      checker.
    </p>

    <h2>Color picker workflows</h2>
    <p>
      <strong>Design tools:</strong> Figma, Sketch, Photoshop all
      let you input and switch between HEX, RGB, HSL, HSB. Figma
      supports OKLCH since 2024.
    </p>
    <p>
      <strong>Dev tools:</strong> Chrome DevTools and Firefox
      DevTools have color pickers that let you switch between
      representations on any color value.
    </p>
    <p>
      <strong>CLI / build:</strong> libraries like{" "}
      <code>culori</code> (JS), <code>colour-science</code> (Python)
      handle modern color math including OKLCH, Display P3, and ICC
      profiles.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Copy-pasting CMYK from print files into web.</strong>
      {" "}Browsers don&rsquo;t understand CMYK. Convert to sRGB via
      your design tool.
    </p>
    <p>
      <strong>Expecting round-trips through CMYK to be lossless.</strong>
      {" "}They&rsquo;re not. Keep sRGB as source of truth; export
      CMYK per print job.
    </p>
    <p>
      <strong>Making gradients in sRGB that look muddy.</strong> Use{" "}
      <code>in oklch</code> or <code>in hsl longer hue</code>.
    </p>
    <p>
      <strong>Forgetting Display P3 fallback.</strong> If you use{" "}
      <code>color(display-p3 ...)</code>, always provide a HEX fallback
      for older browsers and SDR displays.
    </p>
    <p>
      <strong>Matching lightness and expecting contrast parity.</strong>
      {" "}WCAG uses luminance, not HSL lightness. Check with a
      contrast tool.
    </p>
    <p>
      <strong>Using 3-digit HEX for gradients or critical colors.</strong>
      {" "}Only 4096 colors available; banding possible. Use 6-digit.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert HEX / RGB / HSL / HSB / OKLCH with the{" "}
      <a href="/tools/color-converter">color converter</a>.
      Pair with the{" "}
      <a href="/tools/color-picker">color picker</a>
      {" "}to sample from real designs, and the{" "}
      <a href="/tools/contrast-checker">contrast checker</a> to
      validate accessibility.
    </p>
  </>
);
