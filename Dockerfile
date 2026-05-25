# =============================================================================
# Dockerfile - Ayush Aahar (Coolify Deployment)
# @author Ayush Aahar Dev Team
# @description Multi-stage build: Vite client -> Express server
#
# OWASP: Non-root user, minimal image, no secrets in layers
# JIRA: AYUSH-012 #time 1h #comment Add Dockerfile for Coolify deployment
# =============================================================================

# --- Stage 1: Build the React client ---
FROM node:20-alpine AS client-build

WORKDIR /app/client
COPY client/package.json client/package-lock.json* ./
RUN npm ci
COPY client/ ./
RUN npm run build

# --- Stage 2: Install server dependencies ---
FROM node:20-alpine AS server-deps

WORKDIR /app/server
COPY server/package.json server/package-lock.json* ./
RUN npm ci --omit=dev

# --- Stage 3: Production image ---
FROM node:20-alpine AS production

ENV NODE_ENV=production
ENV PORT=5001

WORKDIR /app

# Copy server source + production deps
COPY server/ ./server/
COPY --from=server-deps /app/server/node_modules ./server/node_modules

# Copy built client into expected path
COPY --from=client-build /app/client/dist ./client/dist

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 5001

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5001/api/health || exit 1

CMD ["node", "server/src/index.js"]
