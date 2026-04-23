import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Knowing an image&rsquo;s exact pixel dimensions is the first step in almost every design and web workflow: confirming a source file is large enough for a planned use, calculating aspect ratio for a crop, verifying print output at a required DPI, or debugging a layout that looks mysteriously soft. Most operating systems show dimensions in a right-click info panel, but a dedicated tool is faster for batches and shows the data alongside aspect ratio, DPI, and file weight. This guide explains what the dimensions actually tell you, how DPI and pixel count relate, and which sizes to remember for common web and print targets.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>What width and height really mean</h2>
    <p>
      Width and height describe the image as a grid of pixels. A 1920&nbsp;&times;&nbsp;1080 file has 1920 columns and 1080 rows, for a total of 2,073,600 pixels &mdash; just over 2 megapixels. This grid is the raw data; it says nothing about how large the image appears when printed or rendered on screen.
    </p>
    <p>
      Every other number you might see &mdash; inches, centimeters, points, DPI &mdash; is derived from the pixel grid plus some assumed or declared output size.
    </p>

    <h2>Aspect ratio from dimensions</h2>
    <p>
      Divide width by height, simplify, and you have the aspect ratio. 1920/1080 simplifies to 16:9. 1200/800 simplifies to 3:2. Knowing the aspect ratio matters because it determines whether the image can fit a target frame without cropping or letterboxing.
    </p>
    <p>
      Common ratios to recognize at a glance:
    </p>
    <ul>
      <li><strong>1:1</strong> &mdash; square, Instagram feed, profile avatars.</li>
      <li><strong>4:3</strong> &mdash; classic digital camera, older monitors, presentations.</li>
      <li><strong>3:2</strong> &mdash; 35mm film, DSLRs, standard prints.</li>
      <li><strong>16:9</strong> &mdash; HD video, YouTube thumbnails, modern laptop screens.</li>
      <li><strong>9:16</strong> &mdash; vertical video, Stories, Reels, TikTok.</li>
      <li><strong>21:9</strong> &mdash; ultrawide cinema, hero banners.</li>
    </ul>

    <h2>Pixels versus DPI versus physical size</h2>
    <p>
      Pixels per inch (PPI, often loosely called DPI) translates between pixel grid and physical size. A 3000&nbsp;&times;&nbsp;2000 image at 300 PPI prints cleanly at 10&nbsp;&times;&nbsp;6.67 inches. The same file at 72 PPI &ldquo;prints&rdquo; at 41.67&nbsp;&times;&nbsp;27.78 inches but will look pixelated.
    </p>
    <p>
      For on-screen display, DPI metadata is almost always ignored: browsers and screens care about pixels, not declared inches. You can freely change the PPI tag without resampling the image; only the print size claim changes, not a single pixel of data.
    </p>

    <h2>Reading metadata: the difference between stated and actual</h2>
    <p>
      A file&rsquo;s header can claim any dimensions it likes; a good checker measures the actual pixel grid. Occasionally you&rsquo;ll find files where the metadata disagrees with reality &mdash; usually because a tool resized the pixels but forgot to update the header, or vice versa. Trust the actual pixel count.
    </p>
    <p>
      Tools typically also expose: file size in KB/MB, color depth (8-bit, 16-bit), color space (sRGB, Adobe RGB, Display P3), and transparency flag (PNG alpha channel).
    </p>

    <h2>Minimum dimensions for common uses</h2>
    <ul>
      <li><strong>Instagram feed post:</strong> at least 1080&nbsp;&times;&nbsp;1080.</li>
      <li><strong>Instagram story/Reel:</strong> 1080&nbsp;&times;&nbsp;1920.</li>
      <li><strong>YouTube thumbnail:</strong> 1280&nbsp;&times;&nbsp;720 minimum, 1920&nbsp;&times;&nbsp;1080 recommended.</li>
      <li><strong>Facebook link preview:</strong> 1200&nbsp;&times;&nbsp;630.</li>
      <li><strong>Twitter/X in-stream photo:</strong> 1200&nbsp;&times;&nbsp;675.</li>
      <li><strong>LinkedIn post image:</strong> 1200&nbsp;&times;&nbsp;627.</li>
      <li><strong>Blog hero banner:</strong> 1920&nbsp;&times;&nbsp;1080 works on most layouts.</li>
    </ul>
    <p>
      Keeping these in your head saves a hundred back-and-forths with designers.
    </p>

    <h2>Print-ready sizes</h2>
    <p>
      For a 300 PPI print &mdash; the standard for photo prints, business cards, and most professional print work &mdash; multiply inches by 300 to get minimum pixel dimensions:
    </p>
    <pre>{`4x6 print:    1200 x 1800 px
5x7 print:    1500 x 2100 px
8x10 print:   2400 x 3000 px
11x17 poster: 3300 x 5100 px
Business card (3.5x2): 1050 x 600 px`}</pre>
    <p>
      Newspapers accept 150&ndash;200 PPI because of the rougher paper stock; large-format banners tolerate 100 PPI or less because you view them from a distance.
    </p>

    <h2>Viewing distance and perceived sharpness</h2>
    <p>
      DPI requirements assume normal reading distance (about 12&nbsp;inches / 30&nbsp;cm for a print, an arm&rsquo;s length for a phone). A highway billboard printed at 20 DPI looks crisp at 100 meters. A product box printed at 300 DPI looks crisp at 1 meter. The rule of thumb: halve the DPI for every doubling of viewing distance.
    </p>
    <p>
      This is why dimensions alone don&rsquo;t determine quality; context of use does.
    </p>

    <h2>Responsive web sizing</h2>
    <p>
      For web images, the right pixel dimensions depend on CSS rendered width and device pixel ratio. If a CSS pixel is 400 wide on a DPR-2 device, you need 800 hardware pixels of source. Checking the original&rsquo;s dimensions tells you how much upscaling &mdash; if any &mdash; you&rsquo;ll be forced to do for retina displays.
    </p>
    <p>
      A quick audit: take your hero image&rsquo;s intrinsic width, divide by its painted CSS width, and if the ratio is below 2 you&rsquo;re delivering soft visuals to retina users.
    </p>

    <h2>Why dimensions matter for SEO</h2>
    <p>
      Search engines parse intrinsic dimensions to build image indexes and to detect whether an image is worth showing at all. Too-small images (below ~300&nbsp;&times;&nbsp;200) are often skipped entirely. Too-large images that never get resized can be a ranking signal against page speed.
    </p>
    <p>
      Declaring <code>width</code> and <code>height</code> attributes in the HTML also prevents layout shift, which is a Core Web Vitals metric. Those values should match the intrinsic dimensions of the source file.
    </p>

    <h2>Checking many files at once</h2>
    <p>
      When auditing a folder of uploads, a batch dimension checker produces a table with filename, width, height, aspect ratio, DPI, and file size. Sort by smallest height to find images too tiny for hero use; sort by file size to find bloat; filter by aspect ratio to find anything that won&rsquo;t fit a fixed layout. The same report on a weekly cadence is a great way to catch uploads that slipped past your content guidelines.
    </p>

    <h2>Reading dimensions on different platforms</h2>
    <p>
      Quick ways to check a single file without opening a tool:
    </p>
    <ul>
      <li><strong>macOS Finder:</strong> select a file, press spacebar for Quick Look; press Cmd+I for full Info with dimensions.</li>
      <li><strong>Windows Explorer:</strong> right-click, Properties, Details tab shows width and height.</li>
      <li><strong>Linux:</strong> <code>file image.jpg</code> or <code>identify image.jpg</code> (ImageMagick) from the terminal.</li>
      <li><strong>Web browser:</strong> right-click any image on a loaded page and pick &ldquo;Inspect&rdquo; &mdash; DevTools shows rendered and intrinsic size.</li>
    </ul>
    <p>
      Dedicated tools become worth it when you need aspect ratio, DPI, and color profile alongside dimensions, or when you&rsquo;re processing a batch.
    </p>

    <h2>Megapixels and what the number really means</h2>
    <p>
      Megapixels (MP) is just width&nbsp;&times;&nbsp;height divided by a million. A 24&nbsp;MP camera produces 6000&nbsp;&times;&nbsp;4000 images. The headline number tells you the maximum print size at a given DPI but nothing about sensor quality, lens sharpness, or low-light performance. A 12&nbsp;MP iPhone photo often looks better than a 48&nbsp;MP photo from a cheap camera because other factors dominate.
    </p>
    <p>
      For web, anything over 4&ndash;8&nbsp;MP is surplus. For print, 12&ndash;16&nbsp;MP comfortably covers up to 11&nbsp;&times;&nbsp;14 inches at 300 DPI.
    </p>

    <h2>Declaring dimensions in HTML</h2>
    <p>
      Always include <code>width</code> and <code>height</code> attributes on <code>&lt;img&gt;</code> elements, even if CSS will resize them. The attributes tell the browser the intrinsic aspect ratio so it can reserve the correct box before the image loads, preventing layout shift:
    </p>
    <pre>{`<img
  src="/hero.jpg"
  width="1200"
  height="630"
  alt="Team photo"
/>`}</pre>
    <p>
      The numbers should match the source file&rsquo;s actual pixel dimensions. CSS will still determine the rendered size; the attributes just communicate the ratio.
    </p>

    <h2>Dimension mismatches in production</h2>
    <p>
      Common symptoms that trace back to a dimension problem:
    </p>
    <ul>
      <li><strong>Blurry hero image on retina displays:</strong> source intrinsic width is too close to the CSS painted width.</li>
      <li><strong>Visible layout shift:</strong> missing <code>width</code> and <code>height</code> attributes force the browser to reflow after the image loads.</li>
      <li><strong>Squished or stretched avatar:</strong> the source isn&rsquo;t square but the CSS forces a 1:1 container without <code>object-fit: cover</code>.</li>
      <li><strong>Slow product grid:</strong> originals are 4000&nbsp;px wide, delivered to tiles that paint 300&nbsp;px.</li>
    </ul>
    <p>
      Debug by comparing intrinsic dimensions (what the file is) to rendered dimensions (what the browser paints). The DevTools Network panel shows both.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Confusing DPI with pixel count: changing a JPEG&rsquo;s DPI tag from 72 to 300 in Preview does not add a single pixel &mdash; it just relabels the file. The image will not print any sharper unless you actually resample it. Another common mistake: trusting the screenshot dimensions reported by tools on macOS Retina displays, which sometimes show logical (CSS) pixels and sometimes hardware pixels. Verify the actual file on disk to be sure. Finally, confusing landscape 1920&nbsp;&times;&nbsp;1080 with portrait 1080&nbsp;&times;&nbsp;1920 when uploading to a platform that silently crops the mismatched orientation &mdash; always check which dimension the platform wants first.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Drop any file into our <a href="/tools/image-dimensions-checker">image dimensions checker</a> to get pixel width, height, aspect ratio, DPI, and file size in one view. When the dimensions are wrong for your target, the <a href="/tools/image-resizer">image resizer</a> is the fix. For working out whether a given width and height can fit a layout ratio, the <a href="/tools/aspect-ratio-calculator">aspect ratio calculator</a> does the math instantly.
    </p>
  </>
);
