# Environment Setup

This document details the configuration of the environment variables used by the Verdict project.

## Backend Environment (`backend/.env`)
The backend requires a `.env` file located in the `backend/` directory. If it does not exist, copy `.env.example` to `.env` and populate the values.

### Required API Keys
- `TAVILY_API_KEY`: Used by the `NewsAgent` for web scraping and information gathering. Get one at [tavily.com](https://app.tavily.com).
- `LLM_API_KEY`: Required by the Language Model Provider for generating reports.

### Application Settings
- `APP_NAME`: Set to `"Verdict API"`
- `APP_VERSION`: Set to `"1.0.0"`
- `DEBUG`: Set to `True` for development.
- `LLM_PROVIDER`: The chosen LLM provider (e.g., `gemini`, `openai`, `openrouter`). Default is `gemini`.
- `LLM_MODEL`: The specific model to use (e.g., `gemini-2.5-pro`).
- `DATABASE_URL`: Connection string for the database (e.g., `sqlite:///./test.db`).

## Frontend Environment (`frontend/.env.local`)
The frontend communicates with the backend via API endpoints.

- `NEXT_PUBLIC_API_URL`: Set to the base URL of the backend server. By default, this is `http://localhost:8000`.

*Note: All placeholder environment variables have been generated during the recovery process. You must replace the placeholders with your actual API keys before running the application.*
