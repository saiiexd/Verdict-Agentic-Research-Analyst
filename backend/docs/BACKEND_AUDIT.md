# Backend Audit Report

This document records the results of the comprehensive architecture review and the subsequent fixes applied to the Verdict backend to achieve a stable, production-ready state.

## Findings & Resolutions

### 1. Tight Coupling and SOLID Violations
- **Severity**: High
- **Description**: Agents (`FinancialAgent`, `NewsAgent`, `WriterAgent`) were previously initializing their tools and LLMs internally (e.g., `self.yahoo_tool = YahooFinanceTool()`). This tightly coupled business logic to specific infrastructure implementations, violating the Dependency Inversion Principle and making unit testing impossible without heavy patching.
- **Status**: **Resolved**
- **Fix**: Implemented strict constructor-based Dependency Injection. Agents now accept their tools/LLMs as input parameters.

### 2. Lack of LLM Abstraction
- **Severity**: Medium
- **Description**: The system was strictly bound to `ChatOpenAI` and OpenRouter through a monolithic `LLMProvider`.
- **Status**: **Resolved**
- **Fix**: Created an `AbstractLLMProvider` interface and implemented `OpenRouterProvider` and `GeminiProvider`. Centralized creation in an `LLMFactory` dependent on `settings.LLM_PROVIDER`.

### 3. Missing Observability
- **Severity**: Medium
- **Description**: The workflow had zero logging. Execution could fail silently or offer no insight into concurrent node behavior.
- **Status**: **Resolved**
- **Fix**: Introduced `app/core/logger.py` and implemented comprehensive logging (`info`, `warning`, `error`) across tools, agents, and API routes.

### 4. Global State Thread-Safety
- **Severity**: High
- **Description**: `app/graph/nodes.py` instantiated agents globally at the module level. In a concurrent FastAPI environment, this can lead to race conditions and memory leaks.
- **Status**: **Resolved**
- **Fix**: Replaced global instantiations with on-demand factory functions (`get_financial_agent()`, etc.) invoked natively within the node execution context.

### 5. Fragile External Tool Integrations
- **Severity**: High
- **Description**: No retry logic or timeout handling existed for external calls (Yahoo Finance, Google News, Tavily). A single transient failure caused a 500 error for the entire request.
- **Status**: **Resolved**
- **Fix**: Implemented the `@with_retry` decorator via `tenacity` on all `search` and `get_company_info` methods, ensuring exponential backoff up to 3 attempts.

### 6. Legacy / Malformed Test Suite
- **Severity**: Low
- **Description**: The `tests/` directory contained imperative scripts rather than proper `pytest` functions.
- **Status**: **Resolved**
- **Fix**: Rewrote the entire suite into `def test_*` functions adhering to proper Dependency Injection patterns and ensuring compatibility with `pytest`.
