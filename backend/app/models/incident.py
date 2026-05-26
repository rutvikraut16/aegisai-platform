from sqlalchemy import Column, Integer, String, Text

from app.db.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, index=True)

    description = Column(Text)

    severity = Column(String)