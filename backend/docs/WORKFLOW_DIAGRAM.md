# Workflow Diagram

This document illustrates the LangGraph execution flow for the Verdict research process.

## Research State Graph

```mermaid
stateDiagram-v2
    direction TB
    
    [*] --> START
    
    START --> financial_node
    START --> news_node
    
    financial_node --> research_node : Updates `financial_data`
    news_node --> research_node : Updates `news`
    
    research_node --> writer_node : Validates Data & Transitions
    
    writer_node --> END : Generates `report`
    
    END --> [*]
```

## Node Responsibilities

1. **`financial_node`**: Leverages the `FinancialAgent` to synchronously fetch real-time market data utilizing the `YahooFinanceTool`.
2. **`news_node`**: Leverages the `NewsAgent` to concurrently fetch RSS data and semantic web search via `GoogleNewsTool` and `TavilyTool`, returning a deduplicated set of articles.
3. **`research_node`**: Acts as an aggregation and validation barrier. Confirms that `financial_data` and `news` are populated, logging warnings gracefully if they are missing.
4. **`writer_node`**: Injects the consolidated state context into the `WriterAgent`, invoking the abstracted LLM infrastructure to synthesize the equity research report.
