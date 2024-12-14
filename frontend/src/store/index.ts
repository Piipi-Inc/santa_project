import { Context, createContext, useContext } from "react";
import { ScreenStore } from "./screen";
import { Screens } from "./screen/types/enums";
import { wait } from "src/shared/utils/wait";
import { checkAuth } from "src/shared/utils/checkAuth";
import api from "src/api";
import { LobbiesStore } from "./Lobbies";

export class RootStore {
  public readonly screenStore: ScreenStore;
  public readonly lobbiesStore: LobbiesStore;
  public auth_scenario: "login" | "register" = "login";

  constructor() {
    this.screenStore = new ScreenStore();
    this.lobbiesStore = new LobbiesStore();
  }

  public init = async () => {
    const [isAuthenticated] = await Promise.all([
      await checkAuth(),
      await wait(2000),
    ]);
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
      await this.lobbiesStore.init();
    } catch (e) {
      await this.screenStore.setScreen(Screens.AUTHENTICATE);
    }
  };
}

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
