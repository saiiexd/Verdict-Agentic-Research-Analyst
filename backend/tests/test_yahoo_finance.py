from app.tools.yahoo_finance import YahooFinanceTool


class DummyTicker:
	def __init__(self, ticker: str):
		self.ticker = ticker
		self.info = {
			"longName": "NVIDIA Corporation",
			"sector": "Technology",
			"marketCap": 1000000000,
		}


def test_get_company_info(monkeypatch):
	def fake_ticker(ticker: str, *args, **kwargs):
		assert ticker == "NVDA"
		return DummyTicker(ticker)

	monkeypatch.setattr("app.tools.yahoo_finance.yf.Ticker", fake_ticker)

	tool = YahooFinanceTool()
	info = tool.get_company_info("NVDA")

	assert info.company_name == "NVIDIA Corporation"
	assert info.sector == "Technology"
	assert info.market_cap == 1000000000