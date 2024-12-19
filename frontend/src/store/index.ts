import { Context, createContext, useContext } from "react";
import { wait } from "src/shared/utils/wait";
import { ScreenStore } from "./screen";
import { Screens } from "./screen/types/enums";
import { LobbiesStore } from "./Lobbies";
import { User } from "./User";
import * as T from "./types/types";

export class RootStore {
  public readonly screenStore: ScreenStore;
  public readonly lobbiesStore: LobbiesStore;
  public readonly user: User;
  public auth_scenario: "login" | "register" = "login";

  constructor() {
    this.user = new User();
    this.screenStore = new ScreenStore();
    this.lobbiesStore = new LobbiesStore({ screenStore: this.screenStore });
  }

  public init = async () => {
    try {
      await Promise.all([this.user.init(), wait(2000)]);

      if (this.user.isAuthenticated) {
        await this.handleAuthenticated();
        await this.screenStore.setScreen(Screens.MAIN);
        return;
      }

      await this.screenStore.setScreen(Screens.WELCOME);
    } catch (error) {
      console.warn(error);
      await this.screenStore.setScreen(Screens.AUTHENTICATE);
    }
  };

  public handleWelcomeScenario = async (
    auth_scenario: RootStore["auth_scenario"]
  ) => {
    this.auth_scenario = auth_scenario;
    await this.screenStore.setScreen(Screens.AUTHENTICATE);
  };

  public authenticate = async ({ login, password }: T.LoginPasswordPayload) => {
    if (this.auth_scenario === "login") {
      await this.login({ login, password });

    } else {

      // await api.register({
      //   login,
      //   name,
      //   preferences,
      //   password
      // })

      await this.screenStore.setScreen(Screens.LOADER);
    }
  };

  private handleAuthenticated = async () => {
    await this.lobbiesStore.init();
  };

  private login = async ({ login, password }: T.LoginPasswordPayload) => {
    await this.user.login({ login, password });
    await this.lobbiesStore.init();
    await this.screenStore.setScreen(Screens.MAIN);
  };
}

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
