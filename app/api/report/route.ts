import "server-only";
import { NextRequest, NextResponse } from "next/server";

import { redis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reportID = searchParams.get("id");

  if (typeof reportID !== "string") {
    return NextResponse.json(
      { error: "reportID is required and must be a string" },
      { status: 400 }
    );
  }
  if (!redis) {
    return new Response(
      JSON.stringify({ reportData: "No report data found" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  const reportData = await redis.get(reportID);

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
