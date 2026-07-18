import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
} from "ai";

import { tools, type ChatMessage } from "@/lib/ai/tools";
import { messageRateLimit } from "@/lib/rate-limit";
import { redis } from "@/lib/redis";

export const maxDuration = 60;

function getClientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local"
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = await messageRateLimit.limit(ip);

  if (!rateLimit.success) {
    return new Response("Rate limit exceeded. Try again in 1 minute.", {
      status: 429,
    });
  }

  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return new Response(
      "AI 回應已停用（缺少 AI Gateway 驗證）。請設定 AI_GATEWAY_API_KEY 或 VERCEL_OIDC_TOKEN。",
      { status: 503 },
    );
  }

  const { messages }: { messages: ChatMessage[] } = await request.json();
  const [clientData, investingData, brandsData] = redis
    ? await Promise.all([
        redis.get("userData"),
        redis.get("investingData"),
        redis.get("brandsData"),
      ])
    : [null, null, null];

  const result = streamText({
    model: process.env.AI_MODEL ?? "openai/gpt-5.6-terra",
    instructions: `You are a friendly sustainability assistant for college students in Taiwan. Help students understand sustainable shopping, saving, and investing, and how their money supports companies.

Always respond briefly in Traditional Chinese, even when the question is in English. Use a friendly, informal tone suitable for a person in their early twenties. Use tools whenever a visual or interactive answer is useful, and complement tool calls with a concise explanation. Clearly label invented or illustrative ESG information as fictional.

Personal sustainability data: ${String(clientData ?? "No data")}
Previously purchased brands: ${String(brandsData ?? "No data")}
Previous investments: ${String(investingData ?? "No data")}`,
    messages: await convertToModelMessages(messages),
    tools,
    stopWhen: isStepCount(5),
    providerOptions: {
      gateway: {
        user: ip,
        tags: ["feature:generative-ui", "app:ziran"],
      },
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
