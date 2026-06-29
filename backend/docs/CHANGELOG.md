# Changelog

## [2026-06-29] - Architecture Stabilization & Refactoring

### Added
- `invoke_structured` method to `AbstractLLMProvider` in `app/llm/base.py`.
- Graceful fallbacks for structured outputs in `GeminiProvider` and `OpenRouterProvider`.
- Standardized logging statements in `CriticAgent` and `RefinerAgent`.
- `test_critic_agent.py`, `test_refiner_agent.py`, `test_research_service.py` with mock-based unit tests.

### Changed
- `WriterAgent`, `CriticAgent`, and `RefinerAgent` now use dependency injection of the `AbstractLLMProvider` instead of manually extracting the LangChain model.
- `RefinerAgent` now correctly returns a `ResearchReport` structured output to match `ResearchState`.
- `nodes.py` now wraps all agent invocations in `try-except` blocks to prevent the LangGraph from crashing during external API failures.
- Rewrote `test_tavily.py` and `test_google_news.py` to be actual Pytest units instead of manual print scripts.
- Updated documentation in the `docs` directory to reflect the stabilized architecture.

### Fixed
- Fixed the `GoogleNewsTool` exception swallowing that prevented the `@with_retry` decorator from functioning.
- Added `critic_report` to `ResearchState` initialization in `test_workflow.py`.
