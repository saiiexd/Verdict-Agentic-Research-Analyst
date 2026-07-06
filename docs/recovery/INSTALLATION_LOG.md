# Installation Log

## Backend Installation
1. Executed `python -m venv venv` in `backend/` to create a virtual environment.
2. Executed `.\venv\Scripts\pip install -r requirements.txt -r requirements-dev.txt`.
3. Installation completed successfully.
    - Updated packages: `fastapi`, `langgraph`, `langchain`, `pydantic`, `uvicorn`, `yfinance`, `tavily-python`, and their dependencies.
    - Python environment activated successfully.

## Frontend Installation
1. Executed `npm install` in `frontend/`.
    - 431 packages added.
    - 2 vulnerabilities found (1 moderate, 1 critical).
2. Executed `npm audit fix --force`.
    - Next.js updated from `15.3.3` to `15.5.20` to resolve critical vulnerabilities.
    - Remaining vulnerabilities stem from `postcss` dependency required by Next.js internals.
3. Executed `npm run build`.
    - **Failure 1**: Build failed due to missing module `@/lib/errors`.
    - **Fix 1**: Reconstructed `src/lib/errors.ts` containing `ResearchError` and `normalizeError`.
    - **Failure 2**: Build failed because `AppError` was missing the `isRecoverable` property.
    - **Fix 2**: Updated `src/lib/errors.ts` to include `isRecoverable` boolean and export `AppError`.
    - **Success**: Build completed successfully on the third attempt, generating static and dynamic routes.
