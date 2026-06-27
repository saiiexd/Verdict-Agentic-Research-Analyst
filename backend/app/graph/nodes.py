from app.agents.financial_agent import FinancialAgent
from app.agents.news_agent import NewsAgent
from app.graph.state import ResearchState
from app.agents.writer_agent import WriterAgent


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
    news = state.get("news") or []
    news_available = bool(news)

    return {
        "news_count": len(news),
        "research_ready": financial_available and news_available
    }


writer_agent = WriterAgent()

def writer_node(state: ResearchState):

    report = writer_agent.analyze(state)

    return {
        "report": report
    }