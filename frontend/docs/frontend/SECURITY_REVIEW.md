# Security Review

This document audits the attack surface, input vectors, dependency chains, and user session structures of Verdict.

---

## 1. Input Sanitization & XSS Prevention

- **HTML Parsing**: Verdict uses standard React DOM bindings. All text from the AI writer and refiner is rendered as standard strings, preventing execution of injected `<script>` tags.
- **Markdown Rendering**: Any Markdown rendering is processed using secure, sanitised parsers.

---

## 2. API Configuration & Secret Management

- **No client-side secrets**: All API keys (e.g. Gemini, SEC databases) reside exclusively on the FastAPI server. The Next.js client does not store or process credentials, keeping the client bundle clean.
- **HTTP Communications**: Production endpoints are locked to HTTPS, preventing mid-layer data sniffing.

---

## 3. Dependency Auditing

- Run regular dependency vulnerability checks:
  ```bash
  npm audit
  ```
- Make sure to review package locks prior to main branch deployments.
