from pydantic import BaseModel


class FinancialData(BaseModel):
    ticker: str
    company_name: str | None = None
    sector: str | None = None
    industry: str | None = None
    current_price: float | None = None
    previous_close: float | None = None
    market_cap: int | None = None
    pe_ratio: float | None = None
    eps: float | None = None
    profit_margin: float | None = None
    revenue_growth: float | None = None
    debt_to_equity: float | None = None
    currency: str | None = None
    revenue: int | None = None
    gross_margin: float | None = None
    roe: float | None = None
    fifty_two_week_high: float | None = None
    fifty_two_week_low: float | None = None
    dividend_yield: float | None = None
    beta: float | None = None
    analyst_recommendation: str | None = None