import { NextResponse } from "next/server";
import { mortgage } from "@/lib/calculations";

export const dynamic = "force-static"; // edge-cacheable when params are stable
export const revalidate = 86400;

const ALLOW_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/**
 * GET /api/tools/mortgage?principal=400000&annualRate=6.5&years=30
 *
 * Returns:
 * {
 *   "monthlyPayment": 2528.27,
 *   "totalInterest": 510_177,
 *   "totalPaid": 910_177,
 *   "payments": 360,
 *   "input": { ... },
 *   "_meta": {
 *     "tool": "mortgage-calculator",
 *     "lastVerified": "2026-04-30",
 *     "sources": [...]
 *   }
 * }
 */
export function GET(request: Request) {
  const url = new URL(request.url);
  const principal = parseFloat(url.searchParams.get("principal") ?? "");
  const annualRate = parseFloat(url.searchParams.get("annualRate") ?? "");
  const years = parseFloat(url.searchParams.get("years") ?? "");

  if (!Number.isFinite(principal) || !Number.isFinite(annualRate) || !Number.isFinite(years)) {
    return NextResponse.json(
      {
        error: "Invalid input",
        message: "Required query params: principal, annualRate, years (all numbers)",
        example: "/api/tools/mortgage?principal=400000&annualRate=6.5&years=30",
      },
      { status: 400, headers: ALLOW_HEADERS },
    );
  }

  try {
    const result = mortgage({ principal, annualRate, years });
    return NextResponse.json(
      {
        ...result,
        input: { principal, annualRate, years },
        _meta: {
          tool: "mortgage-calculator",
          lastVerified: "2026-04-30",
          formula: "M = P × [r(1+r)^n] / [(1+r)^n − 1] (r = monthly rate, n = months)",
          sources: [
            "https://www.consumerfinance.gov/owning-a-home/loan-options/conventional-loans/",
            "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-en-103/",
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
