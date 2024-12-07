from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from pydantic import BaseModel

from src.core.database import get_async_session
from src.core.config import config
from src.schemas.auth import SUserCreate, SUserLogin, SJWTResponse
from src.services.auth import AuthManager


class RegisterResponse(BaseModel):
    jwt_token: str


router = APIRouter()

auth_manager = AuthManager()

@router.post('/register')
async def register(body: SUserCreate, response: Response, session: AsyncSession = Depends(get_async_session)) -> SJWTResponse:
    """
    Register recieved user
    :param: body: user data
    :param: response: fastapi response
    :param: session: sqlalchemy session
    :return: jwt token
    """
    jwt_token = await auth_manager.create_user(body, session)

    response.set_cookie(config.cookie_key, jwt_token)

    return SJWTResponse(token=jwt_token)

@router.post('/login')
async def login(user: SUserLogin, response: Response, session: AsyncSession = Depends(get_async_session)) -> SJWTResponse:
    """
    Login recieved user
    :param: user: user data
    :param: response: fastapi response
    :param: session: sqlalchemy session
    :return: jwt token
    """
    jwt_token = await auth_manager.login_user(user, session)

    if jwt_token is None:
        raise HTTPException(status_code=204, detail="User not found")
    
    response.set_cookie(config.cookie_key, jwt_token)

    return SJWTResponse(token=jwt_token)

@router.post('/logout', dependencies=[Depends(auth_manager.get_current_user)],
             responses={
                 204: {'description': 'User not found'},
                 401: {'description': 'Unauthorized'}
             })
async def logout(response: Response) -> None:
    """
    Logout current user
    :param: response: fastapi response
    """
    response.delete_cookie(config.cookie_key)
