# Next Steps

## Completed Milestones
- [x] Implement multi-agent backend using LangGraph.
- [x] Wrap external APIs using Tools with Retry capabilities.
- [x] Standardize schemas and LLM abstractions.
- [x] Architecture Stabilization (Exception handling, code deduplication, logging standard).
- [x] Achieve solid automated test coverage across agents, nodes, and APIs.

## Current Milestone
- [ ] Connect the frontend UI (Next.js/Vite) to the stable backend API.
- [ ] Ensure end-to-end payload handling correctly maps to React states.

## Recommended Next Milestones
1. **Caching Layer Implementation**: Add Redis or an in-memory store for `ResearchService` and Tools to prevent redundant identical requests within a 24-hour window.
2. **Semantic Deduplication**: Replace the primitive exact-match title deduplication in `NewsAgent` with a fast embedding-based similarity check.
3. **Advanced Tool Execution**: Allow the LangGraph `research_node` to iteratively loop if the critic determines the report is lacking evidence, before reaching the refiner.
