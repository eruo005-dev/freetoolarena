import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A 4MB hero image on your landing page is the fastest way to lose mobile visitors.
      Google&rsquo;s own data shows bounce rate climbing sharply once page weight crosses
      2MB on 3G &mdash; and an unoptimized iPhone photo alone often weighs more than
      that. The fix is image compression, which sounds simple but hides real tradeoffs:
      lossy versus lossless, JPEG quality sliders, WebP adoption, PNG optimization, EXIF
      stripping, and the difference between &ldquo;looks fine&rdquo; and &ldquo;ships
      fast.&rdquo; This guide covers how each compression mode actually works, the
      target file sizes for different page contexts, why mobile and desktop need
      different settings, and the small details that separate professional compression
      from the default export.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Lossy vs lossless</h2>
    <p>
      <strong>Lossy compression</strong> discards information the human eye is unlikely
      to notice &mdash; subtle color gradations, high-frequency details, imperceptible
      hues &mdash; to achieve dramatic size reductions. JPEG, WebP (lossy mode), and
      AVIF are lossy. A typical 12MP photo drops from ~10MB raw to 1&ndash;3MB at high
      quality, 200&ndash;500KB at mid quality.
    </p>
    <p>
      <strong>Lossless compression</strong> keeps every pixel intact; it just encodes
      them more efficiently. PNG, WebP (lossless mode), TIFF, and FLIF are lossless.
      Size reductions are smaller &mdash; typically 10&ndash;40% &mdash; but the output
      is pixel-identical to the input. Use lossless for screenshots, diagrams, and
      anything with text, hard edges, or transparency.
    </p>

    <h2>JPEG quality: what the slider actually does</h2>
    <p>
      JPEG quality is a number from 0 to 100 that controls how aggressively the DCT
      coefficients get quantized. It&rsquo;s not a linear scale. The sweet spot for web
      photos is 75&ndash;85. Below 60 you start seeing visible block artifacts in flat
      areas like sky gradients. Above 90 you&rsquo;re adding file size with almost no
      perceptible quality gain.
    </p>
    <pre>{`Quality  Typical 1920x1080 photo size
100      1.8 MB    (wasteful)
95       900 KB
85       430 KB    (recommended for photos)
75       280 KB    (web default)
60       170 KB
50       140 KB    (visible artifacts)
30       90 KB     (clearly degraded)`}</pre>
    <p>
      Save once from the source at quality 85. Never re-save a JPEG at high quality
      expecting to recover detail &mdash; once it&rsquo;s gone, it&rsquo;s gone, and
      each re-encode introduces additional loss (&ldquo;generation loss&rdquo;).
    </p>

    <h2>WebP: the modern default</h2>
    <p>
      WebP beats JPEG at the same visual quality by roughly 25&ndash;35% file size, and
      adds transparency support. It&rsquo;s been supported by all major browsers since
      2020, so there&rsquo;s no practical reason not to ship it. A 430KB JPEG at quality
      85 is typically a 290KB WebP at the same visual fidelity.
    </p>
    <p>
      The usual pattern: serve WebP with a JPEG fallback using{" "}
      <code>&lt;picture&gt;</code>, or let a CDN handle content negotiation via the{" "}
      <code>Accept</code> header. AVIF is even smaller (~50% of JPEG) but has slower
      encoding and lower tooling support &mdash; use it for your largest images only.
    </p>

    <h2>PNG optimization</h2>
    <p>
      PNG is lossless, which means &ldquo;compression&rdquo; means finding a better
      encoding, not discarding data. Key knobs: <strong>color palette reduction</strong>{" "}
      (PNG-24 truecolor to PNG-8 palette can cut size by 70% if the image has fewer than
      256 distinct colors &mdash; icons and diagrams often do),{" "}
      <strong>filter and compression level</strong> (zlib levels 0&ndash;9; 9 is
      slowest and smallest), and <strong>chunk stripping</strong> (removing metadata
      chunks like <code>tEXt</code> and <code>iTXt</code>).
    </p>
    <p>
      Tools like pngquant and oxipng can reduce a typical PNG screenshot by 40&ndash;70%
      with no visible change. For photographic content, always prefer JPEG or WebP over
      PNG &mdash; PNG-on-photos is 5&ndash;10x the file size of JPEG for the same
      perceived quality.
    </p>

    <h2>Target sizes by context</h2>
    <pre>{`Context             Target size       Format
Hero image          150-400 KB        WebP or JPEG q80
Blog inline photo   80-200 KB         WebP or JPEG q80
Thumbnail           15-40 KB          WebP
Product grid        50-120 KB         WebP
Social share (og)   200-400 KB        JPEG q85, 1200x630
Email newsletter    max 100 KB each   JPEG q75
Favicon             < 10 KB total     PNG or ICO
Mobile app icon     40-80 KB          PNG-8`}</pre>
    <p>
      These are photo-realistic targets. Flat illustrations in SVG ship at 2&ndash;10KB
      and should almost always be used over raster for logos, icons, and diagrams.
    </p>

    <h2>Resolution before compression</h2>
    <p>
      Compressing a 6000&times;4000 image to 200KB damages it more than resizing first to
      1920&times;1280 and compressing. The compressor has fewer pixels to work with, so
      the per-pixel bitrate is higher. Always resize to the display dimension (or 2x for
      Retina) before compressing. A 400px-wide card thumbnail doesn&rsquo;t need a
      4000px source.
    </p>

    <h2>Mobile vs desktop</h2>
    <p>
      A desktop visitor on fiber can absorb a 500KB hero image without noticing. A
      mobile visitor on a rural 4G tower feels every extra 100KB. Use responsive images
      with <code>srcset</code> to serve smaller files to smaller screens:
    </p>
    <pre>{`<img
  src="hero-1280.webp"
  srcset="hero-640.webp 640w,
          hero-960.webp 960w,
          hero-1280.webp 1280w,
          hero-1920.webp 1920w"
  sizes="(max-width: 768px) 100vw, 1280px"
  alt="..."
  loading="lazy">`}</pre>
    <p>
      This serves a 60KB 640-wide file to phones and a 350KB 1920-wide file to desktops
      from the same markup. The <code>loading=&quot;lazy&quot;</code> attribute defers
      offscreen images until scroll.
    </p>

    <h2>EXIF stripping</h2>
    <p>
      Photos from phones and cameras carry EXIF metadata: GPS coordinates, camera
      model, lens, exposure settings, sometimes the photographer&rsquo;s name. This
      adds 5&ndash;50KB per image and, more importantly, can leak location data you
      didn&rsquo;t intend to publish &mdash; a photo of your kid&rsquo;s birthday
      party can geotag your home address. Strip EXIF on any image going to the
      public web unless you have a specific reason to keep it (photojournalism,
      stock photography attribution).
    </p>

    <h2>Progressive JPEG</h2>
    <p>
      A progressive JPEG loads in layered passes &mdash; blurry preview, then sharper,
      then final &mdash; instead of top-to-bottom. On slow connections the user sees
      something meaningful fast. File size is nearly identical to baseline JPEG (often
      slightly smaller). Most encoders have a &ldquo;progressive&rdquo; or
      &ldquo;interlaced&rdquo; checkbox; turn it on.
    </p>

    <h2>Batch compression</h2>
    <p>
      For an existing site with hundreds of uncompressed images, run a one-time batch
      pass with tools like <code>sharp</code>, <code>imagemin</code>, or{" "}
      <code>squoosh-cli</code>. A reasonable pipeline: resize to max 1920 wide, convert
      to WebP at quality 80, write both WebP and a JPEG fallback, strip EXIF. For a
      marketing site, you&rsquo;ll typically cut total image weight by 60&ndash;80%.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Saving the same JPEG multiple times.</strong> Each re-encode loses quality.
      Keep a lossless master (PNG or original) and re-export JPEG from that every time.
    </p>
    <p>
      <strong>Using PNG for photographs.</strong> PNG is 5&ndash;10x larger than JPEG
      for photos at no perceived quality benefit. Use PNG only for screenshots,
      diagrams, transparency, or images with sharp text.
    </p>
    <p>
      <strong>Compressing a 6000px source to 200KB.</strong> Resize first. The
      per-pixel quality is far higher when you compress a 1920px image to 200KB than
      when you squeeze 24 million pixels into the same budget.
    </p>
    <p>
      <strong>Forgetting to set quality explicitly.</strong> Default JPEG quality varies
      wildly across tools &mdash; 75 in some, 95 in others. Set it.
    </p>
    <p>
      <strong>Leaving EXIF metadata on public photos.</strong> GPS coordinates, device
      model, and timestamps go out with every upload unless you strip them.
    </p>
    <p>
      <strong>Shipping one size for all screens.</strong> A 1920px hero image is
      overkill on a 375px phone and wastes bandwidth. Use <code>srcset</code>.
    </p>
    <p>
      <strong>Skipping WebP because of &ldquo;browser support.&rdquo;</strong> WebP has
      99%+ global support as of 2024. It&rsquo;s safe to ship.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Compress photos without a desktop app using the{" "}
      <a href="/tools/image-compressor">image compressor</a>. Pair with the{" "}
      <a href="/tools/image-resizer">image resizer</a> to scale dimensions before
      compression for dramatic size gains, and the{" "}
      <a href="/tools/exif-remover">EXIF remover</a> to strip location and device
      metadata before publishing.
    </p>
  </>
);
