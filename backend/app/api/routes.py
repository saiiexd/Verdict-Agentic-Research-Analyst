from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def root():
    return {
        "message": "Verdict Backend is running!"
    }