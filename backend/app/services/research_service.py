from app.graph.workflow import graph
from app.core.logger import logger


class ResearchService:

    def start_research(self, ticker: str):

        initial_state = {
            "ticker": ticker,
            "financial_data": None,
            "news": [],
            "news_count": 0,
            "research_ready": False,
            "report": None,
            "critic_report": None,
            "final_report": None,
            "citations": [],
        }

        logger.info(f"Starting LangGraph workflow for {ticker}")

        result = graph.invoke(initial_state)

        logger.info(f"LangGraph workflow completed for {ticker}")

        return {
            "ticker": result["ticker"],
            "financial_data": result["financial_data"],
            "news": result["news"],
            "draft_report": result["report"],
            "critic_report": result["critic_report"],
            "final_report": result["final_report"],
        }