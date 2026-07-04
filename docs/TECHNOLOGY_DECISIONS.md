# Technology Decisions

This document details the reasoning behind the technologies selected for the Verdict platform.

---

## 1. Frontend Stack

- **Next.js & App Router**: Enforces production-grade, page-level routing and static optimization.
- **TypeScript**: Standardizes interfaces, ensuring type-safe API communication between the client and FastAPI.
- **Zustand**: A lightweight state manager chosen over Redux for its clean, modular syntax and built-in local persistence hooks.
- **Recharts**: Provides high-performance, presentation-focused SVG charts for clean metrics rendering.
- **Framer Motion**: Handles smooth modal scaling, column collapses, and timeline transitions.

---

## 2. Backend Stack

- **FastAPI**: Selected for its asynchronous capabilities, auto-generated OpenAPI documentation, and fast execution speeds.
- **LangGraph**: Enables stateful multi-agent execution, allowing the system to backtrack or run cycles (e.g. Writer draft -> Critic debate -> Refiner packs).
- **Pydantic**: Validates JSON payloads, ensuring strict API type safety.
- **Yahoo Finance & Tavily**: Sources reliable real-time balance sheets, market data, and headlines.
