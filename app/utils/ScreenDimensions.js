import {Dimensions, PixelRatio} from "react-native";

export const getPortraitWidth = () => {
  const {height} = Dimensions.get("window");
  const {width} = Dimensions.get("window");
  return width > height ? height : width;
};

export const getScreenDensity = () => {
  switch (PixelRatio.get()) {
    case 1:
      return 160;
    case 1.5:
      return 240;
    case 2:
      return 320;
    case 3:
      return 480;
    case 3.5:
      return 560;
    case 4:
      return 640;
    default:
      return 240;
  }
};
