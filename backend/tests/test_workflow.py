from pprint import pprint

from app.graph.workflow import graph

initial_state = {
    "ticker": "NVDA",
    "financial_data": None,
    "news": None,
    "report": None,
    "final_report": None,
}

result = graph.invoke(initial_state)

pprint(result)