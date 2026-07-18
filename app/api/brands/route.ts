import { NextRequest } from "next/server";

import { redis } from "@/lib/redis";

const key = "brandsData";

export async function GET() {
  if (!redis) {
    return new Response(
      JSON.stringify({ brandsData: "No data found" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  const brandsData = await redis.get(key);
  return new Response(
    JSON.stringify({ brandsData: brandsData || "No data found" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const { brandsData } = await req.json();
  if (!redis) {
    return new Response(JSON.stringify({ message: "KV not configured" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  await redis.set(key, JSON.stringify(brandsData));

  return new Response(JSON.stringify({ message: "Updated successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const preferredRegion = ["sin1", "kix1", "icn1", "hnd1", "iad1"];
