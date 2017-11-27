import { NetInfo } from 'react-native'

exports.isDeviceConnected = function (){
  return (
    NetInfo.getConnectionInfo()
    .then((connectionInfo) => {
      return (connectionInfo.type == "wifi"|| connectionInfo.effectiveType == "2g" || 
        connectionInfo.effectiveType == "3g" || connectionInfo.effectiveType == "4g")
    })
  )
}