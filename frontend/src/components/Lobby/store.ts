import { action, makeObservable, observable } from 'mobx';
import { LobbiesStore } from 'store/Lobbies';

export class LobbyStore {
  private webSocket?: WebSocket;
  private readonly lobbiesStore: LobbiesStore;
  public isLetterVisible = false;

  constructor({ lobbiesStore }: { lobbiesStore: LobbiesStore }) {
    this.lobbiesStore = lobbiesStore;

    makeObservable(this, {
      isLetterVisible: observable,
      setIsLetterVisible: action
    });
  }

  public init = ({ lobbyId }: { lobbyId: string }) => {
    this.webSocket = new WebSocket(`${import.meta.env.VITE_WEB_SOCKET_URL}/api/v1/lobby/${lobbyId}/ws`);

    this.webSocket.onopen = (event) => {
      console.log('Connected to lobby', event);
    };

    this.webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const socketEvent = data?.event;

      if (socketEvent) {
        this.handleSocketResponse();
      }
    };

    this.webSocket.onclose = () => {
      console.log('Disconnected from the lobby.');
    };
  };

  public dispose = () => {
    this.webSocket?.close();
  };

  public setIsLetterVisible = (value: boolean) => {
    this.isLetterVisible = value;
  };

  private handleSocketResponse = async () => {
    await this.lobbiesStore.refreshLobby();
  };
}
