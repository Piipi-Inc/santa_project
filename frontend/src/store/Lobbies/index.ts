import { action, computed, makeObservable, observable } from "mobx";
import { LobbyInfo, UserLobby, LobbyGift } from "src/api/types/types";
import api from "src/api";
import { ScreenStore } from "../screen";
import { Screens } from "../screen/types/enums";
import { wait } from "src/shared/utils/wait";

export class LobbiesStore {
  private _userLobbies: UserLobby[] | null = null;
  private _screenStore: ScreenStore;
  private _currentLobbyInfo?: LobbyInfo;
  private _currentLobbyGift?: LobbyGift;

  constructor({ screenStore }: { screenStore: ScreenStore }) {
    this._screenStore = screenStore;

    makeObservable<
      this,
      | "_userLobbies"
      | "_currentLobbyInfo"
      | "setCurrentLobbyInfo"
      | "_currentLobbyGift"
      | "setCurrentLobbyGift"
    >(this, {
      _userLobbies: observable,
      setUserLobbies: action,
      userLobbies: computed,

      _currentLobbyInfo: observable,
      setCurrentLobbyInfo: action,
      currentLobby: computed,

      _currentLobbyGift: observable,
      setCurrentLobbyGift: action,
      currentGift: computed,
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
      const [response] = await Promise.all([api.createLobby({ lobby_name })]);
      await Promise.all([this.refresh(), wait(2000)]);
      await this.goToLobby({ lobbyId: response.lobby_code });
    } catch (err) {
      console.warn(err);
    }
  };

  public goToLobby = async ({ lobbyId }: { lobbyId: string }) => {
    const lobby = await api.getLobby({ lobby_id: lobbyId });
    this.setCurrentLobbyInfo(lobby);
    this._screenStore.setScreen(Screens.LOBBY);

    if (this._currentLobbyInfo.is_started) {
      const gift = await api.getGift({ lobby_id: lobbyId });
      this.setCurrentLobbyGift(gift);
    }
  };

  public refreshLobby = async () => {
    if (!this.currentLobby) return;

    const lobby = await api.getLobby({ lobby_id: this.currentLobby.lobby_id });
    const gift = await api.getGift({ lobby_id: this.currentLobby.lobby_id });
    this.setCurrentLobbyGift(gift);
    this.setCurrentLobbyInfo(lobby);
  };

  public refresh = async () => {
    const userLobbies = await api.getUserLobbies();
    this.setUserLobbies(userLobbies);
  };

  public setUserLobbies = (userLobbies: LobbiesStore["_userLobbies"]) => {
    this._userLobbies = userLobbies;
  };

  public startGame = async ({ isAdmin }: { isAdmin: boolean }) => {
    console.log("start game");
    if (!this.currentLobby || (!isAdmin && this.currentLobby.is_started))
      return;

    await api.startGame({ lobby_id: this.currentLobby.lobby_id });
  };

  public get userLobbies() {
    return this._userLobbies;
  }

  public get currentLobby() {
    return this._currentLobbyInfo;
  }

  public get currentGift() {
    return this._currentLobbyGift;
  }

  private setCurrentLobbyInfo = (lobbyInfo: LobbyInfo) => {
    this._currentLobbyInfo = lobbyInfo;
  };

  private setCurrentLobbyGift = (gift: LobbyGift) => {
    this._currentLobbyGift = gift;
  };
}
