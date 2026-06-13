from fastapi import APIRouter

from app.services.ai.summarizer import (
    summarize_incident
)

router = APIRouter()

@router.post("/")
def summarize(text: str):

    return summarize_incident(text)