import { Ratelimit } from "@upstash/ratelimit";

import { redis } from "@/lib/redis";

type RateLimitResult = { success: boolean } & Record<string, unknown>;
type RateLimiter = {
  limit: (identifier: string) => Promise<RateLimitResult>;
};

let rateLimiter: RateLimiter;

if (redis) {
  rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(50, "1 m"),
    analytics: true,
    prefix: "ratelimit:geui:msg",
  }) as unknown as RateLimiter;
} else {
  rateLimiter = {
    async limit() {
      return { success: true };
    },
  };
}

export const messageRateLimit: RateLimiter = rateLimiter;
