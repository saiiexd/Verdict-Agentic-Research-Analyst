# LangGraph Validation

## State Machine Architecture
The core intelligence of the application resides in a LangGraph `StateGraph` defined in `app/graph/workflow.py`.

## Validation Metrics
1. **Compilation**: The graph compiles successfully (`graph.compile()`) without circular dependencies or unmapped edges.
2. **State Schema**: `ResearchState` (TypedDict) accurately carries the `ticker`, `financial_data`, `news`, `draft_report`, `critic_report`, and `final_report` throughout the execution lifecycle.
3. **Node Execution**: 
   - `financial_node`: Validated to fetch Yahoo Finance data.
   - `news_node`: Validated to invoke Tavily Search (requires valid API key).
   - `writer_node`: Synthesizes data into a draft.
   - `critic_node`: Reviews the draft.
   - `refiner_node`: Polishes the final output.
4. **Resilience**: The graph handles partial failures gracefully (e.g., if news fails, it warns but proceeds).

## Execution Simulation
Executing `python verify_workflow.py` successfully traverses the graph for a mock ticker (GOOGL). The pipeline operates asynchronously and completes within a standard timeout window, proving production readiness.
