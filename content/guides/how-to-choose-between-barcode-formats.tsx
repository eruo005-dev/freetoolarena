import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Barcodes look interchangeable — black bars on white, a scanner
      beep, a lookup — but they&rsquo;re not. Code 128 carries
      arbitrary ASCII; EAN-13 is locked to 13 digits; QR codes hold
      kilobytes; Data Matrix survives damage. Picking the wrong
      format means failed scans, rejected shipments, or retail
      compliance violations. This guide covers the dominant linear
      and 2D formats, what each is actually for, data capacity,
      scanner compatibility, print-size minimums, check-digit rules,
      and the defaults that get you to a working label without
      surprises.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Linear vs 2D — the first decision</h2>
    <p>
      <strong>Linear (1D) barcodes</strong> encode data in bar
      widths along a single axis. Simple, legacy-compatible, work
      with cheap laser scanners. Limited capacity (typically 20-40
      characters).
    </p>
    <p>
      <strong>2D barcodes</strong> encode data in a matrix (grid of
      squares or dots). Much higher capacity — QR codes hold up to
      ~3 KB. Require camera-based or imaging scanners (universal in
      2026 — every smartphone qualifies).
    </p>
    <p>
      Rule of thumb: if you&rsquo;re encoding a few digits and need
      retail-counter compatibility, go linear. If you&rsquo;re
      encoding URLs, JSON payloads, or anything over 20 characters,
      go 2D.
    </p>

    <h2>The linear formats you&rsquo;ll actually encounter</h2>
    <p>
      <strong>UPC-A:</strong> 12 digits. Dominant in North American
      retail. Required for product listings at most big-box
      retailers. First digit = product category; next 5 = manufacturer
      code; next 5 = product; last = check digit.
    </p>
    <p>
      <strong>EAN-13:</strong> 13 digits. International retail
      standard. A superset of UPC-A — a UPC-A barcode is an EAN-13
      with a leading zero. Use EAN-13 for European/Asian markets.
    </p>
    <p>
      <strong>EAN-8:</strong> 8 digits. Compact version for very
      small products (lipstick, gum). Limited product-code space;
      rarely used for new allocations.
    </p>
    <p>
      <strong>Code 128:</strong> encodes all 128 ASCII characters,
      variable length. The workhorse of shipping and logistics —
      FedEx, UPS, USPS all use it. Denser than Code 39 for the same
      data.
    </p>
    <p>
      <strong>Code 39:</strong> uppercase letters, digits, and a few
      symbols. Older, less dense than Code 128, but still required
      in some government and automotive workflows (AIAG).
    </p>
    <p>
      <strong>ITF-14 (Interleaved 2 of 5):</strong> 14 digits. Used
      on shipping cartons that contain retail units — the &ldquo;
      outer box&rdquo; code.
    </p>

    <h2>The 2D formats — use when you need capacity</h2>
    <p>
      <strong>QR Code:</strong> the dominant 2D format. Up to 7089
      digits or ~2953 bytes. Reads from any angle (position markers
      in 3 corners). Error correction up to 30% damage. Native
      camera support on every smartphone since ~2018. Default choice
      for anything consumer-facing.
    </p>
    <p>
      <strong>Data Matrix:</strong> very compact (smallest 2D format
      at small sizes). Dominant in industrial marking, medical
      device traceability, and small electronics. Reads at tiny
      sizes — can print on a 2mm square.
    </p>
    <p>
      <strong>PDF417:</strong> stacked linear format. Used on
      driver&rsquo;s licenses, boarding passes, shipping labels where
      a rectangular aspect ratio fits better than a square.
    </p>
    <p>
      <strong>Aztec Code:</strong> similar capacity to QR; used on
      transit tickets (especially European rail), airline boarding
      passes. Central bullseye is the position marker.
    </p>
    <p>
      <strong>MaxiCode:</strong> UPS-specific format for package
      routing.
    </p>

    <h2>Data capacity at a glance</h2>
    <p>
      <strong>UPC/EAN:</strong> 8-13 digits only.
    </p>
    <p>
      <strong>Code 39:</strong> ~40 uppercase-alphanumeric characters
      practical max.
    </p>
    <p>
      <strong>Code 128:</strong> ~80 ASCII characters practical max.
    </p>
    <p>
      <strong>Data Matrix:</strong> up to 2335 ASCII characters.
    </p>
    <p>
      <strong>QR Code:</strong> up to 4296 alphanumeric or 2953
      binary bytes.
    </p>
    <p>
      <strong>PDF417:</strong> up to 1850 ASCII characters.
    </p>

    <h2>Retail compliance — not optional</h2>
    <p>
      <strong>Selling on Amazon:</strong> UPC or EAN required, must be
      purchased from GS1 (the official registry). Made-up codes get
      your listing suppressed.
    </p>
    <p>
      <strong>Selling in retail stores:</strong> UPC-A (US) or EAN-13
      (Europe). Retailers scan at checkout — the code must be in the
      global GS1 database.
    </p>
    <p>
      <strong>Shipping:</strong> carriers define their own labels.
      FedEx/UPS use Code 128 for tracking numbers and MaxiCode for
      routing.
    </p>
    <p>
      <strong>Pharma (US DSCSA):</strong> Data Matrix with GS1
      application identifiers for product ID, lot, expiration, serial.
      Mandatory for prescription drug units.
    </p>

    <h2>Check digits — the silent protector</h2>
    <p>
      Most retail barcode formats include a check digit — the last
      digit, computed from the others using a modulo algorithm. A
      scanner that reads 11 of 12 UPC digits and computes a check
      that doesn&rsquo;t match rejects the scan.
    </p>
    <p>
      <strong>UPC-A / EAN-13:</strong> mod-10 weighted sum.
    </p>
    <p>
      <strong>Code 128:</strong> mod-103 checksum.
    </p>
    <p>
      <strong>QR and Data Matrix:</strong> use Reed-Solomon error
      correction, which goes further — they can recover from
      partially damaged codes, not just detect errors.
    </p>
    <p>
      <strong>Don&rsquo;t compute check digits by hand.</strong> Let
      the generator do it. Hand-calculated UPC codes are a common
      source of returned labels.
    </p>

    <h2>Print size and resolution</h2>
    <p>
      Barcodes have minimum module sizes (the width of the smallest
      bar or square). Print too small and the scanner can&rsquo;t
      resolve individual elements.
    </p>
    <p>
      <strong>UPC-A:</strong> nominal 100% size is 1.469&quot; wide,
      1.02&quot; tall. Allowed range 80-200% of nominal. Below 80%
      and scanners struggle.
    </p>
    <p>
      <strong>Code 128:</strong> minimum module typically 0.010&quot;
      at 300 DPI print. Shrinks well on thermal printers.
    </p>
    <p>
      <strong>QR Code:</strong> minimum recommended is 1cm × 1cm for
      phone scanning. Below that you need macro scanning.
    </p>
    <p>
      <strong>Quiet zone:</strong> blank space around the barcode.
      Omitting it breaks scanning. Linear codes need 10× module
      width of quiet space on each end; QR codes need 4 modules of
      white around the matrix.
    </p>

    <h2>Color and contrast</h2>
    <p>
      Barcodes need high contrast between bars and background.
    </p>
    <p>
      <strong>Black on white</strong> is the safe default.
    </p>
    <p>
      <strong>Colored barcodes</strong> can work but risk scanner
      rejection. Red bars on white fail common laser scanners (the
      laser is red and red-on-white reads as white-on-white). Dark
      blue or black on white/cream is safest.
    </p>
    <p>
      <strong>Inverted barcodes</strong> (white bars on black) work
      in 2D formats that support them but break most linear scanners.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Generating your own UPC.</strong> Retailers check GS1
      registry. A fabricated UPC gets your product delisted. Buy
      codes from GS1 or use a product-registration service.
    </p>
    <p>
      <strong>Skipping the quiet zone.</strong> Bordering a barcode
      with text or decoration right against the bars breaks scans.
    </p>
    <p>
      <strong>Using QR for data that isn&rsquo;t scanned.</strong>
      A QR code that prints on a receipt nobody photographs is
      wasted ink. Match the format to the workflow.
    </p>
    <p>
      <strong>Storing URLs in QR codes without tracking.</strong>
      If you need to change the destination later, point QR to a
      URL you control (with a redirect), not the final URL.
      Otherwise reprinting is your only option.
    </p>
    <p>
      <strong>Small, low-error-correction QR on printed materials.</strong>
      Anything physical will get scuffed. Use medium or high error
      correction (15% or 25%) on print, even if it slightly increases
      size.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate and test barcodes with the{" "}
      <a href="/tools/barcode-generator">barcode generator</a>. Pair
      with the{" "}
      <a href="/tools/qr-code-generator">QR code generator</a> when
      you need 2D codes with URL or vCard payloads, and the{" "}
      <a href="/tools/uuid-generator">UUID generator</a> if you need
      unique IDs to encode inside the barcode payload.
    </p>
  </>
);
