import {PixelRatio} from "react-native";
import * as ApiHelper from "helpers/ApiHelper";
import * as StoreHelper from "helpers/StoreHelper";
import * as ScreenDimensions from "utils/ScreenDimensions";
import * as MessagesHelper from "helpers/MessagesHelper";
import ActionsCreators from "redux/actions";

const hasResponseResults = (response) =>
  (response.messages && response.messages.length > 0) ||
  (response.sentMessages && response.sentMessages.length > 0);

export const doFetchDynamicData = async (
  synchedDataParameters,
  fullName,
  userId,
  deviceId,
  unsentMessages,
  dispatch
) => {
  const params = {...synchedDataParameters};
  if (params.isLoginRequest) {
    params.userId = userId;
    params.deviceId = deviceId;
    params.fullName = fullName;
    params.deviceWidth = PixelRatio.getPixelSizeForLayoutSize(
      ScreenDimensions.getPortraitWidth()
    );
    params.unsentMessages = unsentMessages;
  }
  const dynamicDataResponse = await ApiHelper.fetchDynamicData(params);
  if (hasResponseResults(dynamicDataResponse)) {
    let lastMessageServerTime = null;
    if (
      dynamicDataResponse.messages &&
      dynamicDataResponse.messages.length > 0
    ) {
      lastMessageServerTime =
        dynamicDataResponse.messages[dynamicDataResponse.messages.length - 1]
          .serverTime;
    }
    ApiHelper.setContentSaved({userId, lastMessageServerTime});
  }
  await StoreHelper.setContentServerData(dynamicDataResponse, dispatch);
};

const fetchDynamicData = async (
  response,
  fullName,
  userId,
  password,
  deviceId,
  synchedDataParameters,
  unsentMessages,
  dispatch
) => {
  await doFetchDynamicData(
    synchedDataParameters,
    fullName,
    userId,
    deviceId,
    unsentMessages,
    dispatch
  );
  StoreHelper.setInitialData(response.data, userId, password, dispatch);
};

export const login = async (
  userId,
  password,
  deviceId,
  loginSynchedDataParameters,
  messages,
  dispatch
) => {
  const loginResponse = await ApiHelper.login(userId, password, deviceId);
  dispatch(
    ActionsCreators.setHasResetFirstPassword(
      loginResponse.data.hasResetFirstPassword
    )
  );
  const unsentMessages = MessagesHelper.getUnsentMessages(messages);
  await fetchDynamicData(
    loginResponse,
    loginResponse.data.userData.name,
    userId,
    password,
    deviceId,
    loginSynchedDataParameters,
    unsentMessages,
    dispatch
  );
};

export const register = async (
  fullName,
  userId,
  password,
  deviceId,
  loginSynchedDataParameters,
  dispatch
) => {
  const registerResponse = await ApiHelper.register(
    fullName,
    userId,
    password,
    deviceId
  );

  StoreHelper.clearStore(dispatch);
  dispatch(ActionsCreators.setHasResetFirstPassword(true));
  await fetchDynamicData(
    registerResponse,
    fullName,
    userId,
    password,
    deviceId,
    loginSynchedDataParameters,
    null,
    dispatch
  );
};
