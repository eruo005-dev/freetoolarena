import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Minifying JavaScript shrinks bundle size, speeds up page loads,
      and reduces the bytes users download on slow connections. Done
      right, it&rsquo;s invisible — same behavior, fewer kilobytes.
      Done wrong, it breaks your app in production. This guide covers
      what minification actually does (whitespace removal, variable
      renaming, dead code elimination), the difference between
      minification and compression, when to use Terser vs esbuild vs
      SWC, source maps for debugging minified code, the gotchas that
      break minified bundles, and how modern bundlers handle all of
      this automatically.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What minification actually does</h2>
    <p>
      A minifier reads your JavaScript source and outputs semantically
      equivalent but smaller code. The transformations include:
    </p>
    <p>
      <strong>Whitespace removal:</strong> strip unnecessary spaces,
      tabs, and newlines. Typically saves 10-20%.
    </p>
    <p>
      <strong>Variable renaming (mangling):</strong> rename{" "}
      <code>totalUserCount</code> to <code>a</code>. Works only on
      local scope variables, not exports or properties. Saves 30-50%
      on identifier-heavy code.
    </p>
    <p>
      <strong>Dead code elimination:</strong> remove unreachable
      branches, unused imports, and dev-only code gated by{" "}
      <code>process.env.NODE_ENV !== &apos;production&apos;</code>.
    </p>
    <p>
      <strong>Constant folding:</strong>{" "}
      <code>2 + 3</code> becomes <code>5</code>.{" "}
      <code>&quot;foo&quot; + &quot;bar&quot;</code> becomes{" "}
      <code>&quot;foobar&quot;</code>.
    </p>
    <p>
      <strong>Short-form rewrites:</strong>{" "}
      <code>true</code> becomes <code>!0</code>;{" "}
      <code>undefined</code> becomes <code>void 0</code>. Saves
      bytes, hurts readability — but readability doesn&rsquo;t matter
      in production.
    </p>

    <h2>Minification vs compression</h2>
    <p>
      Minification and gzip/brotli are complementary, not redundant.
    </p>
    <p>
      <strong>Minification</strong> removes redundancy visible to the
      JS parser.
    </p>
    <p>
      <strong>Compression</strong> (gzip, brotli) removes redundancy
      visible to a byte-level algorithm.
    </p>
    <p>
      Typical results: 100KB raw JS → 40KB minified → 12KB brotli.
      Both matter. Minification matters more for parse time (engine
      does less work on smaller input); compression matters more for
      transfer time.
    </p>

    <h2>Source maps — debug minified code</h2>
    <p>
      Minified code is unreadable. A <strong>source map</strong> maps
      minified positions back to original source, so browser devtools
      can show you the original file when debugging.
    </p>
    <p>
      <strong>Inline:</strong>{" "}
      <code>//# sourceMappingURL=data:application/json;base64,...</code>{" "}
      embedded in the JS file. Increases file size; keep for dev only.
    </p>
    <p>
      <strong>External:</strong> <code>//# sourceMappingURL=app.js.map</code>
      {" "}as a sibling file. Browser fetches only when devtools is
      open.
    </p>
    <p>
      <strong>Hidden source maps:</strong> generate the map but
      don&rsquo;t reference it in the JS. Upload to Sentry/Datadog/
      Rollbar for error tracking without exposing source publicly.
    </p>
    <p>
      <strong>Don&rsquo;t ship source maps referencing public URLs
      unless you want source visible.</strong> Obvious, but common
      mistake.
    </p>

    <h2>Terser, esbuild, SWC — picking a minifier</h2>
    <p>
      <strong>Terser:</strong> the default for most bundlers. Written
      in JS, slow but produces the smallest output. Forked from
      UglifyJS, handles modern ES syntax.
    </p>
    <p>
      <strong>esbuild:</strong> written in Go. 10-100x faster than
      Terser. Output is slightly larger (a few percent). Tradeoff is
      usually worth it for dev iteration speed.
    </p>
    <p>
      <strong>SWC:</strong> Rust-based minifier used by Next.js and
      others. Fast like esbuild, output comparable to Terser. Now
      the default in most modern toolchains.
    </p>
    <p>
      <strong>Rule:</strong> use whatever your bundler defaults to.
      The differences are small; the effort of switching rarely
      pays off.
    </p>

    <h2>Common breakages from minification</h2>
    <p>
      <strong>String-based property access:</strong>{" "}
      <code>obj[&quot;longName&quot;]</code> vs{" "}
      <code>obj.longName</code>. Minifier mangles the latter to{" "}
      <code>obj.a</code>; leaves the string intact. Your code
      crashes.
    </p>
    <p>
      <strong>Reflection on class/function names:</strong>{" "}
      <code>SomeClass.name</code> might return <code>&quot;a&quot;</code>
      {" "}after mangling. Affects routing/DI systems that rely on
      class names.
    </p>
    <p>
      <strong>Angular-style DI with string params:</strong> older
      Angular code declared deps as strings matching function
      parameter names. Mangle breaks the match. Fixed by using
      array-form annotations or <code>ngAnnotate</code>.
    </p>
    <p>
      <strong>Side-effectful module imports:</strong> tree shaking
      might drop imports that run code on load.{" "}
      <code>sideEffects: false</code> in package.json tells the
      bundler it&rsquo;s safe to remove unused imports.
    </p>
    <p>
      <strong>Dynamic <code>eval</code>:</strong> minified code
      inside <code>eval</code> can break if the evaluated code
      references symbols that got renamed. Avoid <code>eval</code>.
    </p>

    <h2>What minifiers can&rsquo;t help with</h2>
    <p>
      <strong>Duplicated code:</strong> copy-pasted logic across
      files stays as two separate copies after minification (no
      dedup across scopes).
    </p>
    <p>
      <strong>Large dependencies:</strong> importing moment.js costs
      ~70KB minified. Minifier can&rsquo;t shrink third-party code
      you don&rsquo;t own.
    </p>
    <p>
      <strong>Tree shaking limits:</strong> only ESM imports tree
      shake cleanly. CommonJS <code>require()</code> is dynamic;
      bundler can&rsquo;t always prove what&rsquo;s unused.
    </p>

    <h2>Configuring minification</h2>
    <p>
      Most tuning happens through bundler config. Common Terser
      options worth knowing:
    </p>
    <p>
      <strong>drop_console:</strong> remove{" "}
      <code>console.log</code> calls in production.
    </p>
    <p>
      <strong>drop_debugger:</strong> strip <code>debugger</code>
      {" "}statements.
    </p>
    <p>
      <strong>pure_funcs:</strong> mark functions as side-effect-free
      so calls get removed if return value unused.
    </p>
    <p>
      <strong>reserved:</strong> names never to mangle (e.g., DI
      tokens, global API surfaces).
    </p>
    <p>
      <strong>keep_classnames / keep_fnames:</strong> preserve names
      for reflection-based code.
    </p>

    <h2>Bundlers do this for you</h2>
    <p>
      <strong>Webpack:</strong> minifies in production mode by default
      with Terser.
    </p>
    <p>
      <strong>Next.js / Vite / Parcel:</strong> minify production
      builds automatically.
    </p>
    <p>
      <strong>esbuild:</strong>{" "}
      <code>--minify</code> flag or{" "}
      <code>minify: true</code> in config.
    </p>
    <p>
      You rarely need to run a standalone minifier. The exception:
      you&rsquo;re shipping a single file or inline script that
      isn&rsquo;t part of a build pipeline.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Shipping unminified code.</strong> Check your build
      output. If it&rsquo;s readable, it&rsquo;s not minified.
    </p>
    <p>
      <strong>Shipping source maps publicly.</strong> Attackers can
      reverse-engineer your code. Use hidden source maps uploaded
      to an error-tracking service.
    </p>
    <p>
      <strong>Minifying dev builds.</strong> Makes debugging
      painful. Use production mode only for production.
    </p>
    <p>
      <strong>Forgetting to enable compression at the server.</strong>
      Minification without gzip/brotli leaves 70% of savings on the
      table.
    </p>
    <p>
      <strong>Relying on class/function names for behavior.</strong>
      Minifier breaks this silently. Use explicit tokens or disable
      mangling selectively.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Minify JavaScript instantly in your browser with the{" "}
      <a href="/tools/js-minifier">JS minifier</a>. Pair with the{" "}
      <a href="/tools/css-minifier">CSS minifier</a> for stylesheet
      shrinkage, and the{" "}
      <a href="/tools/html-formatter">HTML formatter</a> to clean up
      markup before minifying.
    </p>
  </>
);
