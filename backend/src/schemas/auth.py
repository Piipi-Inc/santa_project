from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    name: str
    preferences: str | None = None
    password: str

class UserLogin(BaseModel):
    username: str 
    password: str