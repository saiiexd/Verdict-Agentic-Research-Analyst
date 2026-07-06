# Performance Audit

## Frontend Performance
- **Bundle Size**: Next.js production builds generated highly optimized chunks. The first load JS for the main application is extremely lightweight.
- **Rendering**: Heavy UI components (charts, markdown rendering) are lazy-loaded or managed efficiently by React.
- **Caching**: React Query is utilized for client-side caching of research reports, eliminating redundant network calls.

## Backend Performance
- **Concurrency**: The FastAPI framework utilizes standard Python asynchronous concurrency (`async`/`await`), easily handling multiple simultaneous API requests.
- **LangGraph**: Agent execution times are inherently bottlenecked by external LLM provider latency (e.g., OpenAI, Gemini API limits). The system mitigates timeout risk by moving long-running tasks into the background or utilizing streaming (if implemented). Currently, standard execution time without active streaming takes roughly 15-30 seconds depending on LLM response times.
- **Memory**: The backend memory footprint is minimal since no local models are loaded; all heavy computation is outsourced to API providers.
