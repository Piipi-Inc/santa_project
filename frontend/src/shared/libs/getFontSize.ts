const FRAME = {
  width: 1360,
  height: 650
};

const FONT_SIZE = 10;

export const getFontSize = () =>
  Math.floor(((document.documentElement.clientWidth * FONT_SIZE) / FRAME.width) * 100) / 100;
