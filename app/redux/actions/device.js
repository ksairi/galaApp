import { ActionsTypes } from '/config/settings'

export function setCurrentOrientation (orientation) {
  return (dispatch, getState) => {
    dispatch({ type: ActionsTypes.SET_CURRENT_ORIENTATION, orientation })
  }
}

export function setHiddenStatusBar (value) {
  return (dispatch, getState) => {
    dispatch({ type: ActionsTypes.SET_HIDDEN_STATUS_BAR, value })
  }
}

export function setDeviceId (deviceId) {
  return (dispatch, getState) => {
    dispatch({ type: ActionsTypes.SET_DEVICE_ID, deviceId })
  }
}
