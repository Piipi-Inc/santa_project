from uuid import uuid4
import random

from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from fastapi.websockets import WebSocketState

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from src.models.user import User
from src.models.lobby import Lobby
from src.models.participant import Participant

from src.services.auth import auth_manager
from src.core.database import get_async_session
from src.core.utils import generate_unique_lobby_id
from src.schemas.lobbies import SCreateLobbyRequest, SJoinLobbyRequest, SLobbyResponse, JoinedParticipant, SGiftResponse


router = APIRouter()

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_lobby(lobby_data: SCreateLobbyRequest, current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)) -> None:
    """
    Create lobby
    :param: lobby_data: lobby data
    :param: current_user: current user
    :param: session: sqlalchemy session
    """
    new_lobby = Lobby(
        id = await generate_unique_lobby_id(session),
        lobby_name=lobby_data.lobby_name
    )
    new_participant = Participant(
        id=uuid4(),
        lobby_id = new_lobby.id,
        user_id = current_user.id,
        is_admin = True
    )

    try:
        session.add(new_lobby)
        session.add(new_participant)
        await session.commit()
        await session.refresh(new_lobby)
        await session.refresh(new_participant)
    except Exception as e:
        await session.rollback()
        raise e

@router.get('/{lobby_id}')
async def get_lobby_info(lobby_id: str, current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)) -> SLobbyResponse:
    """
    Get info of the lobby
    :param: lobby_id: id of the lobby
    :param: current_user: current user
    :param: session: sqlalchemy session
    :return: info about the lobby
    """
    stmt = select(
        Lobby.id,
        Lobby.lobby_name,
        Lobby.is_started,
        Participant.is_admin
    ).filter(
        User.id == current_user.id
    ).filter(
        User.id == Participant.user_id
    ).filter(
        Lobby.id == Participant.lobby_id
    ).filter(
        Lobby.id == lobby_id
    )
    res = await session.execute(stmt)
    res_lobby = res.all()

    if res_lobby:

        stmt = select(
            User.id,
            User.username,
            User.name
        ).filter(
            User.id == Participant.user_id
        ).filter(
            Lobby.id == Participant.lobby_id
        ).filter(
            Lobby.id == lobby_id
        )
        res = await session.execute(stmt)
        participant_list = [JoinedParticipant(
                id=p[0],
                username=p[1],
                name=p[2]
            ) for p in res.all()]

        return SLobbyResponse(
            lobby_id = res_lobby[0][0],
            lobby_name = res_lobby[0][1],
            participants=participant_list,
            is_started=res_lobby[0][2],
            is_admin=res_lobby[0][3]
        )
        
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lobby not found or User not a participant of this lobby")

@router.post('/join', status_code=status.HTTP_201_CREATED)
async def join_lobby(lobby_data: SJoinLobbyRequest, current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)) -> None:
    """
    Join current user to the lobby
    :param: lobby_data: data of the lobby to join
    :param: current_user: current user
    :param: session: sqlalchemy session
    """
    stmt = select(
        Lobby.id, Lobby.lobby_name, Lobby.is_started
    ).filter(
        User.id == current_user.id
    ).filter(
        User.id == Participant.user_id
    ).filter(
        Lobby.id == Participant.lobby_id
    ).filter(
        Lobby.id == lobby_data.lobby_id
    )

    res = await session.execute(stmt)
    res = res.scalar()
    
    if not res:
        new_participant = Participant(
            id=uuid4(),
            lobby_id = lobby_data.lobby_id,
            user_id = current_user.id
        )

        try:
            session.add(new_participant)
            await session.commit()
            await session.refresh(new_participant)
        except Exception as e:
            await session.rollback()
            raise e

html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lobby Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 600px;
            margin: auto;
        }
        #messages {
            border: 1px solid #ccc;
            padding: 10px;
            height: 200px;
            overflow-y: auto;
            margin-bottom: 20px;
        }
        button {
            padding: 10px 20px;
            cursor: pointer;
            margin-top: 10px;
        }
        input {
            margin-right: 10px;
            padding: 5px;
        }
    </style>
