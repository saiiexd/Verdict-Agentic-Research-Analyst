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

        import time
        from app.config.settings import settings
        start_time = time.time()
        logger.info(f"Starting LangGraph workflow for {ticker}")

        result = graph.invoke(initial_state)

        duration = round(time.time() - start_time, 2)
        logger.info(f"LangGraph workflow completed for {ticker} in {duration}s")

        return {
            "ticker": result["ticker"],
            "financial_data": result["financial_data"],
            "news": result["news"],
            "draft_report": result["report"],
            "critic_report": result["critic_report"],
            "final_report": result["final_report"],
            "metadata": {
                "duration": duration,
                "agent_count": 5,
                "status": "success",
                "model_info": f"{settings.LLM_PROVIDER.upper()} ({settings.LLM_MODEL})"
            }
        }