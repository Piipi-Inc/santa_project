import { Context, createContext, useContext } from "react";
import { ScreenStore } from "./screen";
import { Screens } from "./screen/types/enums";
import { wait } from "src/shared/utils/wait";
import { checkAuth } from "src/shared/utils/checkAuth";

export class RootStore {
  public readonly screenStore: ScreenStore;
  public auth_scenario: "login" | "register" = "login";

  constructor() {
    this.screenStore = new ScreenStore();
  }

  public init = async () => {
    const isAuthenticated = await checkAuth();
    console.log(isAuthenticated);

    await wait(2000);
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

      const isSuccessful = false;

      if (!isSuccessful) await this.screenStore.setScreen(Screens.AUTHENTICATE);
      // api.login()
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
