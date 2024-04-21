import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

const key = "investingData";

export async function GET(req: NextRequest) {
  const investingData = await kv.get(key);
  return new Response(
    JSON.stringify({ clientData: investingData || "No data found" }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}