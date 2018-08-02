import { Urls, Messages, ServerProtocol } from "/config/settings.js";
import { isDeviceConnected } from "./NetworkHelper";
import API_ACCESS_TOKEN from "/config/apiAccessToken";

exports.login = (userId, password, deviceId) => {
	const loginParamters = {};

	loginParamters.userId = userId;
	loginParamters.password = password;
	loginParamters.notificationsToken = deviceId;
	return connectToServer(Urls.LOGIN, loginParamters)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.register = (fullName, userId, password, deviceId) => {
	const registerParamters = {};

	registerParamters.fullName = fullName;
	registerParamters.userId = userId;
	registerParamters.password = password;
	registerParamters.notificationsToken = deviceId;
	return connectToServer(Urls.REGISTER, registerParamters)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.resetPassword = (userId, password) => {
	const resetPasswordParameters = {};
	resetPasswordParameters.userId = userId;
	resetPasswordParameters.password = password;
	return connectToServer(Urls.RESET_PASSWORD, resetPasswordParameters)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.sendReferral = (userId, mail) => {
	const sendReferralParameters = {};
	sendReferralParameters.userId = userId;
	sendReferralParameters.mail = mail;
	return connectToServer(Urls.SEND_REFERRAL, sendReferralParameters)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.syncLocalStorage = (
	userId,
	receivedNotificationsKeys,
	readNotificationsKeys
) => {
	const syncLocalStorageParameters = {};
	syncLocalStorageParameters.userId = userId;
	syncLocalStorageParameters.receivedNotificationsKeys = receivedNotificationsKeys;
	syncLocalStorageParameters.readNotificationsKeys = readNotificationsKeys;
	return connectToServer(Urls.SYN_LOCAL_STORAGE, syncLocalStorageParameters)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.fetchUserData = userId => {
	const fetchUserDataParameters = {};

	fetchUserDataParameters.userId = userId;
	return connectToServer(Urls.FETCH_USER_DATA, fetchUserDataParameters)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.fetchDynamicData = params => {
	return connectToServer(Urls.FETCH_DYNAMIC_DATA, params)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.setContentSaved = params => {
	return connectToServer(Urls.SET_CONTENT_SAVED, params)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

exports.setNotifiedPromotionsSaved = params => {
	console.log("samia");
	console.log(Urls.SET_NOTIFIED_PROMOTIONS_SAVED);
	return connectToServer(Urls.SET_NOTIFIED_PROMOTIONS_SAVED, params)
		.then(response => {
			return response;
		})
		.catch(error => {
			throw error;
		});
};

connectToServer = (url, parameters) => {
	return fetch(url, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer " + API_ACCESS_TOKEN
		},
		body: JSON.stringify(parameters)
	})
		.then(response => {
			if (response.ok) {
				try {
					return response.json();
				} catch (e) {
					throw Messages.SERVER_ERROR;
				}
			} else {
				throw Messages.SERVER_ERROR;
			}
		})
		.then(responseJson => {
			if (responseJson[ServerProtocol.statusField] != ServerProtocol.OK) {
				throw responseJson[ServerProtocol.messageField];
			} else {
				return responseJson;
			}
		})
		.catch(error => {
			return isDeviceConnected().then(isConnected => {
				if (isConnected) {
					if (error && error.message) {
						//for unified Error:Network request failed
						throw Messages.SERVER_ERROR;
					}
					throw error ? error : Messages.SERVER_ERROR;
				} else {
					throw Messages.CHECK_INTERNET_CONNECTION;
				}
			});
		});
};
