from pydantic import BaseModel


class SCompleteEvent(BaseModel):
    event_name: str