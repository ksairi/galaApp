import NetInfo from "@react-native-community/netinfo";

// eslint-disable-next-line import/prefer-default-export
export const isConnected = async (connectionInfo) => {
  if (connectionInfo) {
    return connectionInfo.isInternetReachable;
  }
  const state = await NetInfo.fetch();
  return state.isInternetReachable;
};
