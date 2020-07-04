import Constants from "expo-constants";

export const getHost = () => {
  if (__DEV__) {
    return "http://galaweb:3001";
  }
  const {slug} = Constants.manifest;
  return slug === "galaApp"
    ? "https://galagym.com"
    : "https://test.galagym.com";
};
