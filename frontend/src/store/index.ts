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

        this.user.hasSeenStoryTelling
          ? await this.screenStore.setScreen(Screens.MAIN)
          : await this.screenStore.setScreen(Screens.STORY_TELLING);

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

  public authenticate = async ({
    login,
    password,
    name,
  }: T.LoginPasswordPayload) => {
    if (this.auth_scenario === "login") {
      await this.login({ login, password });
    } else {
      await this.register({
        login,
        name,
        password,
      });
    }
  };

  public goBack = async () => {
    if (this.screenStore.currentScreen === Screens.AUTHENTICATE) {
      await this.screenStore.setScreen(Screens.WELCOME);
      return;
    }

    if (this.screenStore.currentScreen === Screens.LOBBY) {
      await this.screenStore.setScreen(Screens.MAIN);
    }
  };

  public handleRegisterEnd = async () => {
    await this.screenStore.setScreen(Screens.LOADER);
    await wait(1000);
    await this.screenStore.setScreen(Screens.STORY_TELLING);
  };

  private handleAuthenticated = async () => {
    await this.lobbiesStore.init();
  };

  private login = async ({ login, password }: T.LoginPasswordPayload) => {
    await this.user.login({ login, password });
    await this.lobbiesStore.init();
    this.user.hasSeenStoryTelling
      ? await this.screenStore.setScreen(Screens.MAIN)
      : await this.screenStore.setScreen(Screens.STORY_TELLING);

    return;
  };

  private register = async ({
    login,
    name,
    password,
  }: T.LoginPasswordPayload) => {
    await this.user.register({ login, password, name });
    await this.lobbiesStore.init();
  };
}

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
