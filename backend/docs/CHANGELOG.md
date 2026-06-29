# Changelog

All notable changes to the Verdict Agentic Research Analyst Backend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - Initial Architecture Stabilization

### Added
- **Centralized Structured Logging**: Introduced `app/core/logger.py` to trace API workflows and internal agent/tool behavior effectively.
- **LLM Provider Factory**: Created `app/llm/base.py` and `app/llm/factory.py` to enable hot-swappable LLM clients (OpenRouter, Gemini) securely.
- **Retry Mechanisms**: Added `app/llm/retry.py` utilizing `tenacity` to apply exponential backoff logic across all tool API calls (`YahooFinanceTool`, `GoogleNewsTool`, `TavilyTool`).
- **Comprehensive Test Suite**: Refactored `tests/` into proper `pytest` functions that mock or invoke correctly structured agents.
- **Graceful Error Handling**: Implemented catch-all 500 error handlers inside `api/routes.py` to prevent workflow crashes from propagating unhandled exceptions.

### Changed
- **Dependency Injection**: Modified `FinancialAgent`, `NewsAgent`, and `WriterAgent` to accept tools and LLM instances via constructors rather than hardcoding them.
- **Graph Nodes**: Refactored `app/graph/nodes.py` to eliminate module-level global state, utilizing a factory initialization pattern for safer API concurrency.
- **Validation Node**: Expanded logic inside `research_node` to actively emit warnings and explicitly check data payloads, resolving prior passive checks.

### Fixed
- **Dependency Conflicts**: Resolved `langchain-core` compatibility errors by explicitly upgrading the standard library across the backend environment.
- **Pydantic Validation**: Updated `test_settings.py` to dynamically construct a mock `Settings` object, unblocking automated CI validations.
