from pydantic import BaseModel
from typing import Optional

class NewsArticle(BaseModel):
    title: str
    url: str
    source: Optional[str] = None
    published_at: Optional[str] = None
    summary: Optional[str] = None
    provider: str
    relevance_score: Optional[float] = None