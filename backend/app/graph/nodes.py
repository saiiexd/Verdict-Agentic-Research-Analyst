from app.agents.financial_agent import FinancialAgent
from app.graph.state import ResearchState

financial_agent = FinancialAgent()


def financial_node(state: ResearchState) -> ResearchState:

    print("Financial Node Executed")

    financial_data = financial_agent.analyze(state["ticker"])

    state["financial_data"] = financial_data

    return state