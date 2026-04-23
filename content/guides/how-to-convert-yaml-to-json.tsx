import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      YAML and JSON represent the same data but solve different
      problems. YAML is human-friendly (Kubernetes manifests, CI
      configs, Docker Compose). JSON is machine-friendly (APIs,
      tokens, logs). Converting between them sounds trivial but
      has gotchas: YAML is a superset of JSON, but YAML features
      like anchors, multi-line strings, and implicit typing
      don&rsquo;t survive a round-trip without care. This guide
      covers the conversion rules, YAML features that need
      attention, numeric precision, comments, anchors/aliases,
      round-tripping, and when to use which format.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The basic mapping</h2>
    <p>
      YAML 1.2 is a strict superset of JSON, so any valid JSON is
      valid YAML. Going the other way drops features. Core mappings:
    </p>
    <p>
      <strong>YAML mapping:</strong> <code>key: value</code> →{" "}
      <strong>JSON object:</strong> <code>&#123;&ldquo;key&rdquo;: &ldquo;value&rdquo;&#125;</code>
    </p>
    <p>
      <strong>YAML sequence:</strong> <code>- item</code> (with
      hyphens and indentation) → <strong>JSON array:</strong>{" "}
      <code>[&ldquo;item&rdquo;]</code>
    </p>
    <p>
      <strong>YAML scalar:</strong> <code>name: Alice</code> →{" "}
      <strong>JSON string:</strong> <code>&ldquo;Alice&rdquo;</code>
    </p>
    <p>
      The conversion of structure is mechanical. The interesting
      part is the scalars.
    </p>

    <h2>Implicit typing — the Norway problem</h2>
    <p>
      YAML guesses types for unquoted scalars. <code>true</code>,{" "}
      <code>false</code>, <code>yes</code>, <code>no</code>,{" "}
      <code>on</code>, <code>off</code>, <code>null</code>, <code>~</code>
      {" "}become booleans/null. Numbers become int or float. This
      leads to the famous &ldquo;Norway problem&rdquo;:
    </p>
    <pre>
{`countries:
  - GB
  - NO   # Parsed as boolean false in YAML 1.1`}
    </pre>
    <p>
      YAML 1.1 (still used by PyYAML by default!) treats{" "}
      <code>NO</code> as <code>false</code>. JSON output gets{" "}
      <code>[&ldquo;GB&rdquo;, false]</code> — wrong.
    </p>
    <p>
      <strong>Fix:</strong> use YAML 1.2 parsers (ruamel.yaml, js-yaml
      4+, go-yaml v3) or quote values: <code>- &ldquo;NO&rdquo;</code>.
    </p>

    <h2>Numbers and precision</h2>
    <p>
      YAML parses <code>01</code> as 1, <code>0x1f</code> as 31,{" "}
      <code>1.5e3</code> as 1500, <code>.inf</code> as infinity,{" "}
      <code>.nan</code> as NaN. JSON doesn&rsquo;t support
      infinity or NaN — those become <code>null</code> or errors.
    </p>
    <p>
      <strong>Leading zeros:</strong> <code>version: 007</code>{" "}
      becomes <code>7</code> in JSON — the zero-padding is lost.
      Quote it: <code>version: &ldquo;007&rdquo;</code>.
    </p>
    <p>
      <strong>Large numbers:</strong> YAML supports arbitrary
      precision in some parsers, JSON is spec-limited to 64-bit
      double. Numbers beyond Number.MAX_SAFE_INTEGER (9.007 × 10¹⁵)
      silently lose precision. Output as strings for IDs:{" "}
      <code>&ldquo;1234567890123456789&rdquo;</code>.
    </p>

    <h2>Multi-line strings</h2>
    <p>
      YAML has several multi-line styles, all collapse to JSON string
      with escaped newlines:
    </p>
    <pre>
{`literal: |
  Line 1
  Line 2      # Keeps newlines

folded: >
  Long paragraph
  that wraps     # Newlines become spaces

plain: "With \\n escapes"`}
    </pre>
    <p>
      JSON output: <code>&ldquo;Line 1\nLine 2&rdquo;</code> for the
      literal block. Indentation of the block becomes part of the
      content if it&rsquo;s inside the block start.
    </p>

    <h2>Comments disappear</h2>
    <p>
      JSON has no comments. Every YAML comment is lost in
      conversion. If comments matter (Kubernetes manifests are
      heavily commented), either keep the YAML source of truth or
      use JSON with a comment-preserving extension like JSON5 /
      JSONC.
    </p>

    <h2>Anchors and aliases</h2>
    <p>
      YAML supports references to repeated content:
    </p>
    <pre>
{`defaults: &defaults
  port: 8080
  host: localhost

server1:
  <<: *defaults
  name: primary

server2:
  <<: *defaults
  name: secondary`}
    </pre>
    <p>
      JSON has no anchors — converters expand them, producing
      duplicated objects. If you go back to YAML, you&rsquo;ll have
      lost the shared reference and doubled file size on large
      configs.
    </p>
    <p>
      <strong>Workaround:</strong> if the YAML is source-of-truth,
      keep it in YAML and generate JSON downstream. Don&rsquo;t
      round-trip.
    </p>

    <h2>Keys can be any type in YAML</h2>
    <p>
      YAML allows non-string keys:
    </p>
    <pre>
{`? [a, b]
: "tuple key"
42: "number key"
true: "boolean key"`}
    </pre>
    <p>
      JSON keys must be strings. Converters either stringify (
      <code>&ldquo;[a,b]&rdquo;</code>, <code>&ldquo;42&rdquo;</code>)
      or error. Most real-world YAML only uses string keys so this
      is rare, but watch for boolean/numeric keys that silently
      coerce.
    </p>

    <h2>Choosing parsers</h2>
    <p>
      <strong>js-yaml (Node.js):</strong> YAML 1.2 by default in v4+.
      Fast, widely used.
    </p>
    <p>
      <strong>ruamel.yaml (Python):</strong> YAML 1.2, preserves
      comments and formatting on round-trip. Best Python option.
    </p>
    <p>
      <strong>PyYAML (Python):</strong> YAML 1.1 only. Has the Norway
      problem. Avoid for new projects.
    </p>
    <p>
      <strong>go-yaml.v3:</strong> YAML 1.2, supports preserving
      comments via AST.
    </p>
    <p>
      <strong>yq:</strong> command-line tool — <code>yq -o json
      config.yaml</code> converts quickly.
    </p>

    <h2>When to use YAML vs JSON</h2>
    <p>
      <strong>YAML is better for:</strong> human-edited configs
      (CI/CD, Kubernetes, Docker Compose, Ansible), long files where
      comments help, anywhere DRY through anchors adds value.
    </p>
    <p>
      <strong>JSON is better for:</strong> APIs, data interchange
      between services, log formats, anything machine-generated or
      parsed at scale. JavaScript parses it natively.
    </p>
    <p>
      <strong>Common pattern:</strong> YAML source in version
      control, JSON at runtime. Convert on build or first load.
    </p>

    <h2>Round-tripping</h2>
    <p>
      YAML → JSON → YAML isn&rsquo;t lossless. You lose:
    </p>
    <p>
      Comments.
    </p>
    <p>
      Original scalar styles (quoted vs plain vs block).
    </p>
    <p>
      Anchor/alias references (expanded).
    </p>
    <p>
      Non-string keys (stringified).
    </p>
    <p>
      Ordering (JSON objects are unordered; re-serialized YAML may
      sort keys).
    </p>
    <p>
      If you need to modify YAML programmatically and preserve
      formatting, use comment-aware parsers (ruamel.yaml in Python,
      yaml-edit-ts in JS) that keep the source AST, not the naive
      convert-modify-serialize loop.
    </p>

    <h2>Validating output</h2>
    <p>
      After conversion, validate the JSON against your expected
      schema. Most bugs are silent type changes (boolean that
      should&rsquo;ve been string, number that should&rsquo;ve been
      string to preserve zeros).
    </p>
    <p>
      JSON Schema catches type drift. Also diff small samples
      manually to make sure keys survived.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using YAML 1.1 parser for modern YAML.</strong> Boolean
      coercion bugs everywhere. Upgrade to a 1.2 parser.
    </p>
    <p>
      <strong>Not quoting version strings.</strong>{" "}
      <code>version: 1.0</code> becomes <code>1</code> (float). Use{" "}
      <code>version: &ldquo;1.0&rdquo;</code>.
    </p>
    <p>
      <strong>Assuming comments survive.</strong> They don&rsquo;t
      unless your tooling explicitly preserves them in both
      directions.
    </p>
    <p>
      <strong>Round-tripping as a refactor.</strong> YAML → JSON →
      YAML will expand anchors and reformat. If the YAML is
      human-maintained, don&rsquo;t round-trip.
    </p>
    <p>
      <strong>Exceeding JSON number precision.</strong> Large IDs
      and timestamps need string representation in JSON.
    </p>
    <p>
      <strong>Trusting implicit types.</strong> Quote any string
      that looks like a boolean, number, date, or null.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert between YAML and JSON with the{" "}
      <a href="/tools/yaml-json-converter">YAML ↔ JSON converter</a>.
      Pair with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to pretty-print
      and validate the output, and the{" "}
      <a href="/tools/json-schema-generator">JSON schema generator</a>
      {" "}to lock down the structure.
    </p>
  </>
);
