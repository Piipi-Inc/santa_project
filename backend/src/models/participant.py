from sqlalchemy import Column, String, ForeignKey, Boolean, UUID, DateTime
from sqlalchemy.sql import func
from src.models.base import Base


class Participant(Base):
    id = Column(UUID, primary_key=True)
    lobby_id = Column(String, ForeignKey("lobby.id"), nullable=False)
    user_id = Column(UUID, ForeignKey("user.id"), nullable=False)
    is_admin = Column(Boolean, default=False)
    santa_to = Column(UUID, ForeignKey("user.id"), nullable=True, default=None)
    created_at = Column(DateTime, default=func.now())