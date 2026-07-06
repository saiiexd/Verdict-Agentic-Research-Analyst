# Security Review

## Dependency Security
- **Frontend**: An initial `npm audit` revealed a critical vulnerability in `next@15.3.3` (CVE-2025-66478) involving Cache Key Confusion and SSRF. This was patched by upgrading to `next@15.5.20`. Remaining moderate vulnerabilities are deeply nested within PostCSS and pose minimal risk for local development and build-time operations.
- **Backend**: Python dependencies were audited and found to be free of known critical vulnerabilities.

## Application Security
- **API Keys**: No API keys are hardcoded in the repository. All secrets are managed via `.env` and `.env.local` files, which are explicitly listed in `.gitignore`.
- **CORS**: The FastAPI backend is configured to accept cross-origin requests securely.
- **Input Validation**: Pydantic models automatically validate incoming requests to the `/research` endpoint, mitigating injection attacks and malformed payloads.
