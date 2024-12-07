from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from src.core.config import config


DATABASE_URL = (
    f"postgresql+asyncpg://"
    f"{config.db_user}:"
    f"{config.db_pass}@"
    f"{config.db_host}:"
    f"{config.db_port}/"
    f"{config.db_name}"
)

engine = create_async_engine(DATABASE_URL)
async_session_maker = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    """Yield async session"""
    async with async_session_maker() as session:
        yield session
