import { getFontSize } from "./getFontSize";

export const setupFontSize = () => {
  const fontSize = getFontSize();
  document.documentElement.style.setProperty("font-size", `${fontSize}px`);
};
