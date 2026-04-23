import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      EXIF metadata is a goldmine if you know what to look for: it reveals when and where a photo was taken, with what camera and settings, and whether the file has been edited or processed. Photographers use it to learn from their own work; journalists and investigators use it to verify authenticity; privacy-conscious users use it to check what personal information a photo is carrying before they share it. This guide covers the EXIF fields worth reading, how to interpret them, and the most common gotchas &mdash; timezone drift, edited-but-unstripped files, and metadata that&rsquo;s been forged.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The essential EXIF fields</h2>
    <p>
      A photo can carry dozens of fields, but a handful do most of the work:
    </p>
    <ul>
      <li><strong>Make, Model:</strong> the camera that took the shot.</li>
      <li><strong>LensModel, FocalLength:</strong> the lens and zoom setting.</li>
      <li><strong>FNumber, ExposureTime, ISO:</strong> the exposure triangle.</li>
      <li><strong>DateTimeOriginal:</strong> when the shutter fired.</li>
      <li><strong>GPSLatitude, GPSLongitude, GPSAltitude:</strong> where it happened.</li>
      <li><strong>Orientation:</strong> display rotation (1 = upright, 6 = phone portrait).</li>
      <li><strong>Flash:</strong> whether and how the flash fired.</li>
      <li><strong>Software:</strong> the app that last saved the file.</li>
      <li><strong>Artist, Copyright:</strong> authorship info if the camera or user set it.</li>
    </ul>

    <h2>Reading camera settings</h2>
    <p>
      For photographers studying their own work, the exposure trio tells you what decisions the camera (or you) made:
    </p>
    <pre>{`FNumber:       f/2.8
ExposureTime:  1/125 s
ISO:           400
FocalLength:   50 mm
Flash:         Did not fire`}</pre>
    <p>
      A wide aperture (low f-number) and moderate ISO with a fast shutter implies natural light at a dim-ish venue. High ISO with a slow shutter implies low light without flash. Reading the pattern across a gallery shows your habits &mdash; maybe you shoot too wide open, or your ISO defaults are too conservative.
    </p>

    <h2>Timestamps and the timezone trap</h2>
    <p>
      The <code>DateTimeOriginal</code> field stores local time at capture, but most cameras don&rsquo;t record the timezone. If you shot the photo at 2&nbsp;p.m. in Tokyo and later uploaded it in New York, the timestamp still reads 2&nbsp;p.m. &mdash; but you don&rsquo;t know if that was Tokyo local or New York local without other context.
    </p>
    <p>
      Modern phones often add an <code>OffsetTimeOriginal</code> field (e.g. <code>+09:00</code>) that disambiguates. Older cameras almost never do. If chronology matters, check both fields.
    </p>

    <h2>GPS precision and format</h2>
    <p>
      GPS fields come as degrees-minutes-seconds or decimal degrees. A typical reading:
    </p>
    <pre>{`GPSLatitude:     40 deg 44' 55.85" N
GPSLongitude:    73 deg 59' 11.35" W
GPSAltitude:     21.3 m Above Sea Level`}</pre>
    <p>
      That&rsquo;s Midtown Manhattan, accurate to a few meters. Paste the decimal form (40.748847, -73.985368) into any map tool and you can see the exact building. This precision is why GPS stripping matters before sharing.
    </p>
    <p>
      Not every photo has GPS &mdash; phones record it by default but cameras need to pair with a smartphone or have built-in GPS enabled. Missing GPS doesn&rsquo;t mean the photo is anonymous; it means the device didn&rsquo;t record a location.
    </p>

    <h2>Spotting edited-but-unstripped photos</h2>
    <p>
      The <code>Software</code> field reveals the last processor of a file. If a photo claims to be a straight-from-camera snapshot but the Software field reads <strong>Adobe Photoshop 25.0</strong>, someone has been editing.
    </p>
    <p>
      Other giveaways:
    </p>
    <ul>
      <li><strong>Mismatched Make/Model:</strong> the lens in the metadata doesn&rsquo;t exist for the claimed camera body.</li>
      <li><strong>Unusual DateTimeDigitized versus DateTimeOriginal:</strong> a large gap suggests post-processing or scan-from-print.</li>
      <li><strong>Missing EXIF entirely:</strong> either stripped, or the file was re-saved by a tool that dropped metadata. A &ldquo;raw camera JPEG&rdquo; without EXIF is suspicious.</li>
      <li><strong>Thumbnail mismatch:</strong> some files store a small preview; if it differs from the full image, the full image was edited.</li>
    </ul>

    <h2>Verifying authenticity</h2>
    <p>
      Journalists and investigators use EXIF as one layer of authenticity checks. A photo claiming to be from a specific location but with GPS pointing elsewhere is a red flag. A timestamp that predates the event it claims to depict is another.
    </p>
    <p>
      Note that EXIF is trivially forgeable &mdash; any determined actor can rewrite the fields. EXIF analysis is useful as a starting point, not proof. Combine with reverse-image search, shadow-angle analysis, and context.
    </p>

    <h2>IPTC and XMP beyond EXIF</h2>
    <p>
      Beyond EXIF, professional photo workflows embed IPTC (caption, keywords, copyright, byline) and XMP (Adobe&rsquo;s edit history and ratings) blocks. A good viewer displays all three side by side. Reading IPTC copyright tells you who claims authorship; reading XMP reveals the edit history as Lightroom saved it.
    </p>
    <p>
      A scanner output will often have XMP indicating the scan software; a heavily edited file will show layers, ratings, and export settings.
    </p>

    <h2>Orientation and why photos are sideways</h2>
    <p>
      The Orientation tag reveals whether a &ldquo;sideways&rdquo; looking photo is actually a landscape pixel buffer meant to be rotated on display. Value 1 means upright, 6 means rotate 90&deg; clockwise for display (standard portrait iPhone), 8 means rotate 270&deg; clockwise (portrait held the other way).
    </p>
    <p>
      If a photo looks right in some apps but sideways in others, the Orientation tag is the explanation. Apps that respect it show upright; apps that don&rsquo;t show raw pixels.
    </p>

    <h2>Reading EXIF privately</h2>
    <p>
      A browser-based viewer that processes files locally doesn&rsquo;t upload your photo anywhere &mdash; important when the image might contain sensitive information. If a viewer demands a file upload, think twice before feeding it a family or medical photo.
    </p>
    <p>
      For true offline inspection, the <code>exiftool</code> command-line utility is the gold standard. A good web viewer uses the same parsing library compiled to WebAssembly and runs it in your browser.
    </p>

    <h2>Practical uses beyond privacy</h2>
    <p>
      Some everyday wins from checking EXIF:
    </p>
    <ul>
      <li>Diagnosing why phone photos &ldquo;look soft&rdquo; &mdash; check ISO and shutter speed.</li>
      <li>Confirming a stock photo is actually as recent as claimed.</li>
      <li>Identifying the exact lens on a great shot you want to emulate.</li>
      <li>Verifying that a real-estate listing photo is from this year, not five years ago.</li>
      <li>Investigating whether a forwarded photo has been processed.</li>
    </ul>

    <h2>When EXIF is missing</h2>
    <p>
      A file with no EXIF at all has been stripped, converted through a tool that drops metadata, or re-saved by a social platform. Don&rsquo;t assume &ldquo;no EXIF&rdquo; means &ldquo;original.&rdquo; The opposite is usually true: originals have the most metadata, and derivatives lose it.
    </p>

    <h2>Comparing EXIF across a batch</h2>
    <p>
      A spreadsheet view of EXIF across a folder of photos is powerful for auditing:
    </p>
    <ul>
      <li>Sort by DateTimeOriginal to build a timeline even without filename dates.</li>
      <li>Group by Make/Model to see which camera produced which images.</li>
      <li>Filter by GPS presence to spot unstripped location data.</li>
      <li>Sort by ISO to find the high-noise shots worth editing.</li>
      <li>Cross-check Software field to catch files passed through editing tools.</li>
    </ul>
    <p>
      Command-line <code>exiftool</code> can export CSV for this; web tools increasingly offer the same as a &ldquo;batch info&rdquo; mode.
    </p>

    <h2>Raw files and proprietary metadata</h2>
    <p>
      Camera raw files (CR3, NEF, ARW, DNG) contain far richer metadata than JPEGs &mdash; white balance as set, autofocus point used, image stabilization state, even the exact orientation sensor readings. Most web viewers strip these proprietary fields or fail to parse them. For deep raw analysis, use the camera vendor&rsquo;s software or <code>exiftool</code>.
    </p>
    <p>
      Most day-to-day needs don&rsquo;t require raw-level metadata &mdash; JPEG EXIF has everything except the nichest fields. But if you&rsquo;re diagnosing a missed-focus issue or verifying a specific shot setting, the raw carries the full record.
    </p>

    <h2>Common mistakes</h2>
    <p>
      Treating EXIF as ground truth &mdash; forgetting that every field is editable with the right tool. Reading timestamps without accounting for timezone offset. Assuming GPS absence means the photo can&rsquo;t be geolocated (reverse image search and visual cues often can). Ignoring the Orientation tag and being confused by &ldquo;sideways&rdquo; raw pixels. Uploading a photo to an &ldquo;EXIF viewer&rdquo; service that secretly logs the file &mdash; prefer tools that process locally in the browser. And confusing the EXIF-embedded thumbnail with the actual image; they can differ significantly on edited files.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Our <a href="/tools/exif-viewer">EXIF viewer</a> reads all EXIF, IPTC, and XMP fields locally in the browser &mdash; files never leave your device. If your goal after inspection is to strip sensitive fields, the <a href="/tools/exif-remover">EXIF remover</a> is the next step. And for a quick sanity check on whether an image is even the size you think it is, the <a href="/tools/image-dimensions-checker">image dimensions checker</a> gives you width, height, and file size at a glance.
    </p>
  </>
);
