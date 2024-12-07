import { useLayoutEffect } from "react";
import { setupFontSize } from "./shared/libs/setupFontSize";
import { ScreenSwitch } from "./components/ScreenSwitch";

export const App = () => {
  useLayoutEffect(() => {
    const setupUi = () => {
      setTimeout(() => {
        setupFontSize();
      }, 20);
    };

    setupUi();

    window.addEventListener("resize", setupUi);

    return () => {
      window.removeEventListener("resize", setupUi);
    };
  });

  return (
    <div>
      <ScreenSwitch />
    </div>
  );
};
