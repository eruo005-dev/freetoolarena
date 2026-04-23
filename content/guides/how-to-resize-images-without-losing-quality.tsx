import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Resizing an image is simple; resizing without visible quality
      loss is surprisingly easy to get wrong. Downscale too
      aggressively and you get blurry results. Upscale naively and
      you get pixelation. Use the wrong algorithm and straight lines
      wobble, faces soften, text becomes unreadable. This guide covers
      the math of resampling, which algorithm to pick for which job,
      how much you can actually upscale before quality breaks, when
      to use AI upscaling, and the file-format choices that interact
      with resize quality.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Resize vs. resample vs. compress</h2>
    <p>
      Three distinct operations often confused for each other:
    </p>
    <p>
      <strong>Resize</strong> changes the pixel dimensions of an image
      — 4000×3000 → 1600×1200. The image contains less data after.
    </p>
    <p>
      <strong>Resample</strong> is the algorithmic step inside a
      resize: how the new pixels are derived from the old. Different
      algorithms (nearest-neighbor, bilinear, bicubic, Lanczos) give
      different visual results.
    </p>
    <p>
      <strong>Compress</strong> keeps the same pixel dimensions but
      reduces file size by encoding pixels more efficiently (JPEG
      quality, WebP quality, AVIF settings).
    </p>
    <p>
      Want smaller file, same dimensions? Compress. Want smaller
      dimensions for a specific layout? Resize. Usually you do both:
      resize to target dimensions, then compress.
    </p>

    <h2>Resampling algorithms — ranked for real use</h2>
    <p>
      <strong>Nearest-neighbor:</strong> picks the nearest source
      pixel. Fast but pixelated. Use only for pixel art or when
      hard edges must be preserved.
    </p>
    <p>
      <strong>Bilinear:</strong> averages 4 neighboring pixels. Smooth
      but slightly blurry. Faster than bicubic. Acceptable for
      thumbnails where quality isn&rsquo;t critical.
    </p>
    <p>
      <strong>Bicubic:</strong> uses 16 neighbors with a cubic
      function. Sharper than bilinear, mild ringing around edges.
      Photoshop&rsquo;s default. Good all-purpose choice.
    </p>
    <p>
      <strong>Lanczos (Lanczos3 or Lanczos5):</strong> uses a sinc-
      based kernel with 6 or 10 neighbors. Sharpest non-AI result;
      preserves fine detail best. Browsers&rsquo; default for large
      downscales. The best choice for photos shrinking to specific
      sizes.
    </p>
    <p>
      <strong>Mitchell-Netravali:</strong> a smoother Lanczos
      alternative; reduces ringing artifacts. Good for large
      downscales where Lanczos feels too sharp.
    </p>
    <p>
      Rule of thumb: Lanczos3 for photos, nearest-neighbor for pixel
      art, bicubic if nothing better is available.
    </p>

    <h2>Downscaling — the safe direction</h2>
    <p>
      Going from larger to smaller (e.g., 4K → 1080p) is lossy but
      forgiving. You&rsquo;re discarding information the resized
      image can&rsquo;t display anyway.
    </p>
    <p>
      <strong>Do one resize, not multiple.</strong> Resize 4000px →
      800px directly, not 4000 → 2000 → 1200 → 800. Each resampling
      pass introduces minor softening.
    </p>
    <p>
      <strong>Apply slight sharpening after aggressive
      downscales.</strong> Dropping from 4000px to 400px softens
      edges; a 30-50% unsharp mask or a mild radius-1 sharpen
      restores snap.
    </p>
    <p>
      <strong>Downscale before JPEG compression, not after.</strong>
      Compressing a large JPEG then resizing amplifies block
      artifacts. Resize first, then compress at a reasonable quality.
    </p>

    <h2>Upscaling — the dangerous direction</h2>
    <p>
      Upscaling invents data that doesn&rsquo;t exist. Traditional
      algorithms (bicubic, Lanczos) produce blur; they can&rsquo;t
      add detail that wasn&rsquo;t captured.
    </p>
    <p>
      <strong>Safe upscale limit with traditional algorithms:</strong>
      up to ~150-200% of the original size. Beyond that, blur
      becomes visible at normal viewing distance.
    </p>
    <p>
      <strong>AI upscalers</strong> (Topaz Gigapixel, Waifu2x, Real-
      ESRGAN, Gigapixel AI, Upscayl) hallucinate plausible detail
      based on trained models. A 2x or 4x AI upscale of a reasonably
      sharp source can look genuinely sharp. Beware: AI upscalers can
      &ldquo;make up&rdquo; features — faces may look subtly wrong,
      text can become nonsense.
    </p>
    <p>
      <strong>Don&rsquo;t upscale for critical uses.</strong> Print,
      archival, legal, forensic. If the source is 800px and you need
      2000px for print, you need a higher-res source, not a better
      upscaler.
    </p>

    <h2>Dimensions and format — picking targets</h2>
    <p>
      <strong>For the web:</strong>
    </p>
    <p>
      Hero images: 1600-2000px wide at 72 DPI.
    </p>
    <p>
      Body images: 1000-1200px wide.
    </p>
    <p>
      Thumbnails: 400-600px wide.
    </p>
    <p>
      Avatars: 200-400px square.
    </p>
    <p>
      Serve 2x density versions for retina (so 2400px for a 1200px
      CSS pixel width), lazy-loaded via <code>srcset</code>.
    </p>
    <p>
      <strong>For print:</strong> 300 DPI at the final print size.
      An A4 print at 300 DPI needs 2480×3508 pixels minimum.
    </p>
    <p>
      <strong>For social:</strong> platform-specific specs change
      yearly. 1080×1080 for Instagram square, 1080×1920 for Stories,
      1200×630 for OG images, 1500×500 for Twitter/X headers.
    </p>

    <h2>Format choice interacts with resize</h2>
    <p>
      <strong>PNG:</strong> lossless, good for graphics with sharp
      edges (logos, UI), bad for photos (large files). Resizes
      cleanly.
    </p>
    <p>
      <strong>JPEG:</strong> lossy, great for photos, poor for sharp
      edges. Re-encoding after resize is necessary and slightly
      lossy. Keep quality at 80-85 for web; lower causes visible
      artifacts.
    </p>
    <p>
      <strong>WebP:</strong> 25-35% smaller than JPEG at equivalent
      quality; supports transparency; widely supported in 2026.
      Prefer for web photos unless legacy compatibility is critical.
    </p>
    <p>
      <strong>AVIF:</strong> 30-50% smaller than JPEG; better
      quality; slow to encode. Best for hero images you generate
      once.
    </p>
    <p>
      <strong>SVG:</strong> vector, resizes infinitely without
      quality loss. Use for icons, logos, illustrations. Not for
      photos.
    </p>

    <h2>Maintaining aspect ratio</h2>
    <p>
      <strong>Always resize proportionally unless deliberately
      stretching.</strong> Constraining width to 1200 and letting
      height auto-calculate keeps the image natural.
    </p>
    <p>
      <strong>For fixed-frame targets</strong> (like a 1:1 square
      from a 4:3 photo), pick: crop (lose content), fit (letterbox
      with padding), or fill (crop + zoom to fill).
    </p>
    <p>
      &ldquo;Smart crop&rdquo; tools detect subjects and center the
      crop on them. Useful for bulk thumbnails.
    </p>

    <h2>Metadata and EXIF</h2>
    <p>
      Most resizers strip EXIF by default, which removes camera
      info, GPS, original date. Usually desirable for web.
    </p>
    <p>
      If you need to preserve EXIF (photography archives, legal
      records), use a resizer that supports it. ImageMagick with
      <code>-auto-orient</code> applies rotation from EXIF without
      breaking it.
    </p>
    <p>
      <strong>GPS coordinates in photos</strong> are a privacy leak
      — always strip before publishing photos taken on a mobile
      device.
    </p>

    <h2>Batch resizing</h2>
    <p>
      For 10+ images, command-line or scripted tools save time.
    </p>
    <p>
      <strong>ImageMagick:</strong> <code>magick mogrify -resize
      1200x1200 -quality 85 -format webp *.jpg</code>. Industry
      standard, scriptable, Lanczos by default for downscales.
    </p>
    <p>
      <strong>Sharp (Node.js):</strong> fast, WebP/AVIF-ready, great
      for server-side pipelines.
    </p>
    <p>
      <strong>cwebp</strong> and <strong>avifenc:</strong> format-
      specific tools with excellent compression tuning.
    </p>
    <p>
      <strong>Squoosh.app:</strong> browser-based batch-free tool
      from Google with a great UI for comparing quality/size trade-
      offs.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Resizing by CSS, not by actual pixels.</strong>
      Serving a 4000px image to display at 400px wastes bandwidth
      (10-15× more data) and hurts page speed.
    </p>
    <p>
      <strong>Upscaling before a resize.</strong> Drop source, then
      upscale, then downscale is always worse than just downscaling
      the original.
    </p>
    <p>
      <strong>Saving JPEG quality too low.</strong> 60 or below
      introduces visible blocks, color banding, and edge halos.
      80-85 is the usual sweet spot.
    </p>
    <p>
      <strong>Forgetting retina/HiDPI.</strong> A 1200×800 image
      looks soft on retina. Serve @2x or @3x via srcset.
    </p>
    <p>
      <strong>Ignoring the color space.</strong> sRGB is the web
      standard. Images in Adobe RGB or ProPhoto will look muted or
      wrong on web browsers.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Resize any image in-browser with the{" "}
      <a href="/tools/image-resizer">image resizer</a>. Pair with the{" "}
      <a href="/tools/image-compressor">image compressor</a> to trim
      file size after resizing, and the{" "}
      <a href="/tools/image-format-converter">image format converter</a>
      {" "}to output the right format for your use case (WebP for web,
      PNG for graphics, JPEG for legacy).
    </p>
  </>
);
