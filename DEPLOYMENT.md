# Verdict Deployment Guide

This document describes how to deploy Verdict Version 1.0 (both frontend and backend services) to production environments.

## Production Topology
Verdict is structured as a decoupled application:
- **Frontend**: A static/SSR Next.js application, recommended to deploy to **Vercel** or **Netlify**.
- **Backend**: A stateless FastAPI ASGI application, recommended to deploy to **Render**, **Fly.io**, or **Railway**.

---

## 1. Backend Deployment (FastAPI)

### Deploy to Render or Fly.io
1. **Repository Link**: Connect your GitHub repository to your host platform.
2. **Build Command**: No build step is required for raw python, or run dependency installation:
   ```bash
   pip install -r requirements.txt
   ```
3. **Start Command**: Run uvicorn/gunicorn binding to the host port:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port $PORT
   ```
4. **Environment Variables**:
   - `LLM_PROVIDER=gemini`
   - `LLM_MODEL=gemini-2.5-flash`
   - `LLM_API_KEY=your_gemini_api_key`
   - `TAVILY_API_KEY=your_tavily_api_key`
   - `DATABASE_URL=sqlite:///./prod.db` (or a PostgreSQL URI for persistent workspace history)

---

## 2. Frontend Deployment (Next.js)

### Deploy to Vercel
1. **Import Project**: Connect your repository to Vercel.
2. **Root Directory**: Select the `frontend` folder as the project root.
3. **Build Settings**: Vercel automatically detects Next.js:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com` (point to the deployed FastAPI API gateway URL)

---

## 3. Post-Deployment Verification
- Navigate to your deployed frontend URL.
- Test searching for a stock ticker (e.g. `AAPL`) and ensure the research pipeline completes.
- Inspect the Network tab in your browser's Developer Tools to confirm HTTP POST requests resolve successfully to the backend API endpoint.
