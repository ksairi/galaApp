import NetInfo from "@react-native-community/netinfo";
import {Platform} from "react-native";

export const isConnected = async (connectionInfo) => {
  if (connectionInfo) {
    return connectionInfo.isInternetReachable;
  }
  if (Platform.OS === "web") {
    return true;
  }
  const state = await NetInfo.fetch();
  return state.isInternetReachable;
};
