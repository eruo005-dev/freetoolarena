import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The CSS <code>box-shadow</code> property is how modern interfaces communicate elevation: cards lift off the page, modals float above a dim backdrop, buttons press down on click, and hover states hint at interactivity. The syntax is more capable than most people realize &mdash; four numeric values, a color, an optional <code>inset</code> keyword, and the ability to stack multiple shadows on one element. Designing a shadow system for an interface pays compound interest: once you&rsquo;ve defined an elevation scale, everything feels coordinated. This guide covers the syntax, common patterns, dark-mode pitfalls, and how to build a reusable shadow scale.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The five (or six) values</h2>
    <p>
      A box shadow is defined by up to six components:
    </p>
    <pre>{`box-shadow: <offset-x> <offset-y> <blur> <spread> <color> [inset];

box-shadow: 0 2px 8px 0 rgba(0,0,0,0.12);`}</pre>
    <ul>
      <li><strong>offset-x</strong>: horizontal offset. Positive moves shadow right.</li>
      <li><strong>offset-y</strong>: vertical offset. Positive moves shadow down.</li>
      <li><strong>blur</strong>: how soft the shadow is. 0 is hard-edged, larger values blur more.</li>
      <li><strong>spread</strong> (optional): grows or shrinks the shadow before blurring.</li>
      <li><strong>color</strong>: shadow color, almost always semi-transparent.</li>
      <li><strong>inset</strong> (optional): draws the shadow inside the element instead of outside.</li>
    </ul>

    <h2>Light comes from above</h2>
    <p>
      Real-world shadows come from light, and in most UI conventions, light shines from above (or slightly above-left). So shadows cast downward and slightly right. Positive Y offset, zero or slightly positive X offset:
    </p>
    <pre>{`/* Natural card shadow */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);`}</pre>
    <p>
      Break this convention only for specific effects (inverted elevation, moody product photography). For general UI, stick with it or your interface feels off.
    </p>

    <h2>Subtle beats bold</h2>
    <p>
      Good UI shadows are surprisingly gentle. A 1&ndash;2&nbsp;px offset, 4&ndash;12&nbsp;px blur, and 5&ndash;15% black opacity cover most elevation needs. Heavier shadows (20+ px blur, 30%+ opacity) look dated and heavy; they were fashionable in the early 2010s and have since gone out of style.
    </p>
    <pre>{`/* Too heavy - 2010s style */
box-shadow: 0 10px 30px rgba(0,0,0,0.4);

/* Modern subtle */
box-shadow: 0 1px 3px rgba(0,0,0,0.08),
            0 4px 12px rgba(0,0,0,0.06);`}</pre>

    <h2>Stacking shadows for depth</h2>
    <p>
      Real shadows have a near-contact shadow (tight, dark) and an ambient shadow (wide, soft). Combining both with a comma-separated list feels more natural than a single shadow:
    </p>
    <pre>{`.card {
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.06),
    0 8px 24px rgba(0, 0, 0, 0.08);
}`}</pre>
    <p>
      The first value produces the contact shadow right under the card; the second adds the ambient glow. Tools like Material Design and shadcn build whole systems around this two-shadow pattern.
    </p>

    <h2>Spread: the secret fourth number</h2>
    <p>
      Spread adds to or subtracts from the shadow&rsquo;s rendered size before the blur is applied. Positive spread is useful for thick, buttery shadows on big elements; negative spread tightens the shadow so only the edges show.
    </p>
    <pre>{`/* Tight inner halo */
box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);

/* Lifted card */
box-shadow: 0 10px 20px -5px rgba(0,0,0,0.15);`}</pre>
    <p>
      The first pattern is the classic &ldquo;focus ring&rdquo; replacement for outline; the second lifts the shadow so it reads as more &ldquo;off the page&rdquo; than its vertical offset alone.
    </p>

    <h2>Inset shadows</h2>
    <p>
      The <code>inset</code> keyword draws the shadow inside the element. Uses:
    </p>
    <ul>
      <li><strong>Pressed button state:</strong> subtle inset shadow makes the button look depressed when clicked.</li>
      <li><strong>Input fields:</strong> inset shadow gives a sunken appearance.</li>
      <li><strong>Panels in dashboards:</strong> inset creates the illusion of a recessed area.</li>
    </ul>
    <pre>{`.input {
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.08);
}

.button:active {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
}`}</pre>

    <h2>Building an elevation scale</h2>
    <p>
      Rather than inventing shadows per element, define a scale and reference it. Material Design uses 24 levels (overkill); most systems do fine with 4&ndash;6. A pragmatic scale:
    </p>
    <pre>{`:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow:    0 1px 3px rgba(0,0,0,0.08),
               0 4px 12px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 8px rgba(0,0,0,0.10),
               0 8px 24px rgba(0,0,0,0.08);
  --shadow-lg: 0 12px 32px rgba(0,0,0,0.12),
               0 4px 8px rgba(0,0,0,0.06);
  --shadow-xl: 0 20px 40px rgba(0,0,0,0.18);
}`}</pre>
    <p>
      Map UI concepts to levels:
    </p>
    <ul>
      <li><strong>sm</strong>: input borders, subtle cards.</li>
      <li><strong>base</strong>: default cards.</li>
      <li><strong>md</strong>: hover states for cards, dropdown menus.</li>
      <li><strong>lg</strong>: dialogs, popovers.</li>
      <li><strong>xl</strong>: modals with full-screen backdrops.</li>
    </ul>

    <h2>Hover transitions</h2>
    <p>
      A card that lifts on hover is a classic interactive cue. Combine shadow with a tiny upward translate and a transition:
    </p>
    <pre>{`.card {
  box-shadow: var(--shadow);
  transition: box-shadow 150ms ease, transform 150ms ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}`}</pre>
    <p>
      The translate sells the physical lift; the shadow upgrade reinforces it. 150ms is the sweet spot &mdash; faster feels twitchy, slower feels laggy.
    </p>

    <h2>Dark mode considerations</h2>
    <p>
      Black shadows on black backgrounds are invisible. In dark mode, either increase opacity dramatically, use a slightly lighter-than-background shadow color, or rely on a subtle inner border instead of a shadow.
    </p>
    <pre>{`/* Light mode */
.card { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .card {
    box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    /* Or: a subtle glow */
    /* box-shadow: 0 0 0 1px rgba(255,255,255,0.06); */
  }
}`}</pre>
    <p>
      Many dark themes skip shadows entirely and use borders or background-color steps for elevation instead.
    </p>

    <h2>Colored shadows</h2>
    <p>
      Shadows don&rsquo;t have to be gray. A subtle tint of the element&rsquo;s color can add vibrancy:
    </p>
    <pre>{`.primary-button {
  background: #3b82f6;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.4);
}`}</pre>
    <p>
      The shadow matches the button color at low opacity, making the button glow slightly. Use sparingly &mdash; coloring every shadow reads as try-hard. Save for hero CTAs and accent elements.
    </p>

    <h2>Performance</h2>
    <p>
      Large-blur shadows on many elements can hurt scroll performance, especially on low-end devices. Shadows are rasterized and re-composited on every paint. For heavy UIs (long feeds with shadowed cards), consider:
    </p>
    <ul>
      <li>Using <code>will-change: box-shadow</code> on elements that transition shadows, so the browser pre-promotes them to their own layer.</li>
      <li>Replacing expensive shadows with cheaper borders or background gradients.</li>
      <li>Testing scrolling performance in DevTools&rsquo; Performance panel.</li>
    </ul>

    <h2>Common mistakes</h2>
    <p>
      Using offset-Y with zero blur and getting a hard-edged black line instead of a shadow &mdash; always include some blur. Picking shadow opacities in the 30&ndash;50% range that scream &ldquo;2012.&rdquo; Forgetting dark mode and leaving black shadows invisible. Stacking shadows on every nested element so the UI looks like a physical pile of business cards. Using <code>box-shadow</code> for focus rings and forgetting to preserve accessibility focus indicators when you remove <code>outline</code> &mdash; keyboard users rely on them. And the subtle one: letting shadows grow on hover but not animating them, so they pop instead of easing &mdash; always transition.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/box-shadow-generator">box shadow generator</a> lets you compose multi-layer shadows with live preview and copy-ready CSS. Pair with the <a href="/tools/border-radius-generator">border-radius generator</a> for card styling and the <a href="/tools/gradient-generator">gradient generator</a> for backgrounds that complement the elevation.
    </p>
  </>
);
