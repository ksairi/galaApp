import { PixelRatio } from 'react-native'
import {
  login as loginApi,
  register as registerApi,
  fetchDynamicData as fetchDynamicDataApi,
  setContentSaved as setContentSavedApi
} from '/helpers/ApiHelper'
import {
  setInitialData,
  clearStore,
  setContentServerData
} from '/helpers/StoreHelper'
import * as ScreenDimensions from '/utils/ScreenDimensions'
import { getUnsentMessages } from '/helpers/MessagesHelper'
import { ActionsCreators } from '/redux/actions'
exports.login = async (
  userId,
  password,
  deviceId,
  loginSynchedDataParameters,
  messages,
  dispatch
) => {
  const loginResponse = await loginApi(userId, password, deviceId)
  dispatch(
    ActionsCreators.setHasResetFirstPassword(
      loginResponse.data.hasResetFirstPassword
    )
  )
  const unsentMessages = getUnsentMessages(messages)
  await fetchDynamicData(
    loginResponse,
    loginResponse.data.userData.name,
    userId,
    password,
    deviceId,
    loginSynchedDataParameters,
    unsentMessages,
    dispatch
  )
}

exports.register = async (
  fullName,
  userId,
  password,
  deviceId,
  loginSynchedDataParameters,
  dispatch
) => {
  const registerResponse = await registerApi(
    fullName,
    userId,
    password,
    deviceId
  )

  clearStore(dispatch)
  dispatch(ActionsCreators.setHasResetFirstPassword(true))
  await fetchDynamicData(
    registerResponse,
    fullName,
    userId,
    password,
    deviceId,
    loginSynchedDataParameters,
    null,
    dispatch
  )
}

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
  )
  setInitialData(response.data, userId, password, dispatch)
}

const doFetchDynamicData = async (
  synchedDataParameters,
  fullName,
  userId,
  deviceId,
  unsentMessages,
  dispatch
) => {
  const params = { ...synchedDataParameters }
  if (params.isLoginRequest) {
    params.userId = userId
    params.deviceId = deviceId
    params.fullName = fullName
    params.deviceWidth = PixelRatio.getPixelSizeForLayoutSize(
      ScreenDimensions.getPortraitWidth()
    )
    params.unsentMessages = unsentMessages
  }
  const dynamicDataResponse = await fetchDynamicDataApi(params)
  if (hasResponseResults(dynamicDataResponse)) {
    var lastMessageServerTime = null
    if (
      dynamicDataResponse.messages &&
      dynamicDataResponse.messages.length > 0
    ) {
      lastMessageServerTime =
        dynamicDataResponse.messages[dynamicDataResponse.messages.length - 1]
          .serverTime
    }
    setContentSavedApi({ userId, lastMessageServerTime })
  }
  await setContentServerData(dynamicDataResponse, dispatch)
}

const hasResponseResults = response =>
  (response.messages && response.messages.length > 0) ||
  (response.sentMessages && response.sentMessages.length > 0)

exports.doFetchDynamicData = doFetchDynamicData
