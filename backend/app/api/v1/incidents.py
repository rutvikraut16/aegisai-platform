from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.incident import Incident
from app.models.user import User

from app.schemas.incident import (
    IncidentCreate,
    IncidentResponse
)

from app.core.auth import get_current_user

from app.services.ai.classifier import classify_incident
from app.services.ai.severity import predict_severity

router = APIRouter()


@router.post(
    "/",
    response_model=IncidentResponse
)
def create_incident(
    incident: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    classification = classify_incident(
        incident.description
    )

    severity_result = predict_severity(
        incident.description
    )

    new_incident = Incident(
        title=incident.title,
        description=incident.description,
        severity=incident.severity,
        category=classification["predicted_category"],
        ai_severity=severity_result["predicted_severity"],
        owner_id=current_user.id
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    return new_incident


@router.get(
    "/",
    response_model=list[IncidentResponse]
)
def get_all_incidents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    incidents = db.query(Incident).filter(
        Incident.owner_id == current_user.id
    ).all()

    return incidents


@router.get(
    "/{incident_id}",
    response_model=IncidentResponse
)
def get_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    incident = db.query(Incident).filter(
        Incident.id == incident_id,
        Incident.owner_id == current_user.id
    ).first()

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return incident


@router.delete("/{incident_id}")
def delete_incident(
    incident_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    incident = db.query(Incident).filter(
        Incident.id == incident_id,
        Incident.owner_id == current_user.id
    ).first()

    if not incident:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    db.delete(incident)
    db.commit()

    return {
        "message": "Incident deleted successfully"
    }