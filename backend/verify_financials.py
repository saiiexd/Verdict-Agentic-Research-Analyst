import os
import sys

# Add backend directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.tools.yahoo_finance import YahooFinanceTool
import yfinance as yf

tickers = [
    "AAPL", "MSFT", "NVDA", "GOOGL", "META", "AMZN", "TSLA",
    "RELIANCE", "TCS", "INFY", "SBIN", "HDFCBANK", "ICICIBANK"
]

tool = YahooFinanceTool()

for raw_ticker in tickers:
    try:
        data = tool.get_company_info(raw_ticker)
        print(f"--- {raw_ticker} -> {data.ticker} ---")
        print(f"Name: {data.company_name}")
        print(f"Exchange: {data.exchange}")
        print(f"Currency: {data.currency} | Financial Currency: {data.financial_currency}")
        print(f"Current Price: {data.current_price}")
        print(f"Market Cap: {data.market_cap}")
        print(f"Revenue: {data.revenue}")
        print(f"P/E Ratio: {data.pe_ratio}")
        print(f"ROE: {data.roe}")
        print(f"Gross Margin: {data.gross_margin}")
        print(f"Operating Margin: {data.operating_margin}")
        print(f"Beta: {data.beta}")
        print(f"Enterprise Value: {data.enterprise_value}")
    except Exception as e:
        print(f"FAILED {raw_ticker}: {str(e)}")
