# Ziran Generative UI – Progress Log

This log captures the concrete changes applied to stabilize, harden, and modernize the app for local dev and deployment. It’s written for a future AI assistant to quickly understand context, rationale, and next steps.

## Summary

- Modernized to Next.js 16 dev environment and fixed breaking changes (headers API, Tailwind v4 vs v3, Vercel AI SDK).
- Eliminated hard crashes when env vars are missing (KV, Polygon, Alpha Vantage, OpenAI).
- Removed leaked client keys from code, switched to env usage.
- Cleaned analytics placement and deprecated middleware.
- Added Corepack/pnpm metadata to satisfy Vercel builds.

## Branching

- Created: `fix/ziran-critical-fixes` (initial hardening work).
- Merged selectively into `main` so the stable branch contains all critical fixes.

## Critical Runtime Hardening

- KV rate-limiter no-op fallback when env missing
  - Why: `@upstash/redis` init threw at import-time, crashing all pages if KV wasn’t configured.
  - Change: Export a no-op rate limiter when `KV_REST_API_URL`/`KV_REST_API_TOKEN` are absent.
  - File: ziran-generative-ui/lib/rate-limit.ts:1

- Guard all KV-backed routes
  - Why: `@vercel/kv` throws if KV envs are not set.
  - Change: Return 200 with safe defaults when KV is missing; only hit KV when configured.
  - Files:
    - ziran-generative-ui/app/api/personal/route.ts:1
    - ziran-generative-ui/app/api/brands/route.ts:1
    - ziran-generative-ui/app/api/investing/route.ts:1
    - ziran-generative-ui/app/api/report/route.ts:1
    - ziran-generative-ui/app/api/origin/route.ts:1

- Polygon API route resilience
  - Why: Unauthorized 401/403 spammed 500s and broke UI on first load.
  - Change: If `POLY_API_KEY` is missing or unauthorized, return `{ status: "OK", results: [] }`.
  - File: ziran-generative-ui/app/api/polygon/route.ts:1

- Alpha Vantage key from env
  - Why: Key was hard-coded and public.
  - Change: Use `ALPHA_VANTAGE_API_KEY` with guard if missing.
  - File: ziran-generative-ui/app/api/stock/route.ts:1

- OpenAI guard in server action + headers() API migration
  - Why: Next 16 `headers()` is async; missing `OPENAI_API_KEY` caused unhandled rejections.
  - Change: Added `safeHeadersGet()` with `await headers()`, guarded OpenAI usage, guarded KV reads.
  - File: ziran-generative-ui/app/action.tsx:1

## UI/Config Fixes

- Google Maps API key handling
  - Why: Client components used `REACT_APP_...` and leaked a hard-coded key.
  - Change: Switch to `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and remove literals.
  - Files:
    - ziran-generative-ui/components/llm-map/index.tsx:1
    - ziran-generative-ui/components/llm-bulk/index.tsx:1
    - ziran-generative-ui/components/llm-distance/index.tsx:1
    - ziran-generative-ui/components/llm-origin/index.tsx:1
    - ziran-generative-ui/components/llm-pigs/index.tsx:1
    - ziran-generative-ui/components/llm-factories/index.tsx:1

- Analytics placement
  - Why: `<NextAnalytics/>`, custom `<ClientAnalytics/>`, and `<GoogleAnalytics/>` were outside `<body>`.
  - Change: Move analytics components into `<body>`.
  - File: ziran-generative-ui/app/layout.tsx:1

- NextAuth sign-in
  - Why: Server action `signIn()` threw “headers outside a request scope” under Edge/runtime.
  - Change: Use `next-auth/react` client `signIn('google')` from the form.
  - Files:
    - ziran-generative-ui/components/llm-login/index.tsx:1
    - Deleted server action helper: ziran-generative-ui/components/llm-login/authActions.ts

- Remove deprecated middleware
  - Why: Next.js deprecation warning; existing middleware only re-exported `auth` and guarded `/test`.
  - Change: Delete `middleware.ts`. Use per-route guards if needed.
  - File: ziran-generative-ui/middleware.ts (deleted)

## Build/Tooling Alignment

- Tailwind v3 alignment for current config
  - Why: Project config used Tailwind v3 style; Tailwind v4 requires `@tailwindcss/postcss` plugin and new APIs.
  - Change: Keep PostCSS plugin as `tailwindcss` and pin Tailwind to v3 in devDependencies.
  - Files:
    - ziran-generative-ui/postcss.config.js:1
    - ziran-generative-ui/package.json:1

- Next.js dev warnings from legacy lifecycles (react-financial-charts)
  - Why: Library uses `UNSAFE_` lifecycles; Strict Mode logs warnings.
  - Change: Added `next.config.ts` with `reactStrictMode: false` to reduce noise in dev.
  - File: ziran-generative-ui/next.config.ts:1

- Vercel build compatibility with pnpm 10
  - Why: Vercel requires Corepack opt-in for pnpm@10.
  - Change: Add `packageManager`, `preinstall: corepack enable`, and Node engine.
  - File: ziran-generative-ui/package.json:1

## Environment Variables

Create `ziran-generative-ui/.env.local` and set the following:

- Required for features
  - `OPENAI_API_KEY`: enables chat completions
  - `POLY_API_KEY`: enables Polygon chart data
  - `ALPHA_VANTAGE_API_KEY`: enables Alpha Vantage API route
  - `KV_REST_API_URL`, `KV_REST_API_TOKEN`: enables KV routes and rate limit persistence
  - `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`: Google OAuth for next-auth
  - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: client maps
  - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Google Analytics

- Added example file (with values found in code only): ziran-generative-ui/.env.local:1
  - Note: Replace placeholder or obsolete keys before deploying.

## Known Follow-ups / Suggestions

- Consider replacing `react-financial-charts` with modern function components (e.g., Highcharts or Recharts) to remove `UNSAFE_` warnings and Strict Mode suppression.
- Optional: Add ESLint flat config for Next 16 (`eslint.config.mjs`) if linting is desired.
- Ensure analytics IDs and OAuth credentials are stored in Vercel project envs for production.
- If route-level auth is required, add guards via `auth()` in individual route handlers instead of middleware.

## How to Run Locally

- pnpm install
- pnpm dev
- Ensure `.env.local` contains the required keys as above.

## Rationale Snapshot

- All changes minimize runtime crashes by guarding unavailable envs and aligning with Next.js 16’s dynamic API changes.
- Keys are moved from code to envs; client-only values use `NEXT_PUBLIC_`.
- Dev UX improved by suppressing noisy (but harmless) warnings and removing deprecated or brittle patterns.

