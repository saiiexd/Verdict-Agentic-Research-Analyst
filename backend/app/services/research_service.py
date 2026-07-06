from app.graph.workflow import graph
from app.core.logger import logger
from app.tools.yahoo_finance import YahooFinanceTool


class ResearchService:

    def start_research(self, ticker: str):

        # Validate ticker early to fail fast and return 404
        financial_data = YahooFinanceTool().get_company_info(ticker)

        initial_state = {
            "ticker": ticker,
            "financial_data": financial_data,
            "news": [],
            "news_count": 0,
            "research_ready": False,
            "report": None,
            "critic_report": None,
            "final_report": None,
            "citations": [],
        }

        logger.info(f"Starting LangGraph workflow for {ticker}")

<<<<<<< HEAD
        result = graph.invoke(initial_state)
=======
        result = graph.invoke(initial_state) # type: ignore
>>>>>>> bc7f3ac (Continue Verdict v1.0 development)

        logger.info(f"LangGraph workflow completed for {ticker}")

        return {
            "ticker": result["ticker"],
            "financial_data": result["financial_data"],
            "news": result["news"],
            "draft_report": result["report"],
            "critic_report": result["critic_report"],
            "final_report": result["final_report"],
        }