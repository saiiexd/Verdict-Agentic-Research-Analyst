# System Overview

Verdict is an automated equity research platform. It coordinates multi-agent workflows to synthesize financial filings and headlines into structured investment reports.

---

## 1. Core Workflow Stages

1. **Workspace Initiation**:
   - The user inputs a ticker symbol in the `CommandSearch` search bar.
   - The Next.js client transitions to the `Running` state and displays the agent execution timeline.
2. **Orchestration Nodes**:
   - **Financial Agent**: Scrapes balance sheets, PE ratios, current pricing, and key metrics.
   - **News Agent**: Gathers headlines, publishing dates, and calculates sentiment distributions.
   - **Writer Agent**: Combines the financial data and news sentiment into a draft document.
   - **Critic Agent**: Reviews findings, checks for biases, and assigns an overall confidence rating.
   - **Refiner Agent**: Packages the final report into structured JSON responses.
3. **Structured Rendering**:
   - The client parses the JSON response and displays recommendation badges, valuation charts, and citations.
4. **History & Watchlists**:
   - Reports are automatically cached on the client using Zustand, allowing users to pin assets or browse previous research runs.
