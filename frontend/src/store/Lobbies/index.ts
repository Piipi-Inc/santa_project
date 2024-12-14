import { action, computed, makeObservable, observable } from "mobx";
import { UserLobby } from "src/api/types/types";
import api from "src/api";

export class LobbiesStore {
  private _userLobbies: UserLobby[] | null = null;

  constructor() {
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
}
