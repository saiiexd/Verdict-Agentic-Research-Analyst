from pydantic import BaseModel

class ResearchRequest(BaseModel):
    ticker: str
