from fastapi import APIRouter
from pydantic import BaseModel

from app.services.ai.severity import (
    predict_severity
)

router = APIRouter()


class SeverityRequest(BaseModel):
    text: str


@router.post("/predict")
def predict(request: SeverityRequest):

    return predict_severity(
        request.text
    )