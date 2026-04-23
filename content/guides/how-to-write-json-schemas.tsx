import type { ReactElement } from "react";

export const intro: ReactElement = (
  <>
    <p>
      JSON Schema is how you describe the shape of JSON data so
      machines can validate it, humans can understand it, and APIs
      can generate docs and clients from it. Write a schema once and
      you get validation, auto-completion, fixture generation, and
      contract tests for free. This guide covers the core keywords
      (type, properties, required, additionalProperties), the
      composition patterns (allOf, oneOf, $ref), how drafts differ,
      when to reach for JSON Schema vs alternatives (OpenAPI, Zod,
      TypeBox), and the common mistakes that let invalid data slip
      through.
    </p>
  </>
);

export const body: ReactElement = (
  <>
    <h2>A minimal schema</h2>
    <pre>
{`{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age":  { "type": "integer", "minimum": 0 }
  },
  "required": ["name"]
}`}
    </pre>
    <p>
      This validates:{" "}
      <code>{`{"name":"Alice","age":30}`}</code> ✓
    </p>
    <p>
      Rejects:{" "}
      <code>{`{"age":30}`}</code> (missing name),{" "}
      <code>{`{"name":"Alice","age":-1}`}</code> (negative age).
    </p>

    <h2>Core types</h2>
    <p>
      <strong>string</strong>, <strong>number</strong>,{" "}
      <strong>integer</strong>, <strong>boolean</strong>,{" "}
      <strong>null</strong>, <strong>object</strong>,{" "}
      <strong>array</strong>. <code>integer</code> rejects{" "}
      <code>1.5</code> where <code>number</code> accepts it.
    </p>
    <p>
      <strong>Union:</strong>{" "}
      <code>{`"type": ["string", "null"]`}</code> for fields that
      can be nullable.
    </p>

    <h2>String constraints</h2>
    <p>
      <strong>minLength / maxLength:</strong> character bounds.
    </p>
    <p>
      <strong>pattern:</strong> regex the string must match.
    </p>
    <p>
      <strong>format:</strong> <code>email</code>, <code>uri</code>,
      {" "}<code>date-time</code>, <code>uuid</code>, <code>hostname</code>.
      Formats are informational by default; enable format validation
      to enforce.
    </p>
    <p>
      <strong>enum:</strong> whitelist of allowed values —{" "}
      <code>{`"enum": ["draft","published","archived"]`}</code>.
    </p>

    <h2>Number constraints</h2>
    <p>
      <strong>minimum / maximum:</strong> inclusive bounds.
    </p>
    <p>
      <strong>exclusiveMinimum / exclusiveMaximum:</strong>{" "}
      non-inclusive bounds.
    </p>
    <p>
      <strong>multipleOf:</strong> divisor check. Useful for cents
      (<code>multipleOf: 0.01</code>) or step sizes.
    </p>

    <h2>Object constraints</h2>
    <p>
      <strong>properties:</strong> map of key → sub-schema.
    </p>
    <p>
      <strong>required:</strong> array of keys that must be present.
      Absent in <code>required</code> means optional.
    </p>
    <p>
      <strong>additionalProperties:</strong> controls unknown keys.{" "}
      <code>false</code> rejects any key not listed; a schema object
      validates extra keys against that schema.
    </p>
    <p>
      <strong>patternProperties:</strong> match property names by
      regex, apply sub-schema to values.
    </p>
    <p>
      <strong>minProperties / maxProperties:</strong> count bounds.
    </p>

    <h2>Array constraints</h2>
    <p>
      <strong>items:</strong> schema every element must match.
    </p>
    <p>
      <strong>prefixItems (draft 2020-12):</strong> tuple mode — first
      element matches first schema, second matches second, etc.
    </p>
    <p>
      <strong>minItems / maxItems:</strong> length bounds.
    </p>
    <p>
      <strong>uniqueItems:</strong> enforce no duplicates.
    </p>
    <p>
      <strong>contains:</strong> at least one item must match this
      schema.
    </p>

    <h2>Composition</h2>
    <p>
      <strong>allOf:</strong> value must match every sub-schema.
      Useful for extending a base schema.
    </p>
    <p>
      <strong>oneOf:</strong> exactly one sub-schema must match.
      Common for discriminated unions.
    </p>
    <p>
      <strong>anyOf:</strong> at least one sub-schema must match.
    </p>
    <p>
      <strong>not:</strong> negation — value must NOT match the
      sub-schema.
    </p>

    <h2>$ref — reusable pieces</h2>
    <pre>
{`{
  "$defs": {
    "Address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city":   { "type": "string" }
      },
      "required": ["street","city"]
    }
  },
  "type": "object",
  "properties": {
    "shipping": { "$ref": "#/$defs/Address" },
    "billing":  { "$ref": "#/$defs/Address" }
  }
}`}
    </pre>
    <p>
      Definitions live in <code>$defs</code>;{" "}
      <code>$ref</code> points at them with a JSON Pointer.
    </p>

    <h2>Drafts matter</h2>
    <p>
      <strong>Draft 4:</strong> widely supported. Uses{" "}
      <code>definitions</code>, not <code>$defs</code>. Older API
      tooling often stuck here.
    </p>
    <p>
      <strong>Draft 7:</strong> common default. Added{" "}
      <code>if/then/else</code>, <code>readOnly</code>,{" "}
      <code>writeOnly</code>.
    </p>
    <p>
      <strong>2019-09:</strong> <code>$defs</code> replaces{" "}
      <code>definitions</code>. Recursive refs cleaned up.
    </p>
    <p>
      <strong>2020-12:</strong> <code>prefixItems</code> for tuples.
      Cleaner array validation.
    </p>
    <p>
      <strong>Rule:</strong> always declare <code>$schema</code> so
      validators pick the right version.
    </p>

    <h2>Conditional schemas — if/then/else</h2>
    <pre>
{`{
  "type": "object",
  "properties": { "kind": { "enum": ["user","admin"] }},
  "if": { "properties": { "kind": { "const": "admin" }}},
  "then": { "required": ["permissions"] }
}`}
    </pre>
    <p>
      If <code>kind === &quot;admin&quot;</code>,{" "}
      <code>permissions</code> becomes required. Otherwise no extra
      constraint.
    </p>

    <h2>JSON Schema vs alternatives</h2>
    <p>
      <strong>OpenAPI:</strong> uses JSON Schema under the hood (with
      some extensions). Use OpenAPI for HTTP APIs where you want
      paths, responses, and auth all in one doc.
    </p>
    <p>
      <strong>TypeScript interfaces:</strong> great for compile-time,
      useless at runtime. You need a runtime validator either way.
    </p>
    <p>
      <strong>Zod / Yup / Joi (JS ecosystem):</strong> nicer DX,
      schema-as-code. Good for forms and internal validation. Export
      to JSON Schema when you need interop.
    </p>
    <p>
      <strong>Protobuf / Avro:</strong> when you need binary
      efficiency and strict schema evolution rules, not JSON.
    </p>

    <h2>Tooling</h2>
    <p>
      <strong>Validators:</strong>{" "}
      <code>ajv</code> (JS, fastest), <code>jsonschema</code>
      {" "}(Python), <code>go-jsonschema</code> (Go).
    </p>
    <p>
      <strong>Doc generators:</strong>{" "}
      <code>json-schema-to-markdown</code>, Redocly, Stoplight.
    </p>
    <p>
      <strong>Code generators:</strong>{" "}
      <code>json-schema-to-typescript</code>,{" "}
      <code>quicktype</code>, <code>datamodel-code-generator</code>{" "}
      (Python Pydantic).
    </p>
    <p>
      <strong>IDE integration:</strong> VS Code auto-validates JSON
      files against a matching schema. Huge productivity win for
      config files.
    </p>

    <h2>Common mistakes</h2>
    <p>
      <strong>Forgetting additionalProperties: false.</strong>{" "}
      Default is to allow unknown keys silently. Breaks contract
      testing.
    </p>
    <p>
      <strong>Using type: number when you mean integer.</strong>{" "}
      Floats sneak through.
    </p>
    <p>
      <strong>Missing required.</strong> Without <code>required</code>,
      every property is optional. Easy to miss on required fields.
    </p>
    <p>
      <strong>Mixing drafts.</strong> <code>$defs</code> in draft 7
      doesn&rsquo;t work; <code>definitions</code> in 2020-12
      doesn&rsquo;t work (well, it&rsquo;s allowed but unused).
    </p>
    <p>
      <strong>Overly permissive enum.</strong>{" "}
      <code>{`"enum": ["A", "a"]`}</code> accepts both. Decide on
      case-sensitivity.
    </p>
    <p>
      <strong>No format validation.</strong> <code>format: email</code>
      {" "}is a hint, not an enforced check unless you enable format
      mode in the validator.
    </p>

    <h2>Run the numbers</h2>
    <p>
      Generate a starter schema from sample JSON with the{" "}
      <a href="/tools/json-schema-generator">JSON schema generator</a>.
      Pair with the{" "}
      <a href="/tools/json-formatter">JSON formatter</a> to tidy
      your sample first, and the{" "}
      <a href="/tools/json-to-typescript">JSON to TypeScript converter</a>
      {" "}to get types for your codebase.
    </p>
  </>
);
