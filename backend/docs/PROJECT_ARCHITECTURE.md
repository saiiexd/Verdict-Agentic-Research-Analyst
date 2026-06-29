# Verdict Agentic Research Analyst - Project Architecture

## Overview
Verdict is an AI-powered financial research platform that performs multi-agent equity research for publicly traded companies. The system uses an agentic workflow orchestrated by LangGraph to gather financial data, collect real-time news, validate the information, and generate a professional equity research report.

## Directory Structure
The backend codebase is organized following a strict layered architecture:

- `app/api/`: Exposes FastAPI endpoints (e.g., `/research`).
- `app/services/`: Contains the business logic that connects the API layer to the LangGraph workflow.
- `app/graph/`: Houses the LangGraph definitions (`nodes.py`, `state.py`, `workflow.py`).
- `app/agents/`: Encapsulates specific domain reasoning (e.g., `FinancialAgent`, `NewsAgent`, `WriterAgent`).
- `app/tools/`: Contains integrations with external data sources (Yahoo Finance, Google News RSS, Tavily Search).
- `app/llm/`: Provides a unified abstraction layer for accessing Language Models via a Factory pattern.
- `app/schemas/`: Defines Pydantic models mapping data structures across the application.
- `app/core/`: Contains infrastructure utilities like centralized structured logging.
- `app/exceptions/`: Centralizes custom domain exceptions.
- `app/config/`: Manages environment-based configuration loading using `pydantic-settings`.

## Data Flow
1. **Request Lifecycle**: An HTTP POST request arrives at `/research` with a ticker symbol.
2. **Service Invocation**: `ResearchService` initiates the LangGraph workflow by creating an initial `ResearchState`.
3. **Parallel Data Gathering**: The `START` node transitions to the `financial_node` and `news_node` concurrently. 
4. **Validation**: Both branches converge on the `research_node`, which validates that sufficient financial and news data has been acquired.
5. **Report Generation**: The state transitions to the `writer_node`, which utilizes the LLM abstraction to produce an equity research report.
6. **Response**: The final report state is returned to the service and sent as an HTTP 200 response to the client.

## Design Patterns Used
- **Dependency Injection**: Agents are injected with specific Tool or LLM instances instead of instantiating them directly. This adheres to the Dependency Inversion Principle (DIP).
- **Factory Pattern**: The `LLMFactory` dynamically provisions abstract LLM clients (`OpenRouterProvider`, `GeminiProvider`) based on the environment configuration, shielding agents from underlying LangChain/provider specifics.
- **State Machine**: LangGraph manages complex, parallel agent behaviors safely utilizing typed data states and deterministic edges.
- **Decorator Pattern**: The `@with_retry` mechanism leverages the `tenacity` library to wrap external HTTP calls, providing robust fault-tolerance without polluting business logic.
