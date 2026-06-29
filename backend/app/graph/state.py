from typing import Annotated, Optional, TypedDict

from app.schemas.financial import FinancialData
from app.schemas.news import NewsArticle
from app.schemas.report import ResearchReport

def merge_lists(left: list, right: list) -> list:
    """
    Merge two lists when multiple nodes update
    the same state key.
    """
    return left + right


class ResearchState(TypedDict):
    ticker: str

    financial_data: Optional[FinancialData]

    news: Optional[list[NewsArticle]]

    news_count: Optional[int]

    research_ready: Optional[bool]

    report: Optional[ResearchReport]
    
    final_report: Optional[str]

    citations: Annotated[list[str], merge_lists]