from fastapi import APIRouter

from pydantic import BaseModel

from app.services.ai.classifier import (
    classify_incident
)


router = APIRouter()


class AIRequest(BaseModel):
    text: str


@router.post("/classify")
def classify_text(
    request: AIRequest
):

    result = classify_incident(
        request.text
    )

    return result