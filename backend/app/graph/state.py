from typing import TypedDict, Optional
from app.schemas.financial import FinancialData

class ResearchState(TypedDict):
    ticker: str
    financial_data: Optional[FinancialData]
    news: Optional[list]
    report: Optional[str]
    final_report: Optional[str]