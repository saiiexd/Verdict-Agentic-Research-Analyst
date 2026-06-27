from app.agents.financial_agent import FinancialAgent
from app.tools.yahoo_finance import YahooFinanceTool

def test_financial_agent():
    agent = FinancialAgent(yahoo_tool=YahooFinanceTool())
    result = agent.analyze("NVDA")
    assert result is not None
    assert result.ticker == "NVDA"