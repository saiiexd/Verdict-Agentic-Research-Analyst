# Final Engineering Decisions

A log of architectural trade-offs finalized prior to V1.0 release.

---

## 1. Trade-Off 1: Local Storage vs Server Database
**Decision**: V1.0 uses Zustand LocalStorage integrations instead of PostgreSQL for storing watchlists and report histories.
**Reasoning**: Reduces deployment complexity and backend infrastructure requirements for an MVP open-source launch.

## 2. Trade-Off 2: Multi-Agent Polling vs Streaming
**Decision**: The frontend polls agent state changes rather than using continuous Server-Sent Events (SSE).
**Reasoning**: Maintains clean, isolated API boundaries for the initial release while providing accurate visual timelines.

## 3. Trade-Off 3: FastAPI over Express.js
**Decision**: Python backend stack.
**Reasoning**: Better ecosystem integrations with AI data pipelines (LangGraph, Pandas, and computational libraries).
