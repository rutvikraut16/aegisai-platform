from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def health_check():

    return {
        "status": "healthy",
        "service": "AegisAI Backend",
        "version": "1.0.0"
    }


@router.get("/ping")
def ping():

    return {
        "message": "pong"
    }