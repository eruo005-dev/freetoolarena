import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      The favicon is the 16×16 pixel window your site gets in a
      browser tab, a bookmark bar, a search result, a push notification,
      and an app icon. It&rsquo;s one of the smallest design problems
      in a product — and one of the most visible. A good favicon is
      recognizable at 16 pixels and scales cleanly to 512. A bad one
      is a blurry shrunken logo that no one can identify. This guide
      covers what sizes you actually need in 2026, the design
      principles that survive pixel-level rendering, what file formats
      to ship, and the HTML tags that keep every platform happy.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Why the favicon matters more than it looks like it does</h2>
    <p>
      Users scan browser tabs by shape and color before text. A
      recognizable favicon drops the tab-identification time from
      ~1.5s (reading a tab title) to ~0.2s (pattern match). For
      multi-tab users, that compounds to minutes a day.
    </p>
    <p>
      It also shows up in: bookmark bars, history, search-engine
      results (Google shows favicons in mobile results), push
      notifications, PWA icons, iOS/Android home-screen add-to-home.
      You&rsquo;re designing for all those contexts with one image
      set.
    </p>

    <h2>The sizes you actually need</h2>
    <p>
      In 2026, a complete favicon set covers:
    </p>
    <p>
      <strong>16×16 PNG</strong> — browser tab (classic).
    </p>
    <p>
      <strong>32×32 PNG</strong> — retina browser tab, Windows
      taskbar.
    </p>
    <p>
      <strong>48×48 PNG</strong> — Windows taskbar high-DPI, ARIA.
    </p>
    <p>
      <strong>180×180 PNG</strong> (apple-touch-icon) — iOS
      add-to-home-screen, Safari pinned tab.
    </p>
    <p>
      <strong>192×192 PNG</strong> — Android home screen, PWA.
    </p>
    <p>
      <strong>512×512 PNG</strong> — PWA splash screen, Android
      adaptive icons.
    </p>
    <p>
      <strong>favicon.ico</strong> (multi-size ICO) — legacy
      browsers, desktop shortcuts. Bundle 16 + 32 + 48 inside.
    </p>
    <p>
      <strong>SVG</strong> — vector-based tab icon for browsers that
      support it (Firefox, Safari, Chrome, Edge). Scales infinitely.
    </p>
    <p>
      You don&rsquo;t need the old 30+ Apple/Windows tile icons anymore;
      modern platforms derive them from the above. Favicon.io and our
      favicon generator produce the full set from one source image.
    </p>

    <h2>Design principles — what works at 16 pixels</h2>
    <p>
      <strong>Simplicity is mandatory.</strong> A 16×16 image has 256
      pixels total. Detailed logos become mud. Pick one strong
      element — a letter, a geometric shape, a simplified monogram.
    </p>
    <p>
      <strong>High contrast.</strong> Favicons render on light and
      dark browser chrome. Test on both. A white logo on white
      background is invisible in a light-mode tab.
    </p>
    <p>
      <strong>Strong silhouette.</strong> Squint at the favicon. If
      you can&rsquo;t tell what shape it is, it won&rsquo;t read on
      a tab either.
    </p>
    <p>
      <strong>Avoid thin lines.</strong> At 16×16, a 1-pixel stroke
      is either there or gone — no smooth scaling. Use bold, thick
      strokes that survive rasterization.
    </p>
    <p>
      <strong>Use your brand color, not just your logo.</strong> A
      colored square with a single letter often works better than a
      shrunken logo.
    </p>
    <p>
      <strong>Fill the canvas.</strong> Unlike app icons (which have
      safe-area padding), favicons should fill close to the edges.
      Whitespace wastes pixels at 16×16.
    </p>

    <h2>Color strategies that work</h2>
    <p>
      <strong>Single letter on colored background:</strong> Gmail,
      Notion, Linear, Vercel. Simple, recognizable, distinctive at
      any size.
    </p>
    <p>
      <strong>Geometric mark:</strong> Stripe&rsquo;s /, Slack&rsquo;s
      hashtag, GitHub&rsquo;s octocat. Shape-first recognition.
    </p>
    <p>
      <strong>Color + symbol:</strong> YouTube&rsquo;s red play
      triangle. The color does the heavy lifting; the symbol confirms.
    </p>
    <p>
      <strong>Avoid photorealistic details.</strong> Drop shadows,
      gradients with subtle variations, embossed text — all lost at
      small sizes.
    </p>

    <h2>Dark mode considerations</h2>
    <p>
      Browser tabs have light-mode and dark-mode chrome. A favicon
      with a transparent background that&rsquo;s dark-colored
      disappears on dark chrome; a light-colored one disappears on
      light chrome.
    </p>
    <p>
      <strong>Option 1:</strong> use a solid background that works on
      both. Most brand colors do.
    </p>
    <p>
      <strong>Option 2:</strong> media-query SVG favicon that
      responds to user color scheme. Requires modern-browser SVG
      favicons:
    </p>
    <p>
      <code>@media (prefers-color-scheme: dark) {`{ path { fill: white; } }`}</code>
    </p>
    <p>
      embedded in the SVG itself. Browsers that support it will honor
      it; others fall back to the default SVG rendering.
    </p>

    <h2>The HTML tags — what to include</h2>
    <p>
      In your &lt;head&gt;:
    </p>
    <p>
      <strong>&lt;link rel=&ldquo;icon&rdquo; type=&ldquo;image/
      x-icon&rdquo; href=&ldquo;/favicon.ico&rdquo;&gt;</strong> — the
      legacy fallback.
    </p>
    <p>
      <strong>&lt;link rel=&ldquo;icon&rdquo; type=&ldquo;image/
      png&rdquo; sizes=&ldquo;32×32&rdquo; href=&ldquo;/favicon-32x32.png&rdquo;&gt;</strong>
      — modern browsers, high-DPI displays.
    </p>
    <p>
      <strong>&lt;link rel=&ldquo;apple-touch-icon&rdquo; sizes=&ldquo;180×180&rdquo;
      href=&ldquo;/apple-touch-icon.png&rdquo;&gt;</strong> — iOS
      add-to-home.
    </p>
    <p>
      <strong>&lt;link rel=&ldquo;manifest&rdquo; href=&ldquo;/site.webmanifest&rdquo;&gt;</strong>
      — PWA metadata with 192/512 icons referenced inside.
    </p>
    <p>
      <strong>&lt;meta name=&ldquo;theme-color&rdquo; content=&ldquo;#1e293b&rdquo;&gt;</strong>
      — Android browser chrome color, PWA splash.
    </p>

    <h2>The site.webmanifest file</h2>
    <p>
      A JSON file that tells PWAs and Android Chrome how to render
      your site as an installable app:
    </p>
    <p>
      <code>
        {`{ "name": "Free Tool Arena", "short_name": "FTA", "icons": [ { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" }, { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" } ], "theme_color": "#0f172a", "background_color": "#ffffff", "display": "standalone" }`}
      </code>
    </p>
    <p>
      Keep short_name under 12 characters — it&rsquo;s what shows on
      the Android home screen grid.
    </p>

    <h2>Testing — where favicons fail silently</h2>
    <p>
      <strong>Browser tabs.</strong> Open the site in Chrome, Safari,
      Firefox — both light and dark mode chrome.
    </p>
    <p>
      <strong>Bookmark bar.</strong> Drag a bookmark. Does it read
      without text?
    </p>
    <p>
      <strong>Google search results.</strong> Mobile Google shows
      favicons next to results. Test at various zoom levels.
    </p>
    <p>
      <strong>iOS add-to-home.</strong> Safari &rarr; Share &rarr;
      Add to Home Screen. Is the icon sharp? Correctly padded?
      Rounded automatically by iOS.
    </p>
    <p>
      <strong>Android add-to-home.</strong> Chrome &rarr; Install
      App. Adaptive icons require a safe-area-aware 512×512.
    </p>
    <p>
      <strong>Real devices, not just simulators.</strong> Scaling
      algorithms differ.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Shrinking a detailed logo.</strong> Detailed logos
      turn to mush at 16×16. Create a simplified mark specifically
      for small sizes.
    </p>
    <p>
      <strong>Transparent background on light chrome.</strong>
      Designed for dark mode, invisible on light browser tab.
    </p>
    <p>
      <strong>Missing apple-touch-icon.</strong> iOS falls back to a
      screenshot of the site, which usually looks bad.
    </p>
    <p>
      <strong>Only shipping .ico.</strong> Legacy. Modern browsers
      prefer PNGs at specific sizes. ICO remains a fallback, not the
      main asset.
    </p>
    <p>
      <strong>Not versioning updates.</strong> Browsers aggressively
      cache favicons. Updating the file without cache-busting means
      users see the old icon for weeks. Add ?v=2 to the href when
      changing.
    </p>
    <p>
      <strong>Ignoring the manifest.</strong> PWA install and Android
      home-screen depend on it. Missing manifest = missing install
      prompt.
    </p>

    <h2>When to hire a designer</h2>
    <p>
      For brand-defining marks, work with a designer or use established
      typography/iconography. For quick MVP or internal tools, a
      single-letter monogram on a brand-colored square with a good
      font is perfectly professional. &ldquo;Just ship&rdquo; beats
      &ldquo;custom illustration in 3 weeks&rdquo; for most products.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate a full favicon set (16, 32, 180, 192, 512 + ICO) from
      one source image with the{" "}
      <a href="/tools/favicon-generator">favicon generator</a>. Pair
      with the{" "}
      <a href="/tools/image-resizer">image resizer</a> to preview
      how your mark survives downsizing, and the{" "}
      <a href="/tools/image-format-converter">image format converter</a>
      {" "}when converting SVG to PNG masters.
    </p>
  </>
);
