from sqlalchemy import Column, String, DateTime, ForeignKey, UUID
from sqlalchemy.sql import func
from src.models.base import Base

class Event(Base):
    """Event sqlalchemy object"""
    id = Column(UUID, primary_key=True)
    user_id = Column(UUID, ForeignKey("user.id"), nullable=False)
    event_name = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())
    