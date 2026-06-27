import yfinance as yf
from app.schemas.financial import FinancialData
from app.exceptions.research import InvalidTickerException
from app.llm.retry import with_retry
from app.core.logger import logger

class YahooFinanceTool:
    """
    Handles communication with Yahoo Finance.
    """

    @with_retry(max_attempts=3, exceptions=(Exception,))
    def get_company_info(self, ticker: str):
        logger.info(f"Fetching financial data for ticker: {ticker}")
        stock = yf.Ticker(ticker)
        info = stock.info

        if not info or "longName" not in info:
            raise InvalidTickerException(
                f"Ticker '{ticker}' was not found."
            )

        return FinancialData(
            ticker=ticker.upper(),
            company_name=info.get("longName"),
            sector=info.get("sector"),
            industry=info.get("industry"),
            current_price=info.get("currentPrice"),
            previous_close=info.get("previousClose"),
            market_cap=info.get("marketCap"),
            pe_ratio=info.get("trailingPE"),
            eps=info.get("trailingEps"),
            profit_margin=info.get("profitMargins"),
            revenue_growth=info.get("revenueGrowth"),
            debt_to_equity=info.get("debtToEquity"),
            currency=info.get("currency"),
        )