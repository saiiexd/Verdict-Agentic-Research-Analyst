# Next Steps & Development Roadmap

This document outlines the ordered development roadmap for expanding the Verdict multi-agent research workflow.

## Milestone 1: Architecture Stabilization
- [x] Refactor core infrastructure to use Dependency Injection.
- [x] Establish abstract LLM Factory Pattern.
- [x] Centralize structured logging and robust external retry mechanisms.
- [x] Align test suite with architectural standards.

## Milestone 2: Core Agent Expansion (Current)
The immediate next phase involves expanding the LangGraph pipeline with specialized analytical agents.

1. **Critic Agent Implementation**
   - **Goal**: Introduce a post-generation validation node.
   - **Responsibility**: Evaluate the `WriterAgent`'s initial report against the source financial and news context to identify hallucinations, bias, or numerical inaccuracies.
   
2. **Refiner Agent Implementation**
   - **Goal**: Iterative report improvement.
   - **Responsibility**: Takes the feedback from the Critic Agent and updates the draft to produce the `final_report`.

3. **Graph Topology Update**
   - **Transition**: `Writer` -> `Critic` -> `Refiner` -> `END` (or loops back to `Writer` conditionally).

## Milestone 3: Advanced Intelligence Integration
1. **Risk Agent**: Independently isolates macro and micro risks associated with the ticker context.
2. **Sentiment Agent**: Analyzes the specific polarity and tone of the collected news to inject a numeric sentiment score into the `ResearchState`.
3. **Citation Agent**: Maps LLM generated claims specifically to the source URLs fetched by the Google News and Tavily integrations.

## Milestone 4: Operational Production Readiness
1. Introduce asynchronous HTTP fetching (`httpx`) inside the Tool layer.
2. Migrate all LangGraph nodes to async execution.
3. Integrate Persistent Checkpointing for state resilience and UI synchronization.
