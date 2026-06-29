# Verdict - Agentic Research Analyst Backend Architecture

## Overview
Verdict is a multi-agent financial research analyst application built with FastAPI, LangGraph, and a structured LLM abstraction layer. It asynchronously orchestrates multiple agents to gather news, extract financial data, write reports, critique them, and refine them into final research deliverables.

## Directory Structure
- `app/api/`: FastAPI routes and endpoint definitions.
- `app/agents/`: Individual agent classes (`FinancialAgent`, `NewsAgent`, `WriterAgent`, `CriticAgent`, `RefinerAgent`).
- `app/config/`: Centralized Pydantic settings.
- `app/core/`: Core utilities like the centralized logger.
- `app/exceptions/`: Custom domain exceptions.
- `app/graph/`: LangGraph workflow definition, node execution, and state management.
- `app/llm/`: LLM Factory and Provider Abstractions, handling OpenRouter and Gemini.
- `app/prompts/`: System prompts for the LLM.
- `app/schemas/`: Pydantic models for API requests, state, and structured LLM output.
- `app/services/`: Service layer tying the API to the LangGraph execution.
- `app/tools/`: Integration with external data providers (Yahoo Finance, Google News, Tavily).

## Data Flow
1. Client POSTs to `/research` with a ticker.
2. `ResearchService` initializes a `ResearchState` dictionary.
3. LangGraph Workflow begins at `START` node.
4. It parallelizes to `financial` and `news` nodes.
5. External tools fetch data and handle failures gracefully via `@with_retry`.
6. `research_node` evaluates data readiness.
7. `writer_node` generates a draft `ResearchReport` using structured LLM output.
8. `critic_node` critiques the draft, returning a `CriticReport`.
9. `refiner_node` outputs the final `ResearchReport`.
10. `ResearchService` maps the output state to the `ApiResponse` schema and returns it to the client.
