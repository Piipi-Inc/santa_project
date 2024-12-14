import {
  action, computed, makeObservable, observable,
} from 'mobx';
import * as E from './types/enums';
import { wait } from '../../shared/utils/wait';

export class ScreenStore {
  private _currentScreen: E.Screens = E.Screens.LOADER;

  private _isSwitching = false;

  constructor() {
    makeObservable<this, '_currentScreen' | '_isSwitching'>(this, {
      _currentScreen: observable,
      setScreen: action,
      currentScreen: computed,

      _isSwitching: observable,
      setIsSwitching: action,
      isSwitching: computed,
    });
  }

  public setScreen = async (screen: ScreenStore['_currentScreen']) => {
    this.setIsSwitching(true);
    await wait(500);
    this._currentScreen = screen;
    await wait(200);
    this.setIsSwitching(false);
    await wait(500);
  };

  public get currentScreen() {
    return this._currentScreen;
  }

  public setIsSwitching = (value: ScreenStore['_isSwitching']) => {
    this._isSwitching = value;
  };

  public get isSwitching() {
    return this._isSwitching;
  }
}
