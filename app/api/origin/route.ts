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

  const key = reportID + "_origin";
  const originData = await kv.get(key);

  return new Response(
    JSON.stringify({ origin: originData || "No origin data found" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}