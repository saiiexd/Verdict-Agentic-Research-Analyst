# Dependency Audit

## Node.js Ecosystem (Frontend)
- **Framework**: `next@15.5.20` (Upgraded from 15.3.3 to resolve critical CVEs).
- **Core**: `react@19.0.0`, `react-dom@19.0.0`.
- **State Management**: `zustand@5.0.1`, `@tanstack/react-query@5.56.0`.
- **Styling**: `tailwindcss@4.0.0`, `framer-motion@11.11.0`, `lucide-react@0.468.0`.
- **Validation**: `zod@3.23.8`.
- **Vulnerabilities**: Addressed critical Next.js Server Components denial of service and cache confusion issues via forced audit fix. Remaining issues tied to older PostCSS versions are accepted risks for the local dev server.

## Python Ecosystem (Backend)
- **Framework**: `fastapi@0.138.1`, `uvicorn@0.49.0`.
- **Orchestration**: `langgraph@1.2.6`, `langchain-core@1.4.8`.
- **Agents/Tools**: `langchain-openai`, `langchain-google-genai`, `yfinance`, `tavily-python`.
- **Code Quality**: `ruff`, `mypy`, `pytest`.
- **Vulnerabilities**: None detected. All dependencies installed into a pristine virtual environment without conflict.

## Artifact Status
All local caches (`node_modules`, `venv`, `.next`, `__pycache__`) were cleanly regenerated from source, confirming that the repository alone is sufficient to build the dependency tree.
