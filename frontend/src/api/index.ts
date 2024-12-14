import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { mocks } from './mocks';
import * as T from './types/types';

export class ApiService {
  private readonly isMockBackendEnabled = import.meta.env.VITE_IS_MOCK_BACKEND_ENABLED === 'on';

  private readonly axiosInstance: AxiosInstance;

  private readonly headers: Partial<AxiosRequestHeaders>;

  private readonly baseUrl = import.meta.env.VITE_BASE_URL;

  private readonly apiUrl = `${this.baseUrl}/api/v1`;

  constructor() {
    this.headers = {
      'Content-Type': 'application/json',
      accept: 'application/json',
    };
    this.axiosInstance = axios.create({
      headers: this.headers,
      timeout: 5000,
      baseURL: this.baseUrl,
      withCredentials: true,
    });
  }

  public register = async ({
    username,
    name,
    preferences,
    password,
  }: T.RegisterPayload) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.registerResponse);
    }

    return this.axiosInstance.post(`${this.apiUrl}/auth/register`, {
      username,
      name,
      preferences,
      password,
    });
  };

  public login = async ({ username, password }: T.LoginPayload) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.loginResponse);
    }

    return this.axiosInstance.post(`${this.apiUrl}/auth/login`, {
      username,
      password,
    });
  };

  public logout = async () => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve();
    }

    return this.axiosInstance.post(`${this.apiUrl}/auth/logout`);
  };

  public getUser = async () => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.user);
    }

    return this.axiosInstance
      .get(`${this.apiUrl}/user`)
      .then((res) => res.data);
  };

  public updateUser = async ({ name, preferences }: T.PatchUserPayload) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve();
    }

    return this.axiosInstance.patch(`${this.apiUrl}/user/update`, {
      name,
      preferences,
    });
  };

  public getUserLobbies = async (): Promise<T.UserLobby[]> => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.userLobbies);
    }

    return this.axiosInstance
      .get(`${this.apiUrl}/user/lobbies`)
      .then((res) => res.data);
  };

  public createLobby = async ({ lobby_name }: T.CreateLobbyPayload) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.newLobby);
    }

    return this.axiosInstance.post(`${this.apiUrl}/user/lobbies`, {
      lobby_name,
    });
  };

  public getLobby = async ({ lobby_id }: { lobby_id: string }) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.lobby);
    }

    return this.axiosInstance.get(`${this.apiUrl}/lobby/${lobby_id}`);
  };

  public joinLobby = async ({ lobby_id }: T.JoinLobbyPayload) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve();
    }

    return this.axiosInstance.post(`${this.apiUrl}/lobby/join`, { lobby_id });
  };

  public startGame = async ({ lobby_id }: { lobby_id: string }) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve();
    }

    return this.axiosInstance.post(`${this.apiUrl}/lobby/${lobby_id}/start`);
  };

  public getGift = async ({ lobby_id }: { lobby_id: string }) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.getGiftResponse);
    }

    return this.axiosInstance.post(`${this.apiUrl}/lobby/${lobby_id}/gift`);
  };

  public saveEvent = async ({ event_name }: { event_name: string }) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve();
    }

    return this.axiosInstance.post(`${this.apiUrl}/events/complete`, {
      event_name,
    });
  };
}

const api = new ApiService();
export default api;
