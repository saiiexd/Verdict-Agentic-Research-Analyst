# Verdict Data Binding Audit

This document summarizes the full-stack data binding audit for **Verdict 1.0**. It maps every field in the backend agents and schemas to the corresponding React components on the frontend.

## 1. Trace Overview
The research request flows through the following stages:
1. **Frontend Trigger**: The user enters a stock ticker (e.g., `AAPL`) in `CommandSearch.tsx`.
2. **API Dispatch**: `researchService.ts` dispatches a `POST` request to `/api/research`.
3. **Route Handoff**: `routes.py` maps the request to `ResearchService.start_research`.
4. **Agent Workflow (LangGraph)**:
   - **Financial Agent**: Fetches core financials from `YahooFinanceTool` (yfinance).
   - **News Agent**: Gathers articles from `GoogleNewsTool` and `TavilyTool`.
   - **Research Node**: Aggregates datasets and checks readiness.
   - **Writer Agent**: Generates first draft (structured report).
   - **Critic Agent**: Audits draft and scores report quality (1-10 scale).
   - **Refiner Agent**: Polishes report using critic suggestions.
5. **Response Serialization**: The result is serialized to FastAPI's `ApiResponse` schema.
6. **Frontend State Hydration**: React Query mutation maps the response to `useAppStore.ts` workspace state.
7. **Component Render**: Bento grid widgets map nested values (e.g. `final_report.opportunities`, `financial_data.roe`, `metadata.duration`) onto the UI.

## 2. Identified Schema & Mapping Mismatches
During the audit, the following mismatches were identified and corrected:

| Frontend Expected Field | Backend Pydantic Field | Status | Fix Applied |
| :--- | :--- | :--- | :--- |
| `roe` | *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `returnOnEquity` in `YahooFinanceTool`. |
| `beta` | *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `beta` in `YahooFinanceTool`. |
| `dividend_yield` | *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `dividendYield` in `YahooFinanceTool`. |
| `fifty_two_week_high`| *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `fiftyTwoWeekHigh` in `YahooFinanceTool`. |
| `fifty_two_week_low` | *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `fiftyTwoWeekLow` in `YahooFinanceTool`. |
| `analyst_recommendation` | *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `recommendationKey` (cleaned to Title Case). |
| `gross_margin` | *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `grossMargins` in `YahooFinanceTool`. |
| `revenue` | *Missing in Pydantic* | **Fixed** | Added to `FinancialData` schema; mapped to `totalRevenue` in `YahooFinanceTool`. |
| `sentiment` | *Missing in Pydantic* | **Fixed** | Added to `NewsArticle` schema; calculated dynamically using keyword classification in `NewsAgent`. |
| `overall_score` (1-10) | `overall_score` (1-10) | **Fixed** | Rescaled by `x 10` on frontend to map to 0-100% confidence gauge widget correctly. |

## 3. Serialization and Validation
Both FastAPI (`ApiResponse`) and Frontend Zod (`ResearchResponseSchema`) validation models are fully aligned. Zod validation completes without failures, and all fields are successfully destructured without silent rendering halts.
