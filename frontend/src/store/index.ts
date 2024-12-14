import { Context, createContext, useContext } from "react";
import { ScreenStore } from "./screen";
import { Screens } from "./screen/types/enums";
import { wait } from "src/shared/utils/wait";
import { checkAuth } from "src/shared/utils/checkAuth";
import api from "src/api";

export class RootStore {
  public readonly screenStore: ScreenStore;
  public auth_scenario: "login" | "register" = "login";

  constructor() {
    this.screenStore = new ScreenStore();
  }

  public init = async () => {
    // await api.login({"username": "test", "password": "test"})
    const [isAuthenticated] = await Promise.all([await checkAuth(), await wait(2000)]);
    console.log(isAuthenticated)
    if (isAuthenticated) {
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
      console.log(login, password);

      let isSuccessful = true;

      if (!isSuccessful) await this.screenStore.setScreen(Screens.AUTHENTICATE);

      await api.login({
        'username': login,
        'password': password
      })
      .then(async () => await this.screenStore.setScreen(Screens.MAIN))
      .catch(async () => await this.screenStore.setScreen(Screens.AUTHENTICATE))
    } else {
      console.log(login, password);

      await this.screenStore.setScreen(Screens.LOADER);
      // api.register()
    }
  };
}

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
