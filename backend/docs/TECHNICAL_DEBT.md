# Technical Debt & Future Considerations

This document maintains a living list of known limitations, future refactoring opportunities, scalability concerns, and engineering recommendations for the Verdict backend.

## 1. Asynchronous Execution
- **Issue**: The current LangGraph nodes, Agents, and Tools operate entirely synchronously (e.g., `requests` module, standard `def` functions).
- **Impact**: While LangGraph executes parallel branches using ThreadPools natively, moving the core architecture to native `async/await` (`httpx`, `async def`) would dramatically increase throughput and lower memory consumption under heavy API load.
- **Recommendation**: Refactor the tool integrations to use `httpx` and transition LangGraph nodes/agents to `async` functions.

## 2. Dynamic Tool Calling
- **Issue**: News collection currently merges Google News and Tavily Search uniformly.
- **Impact**: We lose the granular precision of allowing the Agent to dynamically select the tool based on the user's specific context. 
- **Recommendation**: Integrate native LangChain Tool calling bindings, enabling the LLM to actively decide whether to fetch general Google News or deep Tavily context based on the ticker metadata.

## 3. Persistent Graph Memory
- **Issue**: The `ResearchState` is ephemerally tied to the immediate FastAPI request lifecycle.
- **Impact**: The application cannot currently pause execution, wait for human-in-the-loop approval (e.g., confirming a ticker resolution), or recall previous reports.
- **Recommendation**: Integrate `langgraph.checkpoint.sqlite` or Postgres checkpointer to persist thread states, allowing long-running, multi-turn research workflows.

## 4. LLM Token / Context Limits
- **Issue**: The `WriterAgent` currently bundles the entirety of `financial_data` and all `news` articles directly into the formatting prompt.
- **Impact**: For highly active tickers (e.g., NVDA, AAPL), the news volume can exceed the context window or heavily dilute the LLM's attention span.
- **Recommendation**: Implement an intermediate summarization or vector-RAG reduction step prior to injecting text into the final Writer prompt.

## 5. Rate Limiting and Caching
- **Issue**: API endpoints and tool fetches operate strictly in real-time.
- **Impact**: Repeated requests for the same ticker will duplicate LLM cost and external API usage.
- **Recommendation**: Introduce a caching layer (Redis or memory TTL) for `financial_data` and raw `news`, and apply application-level rate limits per user on the `/research` endpoint.
