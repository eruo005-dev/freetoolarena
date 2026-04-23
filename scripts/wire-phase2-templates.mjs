// Wire 6 Phase 2 legal-template tools into components/tools/registry.tsx + lib/pages.ts
import { readFileSync, writeFileSync } from "node:fs";

const tools = [
  ["nda-generator", "NdaGenerator", "NDA Generator", "Create a one-way or mutual Non-Disclosure Agreement. Fill parties, purpose, term, and governing law, then print or save as PDF.", "nda generator", "career", ["freelance-contract-generator", "business-letter-generator", "letter-of-intent-generator"], "One-way or mutual NDA with standard clauses &mdash; confidentiality, non-use, term, return of materials, and governing law. Fill the form, print, sign. Not legal advice &mdash; consult an attorney before relying on any contract.", ["Pick one-way or mutual.", "Fill parties, purpose, and term.", "Print both copies and sign."]],
  ["freelance-contract-generator", "FreelanceContractGenerator", "Freelance Contract Generator", "Independent contractor agreement with scope, payment, IP ownership, and termination clauses. Print-ready.", "freelance contract", "career", ["nda-generator", "invoice-generator", "freelance-rate-calculator"], "Ship a real freelance contract instead of a handshake. Ten numbered clauses covering services, payment, IP, confidentiality, termination, and governing law. Not legal advice.", ["Fill client, contractor, and scope.", "Pick payment structure and IP terms.", "Print or save as PDF for e-sign."]],
  ["rental-application-generator", "RentalApplicationGenerator", "Rental Application Generator", "Printable rental application form with applicant, employment, references, pets, and authorization for background check.", "rental application", "home", ["home-equity-loan-calculator", "apartment-affordability-calculator", "moving-cost-calculator"], "Landlord-ready rental application with all the standard sections &mdash; applicant, residence history, employment, references, pets, and authorization. Fair-housing reminder included.", ["Pick which sections to include.", "Applicant fills and signs.", "Print or save as PDF for the landlord."]],
  ["photo-release-generator", "PhotoReleaseGenerator", "Photo Release Generator", "Model / photo / video release form granting likeness rights for commercial or editorial use. Minor-consent block included.", "photo release form", "career", ["liability-waiver-generator", "nda-generator", "freelance-contract-generator"], "Standard photo and video release &mdash; usage scope, territory, duration, optional credit line, and parent/guardian block for minors. Not legal advice &mdash; verify with your jurisdiction.", ["Pick photo / video / combined.", "Fill subject and photographer.", "Print and sign before the shoot."]],
  ["liability-waiver-generator", "LiabilityWaiverGenerator", "Liability Waiver Generator", "General event or activity waiver with assumption-of-risk, release of claims, indemnification, and emergency-contact blocks.", "liability waiver", "career", ["photo-release-generator", "nda-generator", "rental-application-generator"], "A waiver that participants actually understand. Lists specific risks, assumption-of-risk clause, release of claims, medical authorization, and parent/guardian block for minors. Not legal advice.", ["List the activity and known risks.", "Fill participant and emergency contact.", "Print and collect signatures at check-in."]],
  ["promissory-note-generator", "PromissoryNoteGenerator", "Promissory Note Generator", "Simple promissory note / loan agreement with principal, interest, payment terms, and late-fee clause.", "promissory note", "money", ["home-equity-loan-calculator", "loan-calculator", "compound-interest-calculator"], "A simple IOU done right. Principal in words and numerals, interest rate, demand / installment / lump-sum terms, optional late fee and prepayment clause. Not legal advice.", ["Pick the note type and amount.", "Set interest and payment terms.", "Print and sign with both parties."]],
];

// ---- Patch components/tools/registry.tsx ----
let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");

const toolImports = tools
  .map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`)
  .join("\n");

const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
if (!toolSrc.includes(registryAnchor)) throw new Error("Missing TOOL_REGISTRY anchor");
toolSrc = toolSrc.replace(registryAnchor, `// Phase 2 — legal templates with disclaimers (6)\n${toolImports}\n\n${registryAnchor}`);

const lastRegEnd = toolSrc.lastIndexOf("};");
if (lastRegEnd === -1) throw new Error("Missing registry close");

const toolEntries = tools
  .map(([slug, cls, , , , , , explainer, howToUse]) => {
    const howToStr = howToUse.map((s) => `      "${s.replace(/"/g, '\\"')}",`).join("\n");
    return `  "${slug}": {
    render: () => <${cls} />,
    explainer: (
      <>
        <p>${explainer}</p>
        <p>
          Runs entirely in your browser — no upload, no account, no watermark.
          For more tools in this category see the{" "}
          <a href="/tools">full tools index</a>.
        </p>
      </>
    ),
    howToUse: [
${howToStr}
    ],
  },`;
  })
  .join("\n");

toolSrc = toolSrc.slice(0, lastRegEnd) + toolEntries + "\n" + toolSrc.slice(lastRegEnd);
writeFileSync("components/tools/registry.tsx", toolSrc);
console.log("tools registry patched:", tools.length);

// ---- Patch lib/pages.ts manifest (inside PAGES array) ----
let pages = readFileSync("lib/pages.ts", "utf8");

const marker = "export const PAGES: Page[] = [";
const markerStart = pages.indexOf(marker);
if (markerStart === -1) throw new Error("PAGES start missing");
const openBracket = markerStart + marker.length - 1;
let depth = 1, i = openBracket + 1, inStr = false, q = "", esc = false;
while (i < pages.length && depth > 0) {
  const c = pages[i];
  if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) inStr = false; }
  else if (c === '"' || c === "'" || c === "`") { inStr = true; q = c; }
  else if (c === "[") depth++;
  else if (c === "]") depth--;
  i++;
}
if (depth !== 0) throw new Error("Unbalanced PAGES brackets");
const closeBracket = i - 1;

const esc2 = (s) => String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const manifestEntries = tools
  .map(([slug, , title, description, keyword, category, related]) => {
    const relatedArr = related.map((s) => `"${s}"`).join(", ");
    return `  { slug: "${slug}", type: "tool", category: "${category}",
    title: "${esc2(title)}",
    h1: "${esc2(title)}",
    description: "${esc2(description)}",
    keyword: "${keyword}",
    related: [${relatedArr}],
    published: true },`;
  })
  .join("\n");

pages = pages.slice(0, closeBracket) + "\n" + manifestEntries + "\n" + pages.slice(closeBracket);
writeFileSync("lib/pages.ts", pages);
console.log("pages.ts patched:", tools.length, "entries");
