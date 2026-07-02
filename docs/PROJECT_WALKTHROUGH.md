# Project Walkthrough

This document serves as a guided tour of the Verdict AI platform. It is written from the perspective of a developer presenting the system during a technical architecture interview.

## 1. The Entry Point: User Interaction (Frontend)

The journey begins in the Next.js frontend (`frontend/src/app/page.tsx`). 

When a user navigates to the application, they are greeted with the Landing Page. The core interaction point is a simple input field where they can type a stock ticker (e.g., `NVDA`, `TSLA`). 

When the user clicks "Analyze":
- The UI immediately transitions into a loading state. We use optimistic UI updates and Skeleton loaders to ensure the user knows work is happening in the background.
- A `POST` request is dispatched via Axios/React Query to our FastAPI backend: `http://localhost:8000/api/research` with the payload `{"ticker": "NVDA"}`.

## 2. API Gateway & Validation (Backend)

The request hits our FastAPI router at `backend/app/api/routes.py`. 
- **Pydantic Validation**: The payload is instantly validated against the `ResearchRequest` schema. If the user sent an empty string or an invalid data type, FastAPI automatically rejects it with a 422 Unprocessable Entity error before it even hits our business logic.
- **Service Layer**: The request is passed to `ResearchService.start_research(ticker)`.

## 3. Initializing LangGraph (The Orchestrator)

Inside the `ResearchService`, we initialize our LangGraph state machine (`backend/app/graph/workflow.py`). 

LangGraph is our orchestrator. Instead of throwing a massive prompt at an LLM and hoping for the best, we instantiate a `ResearchState` object. This state will act as a shared memory bus that gets passed from node to node.

```python
# Initial State
{
    "ticker": "NVDA",
    "financial_data": None,
    "news": None,
    "report": None,
    "critic_report": None,
    "final_report": None
}
```

## 4. Execution Pipeline (The Agents)

The graph executes its nodes as defined in `backend/app/graph/nodes.py`.

### Step A: Data Gathering (Parallelizable)
The graph first hits the **Financial Node** and **News Node**.
- `FinancialAgent` uses `YahooFinanceTool` to pull live P/E ratios, historical prices, and analyst estimates. It updates the state: `state["financial_data"] = {...}`.
- `NewsAgent` uses `TavilyTool` to scrape the web for recent articles about "NVIDIA". It updates the state: `state["news"] = [...]`.

### Step B: The Writer
Once data is gathered, the state flows into the **Writer Node**. 
The `WriterAgent` compiles the raw numbers and news articles into a massive context window and asks the LLM to draft the first version of the report, strictly adhering to our Pydantic JSON schema.

### Step C: The Critic
The drafted report flows to the **Critic Node**. 
The `CriticAgent` is prompted specifically to play devil's advocate. It reads the draft, compares it to the raw financial data, and looks for hallucinations or extreme bias (e.g., "The writer claims NVDA has zero risks, but the news mentioned geopolitical export bans"). 

### Step D: The Refiner
The state now contains the draft and the critique. It enters the **Refiner Node**. 
The `RefinerAgent` incorporates the critique to fix any errors, adjust the tone, and output the absolute final JSON report.

## 5. Returning the Verdict

Once the graph reaches the `END` node, LangGraph returns the fully populated state object.
The FastAPI router takes the `final_report` field, wraps it in a standard API response envelope, and returns it to the Next.js client with a 200 OK status.

## 6. Rendering the UI (Frontend)

Back in Next.js, the React Query hook resolves with the data. 
Because the backend utilized Langchain's `.with_structured_output()`, we are 100% confident that the JSON perfectly matches the TypeScript interfaces we defined in the frontend.

The UI hides the loading skeletons and instantly renders the "Bento Grid" layout:
- **Header Card**: Shows the ticker, current price, and the final Agent Verdict (Invest, Hold, Pass).
- **Financials Card**: Maps over the revenue growth and margin data.
- **SWOT Analysis**: Renders the Strengths, Weaknesses, Opportunities, and Threats lists.
- **Risk Matrix**: Displays operational and macroeconomic risks.

## 7. Error Handling Walkthrough

What happens if something goes wrong?
- **Bad Ticker**: If Yahoo Finance returns a 404 for a ticker, the `FinancialAgent` throws an `InvalidTickerException`. The API returns a 404, and the Next.js UI displays a friendly toast notification: "Ticker not found."
- **LLM Timeout**: If OpenRouter/Gemini times out, our HTTP exception handler catches it, returns a 500, and the UI tells the user to try again.
- **Node Failure**: If the `CriticNode` fails for any reason, our graph logic is built with fallbacks (it simply returns the original `report` as the `final_report` rather than crashing the whole system).

## Summary
By separating concerns—FastAPI for robust routing, LangGraph for deterministic AI reasoning, strictly typed JSON schemas for safe data transfer, and Next.js for a premium UI—Verdict achieves the reliability expected of enterprise software.
