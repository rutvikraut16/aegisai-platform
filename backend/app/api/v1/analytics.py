from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.incident import Incident

router = APIRouter()


@router.get("/overview")
def get_dashboard_overview(
    db: Session = Depends(get_db)
):

    total_incidents = db.query(
        Incident
    ).count()

    critical_incidents = db.query(
        Incident
    ).filter(
        Incident.ai_severity == "Critical"
    ).count()

    high_incidents = db.query(
        Incident
    ).filter(
        Incident.ai_severity == "High"
    ).count()

    medium_incidents = db.query(
        Incident
    ).filter(
        Incident.ai_severity == "Medium"
    ).count()

    low_incidents = db.query(
        Incident
    ).filter(
        Incident.ai_severity == "Low"
    ).count()

    return {
        "total_incidents": total_incidents,
        "critical_incidents": critical_incidents,
        "high_incidents": high_incidents,
        "medium_incidents": medium_incidents,
        "low_incidents": low_incidents
    }