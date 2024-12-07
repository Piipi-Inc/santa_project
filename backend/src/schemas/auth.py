from pydantic import BaseModel


class SUserCreate(BaseModel):
    username: str
    name: str
    preferences: str | None = None
    password: str

class SUserLogin(BaseModel):
    username: str 
    password: str

class SJWTResponse(BaseModel):
    token: str