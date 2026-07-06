# Dependency Audit

This document outlines the state of dependencies after the fresh clone recovery process.

## Backend Dependencies
The backend uses `pip` as its package manager.
- All packages defined in `requirements.txt` and `requirements-dev.txt` installed successfully into the isolated virtual environment (`venv`).
- Key packages verified: `fastapi`, `langgraph`, `langchain-core`, `langchain-openai`, `langchain-google-genai`, `yfinance`, `tavily-python`, `pydantic`.
- Python version verified during the `venv` creation process (Windows `python -m venv venv`).

## Frontend Dependencies
The frontend uses `npm` as its package manager (detected via `package-lock.json`).
- Core dependencies include: `next@15.3.3` (updated during audit to `15.5.20`), `react@19.0.0`, `tailwindcss@4.0.0`, `framer-motion`, `zustand`, `@tanstack/react-query`.
- **Security Audit**: An initial `npm install` revealed 2 vulnerabilities (1 moderate, 1 critical).
- **Resolution**: Ran `npm audit fix --force`, which resolved the critical vulnerability by bumping `next`. The remaining moderate vulnerabilities relate to older `postcss` versions expected by Next.js components, which cannot be fixed without a breaking downgrade of Next.js itself. These are considered acceptable for local development.

## Missing Files Reconstructed
During the frontend build process, the file `src/lib/errors.ts` was found missing, causing the production build to fail. The file was reconstructed to provide the required `ResearchError` class and `AppError` type with an `isRecoverable` flag for graceful error handling in the React components.
