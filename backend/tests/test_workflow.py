from pprint import pprint

from app.graph.workflow import ResearchState, graph

initial_state = ResearchState(
    ticker="NVDA",
    financial_data=None,
    news=None,
    news_count=None,
    research_ready=None,
    report=None,
    final_report=None,
    citations=[],
)

result = graph.invoke(initial_state)

pprint(result)

print("\n" + "=" * 80)
print(result["report"])
print("=" * 80)