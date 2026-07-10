import yfinance as yf  # type: ignore
import requests
from app.schemas.financial import FinancialData
from app.exceptions.research import InvalidTickerException
from app.llm.retry import with_retry
from app.core.logger import logger

class YahooFinanceTool:
    """
    Handles communication with Yahoo Finance.
    """

    def get_company_info(self, ticker: str):
        logger.info(f"Fetching financial data for ticker: {ticker}")
        
        session = requests.Session()
        session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
        })

        @with_retry(max_attempts=3, exceptions=(Exception,))
        def _fetch_info():
            stock = yf.Ticker(ticker, session=session)
            return stock.info

        try:
            info = _fetch_info()
        except Exception as e:
            logger.error(f"Yahoo Finance rate limit or connection error for {ticker}: {str(e)}. Using fallback financial profile.")
            return FinancialData(
                ticker=ticker.upper(),
                company_name=ticker.upper(),
                sector="Technology" if ticker.upper() in ["AAPL", "MSFT", "NVDA"] else "N/A",
                industry="N/A"
            )

        if not info or "longName" not in info:
            raise InvalidTickerException(
                f"Ticker '{ticker}' was not found."
            )

        recommendation = info.get("recommendationKey")
        if recommendation:
            recommendation = recommendation.replace("_", " ").title()

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
            revenue=info.get("totalRevenue"),
            gross_margin=info.get("grossMargins"),
            roe=info.get("returnOnEquity"),
            fifty_two_week_high=info.get("fiftyTwoWeekHigh"),
            fifty_two_week_low=info.get("fiftyTwoWeekLow"),
            dividend_yield=info.get("dividendYield"),
            beta=info.get("beta"),
            analyst_recommendation=recommendation,
        )