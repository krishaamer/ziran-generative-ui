import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

const key = "brandsData";

export async function GET(req: NextRequest) {
  const brandsData = await kv.get(key);
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
  await kv.set(key, JSON.stringify(brandsData));

  return new Response(JSON.stringify({ message: "Updated successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}