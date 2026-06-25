from app.tools.yahoo_finance import YahooFinanceTool


class FinancialAgent:

    def __init__(self):
        self.yahoo_tool = YahooFinanceTool()

    def analyze(self, ticker: str):

        financial_data = self.yahoo_tool.get_company_info(ticker)

        return financial_data