import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

type RateLimitResult = { success: boolean } & Record<string, unknown>;
type RateLimiter = {
  limit: (identifier: string) => Promise<RateLimitResult>;
};

const hasKV = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

let rateLimiter: RateLimiter;

if (hasKV) {
  const redis = new Redis({
    url: process.env.KV_REST_API_URL as string,
    token: process.env.KV_REST_API_TOKEN as string,
  });

  rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1 m"),
    analytics: true,
    prefix: "ratelimit:geui:msg",
  }) as unknown as RateLimiter;
} else {
  // Graceful no-op fallback when KV is not configured
  rateLimiter = {
    async limit() {
      return { success: true };
    },
  };
}

export const messageRateLimit: RateLimiter = rateLimiter;
