from sqlalchemy import Column, UUID, String, DateTime
from sqlalchemy.sql import func
from src.models.base import Base

class User(Base):
    """User sqlalchemy object"""
    id = Column(UUID, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    name = Column(String, nullable=False)
    preferences = Column(String)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())