# Technical Decisions & Trade-offs

This document outlines the core engineering decisions made while building Verdict, justifying the technology stack against alternative options, and acknowledging the trade-offs made given the constraints of the assignment.

## 1. Why LangGraph over Simple Prompt Chaining?

**Decision**: Use LangGraph for agent orchestration instead of Langchain `SequentialChains` or raw OpenAI API calls.

**Rationale**:
Building an AI analyst requires sequential reasoning. A single massive prompt ("Here is financial data and news, act as an analyst and write a report") often leads to context loss, hallucinations, and ignored instructions. 

LangGraph allows us to model the workflow as a state machine. 
- **Separation of Concerns**: The Financial Agent doesn't need to know how to write a report; it just needs to fetch data.
- **State Persistence**: The `ResearchState` object serves as a source of truth. We can inspect the state exactly as it was *before* it reached the Writer Node, making debugging AI behaviors significantly easier.
- **Cyclic Graphs (Future-Proofing)**: While our current graph is mostly sequential, LangGraph easily allows for cycles (e.g., if the Critic rejects the draft, we can route it back to the Writer automatically).

## 2. Why FastAPI over Next.js API Routes?

**Decision**: Build a dedicated Python backend with FastAPI instead of keeping everything in TypeScript using Next.js Server Actions or API routes.

**Rationale**:
- **Python's AI Ecosystem**: The Python ecosystem for AI (Langchain, LangGraph, Pandas for financial data) is vastly superior and more mature than the JavaScript equivalents. 
- **Performance**: FastAPI's async nature handles long-running LLM requests gracefully without blocking threads.
- **Microservice Architecture**: Decoupling the UI from the LLM logic allows the frontend and backend to scale independently. If we need to process 1,000 reports overnight, we can scale the Python workers without affecting the React frontend.

## 3. Why Structured JSON Outputs (Zod & Pydantic)?

**Decision**: Force the LLM to output strictly validated JSON matching a Pydantic schema, rather than parsing markdown text.

**Rationale**:
The biggest failure point of GenAI applications is unpredictable UI rendering. If an LLM returns a string, we have to parse it with Regex, which breaks easily. 
By using Langchain's `.with_structured_output()` bound to a Pydantic model on the backend, and validating the response with Zod on the frontend, we guarantee API contract safety. The React components (Bento Grid) can confidently map over the data without throwing `undefined` errors.

## 4. Why Next.js 15 & Tailwind CSS?

**Decision**: Use Next.js (App Router) and Tailwind CSS for the frontend.

**Rationale**:
- **Next.js**: Provides server-side rendering (SSR) out of the box, ensuring fast initial page loads and excellent SEO, which is critical for a web platform.
- **Tailwind**: Allows for rapid iteration of the highly aesthetic "Bento Box" UI. It keeps the CSS bundle small and enforces a consistent design system without the overhead of styled-components.

## 5. Trade-offs & Compromises

Given the scope and time constraints of the assignment, several intentional trade-offs were made:

1. **No Persistent Database (Yet)**
   - *Ideal*: Use PostgreSQL via SQLAlchemy/Prisma to store user sessions and historical reports.
   - *Compromise*: We omitted a database to reduce setup friction for the reviewer. The application currently functions entirely in-memory per request. Adding a DB is trivial once the core AI logic is proven.

2. **Sequential vs. Parallel Execution**
   - *Ideal*: Run the Financial Node and News Node entirely asynchronously in parallel to cut response time in half.
   - *Compromise*: Currently, they run sequentially in the graph for simplicity of state management and debugging.

3. **No Streaming**
   - *Ideal*: Use Server-Sent Events (SSE) to stream the LLM tokens to the UI in real-time, significantly improving perceived performance.
   - *Compromise*: We currently wait for the entire graph to execute before returning the final JSON. While slower (15-30 seconds), it guarantees the Critic and Refiner nodes have finished their work before the user sees anything, preventing them from reading un-audited drafts.

## 6. Scalability Considerations for Production

If Verdict were deployed to production for 10,000 users, we would implement:
- **Redis / Celery**: Offload the LangGraph execution to background workers (Celery). The FastAPI endpoint would immediately return a `job_id`, and the Next.js client would poll (or use WebSockets) to get the final report, preventing HTTP timeout issues.
- **LangSmith Tracing**: Enable LangSmith to monitor token usage, latency per node, and LLM output quality across production runs.
