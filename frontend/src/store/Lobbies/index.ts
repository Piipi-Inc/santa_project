import { action, computed, makeObservable, observable } from "mobx";
import { LobbyInfo, UserLobby } from "src/api/types/types";
import api from "src/api";
import { ScreenStore } from "../screen";
import { Screens } from "../screen/types/enums";
import { wait } from "src/shared/utils/wait";

export class LobbiesStore {
  private _userLobbies: UserLobby[] | null = null;
  private _screenStore: ScreenStore;
  private _currentLobbyInfo?: LobbyInfo;

  constructor({ screenStore }: { screenStore: ScreenStore }) {
    this._screenStore = screenStore;

    makeObservable<this, "_userLobbies">(this, {
      _userLobbies: observable,
      setUserLobbies: action,
      userLobbies: computed,
    });
  }

  public init = async () => {
    await this.refresh();
  };

  public joinLobby = async ({ lobby_id }: { lobby_id: string }) => {
    await api.joinLobby({ lobby_id });
    await this.refresh();
  };

  public createLobby = async ({ lobby_name }: { lobby_name: string }) => {
    try {
      await this._screenStore.setScreen(Screens.LOADER);
      const [response] = await Promise.all([
        api.createLobby({ lobby_name }),
        wait(2000),
      ]);
      await this.goToLobby({ lobbyId: response.lobby_code });
    } catch (err) {
      console.warn(err);
    }
  };

  public goToLobby = async ({ lobbyId }: { lobbyId: string }) => {
    const lobby = await api.getLobby({ lobby_id: lobbyId });
    this._currentLobbyInfo = lobby;
    this._screenStore.setScreen(Screens.LOBBY);
  };

  public refresh = async () => {
    const userLobbies = await api.getUserLobbies();
    this.setUserLobbies(userLobbies);
  };

  public setUserLobbies = (userLobbies: LobbiesStore["_userLobbies"]) => {
    this._userLobbies = userLobbies;
  };

  public get userLobbies() {
    return this._userLobbies;
  }

  public get currentLobby() {
    return this._currentLobbyInfo;
  }
}
