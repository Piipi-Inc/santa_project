from fastapi import APIRouter

from src.api.v1.endpoints import auth, events, lobbies, users


router = APIRouter()

router.include_router(auth.router, prefix='/auth', tags=['auth'])
router.include_router(users.router, prefix='/user', tags=['users'])
router.include_router(lobbies.router, prefix='/lobby', tags=['lobbies'])
router.include_router(events.router, prefix='/events', tags=['events'])
