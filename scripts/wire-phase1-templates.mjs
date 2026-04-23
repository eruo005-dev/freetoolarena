// Wire 15 Phase 1 document templates into components/tools/registry.tsx + lib/pages.ts
import { readFileSync, writeFileSync } from "node:fs";

// [slug, ClassName, title, description, keyword, category, related, explainer, howToUse]
const tools = [
  ["receipt-generator", "ReceiptGenerator", "Receipt Generator", "Create a printable cash or sales receipt with your business details, line items, tax, and totals. Save as PDF, print, or copy as text.", "receipt generator", "money", ["invoice-generator", "quote-generator", "bill-of-sale-generator"], "Generate a clean, professional receipt for any cash, card, or check sale. Add line items and tax, then print or save as PDF — no signup, no watermark.", ["Fill in business and customer details.", "Add items, quantity, and prices.", "Click Print / Save as PDF."]],
  ["quote-generator", "QuoteGenerator", "Quote Generator", "Professional sales quote or estimate with line items, tax, validity date, and terms. Print or save as PDF.", "quote generator", "money", ["invoice-generator", "purchase-order-generator", "freelance-rate-calculator"], "Send clean quotes before you start work. Line items, tax, validity date, and terms in one page that prints perfectly.", ["Add your company and client details.", "Enter line items and terms.", "Print or save as PDF."]],
  ["purchase-order-generator", "PurchaseOrderGenerator", "Purchase Order Generator", "Create a purchase order with buyer, vendor, ship-to address, line items, and approval signature line. Print or PDF.", "purchase order generator", "money", ["invoice-generator", "quote-generator", "packing-slip-generator"], "Formal PO template with boxed buyer/vendor sections, itemized order, shipping/tax totals, and signature line.", ["Fill buyer and vendor blocks.", "Add items and shipping.", "Print or save as PDF."]],
  ["bill-of-sale-generator", "BillOfSaleGenerator", "Bill of Sale Generator", "Personal-property bill of sale for vehicles, equipment, or general items. Includes as-is clause, signature lines, and state dropdown.", "bill of sale generator", "money", ["receipt-generator", "letter-of-intent-generator", "home-equity-loan-calculator"], "A printable bill-of-sale template for transferring ownership of a car, trailer, equipment, or other personal property. Not legal advice — consult an attorney for jurisdiction-specific requirements.", ["Enter seller, buyer, and item details.", "Pick state and sale price.", "Print both copies and sign."]],
  ["pay-stub-generator", "PayStubGenerator", "Pay Stub Generator", "Generate a pay stub with earnings, YTD totals, federal/state withholding, FICA, and net pay. Print-ready.", "pay stub generator", "money", ["paycheck-calculator", "invoice-generator", "receipt-generator"], "Employer pay-stub template with current and year-to-date columns, automatic FICA calc, and net-pay summary. For record-keeping only — not a substitute for payroll software.", ["Enter employer and employee info.", "Enter hours, rate, and withholdings.", "Print or save as PDF."]],
  ["packing-slip-generator", "PackingSlipGenerator", "Packing Slip Generator", "Packing slip / delivery note with SKU, description, ordered vs shipped quantity — no prices. Print-ready.", "packing slip generator", "money", ["purchase-order-generator", "invoice-generator", "receipt-generator"], "Include a professional packing slip with every shipment — shipper block, ship-to address, tracking number, and item checklist with ordered vs shipped quantities.", ["Fill shipper and ship-to addresses.", "Add items with SKU and quantities.", "Print and include in the box."]],
  ["gift-certificate-maker", "GiftCertificateMaker", "Gift Certificate Maker", "Printable gift certificate with decorative border, recipient name, amount, message, and expiration. One-page print.", "gift certificate maker", "career", ["certificate-generator", "thank-you-letter-generator", "business-letter-generator"], "A clean, decorative gift certificate you can fill in and print in a minute. Fits a standard envelope when folded in thirds.", ["Enter business, recipient, and amount.", "Add personal message and expiry.", "Print on card stock or save as PDF."]],
  ["resignation-letter-generator", "ResignationLetterGenerator", "Resignation Letter Generator", "Professional resignation letter with formal tone options, last-day date, and optional transition-offer paragraph.", "resignation letter generator", "career", ["business-letter-generator", "recommendation-letter-generator", "thank-you-letter-generator"], "Leave gracefully. Pick tone (formal, warm, or brief), set your last day, and generate a letter that preserves the relationship with your employer.", ["Enter your details and last day.", "Pick tone and transition offer.", "Print or save as PDF."]],
  ["recommendation-letter-generator", "RecommendationLetterGenerator", "Recommendation Letter Generator", "Letter of recommendation with specific strengths, examples, qualifications, and endorsement — for former employees, students, or colleagues.", "recommendation letter", "career", ["business-letter-generator", "resignation-letter-generator", "cover-letter-builder"], "Write a strong reference in minutes. Specific strengths with examples, clear endorsement, and your contact details — structured the way admissions and HR expect.", ["Describe your relationship and capacity.", "Add 3 strengths with examples.", "Print or save as PDF."]],
  ["complaint-letter-generator", "ComplaintLetterGenerator", "Complaint Letter Generator", "Formal consumer complaint letter with order number, incident details, and specific resolution request.", "complaint letter generator", "writing", ["business-letter-generator", "letter-of-intent-generator", "apology-letter-generator"], "Make your complaint hard to ignore. Formal structure, specific resolution ask, and a deadline &mdash; the tone that actually gets responses from customer service.", ["Enter the company and order details.", "Describe what happened and what you want.", "Send certified mail or email with read-receipt."]],
  ["thank-you-letter-generator", "ThankYouLetterGenerator", "Thank You Letter Generator", "Versatile thank-you letter for interviews, gifts, referrals, or business favors — formal to warm tone.", "thank you letter generator", "writing", ["recommendation-letter-generator", "business-letter-generator", "apology-letter-generator"], "A specific, sincere thank-you in minutes. Pick the occasion (interview / gift / referral / favor / general) and the tone, and the template fills in the right opening and closing.", ["Pick occasion and tone.", "Describe what you're thanking for.", "Print or save as PDF."]],
  ["memo-generator", "MemoGenerator", "Memo Generator", "Classic office memorandum with TO / FROM / DATE / SUBJECT header and block-format body.", "memo generator", "writing", ["business-letter-generator", "meeting-minutes-template", "project-brief-template"], "Standard MEMORANDUM format &mdash; four-line header, body paragraphs, no frills. Useful for internal comms, policy updates, and meeting notes.", ["Fill TO / FROM / DATE / SUBJECT.", "Write the body.", "Print or save as PDF."]],
  ["business-letter-generator", "BusinessLetterGenerator", "Business Letter Generator", "Formal block-format business letter with sender / date / recipient blocks, salutation, body, and closing.", "business letter generator", "writing", ["memo-generator", "letter-of-intent-generator", "cover-letter-builder"], "Strict block-format letter &mdash; the safe choice for any formal external correspondence. Pick your closing, paste your body, print.", ["Fill sender and recipient blocks.", "Write body and pick closing.", "Print or save as PDF."]],
  ["letter-of-intent-generator", "LetterOfIntentGenerator", "Letter of Intent Generator", "Non-binding letter of intent for jobs, grad school, business purchases, or real estate. Block-letter format.", "letter of intent generator", "writing", ["business-letter-generator", "cover-letter-builder", "bill-of-sale-generator"], "Declare intent clearly and professionally. Pick the LOI type (job / grad school / business / real estate) and the template prefills the right language. Non-binding &mdash; consult an attorney for binding LOIs.", ["Pick the LOI type.", "Fill sender and recipient blocks.", "Print or save as PDF."]],
  ["apology-letter-generator", "ApologyLetterGenerator", "Apology Letter Generator", "Sincere personal or business apology letter that models real accountability — no defensive phrasing.", "apology letter generator", "writing", ["complaint-letter-generator", "business-letter-generator", "thank-you-letter-generator"], "Apologize well. The template skips defensive phrasing (&ldquo;sorry if you felt&rdquo;) and models specific accountability, acknowledgment of impact, and concrete amends.", ["Describe what happened.", "State impact and what you're changing.", "Print or save as PDF."]],
];

// ---- Patch components/tools/registry.tsx ----
let toolSrc = readFileSync("components/tools/registry.tsx", "utf8");

const toolImports = tools
  .map(([, cls]) => `const ${cls} = dynamic(() => import("./${cls}").then(m => ({ default: m.${cls} })), { loading: Skeleton });`)
  .join("\n");

const registryAnchor = `export const TOOL_REGISTRY: Record<string, ToolEntry> = {`;
if (!toolSrc.includes(registryAnchor)) throw new Error("Missing TOOL_REGISTRY anchor");
toolSrc = toolSrc.replace(registryAnchor, `// Phase 1 — document templates (15)\n${toolImports}\n\n${registryAnchor}`);

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
