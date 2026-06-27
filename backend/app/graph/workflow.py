from langgraph.graph import START, END, StateGraph

from app.graph.state import ResearchState

from app.graph.nodes import (
    financial_node,
    news_node,
    research_node,
    writer_node,
)

builder = StateGraph(ResearchState)

# Register Nodes
builder.add_node("financial", financial_node)
builder.add_node("news", news_node)
builder.add_node("research", research_node)
builder.add_node("writer", writer_node)

# Graph
builder.add_edge(START, "financial")
builder.add_edge(START, "news")

builder.add_edge("financial", "research")
builder.add_edge("news", "research")

builder.add_edge("research", "writer")

builder.add_edge("writer", END)

graph = builder.compile()