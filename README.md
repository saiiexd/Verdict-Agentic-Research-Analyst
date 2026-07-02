# Verdict - Agentic AI Equity Research Platform

![Verdict AI Architecture](https://img.shields.io/badge/Status-Production_Ready-success)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_15-black)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![LangGraph](https://img.shields.io/badge/Agent_Framework-LangGraph-000000)

Verdict is a multi-agent financial research platform designed to automate institutional-grade equity analysis. By leveraging a coordinated pipeline of specialized AI agents (via LangGraph), Verdict aggregates real-time market data, performs fundamental analysis, evaluates breaking news, and synthesizes a comprehensive investment thesis.

## Overview

Traditional equity research is time-consuming and prone to human cognitive bias. Verdict solves this by decoupling the research process into specialized cognitive agents:
1.  **Financial Agent**: Extracts live market data and fundamentals via Yahoo Finance.
2.  **News Agent**: Aggregates and sentiment-scores recent developments via Tavily Search.
3.  **Writer Agent**: Synthesizes data into a structured initial draft.
4.  **Critic Agent**: Audits the draft for hallucination risk, logical consistency, and bias.
5.  **Refiner Agent**: Integrates critique to produce the final, publication-ready report.

The result is an objective, highly structured investment report rendered instantly on a beautifully designed React frontend.

---

## Key Features
- **Multi-Agent Orchestration**: Built on LangGraph to ensure strict state management and sequential reasoning rather than relying on brittle, single-shot prompts.
- **Strict Structured Outputs**: Uses Pydantic and Zod to enforce schema-validated JSON outputs, eliminating UI rendering failures caused by unpredictable LLM text generation.
- **Bento-Box UI**: The Next.js frontend uses a highly scannable, responsive "Bento grid" layout for instant comprehension of complex financial data.
- **Resilient API Layer**: FastAPI backend with robust error boundaries, graceful fallbacks for agent failures, and strongly typed communication.

---

## Quickstart Guide

### Prerequisites
- Node.js (v18+)
- Python (3.11+)
- API Keys: 
  - **Tavily API Key** (for agentic web search)
  - **LLM API Key** (Gemini, OpenRouter, Groq, or OpenAI)

### 1. Repository Setup
```bash
git clone https://github.com/your-username/Verdict-Agentic-Research-Analyst.git
cd Verdict-Agentic-Research-Analyst
```

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory by copying the example:
```bash
cp backend/.env.example backend/.env
```
Populate the `backend/.env` file with your keys:
```env
TAVILY_API_KEY=your_tavily_key
LLM_PROVIDER=gemini       # or openai, openrouter
LLM_MODEL=gemini-2.0-flash
LLM_API_KEY=your_llm_key
```

### 3. Backend Setup (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
The API will be available at `http://localhost:8000` (Swagger UI at `/docs`).

### 4. Frontend Setup (Next.js)
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## Technical Architecture

The platform follows a decoupled client-server architecture:
- **Frontend**: Next.js App Router, Tailwind CSS, Lucide Icons, Zustand (State Management), React Query (Data Fetching).
- **Backend**: FastAPI, LangGraph, Pydantic (Schema Enforcement), Langchain.

For a deep dive into the engineering decisions, graph structure, and state management, please refer to the following documentation:
- [System Architecture](./docs/ARCHITECTURE.md)
- [Project Walkthrough](./docs/PROJECT_WALKTHROUGH.md)
- [Technical Decisions & Trade-offs](./docs/TECHNICAL_DECISIONS.md)
- [LLM Development Logs](./llm-development-logs/SUMMARY.md)

---

## Future Enhancements
- **RAG for SEC Filings**: Integrate a vector database to ingest 10-K/10-Q filings for deep fundamental queries over historical data.
- **Server-Sent Events (SSE)**: Stream agent status updates token-by-token to the frontend instead of waiting for full pipeline execution.
- **Authentication & Persistence**: Integrate PostgreSQL/Supabase to save user reports and track portfolio analytics over time.

---

*Developed for the Altuni AI Labs Engineering Assignment.*