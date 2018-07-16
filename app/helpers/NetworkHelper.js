import { NetInfo } from "react-native";

exports.isDeviceConnected = _connectionInfo => {
	if (_connectionInfo) {
		return isConnectionTypeValid(_connectionInfo);
	}
	return NetInfo.getConnectionInfo().then(connectionInfo => {
		return isConnectionTypeValid(connectionInfo);
	});
};

isConnectionTypeValid = connectionInfo =>
	connectionInfo.type == "wifi" ||
	connectionInfo.effectiveType == "2g" ||
	connectionInfo.effectiveType == "3g" ||
	connectionInfo.effectiveType == "4g";
