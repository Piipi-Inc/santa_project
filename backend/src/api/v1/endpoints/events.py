from uuid import uuid4

from fastapi import APIRouter, Depends, status

from sqlalchemy.ext.asyncio import AsyncSession

from src.models.user import User
from src.models.event import Event
from src.services.auth import auth_manager
from src.core.database import get_async_session


from pydantic import BaseModel

class SCompleteEvent(BaseModel):
    event_name: str

router = APIRouter()

@router.post('/complete', status_code=status.HTTP_201_CREATED)
async def complete_event(event_name: SCompleteEvent, current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)):
    new_event = Event(
        id = uuid4(),
        user_id = current_user.id,
        event_name = event_name.event_name
    )

    try:
        session.add(new_event)
        await session.commit()
        await session.refresh(new_event)
    except Exception as e:
        await session.rollback()
        raise e
