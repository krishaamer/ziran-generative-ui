import { kv } from "@vercel/kv";
import { NextRequest } from "next/server";

const key = "userData";

export async function GET(req: NextRequest) {
  const value = await kv.get(key);
  // Ensure the response is properly formatted as a JSON string
  return new Response(JSON.stringify({ value: value || "No data found" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  // Assuming req.body is already in JSON format
  const data = await req.json();
  await kv.set(key, JSON.stringify(data));

  // Make sure to stringify the response body
  return new Response(JSON.stringify({ message: "Updated successfully" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
