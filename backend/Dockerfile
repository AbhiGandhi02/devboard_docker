# ==================== PRODUCTION ====================
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy source code
COPY server.js .

# Set environment
ENV NODE_ENV=production

# Run as non-root user for security
USER node

EXPOSE 5000
CMD ["node", "server.js"]

# ==================== DEVELOPMENT ====================
FROM node:18 AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy source code
COPY server.js .

# Set environment
ENV NODE_ENV=development

EXPOSE 5000
CMD ["npx", "nodemon", "server.js"]
