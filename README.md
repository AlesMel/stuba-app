# Stuba Monorepo

Monorepo with Next.js web, Expo mobile, Fastify API gateway, and FastAPI RAG stub. Uses pnpm workspaces + Turborepo + shared TypeScript packages.

## Prerequisites
- Node.js 18+
- pnpm 9+
- Python 3.10+

## Install dependencies
```bash
pnpm install
```

## Development
- Run everything (web + api + ai) in parallel:
```bash
pnpm dev
```

- Run individually:
```bash
pnpm dev:web    # Next.js on http://localhost:3000
pnpm dev:api    # Fastify API on http://localhost:4000
pnpm dev:ai     # FastAPI RAG stub on http://localhost:8000
pnpm dev:mobile # Expo bundler (default port)
```

### Python service deps
Install once:
```bash
cd services/ai
pip install -r requirements.txt
```
(Use `py -m pip` on Windows if `pip` is not mapped.)

## Environment variables
- Web: `NEXT_PUBLIC_API_URL` (default `http://localhost:4000`)
- Mobile: `EXPO_PUBLIC_API_URL` (default `http://localhost:4000`)
  - On a physical device, set this to your computer's LAN IP (e.g., `http://192.168.x.x:4000`).
- API: `AI_URL` (default `http://localhost:8000`)

## Notes for macOS/Linux
```bash
pnpm install
pnpm dev       # or pnpm dev:web etc.
```

## Notes for Windows
```powershell
pnpm install
pnpm dev       # or pnpm dev:web etc.
# For Python deps
py -m pip install -r services/ai/requirements.txt
```

## Project structure
- `apps/web`: Next.js chat UI consuming shared api-client
- `apps/mobile`: Expo React Native chat UI
- `services/api`: Fastify gateway proxying to AI
- `services/ai`: FastAPI stubbed RAG
- `packages/contracts`: Shared TypeScript types
- `packages/api-client`: Shared fetch client
- `packages/schemas`: Zod schemas
