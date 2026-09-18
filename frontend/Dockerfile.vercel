# syntax=docker/dockerfile:1

ARG NODE_VERSION=26.7.0-alpine3.23
ARG NGINX_VERSION=alpine3.24

# Use a lightweight Node.js image for building (customizable via ARG)
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
# Install project dependencies using npm ci (ensures a clean, reproducible install)
RUN --mount=type=cache,target=/root/.npm npm ci
COPY . .
RUN npm run build

# =========================================
# Stage 2: Prepare Nginx to Serve Static Files
# =========================================

FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runner
# COPY <donde esta el contexto> <donde queda dentro del contenedor>
COPY nginx/nginx.conf /etc/nginx/nginx.conf
# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html
USER nginx
# Note: The default NGINX container now listens on port 8080 instead of 80
EXPOSE 8080
# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]