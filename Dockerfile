## Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# install deps
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

# copy everything and build
COPY . .

# generate sitemap into public before build
RUN node scripts/generate-sitemap.mjs || true

RUN npm run build

## Production stage
FROM node:18-alpine
WORKDIR /app

# copy server and built files
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/server ./server
COPY package.json package-lock.json* ./

# install production deps only
RUN npm install --production --legacy-peer-deps

EXPOSE 3000
CMD ["node", "server/index.js"]
