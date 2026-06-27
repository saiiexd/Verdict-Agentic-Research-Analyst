from app.agents.financial_agent import FinancialAgent
from app.agents.news_agent import NewsAgent
from app.graph.state import ResearchState

financial_agent = FinancialAgent()
news_agent = NewsAgent()


def financial_node(state: ResearchState):
    """
    Fetch financial data.
    """

    financial_data = financial_agent.analyze(state["ticker"])

    return {
        "financial_data": financial_data
    }


def news_node(state: ResearchState):
    """
    Fetch latest news.
    """

    news = news_agent.analyze(state["ticker"])

    return {
        "news": news
    }


def research_node(state: ResearchState):
    """
    Validate collected data and prepare it for the Writer Agent.
    """

    financial_available = state.get("financial_data") is not None
    news_available = state.get("news") is not None

    return {
        "news_count": len(state["news"]) if news_available else 0,
        "research_ready": financial_available and news_available
    }