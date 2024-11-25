import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { mocks } from "./mocks";
import * as T from "./types/types";

export class ApiService {
  private readonly isMockBackendEnabled =
    process.env.VITE_IS_MOCK_BACKEND_ENABLED === "on";
  private readonly axiosInstance: AxiosInstance;
  private readonly headers: Partial<AxiosRequestHeaders>;
  private readonly baseUrl = process.env.VITE_BASE_URL;
  private readonly apiUrl = `${this.baseUrl}/api/`;

  constructor() {
    this.headers = {
      "Content-Type": "application/json",
      accept: "application/json",
    };
    this.axiosInstance = axios.create({
      headers: this.headers,
      timeout: 5000,
      baseURL: this.baseUrl,
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

    return this.axiosInstance.post(`${this.apiUrl}/register`, {
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

    return this.axiosInstance.post(`${this.apiUrl}/login`, {
      username,
      password,
    });
  };

  public getUser = async () => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.user);
    }

    return this.axiosInstance.get(`${this.apiUrl}/user`);
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

  public getUserLobbies = async () => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.userLobbies);
    }

    return this.axiosInstance.get(`${this.apiUrl}/user/lobbies`);
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
      return Promise.resolve(mocks.joinLobby);
    }

    return this.axiosInstance.post(`${this.apiUrl}/lobby/join`, { lobby_id });
  };

  public startGame = async ({ lobby_id }: { lobby_id: string }) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.startGameResponse);
    }

    return this.axiosInstance.post(`${this.apiUrl}/lobby/${lobby_id}/start`);
  };

  public saveEvent = async ({ event_name }: { event_name: string }) => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.saveEventResponse);
    }

    return this.axiosInstance.post(`${this.apiUrl}/events/complete`, {
      event_name,
    });
  };

  public getEvents = async () => {
    if (this.isMockBackendEnabled) {
      return Promise.resolve(mocks.events);
    }

    return this.axiosInstance.get(`${this.apiUrl}/events/completed`);
  };
}

const api = new ApiService();
export default api;