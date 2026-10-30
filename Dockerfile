FROM node:18-alpine

WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application files
COPY --chown=node:node app.js healthcheck.js ./

# Run as non-root user
USER node

# Application port
EXPOSE 3000

# Container health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node healthcheck.js

# Start application
CMD ["node", "app.js"]
