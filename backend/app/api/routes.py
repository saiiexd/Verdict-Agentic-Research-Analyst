from fastapi import APIRouter
from app.schemas.research import ResearchRequest
from app.services.research_service import ResearchService
from app.schemas.response import ApiResponse
from fastapi import HTTPException
from app.exceptions.research import InvalidTickerException
from app.core.logger import logger



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
        logger.info(f"Received research request for ticker: {request.ticker}")
        result = research_service.start_research(
            request.ticker
        )

        return ApiResponse(
            success=True,
            message="Research completed successfully.",
            data=result
        )

    except InvalidTickerException as e:
        logger.warning(f"Invalid ticker requested: {request.ticker} - {str(e)}")
        raise HTTPException(
            status_code=404,
            detail=str(e)
        )
    except Exception as e:
        logger.error(f"Unexpected error during research for {request.ticker}: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail="An internal server error occurred during research."
        )