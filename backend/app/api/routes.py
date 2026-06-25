from fastapi import APIRouter
from app.schemas.research import ResearchRequest
from app.services.research_service import ResearchService

router = APIRouter()

research_service = ResearchService()


@router.get("/")
def root():
    return {
        "message": "Verdict Backend Running"
    }


@router.post("/research")
def research(request: ResearchRequest):
    return research_service.start_research(request.ticker)