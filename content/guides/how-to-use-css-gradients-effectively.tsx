import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      CSS gradients are everywhere in modern design — hero
      backgrounds, button hovers, card overlays, mesh-style
      backgrounds, text effects. They&rsquo;re also easy to overdo.
      A well-placed gradient makes a page feel designed; a bad one
      makes it look like 2012 Bootstrap. This guide covers the
      gradient types, how to choose directions and stops that
      actually look good, performance implications, accessibility
      considerations (yes, gradients have contrast rules too), and
      the modern techniques — mesh gradients, animated gradients,
      conic gradients — that give flat designs depth.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The three gradient types in CSS</h2>
    <p>
      <strong>Linear gradient:</strong> colors transition along a
      straight line. The workhorse gradient. <code>linear-gradient(
      to right, #f00, #00f)</code>.
    </p>
    <p>
      <strong>Radial gradient:</strong> colors radiate out from a
      center point. Creates a spotlight or vignette effect. <code>
      radial-gradient(circle at center, #fff, #000)</code>.
    </p>
    <p>
      <strong>Conic gradient:</strong> colors rotate around a center
      point, creating a pie-chart or color-wheel effect. <code>
      conic-gradient(from 0deg, red, yellow, green, blue, red)</code>.
      Underused and often the key to modern-looking gradients.
    </p>

    <h2>Direction — more than &ldquo;top to bottom&rdquo;</h2>
    <p>
      Linear gradients accept either keywords (<code>to top</code>,
      <code> to right</code>, <code>to bottom left</code>) or angles
      (<code>45deg</code>, <code>135deg</code>).
    </p>
    <p>
      <strong>0deg</strong> = bottom to top (unlike traditional math
      conventions).
    </p>
    <p>
      <strong>90deg</strong> = left to right.
    </p>
    <p>
      <strong>180deg</strong> = top to bottom (the default).
    </p>
    <p>
      <strong>Pro tip:</strong> diagonal gradients (30-60deg or
      120-150deg) feel more dynamic than pure horizontal/vertical.
      Compare <code>linear-gradient(to right, #f00, #00f)</code>
      with <code>linear-gradient(135deg, #f00, #00f)</code> — the
      diagonal feels more modern.
    </p>

    <h2>Color stops — the hidden craft</h2>
    <p>
      By default, colors distribute evenly. Controlling where
      they transition changes everything.
    </p>
    <p>
      <code>linear-gradient(to right, red, blue)</code> = 50%
      transition point.
    </p>
    <p>
      <code>linear-gradient(to right, red, blue 80%)</code> = blue
      starts at 80%, red dominates.
    </p>
    <p>
      <code>linear-gradient(to right, red 0%, red 30%, blue 70%,
      blue 100%)</code> = hard edges with a band in the middle.
    </p>
    <p>
      <strong>The &ldquo;gray mush&rdquo; problem:</strong>
      transitioning between complementary colors (red→green,
      blue→orange) creates a muddy middle. Fix: introduce a midpoint
      that skips the gray zone.
    </p>
    <p>
      <code>linear-gradient(to right, red, orange, yellow)</code> —
      avoids the muddy middle by going around the color wheel.
    </p>

    <h2>Color interpolation — the new CSS superpower</h2>
    <p>
      Modern browsers (2024+) support <code>in oklch</code> and
      other color spaces for gradient interpolation:
    </p>
    <p>
      <code>linear-gradient(in oklch to right, red, blue)</code>
    </p>
    <p>
      <strong>Why this matters:</strong> interpolating in the
      default sRGB space produces muddy middle tones between
      contrasting colors. OKLCH (perceptually uniform) produces
      vibrant, even transitions. Use it for smooth hue transitions.
    </p>
    <p>
      Also available: <code>in oklab</code>, <code>in hsl</code>,
      <code>in lab</code>. Different spaces produce different
      middles; experiment.
    </p>

    <h2>Using gradients right</h2>
    <p>
      <strong>Hero backgrounds:</strong> subtle gradients feel
      premium. Pick two close analogous colors (blue → teal,
      purple → pink). Avoid full-saturation opposites.
    </p>
    <p>
      <strong>Overlays for readability:</strong> text over an image
      often needs a gradient overlay to stay readable. <code>
      linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))</code>
      darkens the bottom half where text sits.
    </p>
    <p>
      <strong>Buttons:</strong> a subtle gradient (lighter to
      slightly darker) gives dimension without screaming. Avoid
      button gradients that feel skeuomorphic.
    </p>
    <p>
      <strong>Card accent strips:</strong> a 4px gradient band on a
      card&rsquo;s edge adds polish.
    </p>
    <p>
      <strong>Text effects:</strong> <code>background:
      linear-gradient(...); -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;</code> fills text with
      a gradient. Striking for headlines; overused in 2020-2022 so
      use sparingly now.
    </p>

    <h2>Mesh gradients — the current design meta</h2>
    <p>
      Mesh gradients (multi-point, multi-color gradients that create
      organic blobs) are everywhere in 2024-2026 design. CSS
      doesn&rsquo;t have native mesh gradient support, but you can
      fake it with stacked radial gradients.
    </p>
    <p>
      <code>background: radial-gradient(circle at 20% 30%, #f0f 0,
      transparent 40%), radial-gradient(circle at 80% 60%, #0ff 0,
      transparent 40%), #fff;</code>
    </p>
    <p>
      Each radial gradient is a &ldquo;blob&rdquo;; transparent fade
      lets the underlying color show through. Tools like
      meshgradient.in generate these visually.
    </p>

    <h2>Animating gradients</h2>
    <p>
      You can&rsquo;t directly animate <code>background-image</code>
      gradients in CSS (the property doesn&rsquo;t interpolate).
      Workarounds:
    </p>
    <p>
      <strong>Animate background-position</strong> on an oversized
      gradient:
    </p>
    <p>
      <code>background: linear-gradient(45deg, red, blue, red);
      background-size: 400% 400%; animation: shift 10s ease infinite;</code>
    </p>
    <p>
      Smooth, widely supported, performant.
    </p>
    <p>
      <strong>@property for animating gradient stops:</strong>
      register a custom property as a color, then animate it.
      Modern browsers only.
    </p>
    <p>
      <strong>Canvas or WebGL</strong> for complex mesh-gradient
      animation — overkill for most use cases.
    </p>

    <h2>Performance considerations</h2>
    <p>
      Gradients are GPU-accelerated in modern browsers — usually
      faster than images, and they scale infinitely.
    </p>
    <p>
      Exceptions:
    </p>
    <p>
      <strong>Large radial gradients over big areas</strong> can tax
      older GPUs. Test on lower-end devices.
    </p>
    <p>
      <strong>Animated gradients on huge surfaces</strong> (full-
      viewport) can eat battery on mobile. Consider reduced-motion
      fallback.
    </p>
    <p>
      <strong>Stacked radial gradients (mesh effect)</strong> with
      4+ layers can cause repaint lag. Consider rendering to a
      canvas once.
    </p>

    <h2>Accessibility</h2>
    <p>
      Gradients behind text still need contrast.
    </p>
    <p>
      <strong>Test both ends.</strong> A white text on a gradient
      that goes blue → light blue fails contrast at the light end.
    </p>
    <p>
      <strong>Add a semi-transparent overlay if needed.</strong>
      <code>linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))</code>
      over the gradient darkens uniformly without changing the
      underlying color story.
    </p>
    <p>
      <strong>Respect prefers-reduced-motion</strong> for animated
      gradients:
    </p>
    <p>
      <code>@media (prefers-reduced-motion: reduce) {`{ animation: none; }`}</code>
    </p>

    <h2>Dark mode gradients</h2>
    <p>
      Light-mode gradients ported directly to dark mode often look
      garish. De-saturate and shift toward darker midtones.
    </p>
    <p>
      Use CSS custom properties that respond to color scheme:
    </p>
    <p>
      <code>@media (prefers-color-scheme: dark) {`{ --gradient-from: #1a1a2e; --gradient-to: #16213e; }`}</code>
    </p>
    <p>
      Then reference <code>var(--gradient-from)</code> in your
      gradient declarations.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Full-saturation rainbow gradients.</strong> Multi-color
      gradients with 4+ full-saturation stops look chaotic. Pick 2-3
      analogous colors.
    </p>
    <p>
      <strong>Gradients for everything.</strong> Not every surface
      needs depth. Flat backgrounds with one accent gradient beat
      pages of gradient soup.
    </p>
    <p>
      <strong>No fallback.</strong> Very old browsers may not
      render advanced gradient syntax. Always <code>background-color:
      #hexfallback;</code> before the gradient declaration.
    </p>
    <p>
      <strong>Low-contrast overlays.</strong> The text-on-gradient
      problem again. Always check the worst case.
    </p>
    <p>
      <strong>Not testing on real devices.</strong> Gradients render
      slightly differently across platforms. Safari vs Chrome,
      Android vs iOS — quick-test on real hardware.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Build gradients visually with the{" "}
      <a href="/tools/gradient-generator">CSS gradient generator</a>.
      Pair with the{" "}
      <a href="/tools/color-picker">color picker</a> to pick exact
      stop colors, and the{" "}
      <a href="/tools/color-converter">color converter</a> when
      translating between HEX/RGB/HSL for fine-tuning.
    </p>
  </>
);
