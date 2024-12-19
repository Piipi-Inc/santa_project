import api from "src/api";
import * as T from "./types/types";
import { LoginPasswordPayload } from "../types/types";

export class User {
  private _isAuthenticated = false;
  private _userInfo?: T.UserInfo;

  public init = async () => {
    try {
      const userInfo = await api.getUser();
      this.setUserInfo(userInfo);
      this.setIsAuthenticated(true);
    } catch {
      this.setUserInfo(null);
      this.setIsAuthenticated(false);
    }
  };

  public login = async ({ login, password }: LoginPasswordPayload) => {
    await api.login({
      username: login,
      password,
    });
    await this.init();
  };

  public register = async ({ login, password, name }: LoginPasswordPayload) => {
    await api.register({
      username: login,
      name: name,
      preferences: null,
      password: password,
    });
    await this.init();
  };

  public saveStoryTellingCompleted = async () => {
    if (this.hasSeenStoryTelling) return;

    const completedEvents = [
      ...this.userInfo.completed_events,
      "story_telling",
    ];
    this.setUserInfo({ ...this.userInfo, completed_events: completedEvents });
    await api.saveEvent({ event_name: "story_telling" });
  };

  public get userInfo() {
    return this._userInfo;
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public get hasSeenStoryTelling() {
    return this._userInfo.completed_events.includes("story_telling");
  }

  private setIsAuthenticated = (isAuthenticated: boolean) => {
    this._isAuthenticated = isAuthenticated;
  };

  private setUserInfo = (userInfo: T.UserInfo) => {
    this._userInfo = userInfo;
  };
}
