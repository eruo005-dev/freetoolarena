import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Resizing images for the web is the single highest-leverage performance tweak most sites never finish. A 4000&nbsp;&times;&nbsp;3000 phone photo served into a 600&nbsp;px card wastes bandwidth, burns mobile data, and tanks your Largest Contentful Paint score. The fix is to ship pixels close to the size the browser actually paints, usually with a 2x buffer for retina displays. Getting this right means choosing real pixel dimensions, understanding device pixel ratio, and knowing when downscaling is enough versus when you need to crop. This guide walks through each decision and the trade-offs between quality and file size.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Start from the painted size, not the source</h2>
    <p>
      Open the page in a browser, inspect the image, and note its rendered CSS width in pixels. That number &mdash; not the source file&rsquo;s intrinsic size &mdash; is the anchor for every resize decision. A hero image painted at 1200&nbsp;px wide should not ship a 4800&nbsp;px source, and a 96&nbsp;px avatar has no business being a 1080p portrait.
    </p>
    <p>
      Once you know the painted size, you pick a target. For non-retina, target equals painted size. For retina support, double it. For sites with 3x devices (high-end phones), triple it only for images where razor-sharp detail matters.
    </p>

    <h2>Pixel dimensions versus file size</h2>
    <p>
      Pixel dimensions (width and height) control sharpness. File size (KB) controls how fast the image downloads. They correlate but they are not the same knob. Halving the dimensions of a photo roughly quarters the file size because pixels are a 2D grid. Halving the quality slider (JPEG 90 &rarr; 45) also shrinks bytes but leaves dimensions untouched, trading clarity for speed.
    </p>
    <p>
      Resize first, compress second. Resizing throws away data you didn&rsquo;t need; compression throws away data you maybe did.
    </p>

    <h2>Device pixel ratio and the 2x rule</h2>
    <p>
      A CSS pixel and a device pixel are not the same. A modern phone with a device pixel ratio (DPR) of 2 or 3 paints multiple hardware pixels for every CSS pixel. If your image element is <code>width: 400px</code> in CSS and the user has DPR&nbsp;2, the browser can show up to 800 hardware pixels of detail. Ship a 400&nbsp;px source and it will look soft; ship 800&nbsp;px and it looks crisp.
    </p>
    <p>
      The pragmatic rule: always export at 2x painted size, and only bother with 3x for critical hero imagery where customers will zoom in.
    </p>

    <h2>Responsive sizing with srcset</h2>
    <p>
      Rather than choosing one size, the <code>srcset</code> attribute lets you offer a menu and let the browser pick. A typical product image might ship at 400&nbsp;px, 800&nbsp;px, and 1200&nbsp;px widths.
    </p>
    <pre>{`<img
  src="/img/product-800.jpg"
  srcset="/img/product-400.jpg 400w,
          /img/product-800.jpg 800w,
          /img/product-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 600px"
  alt="Red leather wallet, front view"
/>`}</pre>
    <p>
      The <code>sizes</code> attribute tells the browser how big the image will render, so it can pick the right source before the CSS has even loaded.
    </p>

    <h2>Downscale versus crop</h2>
    <p>
      Downscaling preserves the whole frame at a smaller size; cropping throws away edges to reshape or tighten the composition. Use downscaling when the aspect ratio is already right and you just need fewer pixels. Use cropping when the subject is lost in dead space or when a layout demands a specific ratio &mdash; think square tiles, 16:9 hero banners, or 4:5 Instagram feed posts.
    </p>
    <p>
      Mixing them is common: crop to the right ratio first, then downscale to the target width. Doing downscale first wastes CPU resizing pixels you&rsquo;ll throw away.
    </p>

    <h2>Aspect ratio locks</h2>
    <p>
      Most resize tools default to &ldquo;constrain proportions&rdquo; &mdash; change one dimension and the other follows. Disable this only when you deliberately want to stretch (almost never) or when you&rsquo;re padding a canvas to a fixed ratio. A face stretched by 8% from an accidental unlock is uncanny and obvious.
    </p>
    <p>
      If you need a fixed output ratio from a mismatched source, the correct flow is: set the canvas, position the image inside it, fill the remaining space with a solid background or blurred extension.
    </p>

    <h2>Quality versus size trade-offs</h2>
    <p>
      JPEG quality settings are non-linear. The drop from 100 to 90 is imperceptible and saves 40&ndash;60% of the bytes. The drop from 90 to 75 saves another 30% with barely any visible cost on photos. Below 60 you start seeing blocking and color banding, especially on skies and gradients.
    </p>
    <ul>
      <li><strong>Hero photography:</strong> JPEG 80&ndash;85 or WebP 80.</li>
      <li><strong>Thumbnails and list tiles:</strong> JPEG 70&ndash;75 or WebP 70.</li>
      <li><strong>UI screenshots and diagrams:</strong> PNG or WebP lossless.</li>
      <li><strong>Logos and flat illustrations:</strong> SVG if you have the source, else PNG.</li>
    </ul>

    <h2>Format matters more than settings</h2>
    <p>
      The biggest quality-per-byte win is usually picking the right format. WebP is 25&ndash;35% smaller than JPEG at equivalent quality. AVIF is another 20&ndash;30% smaller than WebP but encodes slowly. For photographs on modern browsers, ship WebP with a JPEG fallback; for graphics with few colors, stay with PNG or switch to SVG.
    </p>
    <p>
      Don&rsquo;t convert PNG to JPEG for transparent logos &mdash; you&rsquo;ll get a white box around them. Don&rsquo;t convert JPEG to PNG to &ldquo;upgrade quality&rdquo; either; you can&rsquo;t un-bake the JPEG artifacts and the PNG will be huge.
    </p>

    <h2>Common screen and export presets</h2>
    <p>
      Useful starting sizes to keep in your head:
    </p>
    <ul>
      <li><strong>Blog hero:</strong> 1200&nbsp;&times;&nbsp;630 (also the Open Graph preview default).</li>
      <li><strong>Product grid tile:</strong> 600&nbsp;&times;&nbsp;600 at 2x source.</li>
      <li><strong>Avatar:</strong> 80&ndash;160&nbsp;px painted, so 160&ndash;320&nbsp;px source.</li>
      <li><strong>Inline article image:</strong> 720&nbsp;px painted, 1440&nbsp;px source.</li>
      <li><strong>Full-bleed hero on desktop:</strong> 1920&nbsp;&times;&nbsp;1080 or 2560&nbsp;&times;&nbsp;1440 for 4K support.</li>
    </ul>

    <h2>Batch resizing workflow</h2>
    <p>
      For product catalogs and article batches, set a maximum width and let the tool downscale anything larger while leaving smaller files alone. A typical rule is &ldquo;no image wider than 1600&nbsp;px, JPEG 82.&rdquo; Run it over the whole folder and you&rsquo;ll cut 60&ndash;80% of the bytes from an untouched photo library without touching the good, smaller assets.
    </p>
    <p>
      Always keep the originals. Resized copies are derivative; if you lose them, you can always regenerate from the masters.
    </p>

    <h2>The picture element for art direction</h2>
    <p>
      When srcset isn&rsquo;t enough because you want a fundamentally different crop at different breakpoints (wide hero on desktop, tight portrait on mobile), use the <code>&lt;picture&gt;</code> element:
    </p>
    <pre>{`<picture>
  <source media="(max-width: 600px)"
          srcset="/img/hero-portrait.jpg">
  <source media="(min-width: 601px)"
          srcset="/img/hero-landscape.jpg">
  <img src="/img/hero-landscape.jpg"
       alt="Team at the summit">
</picture>`}</pre>
    <p>
      The <code>&lt;picture&gt;</code> element lets you serve genuinely different images per breakpoint, not just the same image at different sizes.
    </p>

    <h2>Lazy loading the right way</h2>
    <p>
      The <code>loading=&quot;lazy&quot;</code> attribute defers offscreen images until they&rsquo;re about to scroll into view. This is almost always a good idea &mdash; except for the hero image above the fold, which should load eagerly to hit your LCP target.
    </p>
    <pre>{`<!-- Above the fold -->
<img src="/hero.jpg" fetchpriority="high" alt="...">

<!-- Below the fold -->
<img src="/below-fold.jpg" loading="lazy" alt="...">`}</pre>
    <p>
      The <code>fetchpriority=&quot;high&quot;</code> hint on the LCP image is the newest tool; modern browsers use it to prioritize that download over other page assets.
    </p>

    <h2>Resampling algorithms and why they matter</h2>
    <p>
      When a tool shrinks an image, it has to compute what each output pixel should be from a region of source pixels. Different algorithms give different results:
    </p>
    <ul>
      <li><strong>Nearest-neighbor:</strong> picks the closest source pixel. Fast, but produces jagged, pixelated output. Avoid except for pixel art.</li>
      <li><strong>Bilinear:</strong> averages the four nearest pixels. Fast, decent for small downscales, slightly blurry on big ones.</li>
      <li><strong>Bicubic:</strong> samples a 4&nbsp;&times;&nbsp;4 neighborhood with a smoother curve. The default in most editors; good balance of speed and quality.</li>
      <li><strong>Lanczos:</strong> uses a sinc-based filter over an 8&nbsp;&times;&nbsp;8 window. The best-looking for significant downscales but slower and can ring slightly.</li>
    </ul>
    <p>
      For web workflows, bicubic or Lanczos is the right default. Cheap tools sometimes default to bilinear or worse; if your downscales look soft or jagged, check which algorithm is in play.
    </p>

    <h2>Upscaling: the honest answer</h2>
    <p>
      You cannot add detail that isn&rsquo;t there. Classical upscalers (bicubic, Lanczos) just stretch existing pixels into a bigger grid, producing a blurry result. AI upscalers (ESRGAN, Topaz, Nvidia&rsquo;s tools) hallucinate plausible detail based on training data, which can look impressive but also invents specifics that weren&rsquo;t in the source.
    </p>
    <p>
      The rule: always start from the highest-resolution source you have. Never upscale a web JPEG for print. If you absolutely must, AI upscaling at 2&times; is acceptable for non-critical uses; 4&times; starts showing obvious hallucination artifacts.
    </p>

    <h2>CDN-side resizing</h2>
    <p>
      Rather than generating every size variant at build time, modern CDNs (Cloudflare Images, Imgix, Cloudinary, Vercel Image Optimization) resize on the fly from a single high-res source. You upload one master, the CDN serves the right size for each request.
    </p>
    <p>
      The tradeoff: first request is slow because the CDN computes the variant, subsequent requests are cached. Costs scale with unique variants served. For content sites, this is often cheaper and simpler than maintaining a pre-generated size ladder.
    </p>

    <h2>Common mistakes</h2>
    <p>
      The mistake every site makes at least once: uploading a 20&nbsp;MB camera RAW export straight into the CMS because &ldquo;the browser will just shrink it.&rdquo; The browser does shrink it, after downloading every byte over cellular. Other classics: unlocking aspect ratio and stretching faces, resizing a JPEG up (you can&rsquo;t invent pixels, you only invent blur), and saving as PNG to &ldquo;keep quality&rdquo; for photographs &mdash; PNG is lossless but 4&ndash;8&times; larger than JPEG for photos. Also watch for tools that resample at low quality; a fast nearest-neighbor downscale produces jagged edges where bicubic or Lanczos would be smooth.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Drop a file into our <a href="/tools/image-resizer">image resizer</a> to set exact pixel dimensions, preview the output, and export in one click. For the compression step afterwards, the <a href="/tools/image-compressor">image compressor</a> handles quality trade-offs without touching dimensions. And when you need to change the composition rather than just the size, the <a href="/tools/image-cropper">image cropper</a> lets you lock a ratio and frame the subject.
    </p>
  </>
);
