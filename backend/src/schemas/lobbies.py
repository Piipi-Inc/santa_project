from pydantic import BaseModel
from typing import List
from uuid import UUID


class JoinedParticipant(BaseModel):
    id: UUID
    username: str
    name: str
    has_gift: bool


class SCreateLobbyRequest(BaseModel):
    lobby_name: str


class SCreateLobbyResponse(BaseModel):
    lobby_code: str
    lobby_name: str


class SJoinLobbyRequest(BaseModel):
    lobby_id: str


class SLobbyResponse(BaseModel):
    lobby_id: str
    lobby_name: str
    participants: List[JoinedParticipant]
    is_started: bool
    admin_username: str


class SGiftResponse(BaseModel):
    username: str
    name: str
    preferences: str
