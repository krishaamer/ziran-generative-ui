import { NextRequest } from "next/server";

import { redis } from "@/lib/redis";

const key = "userData";

export async function GET() {
  if (!redis) {
    return new Response(
      JSON.stringify({ clientData: "No data found" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
  const clientData = await redis.get(key);
  return new Response(
    JSON.stringify({ clientData: clientData || "No data found" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const { clientData } = await req.json();
  if (!redis) {
    return new Response(JSON.stringify({ message: "KV not configured" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  await redis.set(key, JSON.stringify(clientData));

  return new Response(JSON.stringify({ message: "Updated successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const preferredRegion = ["sin1", "kix1", "icn1", "hnd1", "iad1"];
