# -----------------------------------------------------------------------------
# Stage 1 — Dependencies
# -----------------------------------------------------------------------------
FROM node:22-bookworm-slim AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# -----------------------------------------------------------------------------
# Stage 2 — Build Nuxt / Nitro
# -----------------------------------------------------------------------------
FROM node:22-bookworm-slim AS build
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3 — Runtime
# -----------------------------------------------------------------------------
FROM node:22-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY --from=build /app/.output ./.output

EXPOSE 80

CMD ["node", ".output/server/index.mjs"]
