import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Box shadow is the depth system of the web. Done right, it
      makes cards feel layered, buttons feel clickable, modals feel
      like they&rsquo;re floating. Done wrong, it makes your page
      look like a 2010 iOS skeuomorphism tribute. This guide covers
      the six box-shadow values and what they actually do, the
      elevation system used by Material Design and modern design
      systems, inset shadows, multi-layer shadows that feel real,
      dark mode differences, performance, and the common mistakes
      that make shadows look bolted on.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The six values, decoded</h2>
    <p>
      <code>box-shadow: offset-x offset-y blur spread color
      [inset]</code>
    </p>
    <p>
      <strong>offset-x:</strong> horizontal distance. Positive =
      right, negative = left.
    </p>
    <p>
      <strong>offset-y:</strong> vertical distance. Positive = down,
      negative = up. Most shadows have positive y (light from above).
    </p>
    <p>
      <strong>blur:</strong> how soft the shadow edge is. Higher =
      softer, larger apparent shadow. 0 = hard edge.
    </p>
    <p>
      <strong>spread:</strong> how far the shadow grows or shrinks
      before the blur applies. Positive expands; negative contracts.
      Often omitted (defaults to 0).
    </p>
    <p>
      <strong>color:</strong> shadow color, usually semi-transparent
      black or dark.
    </p>
    <p>
      <strong>inset:</strong> optional keyword — shadow appears
      inside the element instead of outside.
    </p>

    <h2>The elevation model</h2>
    <p>
      Material Design popularized a tiered shadow system where each
      level represents how &ldquo;lifted&rdquo; an element is. Modern
      design systems (Tailwind, Radix Themes, Chakra) follow the
      same pattern.
    </p>
    <p>
      <strong>Elevation 1 (xs):</strong> subtle separation —
      <code> 0 1px 2px rgba(0,0,0,0.05)</code>. For borderless cards
      or input fields.
    </p>
    <p>
      <strong>Elevation 2 (sm):</strong> cards, buttons —
      <code> 0 1px 3px rgba(0,0,0,0.1)</code>.
    </p>
    <p>
      <strong>Elevation 3 (md):</strong> floating cards, dropdowns —
      <code> 0 4px 6px rgba(0,0,0,0.1)</code>.
    </p>
    <p>
      <strong>Elevation 4 (lg):</strong> hover states, popovers —
      <code> 0 10px 15px rgba(0,0,0,0.1)</code>.
    </p>
    <p>
      <strong>Elevation 5 (xl):</strong> modals, drawers —
      <code> 0 20px 25px rgba(0,0,0,0.15)</code>.
    </p>
    <p>
      <strong>Elevation 6 (2xl):</strong> big floating elements —
      <code> 0 25px 50px rgba(0,0,0,0.25)</code>.
    </p>
    <p>
      Use a consistent set across your project. Inconsistent shadows
      are the tell of a hand-built design.
    </p>

    <h2>Multi-layer shadows — the secret to realism</h2>
    <p>
      Real-world shadows have multiple components: the hard
      &ldquo;contact&rdquo; shadow right under the object and the
      soft ambient shadow further away. A single CSS shadow
      approximates one of these; stacking two makes the object feel
      grounded.
    </p>
    <p>
      <code>box-shadow: 0 1px 2px rgba(0,0,0,0.08), 0 4px 12px
      rgba(0,0,0,0.04);</code>
    </p>
    <p>
      The first layer is tight and sharper (contact); the second is
      diffuse (ambient). Multi-layer shadows are what make Stripe
      and Linear UIs look polished.
    </p>
    <p>
      <strong>Tailwind&rsquo;s default shadow-md:</strong> four
      layered rgba shadows. Look at the computed value — it&rsquo;s
      a stack, not a single shadow.
    </p>

    <h2>Color — black isn&rsquo;t always right</h2>
    <p>
      Pure black (#000) shadows look dirty against colored
      backgrounds. Instead:
    </p>
    <p>
      <strong>Match the shadow hue to the background:</strong> on a
      blue card, tint the shadow blue-black.
      <code> rgba(30, 50, 100, 0.15)</code> instead of
      <code> rgba(0,0,0,0.15)</code>.
    </p>
    <p>
      <strong>Use the element&rsquo;s color at low opacity:</strong>
      for a purple button, <code>box-shadow: 0 4px 14px 0
      rgba(128, 0, 255, 0.39)</code> feels like the button is
      glowing instead of casting a shadow.
    </p>
    <p>
      <strong>Dark mode:</strong> shadows on dark backgrounds are
      nearly invisible. Switch to highlight-based elevation (subtle
      inner glow, lighter border, or increased brightness) or use
      much darker, larger shadows (<code>rgba(0,0,0,0.6)</code>).
    </p>

    <h2>Inset shadows</h2>
    <p>
      <code>inset</code> inverts the shadow — it appears inside the
      element, useful for depressed states (a pressed button) or
      neumorphic designs.
    </p>
    <p>
      <code>box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);</code>
    </p>
    <p>
      Classic use: input fields in older UIs, pressed-button states,
      card thumbnails with subtle inner border.
    </p>
    <p>
      Can combine inset and outset in one rule:
      <code> box-shadow: inset 0 1px 0 rgba(255,255,255,0.1),
      0 1px 2px rgba(0,0,0,0.2);</code> creates a glossy highlight
      at top with a cast shadow below.
    </p>

    <h2>Filter drop-shadow — for complex shapes</h2>
    <p>
      <code>box-shadow</code> draws the shadow from the element&rsquo;s
      rectangular border box. If you have a PNG with transparency or
      an SVG icon, the shadow will be rectangular, not following the
      shape.
    </p>
    <p>
      <strong>Solution:</strong> use <code>filter: drop-shadow(...)</code>.
      It follows alpha channels.
    </p>
    <p>
      <code>filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));</code>
    </p>
    <p>
      Slightly more expensive to render than box-shadow (GPU filter
      pass vs layout-only). Use for icons and irregular shapes,
      box-shadow for rectangles.
    </p>

    <h2>Hover and transition</h2>
    <p>
      A classic move: slight shadow increase on hover to suggest
      the element is lifting.
    </p>
    <p>
      <code>.card {`{ box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: box-shadow 0.2s ease, transform 0.2s ease; }`} .card:hover
      {`{ box-shadow: 0 8px 16px rgba(0,0,0,0.15); transform:
      translateY(-2px); }`}</code>
    </p>
    <p>
      The translateY reinforces the lift; the larger shadow reads as
      distance from the surface.
    </p>
    <p>
      <strong>Keep transitions short.</strong> 150-250ms feels
      responsive; longer feels laggy.
    </p>

    <h2>Performance considerations</h2>
    <p>
      Shadows are GPU-accelerated but expensive compared to
      flat-color rendering.
    </p>
    <p>
      <strong>Large blur radius on large elements</strong> is the
      most expensive case — the GPU has to composite a huge
      transparent area. Limit blur to what you actually need.
    </p>
    <p>
      <strong>Many layered shadows × many elements</strong> can
      cause jank during scroll on low-end devices. If you have 50
      cards each with 4-layer shadows, profile scroll performance.
    </p>
    <p>
      <strong>Animating box-shadow</strong> triggers repaint on every
      frame. Prefer animating <code>transform</code> and
      <code> opacity</code> instead. If you need the shadow change,
      consider using a pseudo-element with opacity toggles.
    </p>

    <h2>Dark mode — the full redesign</h2>
    <p>
      Shadows don&rsquo;t read on dark backgrounds. Alternatives:
    </p>
    <p>
      <strong>Lighter border as elevation.</strong> Dark surfaces get
      a 1px lighter top border (<code>border-top: 1px solid
      rgba(255,255,255,0.1)</code>).
    </p>
    <p>
      <strong>Background lightness change.</strong> Each elevation
      level = slightly lighter surface (instead of shadow). Material
      Design&rsquo;s dark theme uses this.
    </p>
    <p>
      <strong>Colored glow.</strong> Brand-colored shadow at low
      opacity can still register on dark backgrounds.
    </p>
    <p>
      <strong>Strong shadow.</strong> <code>rgba(0,0,0,0.6)</code> or
      higher, with substantial blur. Works best when there&rsquo;s
      actual contrast under the element.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Full-black shadows on colored backgrounds.</strong>
      Reads as dirty. Tint the shadow.
    </p>
    <p>
      <strong>Single-layer shadow on a flat design.</strong> Pairs a
      flat aesthetic with a sharp unrealistic shadow. Use multiple
      layers or no shadow at all.
    </p>
    <p>
      <strong>Shadows on everything.</strong> Shadows are contrast
      cues — when everything has one, nothing stands out.
    </p>
    <p>
      <strong>Identical shadow at every elevation.</strong> Using
      <code>shadow-md</code> for cards, dropdowns, modals, and hero
      images flattens the hierarchy. Match shadow to semantic
      elevation.
    </p>
    <p>
      <strong>Forgetting border-radius interaction.</strong> Hard
      corners with soft shadows look awkward. The shadow reads the
      element&rsquo;s border-radius; make sure they agree visually.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Tune shadows live with the{" "}
      <a href="/tools/box-shadow-generator">box shadow generator</a>.
      Pair with the{" "}
      <a href="/tools/border-radius-generator">border radius generator</a>
      {" "}to match corner softness to shadow softness, and the{" "}
      <a href="/tools/gradient-generator">gradient generator</a>
      {" "}when layering shadows with background depth.
    </p>
  </>
);
