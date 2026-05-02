import { NextResponse } from "next/server";
import { bmi } from "@/lib/calculations";

export const dynamic = "force-static";
export const revalidate = 86400;

const ALLOW_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/** GET /api/tools/bmi?weightKg=72&heightM=1.78 */
export function GET(request: Request) {
  const url = new URL(request.url);
  const weightKg = parseFloat(url.searchParams.get("weightKg") ?? "");
  const heightM = parseFloat(url.searchParams.get("heightM") ?? "");

  if (!Number.isFinite(weightKg) || !Number.isFinite(heightM)) {
    return NextResponse.json(
      {
        error: "Invalid input",
        message: "Required query params: weightKg, heightM (both numbers).",
        example: "/api/tools/bmi?weightKg=72&heightM=1.78",
      },
      { status: 400, headers: ALLOW_HEADERS },
    );
  }

  try {
    const result = bmi({ weightKg, heightM });
    return NextResponse.json(
      {
        ...result,
        input: { weightKg, heightM },
        _meta: {
          tool: "bmi-calculator",
          lastVerified: "2026-04-30",
          formula: "BMI = weight (kg) ÷ height (m)². Categories per CDC adult cutoffs.",
          sources: ["https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html"],
          docs: "https://freetoolarena.com/api",
          note: "Adults 20+, not pregnant. BMI is a population-level screening number, not a diagnosis.",
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
