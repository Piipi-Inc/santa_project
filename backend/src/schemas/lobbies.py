from pydantic import BaseModel
from typing import List, Optional
from uuid import UUID

class JoinedParticipant(BaseModel):
    id: UUID
    username: str
    name: str

class CreateLobbyRequest(BaseModel):
    lobby_name: str

class JoinLobbyRequest(BaseModel):
    lobby_id: str

class LobbyResponse(BaseModel):
    lobby_id: str
    lobby_name: str
    participants: List[JoinedParticipant]
    is_started: bool
    is_admin: bool

class GiftResponse(BaseModel):
    username: str 
    name: str
    preferences: str