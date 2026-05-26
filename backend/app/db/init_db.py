from app.db.database import Base, engine

from app.models.user import User
from app.models.incident import Incident


Base.metadata.create_all(bind=engine)

print("Database tables created successfully!")