from app.agents.financial_agent import FinancialAgent
from app.agents.news_agent import NewsAgent
from app.agents.writer_agent import WriterAgent
from app.agents.critic_agent import CriticAgent
from app.agents.refiner_agent import RefinerAgent

from app.graph.state import ResearchState

from app.tools.yahoo_finance import YahooFinanceTool
from app.tools.google_news import GoogleNewsTool
from app.tools.tavily_search import TavilyTool

from app.llm.factory import LLMFactory

from app.core.logger import logger


# -----------------------------
# Dependency Factory Functions
# -----------------------------

def get_financial_agent() -> FinancialAgent:
    return FinancialAgent(
        yahoo_tool=YahooFinanceTool()
    )


def get_news_agent() -> NewsAgent:
    return NewsAgent(
        google_tool=GoogleNewsTool(),
        tavily_tool=TavilyTool()
    )


def get_writer_agent() -> WriterAgent:
    return WriterAgent(
        llm_provider=LLMFactory.get_provider()
    )


def get_critic_agent() -> CriticAgent:
    return CriticAgent(
        provider=LLMFactory.get_provider()
    )


def get_refiner_agent() -> RefinerAgent:
    return RefinerAgent(
        provider=LLMFactory.get_provider()
    )


# -----------------------------
# Financial Node
# -----------------------------

def financial_node(state: ResearchState):

    logger.info(f"Running Financial Node | Ticker: {state['ticker']}")

    if state.get("financial_data"):
        logger.info("Financial data already present, skipping fetch.")
        return {"financial_data": state["financial_data"]}

    agent = get_financial_agent()

    try:
        financial_data = agent.analyze(state["ticker"])
    except Exception as e:
        logger.error(f"Financial Node failed: {str(e)}", exc_info=True)
        financial_data = None

    return {
        "financial_data": financial_data
    }


# -----------------------------
# News Node
# -----------------------------

def news_node(state: ResearchState):

    logger.info(f"Running News Node | Ticker: {state['ticker']}")

    agent = get_news_agent()

    try:
        news = agent.analyze(state["ticker"])
    except Exception as e:
        logger.error(f"News Node failed: {str(e)}", exc_info=True)
        news = []

    return {
        "news": news
    }


# -----------------------------
# Research Node
# -----------------------------

def research_node(state: ResearchState):

    logger.info("Running Research Node")

    financial_available = state.get("financial_data") is not None

    news = state.get("news") or []

    news_available = len(news) > 0

    if not financial_available:
        logger.warning("Financial data unavailable.")

    if not news_available:
        logger.warning("News data unavailable.")

    return {
        "news_count": len(news),
        "research_ready": financial_available and news_available,
    }


# -----------------------------
# Writer Node
# -----------------------------

def writer_node(state: ResearchState):

    logger.info("Running Writer Node")

    agent = get_writer_agent()

    try:
        report = agent.analyze(state)
        logger.info("Writer Node Completed")
    except Exception as e:
        logger.error(f"Writer Node failed: {str(e)}", exc_info=True)
        report = None

    return {
        "report": report
    }


# -----------------------------
# Critic Node
# -----------------------------

def critic_node(state: ResearchState):

    logger.info("Running Critic Node")

    agent = get_critic_agent()

    report = state.get("report")
    if not report:
        logger.warning("Critic Node skipped: No report available.")
        return {"critic_report": None}

    try:
        critic_report = agent.analyze(report)
        logger.info("Critic Node Completed")
    except Exception as e:
        logger.error(f"Critic Node failed: {str(e)}", exc_info=True)
        critic_report = None

    return {
        "critic_report": critic_report
    }


# -----------------------------
# Refiner Node
# -----------------------------

def refiner_node(state: ResearchState):

    logger.info("Running Refiner Node")

    agent = get_refiner_agent()

    report = state.get("report")
    critic_report = state.get("critic_report")

    if not report or not critic_report:
        logger.warning("Refiner Node skipped: Missing report or critic_report.")
        return {"final_report": report}

    try:
        final_report = agent.analyze(report, critic_report)
        logger.info("Refiner Node Completed")
    except Exception as e:
        logger.error(f"Refiner Node failed: {str(e)}", exc_info=True)
        final_report = report  # Fallback to the original report

    return {
        "final_report": final_report
    }