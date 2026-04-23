import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      TOML (Tom&rsquo;s Obvious Minimal Language) is a config-file
      format designed to be easier to read than JSON and less
      whitespace-sensitive than YAML. It powers{" "}
      <code>Cargo.toml</code>, <code>pyproject.toml</code>,{" "}
      <code>hugo.toml</code>, and many other project configs. This
      guide covers TOML syntax (scalars, tables, arrays, inline),
      how it compares to JSON and YAML, version differences (0.5 vs
      1.0), common gotchas (datetimes, nested tables, mixing dotted
      and header tables), and when to pick TOML vs the alternatives.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>The basics</h2>
    <pre>
{`title = "Example"
port = 8080
enabled = true

[server]
host = "localhost"
timeout = 30

[[plugins]]
name = "auth"
version = "1.2.0"

[[plugins]]
name = "logging"
version = "0.9.0"`}
    </pre>
    <p>
      Top-level is a table. Sections in square brackets are
      sub-tables. Double brackets <code>[[...]]</code> are arrays of
      tables.
    </p>

    <h2>Scalar types</h2>
    <p>
      <strong>String:</strong> double-quoted (with escapes) or
      literal single-quoted (raw, no escapes):{" "}
      <code>&quot;hello&quot;</code>,{" "}
      <code>&apos;raw\string&apos;</code>.
    </p>
    <p>
      <strong>Multi-line string:</strong> triple quotes —{" "}
      <code>&quot;&quot;&quot;...&quot;&quot;&quot;</code> or{" "}
      <code>&apos;&apos;&apos;...&apos;&apos;&apos;</code>.
    </p>
    <p>
      <strong>Integer:</strong>{" "}
      <code>42</code>, <code>-17</code>, <code>0xdeadbeef</code>
      {" "}(hex), <code>0o777</code> (octal), <code>0b1010</code>
      {" "}(binary).
    </p>
    <p>
      <strong>Float:</strong> <code>3.14</code>, <code>1e10</code>,{" "}
      <code>inf</code>, <code>nan</code>.
    </p>
    <p>
      <strong>Boolean:</strong> <code>true</code>,{" "}
      <code>false</code>. Lowercase only.
    </p>
    <p>
      <strong>Datetime (RFC 3339):</strong>{" "}
      <code>2026-04-22T10:30:00Z</code>, <code>2026-04-22</code>
      {" "}(date), <code>10:30:00</code> (local time).
    </p>
    <p>
      <strong>Array:</strong>{" "}
      <code>[1, 2, 3]</code>,{" "}
      <code>[&quot;a&quot;, &quot;b&quot;]</code>. Homogeneous in
      TOML 0.5 and earlier; mixed-type arrays legal in 1.0+.
    </p>

    <h2>Tables</h2>
    <p>
      A table is a set of key/value pairs. Three ways to declare:
    </p>
    <p>
      <strong>Header table:</strong>
    </p>
    <pre>
{`[server]
host = "localhost"
port = 8080`}
    </pre>
    <p>
      <strong>Inline table:</strong>
    </p>
    <pre>
{`server = { host = "localhost", port = 8080 }`}
    </pre>
    <p>
      <strong>Dotted keys:</strong>
    </p>
    <pre>
{`server.host = "localhost"
server.port = 8080`}
    </pre>
    <p>
      All three produce the same logical structure. Pick one style
      per file for readability.
    </p>

    <h2>Nested tables</h2>
    <pre>
{`[database]
url = "postgres://..."

[database.pool]
min = 2
max = 10`}
    </pre>
    <p>
      The <code>database.pool</code> header names the nested table.
      Dotted key style also works:
    </p>
    <pre>
{`[database]
url = "postgres://..."
pool.min = 2
pool.max = 10`}
    </pre>

    <h2>Arrays of tables</h2>
    <p>
      Double-bracket headers define array elements, each its own
      table:
    </p>
    <pre>
{`[[products]]
name = "Widget"
price = 9.99

[[products]]
name = "Gadget"
price = 14.99`}
    </pre>
    <p>
      Equivalent JSON:{" "}
      <code>{`"products":[{"name":"Widget",...},{"name":"Gadget",...}]`}</code>.
    </p>

    <h2>TOML vs JSON vs YAML</h2>
    <p>
      <strong>JSON:</strong> machine-to-machine. Verbose, no
      comments, bad for config.
    </p>
    <p>
      <strong>YAML:</strong> human-friendly but whitespace-sensitive.
      Subtle bugs (<code>no</code> parsing as false; unquoted{" "}
      <code>1.0</code> becoming a float). Anchors and references
      add power but confusion.
    </p>
    <p>
      <strong>TOML:</strong> config-focused. No whitespace rules.
      Comments supported. Types are explicit. Less expressive than
      YAML (no merging, no references).
    </p>
    <p>
      <strong>Rule of thumb:</strong> TOML for project config,
      JSON for API payloads and machine-generated data, YAML when
      you need anchors/overrides or match an existing ecosystem
      (Kubernetes, Ansible).
    </p>

    <h2>TOML version differences</h2>
    <p>
      <strong>0.5 → 1.0:</strong> 1.0 allows mixed-type arrays,
      clarified datetime handling, tightened redeclaration rules.
    </p>
    <p>
      <strong>Parser compatibility:</strong> old parsers may reject
      1.0 files that use mixed arrays. When sharing TOML, target
      1.0 and document it.
    </p>
    <p>
      <strong>Check parser version:</strong>{" "}
      <code>toml_edit</code> (Rust), <code>tomli</code> (Python
      3.11+ stdlib), <code>@iarna/toml</code> (JS). Check your
      parser supports 1.0 if you use mixed arrays.
    </p>

    <h2>Comments</h2>
    <pre>
{`# full-line comment
port = 8080  # inline comment`}
    </pre>
    <p>
      Start with <code>#</code>. No multi-line comment syntax.
      Comments are not preserved by most parsers unless you use a
      round-trip parser (e.g., <code>toml_edit</code>).
    </p>

    <h2>Round-trip preservation</h2>
    <p>
      Most TOML parsers throw away comments and reorder keys. For
      tools that need to edit config files while preserving
      formatting (think Cargo editing <code>Cargo.toml</code>), use
      a round-trip parser: <code>toml_edit</code> in Rust,{" "}
      <code>tomlkit</code> in Python.
    </p>

    <h2>Common gotchas</h2>
    <p>
      <strong>Redefining tables:</strong> you can&rsquo;t declare{" "}
      <code>[server]</code> twice. Second header = error.
    </p>
    <p>
      <strong>Mixing header and dotted declarations of the same
      path:</strong>
    </p>
    <pre>
{`[server]
host = "x"
server.port = 8080  # error — server already declared`}
    </pre>
    <p>
      <strong>Datetime timezone:</strong> offset datetimes vs local
      datetimes matter. <code>2026-04-22T10:30:00Z</code> is UTC;{" "}
      <code>2026-04-22T10:30:00</code> has no offset (local time).
    </p>
    <p>
      <strong>Hex/octal/binary only for integers:</strong> not for
      floats.
    </p>
    <p>
      <strong>Raw strings can&rsquo;t contain single quotes:</strong>
      {" "}use basic strings with escapes or multiline literal.
    </p>

    <h2>TOML to JSON and back</h2>
    <p>
      TOML converts cleanly to JSON (TOML is strictly less
      expressive — comments and some number formats lost). JSON to
      TOML is lossy in one case: JSON doesn&rsquo;t distinguish
      integer and float, so <code>1</code> might round-trip as{" "}
      <code>1</code> or <code>1.0</code> depending on the converter.
    </p>
    <p>
      Most tools (including our converter) parse TOML into an
      internal object, then serialize to JSON. Clean for most data;
      datetimes may need special handling.
    </p>

    <h2>When to pick TOML</h2>
    <p>
      <strong>Project config:</strong>{" "}
      <code>Cargo.toml</code>, <code>pyproject.toml</code> made it a
      de facto standard.
    </p>
    <p>
      <strong>Tool config:</strong> <code>netlify.toml</code>,{" "}
      <code>hugo.toml</code>, <code>black.toml</code>.
    </p>
    <p>
      <strong>Config that humans edit:</strong> clearer than JSON,
      less bite than YAML.
    </p>
    <p>
      <strong>Avoid for:</strong> anything that needs
      anchors/references, deep nesting (YAML is often better), or
      binary data (base64 into strings gets ugly).
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Using YAML-style list indentation.</strong> TOML
      arrays use brackets, not hyphens.
    </p>
    <p>
      <strong>Forgetting quotes on string values.</strong> Unquoted
      strings are illegal except for bare keys.
    </p>
    <p>
      <strong>Mixing dotted and header declarations for one path.</strong>
      {" "}Parser error.
    </p>
    <p>
      <strong>Treating TOML dates as strings.</strong> They&rsquo;re
      first-class datetime types. Use the parsed datetime object.
    </p>
    <p>
      <strong>Expecting round-trip formatting.</strong> Most parsers
      reformat. Use a round-trip parser if formatting matters.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Convert TOML to JSON instantly with the{" "}
      <a href="/tools/toml-to-json">TOML to JSON converter</a>. Pair
      with the{" "}
      <a href="/tools/yaml-json-converter">YAML/JSON converter</a>
      {" "}when comparing config formats, and the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to tidy the
      output.
    </p>
  </>
);
