import { useStore } from "src/store";
import { observer } from "mobx-react-lite";
import { Screens } from "src/store/screen/types/enums";
import { lazy, Suspense, useMemo } from "react";
import cn from "classnames";
import styles from "./index.module.scss";

const screenMap: Record<
  Screens,
  () => Promise<{ default: React.ComponentType }>
> = {
  [Screens.LOADER]: () => import("../Loader"),
  [Screens.AUTHENTICATE]: () => import("../Authenticate"),
  [Screens.WELCOME]: () => import("../Welcome"),
  [Screens.MAIN]: () => import("../Main"),
  [Screens.LOBBY]: () => import("../Lobby"),
};

export const ScreenSwitch = observer(() => {
  const {
    screenStore: { currentScreen, isSwitching },
  } = useStore();

  const LazyScreen = useMemo(() => {
    const loadScreen = screenMap[currentScreen];
    return loadScreen ? lazy(loadScreen) : null;
  }, [currentScreen]);

  if (!LazyScreen) {
    return <div>Screen not found</div>;
  }

  return (
    <Suspense fallback={<div />}>
      <div
        className={cn(
          styles.screenSwitchWrap,
          isSwitching && styles.screenSwitchWrap__isSwitching
        )}
      >
        <LazyScreen />
      </div>
    </Suspense>
  );
});
