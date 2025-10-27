import "server-only";
import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reportID = searchParams.get("id");

  if (typeof reportID !== "string") {
    return NextResponse.json(
      { error: "reportID is required and must be a string" },
      { status: 400 }
    );
  }
  const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  if (!hasKV) {
    return new Response(
      JSON.stringify({ reportData: "No report data found" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  const reportData = await kv.get(reportID);

  return new Response(
    JSON.stringify({ reportData: reportData || "No report data found" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export const preferredRegion = ["sin1", "kix1", "icn1", "hnd1", "iad1"];
