import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Tailwind promises less CSS and faster iteration, but migrating an
      existing stylesheet is where most teams stall. Pick the wrong
      approach and you end up with a mess of utility classes next to
      dead CSS files for months. This guide covers the migration
      strategies that work (big bang vs component-by-component vs
      utilities alongside), the config you need to preserve your
      design tokens, how to handle nested selectors / pseudo-classes /
      media queries, dealing with component libraries, common
      breakages, and tools that speed up the conversion.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Decide the migration shape first</h2>
    <p>
      Three viable paths. Picking the wrong one is the main source
      of pain.
    </p>
    <p>
      <strong>Big bang (rewrite all CSS at once):</strong> fastest
      finish, highest risk. Works only for small codebases (&lt;5k
      lines CSS) or fresh projects.
    </p>
    <p>
      <strong>Utilities alongside legacy CSS:</strong> add Tailwind,
      start using it on new components, don&rsquo;t touch existing
      ones. Low risk, slow finish, potential for drift. Fine if the
      goal is &ldquo;stop writing new CSS&rdquo; not &ldquo;delete
      all CSS&rdquo;.
    </p>
    <p>
      <strong>Component-by-component:</strong> pick a component,
      convert fully (remove its dedicated CSS, replace with
      utilities), verify, move on. Best balance. This is what most
      successful migrations use.
    </p>
    <p>
      Pick one and commit. Mixing strategies without discipline leads
      to half-done components everywhere.
    </p>

    <h2>Set up the config to match your existing design tokens</h2>
    <p>
      Don&rsquo;t use Tailwind defaults blindly. Map your existing
      colors, spacing scale, font sizes, and breakpoints into{" "}
      <code>tailwind.config.js</code>:
    </p>
    <pre>
{`module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { 50: '#f0f9ff', 500: '#3b82f6', 900: '#1e3a8a' },
        // from your existing --color-* tokens
      },
      spacing: {
        18: '4.5rem',  // if you have odd values
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      screens: {
        'xs': '475px',  // if you have custom breakpoints
      },
    },
  },
};`}
    </pre>
    <p>
      This single step saves thousands of find-replaces. Your utility
      classes now reflect your tokens, so <code>bg-brand-500</code>
      {" "}means exactly what your design system says it means.
    </p>

    <h2>Convert nested selectors</h2>
    <p>
      Nested CSS like{" "}
      <code>.card &gt; .title &#123; color: blue; &#125;</code>{" "}
      becomes utility classes on the child element directly.
    </p>
    <pre>
{`/* Before */
.card { padding: 1rem; border: 1px solid gray; }
.card > .title { font-weight: 600; color: blue; }

/* After */
<div class="p-4 border border-gray-300">
  <h3 class="font-semibold text-blue-600">...</h3>
</div>`}
    </pre>
    <p>
      Think in terms of elements, not cascades. This is the biggest
      mindset shift.
    </p>

    <h2>Pseudo-classes and states</h2>
    <p>
      Tailwind uses variant prefixes:
    </p>
    <pre>
{`/* Before */
.button:hover { background: darkblue; }
.button:focus { outline: 2px solid blue; }
.button:disabled { opacity: 0.5; }

/* After */
<button class="bg-blue-500 hover:bg-blue-700 focus:outline-2 focus:outline-blue-500 disabled:opacity-50">`}
    </pre>
    <p>
      Stack variants freely: <code>md:hover:bg-gray-100</code>{" "}
      means &ldquo;on medium+ screens, when hovered&rdquo;. Order
      matters only for readability — Tailwind processes them
      correctly regardless.
    </p>

    <h2>Media queries → responsive prefixes</h2>
    <p>
      Tailwind&rsquo;s responsive prefixes are mobile-first.{" "}
      <code>md:</code> = &ldquo;at 768px and above&rdquo;,{" "}
      <code>lg:</code> = &ldquo;1024px and above&rdquo;.
    </p>
    <pre>
{`/* Before */
.layout { display: block; }
@media (min-width: 768px) { .layout { display: flex; } }

/* After */
<div class="block md:flex">`}
    </pre>
    <p>
      Max-width queries use <code>max-*</code> variants (Tailwind
      3.0+). Mostly you won&rsquo;t need them if you think
      mobile-first.
    </p>

    <h2>Dealing with component libraries</h2>
    <p>
      If you use Bootstrap, Material UI, or similar, don&rsquo;t
      rip them out on day one. Migrate leaf components (your own
      buttons, cards, layouts) first. Move to Tailwind-based
      component libraries (shadcn/ui, Radix + Tailwind, Headless UI)
      only after your own styles are stable.
    </p>
    <p>
      Some libraries conflict with Tailwind&rsquo;s base reset (it
      zeros out margins, list styles, etc.). Either scope
      Tailwind&rsquo;s preflight or add a root selector in the config
      to limit its reach.
    </p>

    <h2>Extracting repeated patterns</h2>
    <p>
      When you see <code>class=&ldquo;flex items-center px-4 py-2
      bg-blue-500 text-white rounded&rdquo;</code> everywhere, extract
      it. Options:
    </p>
    <p>
      <strong>Component:</strong> <code>&lt;Button variant=&ldquo;primary&rdquo;&gt;</code>
      {" "}— best for React/Vue/Svelte apps. Utility classes stay
      local to one file.
    </p>
    <p>
      <strong>@apply directive:</strong> in a CSS file, write{" "}
      <code>.btn-primary &#123; @apply flex items-center ...; &#125;</code>.
      Useful for non-component codebases but somewhat defeats the
      utility-first point. Use sparingly.
    </p>
    <p>
      <strong>Tailwind plugin:</strong> register custom components
      via <code>addComponents()</code>. Good for design system
      primitives used everywhere.
    </p>

    <h2>Handling dynamic class names</h2>
    <p>
      Tailwind compiles classes by scanning source files for class
      strings. Dynamic composition breaks this:
    </p>
    <pre>
{`// Bad — Tailwind can't see 'bg-red-500' in source
<div className={\`bg-\${color}-500\`}>

// Good — complete class names in source
<div className={color === 'red' ? 'bg-red-500' : 'bg-blue-500'}>

// Also good — safelist in config
// tailwind.config.js: safelist: ['bg-red-500', 'bg-blue-500']`}
    </pre>
    <p>
      This is the #1 source of &ldquo;why is my class not working&rdquo;
      bug reports.
    </p>

    <h2>Global styles that remain</h2>
    <p>
      Some styles don&rsquo;t convert cleanly:
    </p>
    <p>
      <strong>Complex animations</strong> with many keyframes — keep
      as CSS, reference via Tailwind&rsquo;s{" "}
      <code>animate-*</code> extension.
    </p>
    <p>
      <strong>Print styles</strong> — Tailwind supports{" "}
      <code>print:</code> variant now, but complex print CSS often
      stays separate.
    </p>
    <p>
      <strong>Third-party embed styles</strong> (markdown content,
      rich text from CMS) — use{" "}
      <code>@tailwindcss/typography</code> plugin or keep a separate
      content stylesheet.
    </p>

    <h2>Stripping dead CSS after conversion</h2>
    <p>
      The payoff: delete the old CSS. Do this per component, not at
      the end. Steps:
    </p>
    <p>
      1. Convert component to Tailwind utilities.
    </p>
    <p>
      2. Remove its class names from the template.
    </p>
    <p>
      3. Delete the matching CSS rules.
    </p>
    <p>
      4. Run the app; verify visually.
    </p>
    <p>
      5. Commit the component + its CSS deletion together.
    </p>
    <p>
      If you wait until &ldquo;everything is converted&rdquo; to
      delete CSS, you won&rsquo;t.
    </p>

    <h2>Build size and performance</h2>
    <p>
      Modern Tailwind (3.0+) uses JIT compilation — generates only
      classes you use. Production CSS is typically 10-50KB. Old
      codebases with 500KB of custom CSS often drop to under 30KB
      after migration.
    </p>
    <p>
      Check with <code>npx tailwindcss -i in.css -o out.css
      --minify</code> — compare file sizes before and after.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Keeping both old CSS and Tailwind on the same
      element.</strong> Specificity wars. Remove old classes as you
      add new ones, per commit.
    </p>
    <p>
      <strong>Inlining 30 utility classes.</strong> At some point,
      extract to a component. Utility chains longer than ~15 are a
      smell.
    </p>
    <p>
      <strong>Ignoring Tailwind&rsquo;s preflight.</strong> Its base
      reset removes default margins/list styles/button styling. Check
      your layouts after enabling it.
    </p>
    <p>
      <strong>Overriding with !important.</strong> Tailwind provides
      the <code>!</code> prefix (<code>!bg-red-500</code>). Use
      extremely sparingly — the real fix is usually source order.
    </p>
    <p>
      <strong>Not configuring the content glob.</strong> Tailwind only
      scans files listed in <code>content: [...]</code>. Missing your{" "}
      <code>.mdx</code> or <code>.svelte</code> files means classes
      disappear from prod.
    </p>
    <p>
      <strong>Treating migration as 100% utility coverage.</strong>
      {" "}Complex animations, print styles, third-party content
      — leaving some CSS is fine.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert existing CSS rules to Tailwind utility classes with the{" "}
      <a href="/tools/css-to-tailwind">CSS to Tailwind converter</a>.
      Pair with the{" "}
      <a href="/tools/css-minifier">CSS minifier</a> to ship the
      legacy styles you kept, and the{" "}
      <a href="/tools/css-clamp-generator">CSS clamp generator</a>
      {" "}for fluid values Tailwind doesn&rsquo;t cover out of the
      box.
    </p>
  </>
);
