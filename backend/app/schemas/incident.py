from pydantic import BaseModel


class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: str


class IncidentResponse(BaseModel):
    id: int
    title: str
    description: str
    severity: str
    owner_id: int
    category: str
    ai_severity: str

    class Config:
        from_attributes = True