from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey
)

from sqlalchemy.orm import relationship

from app.db.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        index=True
    )

    description = Column(Text)

    severity = Column(String)

    category = Column(String)

    ai_severity = Column(String)

    owner_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship(
    "User",
    back_populates="incidents"
)