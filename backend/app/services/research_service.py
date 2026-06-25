class ResearchService:

    def start_research(self, ticker: str):
        return {
            "ticker": ticker,
            "status": "Research request received"
        }