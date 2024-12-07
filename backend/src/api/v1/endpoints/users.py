from fastapi import APIRouter, Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from src.models.user import User
from src.models.event import Event
from src.models.lobby import Lobby
from src.models.participant import Participant

from src.services.auth import auth_manager
from src.core.database import get_async_session
from src.schemas.users import SUserResponse, SUpdateUserRequest, SUserLobby


router = APIRouter()

@router.get('/')
async def get_user_data(current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)) -> SUserResponse:
    """
    Get current user data endpoint
    :param: current_user: current user from auth service
    :param: session: sqlalchemy session
    :return: user data with specific columns
    """
    stmt = select(Event.event_name).where(Event.user_id == current_user.id)
    res = await session.execute(stmt)
    if res:
        completed_events = [ev[0] for ev in res.all()]
    else:
        completed_events = []

    response = SUserResponse(
        id=current_user.id,
        username=current_user.username,
        name=current_user.name,
        preferences=current_user.preferences,
        completed_events=completed_events
    )
    
    return response

@router.patch('/')
async def update_user_info(data: SUpdateUserRequest, current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)) -> None:
    """
    Update user info endpoint
    :param: data: data to update
    :param: current_user: current user from auth service
    :param: session: sqlalchemy session
    """
    data = data.model_dump()
    
    stmt = update(User).where(User.id == current_user.id).values({k: data[k] for k in data if data[k]})
    try:
        await session.execute(stmt)
        await session.commit()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)

@router.get('/lobbies')
async def get_user_lobbies(current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)) -> list[SUserLobby]:
    """
    Get list of current user`s lobbies
    :param: current_user: current user
    :param: session: sqlalchemy session
    :return: list of user`s lobbies
    """
    stmt = select(
        Lobby.id, Lobby.lobby_name, Lobby.is_started
    ).filter(
        User.id == current_user.id
    ).filter(
        User.id == Participant.user_id
    ).filter(
        Lobby.id == Participant.lobby_id
    )

    res = await session.execute(stmt)
    data = [
        SUserLobby(
            lobby_code=code,
            lobby_name=name,
            is_started=is_started
        ) for code, name, is_started in res.all()
    ]
    
    return data
