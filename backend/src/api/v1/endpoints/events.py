from uuid import uuid4

from fastapi import APIRouter, Depends, status

from sqlalchemy.ext.asyncio import AsyncSession

from src.models.user import User
from src.models.event import Event
from src.services.auth_manager_service import auth_manager
from src.core.database import get_async_session
from src.schemas.events import SCompleteEvent


router = APIRouter()


@router.post("/complete", status_code=status.HTTP_201_CREATED)
async def complete_event(
    event_name: SCompleteEvent,
    current_user: User = Depends(auth_manager.get_current_user),
    session: AsyncSession = Depends(get_async_session),
) -> None:
    """
    Complete the specified event for current user
    :param: event_name: the event to complete
    :param: current_user: current user
    :param: session: sqlalchemy session
    """
    new_event = Event(
        id=uuid4(), user_id=current_user.id, event_name=event_name.event_name
    )

    try:
        session.add(new_event)
        await session.commit()
        await session.refresh(new_event)
    except Exception as e:
        await session.rollback()
        raise e
