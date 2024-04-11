import "server-only";
import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get("symbol");
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const api_key = process.env.POLY_API_KEY;

  if (typeof symbol !== "string") {
    return NextResponse.json(
      { error: "Symbol is required and must be a string" },
      { status: 400 }
    );
  }

  if (typeof from !== "string" || typeof to !== "string") {
    return NextResponse.json(
      {
        error:
          "Both 'from' and 'to' date parameters are required and must be strings",
      },
      { status: 400 }
    );
  }

  const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/${from}/${to}?apiKey=${api_key}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Polygon.io API:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
