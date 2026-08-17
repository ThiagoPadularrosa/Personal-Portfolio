# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.16.0

FROM node:${NODE_VERSION}-alpine AS builder

# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . .

# Expose the port that the application listens on.
EXPOSE 4000

# Run the application.
RUN npm run build

# Deps Stage: install production dependencies only.
FROM node:${NODE_VERSION}-alpine AS deps

#Path inside the container not in my local machine
WORKDIR /usr/src/app 

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Runner Stage: a minimal runtime image with compiled app and production deps.
FROM node:${NODE_VERSION}-alpine AS runner

ENV PATH=/app/node_modules/.bin:$PATH

WORKDIR /usr/src/app

COPY --from=deps --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=builder --chown=node:node /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/server.js"]