# Verdict - Agentic AI Equity Research Platform

![Verdict AI Architecture](https://img.shields.io/badge/Status-Production_Ready-success)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_15-black)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688)
![LangGraph](https://img.shields.io/badge/Agent_Framework-LangGraph-000000)

Verdict is a multi-agent financial research platform designed to automate institutional-grade equity analysis. By leveraging a coordinated pipeline of specialized AI agents (via LangGraph), Verdict aggregates real-time market data, performs fundamental analysis, evaluates breaking news, and synthesizes a comprehensive investment thesis.

---

## 1. System Topology & Agents

Verdict decouple the research process into specialized cognitive agents running stateful loops:
1. **Financial Agent**: Scrapes financial statements, PE ratios, and key metrics via Yahoo Finance APIs.
2. **News Agent**: Collects global market headlines and calculates sentiment distributions.
3. **Writer Agent**: Combines structured data into initial draft sections.
4. **Critic Agent**: Reviews draft reports for hallucination risks and logical consistency.
5. **Refiner Agent**: Packages critique feedback into a final, structured JSON report.

---

## 2. Key Features

- **Stateful Agent Loops**: Built using LangGraph to enable multi-agent debate and refinement cycles instead of single-shot prompts.
- **Productivity Toolbar**: Command Palette (`Ctrl+K`), sequence hotkeys (`gd`, `gh`, `gs`), breadcrumb trails, and Focus Mode.
- **Watchlist & Personalization**: Customize layout densities (Comfortable vs. Compact) and track monitored companies.
- **Structured Skeletons & Svg Analytics**: Progressive document shimmers and Recharts SVG sentiment distribution metrics.

---

## 3. Quickstart Guide

### Prerequisites
- Node.js (v18+)
- Python (3.11+)
- API Keys: 
  - **Tavily API Key** (for web research)
  - **LLM API Key** (Gemini, OpenRouter, or OpenAI)

### Setup
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/saiiexd/Verdict-Agentic-Research-Analyst.git
   cd Verdict-Agentic-Research-Analyst
   ```
2. **Setup Backend (FastAPI)**:
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python -m uvicorn app.main:app --reload --port 8000
   ```
3. **Setup Frontend (Next.js)**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

---

## 4. Engineering Documentation Index

- [Documentation Index](./docs/FINAL_DOCUMENTATION_INDEX.md): Links to all architecture topologies, DevOps setup guides, testing strategies, security audits, and roadmaps.