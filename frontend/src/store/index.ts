import { Context, createContext, useContext } from "react";
import { ScreenStore } from "./screen";
import { Screens } from "./screen/types/enums";
import { wait } from "src/shared/utils/wait";
import { checkAuth } from "src/shared/utils/checkAuth";

export class RootStore {
  public readonly screenStore: ScreenStore;
  private auth_scenario: "login" | "register" = "login";

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
}

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
