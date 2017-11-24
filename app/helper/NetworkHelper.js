const { NetInfo } = require('react-native')
function isDeviceConnected(){
  return (
    NetInfo.getConnectionInfo()
    .then((connectionInfo) => {
      return (connectionInfo.type == "wifi"|| connectionInfo.effectiveType == "2g" || 
        connectionInfo.effectiveType == "3g" || connectionInfo.effectiveType == "4g")
    })
  )
}

module.exports = {
  isDeviceConnected
}