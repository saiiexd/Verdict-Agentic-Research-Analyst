# Fix Log

This document records all automated and manual fixes applied during the recovery and audit process.

1. **Next.js Vulnerability**: Upgraded Next.js from `15.3.3` to `15.5.20` via `npm audit fix --force` to resolve CVE-2025-66478.
2. **Missing Source File**: Detected missing `@/lib/errors` module during frontend compilation. Reconstructed `src/lib/errors.ts` implementing the `ResearchError` class and `normalizeError` utility.
3. **TypeScript Type Mismatch**: The `AppError` type was missing the `isRecoverable` property expected by `ReportPanel.tsx`. Updated the type definition and recompiled successfully.
4. **Duplicate Lockfile Warning**: Removed `package-lock.json` from the repository root to prevent Next.js workspace inference warnings.
5. **Backend Linting**: Purged 7 unused `pytest` imports across various test files using `ruff check . --fix`.
6. **Backend Typing (mypy)**:
   - Fixed `builtins.any` usage in `gemini.py` and `openrouter.py` by importing `typing.Any`.
   - Suppressed stub warnings for the un-typed `yfinance` library.
   - Suppressed dynamic dictionary invocation typing for LangGraph's `Pregel.invoke()`.
7. **Unit Test Flakiness**: The `test_news_agent.py` was making live API calls without an API key, causing a crash. Patched the test using `unittest.mock.MagicMock` to simulate the API response.
