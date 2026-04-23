import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      A kilobyte is 1,000 bytes, except when it&rsquo;s 1,024 bytes, and the answer depends on
      who you ask and when. RAM manufacturers and operating systems use powers of two
      (1,024&nbsp;= 2<sup>10</sup>), because memory is physically organized in binary.
      Storage manufacturers (hard drives, SSDs) use powers of ten, because the marketing
      numbers look larger. IEC 60027-2 resolved this in 1998 by giving the binary versions
      their own prefix (KiB, MiB, GiB) and keeping the decimal prefixes (KB, MB, GB) for base
      ten. Almost nobody follows that cleanly. Network bandwidth is usually measured in bits
      per second, not bytes per second, which adds a factor-of-8 confusion when comparing
      &ldquo;100 Mbps internet&rdquo; with &ldquo;100 MB/s disk.&rdquo; This guide covers
      bits and bytes, decimal versus binary prefixes, the IEC standard, bandwidth versus
      storage, and how to translate between the three worlds without getting the answer off
      by 10% or 1,000&times;.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>Bits and bytes</h2>
    <p>
      A <strong>bit</strong> is a single binary digit&mdash;0 or 1. A <strong>byte</strong> is
      8 bits, enough to represent 256 distinct values or one ASCII character. Lowercase b
      means bit (Mbps = megabits per second); uppercase B means byte (MB = megabyte). Mixing
      them up gives 8&times; errors.
    </p>
    <pre>{`1 byte (B)  = 8 bits (b)
1 nibble    = 4 bits (half a byte)

"100 Mbps" = 100 megabits per second = 12.5 MB/s
"100 MB/s" = 100 megabytes per second = 800 Mbps`}</pre>

    <h2>Decimal prefixes (SI / storage marketing)</h2>
    <pre>{`1 KB  = 1,000 B         (kilobyte, SI)
1 MB  = 1,000 KB = 1,000,000 B
1 GB  = 1,000 MB = 10⁹ B
1 TB  = 1,000 GB = 10¹² B
1 PB  = 1,000 TB = 10¹⁵ B
1 EB  = 1,000 PB = 10¹⁸ B`}</pre>
    <p>
      Storage manufacturers quote disk sizes in decimal. A &ldquo;1 TB&rdquo; hard drive holds
      10<sup>12</sup> = 1,000,000,000,000 bytes. When the operating system reports it,
      Windows (using binary interpretation) shows it as roughly 931 GB, which is where users
      feel cheated. The drive is the size the label says in decimal, and 931 in binary.
    </p>

    <h2>Binary prefixes (IEC 60027-2)</h2>
    <pre>{`1 KiB = 1,024 B              (kibibyte)
1 MiB = 1,024 KiB = 2²⁰ B    = 1,048,576 B
1 GiB = 1,024 MiB = 2³⁰ B    = 1,073,741,824 B
1 TiB = 1,024 GiB = 2⁴⁰ B    = 1,099,511,627,776 B
1 PiB = 1,024 TiB = 2⁵⁰ B`}</pre>
    <p>
      The IEC introduced these prefixes in 1998 specifically to disambiguate. &ldquo;Kibi,&rdquo;
      &ldquo;mebi,&rdquo; &ldquo;gibi&rdquo; sound awkward but they&rsquo;re unambiguous.
      Linux distributions, some server tools, and a growing number of software vendors use
      them. Windows and Apple still show binary values with the decimal names (GB meaning
      GiB), which is the primary source of confusion.
    </p>

    <h2>The KB vs KiB discrepancy</h2>
    <p>
      The gap grows with scale:
    </p>
    <pre>{`Unit  Decimal       Binary         Discrepancy
KB    1,000         1,024           2.4%
MB    1,000,000     1,048,576       4.9%
GB    10⁹           1.07 × 10⁹      7.4%
TB    10¹²          1.10 × 10¹²     9.9%
PB    10¹⁵          1.13 × 10¹⁵    12.6%`}</pre>
    <p>
      At the gigabyte scale, the &ldquo;missing 7%&rdquo; of your new hard drive is the
      decimal-vs-binary gap, not a manufacturer cheat. At terabyte scale, it&rsquo;s 10% of
      the label.
    </p>

    <h2>Memory uses binary; storage uses decimal</h2>
    <p>
      RAM modules and CPU caches are sold in binary amounts because memory chips are
      organized in power-of-two rows and columns. A 16 GB DIMM really holds 16 &times;
      1,073,741,824 = 17.18 billion bytes. Storage devices (HDD, SSD, USB sticks) are sold in
      decimal: a &ldquo;2 TB&rdquo; SSD holds 2 &times; 10<sup>12</sup> = 2 trillion bytes.
      Operating systems often show both kinds of sizes in binary with decimal labels, which
      is why disk space always looks smaller than advertised and memory never does.
    </p>

    <h2>Bandwidth vs storage</h2>
    <p>
      Network speed is quoted in <strong>bits per second</strong>. Storage speed is usually in
      <strong>bytes per second</strong>. To compare:
    </p>
    <pre>{`100 Mbps internet = 100,000,000 bits/s = 12.5 MB/s
1 Gbps fiber      = 1,000,000,000 bits/s = 125 MB/s
10 Gbps backbone  = 1.25 GB/s

Home Wi-Fi rated "1200 Mbps" delivers ~150 MB/s at best.
Downloading a 1 GB file on 100 Mbps takes about 80 seconds
(not 10 seconds, because of the factor of 8).`}</pre>

    <h2>File sizes in practice</h2>
    <pre>{`Plain text email       ~10 KB
JPEG photo (phone)     2-5 MB
MP3 song (3.5 min)     ~3.5 MB
1080p video (1 min)    ~130 MB
4K video (1 min)       ~400 MB
Linux ISO              ~3 GB
Full-resolution movie  ~50 GB (Blu-ray quality)
Large dataset          ~1 TB+`}</pre>

    <h2>Throughput math</h2>
    <p>
      To estimate download time, divide file size by bandwidth after converting both to the
      same unit. A 4 GB movie on a 50 Mbps connection: 4 GB &times; 8 = 32 Gb; 32 Gb / 0.05
      Gbps = 640 s = 10.7 minutes. Real-world throughput is typically 60&ndash;80% of
      advertised bandwidth due to protocol overhead, so plan on 14 minutes.
    </p>

    <h2>Block sizes and filesystems</h2>
    <p>
      Filesystems allocate space in blocks (typically 4 KiB on modern systems). A 1-byte file
      still consumes 4 KiB on disk. When you have millions of small files, the difference
      between their sum of sizes and their actual disk usage can be dramatic. Tools like
      <code>du</code> on Unix report actual block usage; tools that sum file metadata
      report logical size.
    </p>

    <h2>Base64 and text encoding overhead</h2>
    <p>
      When binary data is Base64-encoded for text transport, it inflates by 33%. A 1 MB image
      becomes a 1.33 MB string. JSON-encoded binary (via Base64) in a web API carries this
      tax. For large payloads, use binary transport (gRPC, multipart) instead.
    </p>

    <h2>How to report sizes honestly</h2>
    <p>
      Specify your base explicitly if the audience might care: &ldquo;500 GB (500,000,000,000
      bytes)&rdquo; or &ldquo;512 GiB (binary)&rdquo; removes ambiguity. Software vendors
      increasingly use IEC prefixes (KiB, MiB, GiB) in documentation but still show decimal
      prefixes to users because &ldquo;MB&rdquo; is more recognizable.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Confusing bits and bytes.</strong> Mbps is bits per second; MB/s is bytes per
      second. The ratio is 8. A 100 Mbps internet plan gives you 12.5 MB/s downloads, not 100.
    </p>
    <p>
      <strong>Assuming GB means 1,073,741,824 bytes.</strong> Modern documentation treats GB
      as decimal (10<sup>9</sup>) and GiB as binary (2<sup>30</sup>). Windows still uses GB
      for binary values, which confuses comparisons between OS reports and drive labels.
    </p>
    <p>
      <strong>Comparing Windows GB to storage label GB.</strong> Your 1 TB drive shows as 931
      GB in Windows because Windows uses binary GB (really GiB) and the drive is labeled in
      decimal TB. Nothing is missing.
    </p>
    <p>
      <strong>Ignoring protocol overhead.</strong> Advertised 100 Mbps delivers 60&ndash;80
      Mbps in practice after TCP/IP headers, retransmissions, and Wi-Fi encoding. Plan
      accordingly.
    </p>
    <p>
      <strong>Using &ldquo;KB&rdquo; to mean 1,024 in some places and 1,000 in others.</strong>
      Pick a convention per document and stick with it. Prefer KiB/MiB when binary is what you
      mean.
    </p>
    <p>
      <strong>Summing logical file sizes to estimate disk usage.</strong> A directory of 1,000
      tiny files takes more disk space than a text file of the summed bytes, because of block
      allocation. Use <code>du</code>, not a recursive list of sizes.
    </p>
    <p>
      <strong>Assuming Base64 is &ldquo;just text.&rdquo;</strong> It inflates binary by 33%.
      For large payloads, this matters for bandwidth bills and memory use.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Paste any data size into our{" "}
      <a href="/tools/data-size-converter">data size converter</a> to see both decimal (KB,
      MB, GB) and binary (KiB, MiB, GiB) values side by side. Pair it with the{" "}
      <a href="/tools/base64-encoder-decoder">Base64 encoder</a> for sanity-checking the
      post-encoding size of binary data, and the{" "}
      <a href="/tools/unit-converter">unit converter</a> for the broader family of scale
      conversions where you also need distance or time.
    </p>
  </>
);
