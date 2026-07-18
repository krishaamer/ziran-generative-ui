# Ziran Generative UI — modern web app

This is the maintained copy of the thesis-era Next.js application. The original snapshot remains untouched in [`../web-legacy`](../web-legacy).

The July 2026 refresh moved the app to Next.js 16, React 19, AI SDK 7 with Vercel AI Gateway, Tailwind CSS 4, Recharts 3, TypeScript 6, ESLint 9, and pnpm 11. It also replaces the old RSC AI helpers, Vercel KV client, custom Google Maps polyline, and React-18-only financial chart package with their supported equivalents.

## Local development

Requirements: Node.js 22 or newer and Corepack.

```bash
cp .env.example .env.local
corepack pnpm install
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

`AI_GATEWAY_API_KEY` is required for local AI chat. A Vercel deployment can use its automatically provisioned `VERCEL_OIDC_TOKEN` instead. The remaining integrations are optional; the app degrades to empty data or disabled sign-in when their credentials are absent.

## Checks

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
```

`pnpm-workspace.yaml` keeps pnpm's 24-hour minimum package release age and explicitly allows only the native dependency builds used by this application.

ESLint 9 and TypeScript 6 are deliberate compatibility pins. ESLint 10 is not yet supported by the plugins shipped with `eslint-config-next`, and TypeScript 7 is not yet supported by typescript-eslint. All other direct dependencies were upgraded to their latest compatible releases during the refresh.

## Credits

Developed by Kris Haamer from the experimental Vercel Generative UI demo, with the original project credits preserved in the [legacy README](../web-legacy/README.md).
