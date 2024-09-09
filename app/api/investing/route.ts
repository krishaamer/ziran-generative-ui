import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

const key = "investingData";

export async function GET(req: NextRequest) {
  const investingData = await kv.get(key);
  return new Response(
    JSON.stringify({ investingData: investingData || "No data found" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const { investingData } = await req.json();
  await kv.set(key, JSON.stringify(investingData));

  return new Response(JSON.stringify({ message: "Updated successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const preferredRegion = ["sin1", "kix1", "icn1", "hnd1", "iad1"];