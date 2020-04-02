import NetInfo from '@react-native-community/netinfo'

const isConnected = async (connectionInfo) => {
  if (connectionInfo) {
    return connectionInfo.isInternetReachable
  }
  const state = await NetInfo.fetch()
  return state.isInternetReachable
}
export {isConnected}
