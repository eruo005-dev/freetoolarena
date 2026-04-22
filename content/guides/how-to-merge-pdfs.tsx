import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      Merging PDFs sounds trivial until you&rsquo;re sitting on five tax documents the
      accountant needs as one file, or a signed contract and its amendments that have
      to ship as a single packet. Most people reach for the first Google result, upload
      sensitive paperwork to a random site, and hope for the best. You don&rsquo;t need
      to. This guide covers when merging actually helps, the privacy trap you want to
      avoid, and the handful of gotchas that catch people out.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>When merging actually makes sense</h2>
    <p>
      The three scenarios that come up constantly: tax season (W-2, 1099s, receipts,
      schedules rolled into one file for your CPA), signed contracts (original plus
      signature pages that came back in separate emails), and portfolios (3-8 sample
      PDFs sent as one link instead of a cluttered zip). In all three, the recipient
      wants <em>one</em> thing, in order, that opens on the first tap.
    </p>
    <p>
      Merging is also the right move any time you&rsquo;re about to email 4+ attachments.
      One file is harder to lose, easier to archive, and usually smaller than the sum
      of the parts.
    </p>

    <h2>The upload-to-shady-site problem</h2>
    <p>
      Search &ldquo;merge pdf&rdquo; and most of the top results ask you to upload your
      files to their server. For a recipe PDF, fine. For a 1040 with your SSN, a signed
      lease, or a medical form — absolutely not. You have no idea how long they keep
      it, who has access, or whether it gets fed into a training set.
    </p>
    <p>
      The safer pattern is a browser-based tool that does the merge locally, where the
      PDF never leaves your device. Our{" "}
      <a href="/tools/merge-pdf">merge PDF tool</a> runs in your browser — drag files
      in, reorder, download. Nothing hits a server.
    </p>

    <h2>When Acrobat still wins</h2>
    <p>
      For pure merging, a free in-browser tool beats Acrobat on speed and convenience.
      But Acrobat still earns its price tag for three things: redlining and comparing
      two contract versions, filling and flattening complex forms, and working with
      PDF/A archival requirements. If you&rsquo;re a lawyer or a compliance team, keep
      the license. For everyone else, you probably only need it once a quarter.
    </p>

    <h2>Password-protected files</h2>
    <p>
      The single most common failure: one of the PDFs you&rsquo;re merging is password-
      protected. Some tools silently skip it, some error out, some merge an empty page.
      Unlock it first (open in any PDF viewer, print to PDF as a new file, or use the
      owner password), <em>then</em> merge. If you can&rsquo;t unlock it legitimately,
      you shouldn&rsquo;t be merging it.
    </p>

    <h2>What gets lost in the merge</h2>
    <p>
      Page content, fonts, and embedded images survive cleanly. What doesn&rsquo;t:
      global bookmarks (each source file&rsquo;s bookmarks usually don&rsquo;t carry
      through, or they collide), form fields (fillable forms frequently break on merge
      — flatten first), and digital signatures (merging invalidates them, because the
      signed bytes change).
    </p>
    <p>
      If a signed PDF is part of your packet, merge the unsigned pages first, then
      attach the signed file separately, or re-sign the combined packet at the end.
      Don&rsquo;t merge a signed PDF and send it expecting the signature to hold.
    </p>

    <h2>Handling huge files</h2>
    <p>
      A 200-page scanned PDF can easily be 80MB. Merge two of those and you&rsquo;ve
      blown past Gmail&rsquo;s 25MB attachment limit. Two options: compress the output
      (scans compress dramatically — often 80MB down to 10MB with no visible loss), or
      ship via a link instead of an attachment. If it&rsquo;s mostly scans, run it
      through a compressor before emailing.
    </p>

    <h2>A simple workflow</h2>
    <p>
      Rename each source file with a number prefix (<code>01-w2.pdf</code>,{" "}
      <code>02-1099.pdf</code>) so the order is obvious. Drop them all into the merger
      at once. Eyeball the first and last page of the output to make sure nothing got
      duplicated or dropped. Save with a clear filename that includes the date. Three
      minutes, done, and you have one clean file you can hand off without thinking
      about it again.
    </p>
  </>
);
