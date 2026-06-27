from langgraph.graph import END, START, StateGraph

from app.graph.nodes import (
    financial_node,
    news_node,
    research_node,
)
from app.graph.state import ResearchState

builder = StateGraph(ResearchState)

# Nodes
builder.add_node("financial", financial_node)
builder.add_node("news", news_node)
builder.add_node("research", research_node)

# Graph Flow
builder.add_edge(START, "financial")
builder.add_edge(START, "news")

builder.add_edge("financial", "research")
builder.add_edge("news", "research")

builder.add_edge("research", END)

graph = builder.compile()