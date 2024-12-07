import { useLayoutEffect } from "react";
import { setupFontSize } from "./shared/libs/setupFontSize";

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
      <h2 style={{ fontSize: "12rem" }}>пук пук как как </h2>
    </div>
  );
};