</head>
<body>
    <h1>Lobby Test</h1>
    <div>
        <label for="lobbyId">Lobby ID:</label>
        <input type="text" id="lobbyId" placeholder="Enter Lobby ID">
        <button id="connectBtn">Connect</button>
    </div>

    <div id="messages">
        <p><strong>Messages will appear here:</strong></p>
    </div>

    <div>
        <button id="startLobbyBtn" disabled>Start Lobby (Admin)</button>
    </div>

    <script>
        let websocket;
        const connectBtn = document.getElementById("connectBtn");
        const startLobbyBtn = document.getElementById("startLobbyBtn");
        const messagesDiv = document.getElementById("messages");
        const lobbyIdInput = document.getElementById("lobbyId");

        connectBtn.addEventListener("click", () => {
            const lobbyId = lobbyIdInput.value.trim();
            if (!lobbyId) {
                alert("Please enter a Lobby ID");
                return;
            }

            // Подключение к вебсокету
            websocket = new WebSocket(`ws://localhost:8000/api/v1/lobby/${lobbyId}/ws`);

            websocket.onopen = () => {
                logMessage("Connected to the lobby.");
                startLobbyBtn.disabled = false; // Активируем кнопку старта для администратора
            };

            websocket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                logMessage(`Server: ${JSON.stringify(data)}`);
            };

            websocket.onclose = () => {
                logMessage("Disconnected from the lobby.");
                startLobbyBtn.disabled = true;
            };

            websocket.onerror = (error) => {
                logMessage("Error occurred: " + error.message);
            };
        });

        startLobbyBtn.addEventListener("click", async () => {
            const lobbyId = lobbyIdInput.value.trim();
            if (!lobbyId) {
                alert("Please enter a Lobby ID");
                return;
            }

            // Отправляем POST-запрос для старта лобби
            try {
                const response = await fetch(`http://localhost:8000/api/v1/lobby/${lobbyId}/start`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    logMessage(`Lobby started: ${JSON.stringify(data)}`);
                } else {
                    const error = await response.json();
                    logMessage(`Error starting lobby: ${JSON.stringify(error)}`);
                }
            } catch (err) {
                logMessage(`Error: ${err.message}`);
            }
        });

        function logMessage(message) {
            const p = document.createElement("p");
            p.textContent = message;
            messagesDiv.appendChild(p);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }
    </script>
</body>
</html>
"""

@router.get("/test/lol")
async def get():
    return HTMLResponse(html)

class LobbyConnectionManager:
    def __init__(self):
        self.active_connections: dict[str, set[WebSocket]] = {}

    async def connect(self, lobby_id: str, websocket: WebSocket):
        await websocket.accept()
        if lobby_id not in self.active_connections:
            self.active_connections[lobby_id] = set()
        self.active_connections[lobby_id].add(websocket)

    def disconnect(self, lobby_id: str, websocket: WebSocket):
        if lobby_id in self.active_connections:
            self.active_connections[lobby_id].discard(websocket)
            if not self.active_connections[lobby_id]:
                del self.active_connections[lobby_id]

    async def broadcast(self, lobby_id: str, message: dict):
        if lobby_id in self.active_connections:
            for websocket in self.active_connections[lobby_id]:
                if websocket.client_state == WebSocketState.CONNECTED:
                    await websocket.send_json(message)

manager = LobbyConnectionManager()

@router.websocket("/{lobby_id}/ws")
async def lobby_websocket(
    lobby_id: str,
    websocket: WebSocket,
    current_user: Participant = Depends(auth_manager.get_current_user),
    session: AsyncSession = Depends(get_async_session),
):
    lobby = await session.get(Lobby, lobby_id)
    
    if not lobby:
        await websocket.close(code=1003)
        return
    
    await manager.connect(lobby_id, websocket)

    try:
        while True:
            data = await websocket.receive_json()
    except WebSocketDisconnect:
        manager.disconnect(lobby_id, websocket)

@router.post("/{lobby_id}/start")
async def start_lobby(
    lobby_id: str,
    current_user: Participant = Depends(auth_manager.get_current_user),
    session: AsyncSession = Depends(get_async_session),
):
    participant = await session.execute(select(Participant).where(Participant.lobby_id == lobby_id).where(Participant.user_id == current_user.id))
    participant = participant.scalar()
    
    if not participant or not participant.is_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only admin can start the lobby"
        )

    stmt = (
        select(Participant.user_id)
        .where(Participant.lobby_id == lobby_id)
    )
    res = await session.execute(stmt)
    participant_list = [i[0] for i in set(res.all())]
    random.shuffle(participant_list)
    
    stmt = (
        update(Lobby)
        .where(Lobby.id == lobby_id)
        .values(is_started=True)
    )
    await session.execute(stmt)

    for i, prt_id in enumerate(participant_list):
        stmt = (
            update(Participant)
            .where(Lobby.id == Participant.lobby_id)
            .where(Lobby.id == lobby_id)
            .where(Participant.user_id == prt_id)
            .values(santa_to=participant_list[i + 1 if i + 1 != len(participant_list) else 0])
        )
        await session.execute(stmt)

    await session.commit()

    message = {"type": "lobby_started", "lobby_id": lobby_id}
    await manager.broadcast(lobby_id, message)

    return {"message": "Lobby started"}

@router.get('/{lobby_id}/gift')
async def get_gift(lobby_id: str, current_user: User = Depends(auth_manager.get_current_user), session: AsyncSession = Depends(get_async_session)) -> SGiftResponse:
    """
    Get the santa letter of the current user in the specified lobby
    :param: lobby_id: the id of the lobby
    :param: current_user: current user
    :param: session: sqlalchemy session
    :return: the santa letter
    """
    stmt = select(
        Participant.santa_to,
    ).where(
        Lobby.id == Participant.lobby_id
    ).where(
        User.id == Participant.user_id
    ).where(
        User.id == current_user.id
    ).where(
        Lobby.id == lobby_id
    )
    res = await session.execute(stmt)
    santa_id = res.scalar()

    stmt = select(
        User.username,
        User.name,
        User.preferences
    ).where(User.id == santa_id)

    res = await session.execute(stmt)
    res = res.all()
    result = SGiftResponse(
        username=res[0][0],
        name=res[0][1],
        preferences=res[0][2]
    )
    
    return result
