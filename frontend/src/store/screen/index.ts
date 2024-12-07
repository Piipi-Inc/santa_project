import { action, computed, makeObservable, observable } from "mobx";
import * as E from "./types/enums";

export class ScreenStore {
  private _currentScreen: E.Screens = E.Screens.LOADER;

  constructor() {
    makeObservable<this, "_currentScreen">(this, {
      _currentScreen: observable,
      setScreen: action,
      currentScreen: computed,
    });
  }

  public setScreen = (screen: ScreenStore["_currentScreen"]) => {
    this._currentScreen = screen;
  };

  public get currentScreen() {
    return this._currentScreen;
  }
}
