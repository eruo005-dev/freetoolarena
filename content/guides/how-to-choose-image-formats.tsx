import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      JPG, PNG, WebP, AVIF, GIF, SVG, HEIC — picking the wrong image
      format costs bandwidth, quality, or compatibility. Picking
      the right one makes pages faster, images crisper, and files
      smaller without anyone noticing. The rules aren&rsquo;t
      intuitive (JPG isn&rsquo;t always smaller than PNG; WebP
      isn&rsquo;t always better than JPG), and the landscape shifted
      in the last few years with AVIF rolling out at scale. This
      guide maps each format to its best use, explains the
      compression tradeoffs that matter, covers transparency and
      animation support, browser compatibility in 2026, and the
      modern workflow for serving the right format to every user.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The short version</h2>
    <p>
      <strong>JPG:</strong> photos where transparency doesn&rsquo;t
      matter and lossy compression is fine. Default for most
      photography.
    </p>
    <p>
      <strong>PNG:</strong> logos, screenshots, icons, images with
      transparency. Lossless but larger files.
    </p>
    <p>
      <strong>SVG:</strong> icons, simple illustrations, logos that
      need to scale infinitely. Tiny file, perfect rendering at
      any size.
    </p>
    <p>
      <strong>WebP:</strong> modern successor to JPG and PNG. ~30%
      smaller than JPG at similar quality. Supported everywhere
      except very old browsers.
    </p>
    <p>
      <strong>AVIF:</strong> newer still. ~50% smaller than JPG.
      Support now universal on modern browsers (late 2023+).
    </p>
    <p>
      <strong>GIF:</strong> legacy. Only for tiny looping animations
      where backward compat matters. Otherwise MP4 or WebM.
    </p>
    <p>
      <strong>HEIC:</strong> iPhone default. Great compression but
      limited web support. Convert to JPG or WebP before uploading.
    </p>

    <h2>Lossy vs lossless — the core tradeoff</h2>
    <p>
      <strong>Lossy</strong> formats (JPG, WebP-lossy, AVIF, HEIC)
      discard pixel data to save bytes. For photographs, this is
      invisible at reasonable quality settings. For sharp edges
      (text, line art), lossy artifacts are obvious.
    </p>
    <p>
      <strong>Lossless</strong> formats (PNG, WebP-lossless) keep
      every pixel exactly. Larger files but no artifacts.
    </p>
    <p>
      <strong>Rule:</strong> use lossy for photos, lossless for
      graphics with sharp edges, especially text.
    </p>

    <h2>JPG deep dive</h2>
    <p>
      <strong>Best for:</strong> photographs, realistic imagery with
      smooth gradients.
    </p>
    <p>
      <strong>Quality setting:</strong> 75-85 is the sweet spot.
      Above 90 you&rsquo;re throwing bytes away for negligible
      quality gain. Below 60, artifacts become visible.
    </p>
    <p>
      <strong>Chroma subsampling:</strong> 4:2:0 is default — half
      the color resolution of brightness. Fine for photos;
      destructive for images with saturated text.
    </p>
    <p>
      <strong>Progressive JPG:</strong> loads in multiple passes,
      each higher quality. Better perceived performance; slightly
      larger file. Most encoders use this by default now.
    </p>
    <p>
      <strong>Metadata:</strong> JPG carries EXIF data (camera,
      location, settings). Strip before publishing for privacy and
      file size.
    </p>

    <h2>PNG deep dive</h2>
    <p>
      <strong>Best for:</strong> screenshots, UI elements, logos,
      any image with sharp edges or transparency.
    </p>
    <p>
      <strong>PNG-8 vs PNG-24:</strong> PNG-8 uses a 256-color
      palette (like GIF). Good for simple icons. PNG-24 is full
      color.
    </p>
    <p>
      <strong>Compression:</strong> PNG compression is lossless but
      has tuning. Tools like <code>pngcrush</code>,{" "}
      <code>optipng</code>, <code>zopflipng</code> can shave 20-40%
      off default PNG output without quality loss.
    </p>
    <p>
      <strong>Transparency:</strong> full alpha channel. Supports
      anti-aliased edges against any background.
    </p>

    <h2>SVG deep dive</h2>
    <p>
      <strong>Best for:</strong> logos, icons, simple illustrations,
      anything designed in vector format.
    </p>
    <p>
      <strong>File size:</strong> often smaller than PNG at high
      resolutions, larger at small ones. Complex illustrations with
      many paths bloat SVG quickly.
    </p>
    <p>
      <strong>Scalability:</strong> pixel-perfect at any size.
      Doesn&rsquo;t blur or pixelate. Retina displays render SVGs
      perfectly without 2x assets.
    </p>
    <p>
      <strong>Security:</strong> SVG is XML with script support.
      User-uploaded SVGs can contain malicious scripts. Sanitize
      before display (<code>DOMPurify</code>, server-side scrubbing).
    </p>
    <p>
      <strong>Optimization:</strong> SVGO strips metadata, collapses
      paths, rounds coordinates. Required for production.
    </p>

    <h2>WebP deep dive</h2>
    <p>
      <strong>Best for:</strong> modern web photography and graphics.
      Supports both lossy and lossless modes plus transparency and
      animation.
    </p>
    <p>
      <strong>Compression:</strong> ~30% smaller than JPG at
      equivalent quality. Noticeably smaller than PNG for
      photographs with transparency.
    </p>
    <p>
      <strong>Support:</strong> all modern browsers. No worry for
      Chrome, Edge, Firefox, Safari 14+ (2020+).
    </p>
    <p>
      <strong>Fallback:</strong>{" "}
      <code>&lt;picture&gt;</code> with <code>source type=&quot;image/webp&quot;</code>
      {" "}+ JPG fallback in <code>&lt;img&gt;</code> tag. Or serve
      via Content-Type negotiation on the server.
    </p>

    <h2>AVIF deep dive</h2>
    <p>
      <strong>Best for:</strong> modern web images when file size
      matters most.
    </p>
    <p>
      <strong>Compression:</strong> ~50% smaller than JPG, ~20%
      smaller than WebP. Significant savings on photography at
      scale.
    </p>
    <p>
      <strong>Support:</strong> Chrome, Firefox, Safari 16+ (2022+).
      Safe for a primary format with WebP fallback in 2026.
    </p>
    <p>
      <strong>Encoding speed:</strong> slow — AVIF encoding can be
      10-50x slower than JPG. Pre-encode, don&rsquo;t encode at
      request time.
    </p>
    <p>
      <strong>Decoding speed:</strong> also slower than JPG. Impacts
      image-heavy scrolling on low-end mobile.
    </p>

    <h2>GIF — legacy for a reason</h2>
    <p>
      GIF is 256-color only, horrendous compression compared to
      modern formats, and its only remaining advantage is universal
      support.
    </p>
    <p>
      <strong>For animation:</strong> MP4 or WebM is 10x smaller
      at equivalent quality. Use <code>&lt;video autoplay muted
      loop playsinline&gt;</code> for Twitter/GIF-style animations.
    </p>
    <p>
      <strong>For transparency:</strong> PNG beats GIF by a mile.
      1-bit alpha vs full alpha channel.
    </p>
    <p>
      Reach for GIF only if you&rsquo;re embedding in old email
      clients or legacy docs.
    </p>

    <h2>HEIC / HEIF</h2>
    <p>
      Apple&rsquo;s default photo format since iOS 11 (2017).
      Excellent compression — files half the size of equivalent
      JPG.
    </p>
    <p>
      <strong>Web support:</strong> poor. Safari only; Chrome and
      Firefox don&rsquo;t render HEIC.
    </p>
    <p>
      <strong>Workflow:</strong> convert to JPG or WebP on upload.
      iOS and most image tools can do this automatically.
    </p>

    <h2>Modern serving — picture element</h2>
    <p>
      Serve the best format each browser supports:
    </p>
    <pre>
{`<picture>
  <source srcset="img.avif" type="image/avif">
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" alt="...">
</picture>`}
    </pre>
    <p>
      Browser tries AVIF → WebP → JPG, picks the first it supports.
      Zero-cost progressive enhancement.
    </p>
    <p>
      <strong>Responsive variants:</strong>{" "}
      <code>srcset</code> with <code>sizes</code> lets you serve
      different resolutions for different viewport sizes. Essential
      for mobile performance.
    </p>

    <h2>CDN image optimization</h2>
    <p>
      Modern CDNs (Cloudflare Images, Vercel, Netlify, imgix,
      Imagekit) auto-convert on request. Upload a JPG; CDN serves
      AVIF to Chrome, WebP to Safari 14, JPG to older browsers.
      Resize on the fly from URL parameters.
    </p>
    <p>
      For any site with &gt; 100 images, a CDN with image
      optimization is usually worth the cost.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>PNG for photos.</strong> A PNG photo is often 5x
      larger than an equivalent JPG with no visible difference.
      PNG when you need transparency, JPG when you don&rsquo;t.
    </p>
    <p>
      <strong>GIF for animations in 2026.</strong> 10x larger than
      MP4. Use video tags.
    </p>
    <p>
      <strong>Serving full-resolution images at thumbnail size.</strong>
      A 4000&times;3000 JPG displayed at 300&times;200 wastes 95%
      of the bytes. Resize server-side.
    </p>
    <p>
      <strong>SVGs with embedded raster images.</strong> Defeats the
      purpose. If it&rsquo;s bitmap content, use a bitmap format.
    </p>
    <p>
      <strong>Keeping EXIF metadata.</strong> Adds bytes, leaks
      privacy (geolocation, device info). Strip on upload.
    </p>
    <p>
      <strong>JPG at 100% quality.</strong> 10x larger than 85% for
      no visible improvement.
    </p>
    <p>
      <strong>Ignoring AVIF in 2026.</strong> AVIF support is now
      broad enough to be the primary format with WebP fallback.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert between formats instantly with the{" "}
      <a href="/tools/image-format-converter">image format converter</a>.
      Pair with the{" "}
      <a href="/tools/image-resizer">image resizer</a> to right-size
      before exporting, and the{" "}
      <a href="/tools/image-compressor">image compressor</a> to
      shrink further without quality loss.
    </p>
  </>
);
