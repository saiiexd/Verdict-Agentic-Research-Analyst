from fastapi import APIRouter
from app.schemas.research import ResearchRequest


router = APIRouter()

@router.get("/")
def root():
    return {
        "message": "Verdict Backend is running!"
    }

@router.post("/research")
def research(request: ResearchRequest):
    return {
        "ticker": request.ticker,
        "status": "Research request received"
    }
