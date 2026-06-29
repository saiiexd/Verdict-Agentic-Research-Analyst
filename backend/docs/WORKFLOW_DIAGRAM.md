# Verdict Workflow Diagram

```mermaid
stateDiagram-v2
    [*] --> START
    
    START --> financial_node
    START --> news_node
    
    financial_node --> research_node : FinancialData
    news_node --> research_node : list[NewsArticle]
    
    note right of financial_node
        Yahoo Finance API
        Handles Exceptions
    end note
    
    note right of news_node
        Google News + Tavily API
        Handles Exceptions
    end note
    
    research_node --> writer_node : Data Readiness Check
    
    writer_node --> critic_node : Draft ResearchReport
    
    critic_node --> refiner_node : CriticReport
    
    refiner_node --> END : Final ResearchReport
    
    END --> [*]
```

### Node Responsibilities
- **financial**: Fetches stock fundamentals using `YahooFinanceTool`.
- **news**: Fetches and deduplicates recent articles using `GoogleNewsTool` and `TavilyTool`.
- **research**: Evaluates if the required data is present to proceed with report generation.
- **writer**: Generates the first draft `ResearchReport` using the `WriterAgent` and structured LLM outputs.
- **critic**: Critiques the draft using `CriticAgent`.
- **refiner**: Merges the draft and critique to produce the final `ResearchReport` using `RefinerAgent`.
