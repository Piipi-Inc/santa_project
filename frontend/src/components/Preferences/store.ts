import { action, makeObservable, observable } from "mobx";
import { wait } from "src/shared/utils/wait";
import { ScreenStore } from "src/store/screen";
import { Screens } from "src/store/screen/types/enums";

export class PreferencesStore {
  private readonly saveUserPreferences: ({
    preferences,
  }: {
    preferences: string;
  }) => Promise<void>;
  public isRunningAnimation = false;
  private readonly setScreen: ScreenStore["setScreen"];

  constructor({
    saveUserPreferences,
    setScreen,
  }: {
    saveUserPreferences: ({
      preferences,
    }: {
      preferences: string;
    }) => Promise<void>;
    setScreen: ScreenStore["setScreen"];
  }) {
    this.saveUserPreferences = saveUserPreferences;
    this.setScreen = setScreen;

    makeObservable<this, "setIsRunningAnimation">(this, {
      isRunningAnimation: observable,
      setIsRunningAnimation: action,
    });
  }

  public handleButtonClick = async ({
    preferences,
  }: {
    preferences: string;
  }) => {
    const savePromise = this.saveUserPreferences({ preferences });
    this.setIsRunningAnimation(true);
    await wait(2000);
    await savePromise;
    await this.setScreen(Screens.LOADER);
    await wait(1000);
    await this.setScreen(Screens.MAIN);
  };

  private setIsRunningAnimation = (
    isRunningAnimation: PreferencesStore["isRunningAnimation"]
  ) => {
    this.isRunningAnimation = isRunningAnimation;
  };
}
