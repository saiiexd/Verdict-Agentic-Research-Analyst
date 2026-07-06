# Known Limitations

While the Verdict project is certified stable, the following limitations and acceptable risks remain:

1. **PostCSS Vulnerabilities**: The frontend `npm audit` reports moderate vulnerabilities within nested `postcss` dependencies. These are deeply tied to Next.js internals and cannot be trivially upgraded without risking framework instability. They pose minimal threat as they execute at build time, not runtime.
2. **Missing Unit Tests for Frontend**: The frontend currently relies entirely on static typing (TypeScript) and visual verification. A comprehensive test suite (Jest/Vitest) is recommended for future iterations.
3. **API Key Dependency**: The application cannot perform meaningful research without valid, paid API keys (Tavily, LLM Provider). Tests passing locally only verify that the pipeline orchestrates correctly; they do not verify the quality of the LLM output.
4. **Synchronous Polling**: The frontend currently waits synchronously for the backend to complete its LangGraph execution (which can take 15-30+ seconds). A future iteration should consider WebSockets or Server-Sent Events (SSE) for real-time progress updates.
