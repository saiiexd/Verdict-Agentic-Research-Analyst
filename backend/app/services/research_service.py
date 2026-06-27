from app.graph.workflow import graph
from app.core.logger import logger


class ResearchService:

    def start_research(self, ticker: str):

        initial_state = {
            "ticker": ticker,
            "financial_data": None,
            "news": None,
            "report": None,
            "final_report": None,
        }

        logger.info(f"Starting LangGraph workflow for {ticker}")
        result = graph.invoke(initial_state)
        logger.info(f"LangGraph workflow completed for {ticker}")

        return result