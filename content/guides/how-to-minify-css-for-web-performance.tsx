import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      CSS minification is a low-effort, high-visibility performance
      win: strip comments, whitespace, and redundant syntax, and
      you&rsquo;re 15-30% smaller before gzip even runs. After gzip
      (universal in 2026) the incremental gain is smaller, but the
      real value is earlier first paint — every millisecond of the
      critical CSS path counts. This guide covers what minification
      actually does, the difference between minification and
      compression, when to reach for more aggressive optimizations
      (purging, critical CSS, inlining), and the build pipelines
      that get you there without thinking about it.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What minification actually does</h2>
    <p>
      CSS minifiers apply a set of safe text transformations:
    </p>
    <p>
      <strong>Remove whitespace:</strong> tabs, extra spaces,
      newlines.
    </p>
    <p>
      <strong>Remove comments:</strong> /* ... */ blocks.
    </p>
    <p>
      <strong>Shorten hex colors:</strong> #ffffff → #fff, #ff00aa →
      #f0a.
    </p>
    <p>
      <strong>Remove unnecessary units:</strong> 0px → 0. Zero has
      no units.
    </p>
    <p>
      <strong>Remove quotes where unambiguous:</strong> font-family:
      &ldquo;Arial&rdquo; → font-family: Arial (if no spaces).
    </p>
    <p>
      <strong>Combine rules:</strong> merge duplicate selectors,
      combine redundant declarations.
    </p>
    <p>
      <strong>Shorten longhand properties:</strong> margin-top: 10px;
      margin-right: 10px... → margin: 10px 10px 10px 10px → margin:
      10px.
    </p>
    <p>
      A good minifier shaves 20-40% off raw CSS. The exact number
      depends on how verbose the source was.
    </p>

    <h2>Minification vs. gzip vs. brotli</h2>
    <p>
      These are stacked, not alternatives.
    </p>
    <p>
      <strong>Minification</strong> is a text transformation that
      produces smaller source. Done once at build time.
    </p>
    <p>
      <strong>Gzip</strong> / <strong>Brotli</strong> are
      lossless compression that your server applies per request.
      Gzip gives 70-85% reduction on text; Brotli typically 5-15%
      better than gzip on CSS.
    </p>
    <p>
      <strong>Is minifying before gzip worth it?</strong> Yes, a bit.
      Minification reduces the size of comments, repeated whitespace,
      and unused tokens that gzip already handles well, but also
      exposes more cross-rule similarities gzip can exploit. Net win
      ~3-8% after gzip.
    </p>
    <p>
      The real value of minification is not post-gzip size — it&rsquo;s
      that smaller source means faster parse time, faster transfer
      over non-gzip paths (some CDN edge cases), and one less
      round-trip before styles apply.
    </p>

    <h2>Beyond minification — the higher-impact wins</h2>
    <p>
      Minification is 20-40%. The bigger wins:
    </p>
    <p>
      <strong>Purge unused CSS.</strong> Tailwind JIT, PurgeCSS,
      UnoCSS remove rules your pages don&rsquo;t use. Going from
      200 KB Bootstrap to 15 KB used-only CSS is a 90% cut before
      any minification.
    </p>
    <p>
      <strong>Critical CSS inline.</strong> Extract the styles needed
      to render above-the-fold content and inline them in
      &lt;head&gt;. Defer the rest. Eliminates a render-blocking
      request; improves LCP by 200-800ms typical.
    </p>
    <p>
      <strong>HTTP/2 server push &mdash; avoid.</strong> It was
      popular 2016-2019 but has been removed from Chrome and is
      deprecated. Use resource hints (preload, preconnect) instead.
    </p>
    <p>
      <strong>Lazy-load non-critical stylesheets:</strong>
      <code> &lt;link rel=&ldquo;stylesheet&rdquo; href=&ldquo;non-
      critical.css&rdquo; media=&ldquo;print&rdquo; onload=&ldquo;
      this.media=&lsquo;all&rsquo;&rdquo;&gt;</code>. Doesn&rsquo;t
      block initial paint.
    </p>
    <p>
      <strong>Eliminate render-blocking fonts.</strong>
      <code>font-display: swap</code> shows fallback until the
      webfont loads. Prevents invisible text during font-download.
    </p>

    <h2>Build pipeline — set it up once</h2>
    <p>
      Doing minification manually is wasted effort. Bake into build.
    </p>
    <p>
      <strong>Next.js, Vite, Astro, Nuxt</strong> all minify CSS in
      production builds by default. No config needed.
    </p>
    <p>
      <strong>PostCSS + cssnano</strong> for custom pipelines. <code>npm
      install -D cssnano</code> → add to postcss.config.js. Produces
      near-optimal CSS with sensible defaults.
    </p>
    <p>
      <strong>esbuild</strong> minifies CSS along with JS at very high
      speed. Good for monorepos and large codebases.
    </p>
    <p>
      <strong>LightningCSS</strong> (Rust-based, drop-in cssnano
      replacement): 30-100× faster, handles modern CSS features.
      Default in newer Parcel and Next.js setups.
    </p>

    <h2>CDN and caching — multiplier effects</h2>
    <p>
      A tiny CSS file cached at the CDN edge is instant delivery for
      every subsequent user.
    </p>
    <p>
      <strong>Content hash in filename:</strong> styles.a7f3b2.css.
      Lets you set max-age=31536000 (one year) because the URL
      changes when content changes. Infinite caching, zero staleness.
    </p>
    <p>
      <strong>HTTP/2 multiplexing:</strong> separate CSS file loads
      in parallel with HTML/JS. Helps for multiple stylesheets (but
      one big minified file usually beats many small ones; parse
      overhead dominates below 5-10 KB per file).
    </p>

    <h2>Measuring — where to look</h2>
    <p>
      <strong>Lighthouse:</strong> specific audits for &ldquo;Eliminate
      render-blocking resources&rdquo;, &ldquo;Minify CSS&rdquo;, and
      &ldquo;Remove unused CSS&rdquo;. Run on every deploy.
    </p>
    <p>
      <strong>WebPageTest:</strong> waterfall view shows exactly
      when CSS blocks rendering and for how long.
    </p>
    <p>
      <strong>Chrome DevTools Coverage tab:</strong> loads a page and
      tells you what percent of each CSS file was actually used. A
      Bootstrap site often shows 5-15% coverage — the rest is
      purge-target.
    </p>
    <p>
      <strong>Core Web Vitals in Search Console:</strong> LCP
      improvements from CSS optimization show up here as
      &ldquo;Good&rdquo; page counts rise.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Manually maintaining minified CSS.</strong> Always
      check in the source; build tooling minifies. Never edit the
      minified file.
    </p>
    <p>
      <strong>Minifying in dev.</strong> Painful to debug. Use
      source-maps; ship un-mapped minified CSS only in prod.
    </p>
    <p>
      <strong>Skipping PurgeCSS because &ldquo;it&rsquo;ll break
      dynamic classes&rdquo;.</strong> Use safelist config for
      dynamically-generated class names. Still purge everything else.
    </p>
    <p>
      <strong>Inlining too much critical CSS.</strong> Inline budget
      is 14 KB (one TCP roundtrip). More than that starts delaying
      the HTML, not speeding it.
    </p>
    <p>
      <strong>Multiple small stylesheets for architectural
      cleanness.</strong> Each request has overhead. Bundle, then
      minify, then serve. One CSS file per page is fine; one per
      component is usually too granular for production.
    </p>

    <h2>What NOT to minify</h2>
    <p>
      <strong>Source files in your repo.</strong> Always minify at
      build, not in source.
    </p>
    <p>
      <strong>Markdown / MDX content.</strong> Content isn&rsquo;t
      code; keep readable.
    </p>
    <p>
      <strong>Library CSS during dev.</strong> Keeps stack traces
      debuggable. Minify only on production build.
    </p>
    <p>
      <strong>When behind on perf budget already.</strong> Minifying
      a 200 KB CSS bundle to 150 KB is lipstick on a pig. Purge
      first, minify second.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste CSS and see instant minified output with the{" "}
      <a href="/tools/css-minifier">CSS minifier</a>. Pair with the{" "}
      <a href="/tools/js-minifier">JS minifier</a> to compress
      JavaScript the same way, and the{" "}
      <a href="/tools/html-formatter">HTML formatter</a> when cleaning
      up markup in the other direction.
    </p>
  </>
);
