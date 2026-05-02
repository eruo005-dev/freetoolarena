import { NextResponse } from "next/server";
import { tip } from "@/lib/calculations";

export const dynamic = "force-static";
export const revalidate = 86400;

const ALLOW_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/** GET /api/tools/tip?bill=84.50&tipPercent=18&people=3 */
export function GET(request: Request) {
  const url = new URL(request.url);
  const bill = parseFloat(url.searchParams.get("bill") ?? "");
  const tipPercent = parseFloat(url.searchParams.get("tipPercent") ?? "");
  const people = parseFloat(url.searchParams.get("people") ?? "1");

  if (!Number.isFinite(bill) || !Number.isFinite(tipPercent)) {
    return NextResponse.json(
      {
        error: "Invalid input",
        message: "Required: bill, tipPercent. Optional: people (default 1).",
        example: "/api/tools/tip?bill=84.50&tipPercent=18&people=3",
      },
      { status: 400, headers: ALLOW_HEADERS },
    );
  }

  try {
    const result = tip({ bill, tipPercent, people });
    return NextResponse.json(
      {
        ...result,
        input: { bill, tipPercent, people },
        _meta: {
          tool: "tip-calculator",
          lastVerified: "2026-04-30",
          formula: "tipAmount = bill × (tipPercent / 100). perPerson = (bill + tipAmount) / people.",
          sources: [
            "https://www.pewresearch.org/2023/11/09/tipping-culture-in-america-public-sees-a-changed-landscape/",
          ],
          docs: "https://freetoolarena.com/api",
        },
      },
      { headers: ALLOW_HEADERS },
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Calculation failed", message: e instanceof Error ? e.message : String(e) },
      { status: 400, headers: ALLOW_HEADERS },
    );
  }
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: ALLOW_HEADERS });
}
