import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Color palette selection is where taste meets math. Pick well and
      your product, slide, or branding reads as intentional. Pick badly
      and every downstream choice feels off — buttons too loud,
      backgrounds muddy, accessibility broken. This guide covers the
      color-theory foundation (HSL beats RGB for reasoning), the four
      palette schemes that cover 95% of use cases, how to hit WCAG
      contrast without losing aesthetic, tools that actually produce
      palettes worth using, and the mistakes that signal
      &ldquo;amateur&rdquo; at a glance.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>HSL — the color model to think in</h2>
    <p>
      RGB (red-green-blue) tells you what the screen does. HSL (hue-
      saturation-lightness) tells you what humans perceive. Reason
      about palettes in HSL, convert to hex/RGB at implementation time.
    </p>
    <p>
      <strong>Hue (0-360°):</strong> the color family — red (0), orange
      (30), yellow (60), green (120), cyan (180), blue (240), purple
      (270), magenta (300).
    </p>
    <p>
      <strong>Saturation (0-100%):</strong> how vivid. 0% = grayscale.
      100% = neon.
    </p>
    <p>
      <strong>Lightness (0-100%):</strong> 0% = black. 50% = pure color.
      100% = white.
    </p>
    <p>
      Once you&rsquo;re fluent in HSL, you can generate variants
      systematically: hold hue, vary lightness for shades and tints;
      hold lightness, rotate hue for color harmonies; drop saturation
      for backgrounds and borders.
    </p>

    <h2>The four palette schemes — pick one and stick with it</h2>
    <p>
      <strong>1. Monochromatic.</strong> One hue, multiple lightness/
      saturation variants. Hardest to screw up, easiest to look
      cohesive. Great for utilitarian UIs, minimalist brands. Drawback:
      can feel flat. Fix: strong accent color (white, black, or a
      single complementary pop).
    </p>
    <p>
      <strong>2. Analogous.</strong> 2-3 hues adjacent on the wheel
      (e.g., teal + blue + indigo). Harmonious, calm, natural. Good
      for landscape-feeling brands, editorial design. Drawback: lacks
      contrast for CTAs. Fix: use complementary accent for action items.
    </p>
    <p>
      <strong>3. Complementary.</strong> Two hues opposite on the wheel
      (blue + orange, red + green). High contrast, vibrant, good for
      call-to-action heavy designs. Drawback: overuse feels loud. Fix:
      60-30-10 rule — one color dominates, the complement is the accent,
      neutrals carry the rest.
    </p>
    <p>
      <strong>4. Triadic.</strong> Three hues evenly spaced (120° apart).
      Playful, energetic. Good for kids&rsquo; brands, entertainment.
      Drawback: very hard to balance without one dominating. Use only
      if you have a strong design instinct or a designer reviewing.
    </p>

    <h2>The 60-30-10 rule</h2>
    <p>
      Professional palettes rarely use more than 3-4 colors in any
      meaningful amount. A reliable distribution:
    </p>
    <p>
      <strong>60%</strong> — dominant (usually a neutral: white, light
      gray, dark background).
    </p>
    <p>
      <strong>30%</strong> — secondary (brand color, used for sections
      and larger UI).
    </p>
    <p>
      <strong>10%</strong> — accent (CTAs, highlights, interactive
      elements that need to pop).
    </p>
    <p>
      If you find yourself using 6 equal colors, you&rsquo;ve made a
      rainbow, not a palette. Strip back.
    </p>

    <h2>Neutrals — where amateurs cut corners</h2>
    <p>
      &ldquo;Neutral&rdquo; doesn&rsquo;t mean pure gray. Warm-tinted
      neutrals (slight yellow/brown) feel inviting; cool neutrals
      (slight blue) feel clinical. Match neutral temperature to your
      brand color for coherence.
    </p>
    <p>
      Instead of #888888 gray, try HSL(220, 10%, 53%) — a very slightly
      blue-tinted neutral. Notice the difference on large surfaces.
    </p>
    <p>
      Build a <strong>tonal ramp</strong>: 9-10 values of each neutral
      from near-white to near-black. Tailwind&rsquo;s gray-50 through
      gray-900 is the canonical example. Having named steps lets you
      pick consistently (&ldquo;borders are gray-200, muted text is
      gray-500&rdquo;) rather than picking new hex codes each time.
    </p>

    <h2>Accessibility — WCAG contrast is non-negotiable</h2>
    <p>
      <strong>Contrast ratio</strong> is the perceived brightness
      difference between two colors. WCAG defines minimums:
    </p>
    <p>
      <strong>4.5:1</strong> for normal text on background (AA).
    </p>
    <p>
      <strong>3:1</strong> for large text (18pt+), UI components,
      graphical elements (AA).
    </p>
    <p>
      <strong>7:1</strong> for AAA — higher accessibility.
    </p>
    <p>
      Check every text/background pair with a contrast checker before
      shipping. Light gray text on white looks elegant in Figma but
      fails accessibility and is unreadable for users with low vision
      or on dim screens.
    </p>
    <p>
      <strong>The common failure:</strong> &ldquo;muted&rdquo; gray text
      around #aaaaaa on white. 2.3:1 — fails even the relaxed standard.
      Bump to #6b7280 (Tailwind gray-500) minimum for body copy.
    </p>

    <h2>Semantic colors — not just aesthetic</h2>
    <p>
      Beyond brand, you need roles. Common semantic pairs:
    </p>
    <p>
      <strong>Success:</strong> green (hue 120-140).
    </p>
    <p>
      <strong>Warning:</strong> amber/yellow (hue 40-50). Use sparingly
      — contrast on white is poor; pair with stronger background.
    </p>
    <p>
      <strong>Danger/error:</strong> red (hue 0-15).
    </p>
    <p>
      <strong>Info:</strong> blue (hue 200-220).
    </p>
    <p>
      These should live outside your brand palette so a &ldquo;delete&rdquo;
      button looks dangerous even if your brand is blue.
    </p>

    <h2>Dark mode — not just inverting</h2>
    <p>
      A proper dark-mode palette is its own design, not an inverse.
    </p>
    <p>
      <strong>Backgrounds:</strong> not pure black (#000). Very dark
      gray (#0a0a0a, #111) reduces eye strain and makes shadows work.
    </p>
    <p>
      <strong>Text:</strong> not pure white (#fff) on dark. Slightly
      off-white (#e5e5e5, #f5f5f5) reduces glare on OLED screens.
    </p>
    <p>
      <strong>Saturation:</strong> de-saturate brand colors by 20-30%
      for dark-mode UIs. Full-saturation brand colors feel violent on
      dark backgrounds.
    </p>
    <p>
      <strong>Elevation:</strong> use slightly lighter backgrounds (not
      shadows) to indicate elevation — Material Design&rsquo;s surface
      system is the canonical reference.
    </p>

    <h2>Tools that generate real palettes</h2>
    <p>
      <strong>Coolors</strong> (coolors.co) — press space to generate,
      lock favorites, iterate. The fastest way to explore palette
      directions.
    </p>
    <p>
      <strong>Adobe Color</strong> (color.adobe.com) — color-wheel
      driven, with harmony rules built in. Shows live WCAG contrast on
      generated palettes.
    </p>
    <p>
      <strong>Tailwind&rsquo;s palette</strong> (tailwindcss.com/docs/
      customizing-colors) — pre-built 11-step ramps for 22 color
      families. Use as-is for ~80% of web projects.
    </p>
    <p>
      <strong>Radix Colors</strong> (radix-ui.com/colors) — 12-step
      ramps designed with accessibility built in. Matched light and
      dark variants. Aimed at design systems.
    </p>
    <p>
      <strong>Huemint</strong> (huemint.com) — AI-based palette
      generation that considers brand applications.
    </p>
    <p>
      <strong>Site inspiration:</strong> Awwwards, Dribbble, Mobbin.
      Don&rsquo;t copy — observe how combinations work.
    </p>

    <h2>Industry conventions — when to follow, when to break</h2>
    <p>
      <strong>Banking/finance:</strong> blues and greens (trust,
      stability). Navy is dominant.
    </p>
    <p>
      <strong>Healthcare:</strong> teal, green, white. Avoid red
      (clinical red = emergency).
    </p>
    <p>
      <strong>Food delivery:</strong> oranges, reds (appetite).
    </p>
    <p>
      <strong>Tech/SaaS:</strong> blues, purples. Notion-esque pastels
      are the current trend.
    </p>
    <p>
      <strong>Luxury:</strong> black, gold, deep navy, white.
    </p>
    <p>
      These are defaults, not rules. Differentiation often means
      deliberately choosing against the category (Mailchimp&rsquo;s
      yellow in a SaaS world, Liquid Death&rsquo;s punk black).
      Intentional deviation is brand strategy; accidental deviation is
      noise.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Too many colors.</strong> A 7-color palette with no
      dominance reads as chaos. Strip to 3-4 with the 60-30-10 rule.
    </p>
    <p>
      <strong>Pure black everywhere.</strong> #000000 is harsh. Soften
      to #1a1a1a or #0f172a (slate-900) for better perceived warmth.
    </p>
    <p>
      <strong>Vibrating combinations.</strong> Red text on blue
      background, etc. Full-saturation colors adjacent create visual
      buzz. De-saturate one or shift lightness.
    </p>
    <p>
      <strong>Untested on real content.</strong> Palette looks great
      as 9 swatches; looks broken once you apply to a page with real
      copy, buttons, forms. Build a test page, not just swatches.
    </p>
    <p>
      <strong>No dark-mode plan.</strong> Users expect it. Decide
      early or be stuck retrofitting.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Pick exact colors and explore variants with the{" "}
      <a href="/tools/color-picker">color picker</a>. Pair with the{" "}
      <a href="/tools/color-converter">color converter</a> for
      HSL/RGB/HEX conversion, and the{" "}
      <a href="/tools/gradient-generator">gradient generator</a> to
      build multi-stop transitions for heroes and backgrounds.
    </p>
  </>
);
