const { NetInfo } = require('react-native')
function isDeviceConnected(cb){
  NetInfo.getConnectionInfo()
  .then((connectionInfo) => {
    cb(connectionInfo.type == "wifi"|| connectionInfo.effectiveType == "2g" || 
      connectionInfo.effectiveType == "3g" || connectionInfo.effectiveType == "4g")
  })
}

module.exports = {
  isDeviceConnected
}