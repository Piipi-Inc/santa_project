import { useStore } from "src/store";
import { observer } from "mobx-react-lite";
import { Screens } from "src/store/screen/types/enums";
import { lazy } from "react";
import { useMemo, Suspense } from "react";
import styles from "./index.module.scss";

const screenMap: Record<
  Screens,
  () => Promise<{ default: React.ComponentType }>
> = {
  [Screens.LOADER]: () => import("../Loader"),
};

export const ScreenSwitch = observer(() => {
  const {
    screenStore: { currentScreen },
  } = useStore();

  const LazyScreen = useMemo(() => {
    const loadScreen = screenMap[currentScreen];
    return loadScreen ? lazy(loadScreen) : null;
  }, [currentScreen]);

  if (!LazyScreen) {
    return <div>Screen not found</div>;
  }

  return (
    <Suspense fallback={<div></div>}>
      <div className={styles.screenSwitchWrap}>
        <LazyScreen />
      </div>
    </Suspense>
  );
});
