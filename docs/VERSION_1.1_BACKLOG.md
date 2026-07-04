# Version 1.1 Engineering Backlog

This backlog records planned features and infrastructure milestones excluded from the V1.0 scope.

---

## 1. Authentication & Cloud Sync
- Migrate from Zustand localStorage caching to a centralized database (Supabase/PostgreSQL).
- Implement OAuth login gateways (Clerk/Auth0).

## 2. Real-Time Pipelines
- Add Server-Sent Event (SSE) streaming capabilities to the FastAPI `/research` endpoint to render reports token-by-token.
- Introduce WebSocket connections for live stock price tickers inside Watchlist cards.

## 3. RAG Integrations
- Enable the AI Writer Agent to ingest historical 10-K filings using Pinecone/ChromaDB vector embedding stores.
