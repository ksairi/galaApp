import { ActionsTypes } from '/config/settings'

export function logIn () {
  return (dispatch, getState) => {
    dispatch({ type: ActionsTypes.LOG_IN })
  }
}

export function logout () {
  return (dispatch, getState) => {
    dispatch({ type: ActionsTypes.LOG_OUT })
  }
}

export function setIsAppsFirstTime (state) {
  return (dispatch, getState) => {
    dispatch({ type: ActionsTypes.SET_IS_APPS_FIRST_TIME, state })
  }
}

export function setHasResetFirstPassword (hasResetFirstPassword) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionsTypes.SET_HAS_RESET_FIRST_PASSWORD,
      hasResetFirstPassword
    })
  }
}

export function setInResetFirstPasswordMode (inResetFirstPasswordMode) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionsTypes.SET_IN_RESET_FIRT_PASSWORD_MODE,
      inResetFirstPasswordMode
    })
  }
}

export function setIsSavingNotificationsData (isSavingNotificationsData) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionsTypes.SET_IS_SAVING_NOTIFICATIONS_DATA,
      isSavingNotificationsData
    })
  }
}
