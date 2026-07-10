from app.graph.state import ResearchState

state: ResearchState = {
    "ticker": "NVDA",
    "financial_data": None,
    "news": None,
    "news_count": 0,
    "research_ready": False,
    "report": None,
    "critic_report": None,
    "final_report": None,
    "citations": [],
}

print(state)