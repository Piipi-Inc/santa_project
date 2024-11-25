import string
import random
from sqlalchemy.orm import Session
from sqlalchemy import select

from src.models.lobby import Lobby

async def generate_unique_lobby_id(session: Session, length: int = 6) -> str:
    while True:
        characters = string.ascii_uppercase + string.digits
        new_id = ''.join(random.choices(characters, k=length))
        stmt = select(Lobby).where(Lobby.id == new_id)
        existing_lobby = await session.execute(stmt)
        if not existing_lobby.scalar():
            return new_id