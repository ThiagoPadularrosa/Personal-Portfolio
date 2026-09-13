# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.16.0

# Stage 1: Application dependencies and source
FROM node:${NODE_VERSION}-alpine AS builder
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci
COPY . .


# Stage 2:Deps Stage: install production dependencies only.
FROM node:${NODE_VERSION}-alpine AS deps
ENV NODE_ENV=production
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev


# Stage 3: Runner Stage: a minimal runtime image with compiled app and production deps.
FROM node:${NODE_VERSION}-alpine AS runner
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs expressjs
# Production Dependencies
COPY --from=deps --chown=expressjs:nodejs \
    /usr/src/app/node_modules \
    ./node_modules
# Application Source
COPY --from=builder --chown=expressjs:nodejs \
    /usr/src/app/src \
    ./src
# Entry Point
COPY --from=builder --chown=expressjs:nodejs \
    /usr/src/app/server.js \
    ./server.js
# Collector
COPY --from=builder --chown=expressjs:nodejs \
    /usr/src/app/otelcol.yaml \
    ./otelcol.yaml
USER expressjs
EXPOSE 4000
CMD ["node", "server.js"]