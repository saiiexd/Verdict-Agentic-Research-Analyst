# Maintenance Guide

This document assists future contributors in understanding how to maintain Verdict.

---

## 1. Routine Package Updates
- Regularly run `npm outdated` in the frontend directory.
- Update `FastAPI` and `LangGraph` packages locally to test for backwards-incompatible API shifts.

## 2. API Key Rotations
- Ensure `TAVILY_API_KEY` and LLM API keys are regularly cycled. Update them strictly via the `.env` local environments or hosting control panels (like Vercel config limits).
- DO NOT inject secret API keys into frontend Next.js configs.

## 3. UI Component Adjustments
- Reusable React components exist inside `/frontend/src/components`. Maintain the 'Bento grid' classes (`grid-cols-4`, `gap-4`) when designing new metric widgets.
