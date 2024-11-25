from pydantic_settings import BaseSettings
from pydantic import Field


class Config(BaseSettings):
    db_user: str = Field(..., alias='DB_USER')
    db_pass: str = Field(..., alias='DB_PASS')
    db_host: str = Field(..., alias='DB_HOST')
    db_port: str = Field(..., alias='DB_PORT')
    db_name: str = Field(..., alias='DB_NAME')

    jwt_secret: str = Field(..., alias='JWT_SECRET')
    jwt_algorithm: str = "HS256"

    class Config:
        env_file='./.env'
        extra='allow'

config = Config()