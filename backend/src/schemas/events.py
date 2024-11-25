from typing import Optional
from pydantic import BaseModel

class EventRequest(BaseModel):
    event_name: str

class EventResponse(BaseModel):
    data: dict
    error: Optional[str] = None