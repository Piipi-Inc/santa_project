from pydantic import BaseModel, UUID4
from typing import Optional

class SUserResponse(BaseModel):
    id: UUID4
    username: str
    name: str
    preferences: Optional[str] = None
    completed_events: Optional[list[str]] = None

class SUpdateUserRequest(BaseModel):
    name: Optional[str] = None
    preferences: Optional[str] = None

class SUserLobby(BaseModel):
    lobby_code: str
    lobby_name: str 
    is_started: bool