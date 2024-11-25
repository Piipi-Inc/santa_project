from fastapi import APIRouter, Depends, Response, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from pydantic import BaseModel

from src.core.database import get_async_session
from src.schemas.auth import UserCreate, UserLogin
from src.services.auth import AuthManager


class RegisterResponse(BaseModel):
    jwt_token: str


router = APIRouter()

auth_manager = AuthManager()

COOKIE_KEY = 'santa_token'

@router.post('/register')
async def register(body: UserCreate, response: Response, session: AsyncSession = Depends(get_async_session)):
    jwt_token = await auth_manager.create_user(body, session)

    response.set_cookie('santa_token', jwt_token)

    return {'token': jwt_token}

@router.post('/login')
async def login(user: UserLogin, response: Response, session: AsyncSession = Depends(get_async_session)):
    jwt_token = await auth_manager.login_user(user, session)

    if jwt_token is None:
        raise HTTPException(status_code=204, detail="User not found")
    
    response.set_cookie('santa_token', jwt_token)

    return {'token': jwt_token}

@router.post('/logout', dependencies=[Depends(auth_manager.get_current_user)],
             responses={
                 204: {'description': 'User not found'},
                 401: {'description': 'Unauthorized'}
             })
async def logout(response: Response):
    response.delete_cookie('santa_token')
    return {'response': 'ok'}