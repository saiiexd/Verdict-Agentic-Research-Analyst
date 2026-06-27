from app.graph.workflow import graph


class ResearchService:

    def start_research(self, ticker: str):

        initial_state = {
            "ticker": ticker,
            "financial_data": None,
            "news": None,
            "report": None,
            "final_report": None,
        }

        result = graph.invoke(initial_state)

        return result