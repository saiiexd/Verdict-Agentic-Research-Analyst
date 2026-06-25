from fastapi import APIRouter
from app.schemas.research import ResearchRequest
from app.services.research_service import ResearchService
from app.schemas.response import ApiResponse
from fastapi import HTTPException
from app.exceptions.research import InvalidTickerException



router = APIRouter()

research_service = ResearchService()


@router.get("/")
def root():
    return {
        "message": "Verdict Backend Running"
    }


@router.post("/research", response_model=ApiResponse)
def research(request: ResearchRequest):

    try:

        result = research_service.start_research(
            request.ticker
        )

        return ApiResponse(
            success=True,
            message="Research completed successfully.",
            data=result
        )

    except InvalidTickerException as e:

        raise HTTPException(
            status_code=404,
            detail=str(e)
        )