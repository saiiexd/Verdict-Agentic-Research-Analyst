from langgraph.graph import START, END, StateGraph

from app.graph.nodes import financial_node
from app.graph.state import ResearchState


builder = StateGraph(ResearchState)

builder.add_node("financial", financial_node)

builder.add_edge(START, "financial")

builder.add_edge("financial", END)

graph = builder.compile()