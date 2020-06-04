import {Urls, Messages, ServerProtocol} from "config/settings";
import * as NetworkHelper from "helpers/NetworkHelper";
import API_ACCESS_TOKEN from "config/apiAccessToken";

const CONTENT_TYPE_MULTI_PART = "multipart/form-data";
const CONTENT_TYPE_JSON = "application/json";

const timeoutFetch = (url, parameters = {}, contentType) => {
  const params =
    contentType === CONTENT_TYPE_JSON
      ? {...parameters, authorization: API_ACCESS_TOKEN}
      : parameters;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": contentType,
      authorization: API_ACCESS_TOKEN,
    },
    body: contentType === CONTENT_TYPE_JSON ? JSON.stringify(params) : params,
  })
    .then((response) => {
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
    .then((responseJson) => {
      if (responseJson[ServerProtocol.statusField] !== ServerProtocol.OK) {
        throw responseJson[ServerProtocol.messageField];
      } else {
        return responseJson;
      }
    })
    .catch(async (error) => {
      const isInternetReachable = await NetworkHelper.isConnected();
      if (isInternetReachable) {
        if (error && error.message) {
          // for unified Error:Network request failed
          throw Messages.SERVER_ERROR;
        }
        throw error || Messages.SERVER_ERROR;
      } else {
        throw Messages.CHECK_INTERNET_CONNECTION;
      }
    });
};

const connectToServer = (
  url,
  parameters,
  contentType = CONTENT_TYPE_JSON,
  timeout = 10000
) =>
  Promise.race([
    timeoutFetch(url, parameters, contentType),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(Messages.SERVER_ERROR), timeout)
    ),
  ]);

export const login = (userId, password, deviceId, cache) => {
  const loginParamters = {};

  loginParamters.userId = userId;
  loginParamters.password = password;
  loginParamters.notificationsToken = deviceId;
  return connectToServer(Urls.LOGIN, loginParamters)
    .then((response) => response)
    .catch((error) => {
      // in case that login server fails (which could) catch that and use cache
      if (error === Messages.SERVER_ERROR) {
        {
          if (cache.data.userData.name) {
            return cache;
          }
        }
        throw error;
      }
    });
};

export const register = (fullName, userId, password, deviceId) => {
  const registerParamters = {};

  registerParamters.fullName = fullName;
  registerParamters.userId = userId;
  registerParamters.password = password;
  registerParamters.notificationsToken = deviceId;
  return connectToServer(Urls.REGISTER, registerParamters)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const resetPassword = (userId, password) => {
  const resetPasswordParameters = {};
  resetPasswordParameters.userId = userId;
  resetPasswordParameters.password = password;
  return connectToServer(Urls.RESET_PASSWORD, resetPasswordParameters)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const sendReferral = (userId, mail) => {
  const sendReferralParameters = {};
  sendReferralParameters.userId = userId;
  sendReferralParameters.mail = mail;
  return connectToServer(Urls.SEND_REFERRAL, sendReferralParameters)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const syncLocalStorage = (
  userId,
  receivedNotificationsKeys,
  readNotificationsKeys
) => {
  const syncLocalStorageParameters = {};
  syncLocalStorageParameters.userId = userId;
  syncLocalStorageParameters.receivedNotificationsKeys = receivedNotificationsKeys;
  syncLocalStorageParameters.readNotificationsKeys = readNotificationsKeys;
  return connectToServer(Urls.SYN_LOCAL_STORAGE, syncLocalStorageParameters)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchUserData = (userId) => {
  const fetchUserDataParameters = {};

  fetchUserDataParameters.userId = userId;
  return connectToServer(Urls.FETCH_USER_DATA, fetchUserDataParameters)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const fetchDynamicData = (params) =>
  connectToServer(Urls.FETCH_DYNAMIC_DATA, params, CONTENT_TYPE_JSON, 15000)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

export const setContentSaved = (params) =>
  connectToServer(Urls.SET_CONTENT_SAVED, params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

export const setNotifiedPromotionsSaved = (params) =>
  connectToServer(Urls.SET_NOTIFIED_PROMOTIONS_SAVED, params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

export const setNotifiedMessagesSaved = (params) =>
  connectToServer(Urls.SET_NOTIFIED_MESSAGES_SAVED, params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

export const sendMessages = (params) =>
  connectToServer(Urls.SEND_MESSAGES, params)
    .then((response) => response.messages)
    .catch((error) => {
      throw error;
    });

export const getRealTimeMessages = (params) =>
  connectToServer(Urls.GET_REAL_TIME_MESSAGES, params)
    .then((response) => response.messages)
    .catch((error) => {
      throw error;
    });

export const getRecordedClasses = () =>
  connectToServer(Urls.GET_RECORDED_CLASES)
    .then((response) => response.recordings)
    .catch((error) => {
      throw error;
    });

export const setRealTimeMessagesSaved = (params) =>
  connectToServer(Urls.SET_REAL_TIME_MESSAGES_SAVED, params)
    .then((response) => response.messages)
    .catch((error) => {
      throw error;
    });

export const uploadProfilePicture = (params) =>
  connectToServer(Urls.UPLOAD_PROFILE_PICTURE, params, CONTENT_TYPE_MULTI_PART)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

export const synchMemberProperties = (params) =>
  connectToServer(Urls.SYNCH_MEMBER_PROPERTIES, params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });

export const getMeetingId = (params) =>
  connectToServer(Urls.GET_MEETING_ID, params)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
