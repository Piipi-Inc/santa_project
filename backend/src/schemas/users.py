from pydantic import BaseModel, UUID4
from typing import Optional

class UserResponse(BaseModel):
    id: UUID4
    username: str
    name: str
    preferences: Optional[str] = None
    completed_events: Optional[list[str]] = None

class UpdateUserRequest(BaseModel):
    name: Optional[str] = None
    preferences: Optional[str] = None