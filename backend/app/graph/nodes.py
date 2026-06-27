from app.agents.financial_agent import FinancialAgent
from app.agents.news_agent import NewsAgent
from app.agents.writer_agent import WriterAgent
from app.graph.state import ResearchState
from app.tools.yahoo_finance import YahooFinanceTool
from app.tools.google_news import GoogleNewsTool
from app.tools.tavily_search import TavilyTool
from app.llm.factory import LLMFactory
from app.core.logger import logger


def get_financial_agent() -> FinancialAgent:
    return FinancialAgent(yahoo_tool=YahooFinanceTool())

def get_news_agent() -> NewsAgent:
    return NewsAgent(google_tool=GoogleNewsTool(), tavily_tool=TavilyTool())

def get_writer_agent() -> WriterAgent:
    return WriterAgent(llm_provider=LLMFactory.get_provider())


def financial_node(state: ResearchState):
    """
    Fetch financial data.
    """
    logger.info(f"Running financial_node for ticker: {state['ticker']}")
    agent = get_financial_agent()
    financial_data = agent.analyze(state["ticker"])
    return {"financial_data": financial_data}


def news_node(state: ResearchState):
    """
    Fetch latest news.
    """
    logger.info(f"Running news_node for ticker: {state['ticker']}")
    agent = get_news_agent()
    news = agent.analyze(state["ticker"])
    return {"news": news}


def research_node(state: ResearchState):
    """
    Validate collected data and prepare it for the Writer Agent.
    """
    logger.info("Running research_node to validate collected data.")
    financial_available = state.get("financial_data") is not None
    news = state.get("news") or []
    news_available = bool(news)

    if not financial_available:
        logger.warning("Financial data is missing or could not be fetched.")
    if not news_available:
        logger.warning("News data is missing or could not be fetched.")

    return {
        "news_count": len(news),
        "research_ready": financial_available and news_available
    }


def writer_node(state: ResearchState):
    """
    Generate the final report using the Writer Agent.
    """
    logger.info("Running writer_node to generate report.")
    agent = get_writer_agent()
    report = agent.analyze(state)
    return {"report": report}