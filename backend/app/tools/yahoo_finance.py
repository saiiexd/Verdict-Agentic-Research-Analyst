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

    def _normalize_ticker(self, ticker: str) -> str:
        ticker = ticker.upper().strip()
        if "." in ticker:
            return ticker
        
        indian_stocks = {
            "RELIANCE", "TCS", "INFY", "SBIN", "HDFCBANK", "ICICIBANK", 
            "LT", "WIPRO", "ITC", "BHARTIARTL", "AXISBANK", "MARUTI", "SUNPHARMA"
        }
        
        if ticker in indian_stocks:
            return f"{ticker}.NS"
            
        return ticker

    def get_company_info(self, raw_ticker: str):
        ticker = self._normalize_ticker(raw_ticker)
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
            info = stock.info
            # yfinance returns {'regularMarketPrice': None, ...} or raises 404 for invalid tickers
            if not info or ("longName" not in info and "shortName" not in info):
                raise ValueError(f"Ticker '{ticker}' not found or has no valid profile.")
            return info

        try:
            info = _fetch_info()
        except ValueError as ve:
            # Re-raise invalid ticker exception cleanly
            raise InvalidTickerException(str(ve))
        except Exception as e:
            error_str = str(e)
            if "404" in error_str:
                raise InvalidTickerException(f"Ticker '{ticker}' was not found.")
                
            logger.error(f"Yahoo Finance rate limit or connection error for {ticker}: {error_str}. Using fallback financial profile.")
            return FinancialData(
                ticker=ticker,
                company_name=ticker,
                sector="Technology" if ticker in ["AAPL", "MSFT", "NVDA", "TCS.NS", "INFY.NS", "WIPRO.NS"] else "N/A",
                industry="N/A"
            )

        if not info or ("longName" not in info and "shortName" not in info):
            raise InvalidTickerException(f"Ticker '{ticker}' was not found.")

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
            financial_currency=info.get("financialCurrency"),
            exchange=info.get("exchange"),
            quote_type=info.get("quoteType"),
            revenue=info.get("totalRevenue"),
            gross_margin=info.get("grossMargins"),
            operating_margin=info.get("operatingMargins"),
            roe=info.get("returnOnEquity"),
            roa=info.get("returnOnAssets"),
            fifty_two_week_high=info.get("fiftyTwoWeekHigh"),
            fifty_two_week_low=info.get("fiftyTwoWeekLow"),
            dividend_yield=info.get("dividendYield"),
            beta=info.get("beta"),
            forward_pe=info.get("forwardPE"),
            enterprise_value=info.get("enterpriseValue"),
            analyst_recommendation=recommendation,
        )