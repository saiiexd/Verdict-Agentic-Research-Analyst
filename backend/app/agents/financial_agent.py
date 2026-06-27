from app.tools.yahoo_finance import YahooFinanceTool
from app.agents.base_agent import BaseAgent
from app.core.logger import logger

class FinancialAgent(BaseAgent):

    def __init__(self, yahoo_tool: YahooFinanceTool):
        self.yahoo_tool = yahoo_tool

    def analyze(self, ticker: str):
        logger.info(f"FinancialAgent starting analysis for: {ticker}")
        financial_data = self.yahoo_tool.get_company_info(ticker)
        logger.info(f"FinancialAgent completed analysis for: {ticker}")
        return financial_data