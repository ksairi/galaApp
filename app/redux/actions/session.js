import {ActionsTypes} from "config/settings";

export function logIn() {
  return (dispatch) => {
    dispatch({type: ActionsTypes.LOG_IN});
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({type: ActionsTypes.LOG_OUT});
  };
}

export function setIsAppsFirstTime(state) {
  return (dispatch) => {
    dispatch({type: ActionsTypes.SET_IS_APPS_FIRST_TIME, state});
  };
}

export function setHasResetFirstPassword(hasResetFirstPassword) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_HAS_RESET_FIRST_PASSWORD,
      hasResetFirstPassword,
    });
  };
}

export function setInResetFirstPasswordMode(inResetFirstPasswordMode) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_IN_RESET_FIRT_PASSWORD_MODE,
      inResetFirstPasswordMode,
    });
  };
}

export function setIsSavingNotificationsData(isSavingNotificationsData) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_IS_SAVING_NOTIFICATIONS_DATA,
      isSavingNotificationsData,
    });
  };
}

export function setIsInSession(isInSession) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_IS_IN_SESSION,
      isInSession,
    });
  };
}

export function setGoToMobileWebLogin(value) {
  return (dispatch) => {
    dispatch({
      type: ActionsTypes.SET_GO_TO_MOBILE_WEB_LOGIN,
      value,
    });
  };
}
