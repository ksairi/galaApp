import {Platform} from "react-native";
import Constants from "expo-constants";
import {detect} from "detect-browser";

export const getHost = () => {
  if (__DEV__) {
    return "https://galagym.com";
  }
  const {slug} = Constants.manifest;
  return slug === "galaApp"
    ? "https://galagym.com"
    : "https://test.galagym.com";
};

export const isMobile = () => {
  const os = detect().os;
  return os === "iOS" || os?.toLowerCase().includes("android");
};

export const isIOS = () => detect().os === "iOS";

export const isWebInMobile = () => Platform.OS === "web" && isMobile();
