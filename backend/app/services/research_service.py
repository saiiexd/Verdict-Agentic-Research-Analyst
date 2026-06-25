from app.agents.financial_agent import FinancialAgent


class ResearchService:

    def __init__(self):
        self.financial_agent = FinancialAgent()

    def start_research(self, ticker: str):

        financial_data = self.financial_agent.analyze(ticker)

        return {
            "status": "success",
            "financial_data": financial_data
        }