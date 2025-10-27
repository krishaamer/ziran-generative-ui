import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

const key = "userData";

export async function GET(req: NextRequest) {
  const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  if (!hasKV) {
    return new Response(
      JSON.stringify({ clientData: "No data found" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const clientData = await kv.get(key);
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
  const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
  if (!hasKV) {
    return new Response(JSON.stringify({ message: "KV not configured" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  await kv.set(key, JSON.stringify(clientData));

  return new Response(JSON.stringify({ message: "Updated successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const preferredRegion = ["sin1", "kix1", "icn1", "hnd1", "iad1"];
