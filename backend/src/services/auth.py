from uuid import uuid4, UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy.future import select
from fastapi import Cookie, HTTPException, status

from src.models.user import User
from src.core.database import get_async_session
from src.schemas.auth import UserCreate, UserLogin

import hashlib
import jwt
from jwt.exceptions import InvalidTokenError

import secrets
from src.core.config import Config


# from fastapi.security import OAuth2PasswordBearer
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class AuthManager:
    def __init__(self):
        self.config = Config()

    def create_jwt_token(self, user: User) -> str:
        data_to_decode = {
            "user_id": str(user.id)
        }
        encoded_jwt = jwt.encode(data_to_decode, self.config.jwt_secret, algorithm=self.config.jwt_algorithm)
        return encoded_jwt

    @staticmethod
    def hash_password(password: str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()

    async def create_user(self, user_data: UserCreate, session: AsyncSession) -> User:
        new_user = User(
            id=uuid4(),
            username=user_data.username,
            name=user_data.name,
            preferences=user_data.preferences,
            hashed_password=self.hash_password(user_data.password),
        )
        try:
            session.add(new_user)
            await session.commit()
            await session.refresh(new_user)
            jwt_token =  self.create_jwt_token(new_user)
            return jwt_token
        except IntegrityError as e:
            await session.rollback()
            raise ValueError(f"User with username {user_data.username} already exists.") from e
        except Exception as e:
            await session.rollback()
            raise e
    
    async def login_user(self, user: UserLogin, session: AsyncSession) -> UUID:
        
        result = await session.execute(
            select(User).where(User.username == user.username)
        )
        user_found = result.scalar()

        if user_found is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )
        
        if not secrets.compare_digest(
            self.hash_password(user.password),
            user_found.hashed_password,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Wrong password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        jwt_token = self.create_jwt_token(user_found)

        return jwt_token

    # def get_current_user(self, token: Annotated[str, Depends(oauth2_scheme)]):
    async def get_current_user(self, token: str | None = Cookie(default=None, alias='santa_token')):

        credentials_exception = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"Authorizarion": "Bearer"},
        )

        try:
            payload = jwt.decode(token, self.config.jwt_secret, algorithms=[self.config.jwt_algorithm])
            user_id: str = payload.get("user_id")
            
            if user_id is None:
                raise credentials_exception
        except InvalidTokenError:
            raise credentials_exception
        async for session in get_async_session():
            result = await session.execute(
                select(User).where(User.id == user_id)
            )
        user = result.scalar()
        if user is None:
            raise credentials_exception
        return user
    
auth_manager = AuthManager()