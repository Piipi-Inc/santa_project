import api from 'api';
import * as T from './types/types';
import { LoginPasswordPayload } from '../types/types';
import { action, computed, makeObservable, observable } from 'mobx';

export class User {
  private _isAuthenticated = false;
  private _userInfo: T.UserInfo | null = null;

  constructor() {
    makeObservable<this, '_userInfo' | 'setUserInfo'>(this, {
      _userInfo: observable,
      setUserInfo: action,
      userInfo: computed
    });
  }

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
      password
    });
    await this.init();
  };

  public register = async ({ login, password, name }: LoginPasswordPayload & { name: string }) => {
    await api.register({
      username: login,
      name,
      preferences: null,
      password: password
    });
    await this.init();
  };

  public logout = async () => {
    await api.logout();
  };

  public saveStoryTellingCompleted = async () => {
    if (this.hasSeenStoryTelling || !this.userInfo) return;

    const completedEvents = [...this.userInfo.completed_events, 'story_telling'];
    this.setUserInfo({ ...this.userInfo, completed_events: completedEvents });
    await api.saveEvent({ event_name: 'story_telling' });
  };

  public saveUserPreferences = async ({ preferences }: { preferences: string }) => {
    if (!this.userInfo) return;

    this.setUserInfo({ ...this.userInfo, preferences: preferences });
    await api.updateUser({ name: this.userInfo.name, preferences });
  };

  public saveUserName = async (name: string) => {
    if (!this.userInfo || !this.userInfo.preferences) return;

    this.setUserInfo({ ...this.userInfo, name });
    await api.updateUser({
      name: this.userInfo.name,
      preferences: this.userInfo.preferences
    });
  };

  public get userInfo() {
    return this._userInfo;
  }

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public get hasSeenStoryTelling() {
    return this._userInfo?.completed_events.includes('story_telling');
  }

  private setIsAuthenticated = (isAuthenticated: boolean) => {
    this._isAuthenticated = isAuthenticated;
  };

  private setUserInfo = (userInfo: User['_userInfo']) => {
    this._userInfo = userInfo;
  };
}
