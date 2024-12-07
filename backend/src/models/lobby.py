from sqlalchemy import Column, String, Boolean, DateTime, UUID
from sqlalchemy.sql import func
from src.models.base import Base

class Lobby(Base):
    """Lobby sqlalchemy object"""
    id = Column(String, primary_key=True)
    lobby_name = Column(String, nullable=False)
    is_started = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())