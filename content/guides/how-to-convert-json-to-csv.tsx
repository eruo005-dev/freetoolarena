import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      JSON and CSV are the two formats data bounces between most
      often. JSON is nested and hierarchical; CSV is flat and
      tabular. Converting between them sounds trivial and usually
      is, until you hit the edges: nested objects, arrays as
      values, mixed schemas, special characters, tens of millions
      of rows, or Excel&rsquo;s opinions about what a CSV looks
      like. This guide covers the conversion rules that actually
      matter, how to handle nested data (flatten vs spread),
      encoding and delimiter pitfalls, streaming for large files,
      the Excel quirks that break normal CSVs, and when to reach
      for a proper ETL pipeline instead.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The happy-path conversion</h2>
    <p>
      JSON that&rsquo;s already tabular (array of flat objects) maps
      1:1 to CSV:
    </p>
    <pre>
{`[
  { "name": "Alice", "age": 30, "city": "NYC" },
  { "name": "Bob", "age": 25, "city": "LA" }
]`}
    </pre>
    <p>Becomes:</p>
    <pre>
{`name,age,city
Alice,30,NYC
Bob,25,LA`}
    </pre>
    <p>
      Header row uses object keys. Column order is either
      insertion order or alphabetical (choose explicitly — don&rsquo;t
      let your tool decide).
    </p>

    <h2>Nested data — flatten or spread</h2>
    <p>
      Nested JSON doesn&rsquo;t fit in flat CSV. Three common
      strategies:
    </p>
    <p>
      <strong>Dot-path flatten:</strong>{" "}
      <code>user.address.city</code> becomes a column named{" "}
      <code>user.address.city</code>. Clean for single-level
      nesting; awkward for deep or variable structures.
    </p>
    <p>
      <strong>JSON-in-cell:</strong> put nested objects or arrays
      as escaped JSON strings in a single column:{" "}
      <code>{`"[{\\"id\\":1}]"`}</code>. Preserves everything, but
      you can&rsquo;t analyze it without re-parsing.
    </p>
    <p>
      <strong>Explode:</strong> turn an array into multiple rows,
      duplicating parent fields. One row per array element. Lossy
      in the reverse direction (can&rsquo;t reconstruct the
      original structure).
    </p>
    <p>
      <strong>Choose based on consumer:</strong> analysts in Excel
      want exploded rows; data warehouses want dot-paths; export
      pipelines want JSON-in-cell.
    </p>

    <h2>Schema variance — when rows have different keys</h2>
    <p>
      If JSON objects don&rsquo;t all share the same keys, CSV
      forces a choice:
    </p>
    <p>
      <strong>Union headers:</strong> include every key that
      appears anywhere. Rows leave unused cells empty. Default for
      most converters.
    </p>
    <p>
      <strong>Intersection headers:</strong> include only keys
      present in every row. Drops data but produces consistent
      rows.
    </p>
    <p>
      <strong>First-object schema:</strong> use only keys from the
      first object. Silently drops data from later rows that have
      extra keys. Avoid.
    </p>
    <p>
      Union is usually what you want. Warn the user (or log) when
      rows have missing keys so they know data gaps exist.
    </p>

    <h2>Quoting and escaping</h2>
    <p>
      CSV rules (per RFC 4180):
    </p>
    <p>
      Fields containing commas, newlines, or double quotes must be
      wrapped in double quotes.
    </p>
    <p>
      Double quotes inside a quoted field are escaped by doubling:{" "}
      <code>{`"She said \\"hi\\""`}</code>.
    </p>
    <p>
      Newlines inside quoted fields are literal — parsers must
      handle multi-line rows.
    </p>
    <p>
      <strong>Gotcha:</strong> many tools (and people) fail on
      newlines in fields. Some normalize to spaces; some corrupt
      the CSV; some produce broken output that opens in Excel
      anyway.
    </p>

    <h2>Delimiter wars</h2>
    <p>
      CSV is &ldquo;comma-separated values&rdquo; — except when
      it&rsquo;s not.
    </p>
    <p>
      <strong>Comma (,):</strong> US default. Breaks on international
      data with European number formats.
    </p>
    <p>
      <strong>Semicolon (;):</strong> European default. Excel uses
      it for locales where comma is the decimal separator (France,
      Germany).
    </p>
    <p>
      <strong>Tab (\t):</strong> &ldquo;TSV.&rdquo; Safer than comma
      because tab rarely appears in real text.
    </p>
    <p>
      <strong>Pipe (|):</strong> sometimes used for data exchange.
      Even rarer in natural text.
    </p>
    <p>
      <strong>Rule:</strong> TSV is easier than CSV to produce
      correctly but harder for humans to eyeball. For shipping
      data between systems, prefer TSV. For end users in Excel,
      use locale-aware CSV.
    </p>

    <h2>Encoding — UTF-8 with (or without) BOM</h2>
    <p>
      CSV files have no header declaring their encoding. You find
      out by trying.
    </p>
    <p>
      <strong>UTF-8 without BOM:</strong> universal default.
    </p>
    <p>
      <strong>UTF-8 with BOM:</strong> Excel on Windows needs the
      BOM to auto-detect UTF-8. Without it, non-ASCII characters
      (é, ñ, 日) display as garbage on Excel Windows.
    </p>
    <p>
      <strong>CP1252 / Windows-1252:</strong> legacy encoding some
      Windows tools export by default. Breaks on any character
      outside the 255 it supports.
    </p>
    <p>
      <strong>UTF-16:</strong> some Excel versions save as UTF-16
      if you &ldquo;Save as Unicode Text.&rdquo; Uncommon now but
      stare at failing imports and you&rsquo;ll see it eventually.
    </p>
    <p>
      <strong>Serving CSV for Excel?</strong> UTF-8 with BOM.
      Otherwise UTF-8 without BOM.
    </p>

    <h2>Large files — stream, don&rsquo;t load</h2>
    <p>
      Loading a 500MB JSON file into memory to write CSV → OOM.
      Stream:
    </p>
    <p>
      <strong>Streaming JSON parsers:</strong> JavaScript{" "}
      <code>stream-json</code>, Python <code>ijson</code>, Go{" "}
      <code>jsonitr</code>. Read objects one at a time as the file
      is read.
    </p>
    <p>
      <strong>Streaming CSV writers:</strong> write row-by-row as
      you read JSON. Flush often. Back-pressure if writing to
      network.
    </p>
    <p>
      <strong>Line-delimited JSON (NDJSON):</strong> if your source
      is already one JSON object per line, converting is trivial —
      read line, parse, write CSV row, repeat. Often the best
      choice for data warehousing.
    </p>

    <h2>Excel&rsquo;s opinions</h2>
    <p>
      Excel thinks it knows what your CSV should look like. It
      doesn&rsquo;t.
    </p>
    <p>
      <strong>Leading zeros stripped:</strong>{" "}
      <code>01234</code> becomes <code>1234</code>. Force text by
      prefixing with <code>=&quot;01234&quot;</code> or formatting
      the column as text after import.
    </p>
    <p>
      <strong>Scientific notation for long numbers:</strong>{" "}
      <code>1234567890123456</code> becomes{" "}
      <code>1.23457E+15</code>. Long IDs, phone numbers, credit
      card numbers all corrupt.
    </p>
    <p>
      <strong>Dates reformatted:</strong> <code>2026-04-22</code>
      {" "}might become <code>22/04/2026</code> or <code>4/22/2026</code>
      {" "}depending on locale. Pre-format as text or use ISO 8601
      strings the user won&rsquo;t autoformat.
    </p>
    <p>
      <strong>Gene names turned into dates:</strong> famous gotcha
      — SEPT1 becomes 1-Sep. Affects bioinformatics so much that
      some genes were renamed to avoid Excel.
    </p>
    <p>
      <strong>Save-as-CSV round-trip corrupts:</strong> Excel saves
      CSVs in locale-specific format. Open, save, and CSVs can
      change delimiter, encoding, and date format silently.
    </p>

    <h2>CSV to JSON — the reverse</h2>
    <p>
      Similar rules, reversed:
    </p>
    <p>
      Header row → JSON keys.
    </p>
    <p>
      Each data row → one JSON object.
    </p>
    <p>
      Type inference: try to parse as number, fallback to string.
      Some converters infer booleans and nulls; some don&rsquo;t.
      Be explicit about your type expectations.
    </p>
    <p>
      Missing values: empty string, <code>null</code>, or missing
      key? Pick one and document it.
    </p>

    <h2>When CSV is the wrong format</h2>
    <p>
      <strong>Deeply nested data:</strong> CSV loses structure.
      Use JSONL or Parquet.
    </p>
    <p>
      <strong>Files &gt; 10GB:</strong> Parquet or Arrow for
      columnar analytics; CSV is slow.
    </p>
    <p>
      <strong>Typed data that matters:</strong> JSON or Parquet
      preserve types; CSV loses them.
    </p>
    <p>
      <strong>Binary content:</strong> never CSV. Base64 encode
      into JSON, or use a binary-native format.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Assuming comma is safe.</strong> Any text with a
      comma — addresses, descriptions, quoted text — must be
      properly quoted. Use the library, don&rsquo;t concatenate.
    </p>
    <p>
      <strong>Forgetting the header row.</strong> CSV without
      headers is ambiguous. Always include headers unless the
      format explicitly forbids them.
    </p>
    <p>
      <strong>Mixing quoted and unquoted fields inconsistently.</strong>
      RFC 4180 allows it; parsers often don&rsquo;t. Quote
      everything or nothing.
    </p>
    <p>
      <strong>Using Excel as the converter.</strong> Excel corrupts
      numbers, dates, and encoding. Script the conversion; use
      Excel to view.
    </p>
    <p>
      <strong>Ignoring line endings.</strong> CRLF (Windows) vs LF
      (Unix) can break naive parsers. RFC 4180 says CRLF; reality
      is messier.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert JSON to CSV instantly with the{" "}
      <a href="/tools/json-to-csv">JSON to CSV converter</a>. Pair
      with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to clean
      up your JSON first, and the{" "}
      <a href="/tools/csv-to-json">CSV to JSON converter</a> for
      the reverse direction.
    </p>
  </>
);
