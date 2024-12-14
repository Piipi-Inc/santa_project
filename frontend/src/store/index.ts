import { Context, createContext, useContext } from "react";
import { ScreenStore } from "./screen";
import { Screens } from "./screen/types/enums";
import { wait } from "src/shared/utils/wait";
import api from "src/api";
import { LobbiesStore } from "./Lobbies";
import { CurrentUser } from "./types/types";

export class RootStore {
  public readonly screenStore: ScreenStore;
  public readonly lobbiesStore: LobbiesStore;
  public auth_scenario: "login" | "register" = "login";
  public currentUser: null | CurrentUser;

  constructor() {
    this.screenStore = new ScreenStore();
    this.lobbiesStore = new LobbiesStore();
  }

  public init = async () => {
    let isAuthenticated = false

    this.currentUser = await api.getUser().then((res: any) => {
      console.log(res)
      isAuthenticated = true;
      return res.data
    }).catch(() => {null})
    console.log(this.currentUser, isAuthenticated)
    await wait(2000)

    if (isAuthenticated) {
      await this.handleAuthenticated();
      await this.screenStore.setScreen(Screens.MAIN);
      return;
    }

    await this.screenStore.setScreen(Screens.WELCOME);
  };

  public handleWelcomeScenario = async (
    auth_scenario: RootStore["auth_scenario"]
  ) => {
    this.auth_scenario = auth_scenario;
    await this.screenStore.setScreen(Screens.AUTHENTICATE);
  };

  public handleAuth = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    if (this.auth_scenario === "login") {
      await this.handleLogin({ login, password });
    } else {
      console.log(login, password);

      await this.screenStore.setScreen(Screens.LOADER);
      // api.register()
    }


  };

  private handleAuthenticated = async () => {
    try {
      this.lobbiesStore.init();
    } catch (e) {
      await this.screenStore.setScreen(Screens.AUTHENTICATE);
    }
  };

  private handleLogin = async ({
    login,
    password,
  }: {
    login: string;
    password: string;
  }) => {
    try {
      await api.login({
        username: login,
        password: password,
      });
      this.currentUser = await api.getUser().then((res: any) => res.data).catch(() => {null})
      await this.lobbiesStore.init();
      await this.screenStore.setScreen(Screens.MAIN);
    } catch (e) {
      await this.screenStore.setScreen(Screens.AUTHENTICATE);
    }
  };
}

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
