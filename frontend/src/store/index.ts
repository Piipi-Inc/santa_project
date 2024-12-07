import { Context, createContext, useContext } from "react";
import { ScreenStore } from "./screen";

export class RootStore {
  public readonly screenStore: ScreenStore;

  constructor() {
    this.screenStore = new ScreenStore();
  }
}

export const RootStoreContext = createContext<RootStore | null>(null);
export const useStore = () =>
  useContext(RootStoreContext as Context<RootStore>);
