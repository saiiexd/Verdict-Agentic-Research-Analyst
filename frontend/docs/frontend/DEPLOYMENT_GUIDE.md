# Deployment Guide

This guide details the procedures for compiling and deploying Verdict's Next.js workspace to various hosting platforms.

---

## 1. Hosting Options

### Vercel Deployment
Next.js applications can be deployed directly to Vercel:
1. Link your GitHub repository to Vercel.
2. Configure environment variables (e.g. `NEXT_PUBLIC_API_URL` matching the FastAPI endpoint).
3. Vercel automatically detects Next.js settings and triggers `npm run build`.

### Docker Containerization
Verdict can be containerized to run in Kubernetes or custom cloud engines:
1. Create a `Dockerfile` at the root of the frontend:
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/package*.json ./
   RUN npm ci --only=production
   EXPOSE 3000
   CMD ["npm", "start"]
   ```
2. Build and run:
   ```bash
   docker build -t verdict-frontend .
   docker run -p 3000:3000 --env NEXT_PUBLIC_API_URL=http://api.verdict.com verdict-frontend
   ```

---

## 2. Environment Configurations

| Key | Description | Default | Environment |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | Endpoint of the FastAPI backend | `http://localhost:8000` | Client/Server |
| `NODE_ENV` | Build optimizer flag | `production` | Build/Runtime |
