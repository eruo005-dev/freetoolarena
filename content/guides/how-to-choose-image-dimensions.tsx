export const intro = (
  <>
    <p>
      Image dimensions are one of the small, unglamorous details that decide whether a piece of
      content looks sharp or amateurish. Upload a 2400-pixel-wide image to a blog and it loads
      slowly; upload a 600-pixel one and it pixelates on high-density screens. Post the wrong
      aspect ratio to Instagram and the platform crops the important part out of frame.
    </p>
    <p>
      This guide covers how to pick the right dimensions for each context — web, social, email,
      print — and why the aspect ratio usually matters more than the raw pixel count. Get these
      choices right once and your images look professional everywhere without extra effort.
    </p>
  </>
);

export const body = (
  <>
    <h2>Pixels, aspect ratio, and density</h2>
    <p>
      Three numbers describe every image: <strong>pixel dimensions</strong> (width × height in
      pixels), <strong>aspect ratio</strong> (the shape — 16:9, 1:1, 4:5), and{" "}
      <strong>pixel density</strong> (how many image pixels per display pixel). Platforms care
      about aspect ratio first (will it fit their layout?), then pixel dimensions (is it sharp
      enough?), then file size (how fast does it load?). Design for the first two; compress for
      the third.
    </p>

    <h2>Web images: the 2× rule</h2>
    <p>
      Modern phones, tablets, and laptops use high-DPI displays. An image that is 600 pixels wide
      on screen should be at least 1200 pixels wide in the file — otherwise it looks soft on a
      retina display. This is the 2× rule. Design at the display size, export at 2× the
      dimensions, and compress to keep the file size under 200 KB for hero images and 50 KB for
      thumbnails. Check the rendered dimensions with our{" "}
      <a href="/tools/image-dimensions-checker">image dimensions checker</a>.
    </p>

    <h2>Blog post featured images</h2>
    <p>
      A safe standard: 1200 × 630 pixels (roughly 1.91:1). This matches Open Graph
      specifications, so the same file works as a blog hero and as a Twitter / LinkedIn
      preview card. Crop to 1200 × 675 (16:9) if you want a slightly taller hero but keep an OG
      version in 1.91:1.
    </p>

    <h2>Social media by platform</h2>
    <p>
      Instagram feed: 1080 × 1080 (1:1) or 1080 × 1350 (4:5) — portrait performs better.
      Instagram story / Reel: 1080 × 1920 (9:16). Twitter / X inline: 1600 × 900 (16:9).
      LinkedIn post: 1200 × 1200 (1:1) or 1200 × 627 (1.91:1). YouTube thumbnail: 1280 × 720.
      Pinterest pin: 1000 × 1500 (2:3, tall performs best). See the full cheat sheet in our{" "}
      <a href="/tools/social-media-image-sizes">social media image sizes</a> tool.
    </p>

    <h2>The aspect ratio mistake that ruins social posts</h2>
    <p>
      Uploading a 16:9 desktop screenshot to Instagram. The platform either crops it to
      1:1 (cutting the left and right), forces it into 4:5 (shrinking it into a tiny strip),
      or letterboxes it (wasting half the frame). Always compose at the target ratio. Use the{" "}
      <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a> to convert between
      ratios when scaling.
    </p>

    <h2>Email header images</h2>
    <p>
      Most email clients render at 600 pixels wide maximum. Design headers at 600 × 200 or
      1200 × 400 (for retina). Keep the file under 100 KB — large images get stripped or
      block-quoted by Gmail. Always set a meaningful alt attribute; many recipients view email
      with images blocked, and alt text is what they see.
    </p>

    <h2>Use the right format</h2>
    <p>
      <strong>JPEG</strong> for photos. <strong>PNG</strong> for images with transparency or
      hard edges (logos, screenshots). <strong>SVG</strong> for icons and simple illustrations —
      scales perfectly at any size. <strong>WebP</strong> or <strong>AVIF</strong> when your
      platform supports it — 30–50% smaller than JPEG at the same quality. Our{" "}
      <a href="/tools/image-format-converter">image format converter</a> handles all the common
      conversions in the browser.
    </p>

    <h2>Compress aggressively</h2>
    <p>
      For web, 70–85% JPEG quality is indistinguishable from 100% to the human eye but half the
      file size. For PNG, use a lossy optimizer (pngquant) before the final save. Page-speed
      wins compound — every kilobyte you shave off a homepage image loads for every visitor. Run
      images through our <a href="/tools/image-compressor">image compressor</a> before publishing.
    </p>

    <h2>Test on real devices</h2>
    <p>
      A layout that looks perfect on a 27-inch monitor can be broken on an iPhone SE. Before
      shipping a page, view it on your phone, a tablet, and a laptop. Look specifically at
      whether images crop awkwardly, load slowly, or push text off the screen.
    </p>

    <h2>Build a template library</h2>
    <p>
      Once you know the sizes for your blog, social posts, email headers, and thumbnails, save
      templates in your design tool. A single click of the right template means you never
      open a blank canvas and guess. The number one reason teams ship the wrong image size is
      forgetting to check — templates remove the decision.
    </p>

    <h2>Alt text is image metadata too</h2>
    <p>
      Every image on the web should have alt text — for screen readers, for SEO, and for
      resilience when the image fails to load. Describe what&rsquo;s in the image and why it
      matters to the surrounding text, not just what it looks like. Our{" "}
      <a href="/tools/alt-text-helper">alt text helper</a> walks through a decent draft in
      under a minute.
    </p>

    <p>
      Related: <a href="/guides/how-to-compress-images-without-losing-quality">how to compress
      images without losing quality</a>, <a href="/guides/how-to-convert-webp-to-jpg">how to
      convert WebP to JPG</a>, and <a href="/guides/how-to-crop-images-online">how to crop
      images online</a>.
    </p>
  </>
);
