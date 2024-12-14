import api from "src/api";
import * as T from "./types/types";

export class User {
  private _isAuthenticated = false;
  private _userInfo?: T.UserInfo;

  public init = async () => {
    try {
      const userInfo = await api.getUser();
      this.setUserInfo(userInfo);
      this.setIsAuthenticated(true);
    } catch (error) {
      console.warn(error);
    }
  };

  public login = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    await api.login({
      username: login,
      password: password,
    });
    await this.init();
  };

  public get userInfo() {
    return this._userInfo;
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  private setIsAuthenticated = (isAuthenticated: boolean) => {
    this._isAuthenticated = isAuthenticated;
  };

  private setUserInfo = (userInfo: T.UserInfo) => {
    this._userInfo = userInfo;
  };
}
